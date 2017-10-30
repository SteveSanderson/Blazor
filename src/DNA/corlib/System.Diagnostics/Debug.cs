
namespace System.Diagnostics {
    public static class Debug {

        public static void Assert(bool condition) {
#if DEBUG
            if (!condition) {
                throw new Exception(string.Empty);
            }
#endif
        }

        public static void Assert(bool condition, string message) {
#if DEBUG
            if (!condition) {
                throw new Exception(message);
            }
#endif
        }

    }
}
