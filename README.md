# SolarschiffGame

## Development configuration

### Server
1. Make a copy of ./SolarschiffGame/Server/Configuration/ConfidentialConfiguration.php.sample in the same folder
2. Rename the copy to ConfidentialConfiguration.php
3. Add the (confidential) database login information in ConfidentialConfiguration.php (note: this file is in .gitignore, so your login information won't get checked in)
4. Execute ./SolarschiffGame/Server/StartLocalServer.bat to start the local PHP development server

## Productive Installation 

### Database installation
2. Execute the script ./SolarschiffGame/Server/Database/HighscoreProduction.sql on the MySQL server to create the database and the highscore table

### Server deployment
1. Open the file ./SolarschiffGame/Server/ServerScripts/Configuration.php 
2. Set the variable $environment to EnvironmentType::Production
3. Set the variable $aesPasswordBytes to a random sequence of 32 bytes
3. Add the (confidential) database login information in ConfidentialConfiguration.php
4. Copy the PHP files from ./SolarschiffGame/Server/ServerScripts to the production server

### Client deployment
1. Open the file ./SolarschiffGame/Assets/_scripts/Highscore/Configuration.cs
2. Set the variable PasswordBytes to the same 32-bytes sequence as the corresponding variable in the PHP script above
3. Build the game and deploy to the webserver of your choice
