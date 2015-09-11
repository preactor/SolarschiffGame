<?php
	include_once 'Configuration\TestDatabaseConfiguration.php';

	// connect
	$db = new mysqli($databaseHost, $databaseUserName, $databaseUserPassword);
	$db->select_db($databaseName);
	
	if ($db->connect_error) 
	{
		die("Connection failed: " . $db->connect_error);
	}
	
	// query and show data
	$query = "SELECT Score, LastName, FirstName FROM Highscore ORDER BY Score DESC";
	if ($result = $db->query($query)) 
	{
    while ($row = $result->fetch_row()) 
	{
        printf ("%s %s %s<br>", $row[0], $row[1], $row[2]);
    }
    $result->close();
	
	// close connection
	$db->close();
	
}

?>