using System;
using System.Collections.Generic;
using System.Text;

namespace System {
    public class OperationCanceledException : Exception {
        public OperationCanceledException(String message)
            : base(message) { }
    }
}
