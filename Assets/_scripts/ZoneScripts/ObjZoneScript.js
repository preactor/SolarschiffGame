#pragma strict
var questType : String;
var questFunc : QuestFunc;
var gameRes : GameRessources;
var questCompass : QuestCompass;
var questTourist : QuestTourist;

var finished = false;

var zoneChild : GameObject;
var childRenderers : Renderer[];
var zoneHit : boolean;

//Colors

var redColor : Color;
var greenColor : Color;


function Start () {

	questFunc = GameObject.FindWithTag("GameRes").GetComponent(QuestFunc);
	gameRes = GameObject.FindWithTag("GameRes").GetComponent(GameRessources);
	questCompass = GameObject.FindWithTag("questCompass").GetComponent(QuestCompass);
	questTourist = GameObject.FindWithTag("QuestTourist").GetComponent(QuestTourist);
	
	questType = questFunc.questType;
	
	zoneHit = false;
	
	zoneChild = this.transform.Find("ZoneCircleFinal").gameObject;
	childRenderers = zoneChild.GetComponentsInChildren.<Renderer>();
	
	for(var children : Renderer in childRenderers){
		children.enabled = true;
		children.material.SetColor("_Color", redColor);
	}

}

function Update () {

	if(this.gameObject == questCompass.curTarget || zoneHit == true){
		for(var children : Renderer in childRenderers){
			children.enabled = true;
		}
	}

	if(questFunc.destroyObjectiveZones == true){
		Destroy(this.gameObject);
	}
}

function OnTriggerEnter ( col : Collider ){

	if(col.tag == "ship" && this.gameObject == questCompass.curTarget){
		for(var children : Renderer in childRenderers){
			children.enabled = true;
			children.material.SetColor("_Color", greenColor);
		}
		zoneHit = true;
		questTourist.nextZone();
	}
	if(col.tag == "ship" && this.gameObject.tag == "ObjZone8" ){
		questTourist.EndQuest();
	}
}