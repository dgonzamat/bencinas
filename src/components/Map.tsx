import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GasStation } from '../types/station';
import { GasStationCard } from './GasStationCard';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  stations: GasStation[];
}

export function Map({ stations }: MapProps) {
  // Centro de Santiago como punto inicial
  const santiagoCenter: [number, number] = [-33.4489, -70.6693];

  return (
    <MapContainer
      center={santiagoCenter}
      zoom={13}
      className="w-full h-[500px] rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.location.lat, station.location.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="p-2 max-w-[200px]">
              <h3 className="font-bold text-lg">{station.name}</h3>
              <p className="text-sm text-gray-600">{station.address}</p>
              <div className="mt-2">
                {Object.entries(station.prices).map(([fuel, price]) => (
                  <div key={fuel} className="text-sm">
                    <span className="font-medium">{fuel}:</span> ${price}
                  </div>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}