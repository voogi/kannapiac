import React from 'react';
import { Location } from '@/data/locations';

type LocationDetailProps = {
  location: Location | null;
  onClose: () => void;
};

const LocationDetail: React.FC<LocationDetailProps> = ({ location, onClose }) => {
  if (!location) return null;

  console.log("LocationDetail renderelése:", location.name);

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg z-10 overflow-hidden">
      <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h2 className="text-lg font-bold">{location.name}</h2>
        <button 
          onClick={onClose}
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
          <p className="text-gray-700">{location.address}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500">Kategória</h3>
          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
            {location.category}
          </span>
        </div>
        {location.description && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-500">Leírás</h3>
            <p className="text-gray-700">{location.description}</p>
          </div>
        )}
        <div className="mt-4">
          <button 
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`, '_blank')}
          >
            Útvonaltervezés
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail; 