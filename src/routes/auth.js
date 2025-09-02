const express = require('express');
const User = require('../models/user');
const { validatorSignUp } = require('../utisl/validation');
const bcrypt = require('bcrypt');
const { userAuth } = require('../middlerwares/auth');
 
const authRouter = express.Router();
 

authRouter.post('/signup', async (req, res) => {
  console.log(req.body);
const password = req.body.password;
const passwordhash = await bcrypt.hash(password, 10);
  console.log('Password hash:', passwordhash);
  
  try {
    validatorSignUp(req)
    const {firstName, lastName, emailId,  age, gender, photoUrl, about, skills} = req.body
console.log(passwordhash);

    const user = new User( {firstName, lastName, emailId, password: passwordhash, age, gender, photoUrl, about, skills});
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: err.message });
  }
});

authRouter.post('/login', async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    console.log('User found:', user);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email ' });
    }
    const passwordMatch = await user.varifypassword(password);
    if (passwordMatch) {

      var token = await  user.getJWT();
      res.cookie('token', token);
      
       res.status(200).json({ message: 'Login successful' });
     
    } else {
 return res.status(401).json({ message: 'Invalid email or password' });
    }


     
    
   
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

authRouter.get('/users',userAuth, async (req, res) => {
const cookes= req.cookies
console.log(cookes);
  try {
    const users = await User.find();
    console.log('Fetched users:', users);
    
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

authRouter.delete('/users', async (req, res) => {

  const userId = req.body.id;   

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.log('Error deleting user:', error);
    
  }
})

authRouter.patch('/users/:userId', async (req, res) => {
  const userId = req.params.userId; 
  const data= req.body
  try {
       const ALLOWED_UPDATES = ['photoUrl', 'gender', 'skills', 'password', 'age', ];    
   const isValidUpdate = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));
    if (!isValidUpdate) {
      return res.status(400).json({ message: ' update not allowed' });
    }

    if(data?.skills.length > 5){
      return res.status(400).json({ message: 'You can only add up to 5 skills' });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) { 
      return res.status(404).json({ message: 'User not found' });
    } 
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.log(error);
    
  }
})



module.exports = authRouter