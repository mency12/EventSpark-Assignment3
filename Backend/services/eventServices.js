
const Event = require('../models/Event');

/* ─────────────  CREATE  ─────────────────────────────────────── */
exports.createEvent = async (req, res, next) => {
    try {
        const event = await Event.create({
            ...req.body,          // name, description, date, time, venue, category, totalSeats, imageUrl
            createdBy: req.user.id
        });

        return res.status(201).json({
            success: true,
            data: { event }
        });
    } catch (err) {
        next(err);
    }
};

/* ─────────────  READ (list)  ────────────────────────────────── */
exports.getEvents = async (req, res, next) => {
    try {
        const { category, search, date } = req.query;
        const query = {};

        if (category) query.category = category;
        if (date)     query.date     = date;         // expecting ISO or yyyy-mm-dd

        if (search) {
            query.$or = [
                { name:        { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const events = await Event
            .find(query)
            .populate('createdBy', 'name _id')
            .sort({ date: 1, time: 1 });

        return res.json({
            success: true,
            data: { events }
        });
    } catch (err) {
        next(err);
    }
};

/* ─────────────  UPDATE  ─────────────────────────────────────── */
exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // only the creator can update
        if (String(event.createdBy) !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }

        // merge incoming fields (all optional)
        Object.assign(event, req.body);
        await event.save();

        return res.json({
            success: true,
            data: { event }
        });
    } catch (err) {
        next(err);
    }
};

/* ─────────────  DELETE  ─────────────────────────────────────── */
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        if (String(event.createdBy) !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }

        await event.deleteOne();
        return res.json({ success: true, message: 'Event deleted' });
    } catch (err) {
        next(err);
    }
};
