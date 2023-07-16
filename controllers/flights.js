const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

async function index(req, res) {
    try {
        const flights = await Flight.find({});
        res.render('flights/index', { title: 'All Flights', flights }); //check on vid
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}

async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id, function (err, flight) {
            Ticket.find({ flight: flight._id }, function (err, tickets) {
                //res.render tickets back to flight details page
            });
        });

        // const ratingSum = flight.destinations.reduce((acc, destination) => acc + destination.rating, 0)
        // const ratingAverage = 9000;

        const tickets = await Ticket.find({ _id: { $nin: flight.ticketsgenerator } });

        res.render('flights/show', { title: 'Flight Details', flight, tickets });
        // , ratingAverage to follow flight above in curly crackets if req'd
    } catch (err) {
        console.log(err);
        res.redirect('/flights');
    }
}

function newFlight(req, res) {
    res.render('flights/new', { errorMsg: '' });
}

async function create(req, res) {
    req.body.addFlights = !!req.body.addFLights;
    try {
        const flight = await Flight.create(req.body);
        res.redirect(`/flights/${flight._id}`);
    } catch (err) {
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
    }
}

module.exports = {
    index,
    create,
    new: newFlight,
    show
}; ``