require('dotenv').config();

require('./config/database');

const Flight = require('./models/flight');
const Ticket = require('./models/ticket');

const flights = await Flight.find({});
console.log(flights);