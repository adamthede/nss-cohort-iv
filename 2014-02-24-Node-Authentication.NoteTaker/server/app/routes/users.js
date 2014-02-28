'use strict';

var User = require('../models/user');

exports.create = function(req, res){
  var user = new User(req.body);
  user.hash(function(){
    user.insert(function(user){
      if(!user){
        res.send({success:false});
      }
      else{
        res.send({success:true});
      }
    });
  });
};

exports.login = function(req, res){
  res.send({success:true});
};
