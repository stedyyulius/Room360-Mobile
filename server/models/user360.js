const mongoose = require('mongoose')
const Schema = mongoose.Schema

let user360Schema = new Schema({
  phone: String,
  name: String
})

let User360 = mongoose.model('User360', user360Schema)
module.exports = User360