import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoicePDF = ({
  invoiceNumber,
  customerName,
  items,
  subTotal,
  gstPercent,
  gstAmount,
  totalAmount,
}) => {
  const invoicesDir = path.join(process.cwd(), "public/invoices");

  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }

  const fileName = `${invoiceNumber}.pdf`;
  const filePath = path.join(invoicesDir, fileName);

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  /* ================= HEADER ================= */

  const logoPath = path.join(process.cwd(), "public/logo.png");
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, 45, { width: 80 });
  }

  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("SHANU Trading Co.", 150, 50)
    .fontSize(10)
    .font("Helvetica")
    .text("GSTIN: 22AAAAA0000A1Z5", 150, 75)
    .text("Address Line 1, City, State, India", 150, 90)
    .text("Phone: +91 99999 99999", 150, 105);

  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("TAX INVOICE", 400, 60, { align: "right" });

  doc.moveDown(3);

  /* ================= INVOICE DETAILS ================= */

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Invoice No: ${invoiceNumber}`)
    .text(`Invoice Date: ${new Date().toLocaleDateString()}`)
    .text(`Bill To: ${customerName}`);

  doc.moveDown(2);

  /* ================= TABLE HEADER ================= */

  const tableTop = doc.y;
  const colX = {
    item: 50,
    price: 280,
    qty: 360,
    total: 430,
  };

  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("Item Description", colX.item, tableTop)
    .text("Price", colX.price, tableTop)
    .text("Qty", colX.qty, tableTop)
    .text("Amount", colX.total, tableTop);

  doc
    .moveTo(50, tableTop + 15)
    .lineTo(550, tableTop + 15)
    .stroke();

  /* ================= TABLE ROWS ================= */

  doc.font("Helvetica").fontSize(10);
  let y = tableTop + 25;

  items.forEach((item) => {
    doc.text(item.name, colX.item, y);
    doc.text(`₹${item.price.toFixed(2)}`, colX.price, y);
    doc.text(item.qty, colX.qty, y);
    doc.text(`₹${(item.price * item.qty).toFixed(2)}`, colX.total, y);
    y += 20;
  });

  doc
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();

  doc.moveDown(2);

  /* ================= TOTALS ================= */

  const rightAlignX = 350;

  doc
    .fontSize(10)
    .text(`Subtotal:`, rightAlignX, y + 10)
    .text(`₹${subTotal.toFixed(2)}`, 500, y + 10, { align: "right" });

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  doc
    .text(`CGST (${gstPercent / 2}%):`, rightAlignX, y + 30)
    .text(`₹${cgst.toFixed(2)}`, 500, y + 30, { align: "right" });

  doc
    .text(`SGST (${gstPercent / 2}%):`, rightAlignX, y + 50)
    .text(`₹${sgst.toFixed(2)}`, 500, y + 50, { align: "right" });

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`Grand Total:`, rightAlignX, y + 80)
    .text(`₹${totalAmount.toFixed(2)}`, 500, y + 80, {
      align: "right",
    });

  doc.moveDown(4);

  /* ================= FOOTER ================= */

  doc
    .font("Helvetica")
    .fontSize(10)
    .text("Terms & Conditions:", 50)
    .fontSize(9)
    .text("• Goods once sold will not be taken back.")
    .text("• This is a computer generated invoice.");

  doc
    .font("Helvetica-Bold")
    .text("\nFor Shanu Trading Co.", 400, doc.y + 20)
    .text("Authorized Signatory", 400, doc.y + 40);

  doc.end();

  return `/invoices/${fileName}`;
};
