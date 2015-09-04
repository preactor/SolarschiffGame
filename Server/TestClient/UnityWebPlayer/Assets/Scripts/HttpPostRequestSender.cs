using UnityEngine;
using System.Collections;

public class HttpPostRequestSender: MonoBehaviour {
	
	void OnGUI()
	{
		if (GUI.Button (new Rect (10, 10, 50, 50), "Send")) 
		{
			StartCoroutine(SendRequest());
		}
	}

	IEnumerator SendRequest()
	{	
		int i = Random.Range(1, 10000);
		string message = "And now a message from our sponsor: " + i.ToString (); 

		string url = "http://localhost:5723/HandlePostRequest.php";
		WWWForm form = new WWWForm();
		form.AddField("content", message);
		WWW www = new WWW(url, form);
		yield return www;

		if (string.IsNullOrEmpty (www.error)) {
			Debug.Log ("It works! (received " + www.bytesDownloaded + " bytes)");
		} else {
			Debug.Log ("Epic fail: " + www.error);
		}
	}
}
