#pragma strict

//============//
//PUBLIC SHIPS//
//============//

var playerShipObj : GameObject;
var playerShip : Transform;

var blsSpwn : GameObject;
var speedBoatSpwn : GameObject;
var blsShip : GameObject;
var blsNeedsRespawn : boolean;
var blsShipExists : boolean;
var speedBoat : GameObject;
var speedBoatNeedsRespawn : boolean;
var speedBoatExists : boolean;

var solarSpawner : GameObject;
var solarPivotObj : GameObject[];
var solarPwrSpwnr : GameObject;
var randomPos : Vector3;
var boxCount : int;

function Start () {

	playerShipObj = GameObject.FindWithTag("ship");
	playerShip = playerShipObj.transform;

	//==============SolarSpawns================//
	//=========================================//

	solarPivotObj = gameObject.FindGameObjectsWithTag("solarPivotBox");
	print(solarPivotObj);
	boxCount = solarPivotObj.length;
	//print(boxCount);
	for(var i = 0; i < boxCount; i++){
		randomPos = Vector3(solarPivotObj[i].transform.position.x+(Random.Range(-2.5, 2.5)),solarPivotObj[i].transform.position.y,solarPivotObj[i].transform.position.z+(Random.Range(-2.5, 2.5)));
		Instantiate(solarPwrSpwnr,randomPos, transform.rotation);
	}
	
	//==============BoatSpawns=================//
	//=========================================//
	
	blsSpwn = GameObject.Find("BLS_wp_8");
	Instantiate(blsShip, blsSpwn.transform.position, transform.rotation);
	blsShipExists = true;
	blsNeedsRespawn = false;
	speedBoatSpwn = GameObject.FindGameObjectWithTag("SPBoatwpLAST");
	Instantiate(speedBoat, speedBoatSpwn.transform.position, transform.rotation);
	speedBoatExists = true;
	speedBoatNeedsRespawn = false;
}


function Update () {
	
	if(blsNeedsRespawn == true && blsShipExists == false){
		SpawnBLSShip();
	}
	if(speedBoatNeedsRespawn == true && speedBoatExists == false){
		SpawnSpeedBoat();
	}
}



function SpawnBLSShip(){
	blsNeedsRespawn = false;
	var distance = Vector3.Distance(playerShip.position, blsSpwn.transform.position);
	if(distance > 10){
		Instantiate(blsShip, blsSpwn.transform.position, transform.rotation);
		blsShipExists = true;
	}else{
		RetrySpawnBLS();	
	}	
}
function RetrySpawnBLS(){
	yield WaitForSeconds(5);
	SpawnBLSShip();
}

function SpawnSpeedBoat(){
	speedBoatNeedsRespawn = false;
	var distance = Vector3.Distance(playerShip.position, speedBoatSpwn.transform.position);
	if(distance > 10){
		Instantiate(speedBoat, speedBoatSpwn.transform.position, transform.rotation);
		speedBoatExists = true;
	}else{
		RetrySpawnSB();
	}
}
function RetrySpawnSB(){
	yield WaitForSeconds(5);
	SpawnSpeedBoat();
}