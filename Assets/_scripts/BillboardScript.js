#pragma strict

var mainCam : GameObject;

function Start () {
	
	mainCam = GameObject.FindWithTag("MainCamera");

}

function Update () {

	//Billboarding
	transform.LookAt(transform.position + mainCam.transform.rotation * Vector3.forward, mainCam.transform.rotation * Vector3.up);

}