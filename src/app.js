 const express= require('express');
 
 const app= express();
 const connectDB= require('./config/database');

 const {adminAuth, userAuth}= require('./middlerwares/auth');
 
const { validatorSignUp } = require('./utisl/validation');
app.use(express.json())
const cookieParser = require('cookie-parser');
app.use(cookieParser());
 



 const authRouter= require('./routes/auth');
 const profileRouter=require('./routes/profile');
 const requestRouter=require('./routes/request');
 const userRouter=require('./routes/user');

 app.use("/",authRouter);
 app.use('/',profileRouter);
 app.use('/',requestRouter);
 app.use('/',userRouter);
//  app.use('/',userRouter);



 









 
connectDB().then(() => {
  console.log('MongoDB connected successfully');
  app.listen(3000, ()=>{
 
    console.log('sever is running port 3000');
    
 });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

 
