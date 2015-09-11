<?php
	// get formatted string representing the bytearray of a string
	function getStringBytesAsString($str)
	{
		return implode(',', unpack('C*', $str));
	}

	// convert string to bytearray
	function getStringFromBytes($bytes)
	{
		$strkey = "";
		
		foreach($bytes as $char) {
			$strkey .= chr($char);
		}
		
		return $strkey;
	}
	
	// decrypt aes-256 encrypted message
    function aesDecrypt($data, $key, $iv) 
	{ 
	/*
		$size = mcrypt_get_block_size(MCRYPT_RIJNDAEL_256, 'cbc');
		$cipher = mcrypt_module_open(MCRYPT_RIJNDAEL_256, '', 'cbc', '');
       
		mcrypt_generic_init($cipher, $key, $iv);
         
		$dataDecrypted = mdecrypt_generic($cipher, $data);
		mcrypt_generic_deinit($cipher);
		
		return $dataDecrypted;
		*/

		return mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $data, MCRYPT_MODE_CBC, $iv);
    }
	
	// extracts the actual message, without the IV
	function extractMessage($content)
	{
		return substr($content, 0, -32);
	}
		
	// decrypt given message using aes-256
	function decryptMessage($content, $passwordBytes)
	{
		// extract relevant portions of content
		$iv = substr($content, -32);
		$data = substr($content, 0, -32);
		$keyString = getStringFromBytes($passwordBytes);
		
		// debug
		echo 'bytes of encrypted message: ' . getStringBytesAsString($data) . '<br>';
		echo 'bytes of iv: ' . getStringBytesAsString($iv) . '<br>';
		echo 'bytes of key: ' . getStringBytesAsString($keyString) . '<br>';
		echo 'num of bytes of key: ' . count(getStringBytesAsString($keyString)) . '<br>';
		echo 'key in plaintext: ' . $keyString . '<br>'; 
		
		// decrypt
		return aesDecrypt($data, $keyString, $iv);
	}
	
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
				$decryptedContent = decryptMessage($decodedContent, $passwordBytes);
				
				// debug
				echo 'bytes after decryption: ' . getStringBytesAsString($decryptedContent) . '<br>';				
				
				// log
				$filename = 'log2.txt';
				$myfile = fopen($filename, 'a') or die('Unable to open log file, sorry!');
				$log_line = $_SERVER['REMOTE_ADDR'] . PHP_EOL;
				$log_line .= 'content bytes:' . $content . PHP_EOL; 
				$log_line .= 'decoded content:' . $decodedContent . PHP_EOL; 
				$log_line .= 'decrypted content:' . $decryptedContent . PHP_EOL; 
				fwrite($myfile, $log_line);
				fclose($myfile);				
				
				// store 
				$filename = 'store2.txt';
				$myfile = fopen($filename, 'a') or die('Unable to open log file, sorry!');
				$store_line = $_SERVER['REMOTE_ADDR'] . ': ' . $_POST['content'] . PHP_EOL; 
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
