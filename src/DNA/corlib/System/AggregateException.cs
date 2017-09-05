using System;
using System.Collections.Generic;
using System.Text;

namespace System {

    public class AggregateException : Exception {

        List<Exception> _innerExceptions = new List<Exception> ();
        const string defaultMessage = "One or more errors occured";

        public AggregateException(Exception exception)
            : this(defaultMessage, exception)
        {
        }

		public AggregateException (IEnumerable<Exception> innerExceptions)
			: this (defaultMessage, new List<Exception> (innerExceptions).ToArray ())
		{
		}

        public AggregateException (string message, params Exception[] innerExceptions)
            : base (message, innerExceptions == null || innerExceptions.Length == 0 ? null : innerExceptions[0])
        {
            if (innerExceptions == null)
                throw new ArgumentNullException ("innerExceptions");
            foreach (var exception in innerExceptions)
                if (exception == null)
                    throw new ArgumentException ("One of the inner exception is null", "innerExceptions");
            _innerExceptions.AddRange (innerExceptions);
        }

        public IReadOnlyCollection<Exception> InnerExceptions {
            get { return _innerExceptions; }
        }
    }
}
