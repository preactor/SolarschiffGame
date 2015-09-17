using UnityEngine;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Security.Cryptography;
using MiniJSON;

namespace Scene5
{
	public class HttpGetResponseReceiver : MonoBehaviour {

		// endpoint to send the message to
		private const string endpointUrl = "http://localhost:5723/GetHighscoreEntries.php";

		// scroll view vector
		private Vector2 scrollViewVector = Vector2.zero;

		// last raw response from php script
		private string lastResponse;

		// last highscore list received from php script
		private List<HighscoreEntryModel> lastHighscoreEntries = new List<HighscoreEntryModel>();
		
		void OnGUI()
		{
			// button
			if (GUI.Button (new Rect (10, 10, 200, 50), "Get Data")) 
			{
				StartCoroutine(ReceiveHighscoreEntries());
			}

			// scroll view
			scrollViewVector = GUI.BeginScrollView (new Rect (10, 70, 400, 400), scrollViewVector, new Rect (0, 0, 1000, 1000));
			GUI.TextArea (new Rect (0, 0, 400, 400), GetHighscoreEntriesAsString(lastHighscoreEntries));
			GUI.EndScrollView ();
		}

		IEnumerator ReceiveHighscoreEntries()
		{	 
			// request data
			WWW www = new WWW(endpointUrl);
			yield return www;

			// get json response
			string json = null;
			if (string.IsNullOrEmpty (www.error)) {
				Debug.Log ("answer: " + www.text);
				json = www.text;
			} else {
				Debug.Log ("Epic fail: " + www.error);
				lastResponse = "error: " + www.error;
			}

			// deserialize json response
			Deserialize (json);
		}

		void Deserialize(string json)
		{
			List<object> objectsRaw = (List<object>)Json.Deserialize (json);

			foreach (Dictionary<string, object> objectRaw in objectsRaw) 
			{
				// parse
				string lastName = (string) objectRaw ["LastName"];
				string firstName = (string) objectRaw ["FirstName"];
				string displayName = (string) objectRaw ["DisplayName"];

				long score = -1;
				long.TryParse((string)objectRaw["Score"], out score);

				// fill
				HighscoreEntryModel highscoreEntry = new HighscoreEntryModel 
				{
					LastName = lastName,
					FirstName = firstName,
					DisplayName = displayName,
					Score = score
				};
				lastHighscoreEntries.Add (highscoreEntry);
			}
		}

		private string GetHighscoreEntriesAsString(List<HighscoreEntryModel> entries)
		{
			var result = string.Empty;
			foreach (var entry in entries) 
			{
				var line = string.Format("{0} {1} ({2} {3})\n", entry.Score, entry.DisplayName, entry.FirstName, entry.LastName);
				result = result + line;
			}

			return result;
		}
	}
}
