const Property = require('../models/property')

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} = require('graphql')

const {user} = require('./user360Schema')

const PropertyType = new GraphQLObjectType({
  name: 'Property',
  fields: {
    id: {type: GraphQLString},
    _id: {type: GraphQLID},
    owner: user,
    address: {type: GraphQLString},
    image: {
      type: new GraphQLObjectType({
        name: "ImageType",
        fields: {
          standard: {type: GraphQLString},
          vr: {type: new GraphQLList(GraphQLString)},
        }
      })
    },
    lat: {type: GraphQLString},
    lng: {type: GraphQLString},
    isActive: {type: GraphQLBoolean},
  }
})

const PropertyInputType = new GraphQLInputObjectType({
  name: 'PropertyInputType',
  fields: {
    id: {type: GraphQLString},
    owner: {type: GraphQLID},
    address: {type: GraphQLString},
    image_standard: {type: GraphQLString},
    image_vr: {type: new GraphQLList(GraphQLString)},
    lat: {type: GraphQLString},
    lng: {type: GraphQLString},
    isActive: {type: GraphQLBoolean},
  }
})

const properties = {
  type: new GraphQLList(PropertyType),
  resolve: (root) => new Promise((resolve, reject)=> {
    Property.find((err, properties) => {
      err? reject(err) : resolve(properties)
    })
  })
}

const property = {
  type: PropertyType,
  args: {
    id: {name:'id', type: GraphQLID}
  },
  resolve: (root, args) => new Promise((resolve, reject)=> {
    Property.findById(args.id,(err, property) => {
      err? reject(err) : resolve(property)
    })
  })
}

const createProperty = {
  type: PropertyType,
  args: {
    input: {
      name: 'input',
      type: PropertyInputType
    }
  },
  resolve: (obj, args) => new Promise((resolve, reject) => {
    const {input} = args
    let n_prop = new Property({
      id: input.id,
      _owner: input.owner,
      image: {
        standard: input.image_standard,
        vr: input.image_vr
      },
      lat: input.lat,
      lng: input.lng,
      address: input.address
    })
    n_prop.save((err, s_property) => err? reject(err.errors) : resolve(s_property) )
  })
}

const updateProperty = {
  type: PropertyType,
  args: {
    id: {name: 'id', type: GraphQLID},
    input: {
      name: 'input',
      type: PropertyInputType
    },
  },
  resolve: (obj, args) => new Promise((resolve, reject) => {
    const {input, id} = args
    Property.findById(id, (err, f_property) => {
      if (err) reject(err)
      else {
        let image = f_property.image || {}

        if (typeof input.id !== 'undefined') f_property.id  = input.id
        if (typeof input.owner !== 'undefined') f_property._owner  = input.owner
        if (typeof input.lat !== 'undefined') f_property.lat  = input.lat
        if (typeof input.lng !== 'undefined') f_property.lng  = input.lng
        if (typeof input.address !== 'undefined') f_property.address  = input.address
        if (typeof input.image_standard !== 'undefined') image.standard  = input.image_standard
        if (typeof input.image_vr !== 'undefined') image.vr  = input.image_vr
        if (typeof input.isActive !== 'undefined') f_property.isActive  = input.isActive
        if (Object.keys(image).length > 0) f_property.image = image

        f_property.save((err, e_property) => err? reject(err.errors) : resolve(e_property) )
      }
    })
  })
}

const deleteProperty = {
  type: PropertyType,
  args: {
    id: {name:'id',type: GraphQLID}
  },
  resolve: (obj, args) => new Promise((resolve, reject) => {
    const {id} = args
    Property.findById(id, (err, user) => {
      if (err) reject(err)
      else user.remove((err, d_user)=> err? reject(err) : resolve(d_user) )
    })
  })
}

module.exports = {
  property,
  properties,
  createProperty,
  updateProperty,
  deleteProperty
}