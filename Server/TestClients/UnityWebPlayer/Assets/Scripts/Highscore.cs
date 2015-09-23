using UnityEngine;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Security.Cryptography;
using MiniJSON;

namespace Test1
{
	public enum HighscoreTransmissionState
	{
		Idle, Wait, Success, Warning, Error
	}

	public enum ServerResponseState
	{
		Success, Warning, Error
	}

 	class ServerResponse
	{
		public ServerResponseState State;

		public string Message;
	}

	public class Highscore {

		// last error from php get script
		public string LastGetHttpError = null;

		// last error from s get script
		public string LastPublishHttpError = null;

		// currently sending highscore
		public HighscoreTransmissionState SendState = HighscoreTransmissionState.Idle;

		// currently receiving highscore
		public HighscoreTransmissionState ReceiveState = HighscoreTransmissionState.Idle;

		// last highscore message
		public string LastMessage = string.Empty;

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
			ReceiveState = HighscoreTransmissionState.Wait;
			yield return www;

			// get json response
			string json = null;
			LastGetHttpError = null;
			if (string.IsNullOrEmpty (www.error)) {
				json = www.text;
				ReceiveState = HighscoreTransmissionState.Success;
			} else {
				LastGetHttpError = "error: " + www.error;
				ReceiveState = HighscoreTransmissionState.Error;
			}

			// deserialize json response
			DeserializeModels (json);
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
			SendState = HighscoreTransmissionState.Wait;
			yield return www;
			
			// process result
			if (string.IsNullOrEmpty (www.error)) 
			{
				string serverResponseString = www.text;

				var serverResponse = TryDeserializeServerResponse(serverResponseString);
				if (serverResponse.State == ServerResponseState.Success)
					SendState = HighscoreTransmissionState.Success;
				else if (serverResponse.State == ServerResponseState.Warning)
					SendState = HighscoreTransmissionState.Warning;
				else SendState = HighscoreTransmissionState.Error;

				LastMessage = serverResponse.Message;
			} 
			else 
			{
				LastPublishHttpError = "error: " + www.error;
				SendState = HighscoreTransmissionState.Error;
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
		private void DeserializeModels(string json)
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

		// try to deserialize server answer
		private ServerResponse TryDeserializeServerResponse(string json)
		{
			var serverResponse = new ServerResponse();

			try 
			{ 
				var response = (Dictionary<string,object>) Json.Deserialize(json);

				serverResponse.Message = (string) response["message"];
				string state = (string) response["state"];
				if (state == "Success")
					serverResponse.State = ServerResponseState.Success;
				else if (state == "Warning")
					serverResponse.State = ServerResponseState.Warning;
				else
					serverResponse.State = ServerResponseState.Error;
			}
			catch (System.NullReferenceException nullReferenceEx)
			{
				serverResponse.State = ServerResponseState.Error;
				serverResponse.Message = "malformed response string";
			}

			return serverResponse;
		}
	}
}
