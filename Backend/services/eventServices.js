const Event = require('../models/Events');

/* ─────────────  CREATE  ─────────────────────────────────────── */
exports.createEvent = async (req, res, next) => {
    try {
        const event = await Event.create({
            ...req.body,
            createdBy: req.user.id
        });
        res.status(201).json({ success: true, data: { event } });
    } catch (err) { next(err); }
};

/* ─────────────  READ — list  ────────────────────────────────── */
exports.getEvents = async (req, res, next) => {
    try {
        const { category, search, date } = req.query;
        const q = {};
        if (category) q.category = category;
        if (date)     q.date     = date;
        if (search)   q.$or = [
            { name:        { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];

        const events = await Event
            .find(q)
            .populate('createdBy', 'name _id')
            .sort({ date: 1, time: 1 });

        res.json({ success: true, data: { events } });
    } catch (err) { next(err); }
};

/* ─────────────  READ — single  ──────────────────────────────── */
exports.getEventById = async (req, res, next) => {
    try {
        const event = await Event
            .findById(req.params.id)
            .populate('createdBy', 'name _id');

        if (!event)
            return res.status(404).json({ success: false, message: 'Event not found' });

        res.json({ success: true, data: { event } });
    } catch (err) { next(err); }
};

/* ─────────────  UPDATE  ─────────────────────────────────────── */
exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event)
            return res.status(404).json({ success: false, message: 'Event not found' });

        if (String(event.createdBy) !== req.user.id)
            return res.status(403).json({ success: false, message: 'Forbidden' });

        Object.assign(event, req.body);
        await event.save();

        res.json({ success: true, data: { event } });
    } catch (err) { next(err); }
};

/* ─────────────  DELETE  ─────────────────────────────────────── */
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event)
            return res.status(404).json({ success: false, message: 'Event not found' });

        if (String(event.createdBy) !== req.user.id)
            return res.status(403).json({ success: false, message: 'Forbidden' });

        await event.deleteOne();
        res.json({ success: true, message: 'Event deleted' });
    } catch (err) { next(err); }
};
