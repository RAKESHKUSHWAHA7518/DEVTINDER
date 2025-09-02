const express = require('express');
const { userAuth } = require('../middlerwares/auth');
const requestRouter = express.Router();

requestRouter.post('/sendconnectionrequest',userAuth, async (req, res) => {

  const user=req.user;
  console.log(user);
  
  res.send(`Hellow ${user.firstName} from send connection request`)

})

module.exports= requestRouter