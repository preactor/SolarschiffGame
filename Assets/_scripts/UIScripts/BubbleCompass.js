#pragma strict

var schiff : GameObject;
var ziel : GameObject;
var compass : GameObject;
var mainCam : Camera;

var schiffScreenPos : Vector3;
var zielScreenPos : Vector3;
var compassScreenPos : Vector2;

enum zielPos {UP,DOWN,LEFT,RIGHT};
var pos : zielPos;
var emptyTarget : GameObject;

//Screenspace-Berechnungen
//Ortsvektoren UL = UpperLeft, LL = LowerLeft, usw.
var scrPointUL : Vector2;
var scrPointUR : Vector2;
var scrPointLL : Vector2;
var scrPointLR : Vector2;
//GameobjectVektoren
var schiffA : Vector2;
var zielB : Vector2;
var pointC : Vector2;
var dirVectorAB : Vector2;
//GeradenParameter fÃ¼r jede einzelne Bildschirmkante u, d, l, r
var u : float;
var d : float;
var l : float;
var r : float;
//Schnittpunkt!
var lIntersectionPoint : Vector2;
var uIntersectionPoint : Vector2;
var dIntersectionPoint : Vector2;
var rIntersectionPoint : Vector2;
//Clamping Intersection Points
var lIPClamped : Vector2;
var uIPClamped : Vector2;
var dIPClamped : Vector2;
var rIPClamped : Vector2;

var targetIsVisible : boolean;

var imageRenderers : UI.Image[];

//DISPLAY ICONS

var hikers : GameObject;
var family : GameObject;
var youth : GameObject;
var rich : GameObject;


function Start () {

	mainCam = GameObject.FindWithTag("MainCamera").GetComponent(Camera);
	//ziel = GameObject.FindWithTag("B");
	schiff = GameObject.FindWithTag("ship");
	compass = GameObject.FindWithTag("bubbleCompass");
	emptyTarget = GameObject.FindWithTag("emptyTarget");
	ziel = emptyTarget;
	
	//ScreenSpaceVektor-Definitionen
	scrPointUL = Vector2(0, Screen.height);
	scrPointUR = Vector2(Screen.width, Screen.height);
	scrPointLL = Vector2(0,0);
	scrPointLR = Vector2(Screen.width, 0);
	
	//THIS is how you do get Children. You have to have an Array
	imageRenderers = this.GetComponentsInChildren.<UI.Image>();

}

function Update () {

	if(ziel == emptyTarget){
		for(var image : UI.Image in imageRenderers){
			image.enabled = false;
		}
		rich.SetActive(false);
		youth.SetActive(false);
		family.SetActive(false);
		hikers.SetActive(false);
	}else{
		for(var image : UI.Image in imageRenderers){
			image.enabled = true;
		}
		
		//DEFINE WHICH ICON IS TO BE DISPLAYED
		if(ziel.tag == "quest-rich"){
			rich.SetActive(true);
		}
		if(ziel.tag == "quest-youth"){
			youth.SetActive(true);
		}
		if(ziel.tag == "quest-family"){
			family.SetActive(true);
		}
		if(ziel.tag == "quest-tourist"){
			hikers.SetActive(true);
		}
		
		
		//Ziel ist es nun den Schnittpunkt zwischen BildschirmRand und Schiff-Ziel-Vektor zu finden, um dort den Kompassanzeiger zu platzieren.
		//Zuerst muss permanent ein ScreenSpace-Vektor zwischen Ziel und Schiff berechnet werden.

		zielScreenPos = mainCam.WorldToScreenPoint(ziel.transform.position);
		schiffScreenPos = mainCam.WorldToScreenPoint(schiff.transform.position);
		
		schiffA = Vector2(schiffScreenPos.x, schiffScreenPos.y);
		zielB = Vector2(zielScreenPos.x, zielScreenPos.y);
		//pointC wird zur Winkelberechnung aus dem damit gebildeten Dreieck ABC gebraucht -> rechter Winkel
		pointC = Vector2(zielScreenPos.x, schiffScreenPos.y); 
		//print(pointC);	
		
		dirVectorAB = zielB - schiffA;
		
		//SchnittpunktBerechnung
		//WIR BERECHNEN ALLE INTERSECTION POINTS IN JEDEM FRAME, DANACH ENTSCHEIDEN WIR WELCHER DER SCHNITTPUNKTE NUN DER RELEVANTE IST
		//DAS TUN WIR MIT DER DISTANZBERECHNUNG ZWISCHEN INTERSECTION UND TARGET -> KÃ¼RZESTE DISTANZ = RICHTIGER PUNKT
		//Der Algorythmus nachdem aufzulÃ¶sen gilt: t = (x02-x01)/ex1
		//wobei: t = geradenparameter; x02 =  Ortsvektor.x des Bildschirmrands ; x01 = Ortsvektor.x des schiffes; ex1 = Richtungsvektor zwischen Schiff und Ziel
		//LEFTBORDER
		l = (scrPointLL.x-schiffA.x)/dirVectorAB.x;
		lIntersectionPoint = dirVectorAB * l + schiffA;
		lIPClamped = Vector2(lIntersectionPoint.x, Mathf.Clamp(lIntersectionPoint.y,0,Screen.height));
		if(lIntersectionPoint.y > 0 && lIntersectionPoint.y < Screen.height){
			if(Vector2.SqrMagnitude(zielB-lIntersectionPoint) < Vector2.SqrMagnitude(zielB-rIntersectionPoint)){
				pos = zielPos.LEFT;
				DrawCompass(pos);
			}
		}
		//print("LEFT" + lIPClamped);
		//UPPERBORDER
		u = (scrPointUL.y-schiffA.y)/dirVectorAB.y;
		uIntersectionPoint = dirVectorAB * u + schiffA;
		uIPClamped = Vector2(Mathf.Clamp(uIntersectionPoint.x,0,Screen.width), uIntersectionPoint.y);
		if(uIntersectionPoint.x > 0 && uIntersectionPoint.x < Screen.width){
			if(Vector2.SqrMagnitude(zielB-uIntersectionPoint) < Vector2.SqrMagnitude(zielB-dIntersectionPoint)){
				pos = zielPos.UP;
				DrawCompass(pos);
			}
		}
		//print("UP" + uIPClamped);
		//LOWERBORDER
		d = (scrPointLL.y-schiffA.y)/dirVectorAB.y;
		dIntersectionPoint = dirVectorAB * d + schiffA;
		dIPClamped = Vector2(Mathf.Clamp(dIntersectionPoint.x,0,Screen.width), dIntersectionPoint.y);
		if(dIntersectionPoint.x > 0 && dIntersectionPoint.x < Screen.width){
			if(Vector2.SqrMagnitude(zielB-dIntersectionPoint) < Vector2.SqrMagnitude(zielB-uIntersectionPoint)){
				pos = zielPos.DOWN;
				DrawCompass(pos);
			}
		}
		
		
		//print("DOWN" + dIPClamped);
		//RIGHTBORDER
		r = (scrPointLR.x-schiffA.x)/dirVectorAB.x;
		rIntersectionPoint = dirVectorAB * r + schiffA;
		rIPClamped = Vector2(rIntersectionPoint.x, Mathf.Clamp(rIntersectionPoint.y,0,Screen.height));
		if(rIntersectionPoint.y > 0 && rIntersectionPoint.y < Screen.height){
			if(Vector2.SqrMagnitude(zielB-rIntersectionPoint) < Vector2.SqrMagnitude(zielB-lIntersectionPoint)){
				pos = zielPos.RIGHT;
				DrawCompass(pos);
			}
		}
		
		//print("RIGHT" + rIPClamped);
		//print("ShipPos" + schiffA);
		//print("TargetPos" + zielB);
		
		
		//targetIsVisible = ziel.GetComponent.<Renderer>().isVisible;
		//isVisible Check gibt offenbar probleme, da das Rendering - vermutlich durch das neue Canvas GUI (Overlay/ScreenSpace) System auch ausserhalb des Bildschirms passiert.
		//Falls reaktiviert: Inzwischen ist der Renderer des Questgivers-Prefabs entfernt. Neue Component einfügen, allenfalls.
		//Die Alternative, manuell sowieso genauer Handlebar:
		if(zielScreenPos.x < Screen.width && zielScreenPos.x > 0 && zielScreenPos.y < Screen.height-90 && zielScreenPos.y > 0){
			//print(ziel.transform.position);
			for(var image : UI.Image in imageRenderers){
				image.enabled = false;
			}
		}else{
			for(var image : UI.Image in imageRenderers){
				image.enabled = true;
			}
		}
		
		//Um Winkel zu berechnen, Autmatisches Dreieck aus Ziel, Schiff und Punkt rechtwinklig dazu:
		//compassScreenPos = Vector2(zielScreenPos.x, schiffScreenPos.y);
		//Wenn die Kamera sich auf dem Screen befindet, muss sich das HUD, resp. deren Elemente, nach hinten versetzen, sonst schneidet es sich mit der Spielwelt
		//Ueber alles KameraRelative (mainCam.ScreenToWorldPoint bspw.) ist die z-Komponente immer die "Distanz" zur Kamera
		compass.transform.position = Vector3(compassScreenPos.x,compassScreenPos.y,-1.5);	
		
	}
}

function DrawCompass(pos : zielPos){
	switch(pos){
		case zielPos.LEFT:
			//print("isLeft");
			compassScreenPos.x = lIPClamped.x+45;
			compassScreenPos.y = Mathf.Clamp(lIPClamped.y,45,Screen.height-90);
			break;
		case zielPos.UP:
			//print("isUp");
			compassScreenPos.x = Mathf.Clamp(uIPClamped.x,45,Screen.width-45);
			compassScreenPos.y = uIPClamped.y-90;
			break;
		case zielPos.DOWN:
			//print("isDown");
			compassScreenPos.x = Mathf.Clamp(dIPClamped.x,45,Screen.width-45);
			compassScreenPos.y = dIPClamped.y+45;
			break;
		case zielPos.RIGHT:
			//print("isRight");
			compassScreenPos.x = rIPClamped.x-45;
			compassScreenPos.y = Mathf.Clamp(rIPClamped.y,45,Screen.height-90);
			break;
	}
}