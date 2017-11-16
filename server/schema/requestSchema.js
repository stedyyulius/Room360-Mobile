const Request = require('../models/request')

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} = require('graphql')

const {user} = require('./user360Schema')
const {property} = require('./propertySchema')

const RequestType = new GraphQLObjectType({
  name: 'Request',
  fields: {
    customer: user,
    owner: user,
    property: property,
    message: {type: GraphQLString},
    _id: {type: GraphQLID},
  }
})

const RequestInputType = new GraphQLInputObjectType({
  name: 'RequestInputType',
  fields: {
    customer: {type: GraphQLID},
    owner: {type: GraphQLID},
    property: {type: GraphQLID},
    message: {type: GraphQLString},
  }
})

const requests = {
  type: new GraphQLList(RequestType),
  args: {
    owner: {name:'owner', type: GraphQLID}
  },
  resolve: (root, args) => new Promise((resolve, reject)=> {
    let search = {}
    if (typeof args.owner != undefined) search._owner = args.owner
    Request.find(search,(err, requests) => {
      err? reject(err) : resolve(requests)
    })
  })
}

const request = {
  type: RequestType,
  args: {
    id: {name:'id', type: GraphQLID}
  },
  resolve: (root, args) => new Promise((resolve, reject)=> {
    Request.findById(args.id,(err, request) => {
      err? reject(err) : resolve(request)
    })
  })
}

const createRequest = {
  type: RequestType,
  args: {
    input: {
      name: 'input',
      type: RequestInputType
    }
  },
  resolve: (obj, args) => new Promise((resolve, reject) => {
    const {input} = args
    let n_request = new Request({
      _customer: input.customer,
      _owner: input.owner,
      _property: input.property,
      message: input.message
    })
    let data = {
      _customer: input.customer,
      _owner: input.owner,
      _property: input.property,
      message: input.message
    }
    console.log(data)

    n_request.save((err, e_request) => {
      console.log(err)
      if(err) reject(err.errors)
      resolve(e_request)
    })

  })

}

const updateRequest = {
  type: RequestType,
  args: {
    id: {name: 'id', type: GraphQLID},
    input: {
      name: 'input',
      type: RequestInputType
    },
  },
  resolve: (obj, args) => new Promise((resolve, reject) => {
    const {input, id} = args
    Request.findById(id, (err, f_request) => {
      if (err) reject(err)
      else {
        if (typeof input.owner !== 'undefined') f_request._owner  = input.owner
        if (typeof input.customer !== 'undefined') f_request._customer  = input.customer
        if (typeof input.property !== 'undefined') f_request._property  = input.property
        if (typeof input.message !== 'undefined') f_request.message  = input.message

        f_request.save((err, e_request) => err? reject(err.errors) : resolve(e_request) )
      }
    })
  })
}

const deleteRequest = {
  type: RequestType,
  args: {
    id: {name:'id',type: GraphQLID}
  },
  resolve: (obj, args) => new Promise((resolve, reject) => {
    const {id} = args
    Request.findById(id, (err, request) => {
      if (err) reject(err)
      else request.remove((err, d_request)=> err? reject(err) : resolve(d_request) )
    })
  })
}

module.exports = {
  request,
  requests,
  createRequest,
  updateRequest,
  deleteRequest
}