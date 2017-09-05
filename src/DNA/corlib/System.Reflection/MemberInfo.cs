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

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace System.Reflection {

    internal struct InternalCustomAttributeInfo {
#pragma warning disable 0649
        public Attribute UninitializedInstance;
        public MethodBase ConstructorMethodBase;
        public object[] ConstructorParams;
#pragma warning restore 0649
    }

	public abstract class MemberInfo : ICustomAttributeProvider {

#pragma warning disable 0169, 0649
		protected readonly Type _ownerType;
		protected readonly string _name;
#pragma warning restore 0169, 0649

	    protected MemberInfo() {
		}

		public abstract bool IsDefined(Type attributeType, bool inherit);

		public abstract Object[] GetCustomAttributes(bool inherit);

		public abstract Object[] GetCustomAttributes(Type attributeType, bool inherit);

        protected MemberInfo(Type ownerType, string name) {
            _ownerType = ownerType;
            _name = name;
        }
        
        public virtual string Name => _name;

        [MethodImpl(MethodImplOptions.InternalCall)]
        extern internal InternalCustomAttributeInfo[] GetCustomAttributes();
    }
}

#endif
