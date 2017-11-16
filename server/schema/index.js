const { user, users, createUser, updateUser, deleteUser } = require('./user360Schema')
const { request, requests, createRequest, updateRequest, deleteRequest } = require('./requestSchema')
const { property, properties, createProperty, updateProperty, deleteProperty } = require('./propertySchema')

module.exports = {
  user, users, createUser, updateUser, deleteUser,
  request, requests, createRequest, updateRequest, deleteRequest,
  property, properties, createProperty, updateProperty, deleteProperty
}