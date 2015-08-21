#pragma strict

var ship : Transform;
var shipObj : GameObject;
var questGiverenabled = false;
var questGiverenabledMat : Material;
var questGiverdisabledMat : Material;
var gameResObj : GameObject;
var questFunc : QuestFunc;

var questID : String;



function Start () {

	questID = gameObject.tag;
	shipObj = GameObject.FindWithTag("ship");
	
	ship = shipObj.transform;
	
	gameResObj = GameObject.FindWithTag("GameRes");
	questFunc = gameResObj.GetComponent(QuestFunc);
	
	//print(questID);	
}


function Update () {

	var distance = Vector3.Distance(ship.position, transform.position);
	//print(distance);
	
	if(distance < 2){
		GetComponent.<Renderer>().material = questGiverenabledMat;
		questGiverenabled = true;
	}else{
		GetComponent.<Renderer>().material = questGiverdisabledMat;
		questGiverenabled = false;
	}
	
	if(Input.GetKeyDown("space") && questGiverenabled == true){
	
		questID = gameObject.tag;
	
		if(questID == "quest-rich"){
			questFunc.QuestRich();
		}
		if(questID == "quest-rich2"){
			questFunc.QuestRich2();
		}
		if(questID == "quest-youth"){
			questFunc.QuestYouth();
		}
		if(questID == "quest-youth2"){
			questFunc.QuestYouth2();
		}
		if(questID == "quest-family"){
			questFunc.QuestFamily();
		}	
		if(questID == "quest-family2"){
			questFunc.QuestFamily2();
		}	
		if(questID == "quest-tourist"){
			questFunc.QuestTourist();
		}
		if(questID == "quest-tourist2"){
			questFunc.QuestTourist2();
		}
		if(questID == "quest-debug"){
			questFunc.QuestDebug();
		}
	}
}