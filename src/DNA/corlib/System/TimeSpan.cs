// Copyright (c) 2012 DotNetAnywhere
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#if !LOCALTEST

using System.Text;
namespace System {
	public struct TimeSpan : IComparable, IComparable<TimeSpan>, IEquatable<TimeSpan> {

		public static readonly TimeSpan MaxValue = new TimeSpan(long.MaxValue);
		public static readonly TimeSpan MinValue = new TimeSpan(long.MinValue);
		public static readonly TimeSpan Zero = new TimeSpan(0L);

		public const long TicksPerDay = 864000000000L;
		public const long TicksPerHour = 36000000000L;
		public const long TicksPerMillisecond = 10000L;
		public const long TicksPerMinute = 600000000L;
		public const long TicksPerSecond = 10000000L;

		private long ticks;

		public TimeSpan(long ticks) {
			this.ticks = ticks;
		}

		public TimeSpan(int hours, int minutes, int seconds) {
			this.ticks = CalcTicks(0, hours, minutes, seconds, 0);
		}

		public TimeSpan(int days, int hours, int minutes, int seconds) {
			this.ticks = CalcTicks(days, hours, minutes, seconds, 0);
		}

		public TimeSpan(int days, int hours, int minutes, int seconds, int milliseconds) {
			this.ticks = CalcTicks(days, hours, minutes, seconds, milliseconds);
		}

		private static long CalcTicks(int days, int hours, int minutes, int seconds, int millis) {
			long t;
			t = (long)days * TicksPerDay +
				(long)hours * TicksPerHour + (long)minutes * TicksPerMinute +
				(long)seconds * TicksPerSecond + (long)millis * TicksPerMillisecond;
			return t;
		}

		public int Days {
			get {
				return (int)(this.ticks / TicksPerDay);
			}
		}

		public int Hours {
			get {
				return (int)((this.ticks % TicksPerDay) / TicksPerHour);
			}
		}

		public int Minutes {
			get {
				return (int)((this.ticks % TicksPerHour) / TicksPerMinute);
			}
		}

		public int Seconds {
			get {
				return (int)((this.ticks % TicksPerMinute) / TicksPerSecond);
			}
		}

		public int MilliSeconds {
			get {
				return (int)((this.ticks % TicksPerSecond) / TicksPerMillisecond);
			}
		}

		public long Ticks {
			get {
				return this.ticks;
			}
		}

		public double TotalDays {
			get {
				return ((double)this.ticks) / ((double)TicksPerDay);
			}
		}

		public double TotalHours {
			get {
				return ((double)this.ticks) / ((double)TicksPerHour);
			}
		}

		public double TotalMinutes {
			get {
				return ((double)this.ticks) / ((double)TicksPerMinute);
			}
		}

		public double TotalSeconds {
			get {
				return ((double)this.ticks) / ((double)TicksPerSecond);
			}
		}

		public double TotalMilliseconds {
			get {
				return ((double)this.ticks) / ((double)TicksPerMillisecond);
			}
		}

		public TimeSpan Add(TimeSpan ts) {
			return new TimeSpan(this.ticks + ts.ticks);
		}

		public TimeSpan Subtract(TimeSpan ts) {
			return new TimeSpan(this.ticks - ts.ticks);
		}

		public TimeSpan Negate(TimeSpan ts) {
			return new TimeSpan(-this.ticks);
		}

		public TimeSpan Duration() {
			return new TimeSpan(Math.Abs(this.ticks));
		}

		public static int Compare(TimeSpan t1, TimeSpan t2) {
			if (t1.ticks < t2.ticks) {
				return -1;
			}
			if (t1.ticks > t2.ticks) {
				return 1;
			}
			return 0;
		}

		#region IComparable Members

		public int CompareTo(object obj) {
			if (obj == null) {
				return 1;
			}
			if (!(obj is TimeSpan)) {
				throw new ArgumentException("Object must be a TimeSpan");
			}
			return Compare(this, (TimeSpan)obj);
		}

		#endregion

		#region IComparable<TimeSpan> Members

		public int CompareTo(TimeSpan x) {
			return Compare(this, x);
		}

		#endregion

		#region IEquatable<TimeSpan> Members

		public bool Equals(TimeSpan x) {
			return this.ticks == x.ticks;
		}

		#endregion

		public override int GetHashCode() {
			return this.ticks.GetHashCode();
		}

		public override bool Equals(object obj) {
			if (!(obj is TimeSpan)) {
				return false;
			}
			return this.ticks == ((TimeSpan)obj).ticks;
		}

		public static bool Equals(TimeSpan t1, TimeSpan t2) {
			return t1.ticks == t2.ticks;
		}

		public override string ToString() {
			StringBuilder sb = new StringBuilder(14);

			if (this.ticks < 0) {
				sb.Append('-');
			}
			if (this.Days != 0) {
				sb.Append(Math.Abs(this.Days));
				sb.Append('.');
			}
			sb.AppendFormat("{0:D2}:{1:D2}:{2:D2}",
				Math.Abs(this.Hours), Math.Abs(this.Minutes), Math.Abs(this.Seconds));
			if (this.MilliSeconds != 0) {
				sb.Append('.');
				sb.AppendFormat("{0:D7}", Math.Abs(this.MilliSeconds) * (int)TicksPerMillisecond);
			}

			return sb.ToString();
		}

		public static TimeSpan operator +(TimeSpan t1, TimeSpan t2) {
			return new TimeSpan(t1.ticks + t2.ticks);
		}

		public static TimeSpan operator -(TimeSpan t1, TimeSpan t2) {
			return new TimeSpan(t1.ticks - t2.ticks);
		}

		public static bool operator ==(TimeSpan t1, TimeSpan t2) {
			return t1.ticks == t2.ticks;
		}

		public static bool operator !=(TimeSpan t1, TimeSpan t2) {
			return t1.ticks != t2.ticks;
		}

		public static bool operator >(TimeSpan t1, TimeSpan t2) {
			return t1.ticks > t2.ticks;
		}

		public static bool operator >=(TimeSpan t1, TimeSpan t2) {
			return t1.ticks >= t2.ticks;
		}

		public static bool operator <(TimeSpan t1, TimeSpan t2) {
			return t1.ticks < t2.ticks;
		}

		public static bool operator <=(TimeSpan t1, TimeSpan t2) {
			return t1.ticks <= t2.ticks;
		}

		public static TimeSpan operator +(TimeSpan ts) {
			return ts;
		}

		public static TimeSpan operator -(TimeSpan ts) {
			return new TimeSpan(-ts.ticks);
		}
	}
}

#endif
