<?php
	class Highscore
	{	
		// database connection
		private $mysqli = null;
	
		// error message if another user entered the same displayName but a different Email
		const ERROR_MESSAGE_DUPLICATE_DISPLAYNAME = 'This display name is already taken by another user. Please user another display name';
		
		function __construct($databaseHost, $databaseUserName, $databaseUserPassword, $databaseName)
		{
			// connect
			$this->mysqli = new mysqli($databaseHost, $databaseUserName, $databaseUserPassword, $databaseName);
			$this->mysqli->select_db($databaseName);
			if ($this->mysqli->connect_errno)
				die("Connect failed: " . $this->mysqli->connect_error);
		}
		
		function __destruct()
		{
			$this->mysqli->close();
		}
		
		public function get($numberOfEntries) 
		{
			$json = null;
							
			// query and pack data
			$query = "SELECT LastName, FirstName, DisplayName, Score FROM Highscore ORDER BY Score DESC LIMIT " . $numberOfEntries;
			if ($result = $this->mysqli->query($query)) 
			{
				$results = array();
				while ($row = $result->fetch_row()) 
				{
					$results[] = array ('LastName' => $row[0], 'FirstName' => $row[1], 'DisplayName' => $row[2], 'Score' => $row[3]);
				}
				$json = json_encode($results);
				
				$result->close();
			}
			
			return $json;
		}
		
		public function getRaw()
		{
			$json = null;
							
			// query and pack data
			$query = "SELECT LastName, FirstName, DisplayName, Email, Score, ConfirmationStatus FROM Highscore ORDER BY Score DESC";
			if ($result = $this->mysqli->query($query)) 
			{
				$results = array();
				while ($row = $result->fetch_row()) 
				{
					$results[] = array ('LastName' => $row[0], 'FirstName' => $row[1], 'DisplayName' => $row[2], 'Email' => $row[3],
										'Score' => $row[4], 'ConfirmationStatus' => $row[5]);
				}
				$json = json_encode($results);
				
				$result->close();
			}
			
			return $json;
		}
		
		public function insert($highscoreData)
		{
			// discard if invalid display name
			$errorMessage = $this->isDisplayNameTaken($highscoreData);
			if ($errorMessage != null)
			{
				die ($errorMessage);
			}
			
			// gracefully skip if duplicate
			if ($this->isDuplicate($highscoreData))
			{
				return;
			}
		
			// insert data
			$this->insertRecord($highscoreData);
		}
		
		private function insertRecord($highscoreData)
		{		
			// prepare
			$statement = $this->mysqli->prepare("INSERT into Highscore (LastName, FirstName, DisplayName, Email, Score, ConfirmationStatus)
											VALUES (?, ?, ?, ?, ?, 0)");
			$statement->bind_param('ssssi', $highscoreData->LastName, $highscoreData->FirstName, $highscoreData->DisplayName,
											 $highscoreData->Email, $highscoreData->Score);
			
			// execute
			$statement->execute();
			
			// cleanup
			$statement->close();
		}
		
		private function isDuplicate($highscoreData)
		{			
			// prepare
			$statement = $this->mysqli->prepare('SELECT Id from Highscore where DisplayName = ? and Score = ?');
			$statement->bind_param('si', $highscoreData->DisplayName, $highscoreData->Score);
			
			// execute and check
			$statement->execute();
			$statement->store_result();
			$isDuplicateEntry = ($statement->num_rows() > 0);
			$statement->close();
			
			return $isDuplicateEntry;
		}
		
		// check if somebody with another e-mail address already used the same display name
		private function isDisplayNameTaken($highscoreData)
		{			
			// prepare
			$statement = $this->mysqli->prepare('SELECT Id from Highscore where DisplayName = ? and Email <> ?');	// same display name, different email
			$statement->bind_param('ss', $highscoreData->DisplayName, $highscoreData->Email);
		
			// execute and check
			$statement->execute();
			$statement->store_result();
			$displayNameTaken = ($statement->num_rows() > 0);
			echo 'debug :' . $statement->num_rows();
			$statement->close(); 
			
			// fill result message
			$resultMessage = null;
			if ($displayNameTaken)
			{
				$resultMessage = $this::ERROR_MESSAGE_DUPLICATE_DISPLAYNAME;
			}
			
			return $resultMessage;
		}		
		
	}
?>