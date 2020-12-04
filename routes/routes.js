const express = require('express');

const app = express.Router();


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/socket', (req, res, next) => {
    next();
    res.render('chat');
})

app.post('/socket', (req, res) => {
    res.render('chat');
})


module.exports = app;