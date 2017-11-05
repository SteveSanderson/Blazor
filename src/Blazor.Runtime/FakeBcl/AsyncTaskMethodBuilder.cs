using System;
using System.Runtime.CompilerServices;

namespace Blazor.Runtime.FakeBcl
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

        public void SetStateMachine(IAsyncStateMachine stateMachine)
        {
            m_builder.SetStateMachine(stateMachine);
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