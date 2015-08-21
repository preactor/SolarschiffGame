#pragma strict

var gameRes : GameRessources;

var moodModifier = 0.05;


function Start () {

	gameRes = GameObject.FindWithTag("GameRes").GetComponent(GameRessources);

}

function Update () {


}


function OnTriggerStay ( col : Collider ){

	if(col.tag == "ship" && gameRes.questFunc.questStarted == true){
		gameRes.mood = gameRes.mood + moodModifier;
		yield WaitForSeconds(0.25);
		//print(gameRes.mood);
	}

}


