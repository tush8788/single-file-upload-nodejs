const PostDB=require('../models/post');
const UserDB=require('../models/user');

//home page using async await
//async tell to server this function containt some async statements 
module.exports.home= async function(req,res){

   try{

     //finding all post comment and users 
    //use await 
    //jaab tak ye run nahi hota hai control aage nahi jayega like syncorus req
    //run 1
    let allPosts= await PostDB.find({})
    .populate('user')
    .populate({
        //poputaing all comment
        path:'comments',
        populate:{
            path:'user'
        }
    }).sort('-createdAt');

    // find all user using await
    //run 2
    let users = await UserDB.find({});

    //run 3
    return res.render('home',{
        title:"Home",
        posts:allPosts,
        all_users:users
    })

   }catch(err){

    console.log("error in home conatroller ",err);
    return;

   }

    
}