const express = require('express')
const router = express.Router()

const eventRepository = require('./event_repository');

router.get('/', (req, res) => {
    res.json(eventRepository.getAllEvents())
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

module.exports = router