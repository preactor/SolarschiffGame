#pragma strict

var curTarget : GameObject;
var lookAtTrgt : Transform;
var ship : Transform;
var zone1 : GameObject;
var zone2 : GameObject;
var zone3 : GameObject;
var zone4 : GameObject;
var zone5 : GameObject;
var buoy : GameObject;

var questFunc : QuestFunc;

var nxtTarget = 1;
var colChecker = false;
var red : Material;
var green : Material;
var passedLastZone = false;

function Start () {

zone1.GetComponent.<Renderer>().enabled = false;
zone2.GetComponent.<Renderer>().enabled = false;
zone3.GetComponent.<Renderer>().enabled = false;
zone4.GetComponent.<Renderer>().enabled = false;
zone5.GetComponent.<Renderer>().enabled = false;

}


function Update () {

	lookAtTrgt = curTarget.GetComponent(Transform);

	transform.LookAt(lookAtTrgt);
	transform.eulerAngles.x = 0;
	transform.eulerAngles.z = 0;
	
	transform.position.z = ship.position.z;
	transform.position.y = ship.position.y + 3;
	transform.position.x = ship.position.x;
	
	if (questFunc.questStarted == false){	
		zone1.GetComponent.<Renderer>().material = red;
		zone2.GetComponent.<Renderer>().material = red;
		zone3.GetComponent.<Renderer>().material = red;
		zone4.GetComponent.<Renderer>().material = red;
		zone5.GetComponent.<Renderer>().material = red;
		zone1.GetComponent.<Renderer>().enabled = false;
		zone2.GetComponent.<Renderer>().enabled = false;
		zone3.GetComponent.<Renderer>().enabled = false;
		zone4.GetComponent.<Renderer>().enabled = false;
		zone5.GetComponent.<Renderer>().enabled = false;
	}

}



function nextTarget(){

	if(nxtTarget == 1 && colChecker == true){
		zone1.GetComponent.<Renderer>().enabled = true;
		curTarget = zone1;
		if (curTarget == buoy){
			nxtTarget = 1;
		}else{
			nxtTarget++;
		}
		colChecker = false;	
	}
	if(nxtTarget == 2 && colChecker == true){
		zone1.GetComponent.<Renderer>().material = green;
		zone2.GetComponent.<Renderer>().enabled = true;
		curTarget = zone2;
		if (curTarget == buoy){
			nxtTarget = 1;
		}else{
			nxtTarget++;
		}
		colChecker = false;
	}
	if(nxtTarget == 3 && colChecker == true){
		zone2.GetComponent.<Renderer>().material = green;
		zone3.GetComponent.<Renderer>().enabled = true;
		curTarget = zone3;
		if (curTarget == buoy){
			nxtTarget = 1;
		}else{
			nxtTarget++;
		}
		colChecker = false;
	}
	if(nxtTarget == 4 && colChecker == true){
		zone3.GetComponent.<Renderer>().material = green;
		zone4.GetComponent.<Renderer>().enabled = true;
		curTarget = zone4;
		if (curTarget == buoy){
			nxtTarget = 1;
		}else{
			nxtTarget++;
		}
		colChecker = false;
	}
	if(nxtTarget == 5 && colChecker == true){
		zone4.GetComponent.<Renderer>().material = green;
		zone5.GetComponent.<Renderer>().enabled = true;
		curTarget = zone5;
		passedLastZone = true;
		if (curTarget == buoy){
			nxtTarget = 1;
		}else{
			nxtTarget++;
		}
		colChecker = false;
	}
	if(nxtTarget == 6 && colChecker == true){
		zone5.GetComponent.<Renderer>().material = green;
		curTarget = buoy;
		if (curTarget == buoy){
			nxtTarget = 1;
		}else{
			nxtTarget++;
		}
		colChecker = false;
	}
	
}

function Disabled(){

	this.GetComponent.<Renderer>().enabled = false;
	yield WaitForSeconds(8);
	questFunc.AssignQuest();

}

function Enabled(){
	
	//first asks which buoy has been defined in questFunc.AssignQuest()
	curTarget = buoy;
	this.GetComponent.<Renderer>().enabled = true;

}