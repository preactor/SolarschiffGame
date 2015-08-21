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
private var rotationDamping = 0.5;
var speed : float;
var accel : float;
var accelfriction : float;

var BLSwp1 : GameObject;
var BLSwp2 : GameObject;
var BLSwp3 : GameObject;
var BLSwp4 : GameObject;
var BLSwp5 : GameObject;
var BLSwp6 : GameObject;
var BLSwp7 : GameObject;
var BLSwp8 : GameObject;

function Start () {


	playerShipObj = GameObject.FindWithTag("ship");
	playerShip = playerShipObj.transform;
	
	worldEventsScript = GameObject.FindGameObjectWithTag("GameRes").GetComponent(WorldEvents);
	tryrespawn = false;
	
	state = 0;
	myPos = transform;
	BLSwp1 = gameObject.Find("BLS_wp_1");
	BLSwp2 = gameObject.Find("BLS_wp_2");
	BLSwp3 = gameObject.Find("BLS_wp_3");
	BLSwp4 = gameObject.Find("BLS_wp_4");
	BLSwp5 = gameObject.Find("BLS_wp_5");
	BLSwp6 = gameObject.Find("BLS_wp_6");
	BLSwp7 = gameObject.Find("BLS_wp_7");
	BLSwp8 = gameObject.Find("BLS_wp_8");
	
	waypoints[0] = BLSwp1.transform;
	waypoints[1] = BLSwp2.transform;
	waypoints[2] = BLSwp3.transform;
	waypoints[3] = BLSwp4.transform;
	waypoints[4] = BLSwp5.transform;
	waypoints[5] = BLSwp6.transform;
	waypoints[6] = BLSwp7.transform;
	waypoints[7] = BLSwp8.transform;
	
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
	
	spwnedWaveRScript.origShipVel = shipVel - 2.55;
	spwnedWaveLScript.origShipVel = shipVel - 2.55;
	
	spwnedWaveRScript.waveTravelSpd = 45;
	spwnedWaveLScript.waveTravelSpd = 45;
	
	yield WaitForSeconds(0.4);
	waveTimer = true;
}

function drive(){

	var rotation = Quaternion.LookRotation(waypoints[currentWaypoint].position - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * rotationDamping);
	
	var waypointDirection : Vector3 = waypoints[currentWaypoint].position - transform.position;
	
	//====================TranslationMethodofDrive=====================//
	//var speedFactor = Vector3.Dot(waypointDirection.normalized, transform.forward);
	//print(speedFactor);
	//speed = accel * speedFactor;
	//transform.Translate (0,0,Time.deltaTime * speed);
	//=================================================================//
	
	
	//=================RigidBodyForceMethodofDrive=====================//
	accel = 30;
	var motor : float = 0.975;
	var speedFactor = Vector3.Dot(waypointDirection.normalized, transform.forward);
	var translation : float = speedFactor * accel;
	accelfriction = 0.995;
	
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
	
	worldEventsScript.blsNeedsRespawn = true;
	var distance = Vector3.Distance(playerShip.position, transform.position);
	if(distance > 10){
		worldEventsScript.blsShipExists = false;
		Destroy(gameObject);
	}
}

function OnTriggerEnter (col : Collider){

	if (col.tag == "BLSwp" && col.transform == waypoints[currentWaypoint]){
		//print("COLLIDED!");
		currentWaypoint++;
	}
	if (col.tag == "BLSwpPause" && col.transform == waypoints[currentWaypoint]){
		//print("COLLIDED!");
		state = 1;
		yield WaitForSeconds(5);
		currentWaypoint++;
	}
	if(col.tag == "BLSwpLAST" && col.transform == waypoints[currentWaypoint]){	
		currentWaypoint = 0;
	}
}


