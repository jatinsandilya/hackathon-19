const flightsRepo = require('../../../lib/flightsRepository'),
      statesRepo = require('../../../lib/statesRepository'),
      util = require('util');

class FlightsController {

    constructor(router) {
        router.get('/', this.getFlights.bind(this));
        router.get('/page/:skip/:top', this.getFlightsPage.bind(this));
        router.get('/:id', this.getFlight.bind(this));
        router.post('/', this.insertFlight.bind(this));
        router.put('/:id', this.updateFlight.bind(this));
        router.delete('/:id', this.deleteFlight.bind(this));
    }

    getFlights(req, res) {
        console.log('*** getFlights');
        flightsRepo.getFlights((err, data) => {
            if (err) {
                console.log('*** getFlights error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getFlights ok');
                res.json(data.flights);
            }
        });
    }

    getFlightsPage(req, res) {
        console.log('*** getFlightsPage');
        const topVal = req.params.top,
              skipVal = req.params.skip,
              top = (isNaN(topVal)) ? 10 : +topVal,
              skip = (isNaN(skipVal)) ? 0 : +skipVal;

        flightsRepo.getPagedFlights(skip, top, (err, data) => {
            res.setHeader('X-InlineCount', data.count);
            if (err) {
                console.log('*** getFlightsPage error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getFlightsPage ok');
                res.json(data.flights);
            }
        });
    }

    getFlight(req, res) {
        console.log('*** getFlight');
        const id = req.params.id;
        console.log(id);

        flightsRepo.getFlight(id, (err, flight) => {
            if (err) {
                console.log('*** getFlight error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getFlight ok');
                res.json(flight);
            }
        });
    }

    insertFlight(req, res) {
        console.log('*** insertFlight');

        flightsRepo.insertFlight(req.body, (err, flight) => {
            if (err) {
                console.log('*** FlightsRepo.insertFlight error: ' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', flight: null});
            } else {
                console.log('*** insertFlight ok');
                res.json({ status: true, error: null, flight: flight });
            }
        });
    }

    updateFlight(req, res) {
        console.log('*** updateflight');
        console.log('*** req.body');
        console.log(req.body);

        if (!req.body || !req.body.stateId) {
            throw new Error('flight and associated stateId required');
        }

        statesRepo.getState(req.body.stateId, (err, state) => {
            if (err) {
                console.log('*** statesRepo.getState error: ' + util.inspect(err));
                res.json({ status: false, error: 'State not found', flight: null });
            } else {
                flightsRepo.updateflight(req.params.id, req.body, state, (err, flight) => {
                    if (err) {
                        console.log('*** updateflight error: ' + util.inspect(err));
                        res.json({ status: false, error: 'Update failed', flight: null });
                    } else {
                        console.log('*** updateflight ok');
                        res.json({ status: true, error: null, flight: flight });
                    }
                });
            }
        });
    }

    updateFlight(req, res) {
        console.log('*** updateFlight');
        console.log('*** req.body');
        console.log(req.body);

        if (!req.body || !req.body.stateId) {
            throw new Error('Flight and associated stateId required');
        }

        statesRepo.getState(req.body.stateId, (err, state) => {
            if (err) {
                console.log('*** statesRepo.getState error: ' + util.inspect(err));
                res.json({ status: false, error: 'State not found', flight: null });
            } else {
                flightsRepo.updateFlight(req.params.id, req.body, state, (err, flight) => {
                    if (err) {
                        console.log('*** updateFlight error: ' + util.inspect(err));
                        res.json({ status: false, error: 'Update failed', flight: null });
                    } else {
                        console.log('*** updateFlight ok');
                        res.json({ status: true, error: null, flight: flight });
                    }
                });
            }
        });
    }

    deleteFlight(req, res) {
        console.log('*** deleteflight');

        flightsRepo.deleteFlight(req.params.id, (err) => {
            if (err) {
                console.log('*** deleteflight error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteflight ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = FlightsController;