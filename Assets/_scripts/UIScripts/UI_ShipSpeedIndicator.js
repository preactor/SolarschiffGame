#pragma strict
var ship : ShipTest;


function Start () {

	ship = GameObject.FindWithTag("ship").GetComponent(ShipTest);

}

function Update () {

	//ShipSpeedValues:  0 - 1 - 2 - 3 - 4 - 5
	//NeedleAngles Z :  10                 170 | -10
	//NeedleAngles Z : 	0 - 32- 64- 96-128-160 | x = 32
	//ShipSpeedValues:  5 - 4 - 3 - 2 - 1 - 0  | 5-ShipVel Umkehrung 

	this.gameObject.transform.eulerAngles.z = Mathf.Clamp(((5-ship.shipVelocity)*32)+10, 10, 170);

}