import Invoice from "../models/invoice.js";
import { generateInvoicePDF } from "../utils/generateInvoicePDF.js";

export const createInvoice = async (req, res) => {
  try {
    const { customerName, items, gstPercent } = req.body;

    if (!customerName || !items?.length) {
      return res.status(400).json({ message: "Invalid invoice data" });
    }

    const subTotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const gstAmount = (subTotal * gstPercent) / 100;
    const totalAmount = subTotal + gstAmount;

    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = await Invoice.create({
      invoiceNumber,
      customerName,
      items,
      subTotal,
      gstPercent,
      gstAmount,
      totalAmount,
    });

    const pdfUrl = generateInvoicePDF({
      invoiceNumber,
      customerName,
      items,
      subTotal,
      gstPercent,
      gstAmount,
      totalAmount,
    });

    res.status(201).json({
      message: "Invoice created",
      invoice,
      pdfUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
