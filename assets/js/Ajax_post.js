{
    //send post to server
    let createPost=function(){
        //finding id 
        let newPostform=$('#createPost');
        //on submit run this function
        newPostform.submit(function(e){
            //off default opration
            e.preventDefault();
           
            //ajax
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostform.serialize(),
                success:function(data){
                    // console.log(data.message);
                    
                    //call function
                    let newPost=displayNewPost(data.data.post,data.data.postUser);
                    
                    //call noty for notifiaction
                    NotyMessage({status:'success',message:data.message})
                    
                    $('#post-container').prepend(newPost);
                    
                    //calling delete post from here
                    deletePost($(' .delete-post-btn',newPost));

                },
                error:function(error){
                    NotyMessage({status:'error',message:"Error in adding post"});
                    console.log(error.responseText);
                }
            })
        })
    }

    //method to crete post in dom
    //display post on page without refresh
    let displayNewPost=function(post,postUser){
        return $(`
            <li id="post-${post._id}">
               
                    <h2>
                        <a class="delete-post-btn" href="/post/delete/${post._id}">X</a>
                        <!-- showing post -->
                        ${post.containt}<br>
                        <!-- showing user of post or who created this post -->
                        <small>
                            ${postUser}
                        </small>
                    </h2>
            
                <!-- Comments -->
                <div class="Comment-container">
                    <!-- first check user is sign in to create comment -->
                   
                       <div class="comment-form">
                            <form action="/comment/create"  id="createComment" method="post">
                                <input type="text" name="containt" placeholder="Comment here.."required>
                                <input type="hidden" name="postId" value="${post._id}"><br>
                                <input type="submit" value="Comment">
                            </form>
                       </div>
                   
                    <!-- display all comments -->
                    <div class="comment-display">
                        <ul id="comment-list-container">
                        
                        </ul>
                    </div>
                </div>
            </li>
            <script src="/js/Ajax_comments.js"></script>
       `)
    }

    //delete post 
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    // console.log(data.data.post_id);
                    //remoove element without refresh
                    $(`#post-${data.data.post_id}`).remove();

                    //call noty for notifiaction
                    NotyMessage({status:'success',message:data.message})
                },
                error:function(error){
                    NotyMessage({status:'error',message:"Error in deleing post"});
                    console.log(error.responseText);
                }
            })
        })
    }


// delete after refresh page
//    $('.delete-post-btn').click(function(e){
//     e.preventDefault();
//     alert($(this).attr('href'))
    

//    })

 // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
 let convertPostsToAjax = function(){
    $('#post-container>li').each(function(){
        // console.log(this);
        let self = $(this);
        let deleteButton = $(' .delete-post-btn', self);
        // console.log("delete btn :: ",deleteButton)
        deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        // let postId = self.prop('id').split("-")[1]
        // console.log("id :: ",postId);
        // new PostComments(postId);
    });
}

    //calling functions 
    createPost();
    convertPostsToAjax();
}

//loop all post
