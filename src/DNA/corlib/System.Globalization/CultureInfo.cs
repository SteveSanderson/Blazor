#if !LOCALTEST

using System.Threading;
using System.Collections.Generic;
using System.IO;

namespace System.Globalization {
	public class CultureInfo {

		#region Static methods

		private static Dictionary<string, CultureInfo> shareByName = new Dictionary<string,CultureInfo>();

		private static CultureInfo invariantCulture = null;

		public static CultureInfo GetCultureInfo(string name) {
			// Always use lower-case version of name
			lock (shareByName) {
				CultureInfo ci;
				if (!shareByName.TryGetValue(name.ToLowerInvariant(), out ci)) {
					ci = new CultureInfo(name);
					// Don't put in cache, as the constructor already does this
				}
				return ci;
			}
		}

		public static CultureInfo CurrentCulture {
			get {
				return Thread.CurrentThread.CurrentCulture;
			}
		}

		public static CultureInfo InvariantCulture {
			get {
				if (invariantCulture == null) {
					invariantCulture = new CultureInfo(string.Empty);
				}
				return invariantCulture;
			}
		}

		public static CultureInfo[] GetCultures(CultureTypes types) {
			DirectoryInfo cultureDir = new DirectoryInfo(Environment.CultureDirectory);
			List<CultureInfo> ret = new List<CultureInfo>();
			foreach (FileInfo fi in cultureDir.GetFiles()) {
				CultureInfo ci = CultureInfo.GetCultureInfo(fi.Name);
				if ((ci.cultureTypes & types) > 0) {
					ret.Add(ci);
				}
			}
			return ret.ToArray();
		}

		#endregion

		private string name;
		private int lcid;
		private string parentName;
		private CultureInfo parent = null;
		private string displayName;
		private string englishName;
		private string nativeName;
		private string twoLetterISOLanguageName;
		private string threeLetterISOLanguageName;
		private string threeLetterWindowsLanguageName;
		private CultureTypes cultureTypes;
		private string ietfLanguageTag;
		private bool isNeutralCulture;
		private NumberFormatInfo numberFormatInfo;
		private TextInfo textInfo;
		private DateTimeFormatInfo dateTimeFormat;

		public CultureInfo(string name) {
			if (name == null) {
				throw new ArgumentNullException();
			}
			if (name.Length == 0) {
				ConstructInvariant();
				return;
			}
			// Always use lower-case version of name
			string nameLower = name.ToLowerInvariant();
			// If this culture is already loaded and cached, then just copy all of its settings
			lock (shareByName) {
				CultureInfo cached;
				if (shareByName.TryGetValue(nameLower, out cached)) {
					CopyFrom(cached);
					return;
				}
			}
			// Not cached, so create from new and place in cache
			ConstructFromFile(name);
		}

		private void ConstructInvariant() {
			this.name = string.Empty;
			this.displayName =
			this.englishName =
			this.nativeName = "Invariant Language (Invariant Country)";
			this.lcid = 0x7f;
			this.numberFormatInfo = NumberFormatInfo.InvariantInfo;
			this.dateTimeFormat = DateTimeFormatInfo.InvariantInfo;
		}

		private void ConstructFromFile(string name) {
			string fileName = Environment.CultureDirectory + Path.DirectorySeparatorStr + name;
			try {
				using (StreamReader s = File.OpenText(fileName)) {
					this.name = s.ReadLine();
					this.lcid = int.Parse(s.ReadLine().Substring(2), NumberStyles.HexNumber);
					this.parentName = s.ReadLine();
					this.englishName = s.ReadLine();
					this.nativeName = s.ReadLine();
					this.displayName = s.ReadLine();
					this.twoLetterISOLanguageName = s.ReadLine();
					this.threeLetterISOLanguageName = s.ReadLine();
					this.threeLetterWindowsLanguageName = s.ReadLine();
					string calendarName = s.ReadLine(); // Calendar
					s.ReadLine(); // Optional calendars
					this.cultureTypes = (CultureTypes)int.Parse(s.ReadLine());
					this.ietfLanguageTag = s.ReadLine();
					this.isNeutralCulture = bool.Parse(s.ReadLine());
					this.textInfo = new TextInfo(this, s);
					if (!this.isNeutralCulture) {
						this.numberFormatInfo = new NumberFormatInfo(s);
						this.dateTimeFormat = new DateTimeFormatInfo(s, calendarName);
					} else {
						this.numberFormatInfo = null;
						this.dateTimeFormat = null;
					}
				}
			} catch (FileNotFoundException) {
				throw new ArgumentException(string.Format("{0} is not a valid culture", name));
			}
			lock (shareByName) {
				shareByName.Add(name.ToLowerInvariant(), this);
			}
		}

		private void CopyFrom(CultureInfo ci) {
			this.name = ci.name;
			this.lcid = ci.lcid;
			this.parent = ci.parent;
			this.englishName = ci.englishName;
			this.nativeName = ci.nativeName;
			this.displayName = ci.displayName;
			this.twoLetterISOLanguageName = ci.twoLetterISOLanguageName;
			this.threeLetterISOLanguageName = ci.threeLetterISOLanguageName;
			this.threeLetterWindowsLanguageName = ci.threeLetterWindowsLanguageName;
			this.cultureTypes = ci.cultureTypes;
			this.ietfLanguageTag = ci.ietfLanguageTag;
			this.isNeutralCulture = ci.isNeutralCulture;

			this.textInfo = ci.textInfo;
			this.numberFormatInfo = ci.numberFormatInfo;
			this.dateTimeFormat = ci.dateTimeFormat;
		}

		public bool IsReadOnly {
			get{
				// At the moment, all CultureInfo's are read-only
				return true;
			}
		}

		public virtual NumberFormatInfo NumberFormat {
			get {
				if (this.numberFormatInfo == null) {
					throw new NotSupportedException("Not supported for neutral cultures");
				}
				return this.numberFormatInfo;
			}
		}

		public virtual DateTimeFormatInfo DateTimeFormat {
			get {
				if (this.dateTimeFormat == null) {
					throw new NotSupportedException("Not supported for neutral cultures");
				}
				return this.dateTimeFormat;
			}
		}

		public virtual int LCID {
			get {
				return this.lcid;
			}
		}

		public virtual string Name {
			get {
				return this.name;
			}
		}

		public virtual CultureInfo Parent {
			get {
				if (this.parent == null) {
					this.parent = CultureInfo.GetCultureInfo(this.parentName);
				}
				return this.parent;
			}
		}

		public virtual string DisplayName {
			get {
				return this.displayName;
			}
		}

		public virtual string EnglishName {
			get {
				return this.englishName;
			}
		}

		public virtual string NativeName {
			get {
				return this.nativeName;
			}
		}

		public virtual string TwoLetterISOLanguageName {
			get {
				return this.twoLetterISOLanguageName;
			}
		}

		public virtual string ThreeLetterISOLanguageName {
			get {
				return this.threeLetterISOLanguageName;
			}
		}

		public virtual string ThreeLetterWindowsLanguageName {
			get {
				return this.threeLetterWindowsLanguageName;
			}
		}

		public virtual CultureTypes CultureTypes {
			get {
				return this.cultureTypes;
			}
		}

		public virtual string IetfLanguageTag {
			get {
				return this.ietfLanguageTag;
			}
		}

		public virtual bool IsNeutralCulture {
			get {
				return this.isNeutralCulture;
			}
		}

		public virtual TextInfo TextInfo {
			get {
				return this.textInfo;
			}
		}

		public override string ToString() {
			return this.name;
		}

	}
}

#endif