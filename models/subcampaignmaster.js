const mongoose=require('mongoose');

const SubcampaignMasterSchema=new mongoose.Schema({
    campaignid:mongoose.Types.ObjectId,  // new field
    AdTitle:{type:String,required:true},
    adType:{type:String},
    offset:{type:String},// need to add 
    Category:{type:String}, 
    Description:{type:String},
    Advertiser:{type:String},
    // AudioPricing:{type:String},
    // VideoPricing:{type:String},
    // BannerPricing:{type:String},
    Pricing:{type:Number}, //add here 
    PricingModel:{type:String},//cpm,cpi add
    Expires:{type:String}, //response expiry time add
    minAge:{type:Number}, 
    area:[{type:String}], //added
    maxAge:{type:Number}, 
    Gender:[{type:String}],
    Billing:{type:String},
    enable:{type:Boolean},
    Genre:[{type:String}],
    platformType:[{type:String}], //ios android
    language:[{type:String}],
    ConnectionType:[{type:String}],
    phoneValue:{type:Boolean},
    phoneType:[{type:String}],
    ARPU:{type:Boolean},
    City:[{type:String}],
    GrandCity:[{type:String}],
    State:[{type:String}],
    Age:{type:Boolean},
    Companion:[{  // audio-banner details
        Title:{type:String},
        Url:{type:String},
        StaticResource:{type:String},
        StaticResourceType:{type:String},
        AltText:{type:String},
        required:{type:String},
        imageFiles:[{
            Height:{type:String},
            Width:{type:String},
            AssetWidth:{type:String},
            AssetHeight:{type:String},
            AdSlotID:{type:String},
            Name:{type:String},
            S3path:{type:String}
            // Id:{type:ObjectId}
        }],
        ClickThroughUrl:{type:String} // with banner 
    }],
    Linear:[{ //audio,video details
        Title:{type:String},
        type:{type:String},
        MediaFiles:[{
            Bitrate:{type:String},
            Codec:{type:String},
            Delivery:{type:String},
            Name:{type:String},
            S3path:{type:String},
            SampleRate:{type:String},
            type:{type:String},
            Tracks:{type:String}
            // Id:{type:ObjectId}
        }]
    }],
    endDate:{type:String}, 
    startDate:{type:String},
    starttime:String,  //added
    endtime:String, //added
    // creativename:String, //added
    frequency:Number,//added
    timeperiod:String,//added
    active:Boolean, //added
    // os:[{type:String}],//added
    makemodel:[{type:String}],//added
    pincode:[{type:String}],
    days:[{type:String}],//added
    timelap:[{type:String}],//added
    targetCategory:[{type:String}],//added
    age:[{type:String}],//set 
    Duration:{type:String},
    maxARPU:{type:Number},
    minARPU:{type:Number},
    TargetImpressions:{type:String},
    strategy:{type:String},
    advertiserid:{type:mongoose.Types.ObjectId},//added
    createdOn:{type:Date}
})

module.exports=mongoose.model('subcampaignmaster',SubcampaignMasterSchema);