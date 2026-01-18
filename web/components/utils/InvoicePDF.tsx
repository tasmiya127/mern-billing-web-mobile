import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

type Item = {
  name: string;
  price: number;
  qty: number;
};

type Props = {
  customerName: string;
  items: Item[];
  gstPercent: number;
};

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11 },
  title: { fontSize: 20, marginBottom: 20 },
  section: { marginBottom: 10 },
  row: {
    flexDirection: "row",
    borderBottom: "1 solid #ccc",
    paddingVertical: 6,
  },
  cell: { flex: 1 },
  total: { textAlign: "right", marginTop: 10, fontSize: 12 },
});

export function InvoicePDF({
  customerName,
  items,
  gstPercent,
}: Props) {
  const subtotal = items.reduce(
    (sum, i) => sum + i.qty * i.price,
    0
  );
  const gst = (subtotal * gstPercent) / 100;
  const total = subtotal + gst;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>INVOICE</Text>

        <Text style={styles.section}>
          Customer: {customerName}
        </Text>

        <View style={styles.row}>
          <Text style={styles.cell}>Item</Text>
          <Text style={styles.cell}>Qty</Text>
          <Text style={styles.cell}>Price</Text>
          <Text style={styles.cell}>Total</Text>
        </View>

        {items.map((item, i) => (
          <View style={styles.row} key={i}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.qty}</Text>
            <Text style={styles.cell}>₹{item.price}</Text>
            <Text style={styles.cell}>
              ₹{item.qty * item.price}
            </Text>
          </View>
        ))}

        <Text style={styles.total}>
          Subtotal: ₹{subtotal.toFixed(2)}
        </Text>
        <Text style={styles.total}>
          GST ({gstPercent}%): ₹{gst.toFixed(2)}
        </Text>
        <Text style={styles.total}>
          Grand Total: ₹{total.toFixed(2)}
        </Text>
      </Page>
    </Document>
  );
}
