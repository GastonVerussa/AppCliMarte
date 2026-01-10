import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function SolDetailScreen() {
  // Aquí capturamos el ID del día que pasaremos desde la lista
  const { sol } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Reporte Sol ${sol}` }} />
      <Text style={styles.text}>Detalles completos del día {sol}</Text>
      <Text>Aquí irán la gráfica de viento y presión...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});