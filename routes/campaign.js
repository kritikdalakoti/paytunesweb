const express=require('express')
const controller=require('../controllers/campaign')
const auth=require('../auth_middleware/auth');
const router=express.Router();
const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../server/client/public/uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})

const upload=multer({storage})

router.post(
    '/create',
    auth,
    controller.createcampaign
)

router.post(
    '/createsubcampaign',
    auth,
    upload.fields([{name:'AudioFileinp',maxCount:1},
{name:'VideoFileinp',maxCount:1},
{
    name:'DisplayFileinp',
    maxCount:1
},
{
    name:'AudioFileBanner',
    maxCount:1
},
{
    name:'VideoFileBanner',
    maxCount:1
},
{
    name:'DisplayFileBanner',
    maxCount:1
},
    {
        name:'AudioPincodeFile',
    maxCount:1
    },
    {
        name:'VideoPincodeFile',
    maxCount:1
    },
    {
        name:'DisplayPincodeFile',
        maxCount:1
    }
]),
    controller.createsubcampaign
)

module.exports=router;