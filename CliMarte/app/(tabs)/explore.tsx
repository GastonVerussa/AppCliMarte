import { StyleSheet, FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos simulados para el historial
const HISTORY_DATA = [
  { id: '1', sol: '3000', date: 'Feb 11, 2026', status: 'Soleado', max: '-12°C' },
  { id: '2', sol: '2999', date: 'Feb 10, 2026', status: 'Viento', max: '-18°C' },
  { id: '3', sol: '2998', date: 'Feb 09, 2026', status: 'Tormenta', max: '-22°C' },
  { id: '4', sol: '2997', date: 'Feb 08, 2026', status: 'Soleado', max: '-14°C' },
  { id: '5', sol: '2996', date: 'Feb 07, 2026', status: 'Nublado', max: '-15°C' },
  { id: '6', sol: '2995', date: 'Feb 06, 2026', status: 'Despejado', max: '-13°C' },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial 📜</Text>
        <Text style={styles.subtitle}>Registro de días anteriores</Text>
      </View>

      <FlatList
        data={HISTORY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.dateInfo}>
              <Text style={styles.solText}>Sol {item.sol}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.weatherInfo}>
              <Text style={styles.statusText}>{item.status}</Text>
              <Text style={styles.tempText}>{item.max}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dateInfo: {
    flexDirection: 'column',
  },
  solText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  weatherInfo: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  tempText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D0421B', // Un color "marciano" para la temperatura
  },
});