import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Fuel, Loader2 } from 'lucide-react';
import { Map } from './components/Map';
import { Filters } from './components/Filters';
import { GasStationsList } from './components/GasStationsList';
import { fetchGasStations } from './services/api';
import { GasStation } from './types/station';

function App() {
  const [filters, setFilters] = useState<{
    address?: string;
  }>({});

  const { data: stations, isLoading, error } = useQuery({
    queryKey: ['stations'],
    queryFn: fetchGasStations
  });

  const filteredStations = stations?.filter((station) => {
    if (filters.address) {
      const searchTerm = filters.address.toLowerCase();
      return (
        station.address.toLowerCase().includes(searchTerm) ||
        station.city.toLowerCase().includes(searchTerm) ||
        station.region.toLowerCase().includes(searchTerm)
      );
    }
    return true;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error al cargar los datos. Por favor, intente nuevamente más tarde.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Fuel className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Bencinas Online</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Filters onFilterChange={setFilters} />

          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Map stations={filteredStations || []} />
                </div>
              </div>
              <div>
                <GasStationsList stations={filteredStations || []} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;