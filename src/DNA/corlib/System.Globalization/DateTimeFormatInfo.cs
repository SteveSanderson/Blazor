#if !LOCALTEST

using System.IO;
using System.Threading;
namespace System.Globalization {
	public sealed class DateTimeFormatInfo {

		public static DateTimeFormatInfo InvariantInfo {
			get {
				DateTimeFormatInfo dtfi = new DateTimeFormatInfo();
				dtfi.isReadOnly = true;
				return dtfi;
			}
		}

		public static DateTimeFormatInfo CurrentInfo {
			get {
				return Thread.CurrentThread.CurrentCulture.DateTimeFormat;
			}
		}

		public static DateTimeFormatInfo GetInstance(IFormatProvider fp) {
			if (fp != null) {
				DateTimeFormatInfo dtf = (DateTimeFormatInfo)fp.GetFormat(typeof(DateTimeFormatInfo));
				if (dtf != null) {
					return dtf;
				}
			}

			return CurrentInfo;
		}

		private bool isReadOnly;
		private string[] abbreviatedDayNames;
		private string[] abbreviatedMonthGenitiveNames;
		private string[] abbreviatedMonthNames;
		private string amDesignator;
		private CalendarWeekRule calendarWeekRule;
		private string dateSeparator;
		private string[] dayNames;
		private DayOfWeek firstDayOfWeek;
		private string fullDateTimePattern;
		private string longDatePattern;
		private string longTimePattern;
		private string monthDayPattern;
		private string[] monthGenitiveNames;
		private string[] monthNames;
		private string nativeCalendarName; // This probably needs to change
		private string pmDesignator;
		private string rfc1123Pattern;
		private string shortDatePattern;
		private string[] shortestDayNames;
		private string shortTimePattern;
		private string sortableDateTimePattern;
		private string timeSeparator;
		private string universalSortableDateTimePattern;
		private string yearMonthPattern;
		private Calendar calendar;

		internal DateTimeFormatInfo(StreamReader s, string calendarName) {
			char[] comma = new char[] { ',' };
			this.abbreviatedDayNames = s.ReadLine().Split(comma);
			this.abbreviatedMonthGenitiveNames = s.ReadLine().Split(comma);
			this.abbreviatedMonthNames = s.ReadLine().Split(comma);
			this.amDesignator = s.ReadLine();
			this.calendarWeekRule = (CalendarWeekRule)int.Parse(s.ReadLine());
			this.dateSeparator = s.ReadLine();
			this.dayNames = s.ReadLine().Split(comma);
			this.firstDayOfWeek = (DayOfWeek)int.Parse(s.ReadLine());
			this.fullDateTimePattern = s.ReadLine();
			this.longDatePattern = s.ReadLine();
			this.longTimePattern = s.ReadLine();
			this.monthDayPattern = s.ReadLine();
			this.monthGenitiveNames = s.ReadLine().Split(comma);
			this.monthNames = s.ReadLine().Split(comma);
			this.nativeCalendarName = s.ReadLine();
			s.ReadLine(); // TODO: Appears to be a mistake in the culture files. Extra line added.
			this.pmDesignator = s.ReadLine();
			this.rfc1123Pattern = s.ReadLine(); // This is always the same, so does it need to be in the culture file?
			this.shortDatePattern = s.ReadLine();
			this.shortestDayNames = s.ReadLine().Split(comma);
			this.shortTimePattern = s.ReadLine();
			this.sortableDateTimePattern = s.ReadLine(); // This is always the same
			this.timeSeparator = s.ReadLine();
			this.universalSortableDateTimePattern = s.ReadLine(); // This is always the same
			this.yearMonthPattern = s.ReadLine();
			this.calendar = Calendar.CreateByName(calendarName);
		}

		public DateTimeFormatInfo() {
			// Construct an invariant culture DateTimeFormatInfo
			char[] comma = new char[] { ',' };
			this.isReadOnly = true;
			this.abbreviatedDayNames = "Sun,Mon,Tue,Wed,Thu,Fri,Sat".Split(comma);
			this.abbreviatedMonthGenitiveNames = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,".Split(comma);
			this.abbreviatedMonthNames = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,".Split(comma);
			this.amDesignator = "AM";
			this.calendarWeekRule = CalendarWeekRule.FirstDay;
			this.dateSeparator = "/";
			this.dayNames = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".Split(comma);
			this.firstDayOfWeek = DayOfWeek.Sunday;
			this.fullDateTimePattern = "dddd, dd MMMM yyyy HH:mm:ss";
			this.longDatePattern = "dddd, dd MMMM yyyy";
			this.longTimePattern = "HH:mm:ss";
			this.monthDayPattern = "MMMM dd";
			this.monthGenitiveNames = "January,February,March,April,May,June,July,August,September,October,November,December,".Split(comma);
			this.monthNames = "January,February,March,April,May,June,July,August,September,October,November,December,".Split(comma);
			this.nativeCalendarName = "Gregorian Calendar";
			this.pmDesignator = "PM";
			this.rfc1123Pattern = "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'";
			this.shortDatePattern = "MM/dd/yyyy";
			this.shortestDayNames = "Su,Mo,Tu,We,Th,Fr,Sa".Split(comma);
			this.shortTimePattern = "HH:mm";
			this.sortableDateTimePattern = "yyyy'-'MM'-'dd'T'HH':'mm':'ss";
			this.timeSeparator = ":";
			this.universalSortableDateTimePattern = "yyyy'-'MM'-'dd HH':'mm':'ss'Z'";
			this.yearMonthPattern = "yyyy MMMM";
			this.calendar = new GregorianCalendar();
		}

		public bool IsReadOnly { get { return this.isReadOnly; } }
		public string[] AbbreviatedDayNames { get { return this.abbreviatedDayNames; } }
		public string[] AbbreviatedMonthGenitiveNames { get { return this.abbreviatedMonthGenitiveNames; } }
		public string[] AbbreviatedMonthNames { get { return this.abbreviatedMonthNames; } }
		public string AMDesignator { get { return this.amDesignator; } }
		public CalendarWeekRule CalendarWeekRule { get { return this.calendarWeekRule; } }
		public string DateSeparator { get { return this.dateSeparator; } }
		public string[] DayNames { get { return this.dayNames; } }
		public DayOfWeek FirstDayOfWeek { get { return this.firstDayOfWeek; } }
		public string FullDateTimePattern { get { return this.fullDateTimePattern; } }
		public string LongDatePattern { get { return this.longDatePattern; } }
		public string LongTimePattern { get { return this.longTimePattern; } }
		public string MonthDayPattern { get { return this.monthDayPattern; } }
		public string[] MonthGenitiveNames { get { return this.monthGenitiveNames; } }
		public string[] MonthNames { get { return this.monthNames; } }
		public string NativeCalendarName { get { return this.nativeCalendarName; } }
		public string PMDesignator { get { return this.pmDesignator; } }
		public string RFC1123Pattern { get { return this.rfc1123Pattern; } }
		public string ShortDatePattern { get { return this.shortDatePattern; } }
		public string[] ShortestDayNames { get { return this.shortestDayNames; } }
		public string ShortTimePattern { get { return this.shortTimePattern; } }
		public string SortableDateTimePattern { get { return this.sortableDateTimePattern; } }
		public string TimeSeparator { get { return this.timeSeparator; } }
		public string UniversalSortableDateTimePattern { get { return this.universalSortableDateTimePattern; } }
		public string YearMonthPattern { get { return this.yearMonthPattern; } }
		public Calendar Calendar { get { return this.calendar; } }

		public string GetAbbreviatedDayName(DayOfWeek dow) {
			return this.abbreviatedDayNames[(int)dow];
		}

		public string GetAbbreviatedMonthName(int m) {
			return this.abbreviatedMonthNames[m];
		}

		public string GetDayName(DayOfWeek dow) {
			return this.dayNames[(int)dow];
		}

		public string GetEraName(int era) {
			return this.calendar.eraNames[era - 1];
		}

		public string GetMonthName(int m) {
			return this.monthNames[m];
		}
	}
}

#endif
