 const express= require('express');

 const app= express();


 app.use('/',(req,res)=>{
    res.send('Hellow Rakesh from dasgboard')
 })
 app.use('/test',(req,res)=>{
    res.send('Hellow Rakesh')
 })

 app.listen(3000, ()=>{

    console.log('sever is running port 3000');
    
 });
