using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestClient
{
    class Program
    {
        static void Main(string[] args)
        {
            EncryptDecryptTest();
        }

        static void EncryptDecryptTest()
        {
            string secretMessage = "Super confidential stuff here!";
    
            // encrypt
            string encryptedMessage;
            string initializiationVector;
            AESEncryptMessage(secretMessage, out encryptedMessage, out initializiationVector);

            // decrypt
            string decryptedMessage = AESDecryptMessage(encryptedMessage, initializiationVector);

            Console.WriteLine("original: " + encryptedMessage);
            Console.WriteLine("encrypted: " + encryptedMessage);
        }

        static void AESEncryptMessage(string unencryptedMessage, out string encryptedMessage, out string initializationVector)
        {
            encryptedMessage = "encryptedMessage";
            initializationVector = "initializationVector";

            throw new NotImplementedException();
        }

        static string AESDecryptMessage(string encryptedMessage, string initializationVector)
        {
            throw new NotImplementedException();
        }
    }
}
