using UnityEngine;
using System.Collections;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Security.Cryptography;

// Result of AES256-Encryption
public struct Aes256EncryptionResult
{
	public List<byte> RijndaelIv;
	public List<byte> EncryptedMessage;
}

public static class EncryptionHelper {
	// Encrypt message with AES-256
	public static Aes256EncryptionResult EncryptMessage(string message, byte [] passwordBytes)
	{
		var rijndaelIv = CreateRijndaelIv (); 

		byte[] encrypted = EncryptStringToBytes(message, passwordBytes, rijndaelIv);

		return new Aes256EncryptionResult
		{
			RijndaelIv = rijndaelIv.ToList(),
			EncryptedMessage = encrypted.ToList()
		};
	}

	// create Rijndael initialization vector
	private static byte[] CreateRijndaelIv()
	{
		byte[] rijndaelIv;    
		using (var myRijndael = new RijndaelManaged())
		{ 
			myRijndael.Mode = CipherMode.CBC;
			myRijndael.KeySize = 256;
			myRijndael.BlockSize = 256;
			myRijndael.Padding = PaddingMode.Zeros;
			myRijndael.GenerateIV();
			rijndaelIv = myRijndael.IV;
		}
		
		return rijndaelIv;
	}

	// Encrypt message with AES-256
	private static byte[] EncryptStringToBytes(string plainText, byte[] Key, byte[] IV)
	{
		// Check arguments. 
		if (plainText == null || plainText.Length <= 0) throw new System.ArgumentNullException("plainText");
		if (Key == null || Key.Length <= 0) throw new System.ArgumentNullException("Key");
		if (IV == null || IV.Length <= 0) throw new System.ArgumentNullException("IV");
		byte[] encrypted;
		
		// Create a RijndaelManaged object 
		// with the specified key and IV. 
		using (var rijAlg = new RijndaelManaged())
		{
			rijAlg.KeySize = 256;
			rijAlg.BlockSize = 256;
			rijAlg.Padding = PaddingMode.Zeros;
			rijAlg.Key = Key;
			rijAlg.IV = IV;
			
			// Create a decrytor to perform the stream transform.
			ICryptoTransform encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);
			
			// Create the streams used for encryption. 
			using (var msEncrypt = new MemoryStream())
			{
				using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
				{
					using (var swEncrypt = new StreamWriter(csEncrypt))
					{
						//Write all data to the stream.
						swEncrypt.Write(plainText);
					}
					encrypted = msEncrypt.ToArray();
				}
			}
		}
		
		
		// Return the encrypted bytes from the memory stream. 
		return encrypted;
	}
}
