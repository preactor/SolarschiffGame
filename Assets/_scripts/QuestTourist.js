#pragma strict

var questFunc : QuestFunc;
var gameRes : GameRessources;
var questCompass : QuestCompass;

var ObjZone1 : GameObject;
var ObjZone2 : GameObject;
var ObjZone3 : GameObject;
var ObjZone4 : GameObject;
var ObjZone5 : GameObject;
var ObjZone6 : GameObject;
var ObjZone7 : GameObject;
var ObjZone8 : GameObject;

var i = 1;

var moodIncreaseActive = false;
var moodDecreaseActive = false;
var bonus : float;
var malus : float;

var questEnded : boolean;

function Start () {

	questFunc = GameObject.FindWithTag("GameRes").GetComponent(QuestFunc);
	gameRes = GameObject.FindWithTag("GameRes").GetComponent(GameRessources);
	questCompass = GameObject.FindWithTag("questCompass").GetComponent(QuestCompass);

	ObjZone1 = GameObject.FindWithTag("ObjZone1");
	ObjZone2 = GameObject.FindWithTag("ObjZone2");
	ObjZone3 = GameObject.FindWithTag("ObjZone3");
	ObjZone4 = GameObject.FindWithTag("ObjZone4");
	ObjZone5 = GameObject.FindWithTag("ObjZone5");
	ObjZone6 = GameObject.FindWithTag("ObjZone6");
	ObjZone7 = GameObject.FindWithTag("ObjZone7");
	ObjZone8 = GameObject.FindWithTag("ObjZone8");
	
	questCompass.curTarget = ObjZone1;
	Destroy (questFunc.newQuestTarget);
	
	bonus = 0;
	gameRes.mood = 0;
	
	questEnded = false;

}

function Update () {

	// Workaround for Timing -> everytime the moodincreas is getting called, a boolean is set to true to prevent 
	//from spawning it every frame, having to wait for a specific amount of time each call, before the boolean is set to false again.
	if(questFunc.questStarted == true && gameRes.timeLeft < 0 && moodIncreaseActive == false){
		IncMood(1);
	}
	if(questFunc.questStarted == true && gameRes.timeLeft > 0 && moodDecreaseActive == false){
		DecMood();
	}
}

function nextZone(){

	i++;
	if(i == 2){
		questCompass.curTarget = ObjZone2;
	}
	if(i == 3){
		questCompass.curTarget = ObjZone3;
	}
	if(i == 4){
		questCompass.curTarget = ObjZone4;
	}
	if(i == 5){
		questCompass.curTarget = ObjZone5;
	}
	if(i == 6){
		questCompass.curTarget = ObjZone6;
	}
	if(i == 7){
		questCompass.curTarget = ObjZone7;
	}
	if(i == 8){
		questCompass.curTarget = ObjZone8;
	}
}

function IncMood(modifier : float){
	moodIncreaseActive = true;
	gameRes.mood = gameRes.mood + 0.05 * modifier;
	yield WaitForSeconds (0.25);
	moodIncreaseActive = false;
}

function DecMood(){
	moodDecreaseActive = true;
	gameRes.mood = gameRes.mood - 0.09;
	yield WaitForSeconds (0.25);
	moodDecreaseActive = false;
}

function EndQuest(){

	//Something to Think about just yet: 4 Mögliche fälle? Zu spät aber glücklich, zu spät und unglücklich, 
	//rechtzeitig aber nicht glücklich, rechtzeitig und glücklich? Haben die Missionen immer eine Haupt-Stats, die den Ausgang bestimmt?
	//Time oder Mood oder wollen wir das Differenzieren?
 	if(i == 9 && gameRes.timeLeft > 0 && questEnded == false){
 		questEnded = true;
		gameRes.StopTimer();
		gameRes.questStatusTxt = "You failed! Your guests missed their appointment.";
		questFunc.questStarted = false;
		questFunc.questAssigned = false;
		//malus gets calculated from the delay in Seconds in which the player manages to deliver his guests
		//malus = 
		//or maybe we just display it directly when the player is taking too long. For transparency reasons probably the better solution.
		gameRes.missionBonus = 0;
		gameRes.repBefore = gameRes.reputation;
		gameRes.repGain = Mathf.CeilToInt((gameRes.mood*0.1)*5);
		gameRes.reputation = gameRes.reputation + gameRes.repGain;
		gameRes.ShowMissionResultScreen("HikersFail");
		yield WaitForSeconds (1);
		if (questFunc.questStarted == false){
			gameRes.questStatusTxt = "No quest active";
			questFunc.questType = "None";
			gameRes.ChangeMissionIcon("None");
			gameRes.mood = 0;
		}
	}
	if(i == 9 && gameRes.timeLeft < 0 && questEnded == false){
		questEnded = true;
		gameRes.StopTimer();
		gameRes.questStatusTxt = "You've done it! Your guests praise your skills!";
		questFunc.questStarted = false;
		questFunc.questAssigned = false;
		//bonus gets calculated out of standard moodincrease for the time left + a small percentagebonus
		bonus = ((gameRes.Seconds * (4*0.05))*0.25) + (gameRes.Seconds*0.1);
		print(bonus);
		gameRes.missionBonus = Mathf.CeilToInt(bonus);
		gameRes.repBefore = gameRes.reputation;
		gameRes.repGain = Mathf.CeilToInt(((gameRes.mood*0.25)+ bonus)*10);
		gameRes.reputation = gameRes.reputation + gameRes.repGain;
		gameRes.ShowMissionResultScreen("HikersWin");
		yield WaitForSeconds (1);
		if (questFunc.questStarted == false){
			gameRes.questStatusTxt = "No quest active";
			questFunc.questType = "None";
			gameRes.ChangeMissionIcon("None");
			gameRes.mood = 0;
		}
	}
	/// DESTROY ALL RESIDUES ///
	///======================///
	
	if(i == 9){
		questFunc.destroyObjectiveZones = true;
		questFunc.startTime = 0;
		Destroy(this.gameObject);
	}
}

