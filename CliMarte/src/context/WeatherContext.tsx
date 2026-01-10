import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { getWeatherBySol } from '../services/weatherService';

export type WeatherReport = {
  id: string;
  sol: string;
  date: string;
  max: string;
  min: string;
  status: string;
  notes?: string;
};

const STORAGE_KEY = '@climarte_reports_v1';
const INITIAL_DATA: WeatherReport[] = [];

type WeatherContextType = {
  reports: WeatherReport[];
  isLoading: boolean;
  fetchAndSaveReport: (solNumber: string) => Promise<void>;
  deleteReport: (id: string) => void;
  updateReport: (updatedReport: WeatherReport) => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<WeatherReport[]>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedJson = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedJson) setReports(JSON.parse(savedJson));
      } catch (e) { console.error("Error cargando:", e); }
    };
    loadData();
  }, []);

  const saveToStorage = async (newReports: WeatherReport[]) => {
    setReports(newReports);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newReports));
  };

  const fetchAndSaveReport = async (solNumber: string) => {
    setIsLoading(true);

    try {
      console.log(`Consultando servicio para Sol ${solNumber}...`);
      
      const data = await getWeatherBySol(solNumber);
      
      const newReport: WeatherReport = {
        id: Date.now().toString(),
        sol: data.sol,
        date: data.date,
        max: data.max,
        min: data.min,
        status: 'Datos Reales',
        notes: 'Obtenido vía WeatherService',
      };

      saveToStorage([newReport, ...reports]);
      Alert.alert("¡Éxito!", "Datos descargados correctamente.");

    } catch (error: any) {
      console.log("Error al consultar API:", error.message);
      
      // CAMBIO IMPORTANTE: 
      // Ya NO generamos datos simulados.
      // Solo mostramos el error real al usuario.
      Alert.alert("No se encontraron datos", error.message);
      
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReport = (id: string) => {
    saveToStorage(reports.filter(r => r.id !== id));
  };

  const updateReport = (updatedReport: WeatherReport) => {
    saveToStorage(reports.map(r => r.id === updatedReport.id ? updatedReport : r));
  };

  return (
    <WeatherContext.Provider value={{ reports, isLoading, fetchAndSaveReport, deleteReport, updateReport }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather debe usarse dentro de un WeatherProvider');
  return context;
}