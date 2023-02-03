{
    function updateProfile(){
        let userProfile=$("#update-user-profile")
        userProfile.submit(function(e){
            e.preventDefault();

            // alert(userProfile.prop('action'));   //finding url inside action 
            
            //ajax
            $.ajax({
                type:"post",
                url:userProfile.prop('action'),
                data:new FormData(this),
                contentType: false,
                processData: false,
                success:function(data){
                    // console.log(data.user.avatar);
                    let updated_Data=updateData(data);
                    $('#user-container').html(updated_Data);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
   }

    function updateData(newUserInfo){
        // console.log(newUserInfo);
        return $(`
        <img src="${newUserInfo.user.avatar}" alt="profile img" width="100" height="100">
        
            <form action="/user/update/${newUserInfo.user._id}" id="update-user-profile" enctype="multipart/form-data" method="post">
                <label for="">Name: </label>
                <input type="text" name="name" value="${newUserInfo.user.name}" required><br>
                <label for="">Email: </label>
                <input type="email" name="email" value="${newUserInfo.user.email}" required><br>
                <input type="file" name="avatar" placeholder="upload your avatar">
                <input type="hidden" name="id" value="${newUserInfo.user._id}" required><br>&nbsp;&nbsp;&nbsp;
                <input type="submit" value="Update">
            </form>
            <script>updateProfile()</script>
        `)
    }

    //call function 
    updateProfile();
}
// todo
//1) genrate priview of uploaded img