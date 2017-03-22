const express = require('express')
const router = express.Router()

const eventRepository = require('./event_repository');

router.get('/', (req, res) => {
    eventRepository.getAllEvents()
        .then((events) => {
            res.status(200).json(events);
        })
})

router.post('/', (req, res) => {
    eventRepository.addEvent(req.body)
        .then(createdEvent => {
            res.status(201).json(createdEvent)
        }).catch(err => {
            console.log(`Error creating event: ${err.message}`)
            res.status(409).json({ error: err.message })
    })
});

router.get('/:id', (req, res) => {
    eventRepository.getEventById(req.params.id)
        .then(retrievedEvent => {
            res.json(retrievedEvent);
        })
        .catch(err => {
            res.status(404).json({ error: err.message });
        })
})

router.put('/:id', (req, res) => {
    eventRepository.updateEvent(req.params.id, req.body)
        .then(updatedEvent => {
            res.json(updatedEvent)
        }).catch(err => {
            console.log(`Error updating event: ${err.message}`)
            res.status(400).json({ error: err.message })
    })
})

router.delete('/:id', (req, res) => {
    eventRepository.deleteEvent(req.params.id)
        .then(events => {
            res.status(202).json(events)
        }).catch(err => {
            console.log(`Error deleting event: ${err.message}`)
            res.status(400).json({ error: err.message })
    })
})

module.exports = router