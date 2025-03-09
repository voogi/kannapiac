import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Javítás a Leaflet alapértelmezett ikon problémájára
// Next.js-ben az ikonok betöltése problémás lehet, ezért közvetlenül adjuk meg az URL-eket
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Kiválasztott helyet jelölő ikon
const SelectedIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
});

type Location = {
  id: string;
  name: string;
  address: string;
  category: string;
  lat: number;
  lng: number;
};

type MapProps = {
  locations: Location[];
  selectedLocation: string | null;
  onSelectLocation: (id: string) => void;
};

// Komponens a térkép középpontjának frissítéséhez és a térkép referencia kezeléséhez
function MapController({ 
  center, 
  zoom, 
  selectedLocationId,
  markersRef
}: { 
  center: [number, number]; 
  zoom: number;
  selectedLocationId: string | null;
  markersRef: React.MutableRefObject<{[key: string]: L.Marker}>;
}) {
  const map = useMap();
  
  // Térkép középpontjának frissítése
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  // Popup megnyitása a kiválasztott helyen
  useEffect(() => {
    if (selectedLocationId) {
      const marker = markersRef.current[selectedLocationId];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 100);
      }
    }
  }, [selectedLocationId, markersRef]);

  return null;
}

// Marker komponens referenciával
function MarkerWithRef({ 
  position, 
  icon, 
  locationId, 
  locationName, 
  locationAddress, 
  locationCategory,
  onClick, 
  saveRef 
}: { 
  position: [number, number]; 
  icon: L.Icon; 
  locationId: string; 
  locationName: string;
  locationAddress: string;
  locationCategory: string;
  onClick: () => void; 
  saveRef: (marker: L.Marker, id: string) => void;
}) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (markerRef.current) {
      saveRef(markerRef.current, locationId);
    }
  }, [saveRef, locationId]);

  // Biztosítjuk, hogy a kattintás esemény megfelelően működjön
  const handleClick = (e: L.LeafletMouseEvent) => {
    // Megállítjuk az esemény buborékolását
    L.DomEvent.stopPropagation(e);
    // Meghívjuk a kattintás kezelőt
    onClick();
    // Megakadályozzuk az alapértelmezett viselkedést
    e.originalEvent.preventDefault();
  };

  return (
    <Marker 
      position={position} 
      icon={icon} 
      eventHandlers={{ 
        click: handleClick
      }}
      ref={markerRef}
    >
      <Popup>
        <div>
          <h3 className="font-bold">{locationName}</h3>
          <p>{locationAddress}</p>
          <p className="text-sm text-blue-600">{locationCategory}</p>
        </div>
      </Popup>
    </Marker>
  );
}

const Map: React.FC<MapProps> = ({ locations, selectedLocation, onSelectLocation }) => {
  const defaultCenter: [number, number] = [47.497913, 19.040236]; // Budapest
  const [center, setCenter] = useState<[number, number]>(defaultCenter);
  const [zoom, setZoom] = useState(12);
  const markersRef = useRef<{[key: string]: L.Marker}>({});

  // Marker referencia mentése
  const saveMarkerRef = useCallback((marker: L.Marker, locationId: string) => {
    markersRef.current[locationId] = marker;
  }, []);

  // Kiválasztott hely középpontba állítása
  useEffect(() => {
    if (selectedLocation) {
      const location = locations.find(loc => loc.id === selectedLocation);
      if (location) {
        setCenter([location.lat, location.lng]);
        setZoom(15);
      }
    } else if (locations.length > 0) {
      try {
        // Ha nincs kiválasztott hely, de vannak helyek, akkor a térkép középpontját
        // a helyek középpontjára állítjuk
        const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]));
        const center: [number, number] = [
          (bounds.getNorth() + bounds.getSouth()) / 2,
          (bounds.getEast() + bounds.getWest()) / 2
        ];
        setCenter(center);
        setZoom(12);
      } catch (error) {
        console.error("Hiba a térkép középpontjának beállításakor:", error);
        setCenter(defaultCenter);
        setZoom(12);
      }
    } else {
      // Ha nincsenek helyek, visszaállítjuk az alapértelmezett középpontot
      setCenter(defaultCenter);
      setZoom(12);
    }
  }, [selectedLocation, locations]);

  // Helyek kiválasztásának kezelése
  const handleLocationSelect = useCallback((id: string) => {
    console.log("Hely kiválasztva:", id);
    onSelectLocation(id);
  }, [onSelectLocation]);

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ width: '100%', height: '100%' }}
    >
      <MapController 
        center={center} 
        zoom={zoom} 
        selectedLocationId={selectedLocation}
        markersRef={markersRef}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => (
        <MarkerWithRef
          key={location.id}
          position={[location.lat, location.lng]}
          icon={selectedLocation === location.id ? SelectedIcon : DefaultIcon}
          locationId={location.id}
          locationName={location.name}
          locationAddress={location.address}
          locationCategory={location.category}
          onClick={() => handleLocationSelect(location.id)}
          saveRef={saveMarkerRef}
        />
      ))}
    </MapContainer>
  );
};

export default Map; 