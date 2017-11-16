const {
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql')

const {
  user, users, loginuser, createUser, updateUser, deleteUser,
  request, requests, createRequest, updateRequest, deleteRequest,
  property, properties, createProperty, updateProperty, deleteProperty, changeStatusProperty
} = require('./index')

const appQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users, user, loginuser,
    requests, request,
    properties, property
  }
})
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser, deleteUser, updateUser,
    createRequest, deleteRequest, updateRequest,
    createProperty, deleteProperty, updateProperty,changeStatusProperty,
  }
})
const appSchema = new GraphQLSchema({
  query: appQuery,
  mutation: mutationType
})

module.exports = appSchema