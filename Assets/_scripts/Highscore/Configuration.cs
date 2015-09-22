using UnityEngine;
using System.Collections;

/*
	THIS FILE CONTAINS SENSITIVE INFORMATION. DO NOT CHECKIN!!
*/

public static class Configuration {
#if DEBUG
	public static string UrlGet = "http://localhost:5723/GetHighscoreEntries.php";
#else
	public static string UrlGet = null;
#endif

#if DEBUG
	public static string UrlInsert = "http://localhost:5723/InsertHighscoreEntry.php";
#else
	public static string UrlInsert = null;
#endif

#if DEBUG
	public static readonly byte [] PasswordBytes = new byte[]			// ADJUST THIS VALUE LOCALLY. DO NOT CHECKIN
	{
		1, 2, 3, 4, 5, 6, 7, 8,
		9, 10, 11, 12, 13, 14, 15, 16,
		17, 18, 19, 20, 21, 22, 23, 24,
		25, 26, 27, 28, 29, 30, 31, 32
	};
#else
	public static readonly byte [] PasswordBytes = new byte[]			// ADJUST THIS VALUE LOCALLY. DO NOT CHECKIN
	{
		1, 2, 3, 4, 5, 6, 7, 8,
		9, 10, 11, 12, 13, 14, 15, 16,
		17, 18, 19, 20, 21, 22, 23, 24,
		25, 26, 27, 28, 29, 30, 31, 32
	};
#endif
	
}
