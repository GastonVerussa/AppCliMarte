import { StyleSheet, FlatList, Pressable, View, Text } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos de prueba
const DATA = [
  { id: '1', sol: '3001', max: '-15°C', min: '-75°C' },
  { id: '2', sol: '3002', max: '-14°C', min: '-74°C' },
  { id: '3', sol: '3003', max: '-16°C', min: '-78°C' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CliMarte 🪐</Text>
        <Link href="/add-report" asChild>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Nota</Text>
          </Pressable>
        </Link>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/weather/${item.sol}`} asChild>
            <Pressable style={styles.card}>
              <View>
                <Text style={styles.solTitle}>Sol {item.sol}</Text>
                <Text style={styles.date}>Feb 12, 2026</Text>
              </View>
              <View style={styles.tempContainer}>
                <Text style={styles.temp}>{item.max}</Text>
                <Text style={styles.subTemp}>{item.min}</Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  addButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 8 },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee'
  },
  solTitle: { fontSize: 18, fontWeight: 'bold' },
  date: { color: '#666' },
  tempContainer: { alignItems: 'flex-end' },
  temp: { fontSize: 22, fontWeight: 'bold' },
  subTemp: { color: '#666' },
});