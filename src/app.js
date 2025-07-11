 const express= require('express');

 const app= express();
 const connectDB= require('./config/database');

 const {adminAuth}= require('./middlerwares/auth');
const User= require('./models/user');

//  app.use('/',(req,res)=>{
//     res.send('Hellow Rakesh from dasgboard')
//  })

// app.use('/admin',adminAuth, (req,res)=>{
//     res.send('Hellow Rakesh from admin dasgboard')
//  })

//  app.use('/test',(req,res)=>{
//     res.send('Hellow Rakesh')
//  })

//  app.post('/signup',async(req,res)=>{
//    const userObj={
//       firstName: 'Rakesh',
//       lastName: 'Kushwaha',
//       emailId: 'rrr@gmail.com',
//       password:'123456789',
//       age: 22,
//       gender:"male" ,


//    }

// const user= new User(userObj);
//  await user.save() 

// })

app.post('/signup', async (req, res) => {
  try {
    const userObj = {
      firstName: 'Rakesh Kumar',
      lastName: 'Kushwaha',
      emailId: 'rrr@gmail.com',
      password: '12345678',
      age: 22,
      gender: 'male',
    };

    const user = new User(userObj);
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

 
connectDB().then(() => {
  console.log('MongoDB connected successfully');
  app.listen(3000, ()=>{
 
    console.log('sever is running port 3000');
    
 });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

 
