using System;
using System.Collections.Generic;
using System.Text;

namespace System.Threading.Tasks {

    public class TaskCompletionSource<T> {

        private Task<T> _task = new Task<T>();

        public Task<T> Task => _task;

        static void ThrowInvalidException () {
            throw new InvalidOperationException ("The underlying Task is already in one of the three final states: RanToCompletion, Faulted, or Canceled.");
        }

        public void SetResult(T result) {
            if (!TrySetResult (result)) {
                ThrowInvalidException ();
            }
        }
        
        public void SetCanceled () {
            if (!TrySetCanceled ()) {
                ThrowInvalidException ();
            }
        }

        public void SetException (Exception exception) {
            if (!TrySetException (exception)) {
                ThrowInvalidException ();
            }
        }

        public void SetException (IEnumerable<Exception> exceptions) {
            if (!TrySetException (exceptions))
                ThrowInvalidException ();
        }

        public Task<T> FromResult(T i) {
            return Task;
        }

        // Note: Don't add a generic param here (e.g., TrySetResult<TResult>) because it triggers
        // some bug in the DNA runtime leading to crashes at the start of any method that contains
        // a call to this.
        internal bool TrySetResult(object result) {
            if (_task.IsCompleted) {
                return false;
            }
            else {
                _task.MarkCompleted(result);
                return true;
            }
        }

        internal bool TrySetCanceled() {
            throw new NotImplementedException("Task cancellation");
        }

        internal bool TrySetException(Exception exception) {
            if (exception == null)
                throw new ArgumentNullException ("exception");

            if (_task.IsCompleted) {
                return false;
            }
            else {
                _task.MarkFailed(exception);
                return true;
            }
        }

        internal bool TrySetException (IEnumerable<Exception> exceptions) {
            if (exceptions == null)
                throw new ArgumentNullException ("exceptions");

            var aggregate = new AggregateException (exceptions);
            if (aggregate.InnerExceptions.Count == 0)
                throw new ArgumentNullException ("exceptions");

            return TrySetException (aggregate);
        }
    }
}
