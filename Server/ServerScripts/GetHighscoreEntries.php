<?php
	include_once 'Configuration\ConfidentialConfiguration.php';
	include_once 'Highscore.php';
	
	function main()
	{
		$config = ConfidentialConfiguration::getDatabaseConfiguration();
		$highscore = new Highscore(	$config->databaseHost,$config->databaseUserName, 
							$config->databaseUserPassword, $config->databaseName);
		$json = $highscore->get();
		echo $json;
	}
	
	main();

?>