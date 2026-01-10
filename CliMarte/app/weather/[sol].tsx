import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useWeather } from '../../src/context/WeatherContext';

export default function SolDetailScreen() {
  const { sol } = useLocalSearchParams();
  const router = useRouter();
  
  // 1. Traemos la función deleteReport del contexto
  const { reports, deleteReport } = useWeather();

  const report = reports.find(r => r.sol === String(sol));

  // 2. Función para confirmar y borrar
  const handleDelete = () => {
    Alert.alert(
      "Eliminar Reporte",
      `¿Estás seguro de eliminar los datos del Sol ${sol}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => {
            if (report) {
              deleteReport(report.id); // Borramos del estado y memoria
              router.back(); // Volvemos a la lista
            }
          }
        }
      ]
    );
  };

  if (!report) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <Text style={styles.errorText}>Reporte no encontrado.</Text>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen 
        options={{ 
          title: `Sol ${sol}`,
          // 3. Agregamos el botón rojo en la esquina derecha
          headerRight: () => (
            <Pressable onPress={handleDelete} style={({pressed}) => ({ opacity: pressed ? 0.5 : 1 })}>
              <Text style={{ fontSize: 24 }}>🗑️</Text>
            </Pressable>
          ),
        }} 
      />

      <View style={styles.mainCard}>
        <Text style={styles.dateLabel}>{report.date}</Text>
        <Text style={styles.tempHuge}>{report.max}</Text>
        
        <View style={styles.row}>
          <Text style={styles.tempMin}>Mínima: {report.min}</Text>
          <Text style={styles.statusBadge}>{report.status}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Datos Atmosféricos</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>💨 Viento</Text>
          <Text style={styles.detailValue}>NO 14 km/h</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>📉 Presión</Text>
          <Text style={styles.detailValue}>752 Pa</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>☀️ Radiación UV</Text>
          <Text style={styles.detailValue}>Alta</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  errorText: { fontSize: 18, color: '#666', textAlign: 'center', marginTop: 50 },
  backButton: { marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 8, alignSelf: 'center' },
  backText: { color: '#333' },
  
  mainCard: {
    backgroundColor: '#333',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dateLabel: { color: '#ccc', fontSize: 18, marginBottom: 10 },
  tempHuge: { fontSize: 64, fontWeight: 'bold', color: '#fff' },
  row: { flexDirection: 'row', gap: 15, marginTop: 10, alignItems: 'center' },
  tempMin: { color: '#aaa', fontSize: 18 },
  statusBadge: { 
    backgroundColor: '#D0421B', 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 12, 
    color: 'white', 
    fontWeight: 'bold', 
    overflow: 'hidden' 
  },

  detailsContainer: {
    padding: 10,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  detailRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  detailLabel: { fontSize: 16, color: '#555' },
  detailValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});