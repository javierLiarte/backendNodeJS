const event = require('./event')

const ev1 = new event('ev1', 'This is 1st event', 'Short event 1 desciption', Date.now())
const ev2 = new event('ev2', 'This is 2nd event', 'Description of 2nd event', Date.now())
const ev3 = new event('ev3', 'This is last event', 'Last event for now', Date.now())

let events = [ev1, ev2, ev3]

function getAllEvents() {
    return events;
}

function getEventById(id) {
    return events.filter((item) => {
        return item.id === id;
    })[0];
}

function addEvent(newEvent) {
    if (getEventById(newEvent.id)) {
        throw Error('Event id already exists')
    }
    const createdEvent = new event(newEvent.id, newEvent.title, newEvent.description, Date.now());

    events.push(createdEvent);

    return createdEvent;
}

function updateEvent(id, eventDetails) {
    const retrievedEvent = getEventById(id)
    if (retrievedEvent) {
        retrievedEvent.title = eventDetails.title
        retrievedEvent.description = eventDetails.description
        retrievedEvent.date = eventDetails.date
        return retrievedEvent
    } else {
        throw Error(`Event with id ${id} not found.`)
    }
}

function deleteEvent(id) {
    const retrievedEvent = getEventById(id)
    if (retrievedEvent) {
        events = events.filter(item => {
            return item.id != id
        })
        return events
    } else {
        throw Error(`Event with id ${id} not found.`)
    }
}

module.exports =  {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent
};