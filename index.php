<!DOCTYPE html>
<html lang="en">

<head>
  <title>PHP CRUD APPLICATION</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>

  <div class="container mt-5">
    <h2 class="text-center mb-4">PHP CURD APPLICATION WITHOUT PAGE REFRESH </h2>

    <div class="row mb-3">
      <div class="col-md-6">
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#userModal" onclick="openAddModal()">Add User</button>
      </div>
      <div class="col-md-6">
        <input type="text" id="search" class="form-control" placeholder="Search....">
      </div>

    </div>

    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile No</th>
          <th>city</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="userTable">


      </tbody>
    </table>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div id="recordInfo" class="text-muted small"></div>
      <nav>
        <ul class="pagination justify-content-end mb-0" id="pagination"></ul>
      </nav>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="userModal" role="dialog" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <form id="userForm">
          <div class="modal-header">

            <h5 class="modal-title" id="modalTitle">Add User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="userId" name="id">
            <div class="mb-3">
              <label>Name</label>
              <input type="text" id="name" name="name" class="form-control" required>
            </div>
            <div class="mb-3">
              <label>Email</label><input type="email" id="email" name="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label>Mobile</label><input type="mobile" id="mobile" name="mobile" class="form-control" required>
            </div>
            <div class="mb-3">
              <label>City</label><input type="text" id="city" name="city" class="form-control" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" id="saveBtn" class="btn btn-primary">Save</button>
          </div>
      </div>
      </form>
    </div>
  </div>

  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

  <script src="script.js"></script>
</body>

</html>