import Invoice from "../models/invoice.js";

export const createInvoice = async (req, res) => {
  try {
    const { customerName, items, gstPercent } = req.body;

    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid invoice data" });
    }

    const subTotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const gstAmount = (subTotal * (gstPercent || 0)) / 100;
    const totalAmount = subTotal + gstAmount;

    const invoice = await Invoice.create({
      invoiceNumber: `INV-${Date.now()}`,
      customerName,
      items,
      subTotal,
      gstPercent,
      gstAmount,
      totalAmount
    });

    res.status(201).json({
      message: "Invoice created successfully",
      invoice
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
