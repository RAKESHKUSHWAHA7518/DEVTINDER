
const express = require('express');
const { userAuth } = require('../middlerwares/auth');
const { validateEditProfileData } = require('../utisl/validation');

 
const profileRouter = express.Router();
profileRouter.get('/Profile/view',userAuth, async (req, res) => {
  const user= req.user
  console.log(user);
  
 
  try {
    
    res.status(200).json(user);
    
   
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

profileRouter.patch('/Profile/edit',userAuth, async (req, res) => {
  // const user= req.user
  // console.log(user);
  
 
  try {
   if(!validateEditProfileData(req)){
throw new Error('Error fetching users u');
    
   }

    
   
    const loggedInuser =req.user
    console.log(loggedInuser);
    

    Object.keys(req.body).forEach((key) => {
      loggedInuser[key] = req.body[key];
    })

   loggedInuser.save();
    // console.log(user);
    
  res.send({message:`${loggedInuser.firstName} your profile has been updated successfully`,
    data:loggedInuser
  });
 
   
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});
module.exports= profileRouter