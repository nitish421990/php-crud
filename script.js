$(document).ready(function () {
  loadUsers();

  $("#userForm").submit(function (e) {
    e.preventDefault();

    let name = $("#name").val();
    let email = $("#email").val();
    let mobile = $("#mobile").val();
    let city = $("#city").val();

    if (name == "" || email == "" || mobile == "" || city == "") {
      console.log("all fields are required");
      Swal.fire({
        icon:"warning",
        title:"validation Error",
        text:"All Fields are Required"
      });
      return;
    }

    let formData = $(this).serialize();

    $.ajax({
      url: "crud.php",
      type: "POST",
      data: formData,
      success: function (responce) {
        console.log("Data successfully inserted");
        Swal.fire({
          icon:"success",
          title:"Success!",
          text:"responce",
          timer:1500,
          showConfirmButton:false,
        });
        $("#userForm")[0].reset();
        $("#userModal").modal("hide");
      },
    });
  });
});

function loadUsers(query = "") {
  $.ajax({
    url: "fetch_users.php",
    type: "GET",
    data: { query: query },
    success: function (responce) {
      const data = JSON.parse(responce);
      let rows = "";
      data.users.forEach((user, index) => {
        rows += `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${user.name}</td>
                      <td>${user.email}</td>
                      <td>${user.mobile}</td>
                      <td>${user.city}</td>
                      <td> <button>Edit</button> <button>delete</button></td>
                      
                    </tr>
                `;
        $("#userTable").html(rows);
      });
    },
  });
}

function openAddModal() {}
