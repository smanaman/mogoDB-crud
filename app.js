const express=require('express');
const app=express();
const path=require('path')
const db =require('./config/db')
const admin=require('./models/admintbl')

app.set('view engine','ejs')
app.use('views',express.static(path.join(__dirname,'views')))
app.use(express.urlencoded())


app.get('/',(req,res)=>{

    res.render('form')


}) 

app.get('/showdata',async(req,res)=>{
    try{

    const users=await admin.find()
        res.render('showdata',{users})
    }
    catch(error){
        console.log(error);
        
    }
})

app.post('/adddata',(req,res)=>{

    const {name,email,phone,password,city,gender,hobby}=req.body;

admin.create({
    name:name,
    email:email,
    phone:phone,
    password:password,
    city:city,
    gender:gender,
    hobby:hobby
})
    res.redirect('/')
})
app.listen(3000,()=>{
    console.log('http://localhost:3000');
 
    
}) 