
const express = require('express');
const { userAuth } = require('../middlerwares/auth');

 
const profileRouter = express.Router();
profileRouter.get('/Profile',userAuth, async (req, res) => {
  const user= req.user
  console.log(user);
  
 
  try {
    
    res.status(200).json(user);
    
   
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports= profileRouter