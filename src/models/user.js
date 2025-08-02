// import mongoose from 'mongoose';
// const { Schema } = mongoose;

const { type } = require('express/lib/response');
var validator = require('validator');
const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = User ;