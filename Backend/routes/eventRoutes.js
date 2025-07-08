const express  = require('express');
const router   = express.Router();
const auth     = require('../middleware/auth');
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../services/eventService');

router.post  ('/events',     auth,                  createEvent);
router.get ('/events',       auth,                       getEvents);
router.get   ('/events/:id',   auth, getEventById);
router.put   ('/events/:id', auth,                  updateEvent);
router.delete('/events/:id', auth,                       deleteEvent);
module.exports = router;
