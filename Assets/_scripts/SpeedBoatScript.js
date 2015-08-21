#pragma strict

var WaveSpwnL : Transform;
var WaveSpwnR : Transform;
var Wave : GameObject;
var waveTimer = true;

var waveSize = 0.5;

var spwnedWaveL : GameObject;
var spwnedWaveR : GameObject;
var spwnedWaveRScript : WaveScript;
var spwnedWaveLScript : WaveScript;

var shipVel : float;
var playerShipObj : GameObject;
var playerShip : Transform;

var worldEventsScript : WorldEvents;
var tryrespawn : boolean;

//Pathfinding Algorythm from Unity Blueprints 3//
//=============================================//

private var state = 0;
var waypoints : Transform[];
private var activeWaypoint : Transform;
var currentWaypoint = 0;


private var myPos : Transform;
private var currentSpeed = 0.0;
//private var accel = 2.3;
private var rotationDamping = 0.9;
var speed : float;
var accel : float;
var accelfriction : float;

var SBwp1 : GameObject;
var SBwp2 : GameObject;
var SBwp3 : GameObject;
var SBwp4 : GameObject;
var SBwp5 : GameObject;
var SBwp6 : GameObject;
var SBwp7 : GameObject;


function Start () {

	playerShipObj = GameObject.FindWithTag("ship");
	playerShip = playerShipObj.transform;
	
	worldEventsScript = GameObject.FindGameObjectWithTag("GameRes").GetComponent(WorldEvents);
	tryrespawn = false;
	
	state = 0;
	myPos = transform;
	SBwp1 = gameObject.Find("SPBoat_wp_1");
	SBwp2 = gameObject.Find("SPBoat_wp_2");
	SBwp3 = gameObject.Find("SPBoat_wp_3");
	SBwp4 = gameObject.Find("SPBoat_wp_4");
	SBwp5 = gameObject.Find("SPBoat_wp_5");
	SBwp6 = gameObject.Find("SPBoat_wp_6");
	SBwp7 = gameObject.Find("SPBoat_wp_7");
	
	waypoints[0] = SBwp1.transform;
	waypoints[1] = SBwp2.transform;
	waypoints[2] = SBwp3.transform;
	waypoints[3] = SBwp4.transform;
	waypoints[4] = SBwp5.transform;
	waypoints[5] = SBwp6.transform;
	waypoints[6] = SBwp7.transform;

}

function FixedUpdate () {

	if(waveTimer == true){
		SpawnWave();
	}

	if(state == 0){
		drive();
		activeWaypoint = waypoints[currentWaypoint];
	}
	if(state == 1){
		pause();
	}
	
	//print(activeWaypoint.position);
	shipVel = transform.InverseTransformDirection(GetComponent.<Rigidbody>().velocity).z;
	Debug.DrawLine(myPos.position, activeWaypoint.position,Color.red);
	//print(shipVel);
	
	if(tryrespawn == true){
	 	initRespawn();
	}	
}

function SpawnWave(){

	waveTimer = false;
	spwnedWaveL = Instantiate(Wave, WaveSpwnL.position, WaveSpwnL.rotation);
	spwnedWaveR = Instantiate(Wave, WaveSpwnR.position, WaveSpwnR.rotation);
	
	spwnedWaveRScript = spwnedWaveR.GetComponent(WaveScript);
	spwnedWaveLScript = spwnedWaveL.GetComponent(WaveScript);
	
	spwnedWaveRScript.origShipVel = shipVel - 3.6;
	spwnedWaveLScript.origShipVel = shipVel - 3.6;
	
	spwnedWaveRScript.waveTravelSpd = 35;
	spwnedWaveLScript.waveTravelSpd = 35;
	
	yield WaitForSeconds(0.2);
	waveTimer = true;
}

function drive(){

	var rotation = Quaternion.LookRotation(waypoints[currentWaypoint].position - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * rotationDamping);
	
	var waypointDirection : Vector3 = waypoints[currentWaypoint].position - transform.position;

	//=================RigidBodyForceMethodofDrive=====================//
	accel = 50;
	var motor : float = 0.975;
	var speedFactor = Vector3.Dot(waypointDirection.normalized, transform.forward);
	var translation : float = speedFactor * accel;
	accelfriction = 0.993;
	
	// Make it move 10 meters per second instead of 10 meters per frame...
	translation *= Time.deltaTime;
	GetComponent.<Rigidbody>().AddRelativeForce (Vector3(0,0,motor*translation));
	//print (translation);
	GetComponent.<Rigidbody>().velocity *= accelfriction;
}

function pause(){
	accel = 0;
	accelfriction = 0.965;
	for(var i = 0; i < 20; i++){
		GetComponent.<Rigidbody>().velocity *= accelfriction;
	}
	yield WaitForSeconds(5);
	state = 0;
}

function initRespawn(){
	
	worldEventsScript.speedBoatNeedsRespawn = true;
	var distance = Vector3.Distance(playerShip.position, transform.position);
	if(distance > 10){
		worldEventsScript.speedBoatExists = false;
		Destroy(gameObject);
	}
}

function OnTriggerEnter (col : Collider){

	if (col.tag == "SPBoatwp" && col.transform == waypoints[currentWaypoint]){
		//print("COLLIDED!");
		currentWaypoint++;
	}
	if (col.tag == "SPBoatwpPause" && col.transform == waypoints[currentWaypoint]){
		//print("COLLIDED!");
		state = 1;
		yield WaitForSeconds(5);
		currentWaypoint++;
	}
	if(col.tag == "SPBoatwpLAST" && col.transform == waypoints[currentWaypoint]){	
		currentWaypoint = 0;
	}
}