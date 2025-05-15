<?php
include_once "db.php";

$name = $_POST['name'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$city = $_POST['city'];

$query = "INSERT  INTO users (name,email,mobile,city) values('$name','$email','mobile','$city')";
if ($connect->query($query) === TRUE) {
    echo " new record inserted successfully";
}
