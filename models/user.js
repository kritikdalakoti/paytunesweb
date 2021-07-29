const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    firstname:String,
    lastname:String,
    role:String,
    advertiser:String,
    password:String,
    usertype:String,
    email:String,
    // advertiser:mongoose.Types.ObjectId
})

module.exports=mongoose.model('admin',userSchema)
