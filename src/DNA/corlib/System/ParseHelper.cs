#if !LOCALTEST

using System.Globalization;
using System.Threading;
namespace System {
	internal static class ParseHelper {

		private static bool CheckStyle(NumberStyles style, bool tryParse, ref Exception exc) {
			if ((style & NumberStyles.AllowHexSpecifier) != 0) {
				NumberStyles ne = style ^ NumberStyles.AllowHexSpecifier;
				if ((ne & NumberStyles.AllowLeadingWhite) != 0) {
					ne ^= NumberStyles.AllowLeadingWhite;
				}
				if ((ne & NumberStyles.AllowTrailingWhite) != 0) {
					ne ^= NumberStyles.AllowTrailingWhite;
				}
				if (ne != 0) {
					if (!tryParse) {
						exc = new ArgumentException(
							"With AllowHexSpecifier only " +
							"AllowLeadingWhite and AllowTrailingWhite " +
							"are permitted.");
					}
					return false;
				}
			}

			return true;
		}

		private static bool JumpOverWhite(ref int pos, string s, bool reportError, bool tryParse, ref Exception exc) {
			while (pos < s.Length && Char.IsWhiteSpace(s[pos])) {
				pos++;
			}
			if (reportError && pos >= s.Length) {
				if (!tryParse) {
					exc = GetFormatException();
				}
				return false;
			}

			return true;
		}

		private static void FindSign(ref int pos, string s, NumberFormatInfo nfi,
			ref bool foundSign, ref bool negative) {
			if ((pos + nfi.NegativeSign.Length) <= s.Length &&
				s.IndexOf(nfi.NegativeSign, pos, nfi.NegativeSign.Length) == pos) {
				negative = true;
				foundSign = true;
				pos += nfi.NegativeSign.Length;
			} else if ((pos + nfi.PositiveSign.Length) < s.Length &&
				s.IndexOf(nfi.PositiveSign, pos, nfi.PositiveSign.Length) == pos) {
				negative = false;
				pos += nfi.PositiveSign.Length;
				foundSign = true;
			}
		}

		private static void FindCurrency(ref int pos, string s, NumberFormatInfo nfi, ref bool foundCurrency) {
			if ((pos + nfi.CurrencySymbol.Length) <= s.Length &&
				 s.Substring(pos, nfi.CurrencySymbol.Length) == nfi.CurrencySymbol) {
				foundCurrency = true;
				pos += nfi.CurrencySymbol.Length;
			}
		}

		private static bool FindExponent(ref int pos, string s) {
			int i = s.IndexOfAny(new char[] { 'e', 'E' }, pos);
			if (i < 0) {
				return false;
			}
			if (++i == s.Length) {
				return false;
			}
			if (s[i] == '+' || s[i] == '-') {
				if (++i == s.Length) {
					return false;
				}
			}
			if (!Char.IsDigit(s[i])) {
				return false;
			}
			for (; i < s.Length; ++i) {
				if (!Char.IsDigit(s[i])) {
					break;
				}
			}
			pos = i;
			return true;
		}

		private static bool FindOther(ref int pos, string s, string other) {
			if ((pos + other.Length) <= s.Length && s.Substring(pos, other.Length) == other) {
				pos += other.Length;
				return true;
			}
			return false;
		}

		private static bool ValidDigit(char e, bool allowHex) {
			if (allowHex) {
				return Char.IsDigit(e) || (e >= 'A' && e <= 'F') || (e >= 'a' && e <= 'f');
			}
			return Char.IsDigit(e);
		}

		private static Exception GetFormatException() {
			return new FormatException("Input string was not in the correct format");
		}

		internal static bool Parse(string s, NumberStyles style, IFormatProvider fp, bool tryParse, out int result, out Exception exc) {
			result = 0;
			exc = null;

			if (s == null) {
				if (!tryParse) {
					exc = GetFormatException();
				}
				return false;
			}

			if (s == null) {
				if (!tryParse) {
					exc = new ArgumentNullException();
				}
				return false;
			}

			if (s.Length == 0) {
				if (!tryParse) {
					exc = GetFormatException();
				}
				return false;
			}

			NumberFormatInfo nfi;
			if (fp != null) {
				Type typeNFI = typeof(System.Globalization.NumberFormatInfo);
				nfi = (NumberFormatInfo)fp.GetFormat(typeNFI);
			} else {
				nfi = Thread.CurrentThread.CurrentCulture.NumberFormat;
			}
			if (!CheckStyle(style, tryParse, ref exc)) {
				return false;
			}
			bool AllowCurrencySymbol = (style & NumberStyles.AllowCurrencySymbol) != 0;
			bool AllowHexSpecifier = (style & NumberStyles.AllowHexSpecifier) != 0;
			bool AllowThousands = (style & NumberStyles.AllowThousands) != 0;
			bool AllowDecimalPoint = (style & NumberStyles.AllowDecimalPoint) != 0;
			bool AllowParentheses = (style & NumberStyles.AllowParentheses) != 0;
			bool AllowTrailingSign = (style & NumberStyles.AllowTrailingSign) != 0;
			bool AllowLeadingSign = (style & NumberStyles.AllowLeadingSign) != 0;
			bool AllowTrailingWhite = (style & NumberStyles.AllowTrailingWhite) != 0;
			bool AllowLeadingWhite = (style & NumberStyles.AllowLeadingWhite) != 0;
			bool AllowExponent = (style & NumberStyles.AllowExponent) != 0;

			int pos = 0;

			if (AllowLeadingWhite && !JumpOverWhite(ref pos, s, true, tryParse, ref exc)) {
				return false;
			}

			bool foundOpenParentheses = false;
			bool negative = false;
			bool foundSign = false;
			bool foundCurrency = false;

			// Pre-number stuff
			if (AllowParentheses && s[pos] == '(') {
				foundOpenParentheses = true;
				foundSign = true;
				negative = true; // MS always make the number negative when there parentheses
				// even when NumberFormatInfo.NumberNegativePattern != 0!!!
				pos++;
				if (AllowLeadingWhite && !!JumpOverWhite(ref pos, s, true, tryParse, ref exc)) {
					return false;
				}
				if (s.Substring(pos, nfi.NegativeSign.Length) == nfi.NegativeSign) {
					if (!tryParse) {
						exc = GetFormatException();
					}
					return false;
				}

				if (s.Substring(pos, nfi.PositiveSign.Length) == nfi.PositiveSign) {
					if (!tryParse) {
						exc = GetFormatException();
					}
					return false;
				}
			}

			if (AllowLeadingSign && !foundSign) {
				// Sign + Currency
				FindSign(ref pos, s, nfi, ref foundSign, ref negative);
				if (foundSign) {
					if (AllowLeadingWhite && !JumpOverWhite(ref pos, s, true, tryParse, ref exc)) {
						return false;
					}
					if (AllowCurrencySymbol) {
						FindCurrency(ref pos, s, nfi, ref foundCurrency);
						if (foundCurrency && AllowLeadingWhite && !JumpOverWhite(ref pos, s, true, tryParse, ref exc)) {
							return false;
						}
					}
				}
			}

			if (AllowCurrencySymbol && !foundCurrency) {
				// Currency + sign
				FindCurrency(ref pos, s, nfi, ref foundCurrency);
				if (foundCurrency) {
					if (AllowLeadingWhite && !JumpOverWhite(ref pos, s, true, tryParse, ref exc)) {
						return false;
					}
					if (foundCurrency) {
						if (!foundSign && AllowLeadingSign) {
							FindSign(ref pos, s, nfi, ref foundSign, ref negative);
							if (foundSign && AllowLeadingWhite && !JumpOverWhite(ref pos, s, true, tryParse, ref exc)) {
								return false;
							}
						}
					}
				}
			}

			int number = 0;
			int nDigits = 0;
			bool decimalPointFound = false;
			int digitValue;
			char hexDigit;

			// Number stuff
			do {
				if (!ValidDigit(s[pos], AllowHexSpecifier)) {
					if (AllowThousands && FindOther(ref pos, s, nfi.NumberGroupSeparator)) {
						continue;
					} else {
						if (!decimalPointFound && AllowDecimalPoint && FindOther(ref pos, s, nfi.NumberDecimalSeparator)) {
							decimalPointFound = true;
							continue;
						}
					}
					break;
				} else if (AllowHexSpecifier) {
					nDigits++;
					hexDigit = s[pos++];
					if (Char.IsDigit(hexDigit)) {
						digitValue = (int)(hexDigit - '0');
					} else if (Char.IsLower(hexDigit)) {
						digitValue = (int)(hexDigit - 'a' + 10);
					} else {
						digitValue = (int)(hexDigit - 'A' + 10);
					}
					uint unumber = (uint)number;
					try {
						number = (int)checked(unumber * 16u + (uint)digitValue);
					} catch (OverflowException e) {
						exc = e;
						return false;
					}
				} else if (decimalPointFound) {
					nDigits++;
					// Allows decimal point as long as it's only 
					// followed by zeroes.
					if (s[pos++] != '0') {
						if (!tryParse) {
							exc = new OverflowException("Value too large or too small.");
						}
						return false;
					}
				} else {
					nDigits++;

					try {
						// Calculations done as negative
						// (abs (MinValue) > abs (MaxValue))
						number = checked(
							number * 10 -
							(int)(s[pos++] - '0')
							);
					} catch (OverflowException) {
						if (!tryParse) {
							exc = new OverflowException("Value too large or too small.");
						}
						return false;
					}
				}
			} while (pos < s.Length);

			// Post number stuff
			if (nDigits == 0) {
				if (!tryParse) {
					exc = GetFormatException();
				}
				return false;
			}

			if (AllowExponent) {
				FindExponent(ref pos, s);
			}
			if (AllowTrailingSign && !foundSign) {
				// Sign + Currency
				FindSign(ref pos, s, nfi, ref foundSign, ref negative);
				if (foundSign) {
					if (AllowTrailingWhite && !JumpOverWhite(ref pos, s, true, tryParse, ref exc)) {
						return false;
					}
					if (AllowCurrencySymbol) {
						FindCurrency(ref pos, s, nfi, ref foundCurrency);
					}
				}
			}

			if (AllowCurrencySymbol && !foundCurrency) {
				// Currency + sign
				FindCurrency(ref pos, s, nfi, ref foundCurrency);
				if (foundCurrency) {
					if (AllowTrailingWhite && !JumpOverWhite(ref pos, s, true, tryParse, ref exc)) {
						return false;
					}
					if (!foundSign && AllowTrailingSign) {
						FindSign(ref pos, s, nfi, ref foundSign, ref negative);
					}
				}
			}

			if (AllowTrailingWhite && pos < s.Length && !JumpOverWhite(ref pos, s, false, tryParse, ref exc)) {
				return false;
			}

			if (foundOpenParentheses) {
				if (pos >= s.Length || s[pos++] != ')') {
					if (!tryParse) {
						exc = GetFormatException();
					}
					return false;
				}
				if (AllowTrailingWhite && pos < s.Length && !JumpOverWhite(ref pos, s, false, tryParse, ref exc)) {
					return false;
				}
			}

			if (pos < s.Length && s[pos] != '\u0000') {
				if (!tryParse) {
					exc = GetFormatException();
				}
				return false;
			}

			if (!negative && !AllowHexSpecifier) {
				number = checked(-number);
			}

			result = number;

			return true;
		}

	}
}

#endif
