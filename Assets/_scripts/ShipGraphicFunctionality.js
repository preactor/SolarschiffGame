#pragma strict

var ShipDown : Material;
var ShipDownLeft : Material;
var ShipDownRight : Material;
var ShipLeft : Material;
var ShipRight : Material;
var ShipUp : Material;
var ShipUpLeft : Material;
var ShipUpRight : Material;

var shipTransform : Transform;

function Start () {
	

}

function Update () {

	transform.rotation = Quaternion.Euler(45,180,0);
	
	// To Display the graphics correctly (Y axis rotation):
	// 		looking up 	: 			0		(spezieller Fall: 337.5-360 UND 0-22.5 UND WENN Y=360, dann Y=0)
	// 		looking up-right : 		45		(22.5-67.5)
	// 		looking right : 		90		(67.5-112.5)
	// 		looking down-right : 	135		(112.5-157.5)
	// 		looking down : 			180		(157.5-202.5)
	// 		looking down-left : 	225		(202.5-247.5)
	// 		looking left : 			270		(247.5-292.5)
	// 		looking up-left : 		315		(292.5-337.5)
	
	//print(shipTransform.eulerAngles.y);
	
	if(shipTransform.eulerAngles.y > 22.5 && shipTransform.eulerAngles.y < 67.5){
		GetComponent.<Renderer>().material = ShipUpRight;
	}
	if(shipTransform.eulerAngles.y > 67.5 && shipTransform.eulerAngles.y < 112.5){
		GetComponent.<Renderer>().material = ShipRight;
	}
	if(shipTransform.eulerAngles.y > 112.5 && shipTransform.eulerAngles.y < 157.5){
		GetComponent.<Renderer>().material = ShipDownRight;
	}
	if(shipTransform.eulerAngles.y > 157.5 && shipTransform.eulerAngles.y < 202.5){
		GetComponent.<Renderer>().material = ShipDown;
	}
	if(shipTransform.eulerAngles.y > 202.5 && shipTransform.eulerAngles.y < 247.5){
		GetComponent.<Renderer>().material = ShipDownLeft;
	}
	if(shipTransform.eulerAngles.y > 247.5 && shipTransform.eulerAngles.y < 292.5){
		GetComponent.<Renderer>().material = ShipLeft;
	}
	if(shipTransform.eulerAngles.y > 292.5 && shipTransform.eulerAngles.y < 337.5){
		GetComponent.<Renderer>().material = ShipUpLeft;
	}
	if(shipTransform.eulerAngles.y > 337.5 && shipTransform.eulerAngles.y < 361){
		GetComponent.<Renderer>().material = ShipUp;
	}
	if(shipTransform.eulerAngles.y > -1 && shipTransform.eulerAngles.y < 22.5){
		GetComponent.<Renderer>().material = ShipUp;
	}

}