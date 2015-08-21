#pragma strict

var gameRes : GameRessources;
var playerShip : GameObject;
var playerShipTransform : Transform;
var waveTransform : Transform;
var dotAngle : float;
var effectfactor : float;

var waveSize : float;

var origShipVel : float;
var waveDuration : float; //-0.25 ca.
var waveTravelSpd : float;

var waveMat : Material;
var actheight : float;
var beforeheight : float;



//=============================================================//
	// Fade the color from red to green
	// back and forth over the defined duration

	//var colorStart : Color = Color.red;
	//var colorEnd : Color = Color.green;
	//var duration : float = 1.0;

	//function Update () {
	//	var lerp : float = Mathf.PingPong (Time.time, duration) / duration;
	//	renderer.material.color = Color.Lerp (colorStart, colorEnd, lerp);
	//}
//=============================================================//

function Start () {

	gameRes = GameObject.FindWithTag("GameRes").GetComponent(GameRessources);
	playerShip = GameObject.FindWithTag("ship");
	GetComponent.<Renderer>().material = waveMat;
	//renderer.material.color.a = 0.5;
	
	waveDuration = origShipVel;
	//print(waveDuration);
	
		this.GetComponent.<Rigidbody>().AddRelativeForce(Vector3(0,waveDuration,waveTravelSpd));
		

}

function Update () {

	
	if(this.transform.position.y < 0.55 || this.transform.position.y > 0.77){
		Destroy (gameObject);
	}
	
	//does not function, whyever//
	//==========================//
	//actheight = transform.position.y;
	//if(beforeheight == null){
	//	beforeheight = actheight;
	//}
	//if(beforeheight >= actheight){
	//	renderer.material.color.a = 0;
	//	actheight = beforeheight;
	//}
	//if(beforeheight < actheight){
	//	Destroy (gameObject);
	//}
	actheight = transform.position.y;
	//=====Scale a Value to be between 0 and 1======//
	GetComponent.<Renderer>().material.color.a = Mathf.InverseLerp(0.54,1.1,actheight);
	
	heightIncreaseCheck();
	
}

function heightIncreaseCheck(){

}

function OnTriggerEnter ( col : Collider ){

	if(col.tag == "ship"){
	
		waveTransform = this.gameObject.GetComponent(Transform);
		playerShipTransform = playerShip.GetComponent(Transform);
		//print("shipYrot: " + playerShipTransform.rotation.y);
		//print("waveYrot: " + waveTransform.rotation.y);	
		
		//dotAngle = Quaternion.Dot(playerShipTransform.rotation, waveTransform.rotation);
		
		dotAngle = Vector3.Dot(playerShipTransform.forward, waveTransform.forward);
		print(dotAngle);
		
		effectfactor = Mathf.Abs(dotAngle);
		
	}
	
	if(col.tag == "Land"){
		yield WaitForSeconds(2);
		Destroy(gameObject);
	}
}



