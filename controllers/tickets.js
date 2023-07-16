const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

async function newTicket(req, res) {
    const tickets = await Ticket.find({}).sort('seat');
    res.render('tickets/new', { title: 'Add ticket', tickets });
}

async function create(req, res) {
    req.body.seat;
    try {
        await Ticket.create(req.body);
    } catch (err) {
        console.log(err);
    }
    res.redirect('./tickets.new');
}

async function addToTicketsGenerator(req, res) {
    const flight = await Flight.findById(req.params.id);
    flight.ticketsGenerator.push(req.body.ticketId);
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
}

module.exports = {
    new: newTicket,
    create,
    addToTicketsGenerator
};