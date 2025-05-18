<?php
include_once "db.php";
if (isset($_POST['action']) && $_POST['action'] == "insert") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $city = $_POST['city'];

    $query = "INSERT  INTO users (name,email,mobile,city) values('$name','$email','$mobile','$city')";
    if ($connect->query($query) === TRUE) {
        echo " new record inserted successfully";
    }
}

if (isset($_GET['editId'])) {
    $id = $_GET['editId'];
    $result = $connect->query("select * from users where id=$id");
    echo  json_encode($result->fetch_assoc());
}

if (isset($_POST['action']) && $_POST['action'] == "update") {
   
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $city = $_POST['city'];

    $query = "UPDATE  users  SET name='$name', email='$email', mobile='$mobile', city='$city' where id=$id";
    if($connect->query($query)===TRUE){
        echo " record Updated successfully";
    }else{
        echo "Error:". $connect->error;
    }
   
}

if(isset($_POST['deleteId'])){
    $id= $_POST['deleteId'];
    if($connect->query("DELETE from users where id=$id")){
        echo "user Deleted Successfully";
    }

}

