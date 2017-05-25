#if !LOCALTEST

using System;
using System.Collections.Generic;
using System.Text;

namespace System.Globalization {
	public class GregorianCalendar : Calendar {

		public const int ADEra = 1;

		private GregorianCalendarTypes type;

		public GregorianCalendar() : this(GregorianCalendarTypes.Localized) { }

		public GregorianCalendar(GregorianCalendarTypes type) {
			base.eraNames = new string[] { "A.D." };
			base.eraAbbrNames = new string[] { "AD" };
			this.type = type;
		}

		public override int[] Eras {
			get {
				return new int[] { ADEra };
			}
		}

		public override int GetEra(DateTime dt) {
			return ADEra;
		}

		public override DayOfWeek GetDayOfWeek(DateTime time) {
			int rd = CCFixed.FromDateTime(time);
			return (DayOfWeek)CCFixed.day_of_week(rd);
		}

		public override int GetDayOfMonth(DateTime time) {
			return CCGregorianCalendar.GetDayOfMonth(time);
		}

		public override int GetMonth(DateTime time) {
			return CCGregorianCalendar.GetMonth(time);
		}

		public override int GetYear(DateTime time) {
			return CCGregorianCalendar.GetYear(time);
		}
	}
}

#endif
