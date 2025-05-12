$(document).ready(function(){
    
    loadUsers();

})

function loadUsers(query=""){
    $.ajax({
        url:"fetch_users.php",
        type:"GET",
        data:{query:query},
        success:function(responce){
            const data =JSON.parse(responce);
            let rows='';
            data.users.forEach((user,index)=>{
                rows+=`
                    <tr>
                      <td>${index+1}</td>
                      <td>${user.name}</td>
                      <td>${user.email}</td>
                      <td>${user.mobile}</td>
                      <td>${user.city}</td>
                      <td> <button>Edit</button> <button>delete</button></td>
                      
                    </tr>
                `;
                $('#userTable').html(rows);

            })
        }
    });
}

function openAddModal(){

}