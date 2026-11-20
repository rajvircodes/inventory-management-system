const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory Management API is running...");
});

app.use("/api/products", productRoutes);

// test database route

app.get("/test-db", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database query failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
