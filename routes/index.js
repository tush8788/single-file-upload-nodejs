const express=require('express');
const router=express.Router();

const homeController=require('../controller/home_controller');
//home
router.get('/',homeController.home);
//user
router.use('/user',require('./user'));
//posts
router.use('/post',require('./post'));
//comments
router.use('/comment',require('./comment'));
module.exports=router;