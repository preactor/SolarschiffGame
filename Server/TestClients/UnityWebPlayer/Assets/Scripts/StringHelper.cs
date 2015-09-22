using System.Linq;

public static class StringHelper
{
	public static byte[] GetBytes(string str)
	{
		byte[] bytes = new byte[str.Length * sizeof(char)];
		System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
		return bytes;
	}

	public static string GetBytesAsString(string str)
	{
		byte [] bytes = GetBytes (str);

		string printableBytes = string.Join(",", bytes.Select(x => x.ToString()).ToArray());
		return printableBytes;
	}

	public static string GetBytesAsString(byte [] str)
	{
		string printableBytes = string.Join(",", str.Select(x => x.ToString()).ToArray());
		return printableBytes;
	}
}
