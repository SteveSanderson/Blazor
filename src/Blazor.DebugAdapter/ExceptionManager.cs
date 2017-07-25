// © Microsoft. All rights reserved.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol.Messages;
using Ookii.CommandLine;
using static System.FormattableString;

namespace SampleDebugAdapter
{
    internal class ExceptionManager
    {
        private SampleDebugAdapter adapter;
        private ExceptionInfoResponse pendingException;

        private class ExceptionCategorySettings
        {
            private Dictionary<string, ExceptionBreakMode> exceptionSettings;

            public ExceptionCategorySettings(string categoryId)
            {
                this.CategoryId = categoryId;

                this.exceptionSettings = new Dictionary<string, ExceptionBreakMode>();
            }

            public string CategoryId { get; private set; }
            public ExceptionBreakMode CategoryBreakMode { get; set; }

            internal void SetExceptionBreakMode(string exception, ExceptionBreakMode breakMode)
            {
                this.exceptionSettings.Add(exception, breakMode);
            }

            internal ExceptionBreakMode GetExceptionBreakMode(string exception)
            {
                ExceptionBreakMode mode;
                if (this.exceptionSettings.TryGetValue(exception, out mode))
                {
                    return mode;
                }

                return this.CategoryBreakMode;
            }

            public override string ToString()
            {
                return Invariant($"{this.CategoryId:D}: {this.CategoryBreakMode}");
            }
        }

        private Dictionary<string, ExceptionCategorySettings> exceptionCategorySettings;

        internal ExceptionManager(SampleDebugAdapter adapter)
        {
            this.adapter = adapter;
            this.exceptionCategorySettings = new Dictionary<string, ExceptionCategorySettings>();

            this.adapter.RegisterDirective<ThrowArgs>("throw", this.DoThrow);
        }

        internal bool HasPendingException
        {
            get { return this.pendingException != null; }
        }

        internal int PendingExceptionThread { get; private set; }

        internal void Invalidate()
        {
            this.pendingException = null;
        }

        internal ExceptionInfoResponse HandleExceptionInfoRequest(ExceptionInfoArguments arguments)
        {
            if (this.PendingExceptionThread == arguments.ThreadId)
            {
                return this.pendingException;
            }

            return new ExceptionInfoResponse();
        }

        #region Throw Directive

        public enum ExceptionType
        {
            Caught,
            UserUncaught,
            Uncaught,
        }

        private class ThrowArgs
        {
            [CommandLineArgument("exceptionId", IsRequired = true, Position = 0)]
            public string ExceptionId { get; set; }

            [CommandLineArgument("threadId", IsRequired = false)]
            public int ThreadId { get; set; }

            [CommandLineArgument("description", IsRequired = false)]
            public string Description { get; set; }

            [CommandLineArgument("code", IsRequired = false)]
            public int? Code { get; set; }

            [CommandLineArgument("type", IsRequired = false)]
            public ExceptionType? Type { get; set; }
        }

        private bool DoThrow(ThrowArgs args, StringBuilder output)
        {
            SampleThread thread = this.adapter.ThreadManager.GetThread(args.ThreadId);
            if (thread == null)
            {
                output.AppendLine(Invariant($"Unknown thread id '{args.ThreadId}'!"));
                return false;
            }

            if (this.HasPendingException)
            {
                output.AppendLine("Exception is already pending!");
                return false;
            }

            if (!args.ExceptionId.Contains("/"))
            {
                output.AppendLine("Expected ExceptionId to be of form 'Category/Exception'!");
                return false;
            }

            ExceptionBreakMode breakMode = ExceptionBreakMode.Always;
            if (args.Type != null)
            {
                switch (args.Type.Value)
                {
                    case ExceptionType.Caught:
                        breakMode = ExceptionBreakMode.Always;
                        break;

                    case ExceptionType.Uncaught:
                        breakMode = ExceptionBreakMode.Unhandled;
                        break;

                    case ExceptionType.UserUncaught:
                        // UserUncaught means the exception was caught in non-user code, so if JMC is turned off, treat it like any other
                        //  caught exception.
                        breakMode = (this.adapter.IsJustMyCodeOn ?? false) ? ExceptionBreakMode.UserUnhandled : ExceptionBreakMode.Always;
                        break;
                }
            }

            if (this.shouldThrow(args.ExceptionId, breakMode))
            {
                // Our configuration includes this exception - report it to the host
                this.PendingExceptionThread = args.ThreadId;
                this.pendingException = new ExceptionInfoResponse(
                    exceptionId: args.ExceptionId,
                    breakMode: breakMode,
                    description: args.Description,
                    code: args.Code);
            }
            else
            {
                output.AppendLine(Invariant($"Ignoring exception '{args.ExceptionId}' due to configuration."));
            }

            return true;
        }

        private bool shouldThrow(string exceptionId, ExceptionBreakMode breakMode)
        {
            string[] parts = exceptionId.Split('/');
            string category = parts.First();
            string name = parts.Last();

            ExceptionCategorySettings settings = null;
            if (!this.exceptionCategorySettings.TryGetValue(category, out settings))
            {
                // No configuration for this category - just send it to the host
                return true;
            }

            ExceptionBreakMode settingMode = settings.GetExceptionBreakMode(name);

            if (settingMode == ExceptionBreakMode.Always)
            {
                // Host always wants this exeception
                return true;
            }
            else if (settingMode == ExceptionBreakMode.Unhandled && breakMode == ExceptionBreakMode.Unhandled)
            {
                // Host wants this exception if it's unhandled
                return true;
            }
            else if (settingMode == ExceptionBreakMode.UserUnhandled && (breakMode == ExceptionBreakMode.Unhandled || breakMode == ExceptionBreakMode.UserUnhandled))
            {
                // Host wants this exception if it's not handled by the user
                return true;
            }

            return false;
        }

        internal SetExceptionBreakpointsResponse HandleSetExceptionBreakpointsRequest(SetExceptionBreakpointsArguments arguments)
        {
            //We assume that we'll only receive exception breakpoints in categories that interest us
            this.exceptionCategorySettings.Clear();

            foreach (ExceptionOptions options in arguments.ExceptionOptions)
            {
                // We assume all ExceptionPathSegments will reference a single category
                string category = options.Path?.FirstOrDefault()?.Names?.FirstOrDefault();

                if (String.IsNullOrEmpty(category))
                {
                    continue;
                }

                ExceptionCategorySettings settings = null;
                if (!this.exceptionCategorySettings.TryGetValue(category, out settings))
                {
                    settings = new ExceptionCategorySettings(category);
                    this.exceptionCategorySettings.Add(category, settings);
                }

                ExceptionPathSegment exceptions = options.Path.Skip(1).FirstOrDefault();

                if (exceptions != null)
                {
                    // Set break mode for individual exceptions
                    foreach (string exception in exceptions.Names)
                    {
                        settings.SetExceptionBreakMode(exception, options.BreakMode);
                    }
                }
                else
                {
                    // No path segments beyond the category - set the break mode for the category
                    settings.CategoryBreakMode = options.BreakMode;
                }
            }

            return new SetExceptionBreakpointsResponse();
        }

        #endregion
    }
}
