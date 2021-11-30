const mongoose=require('mongoose')

const InsertionSchema=new mongoose.Schema({
    campaignid:mongoose.Types.ObjectId,
    insertionname:String, 
    insertionstatus:String,
    budgettype:String,
    budget:String,
    budgetdescription:String,
    startdate:String,
    enddate:String,
    freq:Number,
    freqtime:String,
    pacingsetting:String,
    pacingtarget:String,
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
    incomedemo:Array
})

module.exports=mongoose.model('insertion',InsertionSchema);

