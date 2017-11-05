using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Blazor.Runtime.FakeBcl
{
    /// <summary>
    /// This is a highly incomplete approximation to System.Threading.Tasks.Task. It can only handle
    /// 'ContinueWith' continuations that themselves return void (not nested tasks). Various other Task
    /// features aren't implemented (e.g., evaluating .Result to block until a result is available).
    /// 
    /// This is only here because attempting to use the real Task APIs isn't yet supported on Mono-on-WASM,
    /// because internally they try to create a Thread, and Mono-on-WASM's Thread is hardcoded just to throw
    /// the error "WASM doesn't support threading" (https://github.com/mono/mono/blob/098f6e8aa8ead1a80b751fa34e5e049439c2f0c3/mono/utils/mono-threads-wasm.c#L78)
    ///
    /// In principle, Mono-on-WASM should be able to support Task either by providing a non-Thread-backed
    /// implementation, or by supporting threading like DNA does.
    /// </summary>
    [AsyncMethodBuilder(typeof(AsyncTaskMethodBuilder))]
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

        public FakeTaskAwaiter GetAwaiter()
        {
            return new FakeTaskAwaiter(this);
        }

        public static Task Delay(int millisecondsTimeout)
        {
            // Can't use actual threads on Mono-on-WASM yet. To implement this, would need
            // to call into JS and have it call back after the timeout.
            throw new NotImplementedException();
            /*
            var tcs = new TaskCompletionSource<object>();
            new Thread(_ =>
            {
                Thread.Sleep(millisecondsTimeout);
                tcs.TrySetResult(null);
            }).Start();
            return tcs.Task;
            */
        }
    }

    [AsyncMethodBuilder(typeof(AsyncTaskMethodBuilder<>))]
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
