using UnityEngine;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Security.Cryptography;
using MiniJSON;

public enum HighscoreState
{
	Idle, Wait, Success, Failed
}

public class Highscore {

	// last error from php get script
	public string LastGetHttpError = null;

	// last error from s get script
	public string LastPublishHttpError = null;

	// currently sending highscore
	public HighscoreState SendState = HighscoreState.Idle;

	// currently receiving highscore
	public HighscoreState ReceiveState = HighscoreState.Idle;
	
	// last highscore list received from php script
	public List<HighscoreEntryModel> LastReceivedHighscoreEntries = new List<HighscoreEntryModel>();

	// endpoint to receive message from
	private string highscoreGetUrl = Configuration.UrlGet;

	// endpoint to send the message to
	private string highscoreInsertUrl = Configuration.UrlInsert;

	// password for AES-256 encryption
	private static readonly byte [] highscorePasswordBytes = Configuration.PasswordBytes;

	// get highscore entries
	public IEnumerator GetEntries()
	{	 
		// request data
		WWW www = new WWW(highscoreGetUrl);
		ReceiveState = HighscoreState.Wait;
		yield return www;

		// get json response
		string json = null;
		LastGetHttpError = null;
		if (string.IsNullOrEmpty (www.error)) {
			Debug.Log ("answer: " + www.text);
			json = www.text;
			ReceiveState = HighscoreState.Success;
		} else {
			Debug.Log ("Epic fail: " + www.error);
			LastGetHttpError = "error: " + www.error;
			ReceiveState = HighscoreState.Failed;
		}

		// deserialize json response
		Deserialize (json);
	}

	public IEnumerator PublishEntry(HighscoreEntryModel model)
	{	
		var message = Serialize (model); 

		// encrypt message
		var encryptionResult = EncryptionHelper.EncryptMessage (message, highscorePasswordBytes);
		var encryptedMessage = encryptionResult.EncryptedMessage;
		var rijndaelIv = encryptionResult.RijndaelIv;
		
		// append encrypted message and iv
		var bytesToSend = new List<byte> ();
		bytesToSend.AddRange (encryptedMessage);	
		bytesToSend.AddRange (rijndaelIv); 

		// send
		var bytesToSendBase64 = System.Convert.ToBase64String (bytesToSend.ToArray ());
		WWWForm form = new WWWForm();
		form.AddField("content", bytesToSendBase64);
		WWW www = new WWW(highscoreInsertUrl, form);
		SendState = HighscoreState.Wait;
		yield return www;
		
		// show result
		if (string.IsNullOrEmpty (www.error)) {
			Debug.Log ("answer: " + www.text);
			SendState = HighscoreState.Success;
		} else {
			Debug.Log ("Epic fail: " + www.error);
			LastPublishHttpError = "error: " + www.error;
			SendState = HighscoreState.Failed;
		}
	}

	// get formatted string from HighscoreEntry models
	public string ToString(List<HighscoreEntryModel> entries)
	{
		var result = string.Empty;
		foreach (var entry in entries) 
		{
			var line = string.Format("{0} {1} ({2} {3})\n", entry.Score, entry.DisplayName, entry.FirstName, entry.LastName);
			result = result + line;
		}
		
		return result;
	}

	// serialize a highscore entry model to json
	private string Serialize(HighscoreEntryModel model)
	{
		string json = string.Format("{{\"LastName\": \"{0}\", \"FirstName\": \"{1}\" , \"DisplayName\": \"{2}\", \"Email\": \"{3}\", \"Score\": {4}}}", 
									model.LastName, model.FirstName, model.DisplayName, model.Email, model.Score.ToString());
		
		return json;
	}

	// deserialize received json string to highscore entry model (without email for security)
	private void Deserialize(string json)
	{
		LastReceivedHighscoreEntries.Clear ();
		List<object> objectsRaw = (List<object>)Json.Deserialize (json);

		if (objectsRaw != null)
		{
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
				LastReceivedHighscoreEntries.Add (highscoreEntry);
			}
		}
	}
}

