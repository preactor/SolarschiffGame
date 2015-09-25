#pragma strict

var curTarget : GameObject;
var lookAtTrgt : Transform;
var shipObj : GameObject;
var ship : Transform;

var questFunc : QuestFunc;

var direction : Vector3;
var temp : Vector3;



function Start () {

	shipObj = GameObject.FindWithTag("ship");
	curTarget = GameObject.FindWithTag("quest-rich");
	
	//CurTarget has to be asked from QuestAssign in QuestFunc, which calculated which quest will be next.

}

function Update () {

	lookAtTrgt = curTarget.GetComponent(Transform);
	ship = shipObj.GetComponent(Transform);
	
	temp.z = ship.position.z;
	temp.y = ship.position.y + 3;
	temp.x = ship.position.x;

	transform.LookAt(lookAtTrgt);
	transform.eulerAngles.x = 0;
	transform.eulerAngles.z = 0;
	
	direction = 30*Vector3.Normalize(lookAtTrgt.position - temp);
	
	
	transform.position = direction + ship.position;
	transform.position.y = ship.position.y + 3;
	
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