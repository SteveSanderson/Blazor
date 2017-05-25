#if !LOCALTEST

using System.Runtime.CompilerServices;
using System.Globalization;
using System.Text;
namespace System {
	public struct DateTime : IFormattable, IComparable, IComparable<DateTime>, IEquatable<DateTime> {

		public static readonly DateTime MinValue = new DateTime(0);
		public static readonly DateTime MaxValue = new DateTime(3155378975999999999L);

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private static long InternalUtcNow();

		private TimeSpan ticks;
		private DateTimeKind kind;

		private static readonly int[] daysMonth = { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		private static readonly int[] daysMonthLeap = { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

		private static int AbsoluteDays(int year, int month, int day) {
			int[] days;
			int temp = 0, m = 1;

			days = (IsLeapYear(year) ? daysMonthLeap : daysMonth);

			while (m < month)
				temp += days[m++];
			return ((day - 1) + temp + (365 * (year - 1)) + ((year - 1) / 4) - ((year - 1) / 100) + ((year - 1) / 400));
		}

		public DateTime(long ticks) {
			this.ticks = new TimeSpan(ticks);
			this.kind = DateTimeKind.Unspecified;
		}

		public DateTime(long ticks, DateTimeKind kind) {
			this.ticks = new TimeSpan(ticks);
			this.kind = kind;
		}

		public DateTime(int year, int month, int day)
			: this(year, month, day, 0, 0, 0, 0, DateTimeKind.Unspecified) {
		}

		public DateTime(int year, int month, int day, int hour, int minute, int second)
			: this(year, month, day, hour, minute, second, 0, DateTimeKind.Unspecified) {
		}

		public DateTime(int year, int month, int day, int hour, int minute, int second, DateTimeKind kind)
			: this(year, month, day, hour, minute, second, 0, kind) {
		}

		public DateTime(int year, int month, int day, int hour, int minute, int second, int millisecond)
			: this(year, month, day, hour, minute, second, millisecond, DateTimeKind.Unspecified) {
		}

		public DateTime(int year, int month, int day, int hour, int minute, int second, int millisecond, DateTimeKind kind) {
			ticks = new TimeSpan(AbsoluteDays(year, month, day), hour, minute, second, millisecond);
			this.kind = kind;
		}

		public DateTime Date {
			get {
				return new DateTime(this.Year, this.Month, this.Day, 0, 0, 0, this.kind);
			}
		}

		public int Day {
			get {
				return this.FromTicks(Which.Day);
			}
		}

		public DayOfWeek DayOfWeek {
			get {
				return (DayOfWeek)((this.ticks.Days + 1) % 7);
			}
		}

		public int DayOfYear {
			get {
				return this.FromTicks(Which.DayYear);
			}
		}

		public int Hour {
			get {
				return this.ticks.Hours;
			}
		}

		public DateTimeKind Kind {
			get {
				return this.kind;
			}
		}

		public int Millisecond {
			get {
				return this.ticks.MilliSeconds;
			}
		}

		public int Minute {
			get {
				return this.ticks.Minutes;
			}
		}

		public int Month {
			get {
				return this.FromTicks(Which.Month);
			}
		}

		public int Second {
			get {
				return this.ticks.Seconds;
			}
		}

		public long Ticks {
			get {
				return this.ticks.Ticks;
			}
		}

		public TimeSpan TimeOfDay {
			get {
				return new TimeSpan(this.ticks.Ticks % TimeSpan.TicksPerDay);
			}
		}

		public int Year {
			get {
				return this.FromTicks(Which.Year);
			}
		}

		public static DateTime UtcNow {
			get {
				return new DateTime(InternalUtcNow(), DateTimeKind.Utc);
			}
		}

		private enum Which {
			Day,
			DayYear,
			Month,
			Year
		};

		public DateTime Add(TimeSpan ts) {
			return new DateTime(this.ticks.Ticks + ts.Ticks, this.kind);
		}

		public TimeSpan Subtract(DateTime dt) {
			return this.ticks - dt.ticks;
		}

		public DateTime Subtract(TimeSpan ts) {
			return new DateTime(this.ticks.Ticks - ts.Ticks, this.kind);
		}

		public DateTime AddDays(double days) {
			return this.AddTicks((long)(days * (double)TimeSpan.TicksPerDay));
		}

		public DateTime AddHours(double hours) {
			return this.AddTicks((long)(hours * (double)TimeSpan.TicksPerHour));
		}

		public DateTime AddMilliseconds(double ms) {
			return this.AddTicks((long)(ms * (double)TimeSpan.TicksPerMillisecond));
		}

		public DateTime AddMinutes(double mins) {
			return this.AddTicks((long)(mins * (double)TimeSpan.TicksPerMinute));
		}

		public DateTime AddSeconds(double seconds) {
			return this.AddTicks((long)(seconds * (double)TimeSpan.TicksPerSecond));
		}

		public DateTime AddTicks(long ticks) {
			return new DateTime(this.ticks.Ticks + ticks, this.kind);
		}

		public DateTime AddMonths(int months) {
			int day, month, year, maxday;
			DateTime temp;

			day = this.Day;
			month = this.Month + (months % 12);
			year = this.Year + months / 12;

			if (month < 1) {
				month = 12 + month;
				year--;
			} else if (month > 12) {
				month = month - 12;
				year++;
			}
			maxday = DaysInMonth(year, month);
			if (day > maxday)
				day = maxday;

			temp = new DateTime(year, month, day);
			temp.kind = kind;
			return temp.Add(this.TimeOfDay);
		}

		public DateTime AddYears(int years) {
			return this.AddMonths(years * 12);
		}

		public static DateTime operator +(DateTime d, TimeSpan t) {
			return d.Add(t);
		}

		public static TimeSpan operator -(DateTime d1, DateTime d2) {
			return d1.Subtract(d2);
		}

		public static DateTime operator -(DateTime d, TimeSpan t) {
			return d.Subtract(t);
		}

		public static bool operator ==(DateTime d1, DateTime d2) {
			return d1.ticks == d2.ticks;
		}

		public static bool operator !=(DateTime d1, DateTime d2) {
			return d1.ticks != d2.ticks;
		}

		public static bool operator >(DateTime d1, DateTime d2) {
			return d1.ticks > d2.ticks;
		}

		public static bool operator >=(DateTime d1, DateTime d2) {
			return d1.ticks >= d2.ticks;
		}

		public static bool operator <(DateTime d1, DateTime d2) {
			return d1.ticks < d2.ticks;
		}

		public static bool operator <=(DateTime d1, DateTime d2) {
			return d1.ticks <= d2.ticks;
		}

		private const int dp400 = 146097;
		private const int dp100 = 36524;
		private const int dp4 = 1461;

		public static bool IsLeapYear(int year) {
			return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
		}

		private int FromTicks(Which what) {
			int num400, num100, num4, numyears;
			int M = 1;

			int[] days = daysMonth;
			int totaldays = this.ticks.Days;

			num400 = (totaldays / dp400);
			totaldays -= num400 * dp400;

			num100 = (totaldays / dp100);
			if (num100 == 4)   // leap
				num100 = 3;
			totaldays -= (num100 * dp100);

			num4 = totaldays / dp4;
			totaldays -= (num4 * dp4);

			numyears = totaldays / 365;

			if (numyears == 4) {
				//leap
				numyears = 3;
			}
			if (what == Which.Year) {
				return num400 * 400 + num100 * 100 + num4 * 4 + numyears + 1;
			}

			totaldays -= (numyears * 365);
			if (what == Which.DayYear) {
				return totaldays + 1;
			}

			if ((numyears == 3) && ((num100 == 3) || !(num4 == 24))) {
				//31 dec leapyear
				days = daysMonthLeap;
			}

			while (totaldays >= days[M]) {
				totaldays -= days[M++];
			}

			if (what == Which.Month) {
				return M;
			}

			return totaldays + 1;
		}

		public static int DaysInMonth(int year, int month) {
			if (month < 1 || month > 12) {
				throw new ArgumentOutOfRangeException();
			}
			int[] days = (IsLeapYear(year) ? daysMonthLeap : daysMonth);
			return days[month];
		}

		public override bool Equals(object obj) {
			if (!(obj is System.DateTime)) {
				return false;
			}
			return ((DateTime)obj).ticks == ticks;
		}

		public override int GetHashCode() {
			return this.ticks.GetHashCode();
		}

		#region ToString() stuff

		public override string ToString() {
			return this.ToString("G", null);
		}

		public string ToString(IFormatProvider fp) {
			return this.ToString(null, fp);
		}

		public string ToString(string format) {
			return this.ToString(format, null);
		}

		public string ToString(string format, IFormatProvider fp) {
			DateTimeFormatInfo dtf = DateTimeFormatInfo.GetInstance(fp);

			if (string.IsNullOrEmpty(format)) {
				format = "G";
			}

			bool useUtc = false, useInvariant = false;
			if (format.Length == 1) {
				format = GetStandardPattern(format[0], dtf, out useUtc, out useInvariant);
			}

			return this.ToString2(format, dtf);
		}

		#region ToString helper functions

		private string ToString2(string format, DateTimeFormatInfo dfi) {
			// the length of the format is usually a good guess of the number
			// of chars in the result. Might save us a few bytes sometimes
			// Add + 10 for cases like mmmm dddd
			StringBuilder result = new StringBuilder(format.Length + 10);

			// For some cases, the output should not use culture dependent calendar
			DateTimeFormatInfo inv = DateTimeFormatInfo.InvariantInfo;
			if (format == inv.RFC1123Pattern)
				dfi = inv;
			else if (format == inv.UniversalSortableDateTimePattern)
				dfi = inv;

			int i = 0;

			while (i < format.Length) {
				int tokLen;
				bool omitZeros = false;
				char ch = format[i];

				switch (ch) {

				//
				// Time Formats
				//
				case 'h':
					// hour, [1, 12]
					tokLen = CountRepeat(format, i, ch);

					int hr = this.Hour % 12;
					if (hr == 0)
						hr = 12;

					ZeroPad(result, hr, tokLen == 1 ? 1 : 2);
					break;
				case 'H':
					// hour, [0, 23]
					tokLen = CountRepeat(format, i, ch);
					ZeroPad(result, this.Hour, tokLen == 1 ? 1 : 2);
					break;
				case 'm':
					// minute, [0, 59]
					tokLen = CountRepeat(format, i, ch);
					ZeroPad(result, this.Minute, tokLen == 1 ? 1 : 2);
					break;
				case 's':
					// second [0, 29]
					tokLen = CountRepeat(format, i, ch);
					ZeroPad(result, this.Second, tokLen == 1 ? 1 : 2);
					break;
				case 'F':
					omitZeros = true;
					goto case 'f';
				case 'f':
					// fraction of second, to same number of
					// digits as there are f's

					tokLen = CountRepeat(format, i, ch);
					if (tokLen > 7)
						throw new FormatException("Invalid Format String");

					int dec = (int)((long)(this.Ticks % TimeSpan.TicksPerSecond) / (long)Math.Pow(10, 7 - tokLen));
					int startLen = result.Length;
					ZeroPad(result, dec, tokLen);

					if (omitZeros) {
						while (result.Length > startLen && result[result.Length - 1] == '0')
							result.Length--;
						// when the value was 0, then trim even preceding '.' (!) It is fixed character.
						if (dec == 0 && startLen > 0 && result[startLen - 1] == '.')
							result.Length--;
					}

					break;
				case 't':
					// AM/PM. t == first char, tt+ == full
					tokLen = CountRepeat(format, i, ch);
					string desig = this.Hour < 12 ? dfi.AMDesignator : dfi.PMDesignator;

					if (tokLen == 1) {
						if (desig.Length >= 1)
							result.Append(desig[0]);
					} else
						result.Append(desig);

					break;
				case 'z':
					// timezone. t = +/-h; tt = +/-hh; ttt+=+/-hh:mm
					tokLen = CountRepeat(format, i, ch);
					throw new NotImplementedException("TimeZone not supported");
					/*TimeSpan offset = TimeZone.CurrentTimeZone.GetUtcOffset(this);

					if (offset.Ticks >= 0)
						result.Append('+');
					else
						result.Append('-');

					switch (tokLen) {
					case 1:
						result.Append(Math.Abs(offset.Hours));
						break;
					case 2:
						result.Append(Math.Abs(offset.Hours).ToString("00"));
						break;
					default:
						result.Append(Math.Abs(offset.Hours).ToString("00"));
						result.Append(':');
						result.Append(Math.Abs(offset.Minutes).ToString("00"));
						break;
					}
					break;*/
				case 'K': // 'Z' (UTC) or zzz (Local)
					tokLen = 1;
					switch (kind) {
					case DateTimeKind.Utc:
						result.Append ('Z');
						break;
					case DateTimeKind.Local:
						throw new NotImplementedException("TimeZone not supported");
						/*offset = TimeZone.CurrentTimeZone.GetUtcOffset (this);
						if (offset.Ticks >= 0)
							result.Append ('+');
						else
							result.Append ('-');
						result.Append (Math.Abs (offset.Hours).ToString ("00"));
						result.Append (':');
						result.Append (Math.Abs (offset.Minutes).ToString ("00"));
						break;*/
					}
					break;
				//
				// Date tokens
				//
				case 'd':
					// day. d(d?) = day of month (leading 0 if two d's)
					// ddd = three leter day of week
					// dddd+ full day-of-week
					tokLen = CountRepeat(format, i, ch);

					if (tokLen <= 2)
						ZeroPad(result, dfi.Calendar.GetDayOfMonth(this), tokLen == 1 ? 1 : 2);
					else if (tokLen == 3)
						result.Append(dfi.GetAbbreviatedDayName(dfi.Calendar.GetDayOfWeek(this)));
					else
						result.Append(dfi.GetDayName(dfi.Calendar.GetDayOfWeek(this)));

					break;
				case 'M':
					// Month.m(m?) = month # (with leading 0 if two mm)
					// mmm = 3 letter name
					// mmmm+ = full name
					tokLen = CountRepeat(format, i, ch);
					int month = dfi.Calendar.GetMonth(this);
					if (tokLen <= 2)
						ZeroPad(result, month, tokLen);
					else if (tokLen == 3)
						result.Append(dfi.GetAbbreviatedMonthName(month));
					else
						result.Append(dfi.GetMonthName(month));

					break;
				case 'y':
					// Year. y(y?) = two digit year, with leading 0 if yy
					// yyy+ full year, if yyy and yr < 1000, displayed as three digits
					tokLen = CountRepeat(format, i, ch);

					if (tokLen <= 2)
						ZeroPad(result, dfi.Calendar.GetYear(this) % 100, tokLen);
					else
						ZeroPad(result, dfi.Calendar.GetYear(this), (tokLen == 3 ? 3 : 4));

					break;
				case 'g':
					// Era name
					tokLen = CountRepeat(format, i, ch);
					result.Append(dfi.GetEraName(dfi.Calendar.GetEra(this)));
					break;

				//
				// Other
				//
				case ':':
					result.Append(dfi.TimeSeparator);
					tokLen = 1;
					break;
				case '/':
					result.Append(dfi.DateSeparator);
					tokLen = 1;
					break;
				case '\'':
				case '"':
					tokLen = ParseQuotedString(format, i, result);
					break;
				case '%':
					if (i >= format.Length - 1)
						throw new FormatException("% at end of date time string");
					if (format[i + 1] == '%')
						throw new FormatException("%% in date string");

					// Look for the next char
					tokLen = 1;
					break;
				case '\\':
					// C-Style escape
					if (i >= format.Length - 1)
						throw new FormatException("\\ at end of date time string");

					result.Append(format[i + 1]);
					tokLen = 2;

					break;
				default:
					// catch all
					result.Append(ch);
					tokLen = 1;
					break;
				}
				i += tokLen;
			}
			return result.ToString();
		}

		private static int CountRepeat(string fmt, int p, char c) {
			int l = fmt.Length;
			int i = p + 1;
			while ((i < l) && (fmt[i] == c))
				i++;

			return i - p;
		}

		private static void ZeroPad(StringBuilder output, int digits, int len) {
			char[] buffer = new char[16];
			int pos = 16;

			do {
				buffer[--pos] = (char)('0' + digits % 10);
				digits /= 10;
				len--;
			} while (digits > 0);

			while (len-- > 0) {
				buffer[--pos] = '0';
			}

			output.Append(buffer, pos, 16 - pos);
		}

		private static int ParseQuotedString(string fmt, int pos, StringBuilder output) {
			// pos == position of " or '

			int len = fmt.Length;
			int start = pos;
			char quoteChar = fmt[pos++];

			while (pos < len) {
				char ch = fmt[pos++];

				if (ch == quoteChar)
					return pos - start;

				if (ch == '\\') {
					// C-Style escape
					if (pos >= len)
						throw new FormatException("Un-ended quote");

					output.Append(fmt[pos++]);
				} else {
					output.Append(ch);
				}
			}

			throw new FormatException("Un-ended quote");
		}

		private static string GetStandardPattern(char format, DateTimeFormatInfo dfi, out bool useUtc, out bool useInvariant) {
			String pattern;

			useUtc = false;
			useInvariant = false;

			switch (format) {
			case 'd':
				pattern = dfi.ShortDatePattern;
				break;
			case 'D':
				pattern = dfi.LongDatePattern;
				break;
			case 'f':
				pattern = dfi.LongDatePattern + " " + dfi.ShortTimePattern;
				break;
			case 'F':
				pattern = dfi.FullDateTimePattern;
				break;
			case 'g':
				pattern = dfi.ShortDatePattern + " " + dfi.ShortTimePattern;
				break;
			case 'G':
				pattern = dfi.ShortDatePattern + " " + dfi.LongTimePattern;
				break;
			case 'm':
			case 'M':
				pattern = dfi.MonthDayPattern;
				break;
#if NET_2_0
			case 'o':
				pattern = dfi.RoundtripPattern;
				break;
#endif
			case 'r':
			case 'R':
				pattern = dfi.RFC1123Pattern;
				// commented by LP 09/jun/2002, rfc 1123 pattern is always in GMT
				// uncommented by AE 27/may/2004
				//				useutc = true;
				useInvariant = true;
				break;
			case 's':
				pattern = dfi.SortableDateTimePattern;
				break;
			case 't':
				pattern = dfi.ShortTimePattern;
				break;
			case 'T':
				pattern = dfi.LongTimePattern;
				break;
			case 'u':
				pattern = dfi.UniversalSortableDateTimePattern;
				useUtc = true;
				break;
			case 'U':
				//				pattern = dfi.LongDatePattern + " " + dfi.LongTimePattern;
				pattern = dfi.FullDateTimePattern;
				useUtc = true;
				break;
			case 'y':
			case 'Y':
				pattern = dfi.YearMonthPattern;
				break;
			default:
				pattern = null;
				break;
			//				throw new FormatException (String.Format ("Invalid format pattern: '{0}'", format));
			}

			return pattern;
		}

		#endregion

		#endregion

		#region IComparable Members

		public int CompareTo(object obj) {
			if (obj == null) {
				return 1;
			}
			if (!(obj is DateTime)) {
				throw new ArgumentException();
			}
			return this.CompareTo((DateTime)obj);
		}

		#endregion

		#region IComparable<DateTime> Members

		public int CompareTo(DateTime x) {
			return this.ticks.CompareTo(x.ticks);
		}

		#endregion

		#region IEquatable<DateTime> Members

		public bool Equals(DateTime x) {
			return this.ticks.Equals(x.ticks);
		}

		#endregion
	}
}

#endif
