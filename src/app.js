 const express= require('express');

 const app= express();
 const connectDB= require('./config/database');

 const {adminAuth}= require('./middlerwares/auth');
const User= require('./models/user');
app.use(express.json())

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
  console.log(req.body);
  
  try {
    const userObj = req.body

    const user = new User(userObj);
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

app.get('/users', async (req, res) => {
  
  try {
    const users = await User.find();
    console.log('Fetched users:', users);
    
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
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

 
