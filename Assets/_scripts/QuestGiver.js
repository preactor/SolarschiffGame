#pragma strict

var ship : Transform;
var shipObj : GameObject;
var shipControl : ShipTest;
var questGiverenabled = false;
var gameResObj : GameObject;
var questFunc : QuestFunc;

var questID : String;
var hikers : GameObject;
var youth : GameObject;
var rich : GameObject;
var family : GameObject;

var childRenderers : Renderer[];

var redColor : Color;
var greenColor : Color;


function Start () {

	questID = gameObject.tag;
	shipObj = GameObject.FindWithTag("ship");
	shipControl = shipObj.GetComponent(ShipTest);
	ship = shipObj.transform;
	
	gameResObj = GameObject.FindWithTag("GameRes");
	questFunc = gameResObj.GetComponent(QuestFunc);
	
	if(questID == "quest-rich"){
		rich.SetActive(true);
	}
	if(questID == "quest-youth"){
		youth.SetActive(true);
	}
	if(questID == "quest-family"){
		family.SetActive(true);
	}	
	if(questID == "quest-tourist"){
		hikers.SetActive(true);
	}
	
	childRenderers = this.transform.FindChild("ZoneCircleFinal").gameObject.GetComponentsInChildren.<Renderer>();
	for(var children : Renderer in childRenderers){
		children.material.SetColor("_Color", redColor);
	}
	
	//print(questID);	
	
}


function Update () {

	var distance = Vector3.Distance(ship.position, transform.position);
	//print(distance);
	
	if(distance < 2){
		for(var children : Renderer in childRenderers){
			children.material.SetColor("_Color", greenColor);
		}
		questGiverenabled = true;
	}else{
		for(var children : Renderer in childRenderers){
			children.material.SetColor("_Color", redColor);
		}
		questGiverenabled = false;
	}
	
	if(shipControl.shipVelocity < 0.05 && questGiverenabled == true){
	
		questID = gameObject.tag;
	
		if(questID == "quest-rich"){
			questFunc.QuestRich();
		}
		if(questID == "quest-youth"){
			questFunc.QuestYouth();
		}
		if(questID == "quest-family"){
			questFunc.QuestFamily();
		}	
		if(questID == "quest-tourist"){
			questFunc.QuestTourist();
		}
		if(questID == "quest-debug"){
			questFunc.QuestDebug();
		}
	}
}