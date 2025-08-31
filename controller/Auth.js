app.post('/login', async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    console.log('User found:', user);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email ' });
    }
    const passwordMatch = await user.varifypassword(password);
    if (passwordMatch) {

      var token = await  user.getJWT();
      res.cookie('token', token);
      
       res.status(200).json({ message: 'Login successful' });
     
    } else {
 return res.status(401).json({ message: 'Invalid email or password' });
    }


     
    
   
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});