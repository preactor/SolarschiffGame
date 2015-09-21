<?php
	include_once 'Configuration\DatabaseConfiguration.php';
	include_once 'Highscore.php';
	
	function main()
	{
		// get highscore json
		$highscore = new Highscore(	DatabaseConfiguration::$databaseHost, DatabaseConfiguration::$databaseUserName, 
							DatabaseConfiguration::$databaseUserPassword, DatabaseConfiguration::$databaseName);
		$json = $highscore->getRaw();
		
		// unpack
		$highscoreArray = json_decode($json);

		//
		//echo $json;
		
		// show
		echo '<b>Last Name - First Name - DisplayName - Email - Score - ConfirmationStatus (0 = not confirmed, 1 = confirmed)</b><br>';
		foreach ($highscoreArray as $row) 
		{			
			echo $row->LastName . ' - ';
			echo $row->FirstName . ' - ';
			echo $row->DisplayName . ' - ';
			echo $row->Email . ' - ';
			echo $row->Score . ' - ';
			echo $row->ConfirmationStatus;
			echo '<br>';
		}
	}
	
	main();

?>