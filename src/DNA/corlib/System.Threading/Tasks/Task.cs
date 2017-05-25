using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace System.Threading.Tasks
{
    /// <summary>
    /// This is a highly incomplete approximation to System.Threading.Tasks.Task. It can only handle
    /// 'ContinueWith' continuations that themselves return void (not nested tasks). Various other Task
    /// features aren't implemented (e.g., evaluating .Result to block until a result is available).
    /// 
    /// For a proper implementation, consider pulling in the real Task sources that were backported to
    /// .NET 3.5 or later. The functionality provied here is only sufficient for experimentation.
    /// </summary>
    public class Task
    {
        private List<object> _continuations = new List<object>();
        private object _result;
        private Exception _exception;

        public bool IsCompleted { get; private set; }

        public bool IsFaulted => _exception != null;

        public AggregateException Exception => _exception != null ? new AggregateException(_exception) : null;

        public object Result
        {
            get
            {
                if (!IsCompleted)
                {
                    throw new InvalidOperationException("Not implemented: blocking until result is ready.");
                }
                
                if (_exception != null)
                {
                    throw _exception;
                }

                return _result;
            }
        }

        internal void MarkCompleted(object result)
        {
            _result = result;
            InvokeContinuations();
        }

        internal void MarkFailed(Exception ex)
        {
            _exception = ex;
            InvokeContinuations();
        }

        protected Task ContinueWith(object continuation)
        {
            if (IsCompleted)
            {
                InvokeContinuation(continuation);
            }
            else
            {
                _continuations.Add(continuation);
            }

            return this; // TODO: Async continuations
        }

        public Task ContinueWith(Action<Task> continuation)
        {
            return ContinueWith((object)continuation);
        }

        private void InvokeContinuations()
        {
            IsCompleted = true;

            foreach (var continuation in _continuations)
            {
                InvokeContinuation(continuation);
            }

            _continuations.Clear();
        }

        protected virtual void InvokeContinuation(object continuation)
        {
            ((Action<Task>)continuation)(this);
        }

        public TaskAwaiter GetAwaiter()
        {
            return new TaskAwaiter(this);
        }

        public static Task Delay(int millisecondsTimeout)
        {
            var tcs = new TaskCompletionSource<object>();
            new Thread(_ =>
            {
                Thread.Sleep(millisecondsTimeout);
                tcs.TrySetResult(null);
            }).Start();
            return tcs.Task;
        }
    }

    public class Task<T> : Task
    {
        public new T Result => (T)base.Result;

        public Task ContinueWith(Action<Task<T>> continuation)
        {
            return ContinueWith((object)continuation);
        }

        protected override void InvokeContinuation(object continuation)
        {
            var typedContinuation = continuation as Action<Task<T>>;
            if (typedContinuation != null)
            {
                typedContinuation(this);
            }
            else
            {
                base.InvokeContinuation(continuation);
            }
        }

        public new TaskAwaiter<T> GetAwaiter()
        {
            return new TaskAwaiter<T>(this);
        }
    }
}