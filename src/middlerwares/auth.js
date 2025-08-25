 const jwt = require('jsonwebtoken');
const User = require('../models/user');
//  const User = require('../models/userModel');
 
   const  userAuth= async(req, res, next) => {
   const cookies= req.cookies
// console.log(cookes);
  const {token} = cookies
  try {

    if(!token){
      return res.status(401).json({ message: 'Token is not found' });
    }

   
    const isverify = await jwt.verify(token, 'Rakesh7518');
 

    if(!isverify){
      return res.status(401).json({ message: 'Unauthorized access' });
    } 

     const user = await User.findById(isverify.id);

      if(!user){
      return res.status(401).json({ message: 'User not found' });
    } 
    req.user= user;
    next();
   
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
}

module.exports = {userAuth};