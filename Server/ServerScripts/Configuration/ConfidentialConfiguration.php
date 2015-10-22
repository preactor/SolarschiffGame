<?php
	/* DO NEVER COMMIT THIS FILE. THIS FILE MUST ONLY BE MODIFIED LOCALLY DURING PRODUCTIVE INSTALLATION */
	
	include_once ('Configuration.php');
	
	class DatabaseConfiguration
	{
		public $databaseName;
		public $databaseUserName;
		public $databaseUserPassword;
		public $databaseHost;
	}
	
	class ConfidentialConfiguration
	{		
		public static function getDatabaseConfiguration()
		{
			$res = new DatabaseConfiguration();
			
			if (Configuration::$environment == EnvironmentType::Test)
			{
				$res->databaseName = 'solarschiff';				
				$res->databaseUserName = 'root';
				$res->databaseUserPassword = 'root';		
				$res->databaseHost = 'localhost';				
			}
			else if (Configuration::$environnment == EnvironmentType::Production)
			{
				$res->databaseName = 'confidential';					// ADJUST VALUE
				$res->databaseUserName = 'confidential';				// ADJUST VALUE
				$res->databaseUserPassword = 'confidential';			// ADJUST VALUE
				$res->databaseHost = 'confidential';					// ADJUST VALUE
			}
			
			// use persistent connection
			$res->databaseHost = 'p:' . $res->databaseHost;
			
			return $res;
		}
	}

?>