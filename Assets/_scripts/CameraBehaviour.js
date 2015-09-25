#pragma strict

var target : Transform;
var camFocus : Transform;
//var distance : float = 5;
var shipVel : float;

function Start () {

	GetComponent.<Camera>().orthographicSize = 3.5;
	transform.position.z = camFocus.position.z;
	transform.position.y = camFocus.position.y;
	transform.position.x = camFocus.position.x;

}

function Update () {

	shipVel = target.transform.InverseTransformDirection(target.GetComponent.<Rigidbody>().velocity).z;
	//print(shipVel);	
	
	
	// Das bisherige System mit einer mathematischen Interpolation die Stufenweise sich an die 
	//Schiffsgeschwindigkeit anpasst ist relativ umständlich, da nicht sehr flexibel.
	//Die neue Berechnung geschieht über eine Formel, die die camera.orthographicSize mit 
	//der Geschwindigkeit durch eine Gleichung direkt verbindet.
	
	// Neues Problem mit dieser Methode ist allerdings, dass die Kamera bei einem Crash
	//extrem Ruckartig die Distanz ändert.

	//if(shipVel < 1.8){
	//	camera.orthographicSize = Mathf.Lerp(camera.orthographicSize,7,0.003);
	//}
	//if(shipVel < 1.3){
	//	camera.orthographicSize = Mathf.Lerp(camera.orthographicSize,6,0.003);
	//}
	//if(shipVel < 0.9){
	//	camera.orthographicSize = Mathf.Lerp(camera.orthographicSize,4,0.003);
	//}
	//if(shipVel < 0.45){
	//	camera.orthographicSize = Mathf.Lerp(camera.orthographicSize,2,0.003);
	//}
	//if(shipVel < 0.2){
	//	camera.orthographicSize = Mathf.Lerp(camera.orthographicSize,1.5,0.003);
	//}
	//if(shipVel < 0.05){
	//	camera.orthographicSize = Mathf.Lerp(camera.orthographicSize,1,0.003);
	//}
	
	if(Mathf.Abs(shipVel) >= 4){
	
		shipVel = 4;
	}
	
	// Ein Zweiter Versuch hatte keine Detailansicht für das Schiff. Bei Geschwindigkeit Null ist die orthoSize immer 3.5
	//if(shipVel < 4 && shipVel > 0.05 && closeView == false){
	//	GetComponent.<Camera>().orthographicSize = (0.9*shipVel)+3.5;
	//	transform.position.z = target.position.z - distance;
	//	transform.position.y = target.position.y + distance;
	//	transform.position.x = target.position.x;
	//	transform.rotation = Quaternion.Euler(45, 0, 0);
	//}
	
	// Der dritte Versuch erstellt eine Ausnahmeregel für die Geschwindigkeit unter 0.05 was im prinzip Stillstand ist
	// Beim Stillstand wird ermöglicht, dass die Kamera sich per Mathf.Lerp der orhtoSize von 1 annähert.
	// Sobald dann die geschwindigkeit wieder grösser wird kommt eine nun ALLGEMEINT GüLTIGE Regel zum Zug,
	// die vorigen Versuch obsolet macht. Dabei wird aus egal welcher Geschwindigkeit heraus Interpoliert. 
	// die Maximalgeschwindigkeit der Interpolation ist 0.025. Sobald sich aber die orthoSize der shipVel-Rechnung annähert,
	// ist sie praktisch dasselbe wie die Berechnung des zweiten Versuchs.
	if(Time.timeScale != 0.0){
		if(Mathf.Abs(shipVel) <= 0.05 && GetComponent.<Camera>().orthographicSize >= 1.0){
		
			//Distance has become obsolete. Da Ortho-Perspektive macht das sowieso kein Sinn -> Dafür Clippingplanes anpassen
			//Vorteil nun ist, dass ich die Rotation der Kamera einfacher beeinflussen kann, ohne dass das Schiff out of focus ist.
			//transform.position.z = target.position.z - distance;
			transform.position.z = camFocus.position.z;
			//transform.position.y = target.position.y + distance;
			transform.position.y = camFocus.position.y;
			transform.position.x = camFocus.position.x;
			transform.rotation = Quaternion.Euler(35, 0, 0);
		
			GetComponent.<Camera>().orthographicSize = Mathf.Lerp(GetComponent.<Camera>().orthographicSize,1,0.001);
		}
		
		if(Mathf.Abs(shipVel) > 0.05){
		
			GetComponent.<Camera>().orthographicSize = Mathf.Lerp(GetComponent.<Camera>().orthographicSize,(0.9*Mathf.Abs(shipVel))+3.5,0.025);
			//transform.position.z = target.position.z - distance;
			transform.position.z = camFocus.position.z;
			//transform.position.y = target.position.y + distance;
			transform.position.y = camFocus.position.y;
			transform.position.x = camFocus.position.x;
			transform.rotation = Quaternion.Euler(35, 0, 0);	
		}
	}
}