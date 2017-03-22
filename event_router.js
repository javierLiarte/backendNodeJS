const express = require('express')
const router = express.Router()

const eventRepository = require('./event_repository');

router.get('/', (req, res) => {
    eventRepository.getAllEvents()
        .then((events) => {
            res.status(200).json(events);
        })
})

router.post('/', (req, res, next) => {
    eventRepository.addEvent(req.body)
        .then(createdEvent => {
            res.status(201).json(createdEvent)
        })
        .catch(next)
});

router.get('/:id', (req, res, next) => {
    eventRepository.getEventById(req.params.id)
        .then(retrievedEvent => {
            res.json(retrievedEvent);
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    eventRepository.updateEvent(req.params.id, req.body)
        .then(updatedEvent => {
            res.json(updatedEvent)
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    eventRepository.deleteEvent(req.params.id)
        .then(events => {
            res.status(202).json(events)
        })
        .catch(next)
})

router.use(function (err, req, res, next) {
    console.log(`Error in method ${req.method}: ${err.message}`)
    res.status(err.status).json({ error: err.message });
})

module.exports = router