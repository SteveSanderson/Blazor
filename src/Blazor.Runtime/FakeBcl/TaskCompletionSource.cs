using System;

namespace Blazor.Runtime.FakeBcl
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

        public Task<T> FromResult(T i)
        {
            return Task;
        }

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
