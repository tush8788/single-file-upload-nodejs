const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const UserDB=require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},function(req,email,password,done){

    UserDB.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',err);
            return done(err);
        }
        if(!user || user.password!=password){
            req.flash('error',"Invaild Email / password");
            return done(null,false);
        }
        
        return done(null,user);
    })

}));


passport.serializeUser(function(user,done){
    return done(null,user.id);
})

passport.deserializeUser(function(id,done){
    UserDB.findById(id,function(err,user){
        if(err){
            console.log("error ::: ",err);
            return done(err);
        }
        return done(null,user);
    })
})

//check user is login or not
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;