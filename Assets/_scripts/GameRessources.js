#pragma strict

var reputation : float;
var repGain : float;
var repBefore : float;
var solarPower : float;
var mood : float;
var missionBonus : float;
var questFunc : QuestFunc;

var solarUsage : float;
var solarPwrMinReached : boolean;
var boostKeyReleasedWhileBelowLimit : boolean;
var boostActivationLimit : float;
var shipControl : ShipTest;

var gamePaused = false;

//TimerFunctionality

var Seconds : int;
var countSeconds : int;
private var roundedSeconds : int;
private var txtSeconds : int;
private var txtMinutes : int;
private var timer : String;

private var stopTimer = true;
var timeLeft : float;
private var questStartTime : float;

//STATS-BARS

var solarBar : GameObject;
var rufBar : GameObject;
var moodBar : GameObject;

//MENU/UI FUNCTIONALITY

var mainMenu : GameObject;

var qIntro : GameObject;
var qIntroHikers : GameObject;
var qIntroFamily : GameObject;
var qIntroYouth : GameObject;
var qIntroRich : GameObject;

var qIconHikers : GameObject;
var qIconFamily : GameObject;
var qIconYouth : GameObject;
var qIconRich : GameObject;

var showBriefing : boolean;

var bCompass : GameObject;

//MENU/UI/QUEST RESULT SCREENS
var questResultScreen : GameObject;

var qR_HikersWin : GameObject;
var qR_HikersFail : GameObject;
var qR_FamilyWin : GameObject;
var qR_FamilyFail : GameObject;
var qR_RichWin : GameObject;
var qR_RichFail : GameObject;
var qR_YouthWin : GameObject;
var qR_YouthFail : GameObject;

var qR_Mood : GameObject;
var qR_Time : GameObject;
var qR_Bonus : GameObject;

var qR_RepGain : GameObject;
var qR_RepBefore : GameObject;
var qR_RepTotal : GameObject;

//SubmitHighScoreFunctionality

var highScoreString : String;
var highScore : int;
var userName : String;
var eMail : String;
var submitHighscoreFail : GameObject;
var submitHighscoreSuccess : GameObject;


//GUIFunctionality===========================
var solarGUI : GUISkin;
var shipVelRounded : float;
var solarPowerRounded : float;
var velTxt : String;
var timerTxt : String;
var questStatusTxt	: String;
//var questID : String;
var startScreenTxt : Texture2D;
var solarBarTxt : Texture2D;
var solarBarBackTxt : Texture2D;
var whiteLine : Texture2D;
var SonneTxt : Texture2D;
var moodBarTxt : Texture2D;
var moodBarBackTxt : Texture2D;
var smilesTxt : Texture2D;
//===========================================

function Start () {

	questStatusTxt = "No quest active";
	solarPower = 5;
	mood = 0;
	reputation = 0;
	solarUsage = 1.0;
	boostActivationLimit = 2;
	
	showMainMenu();
	showBriefing = false;
	
	solarBar = GameObject.FindWithTag("UI_SolarPwrBar");
	rufBar = GameObject.FindWithTag("UI_RufBar");
	moodBar = GameObject.FindWithTag("UI_MoodBar");

}

function Update () {
	
	//====================================================
	//BASIC SOLARPWR RESOURCE MANAGEMENT =================
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
	
	//====================================================
	// BASIC CONTROLS ====================================
	if(Input.GetKey("e") && solarPower > 0){
		if(solarPwrMinReached == true || boostKeyReleasedWhileBelowLimit == false){
			Booster();
			solarPower -= solarUsage * Time.deltaTime;
		}
	}
	if(Input.GetKeyDown("escape")){
		showMainMenu();
	}
	if(Input.GetKeyDown("space")){
		HideBriefing();
		
	}
	
	//======================================================
	//TIMER ================================================
	if (stopTimer == false){
		timeLeft =	(Time.time - questStartTime) - questFunc.startTime;
		Seconds = countSeconds - (timeLeft);
		roundedSeconds = Mathf.CeilToInt(Seconds);
		txtSeconds = roundedSeconds % 60;
		txtMinutes = roundedSeconds / 60;
	
		timer = String.Format("{0:00}:{1:00}", txtMinutes, txtSeconds);
		GameObject.Find("IngameUI_TimerTxt").GetComponent.<UI.Text>().text = timer;
		
		//print(timeLeft);
		//print(countSeconds);
		if (timeLeft >= 0 || questFunc.questStarted == false){
			stopTimer = true;
		}
	}		
	
	//=======================================================
	//INGAME UI========================================
	//BARS
	solarPower = Mathf.Clamp(solarPower, 0, 21);
	mood = Mathf.Clamp(mood, 0, 100);
	//print(solarPower);
	if(gamePaused == false){
		solarBar.GetComponent.<RectTransform>().sizeDelta.x = solarPower*10;
		rufBar.GetComponent.<RectTransform>().sizeDelta.x = reputation/2;
		if(questFunc.questStarted == true){
			moodBar.GetComponent.<RectTransform>().sizeDelta.x = mood*2.2;
		}else{
			moodBar.GetComponent.<RectTransform>().sizeDelta.x = 0;
		}
	}

	//bCompass Management
	if(questFunc.questStarted == true){
		bCompass.SetActive(false);
	}
	if(questFunc.questAssigned == true){
		bCompass.SetActive(true);
	}
	
	//=======================================================
	//DEBUGKEYS =============================================
	//Force QuestTesting//////
	if(Input.GetKeyDown("1") && questFunc.questStarted == false){
		questFunc.SpawnHikers();
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
	
	if(Input.GetKeyDown("p")){
		if(gamePaused == false){
			pauseGame();
		}else{
			unPauseGame();
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


//===================================================
//TIMEFUNCTIONS =====================================
function EnableTimer(){
	stopTimer = false;
	questStartTime = Time.time;
}
function StopTimer(){
	stopTimer = true;
	GameObject.Find("IngameUI_TimerTxt").GetComponent.<UI.Text>().text = null;
}
function pauseGame(){
	print("PauseExec");
	Time.timeScale = 0.0;
	gamePaused = true;
}
function unPauseGame(){
	Time.timeScale = 1.0;
	gamePaused = false;
}

//=======================================================
//UI ====================================================
function showMainMenu(){
		mainMenu.SetActive(true);
		pauseGame();
}
function GameStarted(){

	solarBar = GameObject.FindWithTag("UI_SolarPwrBar");
	rufBar = GameObject.FindWithTag("UI_RufBar");
	moodBar = GameObject.FindWithTag("UI_MoodBar");
}

//=======================================================
//MISSION INTRO SCREENS =================================
function ShowBriefing(questID : String){
	if(questID == "quest-rich"){
		print("richquest");
		qIntro.SetActive(true);
		qIntroRich.SetActive(true);
		showBriefing = true;
		ChangeMissionIcon(questID);
		pauseGame();
	}
	if(questID == "quest-youth"){
		print("youthquest");
		qIntro.SetActive(true);
		qIntroYouth.SetActive(true);
		showBriefing = true;
		ChangeMissionIcon(questID);
		pauseGame();
	}
	if(questID == "quest-family"){
		print("familyquest");
		qIntro.SetActive(true);
		qIntroFamily.SetActive(true);
		showBriefing = true;
		ChangeMissionIcon(questID);
		pauseGame();
	}
	if(questID == "quest-hikers"){
		print("hikerquest");
		qIntro.SetActive(true);
		qIntroHikers.SetActive(true);
		showBriefing = true;
		ChangeMissionIcon(questID);
		pauseGame();
	}	
}
function HideBriefing(){
	if(showBriefing == true){
		qIntro.SetActive(false);
		showBriefing = false;
		unPauseGame();
	}
}

//=======================================================
//CHANGE MISSION ICONS ==================================

function ChangeMissionIcon(guestType : String){
	if(guestType == "quest-rich"){
		qIconRich.SetActive(true);
	}
	if(guestType == "quest-youth"){
		qIconYouth.SetActive(true);
	}	
	if(guestType == "quest-family"){
		qIconFamily.SetActive(true);
	}
	if(guestType == "quest-hikers"){
		qIconHikers.SetActive(true);
	}
	if(guestType == "None"){
		qIconHikers.SetActive(false);
		qIconYouth.SetActive(false);
		qIconFamily.SetActive(false);
		qIconRich.SetActive(false);
	}
}



//=================================================
//MISSION END SCREENS =============================

function ShowMissionResultScreen(MissionResult : String){
	
	questResultScreen.SetActive(true);
	pauseGame();
	
	if(MissionResult == "HikersFail"){
	
	}
	
	if(MissionResult == "HikersWin"){
		qR_HikersWin.SetActive(true);
		qR_Mood.GetComponent.<UI.Text>().text = Mathf.CeilToInt(mood).ToString();
		qR_Time.GetComponent.<UI.Text>().text = roundedSeconds.ToString() + " s";
		qR_Bonus.GetComponent.<UI.Text>().text = "x" + missionBonus.ToString();
		qR_RepGain.GetComponent.<UI.Text>().text = repGain.ToString();
		qR_RepBefore.GetComponent.<UI.Text>().text = repBefore.ToString();
		qR_RepTotal.GetComponent.<UI.Text>().text = reputation.ToString();
	}

}
	


function SubmitHighscore(){

	highScoreString = GameObject.Find("SubmitHighscore_Score").GetComponent.<UI.Text>().text;
	highScore = int.Parse(highScoreString);
	userName = GameObject.Find("SubmitHighscore_Name").GetComponent.<UI.Text>().text;
	eMail = GameObject.Find("SubmitHighscore_eMail").GetComponent.<UI.Text>().text;
	
	//Make a failstate if there is a empty Inputfield or a Submission Error occured
	//ALSO CHECK if an eMail is entered correctly!:
	//http://forum.unity3d.com/threads/check-if-its-an-e-mail.73132/
	if(eMail.Length < 1 || userName.Length < 1){
		submitHighscoreFail.SetActive(true);
		print("ErrorOccured");
	}else{
		submitHighscoreSuccess.SetActive(true);
		print(highScore + userName + eMail);
	}
}


//==================================================
//ONGUI LEFT IN FOR DEBUGGING/FALLBACK ======================
function OnGUI(){
	
	GUI.skin = solarGUI;
	
	//shipVelRounded = Mathf.Round(shipControl.shipVelocity * 100.0)/100.0;
	//velTxt = shipVelRounded.ToString();
	//timerTxt = Seconds.ToString();
	
	//GUI.Label (Rect(10,10,100,20), "Speed: " + velTxt);
	//GUI.Label (Rect(10,30,100,20), "========================");
	//GUI.Label (Rect(10,50,1000,20), "Annehmen des Quests in der Nähe einer Boye mit Leertaste");
	//GUI.Label (Rect(10,70,1000,20), "Quest Status : " + questStatusTxt + " (" + questFunc.questType + ")");
	//GUI.Label (Rect(10,90,100,20), "Timer : " + timerTxt);
	//GUI.Label (Rect(10,110,200,20), "Solar Power (Press 'E') : " + solarPowerRounded);
	//GUI.Label (Rect(10,130,500,20), "Mood (Only active when guests on board): " + mood);
	//GUI.Label (Rect(10,150,200,20), "Reputation: " + reputation);
	//GUI.Label (Rect(10,170,200,20), "'1'/'2'/'3'/'4' Force QuestType");

	
	
	//====================BARS===============================//
	//=======================================================//

	
	//GUI.DrawTexture( Rect(Screen.width - 50, 300, 15, -150),solarBarBackTxt);
	//GUI.DrawTexture( Rect(Screen.width - 50, 300, 15, -solarPower*10),solarBarTxt);
	//GUI.DrawTexture( Rect(Screen.width - 53, 280, 21, 1), whiteLine);
	//GUI.DrawTexture( Rect(Screen.width - 57, 287, 30, 30), SonneTxt);
	
	//GUI.DrawTexture( Rect(Screen.width - 250, 25, 150, 15),moodBarBackTxt);
	//GUI.DrawTexture( Rect(Screen.width - 250, 25, mood*5, 15),moodBarTxt);
	//GUI.DrawTexture( Rect(Screen.width - 200, 23, 1, 21),whiteLine);
	//GUI.DrawTexture( Rect(Screen.width - 265, 19, 30, 30),smilesTxt);
	

	//=============PAUSE AND BRIEFING SCREENS======================//
	//=============================================================//
	
}

