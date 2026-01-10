import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWeather } from '../../src/context/WeatherContext';
import { StatCard } from '../../src/components/StatCard'; // <--- Importamos tu nuevo componente

export default function HomeScreen() {
  const { reports } = useWeather();

  // --- CÁLCULOS DE ESTADÍSTICAS ---
  const lastReport = reports.length > 0 ? reports[0] : null;
  const totalReports = reports.length;
  
  // Calcular temperatura promedio (simple)
  const avgTemp = reports.length > 0 
    ? Math.round(reports.reduce((acc, curr) => acc + parseInt(curr.max), 0) / reports.length) + '°C'
    : '--';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. SECCIÓN DE BIENVENIDA (HERO) */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Misión Mars 2026 🚀</Text>
          <Text style={styles.heroSubtitle}>Sistema de Monitoreo Ambiental</Text>
          
          <Text style={styles.heroText}>
            Bienvenido a la estación CliMarte. Utiliza este dashboard para consultar 
            las condiciones atmosféricas actuales o registrar nuevas observaciones del rover.
          </Text>

          {/* Botón de Acción Principal (CTA) */}
          <Link href="/add-report" asChild>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>+ NUEVA CONSULTA</Text>
            </Pressable>
          </Link>
        </View>

        {/* 2. DASHBOARD DE ESTADÍSTICAS */}
        <Text style={styles.sectionTitle}>Resumen de la Misión</Text>
        
        <View style={styles.statsGrid}>
          {/* Usamos el componente reutilizable StatCard */}
          <StatCard 
            label="Registros Totales" 
            value={String(totalReports)} 
          />
          
          <StatCard 
            label="Temp. Promedio" 
            value={avgTemp} 
          />

          {/* Tarjeta ancha para el último reporte */}
          <StatCard 
            label="Último Sol Registrado" 
            value={lastReport?.sol || '--'} 
            subValue={lastReport?.date || 'Sin datos recientes'}
            isWide={true} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContent: { padding: 20 },

  // Estilos de Bienvenida (Hero)
  heroSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heroTitle: { fontSize: 26, fontWeight: 'bold', color: '#D0421B', marginBottom: 5 },
  heroSubtitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 15 },
  heroText: { 
    textAlign: 'center', color: '#666', lineHeight: 22, marginBottom: 25, fontSize: 15 
  },
  
  // Botón Grande
  ctaButton: {
    backgroundColor: '#D0421B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#D0421B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  ctaButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },

  // Estilos Generales
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },
  
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
});