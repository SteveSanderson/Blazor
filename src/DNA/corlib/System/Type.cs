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
using System.Reflection;
using System.Collections.Generic;

namespace System {
	public abstract class Type : MemberInfo {

        private static IDictionary<string, Type> typesByNameCache = new Dictionary<string, Type>();

		public static readonly Type[] EmptyTypes = new Type[0];

		[MethodImpl(MethodImplOptions.InternalCall)]
		extern public static Type GetTypeFromHandle(RuntimeTypeHandle handle);

		public abstract Type BaseType {
			get;
		}

		public abstract bool IsEnum {
			get;
		}

		public abstract string Namespace {
			get;
		}

		public abstract string FullName {
			get;
		}

		public abstract bool IsGenericType {
			get;
		}

		public abstract Type GetGenericTypeDefinition();

		public abstract Type[] GetGenericArguments();

        public abstract Type GetElementType();

        public virtual bool IsArray => GetElementType() != null;

        extern public bool IsValueType {
			[MethodImpl(MethodImplOptions.InternalCall)]
			get;
		}

		public override string ToString() {
			return this.FullName;
		}

        public static Type GetType(string typeName)
        {
            lock (typesByNameCache)
            {
                Type cachedResult;
                if (typesByNameCache.TryGetValue(typeName, out cachedResult))
                {
                    return cachedResult;
                }
            }

            string assemblyName;
            string namespaceQualifiedTypeName;

            if (typeName.IndexOf(',') > 0)
            {
                // Assembly is specified
                var parts = typeName.Split(',');
                assemblyName = parts[1].Trim();
                namespaceQualifiedTypeName = parts[0];
            }
            else
            {
                // No assembly specified
                assemblyName = null;
                namespaceQualifiedTypeName = typeName;
            }

            var namespaceSplitPoint = namespaceQualifiedTypeName.LastIndexOf('.');
            var namespaceName = namespaceQualifiedTypeName.Substring(0, namespaceSplitPoint).Trim();
            var className = namespaceQualifiedTypeName.Substring(namespaceSplitPoint + 1).Trim();
            var result = GetType(assemblyName, namespaceName, className);

            if (result != null)
            {
                lock (typesByNameCache)
                {
                    typesByNameCache[typeName] = result;
                }
            }

            return result;
        }

        [MethodImpl(MethodImplOptions.InternalCall)]
        extern public PropertyInfo[] GetProperties();

        public MethodInfo GetMethod(string name)
        {
            return (MethodInfo)GetMethodInternal(name);
        }

        [MethodImpl(MethodImplOptions.InternalCall)]
        extern public static void EnsureAssemblyLoaded(string assemblyName);

        [MethodImpl(MethodImplOptions.InternalCall)]
        extern private static Type GetType(string assemblyName, string namespaceName, string className);

        [MethodImpl(MethodImplOptions.InternalCall)]
        extern private object GetMethodInternal(string name);
    }
}

#endif
