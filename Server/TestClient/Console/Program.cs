using System;
using System.IO;
using System.Security.Cryptography;

namespace TestClient
{
    // reference: http://www.codeproject.com/Articles/769741/Csharp-AES-bits-Encryption-Library-with-Salt
    internal class Program
    {
        private static void Main(string[] args)
        {
            //EncryptionTest(args);

            SimplifiedEncryptionTest(args);

        }

        // simplified, without rfc2898derivedbytes
        private static void SimplifiedEncryptionTest(string[] args)
        {
            const string message = "Here is some data to encrypt!";

            // set password bytes
            var keyBytes = new byte[]
            {
                1, 2, 3, 4, 5, 6, 7, 8,
                9, 10, 11, 12, 13, 14, 15, 16,
                17, 18, 19, 20, 21, 22, 23, 24,
                25, 26, 27, 28, 29, 30, 31, 32
            };

            // get init. vector
            var rijndaelIv = CreateRijndaelIv();

            // Encrypt 
            byte[] encrypted = EncryptStringToBytes(message, keyBytes, rijndaelIv);

            // Decrypt
            string roundtrip = DecryptStringFromBytes(encrypted, keyBytes, rijndaelIv);

            //Display the original data and the decrypted data.
            Console.WriteLine("before encryption:   {0}", message);
            Console.WriteLine("after decryption: {0}", roundtrip);
            Console.ReadLine();
        }

        // encrypt and decrypt messages
        private static void EncryptionTest(string[] args)
        {
            const string message = "Here is some data to encrypt!";
            const string password = "password";

            // get derived password bytes
            var salt = new byte[] { 18, 1, 25, 4, 13, 22, 9, 11 };
            var keyBytes = CreateDerivedPasswordBytes(password, salt);


            // get init. vector
            var rijndaelIv = CreateRijndaelIv();

            // Encrypt 
            byte[] encrypted = EncryptStringToBytes(message, keyBytes, rijndaelIv);

            // Decrypt
            string roundtrip = DecryptStringFromBytes(encrypted, keyBytes, rijndaelIv);

            //Display the original data and the decrypted data.
            Console.WriteLine("before encryption:   {0}", message);
            Console.WriteLine("after decryption: {0}", roundtrip);
            Console.ReadLine();
        }

		// create Rijndael initialization vector
        private static byte[] CreateRijndaelIv()
        {
            byte[] rijndaelIv;    
            using (var myRijndael = new RijndaelManaged())
            { 
                myRijndael.GenerateIV();
                rijndaelIv = myRijndael.IV;
            }

            return rijndaelIv;
        }

        // generate 32-byte derived bytes from password string
        private static byte[] CreateDerivedPasswordBytes(string password, byte[] salt)
        {
            var derivedBytes = new Rfc2898DeriveBytes(password, salt);
            return derivedBytes.GetBytes(32);
        }

        private static byte[] EncryptStringToBytes(string plainText, byte[] Key, byte[] IV)
        {
            // Check arguments. 
            if (plainText == null || plainText.Length <= 0) throw new ArgumentNullException("plainText");
            if (Key == null || Key.Length <= 0) throw new ArgumentNullException("Key");
            if (IV == null || IV.Length <= 0) throw new ArgumentNullException("IV");
            byte[] encrypted;

            // Create an RijndaelManaged object 
            // with the specified key and IV. 
            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Key = Key;
                rijAlg.IV = IV;
                rijAlg.Padding = PaddingMode.Zeros;

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

        private static string DecryptStringFromBytes(byte[] cipherText, byte[] Key, byte[] IV)
        {
            // Check arguments. 
            if (cipherText == null || cipherText.Length <= 0) throw new ArgumentNullException("cipherText");
            if (Key == null || Key.Length <= 0) throw new ArgumentNullException("Key");
            if (IV == null || IV.Length <= 0) throw new ArgumentNullException("IV");

            string plaintext = null;

            // Create an RijndaelManaged object 
            // with the specified key and IV. 
            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Key = Key;
                rijAlg.IV = IV;
                rijAlg.Padding = PaddingMode.Zeros;

                // Create a decrytor to perform the stream transform.
                ICryptoTransform decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

                // Create the streams used for decryption. 
                using (var msDecrypt = new MemoryStream(cipherText))
                {
                    using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (var srDecrypt = new StreamReader(csDecrypt))
                        {
                            // Read the decrypted bytes from the decrypting stream 
                            // and place them in a string.
                            plaintext = srDecrypt.ReadToEnd();
                        }
                    }
                }
            }

            return plaintext;
        }
    }
}