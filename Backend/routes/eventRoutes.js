const express = require('express');
const router  = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../services/eventServices');

// POST /api/events
router.post('/', verifyToken, createEvent);

// GET /api/events
router.get('/', verifyToken, getEvents);

// GET /api/events/:id
router.get('/:id', verifyToken, getEventById);

// PUT /api/events/:id
router.put('/:id', verifyToken, updateEvent);

// DELETE /api/events/:id
router.delete('/:id', verifyToken, deleteEvent);

module.exports = router;
