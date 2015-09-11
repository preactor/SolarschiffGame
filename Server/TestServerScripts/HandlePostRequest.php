<?php
	if ($_SERVER['REQUEST_METHOD'] === 'POST') 
	{
		if (array_key_exists('content', $_POST))
		{
			echo 'content=' . $_POST['content'];
			
			$filename = 'store1.txt';
			$myfile = fopen($filename, 'a') or die('Unable to open log file, sorry!');
			$store_line = $_SERVER['REMOTE_ADDR'] . ': ' . $_POST['content'] . PHP_EOL; 
			fwrite($myfile, $store_line);
			fclose($myfile);
			
			echo '<br>Check the file ' . $filename . '!';
		}
		else
		{
			echo ('The POST request must contain a parameter named content');
		}
	}
	else 
	{	
		echo 'Sorry dude, this was not a POST request';
	}

?>