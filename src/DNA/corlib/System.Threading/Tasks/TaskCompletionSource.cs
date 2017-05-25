using System;
using System.Collections.Generic;
using System.Text;

namespace System.Threading.Tasks
{
    public class TaskCompletionSource<T>
    {
        private Task<T> _task = new Task<T>();

        public Task<T> Task => _task;

        void SetResult(T result)
        {
            _task.MarkCompleted(result);
        }

        void SetException(Exception ex)
        {
            _task.MarkFailed(ex);
        }

        // Note: Don't add a generic param here (e.g., TrySetResult<TResult>) because it triggers
        // some bug in the DNA runtime leading to crashes at the start of any method that contains
        // a call to this.
        internal bool TrySetResult(object result)
        {
            if (_task.IsCompleted)
            {
                return false;
            }
            else
            {
                _task.MarkCompleted(result);
                return true;
            }
        }

        internal bool TrySetCanceled()
        {
            throw new NotImplementedException("Task cancellation");
        }

        internal bool TrySetException(Exception exception)
        {
            if (_task.IsCompleted)
            {
                return false;
            }
            else
            {
                _task.MarkFailed(exception);
                return true;
            }
        }
    }
}
