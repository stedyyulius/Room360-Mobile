const {
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql')

const {
  user, users, createUser, updateUser, deleteUser,
  request, requests, createRequest, updateRequest, deleteRequest,
  property, properties, createProperty, updateProperty, deleteProperty
} = require('./index')

const appQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users, user,
    requests, request,
    properties, property
  }
})
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser, deleteUser, updateUser,
    createRequest, deleteRequest, updateRequest,
    createProperty, deleteProperty, updateProperty,
  }
})
const appSchema = new GraphQLSchema({
  query: appQuery,
  mutation: mutationType
})

module.exports = appSchema