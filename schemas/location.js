const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  type: { type: String, default: 'Point', required: [true, 'Type (Point) required'] },
  coordinates: { type: [],  required: [true, 'Coordinates required'] }
});

module.exports = LocationSchema;

