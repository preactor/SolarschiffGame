#pragma strict

var red : Material;
var green : Material;

var questType : String;
var questFunc : QuestFunc;
var gameRes : GameRessources;
var questCompass : QuestCompass;
var questTourist : QuestTourist;

var finished = false;


function Start () {

	questFunc = GameObject.FindWithTag("GameRes").GetComponent(QuestFunc);
	gameRes = GameObject.FindWithTag("GameRes").GetComponent(GameRessources);
	questCompass = GameObject.FindWithTag("questCompass").GetComponent(QuestCompass);
	questTourist = GameObject.FindWithTag("QuestTourist").GetComponent(QuestTourist);
	
	questType = questFunc.questType;
	
	this.GetComponent.<Renderer>().enabled = false;
	this.GetComponent.<Renderer>().material = red;

}

function Update () {

	if(this.gameObject == questCompass.curTarget || this.GetComponent.<Renderer>().material == green){
		this.GetComponent.<Renderer>().enabled = true;
	}

	if(questTourist.destroyZones == true){
		Destroy(this.gameObject);
	}
}

function OnTriggerEnter ( col : Collider ){

	if(col.tag == "ship" && this.gameObject == questCompass.curTarget){
		this.GetComponent.<Renderer>().material = green;
		questTourist.nextZone();
	}
	if(col.tag == "ship" && this.gameObject.tag == "ObjZone8" ){
		questTourist.EndQuest();
	}
}