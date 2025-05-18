<?php
include "db.php";

$query=isset($_GET['query']) ? $connect->real_escape_string($_GET['query']) : "";
$where ='';
if(!empty($query)){
    $where ="where name like '%$query%' OR email like '%$query%' OR mobile like '%$query%' OR city like '%$query%' " ;
}
$sql = "select * from users  $where";
$result = $connect->query($sql);
$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode([
    "users" => $users
]);
