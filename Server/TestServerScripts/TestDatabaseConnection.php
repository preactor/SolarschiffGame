<?php
	include_once 'Configuration\ConfidentialConfiguration.php';
	
	// Create connection
	$config = ConfidentialConfiguration::getDatabaseConfiguration();
	$conn = new mysqli($config->databaseHost, $config->databaseUserName, $config->databaseUserPassword);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	echo "Connected successfully";
?> 