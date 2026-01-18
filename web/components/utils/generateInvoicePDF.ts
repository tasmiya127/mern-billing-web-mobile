import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Item = {
  name: string;
  price: number;
  qty: number;
};

type Invoice = {
  customerName: string;
  items: Item[];
  gstPercent: number;
  invoiceNumber?: string;
  createdAt?: string;
};

export function generateInvoicePDF(invoice: Invoice) {
  const doc = new jsPDF();

  // ===== Header =====
  doc.setFontSize(18);
  doc.text("INVOICE", 14, 20);

  doc.setFontSize(11);
  doc.text("Your Company Name", 14, 30);
  doc.text("GSTIN: XXABCDE1234Z1", 14, 36);
  doc.text("support@company.com", 14, 42);

  // ===== Customer Info =====
  doc.text(`Bill To: ${invoice.customerName}`, 14, 55);
  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    150,
    55,
    { align: "right" }
  );

  // ===== Table =====
  const tableData = invoice.items.map((item, index) => [
    index + 1,
    item.name,
    item.qty,
    item.price,
    item.qty * item.price,
  ]);

  autoTable(doc, {
    startY: 65,
    head: [["#", "Item", "Qty", "Price", "Total"]],
    body: tableData,
    theme: "striped",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  // ===== Totals =====
  const subtotal = invoice.items.reduce(
    (sum, i) => sum + i.qty * i.price,
    0
  );

  const gst = (subtotal * invoice.gstPercent) / 100;
  const grandTotal = subtotal + gst;

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 140, finalY);
  doc.text(`GST (${invoice.gstPercent}%): ₹${gst.toFixed(2)}`, 140, finalY + 7);
  doc.setFontSize(12);
  doc.text(
    `Grand Total: ₹${grandTotal.toFixed(2)}`,
    140,
    finalY + 16
  );

  // ===== Footer =====
  doc.setFontSize(10);
  doc.text(
    "Thank you for your business!",
    105,
    285,
    { align: "center" }
  );

  // ===== Download =====
  doc.save(`Invoice-${invoice.customerName}.pdf`);
}
