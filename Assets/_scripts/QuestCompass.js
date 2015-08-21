#pragma strict

var curTarget : GameObject;
var lookAtTrgt : Transform;
var shipObj : GameObject;
var ship : Transform;
var gameResObj : GameObject;
var questFunc : QuestFunc;
var emptyTarget : GameObject;


function Start () {


	gameResObj = GameObject.FindWithTag("GameRes");
	questFunc = gameResObj.GetComponent(QuestFunc);
	
	shipObj = GameObject.FindWithTag("ship");
	
	emptyTarget = GameObject.FindWithTag("emptyTarget");
	curTarget = emptyTarget;
	
	
	
	//curTarget = questFunc.newQuestTarget;
	
	//CurTarget has to be asked from QuestAssign in QuestFunc, which calculated which quest will be next.

}


function Update () {

	lookAtTrgt = curTarget.GetComponent(Transform);
	ship = shipObj.GetComponent(Transform);

	transform.LookAt(lookAtTrgt);
	transform.eulerAngles.x = 0;
	transform.eulerAngles.z = 0;
	
	transform.position.z = ship.position.z;
	transform.position.y = ship.position.y + 3;
	transform.position.x = ship.position.x;
	
	if(curTarget == emptyTarget){
		this.GetComponent.<Renderer>().enabled = false;
	}else{
		this.GetComponent.<Renderer>().enabled = true;
	}
	
}



function Disabled(){

	this.GetComponent.<Renderer>().enabled = false;
	yield WaitForSeconds(8);
	questFunc.AssignQuest();

}

function Enabled(){
	
	//first asks which buoy has been defined in questFunc.AssignQuest()
	this.GetComponent.<Renderer>().enabled = true;

}