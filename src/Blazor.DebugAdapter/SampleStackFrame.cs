// © Microsoft. All rights reserved.

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol;
using Microsoft.VisualStudio.Shared.VSCodeDebugProtocol.Messages;

namespace SampleDebugAdapter
{
    internal class SampleStackFrame : SampleObject<StackFrame, StackFrameFormat>
    {
        #region Private Fields

        private List<SampleScope> childScopes;
        private IReadOnlyCollection<SampleScope> _scopes;

        private SampleScope argsScope;
        private SampleScope localsScope;

        #endregion

        #region Constructor

        internal SampleStackFrame(SampleDebugAdapter adapter, SampleModule module, string functionName, IEnumerable<SampleFunctionArgument> args, string fileName, int line, int column)
            : base(adapter)
        {
            this.childScopes = new List<SampleScope>();

            this.localsScope = new SampleScope(this.Adapter, "Locals", false);

            this.Module = module;
            this.FunctionName = functionName;
            this.FileName = fileName;
            this.Line = line;
            this.Column = column;

            if (args != null && args.Any())
            {
                this.Args = args.ToList();
                this.argsScope = new SampleScope(this.Adapter, "Arguments", false);

                foreach (SampleFunctionArgument arg in args)
                {
                    SimpleVariable variable = new SimpleVariable(
                        adapter: this.Adapter,
                        name: arg.Name,
                        type: arg.Type,
                        value: arg.Value);

                    this.argsScope.AddVariable(variable);
                }
            }
            else
            {
                this.Args = Enumerable.Empty<SampleFunctionArgument>().ToList(); ;
            }
        }

        #endregion

        internal SampleModule Module { get; private set; }
        internal string FunctionName { get; private set; }
        internal string FileName { get; private set; }
        internal int Line { get; set; }
        internal int Column { get; private set; }

        internal IReadOnlyCollection<SampleFunctionArgument> Args { get; private set; }

        internal int Id
        {
            get
            {
                return this.ProtocolObject?.Id ?? 0;
            }
        }

        #region Scopes

        internal void AddScope(SampleScope scope)
        {
            this.childScopes.Add(scope);
        }

        /// <summary>
        /// Returns the set of scopes to which user variables can be added
        /// </summary>
        internal IReadOnlyCollection<SampleScope> ModifiableScopes
        {
            get
            {
                List<SampleScope> scopes = new List<SampleScope>();

                scopes.Add(this.localsScope);
                scopes.AddRange(this.childScopes);

                return scopes;
            }
        }

        /// <summary>
        /// Returns the last set of scopes returned to the host
        /// </summary>
        internal IReadOnlyCollection<SampleScope> MergedScopes
        {
            get { return this._scopes; }
        }

        /// <summary>
        /// Returns the set of all scopes belonging to this stack frame
        /// </summary>
        internal IReadOnlyCollection<SampleScope> AllScopes
        {
            get
            {
                List<SampleScope> scopes = new List<SampleScope>();

                if (this.argsScope != null)
                {
                    scopes.Add(this.argsScope);
                }

                scopes.Add(this.localsScope);
                scopes.Add(this.Adapter.GlobalsScope);
                scopes.AddRange(this.childScopes);

                return scopes;
            }
        }

        private IEnumerable<SampleScope> GetScopes()
        {
            SampleScope aggregateScope = null;

            if (this.argsScope != null && this.argsScope.ChildContainers.Any())
            {
                if (this.Adapter.UseArgsScope)
                {
                    // Returns the args directly
                    yield return this.argsScope;
                }
                else
                {
                    // Merge the args into an aggregate scope
                    if (aggregateScope == null)
                    {
                        aggregateScope = new SampleScope(this.Adapter, "Locals", false);
                    }

                    foreach (SampleVariable variable in this.argsScope.ChildContainers)
                    {
                        aggregateScope.AddVariable(variable);
                    }
                }
            }

            if (this.Adapter.GlobalsScope != null && this.Adapter.GlobalsScope.ChildContainers.Any() && this.Adapter.ShowGlobals)
            {
                if (this.Adapter.UseGlobalsScope)
                {
                    // Return the globals directly
                    yield return this.Adapter.GlobalsScope;
                }
                else
                {
                    // Merge the globals into an aggregate scope
                    if (aggregateScope == null)
                    {
                        aggregateScope = new SampleScope(this.Adapter, "Locals", false);
                    }

                    foreach (SampleVariable variable in this.Adapter.GlobalsScope.ChildContainers)
                    {
                        aggregateScope.AddVariable(variable);
                    }
                }
            }

            if (aggregateScope != null)
            {
                // We're already aggregating other scopes, so merge the Locals as well
                foreach (SampleVariable variable in this.localsScope.ChildContainers)
                {
                    aggregateScope.AddVariable(variable);
                }

                yield return aggregateScope;
            }
            else
            {
                yield return this.localsScope;
            }

            foreach (SampleScope scope in this.childScopes)
            {
                yield return scope;
            }
        }

        #endregion

        #region SampleObject Implementation

        public override void Invalidate()
        {
            base.Invalidate();

            if (this._scopes != null)
            {
                foreach (SampleScope scope in this._scopes)
                {
                    scope.Invalidate();
                }

                this._scopes = null;
            }
        }

        protected override bool IsSameFormat(StackFrameFormat a, StackFrameFormat b)
        {
            if (Object.ReferenceEquals(null, a) || Object.ReferenceEquals(null, b))
                return Object.ReferenceEquals(a, b);
            return a.Hex == b.Hex &&
                   a.Line == b.Line &&
                   a.Module == b.Module &&
                   a.ParameterNames == b.ParameterNames &&
                   a.Parameters == b.Parameters &&
                   a.ParameterTypes == b.ParameterTypes &&
                   a.ParameterValues == b.ParameterValues;
        }

        protected override StackFrame CreateProtocolObject()
        {
            StringBuilder stackName = new StringBuilder();

            StackFrameFormat format = this.Format;

            bool showInHex = format?.Hex ?? false;
            bool showModule = format?.Module ?? false;
            bool showParameters = format?.Parameters ?? false;
            bool showNames = format?.ParameterNames ?? false;
            bool showTypes = format?.ParameterTypes ?? false;
            bool showValue = format?.ParameterValues ?? false;
            bool showLine = format?.Line ?? false;

            if (showModule && this.Module != null)
            {
                stackName.Append(this.Module.Name);
                stackName.Append("::");
            }

            stackName.Append(this.FunctionName);

            if (showParameters)
            {
                stackName.Append("(");

                if (this.Args.Any() && (showNames || showTypes || showValue))
                {
                    foreach (SampleFunctionArgument arg in this.Args)
                    {
                        if (showTypes)
                        {
                            stackName.Append(arg.Type);
                        }

                        if (showNames)
                        {
                            if (showTypes)
                            {
                                stackName.Append(" ");
                            }
                            stackName.Append(arg.Name);
                        }

                        if (showValue)
                        {
                            if (showNames)
                            {
                                stackName.Append(" = ");
                            }
                            else if (showTypes)
                            {
                                stackName.Append(" ");
                            }
                            stackName.Append(SimpleVariable.ShowAsHex(showInHex, arg.Value));
                        }

                        stackName.Append(", ");
                    }

                    stackName.Length -= 2;
                }

                stackName.Append(")");
            }

            if (showLine)
            {
                stackName.Append(" Line: ");
                stackName.Append(this.Line);
            }

            // If an existing protocol object exists reuse the id
            int id = this.ProtocolObject?.Id ?? this.Adapter.GetNextId();

            return new StackFrame(
                id: id,
                name: stackName.ToString(),
                line: this.Line,
                column: this.Column,
                source: new Source(
                    name: Path.GetFileName(this.FileName),
                    path: this.FileName),
                moduleId: (this.Module != null) ? this.Module.Id : null);
        }

        #endregion

        #region Protocol Implementation

        internal ScopesResponse HandleScopesRequest(ScopesArguments arguments)
        {
            if (this._scopes == null)
            {
                this._scopes = this.GetScopes().ToList();
            }

            return new ScopesResponse(scopes: this._scopes.Select(s => s.GetProtocolObject(new object())).ToList());
        }

        internal EvaluateResponse HandleEvaluateRequest(EvaluateArguments arguments)
        {
            return this.Evaluate(arguments.Expression, null, arguments.Format);
        }

        internal SetExpressionResponse HandleSetExpressionRequest(SetExpressionArguments arguments)
        {
            EvaluateResponse response = this.Evaluate(arguments.Expression, arguments.Value, arguments.Format);
            return new SetExpressionResponse(value: response.Result);
        }

        private EvaluateResponse Evaluate(string expression, string value, ValueFormat format)
        {
            ISampleVariableContainer container = null;
            string variableName = null;

            if (!expression.Contains("~"))
            {
                // Not a delimted expression = assume we're using the locals scope
                container = this.localsScope;
                variableName = expression;
            }
            else
            {
                List<string> evalParts = expression.Split('~').Select(p => p.Trim()).ToList();
                variableName = evalParts.Last();

                // Right now, we only support expressions that retrieve variables
                foreach (string part in evalParts.Take(evalParts.Count - 1))
                {
                    if (container == null)
                    {
                        container = this.AllScopes.FirstOrDefault(s => String.Equals(s.Name, part, StringComparison.Ordinal));
                    }
                    else
                    {
                        container = container.ChildContainers.FirstOrDefault(c => String.Equals(c.Name, part, StringComparison.Ordinal));
                    }

                    if (container == null)
                    {
                        throw new ProtocolException("Evaluation failed!");
                    }
                }
            }

            SampleVariable variable = container.Variables.FirstOrDefault(v => String.Equals(v.Name, variableName, StringComparison.Ordinal));
            if (variable == null)
            {
                throw new ProtocolException("Evaluation failed!");
            }

            if (value != null)
            {
                if (variable.IsReadOnly)
                {
                    throw new ProtocolException("Expression is read-only.");
                }
                variable.SetValue(value);
            }

            EvaluationAttributes attributes = null;
            if (variable.IsReadOnly)
            {
                attributes = new EvaluationAttributes();
                attributes.IsReadOnly = variable.IsReadOnly;
            }

            return new EvaluateResponse(
                result: variable.GetValue(format?.Hex ?? false),
                variablesReference: variable.VariableReference,
                type: variable.Type,
                evaluationAttribute: attributes);
        }

        #endregion
    }

    internal class SampleFunctionArgument
    {
        internal SampleFunctionArgument(string type, string name, string value)
        {
            this.Type = type;
            this.Name = name;
            this.Value = value;
        }

        internal string Type { get; private set; }
        internal string Name { get; private set; }
        internal string Value { get; private set; }
    }
}
