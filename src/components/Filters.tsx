import { useState } from 'react';
import { Search } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: {
    address?: string;
  }) => void;
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      address: address || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="max-w-3xl mx-auto">
        <label className="block text-lg font-medium text-gray-700 mb-2">Buscar Bencinera</label>
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 pl-4 pr-12"
            placeholder="Ingresa una dirección, comuna o región..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search size={24} />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Ejemplo: "Providencia", "Las Condes", "Región del Maule"
        </p>
      </div>
    </form>
  );
}