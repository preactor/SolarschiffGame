<?php
	include_once 'Configuration\TestDatabaseConfiguration.php';

	// Create connection
	$conn = new mysqli($databaseHost, $databaseUserName, $databaseUserPassword);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	echo "Connected successfully";
?> 