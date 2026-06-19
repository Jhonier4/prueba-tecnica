const express = require('express');
const router = express.Router();
const { db } = require('../models/database');

// Obtener todas las ordenes
router.get('/', (req, res) => {
    try{
        const orders = db.prepare(`
            SELECT o.id, o.total, o.created_at, c.name as consumer_name 
            FROM orders o 
            INNER JOIN consumers c ON o.consumer_id = c.id`).all();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.get('/:id', (req, res) => {
    try {
        const order = db.prepare(`
            SELECT o.id, o.total, o.created_at, c.name as consumer_name 
            FROM orders o 
            INNER JOIN consumers c ON o.consumer_id = c.id
            WHERE o.id = ?`).get(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'La orden no existe' });
        }

        const items = db.prepare(`
            SELECT od.quantity, od.price, p.name as product_name
            FROM order_details od
            INNER JOIN products p ON od.product_id = p.id
            WHERE od.order_id = ?`).all(req.params.id);

            order.items = items;

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Crear orden
router.post('/', (req, res) => {
    const { consumer_id, items} = req.body;
    if (!consumer_id){
        return res.status(400).json({ error: 'El ID del consumidor es requerido' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Los items de la orden son requeridos' });
    }
    const consumer = db.prepare('SELECT * FROM consumers WHERE id = ?').get(consumer_id);
    if (!consumer) {
        return res.status(404).json({ error: 'El consumidor no existe' });
    }

    const createorder = db.transaction(() => {
        let total = 0;
        for (const item of items) {
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.product_id);
        if (!product) {
            throw new Error(`El producto no existe`);
        }
        if (product.stock < item.quantity) {
            throw new Error(`Stock insuficiente para el producto ${product.name}`);
        }
        total += product.price * item.quantity;
    }
    const result = db.prepare('INSERT INTO orders (consumer_id, total) VALUES (?, ?)').run(consumer_id, total);
    const orderId = result.lastInsertRowid;

    for (const item of items) {
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.product_id);
        db.prepare('INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)').run(orderId, item.product_id, item.quantity, product.price);
        db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.quantity, item.product_id);
    }

    });

    try {
        createorder();
        res.status(201).json({ message: 'Orden creada exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;