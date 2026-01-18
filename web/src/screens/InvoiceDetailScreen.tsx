import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import api from '../api/api';

export default function InvoiceDetailScreen({ route }: any) {
  const { id } = route.params;
  const [invoice, setInvoice] = React.useState<any>(null);

//   React.useEffect(() => {
//     api.get(`/invoices/${id}`).then(res => setInvoice(res.data));
//   }, [id]);

  if (!invoice) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Invoice Detail</Text>
      <Text>Customer: {invoice.customerName}</Text>
      <Text>Status: {invoice.status}</Text>
      <Text>Total: ${invoice.total}</Text>
      <Text style={styles.subtitle}>Items:</Text>
      {invoice.items.map((item: any, idx: number) => (
        <View key={idx} style={styles.itemRow}>
          <Text>{item.name}</Text>
          <Text>
            {item.quantity} x ${item.price}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { marginTop: 16, fontWeight: 'bold' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
});
