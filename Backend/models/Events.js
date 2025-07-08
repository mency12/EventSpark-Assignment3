const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        name:        { type: String, required: true, trim: true },
        description: { type: String, required: true },
        date:        { type: String, required: true },   // ISO or yyyy-mm-dd
        time:        { type: String, required: true },   // HH:mm
        venue:       { type: String, required: true },
        category:    { type: String, required: true },
        totalSeats:  { type: Number, required: true },
        imageUrl:    { type: String },                   // optional
        createdBy:   {                                   // linkage to User
            type: mongoose.Schema.Types.ObjectId,
            ref:  'User',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
