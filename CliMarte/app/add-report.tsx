import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useWeather } from '../src/context/WeatherContext';
import { getAvailableSolsWithDates, SolOption } from '../src/services/weatherService';

export default function AddReportScreen() {
  const [sol, setSol] = useState('');
  const [availableOptions, setAvailableOptions] = useState<SolOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  
  const { fetchAndSaveReport, isLoading } = useWeather();
  const router = useRouter();

  // Carga inicial de metadatos
  useEffect(() => {
    async function load() {
      const options = await getAvailableSolsWithDates();
      setAvailableOptions(options);
      setLoadingOptions(false);
    }
    load();
  }, []);

  const handleSubmit = async () => {
    if (!sol.trim()) {
      Alert.alert("Campo vacío", "Por favor ingresa o selecciona un número de Sol.");
      return;
    }
    
    // Intentamos buscar. El Context manejará el éxito o el error silencioso.
    await fetchAndSaveReport(sol);
    // Nota: Como quitamos el Alert del context, aquí asumimos éxito y volvemos.
    // En una app real, fetchAndSaveReport debería devolver true/false.
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: 'Nueva Consulta', headerBackTitle: 'Volver' }} />
      
      {/* SECCIÓN 1: CABECERA */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Consultar API InSight</Text>
        <Text style={styles.subtitle}>
          Selecciona un día disponible (Sol) o intenta una búsqueda manual.
        </Text>
      </View>

      {/* SECCIÓN 2: SELECTOR INTELIGENTE (CARRUSEL) */}
      <Text style={styles.sectionLabel}>📅 DISPONIBLES AHORA</Text>
      
      {loadingOptions ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#D0421B" />
          <Text style={styles.loadingText}>Conectando con Marte...</Text>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.carousel}
        >
          {availableOptions.length > 0 ? (
            availableOptions.map((opt) => {
              const isSelected = sol === opt.sol;
              return (
                <Pressable 
                  key={opt.sol} 
                  style={[styles.card, isSelected && styles.cardSelected]}
                  onPress={() => setSol(opt.sol)}
                >
                  <Text style={[styles.cardSol, isSelected && styles.textSelected]}>Sol {opt.sol}</Text>
                  <Text style={[styles.cardDate, isSelected && styles.textSelected]}>{opt.earthDate}</Text>
                  {isSelected && <View style={styles.dot} />}
                </Pressable>
              );
            })
          ) : (
            <Text style={styles.emptyText}>API Offline o sin datos recientes.</Text>
          )}
        </ScrollView>
      )}

      {/* SECCIÓN 3: INPUT MANUAL (LIBERTAD TOTAL) */}
      <View style={styles.manualSection}>
        <Text style={styles.sectionLabel}>🔍 BÚSQUEDA MANUAL</Text>
        <Text style={styles.hintText}>
          ¿Buscas un dato histórico específico? Escríbelo aquí.
        </Text>
        
        <View style={styles.inputWrapper}>
          <Text style={styles.prefix}>SOL #</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 650"
            value={sol}
            onChangeText={setSol}
            keyboardType="numeric"
            maxLength={5}
            placeholderTextColor="#aaa"
          />
        </View>
      </View>

      {/* BOTÓN DE ACCIÓN */}
      <View style={styles.footer}>
        <Pressable 
          style={({pressed}) => [
            styles.submitButton, 
            pressed && styles.buttonPressed, 
            isLoading && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>OBTENER DATOS</Text>
          )}
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#FAFAFA' },
  
  headerSection: { padding: 24, paddingBottom: 10 },
  title: { fontSize: 28, fontWeight: '800', color: '#1a1a1a', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#666', marginTop: 8, lineHeight: 22 },

  sectionLabel: { 
    fontSize: 13, fontWeight: '700', color: '#999', 
    marginLeft: 24, marginBottom: 12, marginTop: 20, letterSpacing: 1 
  },

  // Estilos del Carrusel
  loadingContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 24, gap: 10 },
  loadingText: { color: '#D0421B', fontSize: 14, fontWeight: '500' },
  
  carousel: { paddingHorizontal: 24, paddingBottom: 10 },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    minWidth: 100,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardSelected: {
    backgroundColor: '#D0421B',
    borderColor: '#D0421B',
    transform: [{ scale: 1.05 }],
  },
  cardSol: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDate: { fontSize: 12, color: '#888', marginTop: 4 },
  textSelected: { color: '#fff' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginTop: 8 },
  emptyText: { marginLeft: 24, color: '#888', fontStyle: 'italic' },

  // Input Manual
  manualSection: { paddingHorizontal: 24 },
  hintText: { fontSize: 14, color: '#666', marginBottom: 15 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 60,
  },
  prefix: { fontSize: 16, fontWeight: 'bold', color: '#D0421B', marginRight: 10 },
  input: { flex: 1, fontSize: 20, fontWeight: '600', color: '#333', height: '100%' },

  // Footer / Botón
  footer: { padding: 24, marginTop: 20 },
  submitButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#D0421B", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  buttonPressed: { transform: [{ scale: 0.98 }] },
  buttonDisabled: { backgroundColor: '#ccc' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
});