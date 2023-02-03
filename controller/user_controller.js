const UserDB = require('../models/user');
const cookieParser = require('cookie-parser');
const fs =require('fs');
const path=require('path');
//using async await

//sign in page
module.exports.signInPage = function (req, res) {
    //if user is login that time unable to access sigin page
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile')
    }

    return res.render("signin", {
        title: "Sign in"
    })
}

//sign up page
module.exports.signUnPage = function (req, res) {
    //if user is login that time unable to access signup page
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile')
    }
    return res.render("signup", {
        title: "Sign up"
    })
}

//create user
module.exports.createUser = async function (req, res) {

    try {
        //checking user is already exist in db or not 
        let user = await UserDB.findOne({ email: req.body.email });

        //if user is already exits then redirect back
        if (user) {
            req.flash('error',"Email allready exist in DB")
            console.log("Email allready exist in DB");
            return res.redirect('/user/signin');
        }

        //if user is not found in db then create new 
        await UserDB.create(req.body)
        req.flash('success',"User Is Created");
        return res.redirect('/user/signin');

    } catch (err) {
        req.flash('error',"error in creteing user");
        console.log("error in creteing user :: ", err);
        return;
    }

}

//create session login user 
module.exports.createSession = function (req, res) {
    req.flash('success',"Logged in successfully");
    // res.cookie("abcd","1234");
    return res.redirect('/');
}

//profile
module.exports.profile = async function (req, res) {

    try {

        let user = await UserDB.findById(req.params.id);

        return res.render('profile', {
            title: "Profile",
            profile_user: user
        })

    } catch (err) {
        console.log("error in display profile page :: ", err);
        return;
    }
}

//sign out
module.exports.signOut = async function (req, res) {
    // console.log(req.cookies);
    // await req.logout(function (err) {
    //     if (err) {
    //         console.log(`Error in signout = ${err}`);
    //     }

    // });

   
    req.logout(function(err){
        if(err){
            console.log(err);
        }
    });

    req.flash('success', "Logged out successfully");
     
    // res.clearCookie('abcd',"");
    // console.log("reach line 85");
    return res.redirect('back');
    // console.log("reach line 87");
   
}

//update user 
module.exports.updateUserInfo = async function (req, res) {
    if(req.user.id==req.params.id){
        try {
            // console.log(req.body);
            
            // await UserDB.findByIdAndUpdate(req.body.id, { name: req.body.name, email: req.body.email })
            let user=await UserDB.findById(req.params.id);
            //accessing multipart data
            UserDB.uploadedAvatar(req,res,function(err){
                // console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;
                // console.log(UserDB.avatarPath);
                if(req.file){
                    // check user avatar is already upload 
                    if(user.avatar){
                        //check user avatar path file avalable in folder
                        if(fs.existsSync(path.join(__dirname,"..",user.avatar))){
                            //if file avalable then delete 
                             fs.unlinkSync(path.join(__dirname,"..",user.avatar))
                        }
                        else{
                            console.log("File not exist");
                        }
                    }
                    //avatarPath is a static veriable to store folder path 
                    //avatarPath store inside models->user.js
                    //this is saving path inside of uploading the file into the avatar fild into the user
                    user.avatar=UserDB.avatarPath+"/"+req.file.filename
                }
                user.save();
                if(req.xhr){
                    return res.status(200).json({
                        message:"upload successfully",
                        user:user
                    })
                }
                return res.redirect("back");
            })
        } catch (err) {
            console.log("Error in updating user :: ", err);
            return;
        }
    }
    else{
        res.flash("error","user not match");
        // console.log("user not match ");
        return res.redirect('back');
    }
    
}