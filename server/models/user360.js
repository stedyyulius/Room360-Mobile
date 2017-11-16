const mongoose = require('mongoose')
const Schema = mongoose.Schema

const login = require('../helpers/login')

let user360Schema = new Schema({
  phone: String,
  name: String,
  password: String
})

user360Schema.pre('save', function(next) {
  if (this.isModified('password'))
    this._doc.password = login.hashPassword(this._doc.password);
  next();
});

let User360 = mongoose.model('User360', user360Schema)
module.exports = User360