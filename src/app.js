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

app.delete('/users', async (req, res) => {

  const userId = req.body.id;   

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.log('Error deleting user:', error);
    
  }
})

app.patch('/users/:userId', async (req, res) => {
  const userId = req.params.userId; 
  const data= req.body
  try {
       const ALLOWED_UPDATES = ['photoUrl', 'gender', 'skills', 'password', 'age', ];    
   const isValidUpdate = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));
    if (!isValidUpdate) {
      return res.status(400).json({ message: ' update not allowed' });
    }

    if(data?.skills.length > 5){
      return res.status(400).json({ message: 'You can only add up to 5 skills' });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) { 
      return res.status(404).json({ message: 'User not found' });
    } 
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.log(error);
    
  }
})

 
connectDB().then(() => {
  console.log('MongoDB connected successfully');
  app.listen(3000, ()=>{
 
    console.log('sever is running port 3000');
    
 });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

 
