const User360 = require('../models/user360')

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID
} = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLID},
    phone: {type: GraphQLString},
    name: {type: GraphQLString}
  }
})

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: {
    phone: {type: GraphQLString},
    name: {type: GraphQLString}
  }
})

const users = {
  type: new GraphQLList(UserType),
  resolve: (root) => new Promise((resolve, reject)=> {
    User360.find((err, users) => {
      err? reject(err) : resolve(users)
    })
  })
}

const user = {
  type: UserType,
  args: {
    id: {name:'id', type: GraphQLID}
  },
  resolve: (root, args) => new Promise((resolve, reject)=> {
    let id
    if (typeof args.id !== 'undefined') id = args.id
    if (typeof root.id !== 'undefined') id = root.id

    User360.findById(id,(err, user) => {
      err? reject(err) : resolve(user)
    })

  })
}

const createUser = {
  type: UserType,
  args: {
    input: {
      name: 'input',
      type: UserInputType
    }
  },
  resolve: (obj, args) => new Promise((resolve, reject) => {
    const {input} = args
    let n_user = new User360({
      phone: input.phone,
      name: input.name
    })
    n_user.save((err, s_user) => err? reject(err.errors) : resolve(s_user) )
  })
}

const updateUser = {
  type: UserType,
  args: {
    id: {name: 'id', type: GraphQLID},
    input: {
      name: 'input',
      type: UserInputType
    },
  },
  resolve: (obj, args) => new Promise((resolve, reject) => {
    const {input, id} = args
    User360.findById(id, (err, f_user) => {
      if (err) reject(err)
      else {
        if (typeof input.phone !== 'undefined') f_user.phone  = input.phone
        if (typeof input.name !== 'undefined') f_user.name  = input.name

        f_user.save((err, e_user) => err? reject(err.errors) : resolve(e_user) )
      }
    })
  })
}

const deleteUser = {
  type: UserType,
  args: {
    id: {name:'id',type: GraphQLID}
  },
  resolve: (obj, args) => new Promise((resolve, reject) => {
    const {id} = args
    User360.findById(id, (err, user) => {
      if (err) reject(err)
      else user.remove((err, d_user)=> err? reject(err) : resolve(d_user) )
    })
  })
}

module.exports = {
  user,
  users,
  createUser,
  updateUser,
  deleteUser
}