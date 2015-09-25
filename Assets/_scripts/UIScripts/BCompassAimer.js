#pragma strict

var curTarget : GameObject;
var curTargetScreenPos : Vector2;

var lookAtTrgt : Transform;
var bCompass : GameObject;
var gameResObj : GameObject;
var questFunc : QuestFunc;
var emptyTarget : GameObject;

var mainCam : Camera;
var bCompassScreenPos : Vector2;
var triangle90Pos : Vector2;
var compassAngle : float;
var angleSin : float;


function Start () {

	mainCam = GameObject.FindWithTag("MainCamera").GetComponent(Camera);
	gameResObj = GameObject.FindWithTag("GameRes");
	questFunc = gameResObj.GetComponent(QuestFunc);
	
	bCompass = GameObject.FindWithTag("bubbleCompass");
	
	emptyTarget = GameObject.FindWithTag("emptyTarget");
	curTarget = emptyTarget;
	
	//print(shipCompass.transform.position);
	
	//curTarget = questFunc.newQuestTarget;
	//CurTarget has to be asked from QuestAssign in QuestFunc, which calculated which quest will be next.
}


function Update () {
	
	bCompassScreenPos = Vector2(bCompass.transform.position.x, bCompass.transform.position.y);
	
	curTargetScreenPos = mainCam.WorldToScreenPoint(curTarget.transform.position);

	//===========================================
	//OK FUCKIT, LETS DO IT MANUAL
	//===========================================
	
	//Um das Rechtwinklige Dreieck für die Winkelberechnung zu kriegen brauchen wir den dritten Punkt neben Target und bCompass
	triangle90Pos = Vector2(curTargetScreenPos.x, bCompassScreenPos.y);
	
	//SinusBerechnung
	
	angleSin = Vector2.Distance(triangle90Pos, curTargetScreenPos)/Vector2.Distance(bCompassScreenPos, curTargetScreenPos);
	compassAngle = Mathf.Asin(angleSin) * Mathf.Rad2Deg;
	
	//bCompass is lower left
	if(bCompassScreenPos.x < curTargetScreenPos.x && bCompassScreenPos.y < curTargetScreenPos.y){
		this.transform.eulerAngles.z = compassAngle;
	}
	//bCompass is lower right
	if(bCompassScreenPos.x > curTargetScreenPos.x && bCompassScreenPos.y < curTargetScreenPos.y){
		this.transform.eulerAngles.z = (90-compassAngle)+90;
	}
	//bCompass is upper right
	if(bCompassScreenPos.x > curTargetScreenPos.x && bCompassScreenPos.y > curTargetScreenPos.y){
		this.transform.eulerAngles.z = compassAngle+180;
	}
	//bCompass is upper left
	if(bCompassScreenPos.x < curTargetScreenPos.x && bCompassScreenPos.y > curTargetScreenPos.y){
		this.transform.eulerAngles.z = (90-compassAngle)+270;
	}
		//print(Vector2.Distance(bCompassScreenPos, curTargetScreenPos));
		//print(compassAngle);
	
}