var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var EmployeesSchema = mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique : true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  address:{
    type : String
  },
  phone : {
      type : String
  },
    role:{
      rid:{
        type:Number,
        require : true,
        trim : true
      },
      rname:{
        type:String,
        require : true 
      }
    },
  sex: {
      type : Boolean,
      default : true
  },
  cpn : {
      type : String
  },
  name : {
      type : String
  }
});

var Employees = mongoose.model('Employees', EmployeesSchema);
module.exports = Employees;

//get employee by email
module.exports.getEmployeeByEmail = function(email, callback){
  var query = {email: email};
  
	Employees.findOne(query, callback);
}
//get employee by id
module.exports.getEmployeeById = function(id, callback){
	Employees.findById(id, callback);
}
//update employee
module.exports.updateEmployee = function(id,employee,options,callback){
  var query = {_id:id};
  Employees.findOneAndUpdate(query,employee,options,callback);
}