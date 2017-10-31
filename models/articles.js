var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var ArticlesSchema = new mongoose.Schema({
  _id : {
    type : String,
    required : true,
    unique : true,
    trim : true
  },
  title: {
    type: String,
    required: true,
  },
  lv: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default : Date.now,
    required: true,
  },
  volumeId: {
    type: Number,
    trim: true
  },
  statusId: {
    type: Number,
    trim: true
  },
  cafile:{
      type: String
  },
  description: {
    type: String,
    required: true,
  },
  vote : {
      type:Number,
  },
  tgemail : {
    type: String,
    required:true
  }
});

var Articles = mongoose.model('Articles', ArticlesSchema);
module.exports = Articles; 

//get article by something
module.exports.getArticleBySth = function(id,tgemail, callback){
  var query = {_id:id,tgemail: tgemail};
  
	Articles.findOne(query, callback);
}
//get article by id
module.exports.getArticleById = function(id, callback){
	Articles.findById(id, callback);
}
//create article
module.exports.createArticle = function(newArticle, callback){
  newArticle.save(callback);
}
//update article
module.exports.updateArticle = function(id, article,options,callback){
  var query = {_id : id};
  Articles.findOneAndUpdate(query,article,options,callback);
}
//delete article
module.exports.deleteArticle = function(id, callback){
  var query = {_id : id};
  Articles.remove(query,callback);
}