<?php
include "db.php";

$sql = "select * from users";
$result = $connect->query($sql);
$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode([
    "users" => $users
]);
