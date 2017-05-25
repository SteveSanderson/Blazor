#if !LOCALTEST

namespace System.Globalization {
	[Flags]
	public enum CultureTypes {
		NeutralCultures = 1,
		SpecificCultures = 2,
		InstalledWin32Cultures = 4,
		AllCultures = 7,
		UserCustomCulture = 8,
		ReplacementCultures = 16,
		WindowsOnlyCultures = 32,
		FrameworkCultures = 64,
	}
}

#endif