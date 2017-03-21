const event = require('./event')

const ev1 = new event('ev1', 'This is 1st event', 'Short event 1 desciption', Date.now())
const ev2 = new event('ev2', 'This is 2nd event', 'Description of 2nd event', Date.now())
const ev3 = new event('ev3', 'This is last event', 'Last event for now', Date.now())

const events = [ev1, ev2, ev3]

module.exports = function getAllEvents() {
    return events
}