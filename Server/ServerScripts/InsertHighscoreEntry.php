<?php
	include_once 'EncryptionHelper.php';
	include_once 'StringHelper.php';
	include_once 'ResponseHelper.php';
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
				$passwordBytes = Configuration::$aesPasswordBytes;
				
				// decode 
				$content = $_POST['content'];
				$decodedContent = base64_decode($content);
				
				// decrypt
				$decryptedContent = EncryptionHelper::decryptMessage($decodedContent, $passwordBytes);
				$decryptedContent = StringHelper::untilLastOccurence($decryptedContent, '}');
				
				// json decode
				$highscoreData = json_decode($decryptedContent);  
							
				// store
				$config = ConfidentialConfiguration::getDatabaseConfiguration();
				$highscore = new Highscore(	$config->databaseHost, $config->databaseUserName, 
									$config->databaseUserPassword, $config->databaseName);
				$highscore->insert($highscoreData);
				die (ResponseHelper::serializeResponse('Success', 'Success'));
			}
			else
			{
				die (ResponseHelper::serializeResponse('Error', 'The request must contain a POST parameter'));
			}
		}
		else 
		{	
			die (ResponseHelper::serializeResponse('Error', 'Not a POST request, sorry'));
		}
	}
		
	main();
?>
