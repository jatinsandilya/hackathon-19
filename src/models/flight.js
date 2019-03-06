const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const FlightSchema = new Schema({
  id  : { type : Number, required: false },
  firstName   : { type : String, required: true, trim: true },
  lastName    : { type : String, required: true, trim: true },// TODO : Change this condition. 
});

module.exports = mongoose.model('Flight', FlightSchema, 'flights');
