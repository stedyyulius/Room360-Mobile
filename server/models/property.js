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
  type: {type: String, lowercase:true},
  lng: String,
  address: String,
  isActive: {type: Boolean, default: true},
  harga: String
})

let Property = mongoose.model('Property', propertySchema)
module.exports = Property