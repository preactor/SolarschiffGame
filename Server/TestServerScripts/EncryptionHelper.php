<?php
	include_once 'StringHelper.php';

	class EncryptionHelper {
		// decrypt aes-256 encrypted message
		private static function aesDecrypt($data, $key, $iv) 
		{ 
			return mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $data, MCRYPT_MODE_CBC, $iv);
		}
		
		// extracts the actual message, without the IV
		private static function extractMessage($content)
		{
			return substr($content, 0, -32);
		}
			
		// decrypt given message using aes-256
		public static function decryptMessage($content, $passwordBytes)
		{
			// extract relevant portions of content
			$iv = substr($content, -32);
			$data = substr($content, 0, -32);
			$keyString = StringHelper::getStringFromBytes($passwordBytes);
			
			// debug
			/*
			echo 'bytes of encrypted message: ' . getStringBytesAsString($data) . '<br>';
			echo 'bytes of iv: ' . getStringBytesAsString($iv) . '<br>';
			echo 'bytes of key: ' . getStringBytesAsString($keyString) . '<br>';
			echo 'num of bytes of key: ' . count(getStringBytesAsString($keyString)) . '<br>';
			echo 'key in plaintext: ' . $keyString . '<br>'; */
			
			// decrypt
			return EncryptionHelper::aesDecrypt($data, $keyString, $iv);
		}
	}
?>