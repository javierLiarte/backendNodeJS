const express = require('express')
const router = express.Router()

const eventRepository = require('./models/event_repository');

const getAllEventsRoute = (req, res) => {
    eventRepository.getAllEvents()
        .then((events) => {
            res.status(200).json(events);
        })
};

const createEventRoute = (req, res, next) => {
    eventRepository.addEvent(req.body)
        .then(createdEvent => {
            res.status(201).json(createdEvent)
        })
        .catch(next)
};
const getEventByIdRoute = (req, res, next) => {
    eventRepository.getEventById(req.params.id)
        .then(retrievedEvent => {
            res.json(retrievedEvent);
        })
        .catch(next)
};

const updateEventRoute = (req, res, next) => {
    eventRepository.updateEvent(req.params.id, req.body)
        .then(updatedEvent => {
            res.json(updatedEvent)
        })
        .catch(next)
};

const deleteEventRoute = (req, res, next) => {
    eventRepository.deleteEvent(req.params.id)
        .then(events => {
            res.status(202).json(events)
        })
        .catch(next)
};

router.route('/')
    .get(getAllEventsRoute)
    .post( createEventRoute);
router.route('/:id')
    .get(getEventByIdRoute)
    .put(updateEventRoute)
    .delete(deleteEventRoute)

router.use((err, req, res, next) => {
    console.log(`Error in method ${req.method}: ${err.message}`)
    res.status(err.status).json({ error: err.message });
})

module.exports = router