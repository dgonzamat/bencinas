import axios from 'axios';
import { GasStation } from '../types/station';

const API_BASE_URL = 'https://api.cne.cl/v3/combustibles/vehicular/estaciones';

// Datos de ejemplo para desarrollo
const mockStations: GasStation[] = [
  {
    id: '1',
    name: 'Copec Las Condes',
    address: 'Av. Las Condes 12340',
    location: {
      lat: -33.4089,
      lng: -70.5693
    },
    prices: {
      '93': 1200,
      '95': 1300,
      '97': 1400,
      'Diesel': 900
    },
    lastUpdate: new Date().toISOString(),
    brand: 'Copec',
    region: 'Metropolitana',
    city: 'Las Condes'
  },
  {
    id: '2',
    name: 'Shell Providencia',
    address: 'Av. Providencia 1234',
    location: {
      lat: -33.4289,
      lng: -70.6093
    },
    prices: {
      '93': 1190,
      '95': 1290,
      '97': 1390,
      'Diesel': 890
    },
    lastUpdate: new Date().toISOString(),
    brand: 'Shell',
    region: 'Metropolitana',
    city: 'Providencia'
  },
  {
    id: '3',
    name: 'Petrobras Ñuñoa',
    address: 'Av. Irarrázaval 3456',
    location: {
      lat: -33.4489,
      lng: -70.5893
    },
    prices: {
      '93': 1180,
      '95': 1280,
      '97': 1380,
      'Diesel': 880
    },
    lastUpdate: new Date().toISOString(),
    brand: 'Petrobras',
    region: 'Metropolitana',
    city: 'Ñuñoa'
  },
  // Agregamos más estaciones de ejemplo en Santiago
  {
    id: '4',
    name: 'Shell Santiago Centro',
    address: 'Alameda 1500',
    location: {
      lat: -33.4489,
      lng: -70.6493
    },
    prices: {
      '93': 1175,
      '95': 1275,
      '97': 1375,
      'Diesel': 875
    },
    lastUpdate: new Date().toISOString(),
    brand: 'Shell',
    region: 'Metropolitana',
    city: 'Santiago'
  },
  {
    id: '5',
    name: 'Copec Vitacura',
    address: 'Av. Vitacura 4500',
    location: {
      lat: -33.3889,
      lng: -70.5893
    },
    prices: {
      '93': 1195,
      '95': 1295,
      '97': 1395,
      'Diesel': 895
    },
    lastUpdate: new Date().toISOString(),
    brand: 'Copec',
    region: 'Metropolitana',
    city: 'Vitacura'
  }
];

export const fetchGasStations = async (): Promise<GasStation[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.warn('Error fetching from API, using mock data:', error);
    return mockStations;
  }
};