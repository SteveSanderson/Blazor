#if !LOCALTEST

using System;
using System.Collections.Generic;
using System.Text;

namespace System.Globalization {
	public abstract class Calendar {

		internal static Calendar CreateByName(string name) {
			switch (name) {
			case "GregorianCalendar:Localized":
				return new GregorianCalendar();
			default:
				Console.WriteLine("Calendar: {0}", name);
				return null;
				//throw new NotSupportedException(string.Format("Calendar name '{0}' not known", name));
			}
		}

		public const int CurrentEra = 0;

		public abstract int[] Eras { get;}
		public abstract int GetEra(DateTime dt);
		public abstract int GetDayOfMonth(DateTime time);
		public abstract DayOfWeek GetDayOfWeek(DateTime time);
		public abstract int GetMonth(DateTime time);
		public abstract int GetYear(DateTime time);

		internal string[] eraNames;
		internal string[] eraAbbrNames;

		public bool IsReadOnly {
			get {
				// Only support read-only calendars for now.
				return true;
			}
		}

		public virtual DateTime MaxSupportedDateTime {
			get {
				return DateTime.MaxValue;
			}
		}

		public virtual DateTime MinSupportedDateTime {
			get {
				return DateTime.MinValue;
			}
		}

		public virtual int TwoDigitYearMax {
			get {
				return 2029;
			}
		}

	}
}

#endif
