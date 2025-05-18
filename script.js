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
        icon: "warning",
        title: "validation Error",
        text: "All Fields are Required",
      });
      return;
    }

    let formData = $(this).serialize();
    let action = $("#userId").val() == "" ? "insert" : "update";
    console.log(action);

    $.ajax({
      url: "crud.php",
      type: "POST",
      data: formData + "&action=" + action,
      success: function (responce) {
        console.log(responce);
        if (responce) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: responce,
            timer: 1500,
            showConfirmButton: false,
          });
          $("#userForm")[0].reset();
          $("#userModal").modal("hide");
          loadUsers();
        } else {
          console.log(responce);
        }
      },
    });
  });
});

$(document).on("click", ".editBtn", function () {
  let id = $(this).data("id");
  $.ajax({
    url: "crud.php",
    type: "get",
    data: { editId: id },
    success: function (data) {
      let user = JSON.parse(data);
      $("#userId").val(user.id);
      $("#name").val(user.name);
      $("#email").val(user.email);
      $("#mobile").val(user.mobile);
      $("#city").val(user.city);
      $("#modalTitle").text("Edit User");
      $("#saveBtn").text("Update");

      var userModal = new bootstrap.Modal(document.getElementById("userModal"));

      userModal.show();
    },
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
                      <td> 
                      <button class="btn btn-primary btn-sm editBtn" data-id="${
                        user.id
                      }">Edit</button> 
                      <button>delete</button></td>
                      
                    </tr>
                `;
        $("#userTable").html(rows);
      });
    },
  });
}

function openAddModal() {
  $("#userForm")[0].reset();
  $("#userId").val("");
  $("#modalTitle").text("Add User");
  $("#saveBtn").text("Save");

}
