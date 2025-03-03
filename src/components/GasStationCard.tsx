import { GasStation } from '../types/station';
import { MapPin, Clock, Fuel, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface GasStationCardProps {
  station: GasStation;
  index?: number;
}

const brandLogos: { [key: string]: string } = {
  'Copec': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Logo_copec_2023_Cielo.jpg/600px-Logo_copec_2023_Cielo.jpg',
  'Shell': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Shell_logo.svg/150px-Shell_logo.svg.png',
  'Petrobras': 'https://1000marcas.net/wp-content/uploads/2021/06/Petrobras-Logo-500x313.png',
  'Enex': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Shell_Enex_Logo.svg/320px-Shell_Enex_Logo.svg.png'
};

export function GasStationCard({ station, index }: GasStationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const price93 = station.prices['93'];
  const formattedDate = new Date(station.lastUpdate).toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div 
      className={`
        p-4 rounded-lg transition-all duration-300 ease-in-out
        ${isExpanded ? 'bg-blue-50 shadow-lg' : 'bg-white shadow hover:shadow-md'}
      `}
    >
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              {index !== undefined && (
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-sm font-medium rounded-full">
                  {index + 1}
                </span>
              )}
              {brandLogos[station.brand] && (
                <img 
                  src={brandLogos[station.brand]} 
                  alt={`Logo ${station.brand}`}
                  className="h-8 w-auto object-contain"
                  style={{ 
                    maxWidth: '120px',
                    background: station.brand === 'Shell' ? '#fff' : 'transparent'
                  }}
                />
              )}
              <h3 className="font-bold text-lg text-gray-900">{station.name}</h3>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 mt-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="flex-shrink-0" />
                <p className="text-sm">{station.address}</p>
              </div>
              <span className="hidden sm:block text-gray-400">•</span>
              <p className="text-sm text-gray-500">{station.city}, {station.region}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="bg-blue-50 px-3 py-1 rounded-full mb-1">
                <p className="text-sm font-medium text-blue-700">93 Octanos</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">${price93}</p>
            </div>
            <ChevronRight 
              className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} 
              size={20}
            />
          </div>
        </div>
      </div>

      <div 
        className={`
          grid transition-all duration-300 ease-in-out
          ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}
        `}
      >
        <div className="overflow-hidden">
          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <p className="text-sm">Actualizado a las {formattedDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <Fuel size={16} />
                <p className="text-sm font-medium">Otros combustibles</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(station.prices)
                .filter(([fuel]) => fuel !== '93')
                .map(([fuel, price]) => (
                  <div 
                    key={fuel} 
                    className="bg-white p-3 rounded-lg shadow-sm transition-all hover:shadow-md"
                  >
                    <p className="text-sm font-medium text-gray-600">{fuel} Octanos</p>
                    <p className="text-lg font-semibold text-gray-900">${price}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}