#pragma strict

var gameRes : GameRessources;
var ship : GameObject;
var currentDir : Vector3 = Vector3(0,0,1);



function Start () {

	gameRes = GameObject.FindWithTag("GameRes").GetComponent(GameRessources);
	ship = GameObject.FindWithTag("ship");
}

function Update () {


}

function OnTriggerStay ( col : Collider ){

	if(col.tag == "ship"){
		yield WaitForSeconds(0.1);
			ship.GetComponent.<Rigidbody>().AddForce(currentDir);
	}

}