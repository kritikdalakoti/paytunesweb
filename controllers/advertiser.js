
const Advertiser=require('../models/advertiser')
const mongoose=require('mongoose')

exports.create_Advertiser=async (req,res)=>{
    try{
        let {name,domain,active,category}=req.body
        console.log(req.body)
        if(!name||!domain||!active||!category){
            return res.status(400).json({error:'Please fill all the details!'})
        }
        let advertiser=new Advertiser(req.body)
        await advertiser.save()
        res.status(200).json({message:'Created Successfuly!'})
    }catch(err){
        res.status(400).json({error:err})
    }
}

exports.get_advertisers=async(req,res)=>{
    try{
        const advertisers=await Advertiser.find({})
        res.status(200).json(advertisers)
    }catch(err){
        res.status(400).send({error:err})
    }
}

exports.delete_advertiser=async(req,res)=>{
    try{
        let {_id}=req.body
        if(!_id){
            return res.status(400).json({error:'Send id !'})
        }
        console.log('jsdhj',_id)
        const advertiser=await Advertiser.findOneAndDelete({_id:mongoose.Types.ObjectId(_id)})
        console.log(advertiser)
        if(!advertiser){
            return res.status(400).json({error:"Couldn't Delete !"})
        }
        res.status(200).json({message:'Deleted Successfuly!'})
    }catch(err){
        console.log(err)
        res.status(400).json({error:err})
    }
}

exports.get_advertiser=async(req,res)=>{
    try{
        let {advertiser}=req.body
        console.log(advertiser)
        const result=await Advertiser.findOne({_id:mongoose.Types.ObjectId(advertiser)})
        if(!result){
            return res.status(400).json({error:'No Advertiser found !'})
        }
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(400).json({error:err})
    }
}

exports.update_advertiser=async(req,res)=>{
    try{
        let {name,domain,active,category,_id}=req.body
        console.log(req.body)
        
        let updates={
            name,
            domain,
            active,
            category
        }
        const updated_adv=await Advertiser.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id)},updates,{new:true})
        if(!updated_adv){
            return res.status(400).json({error:"Couldn't Update ! Try again later"})
        }
        res.status(200).json({message:'Successfully Updated!'})
    }catch(err){
        console.log(err)
        res.status(400).json({error:err})
    }
}

