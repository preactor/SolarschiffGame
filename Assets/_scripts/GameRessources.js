#pragma strict

var reputation : float;
var solarPower : float;
var mood : float;
var solarUsage : float;
var solarPwrMinReached : boolean;
var boostKeyReleasedWhileBelowLimit : boolean;
var boostActivationLimit : float;

var shipControl : ShipTest;
var questFunc : QuestFunc;

//TimerFunctionality

var Seconds : int;
var countSeconds : int;
private var roundedSeconds : int;
private var txtSeconds : int;
private var txtMinutes : int;

private var stopTimer = true;
var timeLeft : float;
private var questStartTime : float;

//GUIFunctionality

var solarGUI : GUISkin;

var shipVelRounded : float;
var solarPowerRounded : float;
var velTxt : String;
var timerTxt : String;
var questStatusTxt	: String;

var gamePaused = false;
var showStartScreen : boolean;
var showBriefing : boolean;
var questID : String;
var startScreenTxt : Texture2D;

var solarBarTxt : Texture2D;
var solarBarBackTxt : Texture2D;
var whiteLine : Texture2D;
var SonneTxt : Texture2D;
var moodBarTxt : Texture2D;
var moodBarBackTxt : Texture2D;
var smilesTxt : Texture2D;


function Start () {

	questStatusTxt = "No quest active";
	solarPower = 5;
	mood = 0;
	reputation = 0;
	solarUsage = 1.0;
	boostActivationLimit = 2;
	
	showStartScreen = false;
	showBriefing = false;
	
	//yield WaitForSeconds(1);
	//showStartScreen = true;

}

function Update () {

	//print(solarPower);
	
	solarPower = Mathf.Clamp(solarPower, 0, 15);
	mood = Mathf.Clamp(mood, 0, 30);
	
	
	if(Input.GetKey("e") && solarPower > 0){
		if(solarPwrMinReached == true || boostKeyReleasedWhileBelowLimit == false){
			Booster();
			solarPower -= solarUsage * Time.deltaTime;
		}
	}

	//MAYBE=OBSOLETE//
	if(solarPower > boostActivationLimit){
		solarPwrMinReached = true;
		boostKeyReleasedWhileBelowLimit = false;
	}
	if(solarPower <= boostActivationLimit){
		solarPwrMinReached = false;
	}
	if(solarPower < boostActivationLimit && Input.GetKeyUp("e")){
		boostKeyReleasedWhileBelowLimit = true;
		NormalDrive();
	}
	if(solarPower > boostActivationLimit && Input.GetKeyUp("e")){
		boostKeyReleasedWhileBelowLimit = false;
		NormalDrive();
	}
		
			
	//Force QuestTesting//////
	if(Input.GetKeyDown("1") && questFunc.questStarted == false){
		questFunc.SpawnTourist();
	}
	if(Input.GetKeyDown("2") && questFunc.questStarted == false){
		questFunc.SpawnYouth();
	}
	if(Input.GetKeyDown("3") && questFunc.questStarted == false){
		questFunc.SpawnRich();
	}
	if(Input.GetKeyDown("4") && questFunc.questStarted == false){
		questFunc.SpawnFamily();
	}
	//Force QuestTesting//////
	
	if (stopTimer == false){
	timeLeft =	(Time.time - questStartTime) - questFunc.startTime;
	Seconds = countSeconds - (timeLeft);
	//print(timeLeft);
	//print(countSeconds);
		if (timeLeft >= 0 || questFunc.questStarted == false){
			stopTimer = true;
		}
	}
	
	if(Input.GetKeyDown("p")){
		if(gamePaused == false){
			pauseGame();
		}else{
			unPauseGame();
		}
	}		

	if(Input.GetKeyDown("escape")){
		if(showStartScreen == false){
			showStartScreen = true;
		}else{
			showStartScreen = false;
		}
	}
	
	if(Input.GetKeyDown("space") && gamePaused == true && showBriefing == true){
		showBriefing = false;
		unPauseGame();
	}
}

function OnGUI(){
	
	GUI.skin = solarGUI;
	
	shipVelRounded = Mathf.Round(shipControl.shipVelocity * 100.0)/100.0;
	solarPowerRounded = Mathf.Round(solarPower * 100.0)/100.0;
	
	velTxt = shipVelRounded.ToString();
	timerTxt = Seconds.ToString();
	
	GUI.Label (Rect(10,10,100,20), "Speed: " + velTxt);
	GUI.Label (Rect(10,30,100,20), "========================");
	GUI.Label (Rect(10,50,1000,20), "Annehmen des Quests in der Nähe einer Boye mit Leertaste");
	GUI.Label (Rect(10,70,1000,20), "Quest Status : " + questStatusTxt + " (" + questFunc.questType + ")");
	GUI.Label (Rect(10,90,100,20), "Timer : " + timerTxt);
	GUI.Label (Rect(10,110,200,20), "Solar Power (Press 'E') : " + solarPowerRounded);
	GUI.Label (Rect(10,130,500,20), "Mood (Only active when guests on board): " + mood);
	GUI.Label (Rect(10,150,200,20), "Reputation: " + reputation);
	GUI.Label (Rect(10,170,200,20), "'1'/'2'/'3'/'4' Force QuestType");

	roundedSeconds = Mathf.CeilToInt(Seconds);
	txtSeconds = roundedSeconds % 60;
	txtMinutes = roundedSeconds / 60;
	
	//timer = String.Format ("{0:00}:{1:00}"
	
	//====================BARS===============================//
	//=======================================================//

	
	GUI.DrawTexture( Rect(Screen.width - 50, 300, 15, -150),solarBarBackTxt);
	GUI.DrawTexture( Rect(Screen.width - 50, 300, 15, -solarPower*10),solarBarTxt);
	GUI.DrawTexture( Rect(Screen.width - 53, 280, 21, 1), whiteLine);
	GUI.DrawTexture( Rect(Screen.width - 57, 287, 30, 30), SonneTxt);
	
	GUI.DrawTexture( Rect(Screen.width - 250, 25, 150, 15),moodBarBackTxt);
	GUI.DrawTexture( Rect(Screen.width - 250, 25, mood*5, 15),moodBarTxt);
	GUI.DrawTexture( Rect(Screen.width - 200, 23, 1, 21),whiteLine);
	GUI.DrawTexture( Rect(Screen.width - 265, 19, 30, 30),smilesTxt);
	

	//=============PAUSE AND BRIEFING SCREENS======================//
	//=============================================================//
	
	if(showStartScreen == true){
		GUI.Label(Rect(0,0,700,700), startScreenTxt);
		pauseGame();
		if(GUI.Button(Rect(450,390,200,100),"START")){
			showStartScreen = false;
			unPauseGame();	
		}
	}
	
	if(showBriefing == true){
		//print("OK");
		if(questID == null){
			showBriefing = false;
		}
		if(questID == "quest-rich"){
			pauseGame();
			if(GUI.Button(Rect(100,100,400,400),"RICH1 : OKAY; GO")){
				showBriefing = false;
				unPauseGame();
			}
		}
		if(questID == "quest-rich2"){
			pauseGame();
			if(GUI.Button(Rect(100,100,400,400),"RICH2 : OKAY; GO")){
				showBriefing = false;
				unPauseGame();
			}
		}
		if(questID == "quest-youth"){
			pauseGame();
			if(GUI.Button(Rect(100,100,400,400),"YOUTH1 : OKAY; GO")){
				showBriefing = false;
				unPauseGame();
			}
		}
		if(questID == "quest-youth2"){
			pauseGame();
			if(GUI.Button(Rect(100,100,400,400),"YOUTH2 : OKAY; GO")){
				showBriefing = false;
				unPauseGame();
			}
		}
		if(questID == "quest-family"){
			pauseGame();
			if(GUI.Button(Rect(100,100,400,400),"FAMILY1 : OKAY; GO")){
				showBriefing = false;
				unPauseGame();
			}
		}
		if(questID == "quest-family2"){
			pauseGame();
			if(GUI.Button(Rect(100,100,400,400),"FAMILY2 : OKAY; GO")){
				showBriefing = false;
				unPauseGame();
			}
		}
		if(questID == "quest-tourist"){
			pauseGame();
			if(GUI.Button(Rect(100,100,400,400),"TOURIST1 : OKAY; GO")){
				showBriefing = false;
				unPauseGame();
			}
		}
		if(questID == "quest-tourist2"){
			pauseGame();
			if(GUI.Button(Rect(100,100,400,400),"TOURIST2 : OKAY; GO")){
				showBriefing = false;
				unPauseGame();
			}
		}
	}		
}

function Booster() {
	if(solarPower >= 0){
		shipControl.turbo = 2.5;
		//shipControl.turbo = 1;
		//solarPower = 0;
	}
}

function NormalDrive(){
	shipControl.turbo = 1;
}

function EnableTimer(){
	stopTimer = false;
	questStartTime = Time.time;
}
function StopTimer(){
	stopTimer = true;
}
function pauseGame(){
	//print("PauseExec");
	Time.timeScale = 0.0;
	gamePaused = true;
}
function unPauseGame(){
	Time.timeScale = 1.0;
	gamePaused = false;
}

