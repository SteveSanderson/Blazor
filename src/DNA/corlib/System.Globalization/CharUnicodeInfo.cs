namespace System.Globalization {

	public static class CharUnicodeInfo {

		public static UnicodeCategory GetUnicodeCategory(char c) {
			return System.Char.GetUnicodeCategory(c);
		}
	}
}
