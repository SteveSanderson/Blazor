#if !LOCALTEST

using System;
using System.Collections.Generic;
using System.Text;

namespace System {
	public interface IFormatProvider {
		object GetFormat(Type formatType);
	}
}

#endif
