// Copyright (c) 2009 DotNetAnywhere
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace System.Linq {
	public static class Enumerable {

		private static class Funcs<T> {
			public static readonly Func<T, bool> True = x => true;
			public static readonly Func<T, T> Identity = x => x;
		}

		#region Aggregate

		public static T Aggregate<T>(this IEnumerable<T> source, Func<T, T, T> func) {
			Check(source, func);
			using (var en = source.GetEnumerator()) {
				if (!en.MoveNext()) {
					throw new InvalidOperationException();
				}
				T value = en.Current;
				while (en.MoveNext()) {
					value = func(value, en.Current);
				}
				return value;
			}
		}

		public static TAcc Aggregate<T, TAcc>(this IEnumerable<T> source, TAcc seed, Func<TAcc, T, TAcc> func) {
			return source.Aggregate(seed, func, Funcs<TAcc>.Identity);
		}

		public static TResult Aggregate<T, TAcc, TResult>
			(this IEnumerable<T> source, TAcc seed, Func<TAcc, T, TAcc> func, Func<TAcc,TResult> resultSelector) {
			Check(source, func, resultSelector);
			foreach (var item in source) {
				seed = func(seed, item);
			}
			return resultSelector(seed);
		}

		#endregion

		#region All

		public static bool All<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			Check(source);
			foreach (T item in source) {
				if (!predicate(item)) {
					return false;
				}
			}
			return true;
		}

		#endregion

		#region Any

		public static bool Any<T>(this IEnumerable<T> source) {
			return source.Any(Funcs<T>.True);
		}

		public static bool Any<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			Check(source, predicate);
			foreach (T item in source) {
				if (predicate(item)) {
					return true;
				}
			}
			return false;
		}

		#endregion

		#region Average

		public static double Average(this IEnumerable<int> source) {
			return Avg<int, long, double>(source, (a, v) => a + v, (a, c) => (double)a / (double)c);
		}

		public static double? Average(this IEnumerable<int?> source) {
			return AvgNullable<int, long, double>(source, (a, v) => a + v, (a, c) => (double)a / (double)c);
		}

		public static double Average(this IEnumerable<long> source) {
			return Avg<long, long, double>(source, (a, v) => a + v, (a, c) => (double)a / (double)c);
		}

		public static double? Average(this IEnumerable<long?> source) {
			return AvgNullable<long, long, double>(source, (a, v) => a + v, (a, c) => (double)a / (double)c);
		}

		public static float Average(this IEnumerable<float> source) {
			return Avg<float, float, float>(source, (a, v) => a + v, (a, c) => a / c);
		}

		public static float? Average(this IEnumerable<float?> source) {
			return AvgNullable<float, float, float>(source, (a, v) => a + v, (a, c) => a / c);
		}

		public static double Average(this IEnumerable<double> source) {
			return Avg<double, double, double>(source, (a, v) => a + v, (a, c) => a / c);
		}

		public static double? Average(this IEnumerable<double?> source) {
			return AvgNullable<double, double, double>(source, (a, v) => a + v, (a, c) => a / c);
		}

		public static Decimal Average(this IEnumerable<Decimal> source) {
			throw new NotImplementedException();
		}

		public static Decimal? Average(this IEnumerable<Decimal?> source) {
			throw new NotImplementedException();
		}

		public static double Average<T>(this IEnumerable<T> source, Func<T, int> selector) {
			return Avg<int, long, double>(source.Select(selector), (a, v) => a + v, (a, c) => (double)a / (double)c);
		}

		public static double? Average<T>(this IEnumerable<T> source, Func<T, int?> selector) {
			return AvgNullable<int, long, double>(source.Select(selector), (a, v) => a + v, (a, c) => (double)a / (double)c);
		}

		public static double Average<T>(this IEnumerable<T> source, Func<T, long> selector) {
			return Avg<long, long, double>(source.Select(selector), (a, v) => a + v, (a, c) => (double)a / (double)c);
		}

		public static double? Average<T>(this IEnumerable<T> source, Func<T, long?> selector) {
			return AvgNullable<long, long, double>(source.Select(selector), (a, v) => a + v, (a, c) => (double)a / (double)c);
		}

		public static float Average<T>(this IEnumerable<T> source, Func<T, float> selector) {
			return Avg<float, float, float>(source.Select(selector), (a, v) => a + v, (a, c) => a / c);
		}

		public static float? Average<T>(this IEnumerable<T> source, Func<T, float?> selector) {
			return AvgNullable<float, float, float>(source.Select(selector), (a, v) => a + v, (a, c) => a / c);
		}

		public static double Average<T>(this IEnumerable<T> source, Func<T, double> selector) {
			return Avg<double, double, double>(source.Select(selector), (a, v) => a + v, (a, c) => a / c);
		}

		public static double? Average<T>(this IEnumerable<T> source, Func<T, double?> selector) {
			return AvgNullable<double, double, double>(source.Select(selector), (a, v) => a + v, (a, c) => a / c);
		}

		public static Decimal Average<T>(this IEnumerable<T> source, Func<T, Decimal> selector) {
			throw new NotImplementedException();
		}

		public static Decimal? Average<T>(this IEnumerable<T> source, Func<T, Decimal?> selector) {
			throw new NotImplementedException();
		}

		private static TRes Avg<T, TAcc, TRes>(IEnumerable<T> source,
			Func<TAcc, T, TAcc> accFn, Func<TAcc, int, TRes> resFn) {
			Check(source);
			TAcc acc = default(TAcc);
			int counter = 0;
			foreach (var item in source) {
				acc = accFn(acc, item);
				counter++;
			}
			if (counter == 0) {
				throw new InvalidOperationException();
			}
			return resFn(acc, counter);
		}

		private static TRes? AvgNullable<T, TAcc, TRes>(IEnumerable<T?> source,
			Func<TAcc, T, TAcc> accFn, Func<TAcc, int, TRes> resFn)
			where T : struct
			where TRes : struct {
			Check(source);
			TAcc acc = default(TAcc);
			int counter = 0;
			foreach (var item in source) {
				if (item != null) {
					acc = accFn(acc, item.Value);
					counter++;
				}
			}
			if (counter == 0) {
				return null;
			}
			return resFn(acc, counter);
		}

		#endregion

		#region AsEnumerable

		public static IEnumerable<T> AsEnumerable<T>(this IEnumerable<T> source) {
			return source;
		}

		#endregion

		#region Cast

		public static IEnumerable<T> Cast<T>(IEnumerable source) {
			Check(source);
			return CastIterator<T>(source);
		}

		private static IEnumerable<T> CastIterator<T>(IEnumerable source) {
			foreach (T item in source) {
				yield return item;
			}
		}

		#endregion

		#region Concat

		public static IEnumerable<T> Concat<T>
			(this IEnumerable<T> first, IEnumerable<T> second) {
			Check(first, second);
			return ConcatIterator(first, second);
		}

		private static IEnumerable<T> ConcatIterator<T>
			(IEnumerable<T> first, IEnumerable<T> second) {
			foreach (T item in first) {
				yield return item;
			}
			foreach (T item in second) {
				yield return item;
			}
		}

		#endregion

		#region Contains

		public static bool Contains<T>(this IEnumerable<T> source, T value) {
			return source.Contains(value, null);
		}

		public static bool Contains<T>
			(this IEnumerable<T> source, T value, IEqualityComparer<T> comparer) {
			Check(source);
			if (comparer == null) {
				comparer = EqualityComparer<T>.Default;
			}
			foreach (T item in source) {
				if (comparer.Equals(item, value)) {
					return true;
				}
			}
			return false;
		}

		#endregion

		#region Count, LongCount

		public static int Count<T>(this IEnumerable<T> source) {
			Check(source);
			ICollection<T> collection = source as ICollection<T>;
			if (collection != null) {
				return collection.Count;
			} else {
				return source.Count(Funcs<T>.True);
			}
		}

		public static int Count<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			Check(source, predicate);
			int count = 0;
			foreach (T item in source) {
				if (predicate(item)) {
					count++;
				}
			}
			return count;
		}

		public static long LongCount<T>(this IEnumerable<T> source) {
			return (long)Count(source);
		}

		public static long LongCount<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			return (long)Count(source, predicate);
		}

		#endregion

		#region DefaultIfEmpty

		public static IEnumerable<T> DefaultIfEmpty<T>(this IEnumerable<T> source) {
			return source.DefaultIfEmpty(default(T));
		}

		public static IEnumerable<T> DefaultIfEmpty<T>(this IEnumerable<T> source, T defaultValue) {
			Check(source);
			return DefaultIfEmptyIterator(source, defaultValue);
		}

		private static IEnumerable<T> DefaultIfEmptyIterator<T>(IEnumerable<T> source, T defaultValue) {
			using (IEnumerator<T> en = source.GetEnumerator()) {
				if (en.MoveNext()) {
					do {
						yield return en.Current;
					} while (en.MoveNext());
				} else {
					yield return defaultValue;
				}
			}
		}

		#endregion

		#region Distinct

		public static IEnumerable<T> Distinct<T>(this IEnumerable<T> source) {
			return Distinct(source, null);
		}

		public static IEnumerable<T> Distinct<T>(this IEnumerable<T> source, IEqualityComparer<T> comparer) {
			return DistinctIterator(source, comparer);
		}

		private static IEnumerable<T> DistinctIterator<T>(IEnumerable<T> source, IEqualityComparer<T> comparer) {
			HashSet<T> h = new HashSet<T>(comparer);
			foreach (T item in source) {
				if (h.Add(item)) {
					yield return item;
				}
			}
		}

		#endregion

		#region ElementAt, ElementAtOrDefault

		public static T ElementAt<T>(IEnumerable<T> source, int index) {
			return ElementAt(source, index, false);
		}

		public static T ElementAtOrDefault<T>(IEnumerable<T> source, int index) {
			return ElementAt(source, index, true);
		}

		private static T ElementAt<T>(IEnumerable<T> source, int index, bool orDefault) {
			Check(source);
			if (index >= 0) {
				IList<T> list = source as IList<T>;
				if (list != null) {
					if (index < list.Count) {
						return list[index];
					}
				} else {
					int count = 0;
					foreach (T item in source) {
						if (count == index) {
							return item;
						}
						count++;
					}
				}
			}
			if (orDefault) {
				return default(T);
			} else {
				throw new ArgumentOutOfRangeException();
			}
		}

		#endregion

		#region Empty

		public static IEnumerable<T> Empty<T>() {
			return new T[0];
		}

		#endregion

		#region Except

		public static IEnumerable<T> Except<T>(this IEnumerable<T> first, IEnumerable<T> second) {
			return Except(first, second, null);
		}

		public static IEnumerable<T> Except<T>
			(this IEnumerable<T> first, IEnumerable<T> second, IEqualityComparer<T> comparer) {
			Check(first, second);
			return ExceptIterator(first, second, comparer);
		}

		private static IEnumerable<T> ExceptIterator<T>
			(IEnumerable<T> first, IEnumerable<T> second, IEqualityComparer<T> comparer) {
			HashSet<T> h = new HashSet<T>(second, comparer);
			foreach (T item in first) {
				if (!h.Contains(item)) {
					yield return item;
				}
			}
		}

		#endregion

		#region First, FirstOrDefault, Single, SingleOrDefault

		private static T FirstSingle<T>(IEnumerable<T> source, Func<T, bool> predicate, bool single, bool retDefault) {
			Check(source, predicate);
			using (var en = source.Where(predicate).GetEnumerator()) {
				if (en.MoveNext()) {
					T value = en.Current;
					if (single) {
						if (en.MoveNext()) {
							throw new InvalidOperationException();
						}
					}
					return value;
				} else {
					if (retDefault) {
						return default(T);
					} else {
						throw new InvalidOperationException();
					}
				}
			}
		}

		public static T First<T>(this IEnumerable<T> source) {
			return FirstSingle(source, Funcs<T>.True, false, false);
		}

		public static T First<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			return FirstSingle(source, predicate, false, false);
		}

		public static T FirstOrDefault<T>(this IEnumerable<T> source) {
			return FirstSingle(source, Funcs<T>.True, false, true);
		}

		public static T FirstOrDefault<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			return FirstSingle(source, predicate, false, true);
		}

		public static T Single<T>(this IEnumerable<T> source) {
			return FirstSingle(source, Funcs<T>.True, true, false);
		}

		public static T Single<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			return FirstSingle(source, predicate, true, false);
		}

		public static T SingleOrDefault<T>(this IEnumerable<T> source) {
			return FirstSingle(source, Funcs<T>.True, true, true);
		}

		public static T SingleOrDefault<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			return FirstSingle(source, predicate, true, true);
		}

		#endregion

		#region GroupBy

		public static IEnumerable<IGrouping<TKey, TSource>> GroupBy<TSource, TKey>
			(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector) {
			return source.GroupBy(keySelector, null);
		}

		public static IEnumerable<IGrouping<TKey, TSource>> GroupBy<TSource, TKey>
			(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			IEqualityComparer<TKey> comparer) {
			return source.GroupBy(keySelector, Funcs<TSource>.Identity, comparer);
		}

		public static IEnumerable<IGrouping<TKey, TElement>> GroupBy<TSource, TKey, TElement>
			(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TSource, TElement> elementSelector) {
			return source.GroupBy(keySelector, elementSelector, null);
		}

		public static IEnumerable<IGrouping<TKey, TElement>> GroupBy<TSource, TKey, TElement>
			(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TSource, TElement> elementSelector, IEqualityComparer<TKey> comparer) {
			return source.GroupBy(keySelector, elementSelector,
				(key, elements) => (IGrouping<TKey, TElement>)new Grouping<TKey, TElement>(key, elements),
				comparer);
		}

		public static IEnumerable<TResult> GroupBy<TSource, TKey, TResult>
			(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TKey, IEnumerable<TSource>, TResult> resultSelector) {
			return source.GroupBy(keySelector, resultSelector, null);
		}

		public static IEnumerable<TResult> GroupBy<TSource, TKey, TResult>
			(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TKey, IEnumerable<TSource>, TResult> resultSelector, IEqualityComparer<TKey> comparer) {
			return source.GroupBy(keySelector, Funcs<TSource>.Identity, resultSelector, comparer);
		}

		public static IEnumerable<TResult> GroupBy<TSource, TKey, TElement, TResult>
			(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TSource, TElement> elementSelector, Func<TKey, IEnumerable<TElement>, TResult> resultSelector) {
			return source.GroupBy(keySelector, elementSelector, resultSelector, null);
		}

		public static IEnumerable<TResult> GroupBy<TSource, TKey, TElement, TResult>
			(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TSource, TElement> elementSelector, Func<TKey, IEnumerable<TElement>, TResult> resultSelector,
			IEqualityComparer<TKey> comparer) {
			Check(source, keySelector, elementSelector);
			Check(resultSelector);
			return GroupByIterator(source, keySelector, elementSelector, resultSelector, comparer);
		}

		private static IEnumerable<TResult> GroupByIterator<TSource, TKey, TElement, TResult>
			(IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TSource, TElement> elementSelector, Func<TKey, IEnumerable<TElement>, TResult> resultSelector,
			IEqualityComparer<TKey> comparer) {
			Dictionary<TKey, List<TElement>> groups = new Dictionary<TKey, List<TElement>>(comparer);
			foreach (var item in source) {
				TKey key = keySelector(item);
				TElement element = elementSelector(item);
				List<TElement> itemsInGroup;
				if (!groups.TryGetValue(key, out itemsInGroup)) {
					itemsInGroup = new List<TElement>();
					groups.Add(key, itemsInGroup);
				}
				itemsInGroup.Add(element);
			}
			foreach (var group in groups) {
				yield return resultSelector(group.Key, group.Value);
			}
		}

		#endregion

		#region GroupJoin

		public static IEnumerable<TResult> GroupJoin<TOuter, TInner, TKey, TResult>
			(this IEnumerable<TOuter> outer, IEnumerable<TInner> inner,
			Func<TOuter, TKey> outerKeySelector, Func<TInner, TKey> innerKeySelector,
			Func<TOuter, IEnumerable<TInner>, TResult> resultSelector) {
			return outer.GroupJoin(inner, outerKeySelector, innerKeySelector, resultSelector, null);
		}

		public static IEnumerable<TResult> GroupJoin<TOuter, TInner, TKey, TResult>
			(this IEnumerable<TOuter> outer, IEnumerable<TInner> inner,
			Func<TOuter, TKey> outerKeySelector, Func<TInner, TKey> innerKeySelector,
			Func<TOuter, IEnumerable<TInner>, TResult> resultSelector,
			IEqualityComparer<TKey> comparer) {
			Check(outer, inner, outerKeySelector);
			Check(innerKeySelector, resultSelector);
			return GroupJoinIterator(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
		}

		public static IEnumerable<TResult> GroupJoinIterator<TOuter, TInner, TKey, TResult>
			(IEnumerable<TOuter> outer, IEnumerable<TInner> inner,
			Func<TOuter, TKey> outerKeySelector, Func<TInner, TKey> innerKeySelector,
			Func<TOuter, IEnumerable<TInner>, TResult> resultSelector,
			IEqualityComparer<TKey> comparer) {
			var innerLookup = inner.ToLookup(innerKeySelector, comparer);
			foreach (var outerItem in outer) {
				TKey outerKey = outerKeySelector(outerItem);
				yield return resultSelector(outerItem,
					innerLookup.Contains(outerKey) ? innerLookup[outerKey] : Empty<TInner>());
			}
		}
		#endregion

		#region Intersect

		public static IEnumerable<T> Intersect<T>(this IEnumerable<T> first, IEnumerable<T> second) {
			return first.Intersect(second, null);
		}

		public static IEnumerable<T> Intersect<T>(this IEnumerable<T> first, IEnumerable<T> second,
			IEqualityComparer<T> comparer) {
			Check(first, second);
			return IntersectIterator(first, second, comparer);
		}

		private static IEnumerable<T> IntersectIterator<T>(IEnumerable<T> first, IEnumerable<T> second,
			IEqualityComparer<T> comparer) {
			HashSet<T> hash = new HashSet<T>(first, comparer);
			foreach (var item in second.Distinct(comparer)) {
				if (hash.Contains(item)) {
					yield return item;
				}
			}
		}

		#endregion

		#region Join

		public static IEnumerable<TResult> Join<TOuter, TInner, TKey, TResult>
			(this IEnumerable<TOuter> outer, IEnumerable<TInner> inner,
			Func<TOuter, TKey> outerKeySelector, Func<TInner, TKey> innerKeySelector,
			Func<TOuter, TInner, TResult> resultSelector) {
			return outer.Join(inner, outerKeySelector, innerKeySelector, resultSelector, null);
		}

		public static IEnumerable<TResult> Join<TOuter, TInner, TKey, TResult>
			(this IEnumerable<TOuter> outer, IEnumerable<TInner> inner,
			Func<TOuter, TKey> outerKeySelector, Func<TInner, TKey> innerKeySelector,
			Func<TOuter, TInner, TResult> resultSelector, IEqualityComparer<TKey> comparer) {
			Check(outer, inner);
			Check(outerKeySelector, innerKeySelector, resultSelector);
			return JoinIterator(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
		}

		private static IEnumerable<TResult> JoinIterator<TOuter, TInner, TKey, TResult>
			(IEnumerable<TOuter> outer, IEnumerable<TInner> inner,
			Func<TOuter, TKey> outerKeySelector, Func<TInner, TKey> innerKeySelector,
			Func<TOuter, TInner, TResult> resultSelector, IEqualityComparer<TKey> comparer) {
			var outerLookup = outer.ToLookup(outerKeySelector, comparer);
			foreach (TInner innerItem in inner) {
				TKey innerKey = innerKeySelector(innerItem);
				if (outerLookup.Contains(innerKey)) {
					foreach (TOuter outerItem in outerLookup[innerKey]) {
						yield return resultSelector(outerItem, innerItem);
					}
				}
			}
		} 

		#endregion

		#region Last, LastOrDefault

		private static T LastOrDefault<T>(IEnumerable<T> source, Func<T, bool> predicate, bool retDefault) {
			Check(source, predicate);
			T last = default(T);
			bool empty = true;
			foreach (T item in source) {
				if (predicate(item)) {
					empty = false;
					last = item;
				}
			}
			if (empty && !retDefault) {
				throw new InvalidOperationException();
			}
			return last;
		}

		public static T Last<T>(this IEnumerable<T> source) {
			return LastOrDefault(source, Funcs<T>.True, false);
		}

		public static T Last<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			return LastOrDefault(source, predicate, false);
		}

		public static T LastOrDefault<T>(this IEnumerable<T> source) {
			return LastOrDefault(source, Funcs<T>.True, true);
		}

		public static T LastOrDefault<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			return LastOrDefault(source, predicate, true);
		}

		#endregion

		#region Max

		public static int Max(this IEnumerable<int> source) {
			return GenProc(source, (a, b) => Math.Max(a, b), false);
		}

		public static int? Max(this IEnumerable<int?> source) {
			return GenProcNullable(source, (a, b) => Math.Max(a, b));
		}

		public static long Max(this IEnumerable<long> source) {
			return GenProc(source, (a, b) => Math.Max(a, b), false);
		}

		public static long? Max(this IEnumerable<long?> source) {
			return GenProcNullable(source, (a, b) => Math.Max(a, b));
		}

		public static float Max(this IEnumerable<float> source) {
			return GenProc(source, (a, b) => Math.Max(a, b), false);
		}

		public static float? Max(this IEnumerable<float?> source) {
			return GenProcNullable(source, (a, b) => Math.Max(a, b));
		}

		public static double Max(this IEnumerable<double> source) {
			return GenProc(source, (a, b) => Math.Max(a, b), false);
		}

		public static double? Max(this IEnumerable<double?> source) {
			return GenProcNullable(source, (a, b) => Math.Max(a, b));
		}

		public static Decimal Max(this IEnumerable<Decimal> source) {
			throw new NotImplementedException();
		}

		public static Decimal? Max(this IEnumerable<Decimal?> source) {
			throw new NotImplementedException();
		}

		public static T Max<T>(this IEnumerable<T> source) {
			Comparer<T> comparer = Comparer<T>.Default;
			return GenProc(source, (a, b) => comparer.Compare(a, b) > 0 ? a : b, true);
		}

		public static TResult Max<T, TResult>(this IEnumerable<T> source, Func<T, TResult> selector) {
			return Max(source.Select(selector));
		}

		public static int Max<T>(this IEnumerable<T> source, Func<T, int> selector) {
			return Max(source.Select(selector));
		}

		public static int? Max<T>(this IEnumerable<T> source, Func<T, int?> selector) {
			return Max(source.Select(selector));
		}

		public static long Max<T>(this IEnumerable<T> source, Func<T, long> selector) {
			return Max(source.Select(selector));
		}

		public static long? Max<T>(this IEnumerable<T> source, Func<T, long?> selector) {
			return Max(source.Select(selector));
		}

		public static float Max<T>(this IEnumerable<T> source, Func<T, float> selector) {
			return Max(source.Select(selector));
		}

		public static float? Max<T>(this IEnumerable<T> source, Func<T, float?> selector) {
			return Max(source.Select(selector));
		}

		public static double Max<T>(this IEnumerable<T> source, Func<T, double> selector) {
			return Max(source.Select(selector));
		}

		public static double? Max<T>(this IEnumerable<T> source, Func<T, double?> selector) {
			return Max(source.Select(selector));
		}

		public static Decimal Max<T>(this IEnumerable<T> source, Func<T, Decimal> selector) {
			return Max(source.Select(selector));
		}

		public static Decimal? Max<T>(this IEnumerable<T> source, Func<T, Decimal?> selector) {
			return Max(source.Select(selector));
		}

		#endregion

		#region Min

		public static int Min(this IEnumerable<int> source) {
			return GenProc(source, (a, b) => Math.Min(a, b), false);
		}

		public static int? Min(this IEnumerable<int?> source) {
			return GenProcNullable(source, (a, b) => Math.Min(a, b));
		}

		public static long Min(this IEnumerable<long> source) {
			return GenProc(source, (a, b) => Math.Min(a, b), false);
		}

		public static long? Min(this IEnumerable<long?> source) {
			return GenProcNullable(source, (a, b) => Math.Min(a, b));
		}

		public static float Min(this IEnumerable<float> source) {
			return GenProc(source, (a, b) => Math.Min(a, b), false);
		}

		public static float? Min(this IEnumerable<float?> source) {
			return GenProcNullable(source, (a, b) => Math.Min(a, b));
		}

		public static double Min(this IEnumerable<double> source) {
			return GenProc(source, (a, b) => Math.Min(a, b), false);
		}

		public static double? Min(this IEnumerable<double?> source) {
			return GenProcNullable(source, (a, b) => Math.Min(a, b));
		}

		public static Decimal Min(this IEnumerable<Decimal> source) {
			throw new NotImplementedException();
		}

		public static Decimal? Min(this IEnumerable<Decimal?> source) {
			throw new NotImplementedException();
		}

		public static T Min<T>(this IEnumerable<T> source) {
			Comparer<T> comparer = Comparer<T>.Default;
			return GenProc(source, (a, b) => comparer.Compare(a, b) < 0 ? a : b, true);
		}

		public static TResult Min<T, TResult>(this IEnumerable<T> source, Func<T, TResult> selector) {
			return Min(source.Select(selector));
		}

		public static int Min<T>(this IEnumerable<T> source, Func<T, int> selector) {
			return Min(source.Select(selector));
		}

		public static int? Min<T>(this IEnumerable<T> source, Func<T, int?> selector) {
			return Min(source.Select(selector));
		}

		public static long Min<T>(this IEnumerable<T> source, Func<T, long> selector) {
			return Min(source.Select(selector));
		}

		public static long? Min<T>(this IEnumerable<T> source, Func<T, long?> selector) {
			return Min(source.Select(selector));
		}

		public static float Min<T>(this IEnumerable<T> source, Func<T, float> selector) {
			return Min(source.Select(selector));
		}

		public static float? Min<T>(this IEnumerable<T> source, Func<T, float?> selector) {
			return Min(source.Select(selector));
		}

		public static double Min<T>(this IEnumerable<T> source, Func<T, double> selector) {
			return Min(source.Select(selector));
		}

		public static double? Min<T>(this IEnumerable<T> source, Func<T, double?> selector) {
			return Min(source.Select(selector));
		}

		public static Decimal Min<T>(this IEnumerable<T> source, Func<T, Decimal> selector) {
			return Min(source.Select(selector));
		}

		public static Decimal? Min<T>(this IEnumerable<T> source, Func<T, Decimal?> selector) {
			return Min(source.Select(selector));
		}

		private static T GenProc<T>(IEnumerable<T> source, Func<T, T, T> fn, bool allowEmpty) {
			Check(source);
			using (var en = source.GetEnumerator()) {
				if (!en.MoveNext()) {
					if (allowEmpty) {
						return default(T);
					} else {
						throw new InvalidOperationException();
					}
				}
				T value = en.Current;
				while (en.MoveNext()) {
					value = fn(value, en.Current);
				}
				return value;
			}
		}

		private static T? GenProcNullable<T>(IEnumerable<T?> source, Func<T, T, T> fn) where T : struct {
			T? value = null;
			foreach (T? item in source) {
				if (value == null) {
					value = item;
				} else if (item != null) {
					value = fn(value.Value, item.Value);
				}
			}
			return value;
		}

		#endregion

		#region OfType

		public static IEnumerable<T> OfType<T>(this IEnumerable source) {
			Check(source);
			return OfTypeIterator<T>(source);
		}

		private static IEnumerable<T> OfTypeIterator<T>(IEnumerable source) {
			foreach (object item in source) {
				if (item is T) {
					yield return (T)item;
				}
			}
		}

		#endregion

		#region OrderBy, OrderByDescending

		public static IOrderedEnumerable<T> OrderBy<T, TKey>(
			this IEnumerable<T> source,
			Func<T, TKey> selector,
			IComparer<TKey> comparer) {
			Check(source, selector);
			return new OrderedEnumerable<T, TKey>(source, selector, comparer, true);
		}

		public static IOrderedEnumerable<T> OrderBy<T, TKey>(
			this IEnumerable<T> source,
			Func<T, TKey> selector) {
			Check(source, selector);
			return new OrderedEnumerable<T, TKey>(source, selector, null, true);
		}

		public static IOrderedEnumerable<T> OrderByDescending<T, TKey>(
			this IEnumerable<T> source,
			Func<T, TKey> selector,
			IComparer<TKey> comparer) {
			Check(source, selector);
			return new OrderedEnumerable<T, TKey>(source, selector, comparer, false);
		}

		public static IOrderedEnumerable<T> OrderByDescending<T, TKey>(
			this IEnumerable<T> source,
			Func<T, TKey> selector) {
			Check(source, selector);
			return new OrderedEnumerable<T, TKey>(source, selector, null, false);
		}

		#endregion

		#region Range

		public static IEnumerable<int> Range(int start, int count) {
			if (count < 0) {
				throw new ArgumentOutOfRangeException("count");
			}
			return RangeIterator(start, count);
		}

		private static IEnumerable<int> RangeIterator(int start, int count) {
			int end = start + count;
			for (int i = start; i < end; i++) {
				yield return i;
			}
		}

		#endregion

		#region Repeat

		public static IEnumerable<TResult> Repeat<TResult>(TResult element, int count) {
			if (count < 0) {
				throw new ArgumentOutOfRangeException("count");
			}
			return RepeatIterator(element, count);
		}

		private static IEnumerable<TResult> RepeatIterator<TResult>(TResult element, int count) {
			for (int i = 0; i < count; i++) {
				yield return element;
			}
		}

		#endregion

		#region Reverse

		public static IEnumerable<T> Reverse<T>(this IEnumerable<T> source) {
			Check(source);
			IList<T> list = source as IList<T> ?? new List<T>(source);
			return ReverseIterator(list);
		}

		private static IEnumerable<T> ReverseIterator<T>(IList<T> source) {
			for (int i = source.Count - 1; i >= 0; i--) {
				yield return source[i];
			}
		}

		#endregion

		#region Select

		public static IEnumerable<TResult> Select<T, TResult>
			(this IEnumerable<T> source, Func<T, TResult> selector) {
			Check(source, selector);
			return SelectIterator(source, selector);
		}

		private static IEnumerable<TResult> SelectIterator<T, TResult>
			(IEnumerable<T> source, Func<T, TResult> selector) {
			foreach (T item in source) {
				yield return selector(item);
			}
		}

		public static IEnumerable<TResult> Select<T, TResult>
			(this IEnumerable<T> source, Func<T, int, TResult> selector) {
			Check(source, selector);
			return SelectIterator(source, selector);
		}

		private static IEnumerable<TResult> SelectIterator<T, TResult>
			(IEnumerable<T> source, Func<T, int, TResult> selector) {
			int count = 0;
			foreach (T item in source) {
				yield return selector(item, count);
				count++;
			}
		}

		#endregion

		#region SelectMany

		public static IEnumerable<TResult> SelectMany<TSource, TResult>
			(this IEnumerable<TSource> source, Func<TSource, IEnumerable<TResult>> selector) {
			return source.SelectMany((s, i) => selector(s));
		}

		public static IEnumerable<TResult> SelectMany<TSource, TResult>
			(this IEnumerable<TSource> source, Func<TSource, int, IEnumerable<TResult>> selector) {
			return source.SelectMany(selector, (s, c) => c);
		}

		public static IEnumerable<TResult> SelectMany<TSource, TCollection, TResult>
			(this IEnumerable<TSource> source, Func<TSource, IEnumerable<TCollection>> collectionSelector,
			Func<TSource, TCollection, TResult> resultSelector) {
			return source.SelectMany((s, i) => collectionSelector(s), resultSelector);
		}

		public static IEnumerable<TResult> SelectMany<TSource, TCollection, TResult>
			(this IEnumerable<TSource> source, Func<TSource, int, IEnumerable<TCollection>> collectionSelector,
			Func<TSource, TCollection, TResult> resultSelector) {
			Check(source, collectionSelector, resultSelector);
			return SelectManyIterator(source, collectionSelector, resultSelector);
		}

		private static IEnumerable<TResult> SelectManyIterator<TSource, TCollection, TResult>
			(IEnumerable<TSource> source, Func<TSource, int, IEnumerable<TCollection>> collectionSelector,
			Func<TSource, TCollection, TResult> resultSelector) {
			int count = 0;
			foreach (TSource item in source) {
				foreach (TCollection col in collectionSelector(item, count)) {
					yield return resultSelector(item, col);
				}
				count++;
			}
		}

		#endregion

		#region SequenceEqual

		public static bool SequenceEqual<T>(this IEnumerable<T> first, IEnumerable<T> second) {
			return first.SequenceEqual(second, null);
		}

		public static bool SequenceEqual<T>(this IEnumerable<T> first, IEnumerable<T> second, IEqualityComparer<T> comparer) {
			Check(first, second);
			if (comparer == null) {
				comparer = EqualityComparer<T>.Default;
			}
			using (IEnumerator<T> en1 = first.GetEnumerator(), en2 = second.GetEnumerator()) {
				while (en1.MoveNext()) {
					if (!en2.MoveNext()) {
						return false;
					}
					if (!comparer.Equals(en1.Current, en2.Current)) {
						return false;
					}
				}
				return !en2.MoveNext();
			}
		}

		#endregion

		#region Skip

		public static IEnumerable<T> Skip<T>(this IEnumerable<T> source, int count) {
			Check(source);
			return SkipIterator(source, count);
		}

		private static IEnumerable<T> SkipIterator<T>(IEnumerable<T> source, int count) {
			foreach (T item in source) {
				if (count <= 0) {
					yield return item;
				}
				count--;
			}
		}

		#endregion

		#region SkipWhile

		public static IEnumerable<T> SkipWhile<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			Check(source, predicate);
			return SkipWhileIterator(source, predicate);
		}

		public static IEnumerable<T> SkipWhileIterator<T>(IEnumerable<T> source, Func<T, bool> predicate) {
			bool skip = true;
			foreach (T item in source) {
				if (skip) {
					if (!predicate(item)) {
						skip = false;
						yield return item;
					}
				} else {
					yield return item;
				}
			}
		}

		public static IEnumerable<T> SkipWhile<T>(this IEnumerable<T> source, Func<T, int, bool> predicate) {
			Check(source, predicate);
			return SkipWhileIterator(source, predicate);
		}

		public static IEnumerable<T> SkipWhileIterator<T>(IEnumerable<T> source, Func<T, int, bool> predicate) {
			bool skip = true;
			int count = 0;
			foreach (T item in source) {
				if (skip) {
					if (!predicate(item, count)) {
						skip = false;
						yield return item;
					}
				} else {
					yield return item;
				}
				count++;
			}
		}

		#endregion

		#region Take

		public static IEnumerable<T> Take<T>(this IEnumerable<T> source, int count) {
			Check(source);
			return TakeIterator(source, count);
		}

		private static IEnumerable<T> TakeIterator<T>(IEnumerable<T> source, int count) {
			if (count <= 0) {
				yield break;
			}
			foreach (T item in source) {
				yield return item;
				count--;
				if (count == 0) {
					yield break;
				}
			}
		}

		#endregion

		#region TakeWhile

		public static IEnumerable<T> TakeWhile<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
			Check(source, predicate);
			return TakeWhileIterator(source, predicate);
		}

		private static IEnumerable<T> TakeWhileIterator<T>(IEnumerable<T> source, Func<T, bool> predicate) {
			foreach (T item in source) {
				if (!predicate(item)) {
					yield break;
				}
				yield return item;
			}
		}

		public static IEnumerable<T> TakeWhile<T>(this IEnumerable<T> source, Func<T, int, bool> predicate) {
			Check(source, predicate);
			return TakeWhileIterator(source, predicate);
		}

		private static IEnumerable<T> TakeWhileIterator<T>(IEnumerable<T> source, Func<T, int, bool> predicate) {
			int count = 0;
			foreach (T item in source) {
				if (!predicate(item, count)) {
					yield break;
				}
				yield return item;
				count++;
			}
		}

		#endregion

		#region ThenBy, ThenByDescending

		//public static IOrderedEnumerable<T> ThenBy<T, TKey>(this IOrderedEnumerable<T> source,
		//    Func<T, TKey> keySelector) {
		//    return source.ThenBy(keySelector, null);
		//}

		//public static IOrderedEnumerable<T> ThenBy<T, TKey>(this IOrderedEnumerable<T> source,
		//    Func<T, TKey> keySelector, IComparer<TKey> comparer) {
		//    Check(source, keySelector);
		//    return source.CreateOrderedEnumerable(keySelector, comparer, false);
		//}

		//public static IOrderedEnumerable<T> ThenByDescending<T, TKey>(this IOrderedEnumerable<T> source,
		//    Func<T, TKey> keySelector) {
		//    return source.ThenByDescending(keySelector, null);
		//}

		//public static IOrderedEnumerable<T> ThenByDescending<T, TKey>(this IOrderedEnumerable<T> source,
		//    Func<T, TKey> keySelector, IComparer<TKey> comparer) {
		//    Check(source, keySelector);
		//    return source.CreateOrderedEnumerable(keySelector, comparer, true);
		//}

		#endregion

		#region Union

		public static IEnumerable<T> Union<T>(this IEnumerable<T> first, IEnumerable<T> second) {
			return Union(first, second, null);
		}

		public static IEnumerable<T> Union<T>
			(this IEnumerable<T> first, IEnumerable<T> second, IEqualityComparer<T> comparer) {
			// Check not needed, as Concat() will do it
			return DistinctIterator(first.Concat(second), comparer);
		}

		#endregion

		#region Where

		public static IEnumerable<T> Where<T>
			(this IEnumerable<T> source, Func<T, bool> predicate) {
			Check(source, predicate);
			return WhereIterator(source, predicate);
		}

		private static IEnumerable<T> WhereIterator<T>
			(IEnumerable<T> source, Func<T, bool> predicate) {
			foreach (T item in source) {
				if (predicate(item)) {
					yield return item;
				}
			}
		}

		public static IEnumerable<T> Where<T>
			(this IEnumerable<T> source, Func<T, int, bool> predicate) {
			Check(source, predicate);
			return WhereIterator(source, predicate);
		}

		private static IEnumerable<T> WhereIterator<T>
			(IEnumerable<T> source, Func<T, int, bool> predicate) {
			int count = 0;
			foreach (T item in source) {
				if (predicate(item, count)) {
					yield return item;
				}
				count++;
			}
		}

		#endregion

		#region ToList, ToArray, ToDictionary, ToLookup

		public static List<T> ToList<T>(this IEnumerable<T> source) {
			Check(source);
			return new List<T>(source);
		}

		public static T[] ToArray<T>(this IEnumerable<T> source) {
			Check(source);
			ICollection<T> collection =
				source as ICollection<T> ?? new List<T>(source);
			T[] result = new T[collection.Count];
			collection.CopyTo(result, 0);
			return result;
		}

		public static Dictionary<TKey, TSource> ToDictionary<TSource, TKey>(
			this IEnumerable<TSource> source, Func<TSource, TKey> keySelector) {
			return source.ToDictionary(keySelector, Funcs<TSource>.Identity, null);
		}

		public static Dictionary<TKey, TSource> ToDictionary<TSource, TKey>(
			this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			IEqualityComparer<TKey> comparer) {
			return source.ToDictionary(keySelector, Funcs<TSource>.Identity, comparer);
		}

		public static Dictionary<TKey, TElement> ToDictionary<TSource, TKey, TElement>(
			this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TSource, TElement> elementSelector) {
			return source.ToDictionary(keySelector, elementSelector, null);
		}

		public static Dictionary<TKey, TElement> ToDictionary<TSource, TKey, TElement>(
			this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TSource, TElement> elementSelector, IEqualityComparer<TKey> comparer) {
			Check(source, keySelector, elementSelector);
			Dictionary<TKey, TElement> dict = new Dictionary<TKey, TElement>(comparer);
			foreach (TSource item in source) {
				dict.Add(keySelector(item), elementSelector(item));
			}
			return dict;
		}

		public static ILookup<TKey, TSource> ToLookup<TSource, TKey>(
			this IEnumerable<TSource> source, Func<TSource, TKey> keySelector) {
			return source.ToLookup(keySelector, Funcs<TSource>.Identity, null);
		}

		public static ILookup<TKey, TSource> ToLookup<TSource, TKey>(
			this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			IEqualityComparer<TKey> comparer) {
			return source.ToLookup(keySelector, Funcs<TSource>.Identity, comparer);
		}

		public static ILookup<TKey, TElement> ToLookup<TSource, TKey, TElement>(
			this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TSource, TElement> elementSelector) {
			return source.ToLookup(keySelector, elementSelector, null);
		}

		public static ILookup<TKey, TElement> ToLookup<TSource, TKey, TElement>(
			this IEnumerable<TSource> source, Func<TSource, TKey> keySelector,
			Func<TSource, TElement> elementSelector, IEqualityComparer<TKey> comparer) {
			Check(source, keySelector, elementSelector);
			var lookup = new Dictionary<TKey, List<TElement>>(comparer);
			foreach (TSource item in source) {
				TKey key = keySelector(item);
				if (key == null) {
					throw new ArgumentNullException();
				}
				List<TElement> list;
				if (!lookup.TryGetValue(key, out list)) {
					list = new List<TElement>();
					lookup.Add(key, list);
				}
				list.Add(elementSelector(item));
			}
			return new Lookup<TKey, TElement>(lookup);
		}

		#endregion

		#region Checks

		private static void Check(object o) {
			if (o == null) {
				throw new ArgumentNullException();
			}
		}

		private static void Check(object o1, object o2) {
			if (o1 == null || o2 == null) {
				throw new ArgumentNullException();
			}
		}

		private static void Check(object o1, object o2, object o3) {
			if (o1 == null || o2 == null || o3 == null) {
				throw new ArgumentNullException();
			}
		}

		#endregion

	}
}
