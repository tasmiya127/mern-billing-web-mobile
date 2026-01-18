import * as React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';

export default function InvoiceListScreen() {
  const [invoices, setInvoices] = React.useState([]);
  const navigation = useNavigation();

//   React.useEffect(() => {
//     api.get('/invoices').then(res => setInvoices(res.data));
//   }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Invoices</Text>
      {invoices.map((invoice: any) => (
        <Pressable
          key={invoice._id}
          style={styles.card}
        //   onPress={() => navigation.navigate('InvoiceDetail' as never, { id: invoice._id } as never)}
        >
          <Text>Invoice ID: {invoice._id}</Text>
          <Text>Customer: {invoice.customerName}</Text>
          <Text>Status: {invoice.status}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 12, borderWidth: 1, borderColor: '#ccc', marginBottom: 8, borderRadius: 6 },
});
