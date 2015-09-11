<?php
	class StringHelper
	{
		// get formatted string representing the bytearray of a string
		public static function getStringBytesAsString($str)
		{
			return implode(',', unpack('C*', $str));
		}

		// convert string to bytearray
		public static function getStringFromBytes($bytes)
		{
			$strkey = "";
			
			foreach($bytes as $char) {
				$strkey .= chr($char);
			}
			
			return $strkey;
		}
		
		// remvove everything after last occurence of given substr
		public static function untilLastOccurence($haystack, $needle)
		{
			$lastOccurencePosition = strrpos($haystack, $needle);
			$truncatedHaystack = substr($haystack, 0, $lastOccurencePosition + strlen($needle));	
			
			return $truncatedHaystack;
		}
	}
?>