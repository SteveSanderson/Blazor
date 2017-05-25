
#if LOCALTEST
using System;
using System_.Text;
namespace System_ {
#else
using System.Text;
namespace System {
#endif
	internal static class StringHelper {

		private static int ParseDecimal(string str, ref int ptr) {
			int p = ptr;
			int n = 0;
			while (true) {
				char c = str[p];
				if (c < '0' || c > '9') {
					break;
				}
				n = n * 10 + c - '0';
				++p;
			}
			if (p == ptr) {
				return -1;
			}
			ptr = p;
			return n;
		}

		private static void ParseFormatSpecifier(string str, ref int ptr, out int n, out int width, out bool leftAlign, out string format) {
			// parses format specifier of form:
			//   N,[\ +[-]M][:F]}
			//
			// where:
			try {
				// N = argument number (non-negative integer)
				n = ParseDecimal(str, ref ptr);
				if (n < 0) {
					throw new FormatException("Input string was not in a correct format.");
				}
				// M = width (non-negative integer)
				if (str[ptr] == ',') {
					// White space between ',' and number or sign.
					++ptr;
					while (char.IsWhiteSpace(str[ptr])) {
						++ptr;
					}
					int start = ptr;

					format = str.Substring(start, ptr - start);

					leftAlign = (str[ptr] == '-');
					if (leftAlign) {
						++ptr;
					}
					width = ParseDecimal(str, ref ptr);
					if (width < 0) {
						throw new FormatException("Input string was not in a correct format.");
					}
				} else {
					width = 0;
					leftAlign = false;
					format = string.Empty;
				}

				// F = argument format (string)

				if (str[ptr] == ':') {
					int start = ++ptr;
					while (str[ptr] != '}') {
						++ptr;
					}
					format += str.Substring(start, ptr - start);
				} else
					format = null;

				if (str[ptr++] != '}') {
					throw new FormatException("Input string was not in a correct format.");
				}
			} catch (IndexOutOfRangeException) {
				throw new FormatException("Input string was not in a correct format.");
			}
		}

		internal static void FormatHelper(StringBuilder result, IFormatProvider provider, string format, params object[] args) {

			if (format == null || args == null) {
				throw new ArgumentNullException();
			}

			int ptr = 0, start = 0, formatLen = format.Length;
			while (ptr < formatLen) {
				char c = format[ptr++];
				if (c == '{') {
					result.Append(format, start, ptr - start - 1);
					if (format[ptr] == '{') {
						// If a "{{" is found then it's not a format specifier, so just continue
						start = ptr++;
						continue;
					}
					// Start of format specifier, so parse it
					int n, width;
					bool leftAlign;
					string argFormat;

					ParseFormatSpecifier (format, ref ptr, out n, out width, out leftAlign, out argFormat);
					if (n >= args.Length) {
						throw new FormatException("Index (zero based) must be greater than or equal to zero and less than the size of the argument list.");
					}
					// Format the argument
					object arg = args[n];
					string str;
					ICustomFormatter formatter = null;
					if (provider != null) {
						formatter = provider.GetFormat(typeof(ICustomFormatter)) as ICustomFormatter;
					}
					if (arg == null) {
						str = string.Empty;
					} else if (formatter != null) {
						str = formatter.Format(argFormat, arg, provider);
					} else if (arg is IFormattable) {
						str = ((IFormattable)arg).ToString(argFormat, provider);
					} else {
						str = arg.ToString();
					}
					// Apply any padding needed and append to result
					if (width > str.Length) {
						int padLen = width - str.Length;
						if (leftAlign) {
							result.Append(str);
							result.Append(' ', padLen);
						} else {
							result.Append(' ', padLen);
							result.Append(str);
						}
					} else {
						result.Append(str);
					}
					start = ptr;
				} else if (c == '}') {
					if (ptr < formatLen && format[ptr] == '}') {
						// Handle case of "}}" appearing in the string
						result.Append(format, start, ptr - start - 1);
						start = ptr++;
					} else {
						// single "}" not allowed without "{" beforehand
						throw new FormatException("Input string was not of the correct format.");
					}
				}
			}

			if (start < formatLen) {
				result.Append(format, start, formatLen - start);
			}
		}

	}
}
