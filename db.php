<?php

/*
database : php-crud
table : users
table column: id, name, email,mobile, city, updated_at, created_at

How to Create table by MySql query
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
);
*/ 

$localhost="localhost";
$username="root";
$password="";
$db="php-crud";

$connect =new mysqli($localhost,$username,$password,$db);

// if($connect){
//     echo "successfully connected";
// }else{
//     echo "not connected";
// }


?>