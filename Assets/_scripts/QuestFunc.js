#pragma strict

var questStarted = false;
var questAssigned = false;
var questGiver : QuestGiver;
var compass : arrowCompass;
var gameRes : GameRessources;

var questGiverObj : GameObject;
var questGiverLocation : Transform;
var questGiverLocObj : GameObject;


var objectiveZone : GameObject;

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

var questCompass : QuestCompass;
var newQuestTarget : GameObject;

var ship : Transform;

//TimerValues

var startTime : float;
var randomvalue : float;



function Start () {

	questCompass.GetComponent.<Renderer>().enabled = false;

}


function Update () {

	//var script : ShipTest = gameObject.GetComponent(ShipTest);
	//print(ShipTest);
		
	//if(script.questStarted == true){
	//	print("quest Started");
	//}else{
	//	print("quest Idle");
	//}
	//print("questStarted = " + questStarted);
	if(questAssigned == false){
		IdletoQuest();
	}		
}

function IdletoQuest(){
	
	yield WaitForSeconds(6);
	if( questAssigned == false){
		AssignQuest();
	}
}

function AssignQuest(){
	
	questAssigned = true;
	
	//Algorythm//
	//Assigns a new Quest according to various Values like Reputation and Random numbers
	//Defines what "Questgiver"(Buoy) will be used
	//Algorythm//
	
	//Location gets defined after algorythm
	
	questGiverLocObj = GameObject.FindWithTag("QSpwnDampfschiff");
	questGiverLocation = questGiverLocObj.transform;
	
	newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
	
	//Debug

	//newQuestTarget = GameObject.FindWithTag("quest-debug");
	
	//Changing the QuestGiverTag after evaluating which Quest is appropriate
	
	newQuestTarget.tag = "quest-tourist";
	questCompass.curTarget = newQuestTarget;
	
	//questCompass.Enabled();
}


/// QUESTGIVERS ///
///=============///


function SpawnTourist(){

	if(newQuestTarget != null){
		questCompass.curTarget = questCompass.emptyTarget;
		Destroy(newQuestTarget);
	}
	questAssigned = true;
	
	randomvalue = Random.value;
	
	if(randomvalue > 0.5){
		questGiverLocObj = GameObject.FindWithTag("QSpwnDampfschiff");
		questGiverLocation = questGiverLocObj.transform;
	
		newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
		newQuestTarget.tag = "quest-tourist";
		questCompass.curTarget = newQuestTarget;
	}
	if(randomvalue < 0.5){
		questGiverLocObj = GameObject.FindWithTag("QSpwnSchadau");
		questGiverLocation = questGiverLocObj.transform;
	
		newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
		newQuestTarget.tag = "quest-tourist2";
		questCompass.curTarget = newQuestTarget;
	}
}

function SpawnYouth(){

	if(newQuestTarget != null){
		questCompass.curTarget = questCompass.emptyTarget;
		Destroy(newQuestTarget);
	}
	questAssigned = true;
	
	randomvalue = Random.value;
	
	if(randomvalue > 0.5){
		questGiverLocObj = GameObject.FindWithTag("QSpwnScherzli");
		questGiverLocation = questGiverLocObj.transform;
	
		newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
		newQuestTarget.tag = "quest-youth";
		questCompass.curTarget = newQuestTarget;
	}
	if(randomvalue < 0.5){
		questGiverLocObj = GameObject.FindWithTag("QSpwnHuenegg");
		questGiverLocation = questGiverLocObj.transform;
	
		newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
		newQuestTarget.tag = "quest-youth2";
		questCompass.curTarget = newQuestTarget;
	}
}

function SpawnRich(){
	
	if(newQuestTarget != null){
		questCompass.curTarget = questCompass.emptyTarget;
		Destroy(newQuestTarget);
	}
	questAssigned = true;
	
	randomvalue = Random.value;
	
	if(randomvalue > 0.5){
		questGiverLocObj = GameObject.FindWithTag("QSpwnSchadau");
		questGiverLocation = questGiverLocObj.transform;
	
		newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
		newQuestTarget.tag = "quest-rich";
		questCompass.curTarget = newQuestTarget;
	}
	if(randomvalue < 0.5){
		questGiverLocObj = GameObject.FindWithTag("QSpwnDampfschiff");
		questGiverLocation = questGiverLocObj.transform;
	
		newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
		newQuestTarget.tag = "quest-rich2";
		questCompass.curTarget = newQuestTarget;
	}
}

function SpawnFamily(){

	if(newQuestTarget != null){
		questCompass.curTarget = questCompass.emptyTarget;
		Destroy(newQuestTarget);
	}
	questAssigned = true;
	
	randomvalue = Random.value;
	
	if(randomvalue > 0.5){
		questGiverLocObj = GameObject.FindWithTag("QSpwnDampfschiff");
		questGiverLocation = questGiverLocObj.transform;
	
		newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
		newQuestTarget.tag = "quest-family";
		questCompass.curTarget = newQuestTarget;
	}
	if(randomvalue < 0.5){
		questGiverLocObj = GameObject.FindWithTag("QSpwnGwatt");
		questGiverLocation = questGiverLocObj.transform;
	
		newQuestTarget = Instantiate (questGiverObj,questGiverLocation.position,questGiverLocation.rotation);
		newQuestTarget.tag = "quest-family2";
		questCompass.curTarget = newQuestTarget;
	}
}



/// QUESTELEMENTS ///
///===============///



function QuestRich(){

	//Exact Timing - driving on normal Speeds - reaching all the zones
	
	if(questStarted == false){
		print("Rich-Quest started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		questType = "quest-rich";
		gameRes.questID = questType;
		yield WaitForSeconds (0.2);
		gameRes.showBriefing = true;
	}
}

function QuestRich2(){

	//Exact Timing - driving on normal Speeds - reaching all the zones
	
	if(questStarted == false){
		print("Rich-Quest2 started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		questType = "quest-rich2";
		gameRes.questID = questType;
		yield WaitForSeconds (0.2);
		gameRes.showBriefing = true;
	}
}

function QuestYouth(){

	//Some Action - minimum of x (maybe 2) SolarBoosts - Drifting
	
	if(questStarted == false){
		print("Youth-Quest started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		questType = "quest-youth";
		gameRes.questID = questType;
		yield WaitForSeconds (0.2);
		gameRes.showBriefing = true;
	}
}

function QuestYouth2(){

	//Some Action - minimum of x (maybe 2) SolarBoosts - Drifting
	
	if(questStarted == false){
		print("Youth-Quest2 started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		questType = "quest-youth2";
		gameRes.questID = questType;
		yield WaitForSeconds (0.2);
		gameRes.showBriefing = true;
	}
}

function QuestFamily(){

	//Barbeque-Party - Drive to the designated Zone and try to keep the ship as stable as Possible (incoming Wavebumps which have to be crossed 90° e.g.)
	
	if(questStarted == false){
		print("Family-Quest started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		questType = "quest-family";
		gameRes.questID = questType;
		yield WaitForSeconds (0.2);
		gameRes.showBriefing = true;
	}
}

function QuestFamily2(){

	//Barbeque-Party - Drive to the designated Zone and try to keep the ship as stable as Possible (incoming Wavebumps which have to be crossed 90° e.g.)
	
	if(questStarted == false){
		print("Family-Quest2 started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		questType = "quest-family2";
		gameRes.questID = questType;
		yield WaitForSeconds (0.2);
		gameRes.showBriefing = true;
	}
}

function QuestTourist(){

	// Von einem Ort zum anderen Reisen und die Gäste transferieren. Dabei muss man 1-2 Zonen erreichen und gegen Strömungen ankämpfen/Ausweichen.

	if(questStarted == false){
		print("Tourist-Quest started!");
		//randomvalue = Random.value;
		//print(randomvalue);
		questType = "quest-tourist";
		gameRes.questID = questType;
		yield WaitForSeconds (0.2);
		gameRes.showBriefing = true;
		
		questStarted = true;
		
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

function QuestTourist2(){

	if(questStarted == false){
		print("Tourist-Quest2 started!");
		questType = "quest-tourist2";
		gameRes.questID = questType;
		yield WaitForSeconds (0.2);
		gameRes.showBriefing = true;
		
		questStarted = true;
		
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
		questType = "quest-debug";
		gameRes.questID = questType;
		yield WaitForSeconds (0.2);
		gameRes.showBriefing = true;
	}	
}



	
	