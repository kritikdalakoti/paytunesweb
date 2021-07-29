const express=require('express')
const User=require('../models/user')
const router=express.Router()
const controller=require('../controllers/user')
const auth=require('../auth_middleware/auth')

// router.post(
//     '/signup',
//     controller.signup
// )

router.post(
    '/signin',
    controller.signin
)


router.post(
    '/create_user',
    //auth,
    controller.create_user
)

router.post(
    '/get_users',
    //auth,
    controller.get_users
)

router.delete(
    '/delete_user',
    //auth,
    controller.delete_user
)

router.patch(
    '/update_user',
    controller.update_user
)

router.post(
    '/get_user',
    controller.get_user
)


module.exports=router