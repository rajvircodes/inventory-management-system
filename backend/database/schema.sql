CREATE DATABASE IF NOT EXISTS inventory_db;

USE inventory_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, category, price, quantity)
VALUES
('Notebook', 'Stationery', 40.00, 50),
('Pen', 'Stationery', 10.00, 100),
('Pencil', 'Stationery', 5.00, 8),
('Eraser', 'Stationery', 5.00, 25),
('School Bag', 'Accessories', 500.00, 5);