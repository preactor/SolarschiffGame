<?php
	// enum for environment types
	abstract class EnvironmentType
	{
		const Test = 0;
		const Production = 1;
	}	
	
	// global configuration 
	class GlobalConfiguration
	{
		public static $environment = EnvironmentType::Test;
	}
?>