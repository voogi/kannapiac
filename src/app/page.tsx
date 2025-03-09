'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';
import { locations } from '@/data/locations';
import { categories } from '@/data/categories';

// Dinamikusan importáljuk a Map komponenst, hogy elkerüljük a szerver oldali renderelési problémákat
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      Térkép betöltése...
    </div>
  ),
});

export default function Home() {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  
  // Képernyőméret figyelése
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Szűrt helyek a kiválasztott kategória alapján
  const filteredLocations = selectedCategoryId 
    ? locations.filter(location => location.category.toLowerCase() === selectedCategoryId.toLowerCase())
    : [];
  
  const selectedLocation = selectedLocationId 
    ? locations.find(loc => loc.id === selectedLocationId) 
    : null;

  const handleSelectCategory = (categoryId: string) => {
    console.log("Kategória kiválasztva:", categoryId);
    setSelectedCategoryId(categoryId);
    setSelectedLocationId(null);
    setShowLocations(true);
  };

  const handleSelectLocation = (id: string) => {
    console.log("Hely kiválasztva a főoldalon:", id);
    setSelectedLocationId(id);
  };

  const handleCloseDetail = () => {
    console.log("Részletek bezárása a főoldalon");
    setSelectedLocationId(null);
  };

  const handleBackToCategories = () => {
    console.log("Vissza a kategóriákhoz");
    setShowLocations(false);
    setSelectedCategoryId(null);
    setSelectedLocationId(null);
  };

  // Kiválasztott kategória neve
  const selectedCategoryName = selectedCategoryId 
    ? categories.find(cat => cat.id === selectedCategoryId)?.name 
    : '';

  // Debug információk
  useEffect(() => {
    console.log("Állapot változás:");
    console.log("- selectedLocationId:", selectedLocationId);
    console.log("- selectedLocation:", selectedLocation ? selectedLocation.name : null);
  }, [selectedLocationId, selectedLocation]);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">KannaPiac</h1>
          <p className="text-sm">Fedezd fel a környék legjobb helyeit</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Mobilnézet: Kategóriák/Helyek és Térkép egymás alatt */}
        {isMobile ? (
          <div className="flex flex-col h-full overflow-auto">
            {/* Kategóriák vagy helyek listája mobilon */}
            {!selectedLocation && (
              <div className="w-full">
                {!showLocations ? (
                  // Kategóriák listája
                  <div className="w-full">
                    <Sidebar 
                      selectedCategory={selectedCategoryId}
                      onSelectCategory={handleSelectCategory}
                    />
                  </div>
                ) : (
                  // Helyek listája a kiválasztott kategóriában
                  <div className="w-full bg-white shadow-md">
                    <div className="p-4 bg-blue-600 text-white flex items-center">
                      <button 
                        onClick={handleBackToCategories}
                        className="mr-2 text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <h1 className="text-xl font-bold">{selectedCategoryName}</h1>
                    </div>
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Keresés..."
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    {filteredLocations.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {filteredLocations.map((location) => (
                          <li 
                            key={location.id}
                            className={`p-4 hover:bg-gray-100 cursor-pointer ${
                              selectedLocationId === location.id ? 'bg-blue-100' : ''
                            }`}
                            onClick={() => handleSelectLocation(location.id)}
                          >
                            <h3 className="font-medium text-gray-900">{location.name}</h3>
                            <p className="text-sm text-gray-500">{location.address}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        Nincsenek helyek ebben a kategóriában.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Kiválasztott hely részletei mobilon */}
            {selectedLocation ? (
              <div className="w-full h-full overflow-auto">
                <div className="p-4">
                  <button 
                    onClick={handleCloseDetail}
                    className="mb-4 flex items-center text-blue-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Vissza a listához
                  </button>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-blue-600 text-white">
                      <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-500">Cím</h3>
                        <p className="text-gray-700">{selectedLocation.address}</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-500">Kategória</h3>
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                          {selectedLocation.category}
                        </span>
                      </div>
                      {selectedLocation.description && (
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-gray-500">Leírás</h3>
                          <p className="text-gray-700">{selectedLocation.description}</p>
                        </div>
                      )}
                      <div className="mt-4">
                        <button 
                          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`, '_blank')}
                        >
                          Útvonaltervezés
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Térkép mobilon
              <div className="w-full h-[60vh]">
                <Map 
                  locations={showLocations ? filteredLocations : []}
                  selectedLocation={selectedLocationId}
                  onSelectLocation={handleSelectLocation}
                />
              </div>
            )}
          </div>
        ) : (
          // Asztali nézet: Sidebar és Térkép egymás mellett
          <>
            {/* Sidebar asztali nézetben */}
            <div className="w-1/3 lg:w-1/4 h-full overflow-auto border-r">
              {!showLocations ? (
                // Kategóriák listája
                <Sidebar 
                  selectedCategory={selectedCategoryId}
                  onSelectCategory={handleSelectCategory}
                />
              ) : (
                // Helyek listája a kiválasztott kategóriában
                <div className="w-full h-full bg-white overflow-y-auto shadow-md">
                  <div className="p-4 bg-blue-600 text-white flex items-center">
                    <button 
                      onClick={handleBackToCategories}
                      className="mr-2 text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <h1 className="text-xl font-bold">{selectedCategoryName}</h1>
                  </div>
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Keresés..."
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  {filteredLocations.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {filteredLocations.map((location) => (
                        <li 
                          key={location.id}
                          className={`p-4 hover:bg-gray-100 cursor-pointer ${
                            selectedLocationId === location.id ? 'bg-blue-100' : ''
                          }`}
                          onClick={() => handleSelectLocation(location.id)}
                        >
                          <h3 className="font-medium text-gray-900">{location.name}</h3>
                          <p className="text-sm text-gray-500">{location.address}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Nincsenek helyek ebben a kategóriában.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Térkép és részletek asztali nézetben */}
            <div className="w-2/3 lg:w-3/4 h-full flex">
              {/* Térkép */}
              <div className={`${selectedLocation ? 'w-2/3' : 'w-full'} h-full transition-all duration-300`}>
                <Map 
                  locations={showLocations ? filteredLocations : []}
                  selectedLocation={selectedLocationId}
                  onSelectLocation={handleSelectLocation}
                />
              </div>
              
              {/* Részletek panel asztali nézetben */}
              {selectedLocation && (
                <div className="w-1/3 h-full overflow-auto bg-white border-l border-gray-200 shadow-lg">
                  <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                    <h2 className="text-lg font-bold">{selectedLocation.name}</h2>
                    <button 
                      onClick={handleCloseDetail}
                      className="text-white hover:text-gray-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-500">Cím</h3>
                      <p className="text-gray-700">{selectedLocation.address}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-500">Kategória</h3>
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                        {selectedLocation.category}
                      </span>
                    </div>
                    {selectedLocation.description && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-500">Leírás</h3>
                        <p className="text-gray-700">{selectedLocation.description}</p>
                      </div>
                    )}
                    <div className="mt-4">
                      <button 
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`, '_blank')}
                      >
                        Útvonaltervezés
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} KannaPiac - Minden jog fenntartva
        </div>
      </footer>
    </div>
  );
}
