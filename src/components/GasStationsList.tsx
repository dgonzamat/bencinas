import React from 'react';
import { GasStation } from '../types/station';
import { GasStationCard } from './GasStationCard';
import { AlertCircle, Code2 } from 'lucide-react';

interface GasStationsListProps {
  stations: GasStation[];
}

export function GasStationsList({ stations }: GasStationsListProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const updatedStations = stations
    .filter(station => {
      const stationDate = new Date(station.lastUpdate).toISOString().split('T')[0];
      return stationDate === today;
    })
    .sort((a, b) => (a.prices['93'] || 0) - (b.prices['93'] || 0))
    .slice(0, 10);

  if (updatedStations.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-center gap-3">
        <AlertCircle className="text-yellow-600 w-6 h-6 flex-shrink-0" />
        <p className="text-yellow-700">
          No se encontraron bencineras actualizadas hoy en esta ubicación.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">
          Top 10 Bencineras más Económicas
        </h2>
        <p className="text-blue-100 mt-1">
          Ordenado por precio de 93 octanos
        </p>
      </div>
      
      <div className="space-y-3">
        {updatedStations.map((station, index) => (
          <GasStationCard 
            key={station.id} 
            station={station} 
            index={index}
          />
        ))}
      </div>

      <footer className="mt-8 border-t pt-6">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Code2 size={20} className="text-blue-600" />
          <p>Desarrollado por <span className="font-semibold">Daniel González</span></p>
        </div>
      </footer>
    </div>
  );
}