const { user, users, loginuser, createUser, updateUser, deleteUser } = require('./user360Schema')
const { request, requests, createRequest, updateRequest, deleteRequest } = require('./requestSchema')
const { property, properties, createProperty, updateProperty, deleteProperty, changeStatusProperty } = require('./propertySchema')

module.exports = {
  user, users, loginuser, createUser, updateUser, deleteUser,
  request, requests, createRequest, updateRequest, deleteRequest,
  property, properties, createProperty, updateProperty, deleteProperty, changeStatusProperty
}