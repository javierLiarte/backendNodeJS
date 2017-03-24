const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function sayHello(req, res, next) {
    console.log('Hello');
    next();
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/events', require('./event_router'));

app.post('/', (req, res) => {
    res.send('Hello World from method post');
});

app.listen(3000, (err) => {
    if (err) throw new Error(err);
    console.log('Server is running!');
});
