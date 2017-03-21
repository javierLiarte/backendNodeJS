const express = require('express')
const router = express.Router()

const eventRepository = require('./event_repository')

router.get('/', (req, res) => {
    res.json(eventRepository())
})

module.exports = router