#pragma strict

// A very simplistic car driving on the x-z plane.

var accel : float = 60;
var accelfriction : float = 0.99;
var rotationSpeed : float = 10;
var rotfriction : float = 0.5;


var questGiver : QuestGiver;
var questFunc : QuestFunc;
var compass : arrowCompass;
var gameRes : GameRessources;

var shipPos : Vector3;
var shipVelocity : float;
var motor : float;

var turbo : int;

var moveJoystick : Joystick;
var rotateJoystick : Joystick;



function Start () {

	turbo = 1;

}

//TUTORIAL: http://www.raywenderlich.com/25349/how-to-get-started-with-unity-part-23

function joyStickInput (joystick : Joystick){

	var absJoyPos = Vector2 (Mathf.Abs(joystick.position.x), Mathf.Abs(joystick.position.y));
	var xDirection = (joystick.position.x > 0) ? 1 : -1;
	var yDirection = (joystick.position.y > 0) ? 1 : -1;
	return ((absJoyPos.x > absJoyPos.y) ? absJoyPos.x * xDirection : absJoyPos.y * yDirection);
}



function FixedUpdate () {
	// Get the horizontal and vertical axis.
	// By default they are mapped to the arrow keys.
	// The value is in the range -1 to 1
	
	
	//var translation : float = Input.GetAxis ("Vertical") ? Input.GetAxis ("Vertical") : joyStickInput(moveJoystick);
	//var rotation : float = Input.GetAxis ("Horizontal") ? Input.GetAxis ("Horizontal") : joyStickInput(moveJoystick);
	//var translation : float = joyStickInput(moveJoystick);
	//var rotation : float = joyStickInput(rotateJoystick);
	//var translation : float = Input.GetAxis ("Vertical");
	//var rotation : float = Input.GetAxis ("Horizontal");
	
	//translation = translation * accel;
	//rotation = rotation * rotationSpeed;
	
	//BACKUP//
	var translation : float = Input.GetAxis ("Vertical") * accel;
	var rotation : float = Input.GetAxis ("Horizontal") * rotationSpeed;
		
	// Make it move 10 meters per second instead of 10 meters per frame...
	translation *= Time.deltaTime;
	rotation *= Time.deltaTime;
	
	if(translation < 0){
		motor = 0.25*turbo;
	}else{
		motor = 1*turbo;
	}
	
	//Obsolete because too static:
		// Move translation along the object's z-axis
		//transform.Translate (0, 0, translation);
		// Rotate around our y-axis
		//transform.Rotate (0, rotation, 0);
		
	GetComponent.<Rigidbody>().AddRelativeForce (Vector3(0,0,motor*translation));
	GetComponent.<Rigidbody>().AddRelativeTorque (Vector3(0,rotation*2,0 ));
	//print (translation);
	
	GetComponent.<Rigidbody>().velocity *= accelfriction;
	GetComponent.<Rigidbody>().angularVelocity *= rotfriction;
	
	transform.position.y = 0.91;
	transform.eulerAngles.x = 0;
	transform.eulerAngles.z = 0;
	
	shipPos = transform.position;
	shipVelocity = transform.InverseTransformDirection(GetComponent.<Rigidbody>().velocity).z;
	//print(shipVelocity);

}

function OnTriggerEnter ( col : Collider ){

	if (col.tag == "zone" && questFunc.questStarted == true){	
		compass.colChecker = true;
		compass.nextTarget();
	}
	if (col.tag == "ziel" && compass.passedLastZone == true && gameRes.timeLeft < 0){
		//questResultTxt = "You've Done IT!!!";	
		print("You've Done IT!!!");
		gameRes.questStatusTxt = "You've done it! Your guests praise your skills!";
		questFunc.questStarted = false;
		compass.passedLastZone = false;
		compass.Disabled();	
		yield WaitForSeconds (5);
		if (questFunc.questStarted == false){
			gameRes.questStatusTxt = "No quest active";
			questFunc.questType = "None";
		}
	}	
	if (col.tag == "ziel" && compass.passedLastZone == true && gameRes.timeLeft > 0){		
		//questResultTxt = "You failed! Your guests leave unhappy.";
		print("You failed! Your guests leave unhappy.");
		gameRes.questStatusTxt = "You failed! Your guests leave unhappy.";
		questFunc.questStarted = false;
		compass.passedLastZone = false;	
		compass.Disabled();
		yield WaitForSeconds (5);
		if (questFunc.questStarted == false){
			gameRes.questStatusTxt = "No quest active";
			questFunc.questType = "None";
		}
	}
}