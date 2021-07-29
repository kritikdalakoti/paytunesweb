const express=require('express')
const router=express.Router()
const auth=require('../auth_middleware/auth')
const controller=require('../controllers/advertiser')


router.post(
    '/create_advertiser',
    //auth,
    controller.create_Advertiser
)

router.post(
    '/get_advertisers',
    controller.get_advertisers
)

router.delete(
    '/delete_advertiser',
    // auth,
    controller.delete_advertiser
)

router.post(
    '/get_advertiser',
    controller.get_advertiser
)

router.patch(
    '/update_advertiser',
    controller.update_advertiser
)

module.exports=router