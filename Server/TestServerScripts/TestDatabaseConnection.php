<?php
	include_once 'Configuration\DatabaseConfiguration.php';
	
	// Create connection
	$conn = new mysqli(DatabaseConfiguration::$databaseHost, DatabaseConfiguration::$databaseUserName, DatabaseConfiguration::$databaseUserPassword);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	echo "Connected successfully";
?> 