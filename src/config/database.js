const mongoose = require('mongoose');

// connectDB().catch(err => console.log(err));

 const connectDB = async () => {
  await mongoose.connect('mongodb+srv://collegepdf7518:Rakesh7518@cluster0.ffvsorc.mongodb.net/devTinder');

 
}


module.exports = connectDB;