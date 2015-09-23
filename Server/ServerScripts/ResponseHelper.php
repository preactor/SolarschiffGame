<?php
	
	class ResponseHelper 
	{
		public static function serializeResponse($state, $message)
		{
			$arr = array('state' => $state, 'message' => $message);
			return json_encode($arr);
		}
	}	
?>