using UnityEngine;
using System.Collections;

namespace Scene6
{
	public class HighscoreMockupController : MonoBehaviour {
		// Highscore interface
		private Highscore highscore = new Highscore();

		// scroll view vector
		private Vector2 scrollViewVector = Vector2.zero;

		// first name to insert
		private string firstNameToInsert = "Hans";

		// last name to insert
		private string lastNameToInsert = "Mustermann";

		// display name to insert
		private string displayNameToInsert = "l33thans85";

		// email to insert
		private string emailToInsert = "hans.mustermann@gmail.com";

		// score to insert
		private string scoreToInsert = "1234";

		// state of sending 
		private string sendState = "state: reaady to send";

		// message to show in scroll view 
		private string receiveState = "state: ready to receive"; 

		void OnGUI()
		{
			// button get highscore
			if (GUI.Button (new Rect (10, 10, 200, 50), "Receive Highscore")) 
			{
				StartCoroutine(highscore.GetEntries());
				receiveState = "Please wait ...";
			}

			// button insert highscore
			if (GUI.Button (new Rect (420, 10, 200, 50), "Publish Score")) 
			{
				// store into highscore entry model object
				HighscoreEntryModel model = new HighscoreEntryModel();
				model.LastName = lastNameToInsert;
				model.FirstName = firstNameToInsert;
				model.DisplayName = displayNameToInsert;
				model.Email = emailToInsert;
				model.Score = long.Parse(scoreToInsert);

				StartCoroutine(highscore.PublishEntry(model));
				sendState = "Please wait ...";
			}

			// get receive message to display
			string message = string.Empty;
			if (highscore.ReceiveState == HighscoreState.Success) 
			{
				message = highscore.ToString (highscore.LastReceivedHighscoreEntries);
			}
			else 
				message = highscore.ReceiveState.ToString();

			// show scroll highscore scroll view
			scrollViewVector = GUI.BeginScrollView (new Rect (10, 70, 400, 400), scrollViewVector, new Rect (0, 0, 1000, 100));
			GUI.TextArea (new Rect (0, 0, 400, 400), message);
			GUI.EndScrollView ();


			// show input fields
			GUI.Label (new Rect (420, 70, 100, 30), "First Name");
			firstNameToInsert = GUI.TextField (new Rect (520, 70, 200, 30), firstNameToInsert);
			GUI.Label (new Rect (420, 120, 100, 30), "Last Name");
			lastNameToInsert = GUI.TextField (new Rect (520, 120, 200, 30), lastNameToInsert);
			GUI.Label (new Rect (420, 170, 100, 30), "Nickname");
			displayNameToInsert = GUI.TextField (new Rect (520, 170, 200, 30), displayNameToInsert);
			GUI.Label (new Rect (420, 220, 100, 30), "email");
			emailToInsert = GUI.TextField (new Rect (520, 220, 200, 30), emailToInsert);
			GUI.Label (new Rect (420, 270, 100, 30), "score");
			scoreToInsert = GUI.TextField (new Rect (520, 270, 200, 30), scoreToInsert);

			GUI.Label (new Rect(420, 320, 200, 30), "State: " + highscore.SendState.ToString());
		}

		// Use this for initialization
		void Start () {
				
		}
		
		// Update is called once per frame
		void Update () {
		
		}
	}
}
