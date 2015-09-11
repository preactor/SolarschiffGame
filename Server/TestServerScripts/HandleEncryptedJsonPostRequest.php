<?php
	include_once 'EncryptionHelper.php';
	include_once 'StringHelper.php';
	
	function main() 
	{	
		if ($_SERVER['REQUEST_METHOD'] === 'POST') 
		{
			if (array_key_exists('content', $_POST))
			{
				// define password bytes
				$passwordBytes = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32);
				
				// decode 
				$content = $_POST['content'];
				$decodedContent = base64_decode($content);
				
				// decrypt
				$decryptedContent = EncryptionHelper::decryptMessage($decodedContent, $passwordBytes);
				$decryptedContent = StringHelper::untilLastOccurence($decryptedContent, '}');
				
				// json decodes
				$highscoreData = json_decode($decryptedContent);  
				
				// debug
				echo 'first name: ' . $highscoreData->firstName . '<br>';
				echo 'last name: ' . $highscoreData->lastName . '<br>';	
				echo 'email: ' . $highscoreData->email . '<br>';	
				echo 'highScore: ' . $highscoreData->highScore . '<br>';
				echo 'bytes after decryption: ' . StringHelper::getStringBytesAsString($decryptedContent) . '<br>';				
							
				// log 
				$filename = 'log3.txt';
				$myfile = fopen($filename, 'a') or die('Unable to open log file, sorry!');
				$store_line = $_SERVER['REMOTE_ADDR'] . ': ' . $decryptedContent . PHP_EOL; 
				fwrite($myfile, $store_line);
				fclose($myfile);
				
				echo '<br>Stored to ' . $filename . '!';
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
