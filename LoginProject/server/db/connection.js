const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://sahil:Sahilpund100@cluster0.vlajov8.mongodb.net/LOGIN?retryWrites=true&w=majority")
.then(()=>{
    console.log(" CONNECTED SUCCESSFULLY.. ");
})
.catch((error)=>{
    console.log(`There is error while connecting : ${error}`);
})