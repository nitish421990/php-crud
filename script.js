$(document).ready(function () {
  loadUsers(currentPage, currentQuery);

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
          loadUsers(currentPage, currentQuery);
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

$(document).on("click", ".deleteBtn", function () {
  let id = $(this).data("id");
  Swal.fire({
    title: "Are Your Sure",
    text: "You Won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes Delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "crud.php",
        type: "POST",
        data: { deleteId: id },
        success: function (responce) {
          swal.fire("Deleted", responce, "success");
          loadUsers(currentPage, currentQuery);
        },
      });
    }
  });
});

$("#search").on("keyup", function () {
  let query = $(this).val();
  // console.log(query);
  loadUsers(1, currentQuery);
});

let currentPage = 1;
let currentQuery = "";

function loadUsers(page = 1, query = "") {
  currentPage = page;
  currentQuery = query;

  $.ajax({
    url: "fetch_users.php",
    type: "GET",
    data: { page: page, query: query },
    success: function(response) {
        const data = JSON.parse(response);
        let rows = '';
        let i=1;
        data.users.forEach((user, index) => {
            let serialNumber = (data.currentPage - 1) * data.perPage + index + 1;
            rows += `
                <tr>
                    <td>${serialNumber}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.mobile}</td>
                    <td>${user.city}</td>
                    <td>
                        <button class="btn btn-primary btn-sm editBtn" data-id="${user.id}">Edit</button>
                        <button class="btn btn-danger btn-sm deleteBtn" data-id="${user.id}">Delete</button>
                    </td>
                </tr>
            `;
        });
        $('#userTable').html(rows);
    
        // 📌 Update record info
        let start = (data.currentPage - 1) * data.perPage + 1;
        let end = start + data.users.length - 1;
        $('#recordInfo').text(`Showing ${start} to ${end} of ${data.totalRecords} records`);
    
        // 🧭 Pagination links (unchanged)
        let paginationHTML = '';
        if (page > 1) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="loadUsers(${page - 1}, '${query}')">Previous</a>
                </li>`;
        } else {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">Previous</span></li>`;
        }
    
        for (let i = 1; i <= data.totalPages; i++) {
            paginationHTML += `
                <li class="page-item ${i === page ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="loadUsers(${i}, '${query}')">${i}</a>
                </li>`;
        }
    
        if (page < data.totalPages) {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" onclick="loadUsers(${page + 1}, '${query}')">Next</a>
                </li>`;
        } else {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
        }
    
        $('#pagination').html(paginationHTML);
    },
    
  });
}

function openAddModal() {
  $("#userForm")[0].reset();
  $("#userId").val("");
  $("#modalTitle").text("Add User");
  $("#saveBtn").text("Save");
}
