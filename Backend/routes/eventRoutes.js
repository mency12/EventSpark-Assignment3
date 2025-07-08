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
router.post('/events', verifyToken, createEvent);

// GET /api/events
router.get('/events', verifyToken, getEvents);

// GET /api/events/:id
router.get('/events/:id', verifyToken, getEventById);

// PUT /api/events/:id
router.put('/events/:id', verifyToken, updateEvent);

// DELETE /api/events/:id
router.delete('/events/:id', verifyToken, deleteEvent);

module.exports = router;
