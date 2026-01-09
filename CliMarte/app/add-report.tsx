import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function AddReportScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Nueva Nota de Campo', presentation: 'modal' }} />

      <Text style={styles.label}>Título de la observación</Text>
      <TextInput style={styles.input} placeholder="Ej: Tormenta de arena" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput 
        style={[styles.input, { height: 100 }]} 
        placeholder="Detalles del evento..." 
        multiline 
      />

      <Button title="Guardar Nota" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 5 },
});