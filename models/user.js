const mongoose=require('mongoose');
//multer for storing files send by user
const multer=require('multer');
const path=require('path');

//were you want to store file
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }
},{
    timestamps:true
})
// The disk storage engine gives you full control on storing files to disk.
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

//static fun
//this is set storage property to ^ upper property
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');  //.single say only one file store and its fild name is avatar

//avatar path publicly available for all user model
userSchema.statics.avatarPath=AVATAR_PATH;

const User=mongoose.model('User',userSchema);

module.exports=User