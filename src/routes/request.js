const express = require('express');
const { userAuth } = require('../middlerwares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');
const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId',userAuth, async (req, res) => {
 
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status=req.params.status
    console.log(fromUserId);
    console.log(toUserId);

 const allowedStatus = ['ignore', 'interested',];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status type' });
    }

    const user = await User.findById(toUserId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingRequest = await ConnectionRequestModel.findOne({ $or: [{ fromUserId, toUserId }, { fromUserId: toUserId, toUserId: fromUserId }] });
    if (existingRequest) {
      return res.status(400).json({ message: 'Connection request already exists' });
    }
    
    const connectionRequest = new ConnectionRequestModel({ fromUserId, toUserId ,status});
   const data= await connectionRequest.save();
    res.status(200).json({
      data: data,
       message: 'Connection request sent successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Internal server error' });
    
  }
  // const user=req.user;
  // console.log(user);
  
  // res.send(`Hellow ${user.firstName} from send connection request`)

})

requestRouter.post('/request/review/:status/:requestId',userAuth, async (req, res) => {
 
  try {
     const loggedInUser = req.user;
     console.log(loggedInUser);
     
     const {status,requestId}=req.params
 const allowedStatus = ['accepted','rejected'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status type' });
    }

    

    const connectionRequest = await ConnectionRequestModel.findOne({ _id: requestId,toUserId: loggedInUser._id,status:"interested" });
    if (!connectionRequest) {
      return res.status(400).json({ message: 'Connection request  not found' });
    }
    connectionRequest.status=status
    // const connectionRequest = new ConnectionRequestModel({ fromUserId, toUserId ,status});
   const data= await connectionRequest.save();
    res.status(200).json({
      data: data,
       message: 'Connection request sent successfully' });
       
  } catch (error) {
    res.status(400).json({ message: 'Internal server error' });
    
  }
  // const user=req.user;
  // console.log(user);
  
  // res.send(`Hellow ${user.firstName} from send connection request`)

})

module.exports= requestRouter