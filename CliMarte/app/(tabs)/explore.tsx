import { useState } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useWeather } from '../../src/context/WeatherContext'; // <--- Conectamos al cerebro

export default function ExploreScreen() {
  // 1. Traemos los datos REALES
  const { reports } = useWeather();
  const [search, setSearch] = useState('');

  // 2. Lógica de filtrado: Buscamos por número de Sol
  const filteredReports = reports.filter(item => 
    item.sol.includes(search) || item.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial 📜</Text>
        <Text style={styles.subtitle}>Base de datos completa</Text>
        
        {/* Barra de Búsqueda */}
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar Sol (ej: 3001)..."
          value={search}
          onChangeText={setSearch}
          keyboardType="numeric"
        />
      </View>

      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.id}
        // Mensaje si no hay resultados
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron reportes.</Text>
        }
        renderItem={({ item }) => (
          // Hacemos que cada ítem sea clickeable para ir al detalle
          <Link href={`/weather/${item.sol}`} asChild>
            <Pressable style={styles.itemContainer}>
              <View style={styles.dateInfo}>
                <Text style={styles.solText}>Sol {item.sol}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <View style={styles.weatherInfo}>
                <Text style={styles.statusText}>{item.status}</Text>
                <Text style={styles.tempText}>{item.max}</Text>
              </View>
            </Pressable>
          </Link>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 15 },
  
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  
  listContent: { padding: 20 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20, fontSize: 16 },
  
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dateInfo: { flexDirection: 'column' },
  solText: { fontSize: 18, fontWeight: '600', color: '#333' },
  dateText: { fontSize: 14, color: '#888', marginTop: 2 },
  weatherInfo: { alignItems: 'flex-end' },
  statusText: { fontSize: 14, color: '#555', marginBottom: 2 },
  tempText: { fontSize: 18, fontWeight: 'bold', color: '#D0421B' },
});