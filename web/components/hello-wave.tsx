import { useState } from "react";
import { generateInvoicePDF } from "./utils/generateInvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "./utils/InvoicePDF";




type Item = {
  name: string;
  price: number;
  qty: number;
};


export function HelloWave() {
  const [customerName, setCustomerName] = useState("");
  const [gstPercent, setGstPercent] = useState(5);
  const [items, setItems] = useState<Item[]>([
  { name: "", price: 0, qty: 1 },
]);


  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const addItem = () => {
    setItems([...items, { name: "", price: 0, qty: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

const updateItem = <K extends keyof Item>(
  index: number,
  field: K,
  value: Item[K]
) => {
  const updated = [...items];
  updated[index] = {
    ...updated[index],
    [field]: value,
  };
  setItems(updated);
};

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );
  const gstAmount = (subtotal * gstPercent) / 100;
  const total = subtotal + gstAmount;

const createInvoice = async () => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        items,
        gstPercent,
      }),
    });

    const data = await res.json();
    setResult(data);
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Invoice</h1>

      {/* Customer */}
      <label style={styles.label}>Customer Name</label>
      <input
        style={styles.input}
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Enter customer name"
      />

      {/* Items */}
      <h3 style={styles.section}>Items</h3>

      {items.map((item, index) => (
        <div key={index} style={styles.itemRow}>
          <input
            style={styles.input}
            placeholder="Item name"
            value={item.name}
            onChange={(e) =>
              updateItem(index, "name", e.target.value)
            }
          />
          
          <input
            style={styles.input}
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
            updateItem(index, "price", Number(e.target.value))
          }
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Qty"
            value={item.qty}
            onChange={(e) =>
            updateItem(index, "qty", Number(e.target.value))
          }

          />
          <button
            style={styles.removeBtn}
            onClick={() => removeItem(index)}
          >
            ✕
          </button>
        </div>
      ))}

      <button style={styles.addBtn} onClick={addItem}>
        + Add Item
      </button>

      {/* GST */}
      <label style={styles.label}>GST (%)</label>
      <input
        style={styles.input}
        type="number"
        value={gstPercent}
        onChange={(e) => setGstPercent(Number(e.target.value))}
      />

      {/* Summary */}
      <div style={styles.summary}>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>GST: ₹{gstAmount.toFixed(2)}</p>
        <h3>Total: ₹{total.toFixed(2)}</h3>
      </div>

      {/* Submit */}
      <button
        style={styles.submitBtn}
        onClick={createInvoice}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Invoice"}
      </button>
{result?.pdfUrl && (
  <a
    href={`http://localhost:5000${result.pdfUrl}`}
    download
    style={{
      display: "block",
      marginTop: 20,
      padding: 12,
      background: "#1890ff",
      color: "#fff",
      textAlign: "center",
      borderRadius: 6,
      textDecoration: "none",
      fontWeight: 600,
    }}
  >
    ⬇ Download Invoice PDF
  </a>
)}

      {/* Result */}
      {result && (
        <pre style={styles.result}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: 24,
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 600,
    marginTop: 12,
    display: "block",
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  itemRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr auto",
    gap: 8,
    marginBottom: 10,
  },
  removeBtn: {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "0 10px",
    cursor: "pointer",
  },
  addBtn: {
    marginTop: 10,
    background: "#1890ff",
    color: "white",
    padding: "8px 14px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },
  summary: {
    marginTop: 20,
    padding: 12,
    background: "#f7f7f7",
    borderRadius: 6,
  },
  submitBtn: {
    width: "100%",
    marginTop: 20,
    padding: 14,
    background: "#52c41a",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
  },
  result: {
    marginTop: 20,
    background: "#111",
    color: "#0f0",
    padding: 12,
    borderRadius: 6,
    fontSize: 12,
  },
};
