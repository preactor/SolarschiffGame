<?php
	include_once('GlobalConfiguration.php');
	
	if (GlobalConfiguration::$environment == EnvironmentType::Test)
	{
		include_once('TestDatabaseConfiguration.php');
	}
	if (GlobalConfiguration::$environment == EnvironmentType::Production)
	{
		include_once('ProductionDatabaseConfiguration.php');		
	}
	
?>