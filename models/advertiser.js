const mongoose=require('mongoose')


const AdvertiserSchema=new mongoose.Schema({
    name:String,
    domain:String,
    category:String,
    active:String,
    users:[mongoose.Types.ObjectId]
})

module.exports=mongoose.model('Advertiser',AdvertiserSchema)