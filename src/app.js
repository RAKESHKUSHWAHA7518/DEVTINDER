 const express= require('express');

 const app= express();
 const connectDB= require('./config/database');

 const {adminAuth}= require('./middlerwares/auth');


//  app.use('/',(req,res)=>{
//     res.send('Hellow Rakesh from dasgboard')
//  })

app.use('/admin',adminAuth, (req,res)=>{
    res.send('Hellow Rakesh from admin dasgboard')
 })

 app.use('/test',(req,res)=>{
    res.send('Hellow Rakesh')
 })

 
connectDB().then(() => {
  console.log('MongoDB connected successfully');
  app.listen(3000, ()=>{
 
    console.log('sever is running port 3000');
    
 });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

 
