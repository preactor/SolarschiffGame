<?php
	include_once 'EncryptionHelper.php';
	include_once 'StringHelper.php';
	include_once 'Highscore.php';
	include_once 'Configuration\ConfidentialConfiguration.php';
	include_once 'Configuration\Configuration.php';
	
	function main() 
	{	
		if ($_SERVER['REQUEST_METHOD'] === 'POST') 
		{
			if (array_key_exists('content', $_POST))
			{	
				// define password bytes
				//$passwordBytes = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32);
				$passwordBytes = Configuration::$aesPasswordBytes;
				
				// decode 
				$content = $_POST['content'];
				$decodedContent = base64_decode($content);
				
				// decrypt
				$decryptedContent = EncryptionHelper::decryptMessage($decodedContent, $passwordBytes);
				$decryptedContent = StringHelper::untilLastOccurence($decryptedContent, '}');
				
				// json decode
				$highscoreData = json_decode($decryptedContent);  
				
				// debug
				echo 'last name: ' . $highscoreData->LastName . '<br>';	
				echo 'first name: ' . $highscoreData->FirstName . '<br>';
				echo 'display name: ' . $highscoreData->DisplayName . '<br>';	
				echo 'email: ' . $highscoreData->Email . '<br>';			
				echo 'highScore: ' . $highscoreData->Score . '<br>';
				echo 'bytes after decryption: ' . StringHelper::getStringBytesAsString($decryptedContent) . '<br>';				
							
				// store
				$config = ConfidentialConfiguration::getDatabaseConfiguration();
				$highscore = new Highscore(	$config->databaseHost, $config->databaseUserName, 
									$config->databaseUserPassword, $config->databaseName);
				$highscore->insert($highscoreData);
			}
			else
			{
				die ('The POST request must contain a parameter named content');
			}
		}
		else 
		{	
			die ('Sorry dude, this was not a POST request');
		}
	}
		
	main();
?>
