const mongoose = require('mongoose');
const { tasks, startDays, endDays } = require('./todos');
const Task = require('../models/tasks');

mongoose.connect('mongodb://127.0.0.1:27017/toDoList')
    .then(() => {
        console.log("connection with mongoose successful");
    })
    .catch((error) => {
        console.log("error connecting with mongoose");
        console.log(error);
    })

const select = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Task.deleteMany({});
    for (let i = 0; i < 10; i ++) {
        const todo = new Task({
            name: tasks[i],
            startDay: select(startDays),
            endDay: select(endDays)
        })
        await todo.save();
    }    
}


seedDB().then(() => mongoose.connection.close());

