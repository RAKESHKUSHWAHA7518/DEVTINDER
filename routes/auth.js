const express = require('express');
const authrouter = express.Router();


authrouter.post('/signup', async (req, res) => {
  console.log(req.body);
const password = req.body.password;
const passwordhash = await bcrypt.hash(password, 10);
  console.log('Password hash:', passwordhash);
  
  try {
    validatorSignUp(req)
    const {firstName, lastName, emailId,  age, gender, photoUrl, about, skills} = req.body
console.log(passwordhash);

    const user = new User( {firstName, lastName, emailId, password: passwordhash, age, gender, photoUrl, about, skills});
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: err.message });
  }
});