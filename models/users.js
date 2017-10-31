var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UsersSchema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  sex: {
    type: Boolean,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  identitycard: {
    type: Number,
    required: true,
  },
  roleId: {
    type: Number,
    required: true,
  }
});
var Users = mongoose.model('Users', UsersSchema);
module.exports = Users;
//
//get user by email
module.exports.getUserByEmail = function(email, callback){
  var query = {email: email};
  
	Users.findOne(query, callback);
}
//get employee by id
module.exports.getUserById = function(id, callback){
	Users.findById(id, callback);
}
//update employee
module.exports.updateUser = function(id,user,options,callback){
  var query = {_id:id};
  Users.findOneAndUpdate(query,user,options,callback);
}