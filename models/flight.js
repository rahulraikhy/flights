const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        required: true,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    arrival: { type: Date }
}, {
    timestamps: true
});

const flightSchema = new Schema({
    airline: String,
    airport: String,
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: Date,
    destinations: [destinationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);