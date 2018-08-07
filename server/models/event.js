const mongoose = require('../server/node_modules/mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title : {type : String, unique : true, lowercase: true},
    location : String,
    startDate : String,
    photoPath : String,
    endDate   : String,
    description : String,
    organizerName : String,
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;