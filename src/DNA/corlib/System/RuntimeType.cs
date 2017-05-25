// Copyright (c) 2012 DotNetAnywhere
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#if !LOCALTEST

using System.Runtime.CompilerServices;
using System.Text;
using System.Collections.Generic;

namespace System {

	class RuntimeType : Type {

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private RuntimeType GetNestingParentType();

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern private RuntimeType Internal_GetGenericTypeDefinition();

		extern public override Type BaseType {
			[MethodImpl(MethodImplOptions.InternalCall)]
			get;
		}

		public extern override bool IsEnum {
			[MethodImpl(MethodImplOptions.InternalCall)]
			get;
		}

		extern public override string Namespace {
			[MethodImpl(MethodImplOptions.InternalCall)]
			get;
		}

		extern public override string Name {
			[MethodImpl(MethodImplOptions.InternalCall)]
			get;
		}

		public override string FullName {
			get {
				StringBuilder ret = new StringBuilder(32);
				ret.Append(this.Namespace);
				ret.Append('.');
				RuntimeType nestingParentType = this.GetNestingParentType();
				if (nestingParentType != null) {
					List<Type> nestingParents = new List<Type>();
					nestingParents.Add(nestingParentType);
					nestingParentType = nestingParentType.GetNestingParentType();
					while (nestingParentType != null) {
						nestingParents.Add(nestingParentType);
						nestingParentType = nestingParentType.GetNestingParentType();
					}
					for (int ofs = nestingParents.Count - 1; ofs >= 0; ofs--) {
						ret.Append(nestingParents[ofs].Name);
						ret.Append('+');
					}
				}
				ret.Append(this.Name);
				return ret.ToString();
			}
		}

		extern public override bool IsGenericType {
			[MethodImpl(MethodImplOptions.InternalCall)]
			get;
		}

		public override Type GetGenericTypeDefinition() {
			if (!this.IsGenericType) {
				throw new InvalidOperationException("This is not a generic type");
			}
			return this.Internal_GetGenericTypeDefinition();
		}

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public override Type[] GetGenericArguments();

        [MethodImpl(MethodImplOptions.InternalCall)]
        extern public override Type GetElementType();

    }

}

#endif
