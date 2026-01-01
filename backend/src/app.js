import express from "express";
import invoiceRoutes from "./routes/invoiceRoutes.js";

const app = express();

// Global Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/invoices", invoiceRoutes);

export default app;
