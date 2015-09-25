#pragma strict

var curTarget : GameObject;
var curTargetScreenPos : Vector2;

var lookAtTrgt : Transform;
var shipObj : GameObject;
var ship : Transform;
var gameResObj : GameObject;
var questFunc : QuestFunc;
var emptyTarget : GameObject;

var mainCam : Camera;
var schiffScreenPos : Vector2;
var triangle90Pos : Vector2;
var compassAngle : float;
var angleSin : float;


function Start () {

	mainCam = GameObject.FindWithTag("MainCamera").GetComponent(Camera);
	gameResObj = GameObject.FindWithTag("GameRes");
	questFunc = gameResObj.GetComponent(QuestFunc);
	
	shipObj = GameObject.FindWithTag("ship");
	
	emptyTarget = GameObject.FindWithTag("emptyTarget");
	curTarget = emptyTarget;
	
	//print(shipCompass.transform.position);
	
	//curTarget = questFunc.newQuestTarget;
	//CurTarget has to be asked from QuestAssign in QuestFunc, which calculated which quest will be next.
}


function Update () {

	ship = shipObj.GetComponent(Transform);
	
	schiffScreenPos = mainCam.WorldToScreenPoint(ship.transform.position);
	curTargetScreenPos = mainCam.WorldToScreenPoint(curTarget.transform.position);

	//===========================================
	//OK FUCKIT, LETS DO IT MANUAL
	//===========================================
	
	//Um das Rechtwinklige Dreieck für die Winkelberechnung zu kriegen brauchen wir den dritten Punkt neben Target und Ship
	triangle90Pos = Vector2(curTargetScreenPos.x, schiffScreenPos.y);
	
	//SinusBerechnung
	
	angleSin = Vector2.Distance(triangle90Pos, curTargetScreenPos)/Vector2.Distance(schiffScreenPos, curTargetScreenPos);
	compassAngle = Mathf.Asin(angleSin) * Mathf.Rad2Deg;
	
	//Ship is lower left
	if(schiffScreenPos.x < curTargetScreenPos.x && schiffScreenPos.y < curTargetScreenPos.y){
		this.transform.eulerAngles.z = compassAngle;
	}
	//Ship is lower right
	if(schiffScreenPos.x > curTargetScreenPos.x && schiffScreenPos.y < curTargetScreenPos.y){
		this.transform.eulerAngles.z = (90-compassAngle)+90;
	}
	//Ship is upper right
	if(schiffScreenPos.x > curTargetScreenPos.x && schiffScreenPos.y > curTargetScreenPos.y){
		this.transform.eulerAngles.z = compassAngle+180;
	}
	//Ship is upper left
	if(schiffScreenPos.x < curTargetScreenPos.x && schiffScreenPos.y > curTargetScreenPos.y){
		this.transform.eulerAngles.z = (90-compassAngle)+270;
	}
		//print(Vector2.Distance(schiffScreenPos, curTargetScreenPos));
		//print(compassAngle);
	
	
	if(curTarget == emptyTarget){
		this.GetComponent.<UI.Image>().enabled = false;
	}else{
		this.GetComponent.<UI.Image>().enabled = true;
	}
}



function Disabled(){

	this.GetComponent.<UI.Image>().enabled = false;
	yield WaitForSeconds(8);
	questFunc.AssignQuest();

}

function Enabled(){
	
	//first asks which buoy has been defined in questFunc.AssignQuest()
	this.GetComponent.<UI.Image>().enabled = true;

}