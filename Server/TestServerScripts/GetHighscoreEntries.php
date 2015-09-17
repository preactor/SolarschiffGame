<?php
	include_once 'Configuration\DatabaseConfiguration.php';
	include_once 'Highscore.php';
	
	function main()
	{
		$highscore = new Highscore(	DatabaseConfiguration::$databaseHost, DatabaseConfiguration::$databaseUserName, 
							DatabaseConfiguration::$databaseUserPassword, DatabaseConfiguration::$databaseName);
		$json = $highscore->get(5);
		echo $json;
	}
	
	main();

?>