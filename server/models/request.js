const mongoose = require('mongoose')
const Schema = mongoose.Schema

let requestSchema = new Schema({
  _customer: {type: Schema.Types.ObjectId, ref: 'User360'},
  _owner: {type: Schema.Types.ObjectId, ref: 'User360'},
  _property: {type: Schema.Types.ObjectId, ref: 'Property'},
  message: String
})

let Request = mongoose.model('Request', requestSchema)
module.exports = Request