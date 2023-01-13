{
    //create new comment 
    let createComment=function(){
        // alert("they call")
        let newComment=$('#createComment');
        newComment.submit(function(e){
            e.preventDefault();
            
            //ajax req
            $.ajax({
                type:'post',
                url:'/comment/create',
                data:newComment.serialize(),
                success:function(data){
                    // console.log(data);
                    let newCommentadd=newCommentAddInDOM(data.data.comment,data.data.user);
                    $('#comment-list-container').prepend(newCommentadd);
                    //noty message
                    NotyMessage({status:"success",message:"Comment Publish"});

                    //delete comment 
                    deleteComment($(' .delete-comment-btn',newCommentadd));
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    //add comment in dom
    var newCommentAddInDOM=function(comment,user){
        return $(`
        <li id="comment-${comment._id}">
        <p>
                <a class="delete-comment-btn" href="/comment/delete/${comment._id}">X</a>
            <b>
                ${comment.containt}<br>
            </b>
            <small>
            ${user}
            </small>
        </p>
    </li>`)
    }

    //delete comment
    let deleteComment=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            // console.log($(deleteLink).prop('href'));
            // ajax req
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    // console.log(data);
                    $(`#comment-${data.data.CommentId}`).remove()
                    //noty message
                    NotyMessage({status:"success",message:"Comment delete"});

                },
                error:function(error){
                    console.log(error.responseText)
                }
            })
        })
    }

    // conver all comment to ajax
    let convertCommentToAjax=function(){
        $('#comment-list-container>li').each(function(){
            let self=$(this);
            //console.log("comment :: ",self);
            let deleteBtn=$(' .delete-comment-btn',self);
            deleteComment(deleteBtn);

        })
    }

    convertCommentToAjax();
    createComment();
}