#if !LOCALTEST

using System.Threading;
using System.IO;
namespace System.Globalization {
	public class NumberFormatInfo : IFormatProvider {

		#region Static Methods/Properties

		private static string[] defaultNativeDigits = new string[] { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };

		public static NumberFormatInfo CurrentInfo {
			get {
				NumberFormatInfo nfi = Thread.CurrentThread.CurrentCulture.NumberFormat;
				return nfi;
			}
		}

		public static NumberFormatInfo InvariantInfo {
			get {
				NumberFormatInfo nfi = new NumberFormatInfo();
				nfi.isReadOnly = true;
				return nfi;
			}
		}

		public static NumberFormatInfo GetInstance(IFormatProvider provider) {
			if (provider != null) {
				NumberFormatInfo nfi;
				nfi = (NumberFormatInfo)provider.GetFormat(typeof(NumberFormatInfo));
				if (nfi != null) {
					return nfi;
				}
			}

			return CurrentInfo;
		}

		#endregion

		private bool isReadOnly;
		private int currencyDecimalDigits;
		private string currencyDecimalSeparator;
		private string currencyGroupSeparator;
		private int[] currencyGroupSizes;
		private int currencyNegativePattern;
		private int currencyPositivePattern;
		private string currencySymbol;
		private DigitShapes digitSubstitution;
		private string naNSymbol;
		private string[] nativeDigits;
		private string negativeInfinitySymbol;
		private string negativeSign;
		private int numberDecimalDigits;
		private string numberDecimalSeparator;
		private string numberGroupSeparator;
		private int[] numberGroupSizes;
		private int numberNegativePattern;
		private int percentDecimalDigits;
		private string percentDecimalSeparator;
		private string percentGroupSeparator;
		private int[] percentGroupSizes;
		private int percentNegativePattern;
		private int percentPositivePattern;
		private string percentSymbol;
		private string perMilleSymbol;
		private string positiveInfinitySymbol;
		private string positiveSign;

		private static int[] ConvertToIntArray(string s) {
			string[] list = s.Split(',');
			int listLen = list.Length;
			int[] ret = new int[listLen];
			for (int i = 0; i < listLen; i++) {
				ret[i] = int.Parse(list[i]);
			}
			return ret;
		}

		internal NumberFormatInfo(StreamReader s) {
			this.isReadOnly = true;
			// Sets up information from stream
			this.currencyDecimalDigits = int.Parse(s.ReadLine());
			this.currencyDecimalSeparator = s.ReadLine();
			this.currencyGroupSeparator = s.ReadLine();
			this.currencyGroupSizes = ConvertToIntArray(s.ReadLine());
			this.currencyNegativePattern = int.Parse(s.ReadLine());
			this.currencyPositivePattern = int.Parse(s.ReadLine());
			this.currencySymbol = s.ReadLine();
			this.digitSubstitution = (DigitShapes)int.Parse(s.ReadLine());
			this.naNSymbol = s.ReadLine();
			this.nativeDigits = s.ReadLine().Split(',');
			this.negativeInfinitySymbol = s.ReadLine();
			this.negativeSign = s.ReadLine();
			this.numberDecimalDigits = int.Parse(s.ReadLine());
			this.numberDecimalSeparator = s.ReadLine();
			this.numberGroupSeparator = s.ReadLine();
			this.numberGroupSizes = ConvertToIntArray(s.ReadLine());
			this.numberNegativePattern = int.Parse(s.ReadLine());
			this.percentDecimalDigits = int.Parse(s.ReadLine());
			this.percentDecimalSeparator = s.ReadLine();
			this.percentGroupSeparator = s.ReadLine();
			this.percentGroupSizes = ConvertToIntArray(s.ReadLine());
			this.percentNegativePattern = int.Parse(s.ReadLine());
			this.percentPositivePattern = int.Parse(s.ReadLine());
			this.percentSymbol = s.ReadLine();
			this.perMilleSymbol = s.ReadLine();
			this.positiveInfinitySymbol = s.ReadLine();
			this.positiveSign = s.ReadLine();
		}

		public NumberFormatInfo() {
			this.isReadOnly = true;
			// Set up defaults for invariant culture
			this.currencyDecimalDigits = 2;
			this.currencyDecimalSeparator = ".";
			this.currencyGroupSeparator = ",";
			this.currencyGroupSizes = new int[] { 3 };
			this.currencyNegativePattern = 0;
			this.currencyPositivePattern = 0;
			this.currencySymbol = "$";
			this.digitSubstitution = DigitShapes.None;
			this.naNSymbol = "NaN";
			this.nativeDigits = defaultNativeDigits;
			this.negativeInfinitySymbol = "-Infinity";
			this.negativeSign = "-";
			this.numberDecimalDigits = 2;
			this.numberDecimalSeparator = ".";
			this.numberGroupSeparator = ",";
			this.numberGroupSizes = new int[] { 3 };
			this.numberNegativePattern = 1;
			this.percentDecimalDigits = 2;
			this.percentDecimalSeparator = ".";
			this.percentGroupSeparator = ",";
			this.percentGroupSizes = new int[] { 3 };
			this.percentNegativePattern = 0;
			this.percentPositivePattern = 0;
			this.percentSymbol = "%";
			this.perMilleSymbol = "\x2030";
			this.positiveInfinitySymbol = "Infinity";
			this.positiveSign = "+";
		}

		public bool IsReadOnly { get { return this.isReadOnly; } }
		public int CurrencyDecimalDigits { get { return this.currencyDecimalDigits; } }
		public string CurrencyDecimalSeparator { get { return this.currencyDecimalSeparator; } }
		public string CurrencyGroupSeparator { get { return this.currencyGroupSeparator; } }
		public int[] CurrencyGroupSizes { get { return this.currencyGroupSizes; } }
		public int CurrencyNegativePattern { get { return this.currencyNegativePattern; } }
		public int CurrencyPositivePattern { get { return this.currencyPositivePattern; } }
		public string CurrencySymbol { get { return this.currencySymbol; } }
		public DigitShapes DigitSubstitution { get { return this.digitSubstitution; } }
		public string NaNSymbol { get { return this.naNSymbol; } }
		public string[] NativeDigits { get { return this.nativeDigits; } }
		public string NegativeInfinitySymbol { get { return this.negativeInfinitySymbol; } }
		public string NegativeSign { get { return this.negativeSign; } }
		public int NumberDecimalDigits { get { return this.numberDecimalDigits; } }
		public string NumberDecimalSeparator { get { return this.numberDecimalSeparator; } }
		public string NumberGroupSeparator { get { return this.numberGroupSeparator; } }
		public int[] NumberGroupSizes { get { return this.numberGroupSizes; } }
		public int NumberNegativePattern { get { return this.numberNegativePattern; } }
		public int PercentDecimalDigits { get { return this.percentDecimalDigits; } }
		public string PercentDecimalSeparator { get { return this.percentDecimalSeparator; } }
		public string PercentGroupSeparator { get { return this.percentGroupSeparator; } }
		public int[] PercentGroupSizes { get { return this.percentGroupSizes; } }
		public int PercentNegativePattern { get { return this.percentNegativePattern; } }
		public int PercentPositivePattern { get { return this.percentPositivePattern; } }
		public string PercentSymbol { get { return this.percentSymbol; } }
		public string PerMilleSymbol { get { return this.perMilleSymbol; } }
		public string PositiveInfinitySymbol { get { return this.positiveInfinitySymbol; } }
		public string PositiveSign { get { return this.positiveSign; } }

		#region IFormatProvider Members

		public object GetFormat(Type formatType) {
			throw new Exception("The method or operation is not implemented.");
		}

		#endregion
	}
}

#endif
