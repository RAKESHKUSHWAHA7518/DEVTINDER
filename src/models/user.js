// import mongoose from 'mongoose';
// const { Schema } = mongoose;

const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
  firstName:  {
    type: String,
   
    
  }, // String is shorthand for {type: String}
  lastName: {
    type: String,
    
  },
  emailId:{
type:String
  },

  password: {
    type: String,
},
  age:{
    type:Number
  },
  gender:{
   type:String 
  }
 

});

const User = mongoose.model('User', userSchema);

module.exports = User ;