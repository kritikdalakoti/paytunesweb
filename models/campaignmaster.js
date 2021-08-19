const mongoose=require('mongoose')

const CampaignMasterSchema=new mongoose.Schema({
    title:String,
    budget:Number,
    startdate:String,
    enddate:String,
    launch:Boolean
})

module.exports=mongoose.model('campaignmaster',CampaignMasterSchema);

