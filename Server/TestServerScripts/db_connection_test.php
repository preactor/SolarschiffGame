<?php
$servername = "mysql5.momentsucht.com";
$username = "db355977_421";
$password = "s@l4RDBG4me";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?> 