const mongoose=require('mongoose')

const CampaignMasterSchema=new mongoose.Schema({
    title:String, 
    campstatus:String,
    goal:String,
    kpitype:String,
    kpigoal:String,
    audio:Boolean,
    video:Boolean,
    display:Boolean,
    startdate:String,
    enddate:String,
    freq:Number,
    freqtime:String,
    selregion:Array,
    notselregion:Array,
    selpin:Array,
    blockedpin:Array,
    pincodefile:Array,
    sellanguages:Array,
    blocklanguages:Array,
    maledemo:Boolean,
    femaledemo:Boolean,
    agedemo:Array,
    parentdemo:Boolean,
    nonparentdemo:Boolean,
    incomedemo:Array,
    landingurl:String
})

module.exports=mongoose.model('campaignmaster',CampaignMasterSchema);

