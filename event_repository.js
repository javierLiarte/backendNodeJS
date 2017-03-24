const Event = require('./event')

const ev1 = new Event('ev1', 'This is 1st event', 'Short event 1 desciption', Date.now())
const ev2 = new Event('ev2', 'This is 2nd event', 'Description of 2nd event', Date.now())
const ev3 = new Event('ev3', 'This is last event', 'Last event for now', Date.now())

let events = [ev1, ev2, ev3]

function getAllEvents() {
    return new Promise((resolve, reject) => {
        resolve(events);
    });
}

function getEventById(id) {
    return new Promise((resolve, reject) => {
        const filteredEvent = events.find((item) => {
            return item.id === id;
        });
        if (filteredEvent) {
            resolve(filteredEvent)
        } else {
            reject({status: 404, message: `Event with id ${id} not found.`})
        }
    })
}

function addEvent(newEvent) {
    return new Promise((resolve, reject) => {
        getEventById(newEvent.id)
            .then(existingEvent => {
            reject({status: 409, message: `Event id ${newEvent.id} already exists`})
        }).catch(err => {
            const createdEvent = new Event(newEvent.id, newEvent.title, newEvent.description, Date.now());
            events.push(createdEvent);
            resolve(createdEvent);
        })
    })
}

function updateEvent(id, eventDetails) {
    return new Promise((resolve, reject) => {
        getEventById(id)
            .then(retrievedEvent => {
                retrievedEvent.title = eventDetails.title
                retrievedEvent.description = eventDetails.description
                retrievedEvent.date = eventDetails.date
                resolve(retrievedEvent)
            })
            .catch(err => {
                reject({status: 400, message: err.message })
            })
    })
}

function deleteEvent(id) {
    return new Promise((resolve, reject) => {
        getEventById(id)
            .then(retrievedEvent => {
                events = events.filter(item => {
                    return item.id != id
                })
                resolve(events)
            }).catch(err => {
                reject({status: 400, message: err.message })
        })
    })
}

module.exports =  {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent
};