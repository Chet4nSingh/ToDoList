const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    startDay: String,
    endDay: String
});

module.exports = mongoose.model('Task', taskSchema);