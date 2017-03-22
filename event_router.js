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
    try {
        const newEvent = eventRepository.addEvent(req.body);
        res.status(201).json(newEvent);
    } catch (err) {
        console.log(`Error creating event: ${err.message}`)
        res.status(409).json({ error: err.message })
    }
});

router.get('/:id', (req, res) => {
    const event = eventRepository.getEventById(req.params.id);

    res.status(event ? 200 : 404).json(event ? event : { error: 'Not found' });
})

router.put('/:id', (req, res) => {
    try {
        res.json(eventRepository.updateEvent(req.params.id, req.body))
    } catch (err) {
        console.log(`Error updating event: ${err.message}`)
        res.status(400).json({ error: err.message })
    }
})

router.delete('/:id', (req, res) => {
    try {
        res.status(202).json(eventRepository.deleteEvent(req.params.id))
    } catch (err) {
        console.log(`Error deleting event: ${err.message}`)
        res.status(400).json({ error: err.message })
    }
})

module.exports = router