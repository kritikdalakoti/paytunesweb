const mongoose=require('mongoose')

const LineitemSchema=new mongoose.Schema({
    insertionid:mongoose.Types.ObjectId,
    lineitemname:String, 
    lineitemstatus:String,
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

module.exports=mongoose.model('lineitem',LineitemSchema);

