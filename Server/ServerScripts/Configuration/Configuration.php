<?php
	// enum for environment types
	abstract class EnvironmentType
	{
		const Test = 0;
		const Production = 1;
	}	
	
	// global configuration 
	class Configuration
	{
		/* Global environment configuration */
		public static $environment = EnvironmentType::Test;
		
		/* Highscore configuration */
		public static $aesPasswordBytes = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32);	// insert the correct value here manually
	}

?>