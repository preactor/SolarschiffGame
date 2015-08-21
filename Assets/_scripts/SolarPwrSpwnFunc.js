#pragma strict

var SolarPower : GameObject;
var rndmLoc : Vector3;
var solarAmount : int;
//var spwnedSolar : GameObject;
//var existingSolarArray : Array;
//var spwnedSolar : GameObject[];
var spwnedSolar = new Array();
var respawnInProgress : boolean;

var shipObj : GameObject;
var ship : Transform;



function Start () {
	
	respawnInProgress = false;
	shipObj = GameObject.FindWithTag("ship");
	ship = shipObj.transform;
	
	solarAmount = Random.Range(8, 15);

	for (var i = 0; i < solarAmount; i++){
		rndmLoc = Vector3(transform.position.x+(Random.Range(-1.5, 1.5)),transform.position.y,transform.position.z+(Random.Range(-1.5, 1.5)));
		spwnedSolar[i] = Instantiate (SolarPower, rndmLoc, transform.rotation);
	}
}

function Update () {
	
	if(Input.GetKeyDown("9")){
		print(spwnedSolar);
	}
	var distance = Vector3.Distance(ship.position, transform.position);
	//Wenn ein Element des Arrays = null ist, wurde Sonne aufgenommen/ die Saat angerührt, so dass eine 'Neusaat' in absehbarer Zeit stattfinden soll!
	if(spwnedSolar[0] == null || spwnedSolar[1] == null || spwnedSolar[2] == null || spwnedSolar[3] == null || spwnedSolar[4] == null || spwnedSolar[5] == null || spwnedSolar[6] == null || spwnedSolar[7] == null){
		//print("boom");
		if(respawnInProgress == false && distance > 10){
			RespawnSolar();
		}
	}
}

function RespawnSolar(){
	
	respawnInProgress = true;
	yield WaitForSeconds(1);
	
	//spwnedSolar[16] = SolarPower;
	
	//ArrayAufräumen und gespawnte Solars reseten
	//ACHTUNG: Da solarAmount neu erfasst wird, kann unter Umständen nicht jedes Solar Destroyed werden! Gibt aber einen schönen Random-Moment und Maximal werden es immer 15 bleiben.
	for (var p = 0; p < solarAmount; p++){
		if(spwnedSolar[p] != null){
			Destroy(spwnedSolar[p]);
		}
	}
	spwnedSolar.Clear();
	solarAmount = Random.Range(8, 15);
	
	for (var i = 0; i < solarAmount; i++){
		rndmLoc = Vector3(transform.position.x+(Random.Range(-1.5, 1.5)),transform.position.y,transform.position.z+(Random.Range(-1.5, 1.5)));
		spwnedSolar[i] = Instantiate (SolarPower, rndmLoc, transform.rotation);
		//spwnedSolar[i] = i;
		//spwnedSolar = Instantiate (SolarPower, rndmLoc, transform.rotation);
		//existingSolarArray.Add(spwnedSolar);
		//print(existingSolarArray.length);
		//print(spwnedSolar.length);
		//print(spwnedSolar[0]);
	}
	respawnInProgress = false;
}
	