const express=require('express');
const router=express.Router();
const passport=require('passport');

const commentController=require('../controller/comment_controller');
// create
router.post('/create',passport.checkAuthentication,commentController.create);

router.get('/delete/:id',passport.checkAuthentication,commentController.deleteComment);

module.exports=router;