const express = require('express');
const router = express.Router();
const { db } = require('../models/database');

// obtener consumidores
router.get('/', (req, res) => {
    try {
        const consumers = db.prepare('SELECT * FROM consumers').all();
        res.json(consumers);
    } catch (error) {
        console.error('Error al obtener consumidores:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
}); 


// Crear consumidor
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Nombre y correo electrónico son requeridos' });
    }try {
        const result = db.prepare('INSERT INTO consumers (name, email) VALUES (?, ?)').run(name, email);
        res.status(201).json({ id: result.lastInsertRowid, name, email });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});


//actualizar consumidor
router.put('/:id', (req, res) => {
    const { name, email } = req.body;
    try {
        const existing = db.prepare('SELECT * FROM consumers WHERE id = ?').get(req.params.id);
        if (!existing) {
            return res.status(404).json({ error: 'El consumidor no existe' });
        }
        db.prepare('UPDATE consumers SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?').run(name, email, req.params.id);
        res.json({ message: 'Consumidor actualizado' });
    } catch (error) {
        console.error('Error al actualizar consumidor:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// eliminar consumidor
router.delete('/:id', (req, res) => {
    try {
        const existing = db.prepare('SELECT * FROM consumers WHERE id = ?').get(req.params.id);
        if (!existing) {
            return res.status(404).json({ error: 'El consumidor no existe' });
        }
        db.prepare('DELETE FROM consumers WHERE id = ?').run(req.params.id);
        res.json({ message: 'Consumidor eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;