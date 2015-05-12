var mongoose = require('mongoose');

var assignSchema = new mongoose.Schema({
    name: String,
    score: Number,
    date_completed: Date
});

module.exports = mongoose.model('assignment', assignSchema);