 const express = require('express');
 const userRouter = express.Router();
 const User = require('../models/user');
 const { userAuth } = require('../middlerwares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');

 userRouter.get('/user/requests/received',userAuth, async (req, res) => {
  const loggedInUser= req.user
  console.log(loggedInUser);
  
 
  try {

    const connectionRequests=await ConnectionRequestModel.find(
        {toUserId:loggedInUser._id,status:"interested"})
        .populate('fromUserId',['firstName','lastName','age','gender','about','photoUrl','skills','photourl']) 
    res.status(200).json(connectionRequests);
    
   
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

 userRouter.get('/user/connections',userAuth, async (req, res) => {
  const loggedInUser= req.user
  console.log(loggedInUser);
  
 
  try {

    const connectionRequests=await ConnectionRequestModel.find(
        {
            $or:[{toUserId:loggedInUser._id,status:"accepted"},{fromUserId:loggedInUser._id,status:"accepted"}]})
        .populate('fromUserId',['firstName','lastName','age','gender','about','photoUrl','skills','photourl']).populate('toUserId',['firstName','lastName','age','gender','about','photoUrl','skills','photourl'])  

        const data= connectionRequests.map((row)=>{if(row.fromUserId._id.toString()===loggedInUser._id.toString()) {return row.toUserId }; return row.fromUserId})
    res.status(200).json( data);
    
   
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// userRouter.get('/feed',userAuth, async (req, res) => {
//   const loggedInUser= req.user
//   console.log(loggedInUser);
  
 
//   try {

//     const connectionRequests=await ConnectionRequestModel.find(
//         {toUserId:loggedInUser._id,status:"interested"})
//         .populate('fromUserId',['firstName','lastName','age','gender','about','photoUrl','skills','photourl']) 
//     res.status(200).json(connectionRequests);
    
   
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ message: 'Error fetching users' });
//   }
// });
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter