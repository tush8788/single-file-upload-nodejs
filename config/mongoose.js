const mongoose=require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost/Post-Comment-DB');

const db=mongoose.connection;

db.on('Error',console.error.bind(console,"Error in connect in DB"));

db.once('open',function(){
    console.log("Successfuly connected into DB");
})

module.exports=db;