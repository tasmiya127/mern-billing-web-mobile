import express from "express";
import cors from "cors";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import path from "path";

const app = express();

// ✅ Enable CORS (VERY IMPORTANT)
app.use(
  cors({
    origin: "http://localhost:8081",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Global Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend running");
});
app.use(
  "/invoices",
  express.static(path.join(process.cwd(), "public/invoices"))
);
app.use("/api/invoices", invoiceRoutes);

export default app;
