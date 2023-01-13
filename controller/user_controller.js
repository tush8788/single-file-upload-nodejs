const UserDB = require('../models/user');
const cookieParser = require('cookie-parser');
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

    try {
        await UserDB.findByIdAndUpdate(req.body.id, { name: req.body.name, email: req.body.email })

        return res.redirect("back");
    } catch (err) {
        console.log("Error in updating user :: ", err);
        return;
    }
}