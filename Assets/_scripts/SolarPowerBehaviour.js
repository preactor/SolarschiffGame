#pragma strict

var ship : Transform;
var shipObj : GameObject;
var gameRessObj: GameObject;
var gameRessources : GameRessources;

var frameCountMax : int;
var frameCounter : int;

var mainCam : GameObject;

var sfMat1 : Material;
var sfMat2 : Material;
var sfMat3 : Material;

var yAxisVal : float;


function Start () {

	shipObj = GameObject.FindWithTag("ship");
	ship = shipObj.transform;
	gameRessObj = GameObject.FindWithTag("GameRes");
	mainCam = GameObject.FindWithTag("MainCamera");
	gameRessources = gameRessObj.GetComponent(GameRessources);
	
	frameCountMax = Random.Range(30, 60);
	frameCounter = 0;
	
	var rVal : int;
	rVal = Random.Range(1, 3);
	if(rVal == 1){
		this.GetComponent.<Renderer>().material = sfMat1;
	}
	else if(rVal == 2){
		this.GetComponent.<Renderer>().material = sfMat2;
	}
	else if(rVal == 3){
		this.GetComponent.<Renderer>().material = sfMat3;
	}
	
	yAxisVal = this.transform.position.y;

}
	

function Update () {

	var shipDistance = Vector3.Distance(ship.position, transform.position);
	//var shipDirection = ship.position - transform.position;
	var shipDirection = Vector3.Normalize(ship.position - transform.position);
	var distspeed = (1/shipDistance)*2;
	
	if(shipDistance < 3){
		transform.Translate((shipDirection*distspeed) * Time.deltaTime);
		//RigidBodySettings : Mass 0.2, Drag 1.65
		//rigidbody.AddRelativeForce (shipDirection);
		//print("shipisclose");
	}
	
	//Billboarding
	transform.LookAt(transform.position + mainCam.transform.rotation * Vector3.forward, mainCam.transform.rotation * Vector3.up);
	
	//framerate-dependent solar-flares - Probably far from the best Solution -> Try to make it Time.deltaTime dependent
	while( frameCounter < frameCountMax){
		frameCounter++;
	}
	if( frameCounter == frameCountMax){
		this.gameObject.transform.localScale = Vector3(Random.Range(0.5, 0.8), Random.Range(0.5, 0.8), Random.Range(0.5, 0.8));
		frameCountMax = Random.Range(30, 60);
		frameCounter = 0;
	}
	
	//Wegenwas auch immer scheint der solarflare manchmal unter die wasseroberfläche abzusinken 
	//- Als Gegenmassnahme, wenn auch unschön gelöst, will ich die y-Achse locken.
	
	this.transform.position.y = yAxisVal;
	

}

function OnTriggerEnter ( solarCol : Collider ){
	if (solarCol.tag == "ship"){
		yield WaitForSeconds(0.2);
		gameRessources.solarPower = gameRessources.solarPower + 0.25;
		Destroy(this.gameObject);
	}
}