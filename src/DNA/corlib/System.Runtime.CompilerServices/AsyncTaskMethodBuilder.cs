// From https://github.com/Microsoft/referencesource
// See copyright and license details in that repo

using System.Threading.Tasks;

namespace System.Runtime.CompilerServices
{
    public struct AsyncTaskMethodBuilder
    {
        private readonly static TaskCompletionSource<VoidTaskResult> s_cachedCompleted = AsyncTaskMethodBuilder<VoidTaskResult>.s_defaultResultTask;

        private AsyncTaskMethodBuilder<VoidTaskResult> m_builder;

        public static AsyncTaskMethodBuilder Create()
        {
            return new AsyncTaskMethodBuilder();
        }

        public void Start<TStateMachine>(ref TStateMachine stateMachine) where TStateMachine : IAsyncStateMachine
        {
            m_builder.Start(ref stateMachine);
        }

        public Task Task { get { return m_builder.Task; } }

        public void AwaitOnCompleted<TAwaiter, TStateMachine>(
            ref TAwaiter awaiter, ref TStateMachine stateMachine)
            where TAwaiter : INotifyCompletion
            where TStateMachine : IAsyncStateMachine
        {
            m_builder.AwaitOnCompleted<TAwaiter, TStateMachine>(ref awaiter, ref stateMachine);
        }

        public void AwaitUnsafeOnCompleted<TAwaiter, TStateMachine>(
            ref TAwaiter awaiter, ref TStateMachine stateMachine)
            where TAwaiter : ICriticalNotifyCompletion
            where TStateMachine : IAsyncStateMachine
        {
            m_builder.AwaitUnsafeOnCompleted<TAwaiter, TStateMachine>(ref awaiter, ref stateMachine);
        }

        public void SetException(Exception exception) { m_builder.SetException(exception); }

        public void SetResult()
        {
            // Accessing AsyncTaskMethodBuilder.s_cachedCompleted is faster than
            // accessing AsyncTaskMethodBuilder<T>.s_defaultResultTask.
            m_builder.SetResult(s_cachedCompleted);
        }
    }
}
