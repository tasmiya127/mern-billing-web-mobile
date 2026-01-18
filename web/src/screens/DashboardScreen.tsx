import * as React from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { Card } from '../../components/Card';
import { useNavigation } from '@react-navigation/native';
import api from '../api/api';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [stats, setStats] = React.useState({ totalInvoices: 0, totalRevenue: 0 });

//   React.useEffect(() => {
//     api.get('/invoices/stats').then(res => setStats(res.data));
//   }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Card>
        <Text>Total Invoices: {stats.totalInvoices}</Text>
      </Card>
      <Card>
        <Text>Total Revenue: ${stats.totalRevenue}</Text>
      </Card>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Invoices' as never)}>
        <Text style={styles.buttonText}>View Invoices</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('CreateInvoice' as never)}>
        <Text style={styles.buttonText}>Create Invoice</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  button: { backgroundColor: '#1D4ED8', padding: 12, marginVertical: 8, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
