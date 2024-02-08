const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const Task = require('./models/tasks');
const methodOverride = require('method-override');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/toDoList')
    .then(() => {
        console.log("connection with mongoose successful");
    })
    .catch((error) => {
        console.log("error connecting with mongoose");
        console.log(error);
    })

app.engine('ejs', ejsMate);
app.set('path', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.get('/index', async (req, res) => {
    const tasks = await Task.find({});    
    res.render('tasks/index', { tasks });
})

app.get('/index/new', (req, res) => {
    res.render('tasks/new');
})

app.get('/index/:id/edit', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('tasks/edit', { task });
})

app.get('/index/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('tasks/details', { task });
})

app.post('/index', async(req, res) => {
    const task = new Task(req.body.task);
    await task.save();
    res.redirect(`/index/${task._id}`);
})

app.put('/index/:id', async (req, res) => {
    const { id } = req.params;
    const { name, startDay, endDay } = req.body;
    const task = await Task.findByIdAndUpdate(id, { name, startDay, endDay });
    res.redirect(`/index/${task._id}`);
})

app.delete('/index/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect('/index');
})

app.listen(3000, () => {
    console.log('listening...');
})