import axios from 'axios';

export type WeatherData = {
  sol: string;
  max: string;
  min: string;
  date: string;
};

// 1. REEMPLAZA 'AQUI_TU_CLAVE' POR LA QUE COPIASTE DE LA NASA
const API_KEY = process.env.EXPO_PUBLIC_NASA_KEY; 
const NASA_API_URL = 'https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0';

export const getWeatherBySol = async (solNumber: string): Promise<WeatherData> => {
  try {
    // 2. Hacemos la llamada
    const response = await axios.get(NASA_API_URL);

    // Verificamos estatus
    if (response.status !== 200) {
      throw new Error('Error de conexión con NASA');
    }

    const data = response.data;
    const availableSols = data.sol_keys || [];

    // --- IMPORTANTE ---
    // La misión InSight terminó, así que SOLO hay datos entre el Sol 1 y el Sol ~1400.
    // Si pides el Sol 3000 (futuro), la API dirá que no existe.
    if (!availableSols.includes(solNumber)) {
      console.warn(`El Sol ${solNumber} no está en la API. Sols disponibles: ${availableSols.join(', ')}`);
      throw new Error(`El Sol ${solNumber} no tiene datos. Prueba entre 600 y 1000.`);
    }

    const solData = data[solNumber];

    return {
      sol: solNumber,
      date: new Date(solData.First_UTC).toLocaleDateString(),
      max: `${Math.round(solData.AT?.mx  -99)}°C`, // AT = Atmospheric Temp
      min: `${Math.round(solData.AT?.mn || -99)}°C`,
    };

  } catch (error) {
    console.error("Fallo en servicio API:", error);
    throw error;
  }
};