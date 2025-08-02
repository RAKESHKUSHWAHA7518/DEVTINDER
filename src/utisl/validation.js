
var validator = require('validator');

const validatorSignUp=(req)=>{
    const {firstName, lastName, emailId, password }=req.body;

    if(!firstName || !lastName){
        throw new Error(' name is not valid');
    } else if( firstName.length < 4 || lastName.length < 4){
        throw new Error(' name must be at least 3 characters long');
    } else if(!validator.isEmail(emailId)){
        throw new Error('Email is not valid');
    } else if(!validator.isStrongPassword(password)){
        throw new Error('Password is not strong enough');
    }
    console.log();
    

}

module.exports = { validatorSignUp };