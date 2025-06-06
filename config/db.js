const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/crud')

const db=mongoose.connection;

db.once('open',(error)=>{
   
    if(error){
        console.log('Error connecting to the database:', error);
    } 
    console.log('Database connected successfully');
})


