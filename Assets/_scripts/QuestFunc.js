#pragma strict

var questStarted = false;
var questAssigned = false;
var questGiver : QuestGiver;

var gameRes : GameRessources;

var questGiverObj : GameObject;
var questGiverLocation : Transform;
var questGiverLocObj : GameObject;

var objectiveZone : GameObject;
var destroyObjectiveZones : boolean;

var QGoal1Rundfahrt1 : Transform;
var QGoal1Rundfahrt2 : Transform;
var QGoal1Rundfahrt3 : Transform;
var QGoal1Rundfahrt4 : Transform;
var QGoal1Rundfahrt5 : Transform;
var QGoal1Rundfahrt6 : Transform;
var QGoal1Rundfahrt7 : Transform;

var QGoal2Rundfahrt1 : Transform;
var QGoal2Rundfahrt2 : Transform;
var QGoal2Rundfahrt3 : Transform;
var QGoal2Rundfahrt4 : Transform;
var QGoal2Rundfahrt5 : Transform;
var QGoal2Rundfahrt6 : Transform;
var QGoal2Rundfahrt7 : Transform;

var QGoalDriftYouth1 : Transform;
var QGoalDriftYouth2 : Transform;

var QGoalGrill1 : Transform;
var QGoalGrill2 : Transform;

var QSpwnDampfschiff : Transform;
var QSpwnGwatt : Transform;
var QSpwnHuenegg : Transform;
var QSpwnSchadau : Transform;
var QSpwnScherzli : Transform;

var questType : String;
var questTourist : GameObject;

var compassGO : GameObject;
//Script
var questCompass : QuestCompass;
var bubbleCompass : BubbleCompass;
var newQuestTarget : GameObject;
var bCompassAimer : BCompassAimer;

var ship : Transform;

//TimerValues
var startTime : float;



function Start () {

	compassGO = GameObject.FindWithTag("questCompass");

	compassGO.GetComponent.<UI.Image>().enabled = false;
	
	destroyObjectiveZones = false;

}


function Update () {

	//var script : ShipTest = gameObject.GetComponent(ShipTest);
	//print(ShipTest);
		
	//if(questStarted == true){
	//	print("quest Started");
	//	bubbleCompass.ziel = bubbleCompass.emptyTarget;
	//}else{
	//	print("quest Idle");
	//}
	//print("questStarted = " + questStarted);
	if(questAssigned == false){
		IdletoQuest();
	}		
}

function IdletoQuest(){
	
	AssignEmptyTarget();
	yield WaitForSeconds(10);
	//=====================================
	//Reset the destroyZones boolean, once it got called from the outside
	if(destroyObjectiveZones == true){
		destroyObjectiveZones = false;
	}
	if( questAssigned == false){
		AssignQuest();
	}
}

//Assign EmptyTarget to Compass between Missions
function AssignEmptyTarget(){
	questCompass.curTarget = questCompass.emptyTarget;
	bubbleCompass.ziel = bubbleCompass.emptyTarget;
	bCompassAimer.curTarget = bCompassAimer.emptyTarget;
}

function AssignQuest(){
	//Algorythm//
	//Assigns a new Quest according to various Values like Reputation and Random numbers
	//Defines what "Questgiver"(Buoy) will be used
	//Algorythm//
	//Location gets defined after algorythm
	
	SpawnHikers();
	
	
	
	
	
	//============================================
	//Debug ======================================
//		questAssigned = true;
//		questGiverLocObj = GameObject.FindWithTag("QSpwnDampfschiff");
//		questGiverLocation = questGiverLocObj.transform;
//		newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
//	
//
//	//newQuestTarget = GameObject.FindWithTag("quest-debug");
//	//Changing the QuestGiverTag after evaluating which Quest is appropriate
//		newQuestTarget.tag = "quest-tourist";
//		questCompass.curTarget = newQuestTarget;
}


/// QUESTGIVERS ///
///=============///


function SpawnHikers(){

	if(newQuestTarget != null){
		questCompass.curTarget = questCompass.emptyTarget;
		Destroy(newQuestTarget);
	}
	questAssigned = true;
	questGiverLocObj = GameObject.FindWithTag("QSpwnDampfschiff");
	questGiverLocation = questGiverLocObj.transform;
	
	newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
	newQuestTarget.tag = "quest-tourist";
	
	questCompass.curTarget = newQuestTarget;
	bubbleCompass.ziel = newQuestTarget;
	bCompassAimer.curTarget = newQuestTarget;
}

function SpawnYouth(){

	if(newQuestTarget != null){
		questCompass.curTarget = questCompass.emptyTarget;
		Destroy(newQuestTarget);
	}
	questAssigned = true;
	questGiverLocObj = GameObject.FindWithTag("QSpwnHuenegg");
	questGiverLocation = questGiverLocObj.transform;
	
	newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
	newQuestTarget.tag = "quest-youth";
	
	questCompass.curTarget = newQuestTarget;
	bubbleCompass.ziel = newQuestTarget;
	bCompassAimer.curTarget = newQuestTarget;
	
}

function SpawnRich(){
	
	if(newQuestTarget != null){
		questCompass.curTarget = questCompass.emptyTarget;
		Destroy(newQuestTarget);
	}
	questAssigned = true;
	questGiverLocObj = GameObject.FindWithTag("QSpwnDampfschiff");
	questGiverLocation = questGiverLocObj.transform;
	
	newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
	newQuestTarget.tag = "quest-rich";
	
	questCompass.curTarget = newQuestTarget;
	bubbleCompass.ziel = newQuestTarget;
	bCompassAimer.curTarget = newQuestTarget;
	
}

function SpawnFamily(){

	if(newQuestTarget != null){
		questCompass.curTarget = questCompass.emptyTarget;
		Destroy(newQuestTarget);
	}
	questAssigned = true;
	questGiverLocObj = GameObject.FindWithTag("QSpwnGwatt");
	questGiverLocation = questGiverLocObj.transform;
	
	newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
	newQuestTarget.tag = "quest-family";
	
	questCompass.curTarget = newQuestTarget;
	bubbleCompass.ziel = newQuestTarget;
	bCompassAimer.curTarget = newQuestTarget;
	
}



/// QUESTELEMENTS ///
///===============///

function QuestRich(){

	//Exact Timing - driving on normal Speeds - reaching all the zones
	
	if(questStarted == false){
		print("Rich-Quest started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		yield WaitForSeconds (0.2);
		gameRes.ShowBriefing("quest-rich");
	}
}

function QuestYouth(){

	//Some Action - minimum of x (maybe 2) SolarBoosts - Drifting
	
	if(questStarted == false){
		print("Youth-Quest started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		yield WaitForSeconds (0.2);
		gameRes.ShowBriefing("quest-youth");
	}
}

function QuestFamily(){

	//Barbeque-Party - Drive to the designated Zone and try to keep the ship as stable as Possible (incoming Wavebumps which have to be crossed 90° e.g.)
	
	if(questStarted == false){
		print("Family-Quest started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		questStarted = true;
		yield WaitForSeconds (0.2);
		gameRes.ShowBriefing("quest-family");

		
		var ObjZone1 = Instantiate (objectiveZone, QGoal2Rundfahrt1.position, transform.rotation);
		ObjZone1.tag = "ObjZone1";
		var ObjZone2 = Instantiate (objectiveZone, QGoal2Rundfahrt2.position, transform.rotation);
		ObjZone2.tag = "ObjZone2";
		var ObjZone3 = Instantiate (objectiveZone, QGoal2Rundfahrt3.position, transform.rotation);
		ObjZone3.tag = "ObjZone3";
		var ObjZone4 = Instantiate (objectiveZone, QGoal2Rundfahrt4.position, transform.rotation);
		ObjZone4.tag = "ObjZone4";
		var ObjZone5 = Instantiate (objectiveZone, QGoal2Rundfahrt5.position, transform.rotation);
		ObjZone5.tag = "ObjZone5";
		var ObjZone6 = Instantiate (objectiveZone, QGoal2Rundfahrt6.position, transform.rotation);
		ObjZone6.tag = "ObjZone6";
		var ObjZone7 = Instantiate (objectiveZone, QGoal2Rundfahrt7.position, transform.rotation);
		ObjZone7.tag = "ObjZone7";
		var ObjZone8 = Instantiate (objectiveZone, QSpwnSchadau.position, transform.rotation);
		ObjZone8.tag = "ObjZone8";
		
		Instantiate (questTourist, transform.position, transform.rotation);	
		gameRes.questStatusTxt = "Quest Started! Get to the end in time!";	
		gameRes.EnableTimer();
		startTime = 90;	
	}
}

function QuestTourist(){

	// Von einem Ort zum anderen Reisen und die Gäste transferieren. Dabei muss man 1-2 Zonen erreichen und gegen Strömungen ankämpfen/Ausweichen.

	if(questStarted == false){
		print("Tourist-Quest started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		questStarted = true;
		yield WaitForSeconds (0.2);
		gameRes.ShowBriefing("quest-hikers");
		
		var ObjZone1 = Instantiate (objectiveZone, QGoal1Rundfahrt1.position, transform.rotation);
		ObjZone1.tag = "ObjZone1";
		var ObjZone2 = Instantiate (objectiveZone, QGoal1Rundfahrt2.position, transform.rotation);
		ObjZone2.tag = "ObjZone2";
		var ObjZone3 = Instantiate (objectiveZone, QGoal1Rundfahrt3.position, transform.rotation);
		ObjZone3.tag = "ObjZone3";
		var ObjZone4 = Instantiate (objectiveZone, QGoal1Rundfahrt4.position, transform.rotation);
		ObjZone4.tag = "ObjZone4";
		var ObjZone5 = Instantiate (objectiveZone, QGoal1Rundfahrt5.position, transform.rotation);
		ObjZone5.tag = "ObjZone5";
		var ObjZone6 = Instantiate (objectiveZone, QGoal1Rundfahrt6.position, transform.rotation);
		ObjZone6.tag = "ObjZone6";
		var ObjZone7 = Instantiate (objectiveZone, QGoal1Rundfahrt7.position, transform.rotation);
		ObjZone7.tag = "ObjZone7";
		var ObjZone8 = Instantiate (objectiveZone, QSpwnDampfschiff.position, transform.rotation);
		ObjZone8.tag = "ObjZone8";
		
		Instantiate (questTourist, transform.position, transform.rotation);	
		gameRes.questStatusTxt = "Quest Started! Get to the end in time!";	
		gameRes.EnableTimer();
		startTime = 100;
		// Schaut so aus als bräuchte ich einen QuestOverseer, welcher ERST jetzt mit einem update schaut, was mit den Zonen Passiert.
		// Die Zonen werden im Script mit gameobject.findwithtag gefunden.		
	}
}

//NEW TYPE OF QUEST? Rettungsmission, entweder direkt auf dem See startbar oder an Land

function QuestDebug (){
	
	if(questStarted == false){
		print("Debug Quest started!");
		gameRes.questStatusTxt = "Quest Started! Get to the end in time!";	
		gameRes.EnableTimer();
		startTime = 60;
		questStarted = true;
		//compass.colChecker = true;
		//compass.nextTarget();
		yield WaitForSeconds (0.2);
		gameRes.ShowBriefing("quest-debug");
	}	
}



	
	