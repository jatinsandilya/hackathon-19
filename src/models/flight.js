const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const FlightSchema = new Schema({
  id  : { type : Number, required: false },
  abbreviation   : { type : String, required: true, trim: true },
  name    : { type : String, required: true, trim: true },// TODO : Change this condition. 
});

module.exports = mongoose.model('Flight', FlightSchema, 'flights');