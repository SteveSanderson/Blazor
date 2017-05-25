using System.Threading.Tasks;

namespace System.Runtime.CompilerServices
{
    public struct TaskAwaiter : INotifyCompletion, ICriticalNotifyCompletion
    {
        private readonly Task _owner;

        internal TaskAwaiter(Task owner)
        {
            _owner = owner;
        }

        public void OnCompleted(Action continuation)
        {
            _owner.ContinueWith(_ => continuation());
        }

        public void UnsafeOnCompleted(Action continuation)
        {
            OnCompleted(continuation);
        }

        public bool IsCompleted => _owner.IsCompleted;

        public void GetResult()
        {
            var evaluated = _owner.Result;
        }
    }

    public struct TaskAwaiter<T> : INotifyCompletion, ICriticalNotifyCompletion
    {
        private readonly Task<T> _owner;

        internal TaskAwaiter(Task<T> owner)
        {
            _owner = owner;
        }

        public void OnCompleted(Action continuation)
        {
            _owner.ContinueWith(_ => continuation());
        }

        public void UnsafeOnCompleted(Action continuation)
        {
            OnCompleted(continuation);
        }

        public bool IsCompleted => _owner.IsCompleted;

        public T GetResult()
        {
            return _owner.Result;
        }
    }
}
