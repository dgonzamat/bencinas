export interface GasStation {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  prices: {
    [key: string]: number;
  };
  lastUpdate: string;
  brand: string;
  region: string;
  city: string;
}