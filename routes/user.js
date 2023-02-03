const express=require('express');
const passport=require('passport');

const router=express.Router();


const userController=require('../controller/user_controller');

//signin page
router.get('/signin',userController.signInPage);

//signup page
router.get('/signup',userController.signUnPage);

//profile
router.get('/profile/:id',passport.checkAuthentication,userController.profile);

//signout
router.get('/signout',userController.signOut)

//create user
router.post('/create-user',userController.createUser);

//create session login user
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'}
    ),userController.createSession);
// console.log(__dirname);
//update users information
router.post('/update/:id',passport.checkAuthentication,userController.updateUserInfo);

module.exports=router;
