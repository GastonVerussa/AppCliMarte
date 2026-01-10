import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type StatCardProps = {
  label: string;
  value: string;
  subValue?: string; // Opcional, para la fecha
  isWide?: boolean;  // Opcional, para la tarjeta ancha oscura
  style?: ViewStyle;
};

export function StatCard({ label, value, subValue, isWide = false, style }: StatCardProps) {
  return (
    <View style={[styles.card, isWide && styles.cardWide, style]}>
      <Text style={[styles.label, isWide && styles.textWhite]}>{label}</Text>
      <Text style={[styles.value, isWide ? styles.valueBig : null]}>{value}</Text>
      {subValue && <Text style={styles.date}>{subValue}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '47%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
    marginBottom: 15,
  },
  cardWide: {
    width: '100%',
    backgroundColor: '#333',
  },
  label: { fontSize: 14, color: '#888', marginBottom: 5, textTransform: 'uppercase' },
  value: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  valueBig: { fontSize: 42, fontWeight: 'bold', color: '#fff' },
  textWhite: { color: '#ccc' },
  date: { color: '#bbb', fontSize: 14, marginTop: 5 },
});