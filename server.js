// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ตั้งค่าเส้นทางสู่ไฟล์ Front-end
app.use(express.static(path.join(__dirname, 'public')));

// ตั้งค่าการเชื่อมต่อกับ MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Nonkungz',        // แทนที่ด้วยชื่อผู้ใช้ MySQL ของคุณ
    password: '12062521',    // แทนที่ด้วยรหัสผ่าน MySQL ของคุณ
    database: 'nonkungz'     // แทนที่ด้วยชื่อฐานข้อมูลของคุณ
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// API สำหรับดึงข้อมูลสินค้าทั้งหมด หรือค้นหาตามชื่อ
app.get('/api/products', (req, res) => {
    const searchTerm = req.query.search || '';
    let sql = 'SELECT * FROM products';
    let params = [];
    if (searchTerm) {
        sql += ' WHERE name LIKE ?';
        params.push(`%${searchTerm}%`);
    }
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// API สำหรับดึงข้อมูลสินค้าตาม ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(results[0]);
    });
});

// API สำหรับเพิ่มสินค้าใหม่
app.post('/api/products', (req, res) => {
    const { name, quantity, price } = req.body;
    const sql = 'INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)';
    db.query(sql, [name, quantity, price], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ id: result.insertId, name, quantity, price });
    });
});

// API สำหรับอัปเดตสินค้า
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    const sql = 'UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?';
    db.query(sql, [name, quantity, price, id], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json({ id, name, quantity, price });
    });
});

// API สำหรับลบสินค้า
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json({ message: 'Product deleted', id });
    });
});

// API สำหรับซื้อสินค้า
app.post('/api/purchase', (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Missing productId or quantity' });
    }

    // ตรวจสอบว่าสินค้ามีในสต็อกเพียงพอหรือไม่
    const selectSql = 'SELECT * FROM products WHERE id = ?';
    db.query(selectSql, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = results[0];

        if (product.quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient stock' });
        }

        const totalPrice = product.price * quantity;

        // เริ่ม Transaction
        db.beginTransaction((err) => {
            if (err) {
                console.error('Error starting transaction:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // ลดจำนวนสินค้าจากสต็อก
            const updateSql = 'UPDATE products SET quantity = quantity - ? WHERE id = ?';
            db.query(updateSql, [quantity, productId], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Error updating product quantity:', err);
                        res.status(500).json({ error: 'Internal server error' });
                    });
                }

                // บันทึกรายการซื้อสินค้า
                const insertPurchaseSql = 'INSERT INTO purchases (product_id, quantity, total_price) VALUES (?, ?, ?)';
                db.query(insertPurchaseSql, [productId, quantity, totalPrice], (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Error inserting purchase:', err);
                            res.status(500).json({ error: 'Internal server error' });
                        });
                    }

                    // Commit Transaction
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.error('Error committing transaction:', err);
                                res.status(500).json({ error: 'Internal server error' });
                            });
                        }

                        res.json({ message: 'Purchase successful', totalPrice });
                    });
                });
            });
        });
    });
});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
