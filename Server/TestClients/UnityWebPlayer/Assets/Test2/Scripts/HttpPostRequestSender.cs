using UnityEngine;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Security.Cryptography;

namespace Scene2
{
	public class HttpPostRequestSender: MonoBehaviour {

		// endpoint to send the message to
		private const string endpointUrl = "http://localhost:5723/HandleEncryptedPostRequest.php";

		// scroll view vector
		private Vector2 scrollViewVector = Vector2.zero;

		// password for AES-256 encryption
		private static readonly byte [] passwordBytes = new byte[]
		{
			1, 2, 3, 4, 5, 6, 7, 8,
			9, 10, 11, 12, 13, 14, 15, 16,
			17, 18, 19, 20, 21, 22, 23, 24,
			25, 26, 27, 28, 29, 30, 31, 32
		};

		// last response from php script
		private string lastResponse = string.Empty;

		void OnGUI()
		{
			// button
			if (GUI.Button (new Rect (10, 10, 200, 50), "Send Encrypted")) 
			{
				StartCoroutine(SendEncryptedRequest());
			}

			// scroll view
			scrollViewVector = GUI.BeginScrollView (new Rect (10, 70, 400, 400), scrollViewVector, new Rect (0, 0, 1000, 1000));
			GUI.TextArea (new Rect (0, 0, 400, 400), lastResponse);
			GUI.EndScrollView ();
		}

		private string GenerateMessage()
		{
			string message = "confidential";

			return message;
		}

		IEnumerator SendEncryptedRequest()
		{	
			var message = GenerateMessage (); 

			// debug
			Debug.Log ("bytes of key: " + StringHelper.GetBytesAsString (passwordBytes));
			Debug.Log ("bytes before encryption: " + StringHelper.GetBytesAsString (message));

			// encrypt message
			var encryptionResult = EncryptionHelper.EncryptMessage (message, passwordBytes);
			var encryptedMessage = encryptionResult.EncryptedMessage;
			var rijndaelIv = encryptionResult.RijndaelIv;

			// append encrypted message and iv
			var bytesToSend = new List<byte> ();
			bytesToSend.AddRange (encryptedMessage);		
			bytesToSend.AddRange (rijndaelIv); 

			// debug
			Debug.Log ("bytes of encrypted message:" + StringHelper.GetBytesAsString(encryptedMessage.ToArray()));
			Debug.Log ("bytes of iv:" + StringHelper.GetBytesAsString(rijndaelIv.ToArray()));

			// send
			var bytesToSendBase64 = System.Convert.ToBase64String (bytesToSend.ToArray ());
			WWWForm form = new WWWForm();
			form.AddField("content", bytesToSendBase64);
			WWW www = new WWW(endpointUrl, form);
			yield return www;

			// show result
			if (string.IsNullOrEmpty (www.error)) {
				Debug.Log ("It works! (received " + www.bytesDownloaded + " bytes)");
				Debug.Log ("answer: " + www.text);
				lastResponse = www.text;
			} else {
				Debug.Log ("Epic fail: " + www.error);
				lastResponse = "error, error: " + www.error;
			}
		}
	}
}
