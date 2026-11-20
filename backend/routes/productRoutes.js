const express = require("express");
const router = express.Router();

const db = require("../database");

// 1. GET ALL PRODUCTS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: results,
    });
  });
});

// 2. GET SINGLE PRODUCT
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch product",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: results[0],
    });
  });
});

// 3. ADD NEW PRODUCT
router.post("/", (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof category !== "string" ||
    !category.trim() ||
    price === undefined ||
    quantity === undefined ||
    !Number.isFinite(Number(price)) ||
    !Number.isInteger(Number(quantity)) ||
    Number(price) < 0 ||
    Number(quantity) < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid product details",
    });
  }

  const sql = `
        INSERT INTO products (name, category, price, quantity)
        VALUES (?, ?, ?, ?)
    `;

  const values = [
    name.trim(),
    category.trim(),
    Number(price),
    Number(quantity),
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to add product",
      });
    }

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      productId: result.insertId,
    });
  });
});

// 4. UPDATE PRODUCT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof category !== "string" ||
    !category.trim() ||
    price === undefined ||
    quantity === undefined ||
    !Number.isFinite(Number(price)) ||
    !Number.isInteger(Number(quantity)) ||
    Number(price) < 0 ||
    Number(quantity) < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid product details",
    });
  }

  const sql = `
        UPDATE products
        SET name = ?, category = ?, price = ?, quantity = ?
        WHERE id = ?
    `;

  const values = [
    name.trim(),
    category.trim(),
    Number(price),
    Number(quantity),
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update product",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  });
});

// 5. DELETE PRODUCT
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete product",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  });
});

module.exports = router;
