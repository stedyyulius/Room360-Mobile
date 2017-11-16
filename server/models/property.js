const mongoose = require('mongoose')
const Schema = mongoose.Schema

let propertySchema = new Schema({
  id: String,
  _owner: {type: Schema.Types.ObjectId, ref: 'User360'},
  image: {
    standard: String,
    vr: [String]
  },
  lat: String,
  lng: String,
  address: String,
  isActive: {type: Boolean, default: true}
})

let Property = mongoose.model('Property', propertySchema)
module.exports = Property