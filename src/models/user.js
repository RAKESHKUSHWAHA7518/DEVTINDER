// import mongoose from 'mongoose';
// const { Schema } = mongoose;

const { type } = require('express/lib/response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var validator = require('validator');
const mongoose = require('mongoose');
const e = require('express');

const userSchema =  mongoose.Schema({
  firstName:  {
    type: String,
    required: true,
   
    
  }, // String is shorthand for {type: String}
  lastName: {
    type: String,
    
  },
  emailId:{
type:String,
required:true,
unique:true,
trim:true,
lowercase:true,
validate(value){

  if(!validator.isEmail(value)){
    throw new Error('Email is invalid')
  }
}
  },

  password: {
    type: String,
    validate(value){
  if(!validator.isStrongPassword(value)){
    throw new Error('Email is invalid')
  }
}
},
  age:{
    type:Number
  },
  gender:{
   type:String ,
   validate(value){
    if(value !== 'male' && value !== 'female'&& value !== 'others'){
      throw new Error('Gender must be male or female')
    } 
   }
  },
  photoUrl:
  {
    type:String,
    validate(value){
  if(!validator.isURL(value)){
    throw new Error('Email is invalid')
  }
}
  },
  about:{
    type:String,
    default: 'No description provided'
  },
  skills:{
type:[String]
  },
 
 

} ,{ timestamps: true  });

 userSchema.methods.getJWT= async function(){
  const user= this
  var token = await jwt.sign({ id: user._id }, 'Rakesh7518',{expiresIn:'2h'});
  return token;
 }
  userSchema.methods.varifypassword= async function(password){
  const user= this
  var token = await bcrypt.compare(password, user.password);
  return token;
 }

const User = mongoose.model('User', userSchema);

module.exports = User ;