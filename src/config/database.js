const mongoose = require('mongoose');

// connectDB().catch(err => console.log(err));

 const connectDB = async () => {
  await mongoose.connect('mongodb+srv://collegepdf7518:Rakesh7518@cluster0.ffvsorc.mongodb.net/devTinder');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


module.exports = connectDB;