const express=require('express');
const router=express.Router();
const postController=require('../controller/post_controller');
const passport=require('passport');
//cerate
router.post('/create',passport.checkAuthentication,postController.createPost);
//delete
router.get('/delete/:id',passport.checkAuthentication,postController.deletePost);
module.exports=router;