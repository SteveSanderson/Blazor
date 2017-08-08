// source: https://bitbucket.org/danipen/mono/src/master/mcs/class/corlib/System.IO/TextWriter.cs
// Copyright 2011 Xamarin Inc.

using System.Text;
using System.Runtime.InteropServices;

namespace System.IO {

    [Serializable]
    // [ComVisible (true)]
    public abstract class TextWriter : MarshalByRefObject, IDisposable {

        //
        // Null version of the TextWriter, for the `Null' instance variable
        //
        sealed class NullTextWriter : TextWriter {
            public override Encoding Encoding {
                get {
                    return Encoding.Default;
                }
            }

            public override void Write(string s) {
            }
            public override void Write(char value) {
            }
            public override void Write(char[] value, int index, int count) {
            }
        }

        protected TextWriter() {
            CoreNewLine = System.Environment.NewLine.ToCharArray();
        }

        protected TextWriter(IFormatProvider formatProvider) {
            CoreNewLine = System.Environment.NewLine.ToCharArray();
            internalFormatProvider = formatProvider;
        }

        protected char[] CoreNewLine;

        internal IFormatProvider internalFormatProvider;

        public static readonly TextWriter Null = new NullTextWriter();

        public abstract Encoding Encoding { get; }

        public virtual IFormatProvider FormatProvider {
            get {
                return internalFormatProvider;
            }
        }

        public virtual string NewLine {
            get {
                return new string(CoreNewLine);
            }

            set {
                if (value == null)
                    value = Environment.NewLine;

                CoreNewLine = value.ToCharArray();
            }
        }

        public virtual void Close() {
            Dispose(true);
        }

        protected virtual void Dispose(bool disposing) {
            if (disposing) {
                // If we are explicitly disposed, we can avoid finalization.
                GC.SuppressFinalize(this);
            }
        }
        public void Dispose() {
            Dispose(true);

            // If we are explicitly disposed, we can avoid finalization.
            GC.SuppressFinalize(this);
        }

        public virtual void Flush() {
            // do nothing
        }

        public static TextWriter Synchronized(TextWriter writer) {
            throw new NotImplementedException();
        }

        public virtual void Write(bool value) {
            Write(value.ToString());
        }

        public virtual void Write(char value) {
            // Do nothing
        }

        public virtual void Write(char[] buffer) {
            if (buffer == null)
                return;
            Write(buffer, 0, buffer.Length);
        }

        public virtual void Write(decimal value) {
            Write(value.ToString()); // .ToString(internalFormatProvider));
        }

        public virtual void Write(double value) {
            Write(value.ToString(internalFormatProvider));
        }

        public virtual void Write(int value) {
            Write(value.ToString(internalFormatProvider));
        }

        public virtual void Write(long value) {
            Write(value.ToString(internalFormatProvider));
        }

        public virtual void Write(object value) {
            if (value != null)
                Write(value.ToString());
        }

        public virtual void Write(float value) {
            Write(value.ToString(internalFormatProvider));
        }

        public virtual void Write(string value) {
            if (value != null)
                Write(value.ToCharArray());
        }

        // [CLSCompliant (false)]
        public virtual void Write(uint value) {
            Write(value.ToString(internalFormatProvider));
        }

        // [CLSCompliant (false)]
        public virtual void Write(ulong value) {
            Write(value.ToString(internalFormatProvider));
        }

        public virtual void Write(string format, object arg0) {
            Write(String.Format(format, arg0));
        }

        public virtual void Write(string format, params object[] arg) {
            Write(String.Format(format, arg));
        }

        public virtual void Write(char[] buffer, int index, int count) {
            if (buffer == null)
                throw new ArgumentNullException("buffer");
            if (index < 0 || index > buffer.Length)
                throw new ArgumentOutOfRangeException("index");
            // re-ordered to avoid possible integer overflow
            if (count < 0 || (index > buffer.Length - count))
                throw new ArgumentOutOfRangeException("count");

            for (; count > 0; --count, ++index) {
                Write(buffer[index]);
            }
        }

        public virtual void Write(string format, object arg0, object arg1) {
            Write(String.Format(format, arg0, arg1));
        }

        public virtual void Write(string format, object arg0, object arg1, object arg2) {
            Write(String.Format(format, arg0, arg1, arg2));
        }

        public virtual void WriteLine() {
            Write(CoreNewLine);
        }

        public virtual void WriteLine(bool value) {
            Write(value);
            WriteLine();
        }

        public virtual void WriteLine(char value) {
            Write(value);
            WriteLine();
        }

        public virtual void WriteLine(char[] buffer) {
            Write(buffer);
            WriteLine();
        }

        public virtual void WriteLine(decimal value) {
            Write(value);
            WriteLine();
        }

        public virtual void WriteLine(double value) {
            Write(value);
            WriteLine();
        }

        public virtual void WriteLine(int value) {
            Write(value);
            WriteLine();
        }

        public virtual void WriteLine(long value) {
            Write(value);
            WriteLine();
        }

        public virtual void WriteLine(object value) {
            Write(value);
            WriteLine();
        }

        public virtual void WriteLine(float value) {
            Write(value);
            WriteLine();
        }

        public virtual void WriteLine(string value) {
            Write(value);
            WriteLine();
        }

        // [CLSCompliant (false)]
        public virtual void WriteLine(uint value) {
            Write(value);
            WriteLine();
        }

        // [CLSCompliant (false)]
        public virtual void WriteLine(ulong value) {
            Write(value);
            WriteLine();
        }

        public virtual void WriteLine(string format, object arg0) {
            Write(format, arg0);
            WriteLine();
        }

        public virtual void WriteLine(string format, params object[] arg) {
            Write(format, arg);
            WriteLine();
        }

        public virtual void WriteLine(char[] buffer, int index, int count) {
            Write(buffer, index, count);
            WriteLine();
        }

        public virtual void WriteLine(string format, object arg0, object arg1) {
            Write(format, arg0, arg1);
            WriteLine();
        }

        public virtual void WriteLine(string format, object arg0, object arg1, object arg2) {
            Write(format, arg0, arg1, arg2);
            WriteLine();
        }

    }
}
