const express=require('express');
const expressLayout=require('express-ejs-layouts');
const bodyParser=require('body-parser');
const db=require('./config/mongoose');
const port=8000;
const passport=require('passport');
const LocalStrategy=require('./config/passport-local-strategy');
const expressSession=require('express-session');
const mongoStore=require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const cookieParser=require('cookie-parser');

const app=express();

app.use(cookieParser());

app.set('view engine','ejs');
app.set('views','./views');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayout);

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('./assets'))



app.use(expressSession({
    name:"user_y",
    secret:"AnyValue",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(10000*60*100)
    },
    store:mongoStore.create({
        mongoUrl:'mongodb://localhost/Post-Comment-DB',
        autoRemove:'disabled'
    },function(err){
        console.log(err || "Connect-mongo Setup ok");
    })

}));

// s%3AKhzDQcmvm5xDhM6rLoGGIIHnETuUuTq9.kg9zpRtKfPnvgMTAfLxu%2BK8ApopKvT1lpL%2BIwcXrK%2BA
app.use(passport.initialize());

app.use(passport.session());

//saveing login user inside res.locals
app.use(passport.setAuthenticatedUser);

//for notification
app.use(flash());

app.use(customMware.setFlash);

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Error in server run :: ",err);
        return;
    }

    console.log("Server is up on port :: ",port);
})