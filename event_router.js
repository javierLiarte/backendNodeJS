const express = require('express')
const router = express.Router()

const eventRepository = require('./event_repository');

router.get('/', (req, res) => {
    res.json(eventRepository.getAllEvents())
})

router.post('/', (req, res) => {
    const newEvent = eventRepository.addEvent(req.body);

    res.status(201).json(newEvent);
});

router.get('/:id', (req, res) => {
    const event = eventRepository.getEventById(req.params.id);

    res.status(event ? 200 : 404).json(event ? event : { error: 'Not found' });
})

module.exports = router