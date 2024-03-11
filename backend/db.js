const mongoose= require('mongoose');
const mongoURI ="mongodb://localhost:27017/test_db"

const connectToMongo = () =>{
    mongoose.connect(mongoURI)
   .then(() =>{
       console.log("Mongo connected succesfully!");
   })

   .catch(error =>{
       console.log("error");
   })
    }

module.exports = connectToMongo;
