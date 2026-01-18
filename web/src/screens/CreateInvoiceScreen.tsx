import * as React from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';

export default function CreateInvoiceScreen() {
  const navigation = useNavigation();
  const [customerName, setCustomerName] = React.useState('');
  const [items, setItems] = React.useState([{ name: '', quantity: '', price: '' }]);

  const addItem = () => setItems([...items, { name: '', quantity: '', price: '' }]);

  const handleSubmit = async () => {
    try {
      const invoiceData = { customerName, items };
      await api.post('/invoices', invoiceData);
      Alert.alert('Success', 'Invoice created');
      navigation.navigate('Invoices' as never);
    } catch (error) {
      Alert.alert('Error', 'Failed to create invoice');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Invoice</Text>
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />
      {items.map((item, idx) => (
        <View key={idx} style={styles.itemRow}>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={item.name}
            onChangeText={text => {
              const newItems = [...items];
              newItems[idx].name = text;
              setItems(newItems);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={item.quantity}
            keyboardType="numeric"
            onChangeText={text => {
              const newItems = [...items];
              newItems[idx].quantity = text;
              setItems(newItems);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={item.price}
            keyboardType="numeric"
            onChangeText={text => {
              const newItems = [...items];
              newItems[idx].price = text;
              setItems(newItems);
            }}
          />
        </View>
      ))}
      <Pressable style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Invoice</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 6 },
  itemRow: { marginBottom: 8 },
  button: { backgroundColor: '#1D4ED8', padding: 12, marginVertical: 8, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
