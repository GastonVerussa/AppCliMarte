import axios from 'axios';

export type WeatherData = {
  sol: string;
  max: string;
  min: string;
  date: string;
};

// Tipo para el selector de la UI
export type SolOption = {
  sol: string;
  earthDate: string;
};

const API_KEY = process.env.EXPO_PUBLIC_NASA_KEY;
// Usamos backticks para interpolar la variable
const NASA_API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

export const getWeatherBySol = async (solNumber: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(NASA_API_URL);

    if (response.status !== 200) throw new Error('Error de conexión con NASA');

    const data = response.data;
    const availableSols: string[] = data.sol_keys || [];

    // Si el usuario pide un Sol que NO está en la lista, lanzamos error detallado
    if (!availableSols.includes(solNumber)) {
      throw new Error(`El Sol ${solNumber} no tiene datos. Disponibles: ${availableSols.join(', ')}`);
    }

    const solData = data[solNumber];
    
    return {
      sol: solNumber,
      date: new Date(solData.First_UTC).toLocaleDateString(undefined, { timeZone: 'UTC' }),
      max: `${Math.round(solData.AT?.mx || -99)}°C`, 
      min: `${Math.round(solData.AT?.mn || -99)}°C`,
    };

  } catch (error: any) {
    console.error("Fallo en servicio API:", error.message);
    throw error;
  }
};

// --- NUEVA FUNCIÓN "SENIOR" ---
// Obtiene la lista y mapea las fechas terrestres para mejor UX
export const getAvailableSolsWithDates = async (): Promise<SolOption[]> => {
  try {
    const response = await axios.get(NASA_API_URL);
    const data = response.data;
    const keys: string[] = data.sol_keys || [];

    // Mapeamos cada clave a un objeto con su fecha
    const options = keys.map(key => {
      const entry = data[key];
      // Formateamos la fecha para que sea legible
      const dateStr = new Date(entry.First_UTC).toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        timeZone: 'UTC'
      });
      return { sol: key, earthDate: dateStr };
    });

    // Retornamos ordenado del más reciente al más antiguo
    return options.reverse(); 
  } catch (error) {
    console.error("Error cargando opciones de Sols:", error);
    return [];
  }
};