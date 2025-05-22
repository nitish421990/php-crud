<?php
include 'db.php';


$perPage = 5;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$query = isset($_GET['query']) ? $connect->real_escape_string($_GET['query']) : '';
$offset = ($page - 1) * $perPage;

// Build WHERE clause for search
$where = '';
if (!empty($query)) {
    $where = "WHERE name LIKE '%$query%' OR email LIKE '%$query%' OR mobile LIKE '%$query%' OR city LIKE '%$query%'";
}

// Get total records count
$totalResult = $connect->query("SELECT COUNT(*) AS total FROM users $where");
$totalRow = $totalResult->fetch_assoc();
$totalRecords = $totalRow['total'];
$totalPages = ceil($totalRecords / $perPage);

// Fetch paginated records
$sql = "SELECT * FROM users $where ORDER BY id DESC LIMIT $offset, $perPage";
$result = $connect->query($sql);

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

// Send JSON response
echo json_encode([
    'users' => $users,
    'totalRecords' => $totalRecords,
    'totalPages' => $totalPages,
    'currentPage' => $page,
    'perPage' => $perPage
]);

$connect->close();

?>