const express = require('express');
const router = express.Router();
const { db } = require('../models/database');

// Obtener Productos
router.get('/', (req, res) => {
    try{
        const products = db.prepare('SELECT * FROM products').all();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});


//crear producto
router.post('/', (req, res) => {
    const { name, price, stock, description } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }
    if (price < 0 ){
        return res.status(400).json({ error: 'El precio no puede ser negativo' });
    } 
    try {
        const result = db.prepare('INSERT INTO products (name, price, stock, description) VALUES (?, ?, ?, ?)').run(name, price, stock ?? 0, description ?? null);
        res.status(201).json({ id: result.lastInsertRowid, name, price, stock: stock ?? 0, description: description ?? null });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});


//actualizar producto
router.put('/:id', (req, res) => {
    const { name, price, stock, description } = req.body;
    try {
        const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
        if (!existing) {
            return res.status(404).json({ error: 'El producto no existe' });
        }
        db.prepare('UPDATE products SET name = COALESCE(?, name), price = COALESCE(?, price), stock = COALESCE(?, stock), description = COALESCE(?, description) WHERE id = ?').run(name, price, stock, description ?? null, req.params.id);
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// eliminar producto
router.delete('/:id', (req, res) => {
    try {
        const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
        if (!existing) {
            return res.status(404).json({ error: 'El producto no existe' });
        }
        db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;