import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useWeather } from '../src/context/WeatherContext';

export default function AddReportScreen() {
  const router = useRouter();
  const { fetchAndSaveReport, isLoading } = useWeather();
  const [solInput, setSolInput] = useState('');

  const handleFetch = async () => {
    if (!solInput.trim()) {
      Alert.alert('Error', 'Por favor ingresa un número de Sol');
      return;
    }

    // Llamamos a la función del contexto (que simula el backend)
    await fetchAndSaveReport(solInput);
    
    // Al terminar, volvemos atrás
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Consultar Base de Datos', presentation: 'modal' }} />

      <Text style={styles.title}>Consulta Remota</Text>
      <Text style={styles.description}>
        Ingresa el número de Sol (Día Marciano) para solicitar los datos meteorológicos al servidor.
      </Text>

      <Text style={styles.label}>Número de Sol</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ej: 3045" 
        keyboardType="numeric"
        value={solInput}
        onChangeText={setSolInput}
        editable={!isLoading} // Bloquear input mientras carga
      />

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#D0421B" />
            <Text style={styles.loadingText}>Consultando satélite...</Text>
          </View>
        ) : (
          <Button title="Consultar y Guardar" onPress={handleFetch} color="#D0421B" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  description: { fontSize: 16, color: '#666', marginBottom: 30, lineHeight: 22 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 8, fontSize: 18, marginBottom: 20 },
  buttonContainer: { marginTop: 10 },
  loadingContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  loadingText: { color: '#666', fontSize: 16 }
});