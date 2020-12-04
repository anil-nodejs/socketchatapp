const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/socket', (req, res) => {
    res.render('chat');
})
app.post('/socket', (req, res) => {
    res.render('chat');
})

app.get('/newslatter', (req, res) => {
    res.render('newslatter')
})

app.post('/newslatter', (req, res) => {
    res.render('newslatter')
})

module.exports = app;