// From https://github.com/Microsoft/referencesource
// See copyright and license details in that repo

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Provides a builder for asynchronous methods that return void.
    /// This type is intended for compiler use only.
    /// </summary>
    public struct AsyncVoidMethodBuilder : IAsyncMethodBuilder
    {
        /// <summary>State related to the IAsyncStateMachine.</summary>
        private AsyncMethodBuilderCore m_coreState; // mutable struct: must not be readonly
        /// <summary>An object used by the debugger to uniquely identify this builder.  Lazily initialized.</summary>
        private object m_objectIdForDebugger;

        /// <summary>Initializes a new <see cref="AsyncVoidMethodBuilder"/>.</summary>
        /// <returns>The initialized <see cref="AsyncVoidMethodBuilder"/>.</returns>
        public static AsyncVoidMethodBuilder Create()
        {
            // Capture the current sync context.  If there isn't one, use the dummy s_noContextCaptured
            // instance; this allows us to tell the state of no captured context apart from the state
            // of an improperly constructed builder instance.
            return new AsyncVoidMethodBuilder(null);
        }

        /// <summary>Initializes the <see cref="AsyncVoidMethodBuilder"/>.</summary>
        /// <param name="synchronizationContext">The synchronizationContext associated with this operation. This may be null.</param>
        private AsyncVoidMethodBuilder(object ignored)
        {
            m_coreState = default(AsyncMethodBuilderCore);
            m_objectIdForDebugger = null;
        }

        /// <summary>Initiates the builder's execution with the associated state machine.</summary>
        /// <typeparam name="TStateMachine">Specifies the type of the state machine.</typeparam>
        /// <param name="stateMachine">The state machine instance, passed by reference.</param>
        /// <exception cref="System.ArgumentNullException">The <paramref name="stateMachine"/> argument was null (Nothing in Visual Basic).</exception>
        public void Start<TStateMachine>(ref TStateMachine stateMachine) where TStateMachine : IAsyncStateMachine
        {
            m_coreState.Start(ref stateMachine); // argument validation handled by AsyncMethodBuilderCore
        }

        /// <summary>Associates the builder with the state machine it represents.</summary>
        /// <param name="stateMachine">The heap-allocated state machine object.</param>
        /// <exception cref="System.ArgumentNullException">The <paramref name="stateMachine"/> argument was null (Nothing in Visual Basic).</exception>
        /// <exception cref="System.InvalidOperationException">The builder is incorrectly initialized.</exception>
        public void SetStateMachine(IAsyncStateMachine stateMachine)
        {
            m_coreState.SetStateMachine(stateMachine); // argument validation handled by AsyncMethodBuilderCore
        }

        /// <summary>Perform any initialization necessary prior to lifting the builder to the heap.</summary>
        void IAsyncMethodBuilder.PreBoxInitialization() { /* no initialization is necessary for AsyncVoidMethodBuilder */ }

        /// <summary>
        /// Schedules the specified state machine to be pushed forward when the specified awaiter completes.
        /// </summary>
        /// <typeparam name="TAwaiter">Specifies the type of the awaiter.</typeparam>
        /// <typeparam name="TStateMachine">Specifies the type of the state machine.</typeparam>
        /// <param name="awaiter">The awaiter.</param>
        /// <param name="stateMachine">The state machine.</param>
        public void AwaitOnCompleted<TAwaiter, TStateMachine>(
            ref TAwaiter awaiter, ref TStateMachine stateMachine)
            where TAwaiter : INotifyCompletion
            where TStateMachine : IAsyncStateMachine
        {
            try
            {
                var continuation = m_coreState.GetCompletionAction(ref this, ref stateMachine);
                awaiter.OnCompleted(continuation);
            }
            catch (Exception exc)
            {
                // Prevent exceptions from leaking to the call site, which could
                // then allow multiple flows of execution through the same async method
                // if the awaiter had already scheduled the continuation by the time
                // the exception was thrown.  We propagate the exception on the
                // ThreadPool because we can trust it to not throw, unlike
                // if we were to go to a user-supplied SynchronizationContext,
                // whose Post method could easily throw.
                AsyncServices.ThrowAsync(exc, targetContext: null);
            }
        }

        /// <summary>
        /// Schedules the specified state machine to be pushed forward when the specified awaiter completes.
        /// </summary>
        /// <typeparam name="TAwaiter">Specifies the type of the awaiter.</typeparam>
        /// <typeparam name="TStateMachine">Specifies the type of the state machine.</typeparam>
        /// <param name="awaiter">The awaiter.</param>
        /// <param name="stateMachine">The state machine.</param>
        public void AwaitUnsafeOnCompleted<TAwaiter, TStateMachine>(
            ref TAwaiter awaiter, ref TStateMachine stateMachine)
            where TAwaiter : ICriticalNotifyCompletion
            where TStateMachine : IAsyncStateMachine
        {
            try
            {
                var continuation = m_coreState.GetCompletionAction(ref this, ref stateMachine);
                awaiter.UnsafeOnCompleted(continuation);
            }
            catch (Exception e)
            {
                AsyncServices.ThrowAsync(e, targetContext: null);
            }
        }

        /// <summary>Completes the method builder successfully.</summary>
        public void SetResult()
        {
        }

        /// <summary>Faults the method builder with an exception.</summary>
        /// <param name="exception">The exception that is the cause of this fault.</param>
        /// <exception cref="System.ArgumentNullException">The <paramref name="exception"/> argument is null (Nothing in Visual Basic).</exception>
        /// <exception cref="System.InvalidOperationException">The builder is not initialized.</exception>
        public void SetException(Exception exception)
        {
            if (exception == null) throw new ArgumentNullException("exception");
            
            // Otherwise, queue the exception to be thrown on the ThreadPool.  This will
            // result in a crash unless legacy exception behavior is enabled by a config
            // file or a CLR host.
            AsyncServices.ThrowAsync(exception, targetContext: null);
        }

        /// <summary>
        /// Gets an object that may be used to uniquely identify this builder to the debugger.
        /// </summary>
        /// <remarks>
        /// This property lazily instantiates the ID in a non-thread-safe manner.  
        /// It must only be used by the debugger and only in a single-threaded manner.
        /// </remarks>
        private object ObjectIdForDebugger
        {
            get
            {
                if (m_objectIdForDebugger == null) m_objectIdForDebugger = new object();
                return m_objectIdForDebugger;
            }
        }
    }

}