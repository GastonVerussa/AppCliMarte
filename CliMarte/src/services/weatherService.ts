import axios from 'axios';

export type WeatherData = {
  sol: string;
  max: string;
  min: string;
  date: string;
};

const API_KEY = process.env.EXPO_PUBLIC_NASA_KEY; 
// Recuerda usar las comillas invertidas  
const NASA_API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

export const getWeatherBySol = async (solNumber: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(NASA_API_URL);

    if (response.status !== 200) {
      throw new Error('Error de conexión con NASA');
    }

    const data = response.data;
    const availableSols: string[] = data.sol_keys || [];

    // Verificamos si el Sol pedido está en la lista
    if (!availableSols.includes(solNumber)) {
      // AQUÍ EL CAMBIO: El error ahora contiene la lista real de disponibles
      throw new Error(`El Sol ${solNumber} no tiene datos.\n\nDisponibles: ${availableSols.join(', ')}`);
    }

    const solData = data[solNumber];

    return {
      sol: solNumber,
      date: new Date(solData.First_UTC).toLocaleDateString(),
      max: `${Math.round(solData.AT?.mx  -99)}°C`,
      min: `${Math.round(solData.AT?.mn || -99)}°C`,
    };

  } catch (error: any) {
    // Si es un error que nosotros lanzamos (con el mensaje de los Sols), lo dejamos pasar.
    // Si es otro error de Axios, lanzamos uno genérico.
    console.error("Fallo en servicio API:", error.message);
    throw error;
  }
};