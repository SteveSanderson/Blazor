Module["asm"] =  (function(global, env, buffer) {
  'almost asm';
  
  
  var HEAP8 = new global.Int8Array(buffer);
  var HEAP16 = new global.Int16Array(buffer);
  var HEAP32 = new global.Int32Array(buffer);
  var HEAPU8 = new global.Uint8Array(buffer);
  var HEAPU16 = new global.Uint16Array(buffer);
  var HEAPU32 = new global.Uint32Array(buffer);
  var HEAPF32 = new global.Float32Array(buffer);
  var HEAPF64 = new global.Float64Array(buffer);


  var DYNAMICTOP_PTR=env.DYNAMICTOP_PTR|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;
  var STACKTOP=env.STACKTOP|0;
  var STACK_MAX=env.STACK_MAX|0;
  var cttz_i8=env.cttz_i8|0;

  var __THREW__ = 0;
  var threwValue = 0;
  var setjmpId = 0;
  var undef = 0;
  var nan = global.NaN, inf = global.Infinity;
  var tempInt = 0, tempBigInt = 0, tempBigIntP = 0, tempBigIntS = 0, tempBigIntR = 0.0, tempBigIntI = 0, tempBigIntD = 0, tempValue = 0, tempDouble = 0.0;
  var tempRet0 = 0;

  var Math_floor=global.Math.floor;
  var Math_abs=global.Math.abs;
  var Math_sqrt=global.Math.sqrt;
  var Math_pow=global.Math.pow;
  var Math_cos=global.Math.cos;
  var Math_sin=global.Math.sin;
  var Math_tan=global.Math.tan;
  var Math_acos=global.Math.acos;
  var Math_asin=global.Math.asin;
  var Math_atan=global.Math.atan;
  var Math_atan2=global.Math.atan2;
  var Math_exp=global.Math.exp;
  var Math_log=global.Math.log;
  var Math_ceil=global.Math.ceil;
  var Math_imul=global.Math.imul;
  var Math_min=global.Math.min;
  var Math_max=global.Math.max;
  var Math_clz32=global.Math.clz32;
  var Math_fround=global.Math.fround;
  var abort=env.abort;
  var assert=env.assert;
  var enlargeMemory=env.enlargeMemory;
  var getTotalMemory=env.getTotalMemory;
  var abortOnCannotGrowMemory=env.abortOnCannotGrowMemory;
  var abortStackOverflow=env.abortStackOverflow;
  var nullFunc_ii=env.nullFunc_ii;
  var nullFunc_iiii=env.nullFunc_iiii;
  var nullFunc_iii=env.nullFunc_iii;
  var nullFunc_iiiii=env.nullFunc_iiiii;
  var invoke_ii=env.invoke_ii;
  var jsCall_ii=env.jsCall_ii;
  var invoke_iiii=env.invoke_iiii;
  var jsCall_iiii=env.jsCall_iiii;
  var invoke_iii=env.invoke_iii;
  var jsCall_iii=env.jsCall_iii;
  var invoke_iiiii=env.invoke_iiiii;
  var jsCall_iiiii=env.jsCall_iiiii;
  var ___syscall221=env.___syscall221;
  var ___syscall220=env.___syscall220;
  var __inet_pton4_raw=env.__inet_pton4_raw;
  var __inet_ntop6_raw=env.__inet_ntop6_raw;
  var ___syscall102=env.___syscall102;
  var _llvm_pow_f64=env._llvm_pow_f64;
  var __inet_ntop4_raw=env.__inet_ntop4_raw;
  var __inet_pton6_raw=env.__inet_pton6_raw;
  var _llvm_stackrestore=env._llvm_stackrestore;
  var _usleep=env._usleep;
  var __read_sockaddr=env.__read_sockaddr;
  var _llvm_cttz_i32=env._llvm_cttz_i32;
  var ___setErrNo=env.___setErrNo;
  var ___syscall195=env.___syscall195;
  var __exit=env.__exit;
  var _nanosleep=env._nanosleep;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var _abort=env._abort;
  var _llvm_stacksave=env._llvm_stacksave;
  var ___syscall54=env.___syscall54;
  var ___unlock=env.___unlock;
  var __write_sockaddr=env.__write_sockaddr;
  var _exit=env._exit;
  var _gethostbyname=env._gethostbyname;
  var ___syscall3=env.___syscall3;
  var _invokeJsFunc=env._invokeJsFunc;
  var ___lock=env.___lock;
  var ___syscall6=env.___syscall6;
  var ___syscall5=env.___syscall5;
  var ___syscall183=env.___syscall183;
  var _gettimeofday=env._gettimeofday;
  var ___syscall140=env.___syscall140;
  var ___syscall142=env.___syscall142;
  var ___syscall146=env.___syscall146;
  var tempFloat = Math_fround(0);
  const f0 = Math_fround(0);

// EMSCRIPTEN_START_FUNCS
function _JIT_Execute(i19, i1) {
 i19 = i19 | 0;
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0, i18 = 0, i20 = 0, i21 = 0, i22 = 0, i23 = 0, i24 = 0, i25 = 0, i26 = 0, i27 = 0, i28 = 0, i29 = 0, i30 = 0, i31 = 0, i32 = 0, i33 = 0, i34 = 0, i35 = 0, i36 = 0, i37 = 0, i38 = 0, i39 = 0, i40 = 0, i41 = 0, i42 = 0, i43 = 0, i44 = 0, i45 = 0, i46 = 0, f47 = f0, d48 = 0.0;
 i46 = STACKTOP;
 STACKTOP = STACKTOP + 96 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(96);
 i44 = i46 + 24 | 0;
 i43 = i46 + 16 | 0;
 i45 = i46 + 84 | 0;
 i32 = i46 + 80 | 0;
 i36 = i46 + 76 | 0;
 i38 = i46 + 72 | 0;
 i39 = i46 + 68 | 0;
 i40 = i46 + 64 | 0;
 i41 = i46 + 60 | 0;
 i42 = i46 + 56 | 0;
 i20 = i46 + 52 | 0;
 i21 = i46 + 48 | 0;
 i22 = i46 + 44 | 0;
 i23 = i46 + 8 | 0;
 i24 = i46 + 40 | 0;
 i25 = i46;
 do if (i19) {
  i28 = i19 + 20 | 0;
  i5 = HEAP32[i28 >> 2] | 0;
  HEAP32[i45 >> 2] = i5;
  i16 = HEAP32[i5 + 24 >> 2] | 0;
  i4 = HEAP32[i5 + 8 >> 2] | 0;
  i3 = HEAP32[i4 >> 2] | 0;
  i15 = i3 + (HEAP32[i5 + 12 >> 2] << 2) | 0;
  i33 = i19 + 36 | 0;
  i34 = i19 + 28 | 0;
  i35 = i19 + 40 | 0;
  i37 = i19 + 32 | 0;
  i17 = i1;
  i11 = 0;
  i5 = (HEAP32[i5 + 16 >> 2] | 0) + (HEAP32[i5 + 20 >> 2] | 0) | 0;
  i9 = i16;
  i14 = i15 + 4 | 0;
  i1 = i15;
  L7 : while (1) {
   i10 = i5 + -4 | 0;
   i13 = i14 + 4 | 0;
   i8 = i5 + 4 | 0;
   i12 = i3;
   L9 : do switch (HEAP32[i1 >> 2] | 0) {
   case 2:
    {
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 1:
    {
     i15 = 6;
     break L7;
    }
   case 3:
    {
     HEAP32[i5 >> 2] = 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 4:
    {
     i1 = i14;
     i15 = 416;
     break;
    }
   case 5:
    {
     HEAP32[i10 >> 2] = HEAP32[(HEAP32[i10 >> 2] | 0) + (HEAP32[i14 >> 2] | 0) >> 2];
     i1 = i13;
     i15 = 416;
     break;
    }
   case 6:
    {
     i15 = 65;
     break;
    }
   case 7:
    {
     i1 = i14;
     i15 = 75;
     break;
    }
   case 8:
    {
     HEAP32[i5 >> 2] = HEAP32[i14 >> 2];
     i1 = i13;
     i5 = i8;
     i15 = 16;
     break;
    }
   case 9:
    {
     i1 = i14;
     i15 = 16;
     break;
    }
   case 10:
    {
     i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
     i15 = 126;
     break;
    }
   case 11:
    {
     i1 = i14;
     i15 = 126;
     break;
    }
   case 12:
    {
     HEAP32[i5 >> 2] = _SystemString_FromUserStrings(HEAP32[HEAP32[i45 >> 2] >> 2] | 0, HEAP32[i14 >> 2] | 0) | 0;
     i5 = i8;
     i1 = i13;
     i15 = 362;
     break;
    }
   case 13:
    {
     i1 = i14;
     i15 = 362;
     break;
    }
   case 14:
    {
     i1 = 5;
     i15 = 105;
     break;
    }
   case 15:
    {
     i1 = i14;
     i6 = i4;
     i7 = i9;
     i2 = i11;
     i8 = i16;
     i15 = 123;
     break;
    }
   case 16:
    {
     i4 = HEAP32[i45 >> 2] | 0;
     i1 = i4 + 24 | 0;
     if (!(HEAP16[(HEAP32[i14 >> 2] | 0) + 14 >> 1] & 16)) {
      i1 = HEAP32[i1 >> 2] | 0;
      i2 = HEAP32[i1 >> 2] | 0;
      i3 = 4;
     } else {
      i2 = 0;
      i3 = 0;
      i1 = HEAP32[i1 >> 2] | 0;
     }
     i1 = FUNCTION_TABLE_iiii[HEAP32[i13 >> 2] & 255](i2, i1 + i3 | 0, HEAP32[i4 + 16 >> 2] | 0) | 0;
     if (!i1) i15 = 65; else {
      i15 = 63;
      break L7;
     }
     break;
    }
   case 17:
    {
     HEAPF32[i10 >> 2] = Math_fround(HEAP32[i10 >> 2] | 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 18:
    {
     i1 = 7;
     i15 = 105;
     break;
    }
   case 19:
    {
     HEAP32[i5 >> 2] = 2;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 20:
    {
     i2 = HEAP32[i14 >> 2] | 0;
     i1 = HEAP16[i2 + 12 >> 1] & 4096;
     i6 = i1 << 16 >> 16 != 0;
     if (i6) i4 = -1; else i4 = _Heap_AllocType(HEAP32[i2 + 48 >> 2] | 0) | 0;
     i9 = _MethodState_Direct(i19, i2, HEAP32[i45 >> 2] | 0, (i1 & 65535) >>> 12 & 65535) | 0;
     HEAP32[i39 >> 2] = i5;
     i3 = i9 + 24 | 0;
     _CreateParameters(HEAP32[i3 >> 2] | 0, i2, i39, i4);
     i1 = HEAP32[i39 >> 2] | 0;
     if (!i6) {
      HEAP32[i1 >> 2] = i4;
      i1 = i1 + 4 | 0;
     }
     i8 = HEAP32[i45 >> 2] | 0;
     HEAP32[i8 + 20 >> 2] = i1 - (HEAP32[i8 + 16 >> 2] | 0);
     HEAP32[i8 + 12 >> 2] = i13 - i12 >> 2;
     HEAP32[i28 >> 2] = i9;
     HEAP32[i45 >> 2] = i9;
     i8 = HEAP32[i3 >> 2] | 0;
     i5 = (HEAP32[i9 + 16 >> 2] | 0) + (HEAP32[i9 + 20 >> 2] | 0) | 0;
     i1 = HEAP32[i9 + 8 >> 2] | 0;
     i7 = HEAP32[i1 >> 2] | 0;
     i2 = HEAP32[i9 + 12 >> 2] | 0;
     i6 = _RunFinalizer(i19) | 0;
     if (!i6) {
      i4 = i1;
      i9 = i8;
      i3 = i7;
      i1 = i7 + (i2 << 2) | 0;
      i6 = i8;
      i15 = 369;
     } else {
      i15 = HEAP32[i45 >> 2] | 0;
      HEAP32[i15 + 20 >> 2] = i5 - (HEAP32[i15 + 16 >> 2] | 0);
      HEAP32[i15 + 12 >> 2] = i2 << 2 >> 2;
      HEAP32[i28 >> 2] = i6;
      HEAP32[i45 >> 2] = i6;
      i15 = HEAP32[i6 + 24 >> 2] | 0;
      i4 = HEAP32[i6 + 8 >> 2] | 0;
      i1 = HEAP32[i4 >> 2] | 0;
      i5 = (HEAP32[i6 + 16 >> 2] | 0) + (HEAP32[i6 + 20 >> 2] | 0) | 0;
      i9 = i15;
      i3 = i1;
      i1 = i1 + (HEAP32[i6 + 12 >> 2] << 2) | 0;
      i6 = i15;
      i15 = 369;
     }
     break;
    }
   case 21:
    {
     i1 = i14;
     i6 = i16;
     i15 = 369;
     break;
    }
   case 22:
    {
     HEAP32[i5 >> 2] = i9 + (HEAP32[i14 >> 2] | 0);
     i5 = i8;
     i1 = i13;
     i15 = 38;
     break;
    }
   case 23:
    {
     i1 = i14;
     i15 = 38;
     break;
    }
   case 24:
    {
     i1 = 10;
     i15 = 105;
     break;
    }
   case 25:
    {
     i1 = HEAP32[i10 >> 2] | 0;
     i2 = i10;
     HEAP32[i2 >> 2] = i1;
     HEAP32[i2 + 4 >> 2] = ((i1 | 0) < 0) << 31 >> 31;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 26:
    {
     i8 = HEAP32[i13 >> 2] | 0;
     i9 = i8 + 40 | 0;
     i6 = i5 + (0 - (HEAP32[i9 >> 2] | 0)) | 0;
     i4 = _Heap_Box(HEAP32[i14 >> 2] | 0, HEAP32[i6 >> 2] | 0) | 0;
     i7 = 11;
     i2 = i4;
     i1 = i13;
     i15 = 108;
     break;
    }
   case 27:
    {
     HEAP32[i5 >> 2] = 1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 28:
    {
     _memset(HEAP32[i10 >> 2] | 0, 0, HEAP32[(HEAP32[i14 >> 2] | 0) + 36 >> 2] | 0) | 0;
     i5 = i10;
     i1 = i13;
     i15 = 442;
     break;
    }
   case 29:
    {
     i1 = i14;
     i15 = 442;
     break;
    }
   case 30:
    {
     HEAP32[i10 >> 2] = _SystemArray_NewVector(HEAP32[i14 >> 2] | 0, HEAP32[i10 >> 2] | 0) | 0;
     i1 = _RunFinalizer(i19) | 0;
     if (!i1) {
      i6 = i9;
      i1 = i13;
      i2 = i16;
      i15 = 392;
     } else {
      i2 = HEAP32[i45 >> 2] | 0;
      HEAP32[i2 + 20 >> 2] = i5 - (HEAP32[i2 + 16 >> 2] | 0);
      HEAP32[i2 + 12 >> 2] = i13 - i12 >> 2;
      HEAP32[i28 >> 2] = i1;
      HEAP32[i45 >> 2] = i1;
      i2 = HEAP32[i1 + 24 >> 2] | 0;
      i4 = HEAP32[i1 + 8 >> 2] | 0;
      i15 = HEAP32[i4 >> 2] | 0;
      i5 = (HEAP32[i1 + 16 >> 2] | 0) + (HEAP32[i1 + 20 >> 2] | 0) | 0;
      i6 = i2;
      i3 = i15;
      i1 = i15 + (HEAP32[i1 + 12 >> 2] << 2) | 0;
      i15 = 392;
     }
     break;
    }
   case 31:
    {
     i6 = i9;
     i1 = i14;
     i2 = i16;
     i15 = 392;
     break;
    }
   case 32:
    {
     i2 = HEAP32[i14 >> 2] | 0;
     i1 = i5 + (4 - (HEAP32[i2 + 40 >> 2] | 0)) | 0;
     i7 = _MethodState_Direct(i19, i2, HEAP32[i45 >> 2] | 0, (HEAPU16[i2 + 12 >> 1] | 0) >>> 12 & 1) | 0;
     HEAP32[i40 >> 2] = i5;
     i9 = i7 + 24 | 0;
     _CreateParameters(HEAP32[i9 >> 2] | 0, i2, i40, i1);
     i1 = HEAP32[i45 >> 2] | 0;
     HEAP32[i1 + 20 >> 2] = (HEAP32[i40 >> 2] | 0) + (HEAP32[(HEAP32[i2 + 48 >> 2] | 0) + 68 >> 2] | 0) - (HEAP32[i1 + 16 >> 2] | 0);
     HEAP32[i1 + 12 >> 2] = i13 - i12 >> 2;
     HEAP32[i28 >> 2] = i7;
     HEAP32[i45 >> 2] = i7;
     i9 = HEAP32[i9 >> 2] | 0;
     i1 = (HEAP32[i7 + 16 >> 2] | 0) + (HEAP32[i7 + 20 >> 2] | 0) | 0;
     i2 = HEAP32[i7 + 8 >> 2] | 0;
     i6 = HEAP32[i2 >> 2] | 0;
     i7 = HEAP32[i7 + 12 >> 2] | 0;
     i8 = _RunFinalizer(i19) | 0;
     if (!i8) {
      i5 = i1;
      i4 = i2;
      i10 = i9;
      i3 = i6;
      i1 = i6 + (i7 << 2) | 0;
      i6 = i9;
      i15 = 373;
     } else {
      i6 = HEAP32[i45 >> 2] | 0;
      HEAP32[i6 + 20 >> 2] = i1 - (HEAP32[i6 + 16 >> 2] | 0);
      HEAP32[i6 + 12 >> 2] = i7 << 2 >> 2;
      HEAP32[i28 >> 2] = i8;
      HEAP32[i45 >> 2] = i8;
      i6 = HEAP32[i8 + 24 >> 2] | 0;
      i4 = HEAP32[i8 + 8 >> 2] | 0;
      i1 = HEAP32[i4 >> 2] | 0;
      i5 = (HEAP32[i8 + 16 >> 2] | 0) + (HEAP32[i8 + 20 >> 2] | 0) | 0;
      i10 = i6;
      i3 = i1;
      i1 = i1 + (HEAP32[i8 + 12 >> 2] << 2) | 0;
      i15 = 373;
     }
     break;
    }
   case 33:
    {
     i10 = i9;
     i1 = i14;
     i6 = i16;
     i15 = 373;
     break;
    }
   case 34:
    {
     i8 = 15;
     i15 = 376;
     break;
    }
   case 35:
    {
     i1 = i14;
     i15 = 389;
     break;
    }
   case 36:
    {
     HEAPF64[i10 >> 3] = +(HEAP32[i10 >> 2] | 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 37:
    {
     i1 = i14;
     i15 = 328;
     break;
    }
   case 38:
    {
     i2 = HEAP32[i10 >> 2] | 0;
     i5 = (_Heap_GetType(i2) | 0) + 68 | 0;
     _memcpy(i10 | 0, i2 | 0, HEAP32[i5 >> 2] | 0) | 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10 + (HEAP32[i5 >> 2] | 0) | 0;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 39:
    {
     i1 = HEAP32[i14 >> 2] | 0;
     HEAP32[i10 >> 2] = HEAP32[i10 >> 2] << i1 >> i1;
     i1 = i13;
     i15 = 328;
     break;
    }
   case 40:
    {
     i1 = i14;
     i15 = 451;
     break;
    }
   case 41:
    {
     HEAP32[i5 >> 2] = 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 42:
    {
     HEAP32[i10 >> 2] = (HEAP32[i10 >> 2] | 0) + (HEAP32[i14 >> 2] | 0);
     i1 = i13;
     i15 = 420;
     break;
    }
   case 43:
    {
     i1 = i14;
     i15 = 420;
     break;
    }
   case 44:
    {
     i2 = HEAP32[i14 >> 2] | 0;
     _memcpy(i5 | 0, i5 + (0 - i2) | 0, i2 | 0) | 0;
     i1 = i13;
     i2 = i5 + i2 | 0;
     i15 = 11;
     break;
    }
   case 45:
    {
     i1 = i14;
     i2 = i5;
     i15 = 11;
     break;
    }
   case 46:
    {
     i1 = i13;
     i5 = i5 + (0 - (HEAP32[i14 >> 2] | 0)) | 0;
     i15 = 13;
     break;
    }
   case 47:
    {
     i1 = i14;
     i15 = 13;
     break;
    }
   case 48:
    {
     i1 = HEAP32[i14 >> 2] | 0;
     i15 = i5 + (0 - (i1 >>> 0 > 4 ? i1 : 4)) | 0;
     i2 = i15 + -4 | 0;
     _memcpy(HEAP32[i2 >> 2] | 0, i15 | 0, i1 | 0) | 0;
     i1 = i13;
     i15 = 57;
     break;
    }
   case 49:
    {
     i1 = i14;
     i2 = i5;
     i15 = 57;
     break;
    }
   case 50:
    {
     i8 = HEAP32[i14 >> 2] | 0;
     i9 = i8 + 40 | 0;
     i6 = i5 + (0 - (HEAP32[i9 >> 2] | 0)) | 0;
     i7 = 23;
     i2 = 0;
     i1 = i14;
     i4 = HEAP32[HEAP32[i6 >> 2] >> 2] | 0;
     i15 = 108;
     break;
    }
   case 51:
    {
     HEAP32[i10 >> 2] = HEAP32[i10 >> 2] & HEAP32[i14 >> 2];
     i1 = i13;
     i15 = 326;
     break;
    }
   case 52:
    {
     i1 = i5 + (0 - (HEAP32[i14 >> 2] | 0)) | 0;
     i15 = i1 + -4 | 0;
     i5 = i15 + -4 | 0;
     _SystemArray_StoreElement(HEAP32[i5 >> 2] | 0, HEAP32[i15 >> 2] | 0, i1);
     i1 = i13;
     i15 = 406;
     break;
    }
   case 53:
    {
     i1 = i14;
     i15 = 406;
     break;
    }
   case 54:
    {
     i1 = 0;
     while (1) {
      if (i1 >>> 0 >= (HEAP32[i4 + 12 >> 2] | 0) >>> 0) {
       i15 = 492;
       break;
      }
      i2 = HEAP32[i4 + 16 >> 2] | 0;
      if (((HEAP32[i2 + (i1 * 24 | 0) >> 2] | 0) == 2 ? (i30 = HEAP32[i45 >> 2] | 0, i31 = (HEAP32[i30 + 12 >> 2] | 0) + -1 | 0, i31 >>> 0 >= (HEAP32[i2 + (i1 * 24 | 0) + 4 >> 2] | 0) >>> 0) : 0) ? i31 >>> 0 < (HEAP32[i2 + (i1 * 24 | 0) + 8 >> 2] | 0) >>> 0 : 0) {
       i15 = 497;
       break;
      }
      i1 = i1 + 1 | 0;
     }
     if ((i15 | 0) == 492) {
      i5 = HEAP32[(HEAP32[i45 >> 2] | 0) + 16 >> 2] | 0;
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 498;
      break L9;
     } else if ((i15 | 0) == 497) {
      i5 = HEAP32[i30 + 16 >> 2] | 0;
      i1 = i3 + (HEAP32[i2 + (i1 * 24 | 0) + 12 >> 2] << 2) | 0;
      HEAP32[i30 + 44 >> 2] = i3 + (HEAP32[i14 >> 2] << 2);
      i15 = 498;
      break L9;
     }
     break;
    }
   case 55:
    {
     i1 = i14;
     i15 = 498;
     break;
    }
   case 56:
    {
     i2 = HEAP32[i37 >> 2] | 0;
     i6 = HEAP32[i45 >> 2] | 0;
     if (!i2) {
      i5 = HEAP32[i6 + 16 >> 2] | 0;
      i1 = HEAP32[i6 + 44 >> 2] | 0;
      i15 = 502;
     } else {
      i1 = i14;
      i4 = i6;
      i15 = 481;
     }
     break;
    }
   case 57:
    {
     i1 = i14;
     i15 = 502;
     break;
    }
   case 58:
    {
     i11 = HEAP32[i10 >> 2] | 0;
     i5 = i10;
     i1 = i14;
     i15 = 467;
     break;
    }
   case 59:
    {
     i10 = i3;
     i7 = i11;
     i8 = i9;
     i1 = i14;
     i6 = i16;
     i15 = 489;
     break;
    }
   case 60:
    {
     i12 = HEAP32[i34 >> 2] | 0;
     i1 = i14;
     i15 = 468;
     break;
    }
   case 61:
    {
     HEAP32[i5 >> 2] = -1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 62:
    {
     i1 = HEAP32[i10 >> 2] | 0;
     i5 = HEAP32[i14 >> 2] | 0;
     HEAP32[i10 >> 2] = 0;
     _memcpy(i10 | 0, i1 | 0, HEAP32[i5 + 64 >> 2] | 0) | 0;
     i5 = i10 + (HEAP32[i5 + 68 >> 2] | 0) | 0;
     i1 = i13;
     i15 = 360;
     break;
    }
   case 63:
    {
     i1 = i14;
     i15 = 360;
     break;
    }
   case 64:
    {
     HEAP32[i10 >> 2] = HEAP32[HEAP32[i10 >> 2] >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 65:
    {
     i1 = i14;
     i15 = 326;
     break;
    }
   case 66:
    {
     i1 = HEAP32[i14 >> 2] | 0;
     i2 = HEAP32[i10 >> 2] | 0;
     if (i2 >>> 0 < i1 >>> 0) {
      i1 = i3 + (HEAP32[i13 + (i2 << 2) >> 2] << 2) | 0;
      i5 = i10;
      i15 = 131;
      break L9;
     } else {
      i1 = i13 + (i1 << 2) | 0;
      i5 = i10;
      i15 = 131;
      break L9;
     }
    }
   case 67:
    {
     i1 = i14;
     i15 = 131;
     break;
    }
   case 68:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = _SystemArray_LoadElementAddress(HEAP32[i2 >> 2] | 0, HEAP32[i10 >> 2] | 0) | 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 69:
    {
     i2 = i10;
     HEAP32[i2 >> 2] = HEAP32[i10 >> 2];
     HEAP32[i2 + 4 >> 2] = 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 70:
    {
     i1 = 33;
     i15 = 105;
     break;
    }
   case 71:
    {
     HEAPF32[i10 >> 2] = Math_fround((HEAP32[i10 >> 2] | 0) >>> 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 72:
    {
     i8 = 34;
     i15 = 376;
     break;
    }
   case 73:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     HEAPF64[i6 >> 3] = +HEAPF64[i6 >> 3] / +HEAPF64[i2 >> 3];
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 74:
    {
     i15 = HEAP32[i10 >> 2] | 0;
     i1 = i5 + -8 | 0;
     i12 = HEAP32[i1 >> 2] | 0;
     i5 = HEAP32[i14 >> 2] | 0;
     HEAP32[i1 >> 2] = 0;
     _SystemArray_LoadElement(i12, i15, i1);
     i5 = i1 + i5 | 0;
     i1 = i13;
     i15 = 401;
     break;
    }
   case 75:
    {
     i1 = i14;
     i15 = 401;
     break;
    }
   case 76:
    {
     i15 = HEAP32[i13 >> 2] | 0;
     i1 = i5 + (0 - (HEAP32[i14 >> 2] | 0)) | 0;
     i5 = i15 + 32 | 0;
     _memcpy(i1 | 0, i1 + (HEAP32[i15 + 28 >> 2] | 0) | 0, HEAP32[i5 >> 2] | 0) | 0;
     i5 = i1 + (HEAP32[i5 >> 2] | 0) | 0;
     i1 = i14 + 8 | 0;
     i15 = 418;
     break;
    }
   case 77:
    {
     i1 = i14;
     i15 = 418;
     break;
    }
   case 78:
    {
     i1 = HEAP32[i14 >> 2] | 0;
     i2 = HEAP32[i10 >> 2] | 0;
     i5 = i1 + 32 | 0;
     _memcpy(i10 | 0, i2 + (HEAP32[i1 + 28 >> 2] | 0) | 0, HEAP32[i5 >> 2] | 0) | 0;
     i5 = i10 + (HEAP32[i5 >> 2] | 0) | 0;
     i1 = i13;
     i15 = 414;
     break;
    }
   case 79:
    {
     i2 = i11;
     i1 = i14;
     i15 = 414;
     break;
    }
   case 80:
    {
     HEAP32[i5 >> 2] = HEAP32[i14 >> 2];
     i5 = i8;
     i1 = i13;
     i15 = 358;
     break;
    }
   case 81:
    {
     i1 = i14;
     i15 = 358;
     break;
    }
   case 82:
    {
     i2 = i5 + -8 | 0;
     HEAP32[HEAP32[i2 >> 2] >> 2] = HEAP32[i10 >> 2];
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 83:
    {
     i2 = i9;
     i1 = i14;
     i6 = i16;
     i15 = 85;
     break;
    }
   case 84:
    {
     i7 = i5 + (0 - (HEAP32[(HEAP32[i14 >> 2] | 0) + 40 >> 2] | 0)) | 0;
     i8 = HEAP32[(HEAP32[i7 >> 2] | 0) + 8 >> 2] | 0;
     HEAP32[(HEAP32[i45 >> 2] | 0) + 52 >> 2] = HEAP32[i8 + 44 >> 2];
     i2 = i7 + 4 | 0;
     i1 = HEAP32[i2 + 4 >> 2] | 0;
     HEAP32[i7 >> 2] = HEAP32[i2 >> 2];
     L85 : do if (i1 | 0) {
      i9 = HEAP32[i1 >> 2] | 0;
      i6 = i1 + 4 | 0;
      i5 = 0;
      i1 = i2;
      while (1) {
       if ((i5 | 0) == (i9 | 0)) break L85;
       i2 = HEAP32[i6 + (i5 << 2) >> 2] | 0;
       i3 = i1 + 4 | 0;
       do if (i2) {
        i4 = _Heap_GetType(i2) | 0;
        if (!(_Type_IsValueType(i4) | 0)) {
         HEAP32[i1 >> 2] = i2;
         i1 = i3;
         break;
        } else {
         i16 = i4 + 68 | 0;
         _memcpy(i1 | 0, i2 | 0, HEAP32[i16 >> 2] | 0) | 0;
         i1 = i1 + (HEAP32[i16 >> 2] | 0) | 0;
         break;
        }
       } else {
        HEAP32[i1 >> 2] = 0;
        i1 = i3;
       } while (0);
       i5 = i5 + 1 | 0;
      }
     } while (0);
     i5 = _MethodState_Direct(i19, i8, HEAP32[i45 >> 2] | 0, 0) | 0;
     i6 = i5 + 24 | 0;
     _memcpy(HEAP32[i6 >> 2] | 0, i7 | 0, HEAP32[i8 + 40 >> 2] | 0) | 0;
     i4 = HEAP32[i45 >> 2] | 0;
     HEAP32[i4 + 20 >> 2] = i7 - (HEAP32[i4 + 16 >> 2] | 0);
     HEAP32[i4 + 12 >> 2] = i13 - i12 >> 2;
     HEAP32[i28 >> 2] = i5;
     HEAP32[i45 >> 2] = i5;
     i6 = HEAP32[i6 >> 2] | 0;
     i4 = HEAP32[i5 + 8 >> 2] | 0;
     i3 = HEAP32[i4 >> 2] | 0;
     i2 = i6;
     i1 = i3 + (HEAP32[i5 + 12 >> 2] << 2) | 0;
     i5 = (HEAP32[i5 + 16 >> 2] | 0) + (HEAP32[i5 + 20 >> 2] | 0) | 0;
     i15 = 96;
     break;
    }
   case 85:
    {
     i2 = i9;
     i1 = i14;
     i6 = i16;
     i15 = 96;
     break;
    }
   case 86:
    {
     i1 = HEAP32[(HEAP32[i45 >> 2] | 0) + 52 >> 2] | 0;
     if (!i1) {
      HEAP32[i5 >> 2] = 0;
      i5 = i8;
      i15 = 101;
      break L9;
     }
     if (!(_Type_IsValueType(i1) | 0)) i15 = 101; else {
      i15 = _Heap_AllocType(i1) | 0;
      i12 = HEAP32[i1 + 68 >> 2] | 0;
      i5 = i5 + (0 - i12) | 0;
      _memcpy(i15 | 0, i5 | 0, i12 | 0) | 0;
      HEAP32[i5 >> 2] = i15;
      i5 = i5 + 4 | 0;
      i15 = 101;
     }
     break;
    }
   case 87:
    {
     i15 = 101;
     break;
    }
   case 88:
    {
     i15 = _PInvoke_Call(i14 + -4 | 0, i9, HEAP32[(HEAP32[i45 >> 2] | 0) + 16 >> 2] | 0, i19) | 0;
     HEAP32[(HEAP32[i45 >> 2] | 0) + 20 >> 2] = i15;
     i15 = 65;
     break;
    }
   case 89:
    {
     i2 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i2 >> 2]);
     HEAPF32[i2 >> 2] = Math_fround(f47 / Math_fround(HEAPF32[i10 >> 2]));
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 90:
    {
     i13 = i14;
     i15 = HEAP32[i13 + 4 >> 2] | 0;
     i1 = i5;
     HEAP32[i1 >> 2] = HEAP32[i13 >> 2];
     HEAP32[i1 + 4 >> 2] = i15;
     i5 = i5 + 8 | 0;
     i1 = i14 + 8 | 0;
     i15 = 22;
     break;
    }
   case 91:
    {
     i1 = i14;
     i15 = 22;
     break;
    }
   case 92:
    {
     HEAP32[HEAP32[i10 >> 2] >> 2] = 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 93:
    {
     HEAPF64[i10 >> 3] = +((HEAP32[i10 >> 2] | 0) >>> 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 94:
    {
     HEAP32[i5 >> 2] = HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 95:
    {
     i2 = i5 + -8 | 0;
     i1 = i2;
     HEAPF32[i2 >> 2] = Math_fround(+((HEAP32[i1 >> 2] | 0) >>> 0) + 4294967296.0 * +(HEAP32[i1 + 4 >> 2] | 0));
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 96:
    {
     i7 = i5 + -8 | 0;
     i1 = HEAP32[i7 + 4 >> 2] | 0;
     i6 = i5;
     HEAP32[i6 >> 2] = HEAP32[i7 >> 2];
     HEAP32[i6 + 4 >> 2] = i1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i5 + 8 | 0;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 97:
    {
     i2 = i5 + -8 | 0;
     i1 = i2;
     HEAPF64[i2 >> 3] = +((HEAP32[i1 >> 2] | 0) >>> 0) + 4294967296.0 * +(HEAP32[i1 + 4 >> 2] | 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 98:
    {
     i7 = 45;
     i15 = 430;
     break;
    }
   case 99:
    {
     i1 = i14;
     i15 = 440;
     break;
    }
   case 100:
    {
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 101:
    {
     i6 = HEAP32[i10 >> 2] | 0;
     i1 = HEAP32[i6 + 4 >> 2] | 0;
     i2 = i10;
     HEAP32[i2 >> 2] = HEAP32[i6 >> 2];
     HEAP32[i2 + 4 >> 2] = i1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 102:
    {
     i1 = HEAP32[i14 >> 2] | 0;
     i5 = i5 + -8 | 0;
     HEAP32[i5 >> 2] = HEAP32[i5 >> 2] << i1 >> i1;
     i5 = i10;
     i1 = i13;
     i15 = 338;
     break;
    }
   case 103:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     HEAPF64[i6 >> 3] = +HEAPF64[i6 >> 3] * +HEAPF64[i2 >> 3];
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 104:
    {
     i14 = i9 + (HEAP32[i14 >> 2] | 0) | 0;
     i15 = HEAP32[i14 + 4 >> 2] | 0;
     i1 = i5;
     HEAP32[i1 >> 2] = HEAP32[i14 >> 2];
     HEAP32[i1 + 4 >> 2] = i15;
     i5 = i5 + 8 | 0;
     i1 = i13;
     i15 = 26;
     break;
    }
   case 105:
    {
     i1 = i14;
     i15 = 26;
     break;
    }
   case 106:
    {
     HEAP32[i5 >> 2] = HEAP32[i9 + (HEAP32[i14 >> 2] | 0) >> 2];
     i5 = i8;
     i1 = i13;
     i15 = 24;
     break;
    }
   case 107:
    {
     i1 = i14;
     i15 = 24;
     break;
    }
   case 108:
    {
     i1 = i14;
     i15 = 338;
     break;
    }
   case 109:
    {
     i2 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i2 >> 2]);
     HEAPF32[i2 >> 2] = Math_fround(f47 * Math_fround(HEAPF32[i10 >> 2]));
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 110:
    {
     i5 = i5 + -8 | 0;
     HEAP32[i5 >> 2] = HEAP32[i5 >> 2] & HEAP32[i14 >> 2];
     i5 = i10;
     i1 = i13;
     i15 = 336;
     break;
    }
   case 111:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     HEAPF64[i6 >> 3] = +HEAPF64[i6 >> 3] - +HEAPF64[i2 >> 3];
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 112:
    {
     i1 = i14;
     i15 = 336;
     break;
    }
   case 113:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     HEAPF64[i6 >> 3] = +HEAPF64[i6 >> 3] - +HEAPF64[i2 >> 3];
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 114:
    {
     i2 = i5 + -8 | 0;
     i1 = i2;
     HEAPF32[i2 >> 2] = Math_fround(+((HEAP32[i1 >> 2] | 0) >>> 0) + 4294967296.0 * +((HEAP32[i1 + 4 >> 2] | 0) >>> 0));
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 115:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     HEAPF64[i6 >> 3] = +HEAPF64[i6 >> 3] + +HEAPF64[i2 >> 3];
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 116:
    {
     i2 = i5 + -8 | 0;
     i1 = i2;
     HEAPF64[i2 >> 3] = +((HEAP32[i1 >> 2] | 0) >>> 0) + 4294967296.0 * +((HEAP32[i1 + 4 >> 2] | 0) >>> 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 117:
    {
     i2 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i2 >> 2]);
     HEAPF32[i2 >> 2] = Math_fround(f47 + Math_fround(HEAPF32[i10 >> 2]));
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 118:
    {
     i1 = (HEAP32[i13 >> 2] | 0) + 68 | 0;
     _memcpy(i5 | 0, i9 + (HEAP32[i14 >> 2] | 0) | 0, HEAP32[i1 >> 2] | 0) | 0;
     i5 = i5 + (HEAP32[i1 >> 2] | 0) | 0;
     i1 = i14 + 8 | 0;
     i15 = 28;
     break;
    }
   case 119:
    {
     i1 = i14;
     i15 = 28;
     break;
    }
   case 120:
    {
     HEAP32[i5 >> 2] = HEAP32[i16 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 121:
    {
     i1 = HEAP32[i14 >> 2] | 0;
     HEAP32[i10 >> 2] = ~~Math_fround(HEAPF32[i10 >> 2]) << i1 >> i1;
     i1 = i13;
     i15 = 344;
     break;
    }
   case 122:
    {
     HEAP32[i5 >> 2] = HEAP32[i9 + 4 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 123:
    {
     i1 = i14;
     i15 = 344;
     break;
    }
   case 124:
    {
     HEAP32[i5 >> 2] = HEAP32[i9 + 8 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 125:
    {
     HEAP32[i10 >> 2] = HEAP32[HEAP32[i10 >> 2] >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 126:
    {
     HEAP32[i5 >> 2] = HEAP32[i9 + 12 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 127:
    {
     i1 = i14;
     i15 = 464;
     break;
    }
   case 128:
    {
     HEAP32[i5 >> 2] = HEAP32[i9 + 16 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 129:
    {
     HEAP32[i5 >> 2] = HEAP32[(HEAP32[i14 >> 2] | 0) + 40 >> 2];
     i5 = i8;
     i1 = i13;
     i15 = 464;
     break;
    }
   case 130:
    {
     HEAP32[i5 >> 2] = HEAP32[i9 + 20 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 131:
    {
     i1 = i14;
     i15 = 462;
     break;
    }
   case 132:
    {
     HEAP32[i5 >> 2] = HEAP32[i9 + 24 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 133:
    {
     HEAP32[i5 >> 2] = HEAP32[i14 >> 2];
     i5 = i8;
     i1 = i13;
     i15 = 462;
     break;
    }
   case 134:
    {
     HEAP32[i5 >> 2] = HEAP32[i9 + 28 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 135:
    {
     i1 = i14;
     i15 = 135;
     break;
    }
   case 136:
    {
     i5 = i5 + -8 | 0;
     i12 = i5;
     i15 = HEAP32[i12 + 4 >> 2] | 0;
     i1 = i9 + (HEAP32[i14 >> 2] | 0) | 0;
     HEAP32[i1 >> 2] = HEAP32[i12 >> 2];
     HEAP32[i1 + 4 >> 2] = i15;
     i1 = i13;
     i15 = 42;
     break;
    }
   case 137:
    {
     i1 = i14;
     i15 = 42;
     break;
    }
   case 138:
    {
     HEAP32[i9 + (HEAP32[i14 >> 2] | 0) >> 2] = HEAP32[i10 >> 2];
     i5 = i10;
     i1 = i13;
     i15 = 40;
     break;
    }
   case 139:
    {
     i1 = i14;
     i15 = 40;
     break;
    }
   case 140:
    {
     if (!(HEAP32[i10 >> 2] | 0)) {
      i1 = i13;
      i5 = i10;
      i15 = 135;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i10;
      i15 = 135;
     }
     break;
    }
   case 141:
    {
     i6 = i5 + -16 | 0;
     HEAP32[i6 >> 2] = +HEAPF64[i6 >> 3] < +HEAPF64[i5 + -8 >> 3] & 1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i5 + -12 | 0;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 142:
    {
     i1 = i14;
     i15 = 139;
     break;
    }
   case 143:
    {
     i6 = i5 + -16 | 0;
     HEAP32[i6 >> 2] = +HEAPF64[i6 >> 3] > +HEAPF64[i5 + -8 >> 3] & 1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i5 + -12 | 0;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 144:
    {
     if (!(HEAP32[i10 >> 2] | 0)) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i10;
      i15 = 139;
     } else {
      i1 = i13;
      i5 = i10;
      i15 = 139;
     }
     break;
    }
   case 145:
    {
     i6 = i5 + -16 | 0;
     HEAP32[i6 >> 2] = +HEAPF64[i6 >> 3] == +HEAPF64[i5 + -8 >> 3] & 1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i5 + -12 | 0;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 146:
    {
     i2 = i5 + -12 | 0;
     i1 = i2;
     i1 = _bitshift64Lshr(HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0, HEAP32[i10 >> 2] | 0) | 0;
     HEAP32[i2 >> 2] = i1;
     HEAP32[i2 + 4 >> 2] = tempRet0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 147:
    {
     i2 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i2 >> 2]);
     HEAP32[i2 >> 2] = f47 < Math_fround(HEAPF32[i10 >> 2]) & 1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 148:
    {
     i2 = i5 + -12 | 0;
     i1 = i2;
     i1 = _bitshift64Ashr(HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0, HEAP32[i10 >> 2] | 0) | 0;
     HEAP32[i2 >> 2] = i1;
     HEAP32[i2 + 4 >> 2] = tempRet0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 149:
    {
     i2 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i2 >> 2]);
     HEAP32[i2 >> 2] = f47 > Math_fround(HEAPF32[i10 >> 2]) & 1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 150:
    {
     i1 = HEAP32[(HEAP32[i13 >> 2] | 0) + 68 >> 2] | 0;
     i2 = i5 + (0 - i1) | 0;
     _memcpy(i9 + (HEAP32[i14 >> 2] | 0) | 0, i2 | 0, i1 | 0) | 0;
     i1 = i14 + 8 | 0;
     i15 = 44;
     break;
    }
   case 151:
    {
     i1 = i14;
     i2 = i5;
     i15 = 44;
     break;
    }
   case 152:
    {
     HEAP32[i9 >> 2] = HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 153:
    {
     i2 = i5 + -12 | 0;
     i1 = i2;
     i1 = _bitshift64Shl(HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0, HEAP32[i10 >> 2] | 0) | 0;
     HEAP32[i2 >> 2] = i1;
     HEAP32[i2 + 4 >> 2] = tempRet0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 154:
    {
     HEAP32[i9 + 4 >> 2] = HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 155:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i2 >> 2] | 0) >>> (HEAP32[i10 >> 2] | 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 156:
    {
     HEAP32[i9 + 8 >> 2] = HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 157:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = HEAP32[i2 >> 2] >> HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 158:
    {
     HEAP32[i9 + 12 >> 2] = HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 159:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = HEAP32[i2 >> 2] << HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 160:
    {
     HEAP32[i9 + 16 >> 2] = HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 161:
    {
     i1 = i14;
     i15 = 251;
     break;
    }
   case 162:
    {
     HEAP32[i9 + 20 >> 2] = HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 163:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) >>> 0 < (HEAP32[i10 >> 2] | 0) >>> 0) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 251;
     } else {
      i1 = i13;
      i15 = 251;
     }
     break;
    }
   case 164:
    {
     HEAP32[i9 + 24 >> 2] = HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 165:
    {
     i1 = i14;
     i15 = 247;
     break;
    }
   case 166:
    {
     HEAP32[i9 + 28 >> 2] = HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 167:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) >>> 0 > (HEAP32[i10 >> 2] | 0) >>> 0) {
      i1 = i13;
      i15 = 247;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 247;
     }
     break;
    }
   case 168:
    {
     i12 = i5 + -8 | 0;
     i15 = HEAP32[i12 + 4 >> 2] | 0;
     i5 = i5 + -12 | 0;
     i1 = (HEAP32[i5 >> 2] | 0) + (HEAP32[(HEAP32[i14 >> 2] | 0) + 28 >> 2] | 0) | 0;
     HEAP32[i1 >> 2] = HEAP32[i12 >> 2];
     HEAP32[i1 + 4 >> 2] = i15;
     i1 = i13;
     i15 = 410;
     break;
    }
   case 169:
    {
     i1 = i14;
     i15 = 410;
     break;
    }
   case 170:
    {
     i5 = i5 + -8 | 0;
     HEAP32[(HEAP32[i5 >> 2] | 0) + (HEAP32[(HEAP32[i14 >> 2] | 0) + 28 >> 2] | 0) >> 2] = HEAP32[i10 >> 2];
     i1 = i13;
     i15 = 408;
     break;
    }
   case 171:
    {
     i1 = i14;
     i15 = 408;
     break;
    }
   case 172:
    {
     i1 = i14;
     i15 = 243;
     break;
    }
   case 173:
    {
     i2 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i2 >> 2]);
     HEAP32[i2 >> 2] = f47 == Math_fround(HEAPF32[i10 >> 2]) & 1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 174:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) >>> 0 > (HEAP32[i10 >> 2] | 0) >>> 0) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 243;
     } else {
      i1 = i13;
      i15 = 243;
     }
     break;
    }
   case 175:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i7 = i6;
     i8 = i2;
     i1 = HEAP32[i8 + 4 >> 2] ^ HEAP32[i7 + 4 >> 2];
     HEAP32[i6 >> 2] = HEAP32[i8 >> 2] ^ HEAP32[i7 >> 2];
     HEAP32[i6 + 4 >> 2] = i1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 176:
    {
     i1 = i14;
     i15 = 239;
     break;
    }
   case 177:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i7 = i6;
     i8 = i2;
     i1 = HEAP32[i8 + 4 >> 2] | HEAP32[i7 + 4 >> 2];
     HEAP32[i6 >> 2] = HEAP32[i8 >> 2] | HEAP32[i7 >> 2];
     HEAP32[i6 + 4 >> 2] = i1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 178:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) >>> 0 < (HEAP32[i10 >> 2] | 0) >>> 0) {
      i1 = i13;
      i15 = 239;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 239;
     }
     break;
    }
   case 179:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i7 = i6;
     i8 = i2;
     i1 = HEAP32[i8 + 4 >> 2] & HEAP32[i7 + 4 >> 2];
     HEAP32[i6 >> 2] = HEAP32[i8 >> 2] & HEAP32[i7 >> 2];
     HEAP32[i6 + 4 >> 2] = i1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 180:
    {
     i1 = i14;
     i15 = 235;
     break;
    }
   case 181:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i7 = i6;
     i1 = i2;
     i1 = ___uremdi3(HEAP32[i7 >> 2] | 0, HEAP32[i7 + 4 >> 2] | 0, HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0) | 0;
     HEAP32[i6 >> 2] = i1;
     HEAP32[i6 + 4 >> 2] = tempRet0;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 182:
    {
     i14 = HEAP32[i14 >> 2] | 0;
     i1 = HEAP32[i14 + 32 >> 2] | 0;
     i15 = i5 + (0 - i1) | 0;
     i5 = i15 + -4 | 0;
     i2 = HEAP32[i5 >> 2] | 0;
     _memcpy(i2 + (HEAP32[i14 + 28 >> 2] | 0) | 0, i15 | 0, i1 | 0) | 0;
     i1 = i13;
     i15 = 412;
     break;
    }
   case 183:
    {
     i2 = i11;
     i1 = i14;
     i15 = 412;
     break;
    }
   case 184:
    {
     i7 = 0;
     i15 = 430;
     break;
    }
   case 185:
    {
     i2 = i5 + -16 | 0;
     if (+HEAPF64[i2 >> 3] != +HEAPF64[i5 + -8 >> 3]) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 235;
     } else {
      i1 = i13;
      i5 = i2;
      i15 = 235;
     }
     break;
    }
   case 186:
    {
     i7 = 87;
     i15 = 430;
     break;
    }
   case 187:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i7 = i6;
     i1 = i2;
     i1 = ___remdi3(HEAP32[i7 >> 2] | 0, HEAP32[i7 + 4 >> 2] | 0, HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0) | 0;
     HEAP32[i6 >> 2] = i1;
     HEAP32[i6 + 4 >> 2] = tempRet0;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 188:
    {
     i1 = i14;
     i15 = 231;
     break;
    }
   case 189:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i7 = i6;
     i1 = i2;
     i1 = ___udivdi3(HEAP32[i7 >> 2] | 0, HEAP32[i7 + 4 >> 2] | 0, HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0) | 0;
     HEAP32[i6 >> 2] = i1;
     HEAP32[i6 + 4 >> 2] = tempRet0;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 190:
    {
     i5 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i5 >> 2]);
     if (f47 != Math_fround(HEAPF32[i10 >> 2])) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 231;
     } else {
      i1 = i13;
      i15 = 231;
     }
     break;
    }
   case 191:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i7 = i6;
     i1 = i2;
     i1 = ___divdi3(HEAP32[i7 >> 2] | 0, HEAP32[i7 + 4 >> 2] | 0, HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0) | 0;
     HEAP32[i6 >> 2] = i1;
     HEAP32[i6 + 4 >> 2] = tempRet0;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 192:
    {
     i1 = i14;
     i15 = 227;
     break;
    }
   case 193:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i1 = i6;
     i7 = i2;
     i1 = ___muldi3(HEAP32[i7 >> 2] | 0, HEAP32[i7 + 4 >> 2] | 0, HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0) | 0;
     HEAP32[i6 >> 2] = i1;
     HEAP32[i6 + 4 >> 2] = tempRet0;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 194:
    {
     i2 = i5 + -16 | 0;
     i12 = i2;
     i15 = i5 + -8 | 0;
     if ((HEAP32[i12 >> 2] | 0) == (HEAP32[i15 >> 2] | 0) ? (HEAP32[i12 + 4 >> 2] | 0) == (HEAP32[i15 + 4 >> 2] | 0) : 0) {
      i1 = i13;
      i5 = i2;
      i15 = 227;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 227;
     }
     break;
    }
   case 195:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i7 = i6;
     i1 = i2;
     i1 = _i64Subtract(HEAP32[i7 >> 2] | 0, HEAP32[i7 + 4 >> 2] | 0, HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0) | 0;
     HEAP32[i6 >> 2] = i1;
     HEAP32[i6 + 4 >> 2] = tempRet0;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 196:
    {
     i7 = 83;
     i15 = 430;
     break;
    }
   case 197:
    {
     i1 = i14;
     i15 = 223;
     break;
    }
   case 198:
    {
     HEAP32[HEAP32[(HEAP32[i14 >> 2] | 0) + 40 >> 2] >> 2] = HEAP32[i10 >> 2];
     i5 = i10;
     i1 = i13;
     i15 = 422;
     break;
    }
   case 199:
    {
     i1 = i14;
     i15 = 422;
     break;
    }
   case 200:
    {
     i5 = i5 + -8 | 0;
     i12 = i5;
     i15 = HEAP32[i12 + 4 >> 2] | 0;
     i1 = HEAP32[(HEAP32[i14 >> 2] | 0) + 40 >> 2] | 0;
     HEAP32[i1 >> 2] = HEAP32[i12 >> 2];
     HEAP32[i1 + 4 >> 2] = i15;
     i1 = i13;
     i15 = 424;
     break;
    }
   case 201:
    {
     i1 = i14;
     i15 = 424;
     break;
    }
   case 202:
    {
     i2 = i5 + -8 | 0;
     i6 = i5 + -16 | 0;
     i1 = i6;
     i7 = i2;
     i1 = _i64Add(HEAP32[i7 >> 2] | 0, HEAP32[i7 + 4 >> 2] | 0, HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0) | 0;
     HEAP32[i6 >> 2] = i1;
     HEAP32[i6 + 4 >> 2] = tempRet0;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 203:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) == (HEAP32[i10 >> 2] | 0)) {
      i1 = i13;
      i15 = 223;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 223;
     }
     break;
    }
   case 204:
    {
     i2 = i5 + -8 | 0;
     _SystemArray_LoadElement(HEAP32[i2 >> 2] | 0, HEAP32[i10 >> 2] | 0, i23);
     i6 = i23;
     i1 = HEAP32[i6 + 4 >> 2] | 0;
     HEAP32[i2 >> 2] = HEAP32[i6 >> 2];
     HEAP32[i2 + 4 >> 2] = i1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 205:
    {
     HEAP32[i10 >> 2] = ~~Math_fround(HEAPF32[i10 >> 2]) >>> 0 & HEAP32[i14 >> 2];
     i1 = i13;
     i15 = 346;
     break;
    }
   case 206:
    {
     i2 = i5 + -8 | 0;
     _SystemArray_LoadElement(HEAP32[i2 >> 2] | 0, HEAP32[i10 >> 2] | 0, i22);
     HEAP32[i2 >> 2] = HEAP32[i22 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 207:
    {
     i1 = i14;
     i15 = 346;
     break;
    }
   case 208:
    {
     i2 = i5 + -8 | 0;
     _SystemArray_LoadElement(HEAP32[i2 >> 2] | 0, HEAP32[i10 >> 2] | 0, i21);
     HEAP32[i2 >> 2] = HEAP32[i21 >> 2] & 65535;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 209:
    {
     f47 = Math_fround(HEAPF32[i10 >> 2]);
     i1 = +Math_abs(+f47) >= 1.0 ? (+f47 > 0.0 ? ~~+Math_min(+Math_floor(+f47 / 4294967296.0), 4294967295.0) >>> 0 : ~~+Math_ceil((+f47 - +(~~+f47 >>> 0)) / 4294967296.0) >>> 0) : 0;
     i2 = i10;
     HEAP32[i2 >> 2] = ~~+f47 >>> 0;
     HEAP32[i2 + 4 >> 2] = i1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 210:
    {
     i2 = i5 + -8 | 0;
     _SystemArray_LoadElement(HEAP32[i2 >> 2] | 0, HEAP32[i10 >> 2] | 0, i20);
     HEAP32[i2 >> 2] = HEAP32[i20 >> 2] << 16 >> 16;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 211:
    {
     i1 = i14;
     i15 = 219;
     break;
    }
   case 212:
    {
     i15 = HEAP32[i14 >> 2] | 0;
     i1 = HEAP32[i15 + 32 >> 2] | 0;
     i5 = i5 + (0 - i1) | 0;
     _memcpy(HEAP32[i15 + 40 >> 2] | 0, i5 | 0, i1 | 0) | 0;
     i1 = i13;
     i15 = 426;
     break;
    }
   case 213:
    {
     i1 = i14;
     i15 = 426;
     break;
    }
   case 214:
    {
     i2 = _Heap_AllocType(HEAP32[i14 >> 2] | 0) | 0;
     i5 = i5 + -8 | 0;
     i14 = i5;
     i15 = HEAP32[i14 + 4 >> 2] | 0;
     i1 = i2;
     HEAP32[i1 >> 2] = HEAP32[i14 >> 2];
     HEAP32[i1 + 4 >> 2] = i15;
     HEAP32[i5 >> 2] = i2;
     i5 = i10;
     i1 = i13;
     i15 = 447;
     break;
    }
   case 215:
    {
     i1 = i14;
     i2 = i11;
     i15 = 447;
     break;
    }
   case 216:
    {
     i2 = _Heap_AllocType(HEAP32[i14 >> 2] | 0) | 0;
     HEAP32[i2 >> 2] = HEAP32[i10 >> 2];
     HEAP32[i10 >> 2] = i2;
     i1 = i13;
     i15 = 445;
     break;
    }
   case 217:
    {
     i2 = i11;
     i1 = i14;
     i15 = 445;
     break;
    }
   case 218:
    {
     i2 = i5 + -8 | 0;
     _SystemArray_LoadElement(HEAP32[i2 >> 2] | 0, HEAP32[i10 >> 2] | 0, i42);
     HEAP32[i2 >> 2] = HEAP32[i42 >> 2] & 255;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 219:
    {
     i2 = i5 + -16 | 0;
     if (+HEAPF64[i2 >> 3] < +HEAPF64[i5 + -8 >> 3]) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 219;
     } else {
      i1 = i13;
      i5 = i2;
      i15 = 219;
     }
     break;
    }
   case 220:
    {
     i2 = i5 + -8 | 0;
     _SystemArray_LoadElement(HEAP32[i2 >> 2] | 0, HEAP32[i10 >> 2] | 0, i41);
     HEAP32[i2 >> 2] = HEAP32[i41 >> 2] << 24 >> 24;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 221:
    {
     i1 = i14;
     i15 = 215;
     break;
    }
   case 222:
    {
     i1 = i5 + -8 | 0;
     i6 = HEAP32[i1 + 4 >> 2] | 0;
     i2 = i25;
     HEAP32[i2 >> 2] = HEAP32[i1 >> 2];
     HEAP32[i2 + 4 >> 2] = i6;
     i2 = i5 + -16 | 0;
     _SystemArray_StoreElement(HEAP32[i2 >> 2] | 0, HEAP32[i5 + -12 >> 2] | 0, i25);
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 223:
    {
     i5 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i5 >> 2]);
     if (f47 < Math_fround(HEAPF32[i10 >> 2])) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 215;
     } else {
      i1 = i13;
      i15 = 215;
     }
     break;
    }
   case 224:
    {
     i1 = i13;
     i15 = 451;
     break;
    }
   case 225:
    {
     HEAP32[i24 >> 2] = HEAP32[i10 >> 2];
     i2 = i5 + -12 | 0;
     _SystemArray_StoreElement(HEAP32[i2 >> 2] | 0, HEAP32[i5 + -8 >> 2] | 0, i24);
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 226:
    {
     i1 = HEAP32[i14 >> 2] | 0;
     i2 = _Heap_AllocType(i1) | 0;
     i1 = HEAP32[i1 + 68 >> 2] | 0;
     i5 = i5 + (0 - i1) | 0;
     _memcpy(i2 | 0, i5 | 0, i1 | 0) | 0;
     HEAP32[i5 >> 2] = i2;
     i5 = i5 + 4 | 0;
     i1 = i13;
     i15 = 449;
     break;
    }
   case 227:
    {
     i1 = i14;
     i2 = i11;
     i15 = 449;
     break;
    }
   case 228:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i2 >> 2] | 0) == (HEAP32[i10 >> 2] | 0) & 1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 229:
    {
     i1 = i14;
     i15 = 211;
     break;
    }
   case 230:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i2 >> 2] | 0) > (HEAP32[i10 >> 2] | 0) & 1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 231:
    {
     i2 = i5 + -16 | 0;
     i12 = i2;
     i8 = HEAP32[i12 + 4 >> 2] | 0;
     i15 = i5 + -8 | 0;
     i10 = HEAP32[i15 + 4 >> 2] | 0;
     if ((i8 | 0) < (i10 | 0) | ((i8 | 0) == (i10 | 0) ? (HEAP32[i12 >> 2] | 0) >>> 0 < (HEAP32[i15 >> 2] | 0) >>> 0 : 0)) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 211;
     } else {
      i1 = i13;
      i5 = i2;
      i15 = 211;
     }
     break;
    }
   case 232:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i2 >> 2] | 0) >>> 0 > (HEAP32[i10 >> 2] | 0) >>> 0 & 1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 233:
    {
     i1 = i14;
     i15 = 207;
     break;
    }
   case 234:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i2 >> 2] | 0) < (HEAP32[i10 >> 2] | 0) & 1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 235:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) < (HEAP32[i10 >> 2] | 0)) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 207;
     } else {
      i1 = i13;
      i15 = 207;
     }
     break;
    }
   case 236:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i2 >> 2] | 0) >>> 0 < (HEAP32[i10 >> 2] | 0) >>> 0 & 1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 237:
    {
     f47 = Math_fround(HEAPF32[i10 >> 2]);
     i1 = +Math_abs(+f47) >= 1.0 ? (+f47 > 0.0 ? ~~+Math_min(+Math_floor(+f47 / 4294967296.0), 4294967295.0) >>> 0 : ~~+Math_ceil((+f47 - +(~~+f47 >>> 0)) / 4294967296.0) >>> 0) : 0;
     i2 = i10;
     HEAP32[i2 >> 2] = ~~+f47 >>> 0;
     HEAP32[i2 + 4 >> 2] = i1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 238:
    {
     i6 = i5 + -16 | 0;
     i7 = i6;
     i1 = i5 + -8 | 0;
     HEAP32[i6 >> 2] = ((HEAP32[i7 >> 2] | 0) == (HEAP32[i1 >> 2] | 0) ? (HEAP32[i7 + 4 >> 2] | 0) == (HEAP32[i1 + 4 >> 2] | 0) : 0) & 1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i5 + -12 | 0;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 239:
    {
     HEAPF64[i10 >> 3] = +Math_fround(HEAPF32[i10 >> 2]);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 240:
    {
     i6 = i5 + -16 | 0;
     i7 = i6;
     i10 = HEAP32[i7 + 4 >> 2] | 0;
     i1 = i5 + -8 | 0;
     i8 = HEAP32[i1 + 4 >> 2] | 0;
     HEAP32[i6 >> 2] = ((i10 | 0) > (i8 | 0) | ((i10 | 0) == (i8 | 0) ? (HEAP32[i7 >> 2] | 0) >>> 0 > (HEAP32[i1 >> 2] | 0) >>> 0 : 0)) & 1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i5 + -12 | 0;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 241:
    {
     i1 = i14;
     i15 = 203;
     break;
    }
   case 242:
    {
     i6 = i5 + -16 | 0;
     i7 = i6;
     i10 = HEAP32[i7 + 4 >> 2] | 0;
     i1 = i5 + -8 | 0;
     i8 = HEAP32[i1 + 4 >> 2] | 0;
     HEAP32[i6 >> 2] = (i10 >>> 0 > i8 >>> 0 | ((i10 | 0) == (i8 | 0) ? (HEAP32[i7 >> 2] | 0) >>> 0 > (HEAP32[i1 >> 2] | 0) >>> 0 : 0)) & 1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i5 + -12 | 0;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 243:
    {
     i2 = i5 + -16 | 0;
     if (!(+HEAPF64[i2 >> 3] <= +HEAPF64[i5 + -8 >> 3])) {
      i1 = i13;
      i5 = i2;
      i15 = 203;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 203;
     }
     break;
    }
   case 244:
    {
     i6 = i5 + -16 | 0;
     i7 = i6;
     i10 = HEAP32[i7 + 4 >> 2] | 0;
     i1 = i5 + -8 | 0;
     i8 = HEAP32[i1 + 4 >> 2] | 0;
     HEAP32[i6 >> 2] = ((i10 | 0) < (i8 | 0) | ((i10 | 0) == (i8 | 0) ? (HEAP32[i7 >> 2] | 0) >>> 0 < (HEAP32[i1 >> 2] | 0) >>> 0 : 0)) & 1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i5 + -12 | 0;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 245:
    {
     i1 = i14;
     i15 = 199;
     break;
    }
   case 246:
    {
     i6 = i5 + -16 | 0;
     i7 = i6;
     i10 = HEAP32[i7 + 4 >> 2] | 0;
     i1 = i5 + -8 | 0;
     i8 = HEAP32[i1 + 4 >> 2] | 0;
     HEAP32[i6 >> 2] = (i10 >>> 0 < i8 >>> 0 | ((i10 | 0) == (i8 | 0) ? (HEAP32[i7 >> 2] | 0) >>> 0 < (HEAP32[i1 >> 2] | 0) >>> 0 : 0)) & 1;
     i6 = i16;
     i1 = i14;
     i7 = i9;
     i8 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i5 + -12 | 0;
     i14 = i13;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 247:
    {
     i5 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i5 >> 2]);
     if (!(f47 <= Math_fround(HEAPF32[i10 >> 2]))) {
      i1 = i13;
      i15 = 199;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 199;
     }
     break;
    }
   case 248:
    {
     i5 = i5 + -8 | 0;
     i15 = HEAP32[i5 >> 2] | 0;
     i1 = i15 + (HEAP32[i10 >> 2] | 0) | 0;
     if ((i15 | 0) >= 0 ? (i1 | 0) < (i15 + -2147483648 | 0) : (i1 | 0) > (i15 + 2147483647 | 0)) {
      i11 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 168 >> 2] | 0) | 0;
      i1 = i14;
      i15 = 467;
      break L9;
     } else {
      HEAP32[i5 >> 2] = i1;
      i2 = i16;
      i1 = i14;
      i6 = i9;
      i7 = i4;
      i8 = i11;
      i12 = i3;
      i15 = i17;
      i5 = i10;
      i14 = i13;
      i16 = i2;
      i9 = i6;
      i4 = i7;
      i11 = i8;
      i3 = i12;
      i17 = i15;
      continue L7;
     }
    }
   case 249:
    {
     i1 = i14;
     i15 = 195;
     break;
    }
   case 250:
    {
     i5 = i5 + -8 | 0;
     i1 = _i64Add(HEAP32[i10 >> 2] | 0, 0, HEAP32[i5 >> 2] | 0, 0) | 0;
     i15 = tempRet0;
     if (i15 >>> 0 > 0 | (i15 | 0) == 0 & i1 >>> 0 > 4294967295) {
      i11 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 168 >> 2] | 0) | 0;
      i1 = i14;
      i15 = 467;
      break L9;
     } else {
      HEAP32[i5 >> 2] = i1;
      i2 = i16;
      i1 = i14;
      i6 = i9;
      i7 = i4;
      i8 = i11;
      i12 = i3;
      i15 = i17;
      i5 = i10;
      i14 = i13;
      i16 = i2;
      i9 = i6;
      i4 = i7;
      i11 = i8;
      i3 = i12;
      i17 = i15;
      continue L7;
     }
    }
   case 251:
    {
     i2 = i5 + -16 | 0;
     i12 = i2;
     i8 = HEAP32[i12 + 4 >> 2] | 0;
     i15 = i5 + -8 | 0;
     i10 = HEAP32[i15 + 4 >> 2] | 0;
     if ((i8 | 0) > (i10 | 0) | ((i8 | 0) == (i10 | 0) ? (HEAP32[i12 >> 2] | 0) >>> 0 > (HEAP32[i15 >> 2] | 0) >>> 0 : 0)) {
      i1 = i13;
      i5 = i2;
      i15 = 195;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 195;
     }
     break;
    }
   case 252:
    {
     i5 = i5 + -8 | 0;
     i1 = HEAP32[i5 >> 2] | 0;
     i15 = HEAP32[i10 >> 2] | 0;
     i1 = ___muldi3(i15 | 0, ((i15 | 0) < 0) << 31 >> 31 | 0, i1 | 0, ((i1 | 0) < 0) << 31 >> 31 | 0) | 0;
     i15 = _i64Add(i1 | 0, tempRet0 | 0, -2147483648, 0) | 0;
     i12 = tempRet0;
     if (i12 >>> 0 > 0 | (i12 | 0) == 0 & i15 >>> 0 > 4294967295) {
      i11 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 168 >> 2] | 0) | 0;
      i1 = i14;
      i15 = 467;
      break L9;
     } else {
      HEAP32[i5 >> 2] = i1;
      i2 = i16;
      i1 = i14;
      i6 = i9;
      i7 = i4;
      i8 = i11;
      i12 = i3;
      i15 = i17;
      i5 = i10;
      i14 = i13;
      i16 = i2;
      i9 = i6;
      i4 = i7;
      i11 = i8;
      i3 = i12;
      i17 = i15;
      continue L7;
     }
    }
   case 253:
    {
     i1 = i14;
     i15 = 191;
     break;
    }
   case 254:
    {
     i5 = i5 + -8 | 0;
     i15 = HEAP32[i5 >> 2] | 0;
     i12 = HEAP32[i10 >> 2] | 0;
     i1 = Math_imul(i15, i12) | 0;
     i8 = (i12 | 0) == 0;
     if (i8 ? 0 : ((i1 >>> 0) / ((i8 ? 1 : i12) >>> 0) | 0 | 0) != (i15 | 0)) {
      i11 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 168 >> 2] | 0) | 0;
      i1 = i14;
      i15 = 467;
      break L9;
     } else {
      HEAP32[i5 >> 2] = i1;
      i2 = i16;
      i1 = i14;
      i6 = i9;
      i7 = i4;
      i8 = i11;
      i12 = i3;
      i15 = i17;
      i5 = i10;
      i14 = i13;
      i16 = i2;
      i9 = i6;
      i4 = i7;
      i11 = i8;
      i3 = i12;
      i17 = i15;
      continue L7;
     }
    }
   case 255:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) > (HEAP32[i10 >> 2] | 0)) {
      i1 = i13;
      i15 = 191;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 191;
     }
     break;
    }
   case 256:
    {
     i5 = i5 + -8 | 0;
     i15 = HEAP32[i5 >> 2] | 0;
     i1 = HEAP32[i10 >> 2] | 0;
     i1 = _i64Subtract(i15 | 0, ((i15 | 0) < 0) << 31 >> 31 | 0, i1 | 0, ((i1 | 0) < 0) << 31 >> 31 | 0) | 0;
     i15 = _i64Add(i1 | 0, tempRet0 | 0, -2147483648, 0) | 0;
     i12 = tempRet0;
     if (i12 >>> 0 > 0 | (i12 | 0) == 0 & i15 >>> 0 > 4294967295) {
      i11 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 168 >> 2] | 0) | 0;
      i1 = i14;
      i15 = 467;
      break L9;
     } else {
      HEAP32[i5 >> 2] = i1;
      i2 = i16;
      i1 = i14;
      i6 = i9;
      i7 = i4;
      i8 = i11;
      i12 = i3;
      i15 = i17;
      i5 = i10;
      i14 = i13;
      i16 = i2;
      i9 = i6;
      i4 = i7;
      i11 = i8;
      i3 = i12;
      i17 = i15;
      continue L7;
     }
    }
   case 257:
    {
     i1 = HEAP32[i14 >> 2] | 0;
     i5 = i5 + -8 | 0;
     HEAP32[i5 >> 2] = ~~+HEAPF64[i5 >> 3] << i1 >> i1;
     i5 = i10;
     i1 = i13;
     i15 = 351;
     break;
    }
   case 258:
    {
     i5 = i5 + -8 | 0;
     i1 = _i64Subtract(HEAP32[i5 >> 2] | 0, 0, HEAP32[i10 >> 2] | 0, 0) | 0;
     i15 = tempRet0;
     if (i15 >>> 0 > 0 | (i15 | 0) == 0 & i1 >>> 0 > 4294967295) {
      i11 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 168 >> 2] | 0) | 0;
      i1 = i14;
      i15 = 467;
      break L9;
     } else {
      HEAP32[i5 >> 2] = i1;
      i2 = i16;
      i1 = i14;
      i6 = i9;
      i7 = i4;
      i8 = i11;
      i12 = i3;
      i15 = i17;
      i5 = i10;
      i14 = i13;
      i16 = i2;
      i9 = i6;
      i4 = i7;
      i11 = i8;
      i3 = i12;
      i17 = i15;
      continue L7;
     }
    }
   case 259:
    {
     i1 = i14;
     i15 = 351;
     break;
    }
   case 260:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i10 >> 2] | 0) + (HEAP32[i2 >> 2] | 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 261:
    {
     i5 = i5 + -8 | 0;
     HEAP32[i5 >> 2] = ~~+HEAPF64[i5 >> 3] >>> 0 & HEAP32[i14 >> 2];
     i5 = i10;
     i1 = i13;
     i15 = 353;
     break;
    }
   case 262:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i2 >> 2] | 0) - (HEAP32[i10 >> 2] | 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 263:
    {
     i1 = i14;
     i15 = 353;
     break;
    }
   case 264:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = Math_imul(HEAP32[i10 >> 2] | 0, HEAP32[i2 >> 2] | 0) | 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 265:
    {
     i1 = i14;
     i15 = 187;
     break;
    }
   case 266:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i2 >> 2] | 0) / (HEAP32[i10 >> 2] | 0) | 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 267:
    {
     i2 = i5 + -16 | 0;
     if (+HEAPF64[i2 >> 3] > +HEAPF64[i5 + -8 >> 3]) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 187;
     } else {
      i1 = i13;
      i5 = i2;
      i15 = 187;
     }
     break;
    }
   case 268:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = ((HEAP32[i2 >> 2] | 0) >>> 0) / ((HEAP32[i10 >> 2] | 0) >>> 0) | 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 269:
    {
     i1 = i14;
     i15 = 183;
     break;
    }
   case 270:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = (HEAP32[i2 >> 2] | 0) % (HEAP32[i10 >> 2] | 0) | 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 271:
    {
     i5 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i5 >> 2]);
     if (f47 > Math_fround(HEAPF32[i10 >> 2])) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 183;
     } else {
      i1 = i13;
      i15 = 183;
     }
     break;
    }
   case 272:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = ((HEAP32[i2 >> 2] | 0) >>> 0) % ((HEAP32[i10 >> 2] | 0) >>> 0) | 0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 273:
    {
     i1 = i14;
     i15 = 179;
     break;
    }
   case 274:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = HEAP32[i10 >> 2] & HEAP32[i2 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 275:
    {
     i2 = i5 + -16 | 0;
     i12 = i2;
     i8 = HEAP32[i12 + 4 >> 2] | 0;
     i15 = i5 + -8 | 0;
     i10 = HEAP32[i15 + 4 >> 2] | 0;
     if ((i8 | 0) > (i10 | 0) | ((i8 | 0) == (i10 | 0) ? (HEAP32[i12 >> 2] | 0) >>> 0 > (HEAP32[i15 >> 2] | 0) >>> 0 : 0)) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 179;
     } else {
      i1 = i13;
      i5 = i2;
      i15 = 179;
     }
     break;
    }
   case 276:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = HEAP32[i10 >> 2] | HEAP32[i2 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 277:
    {
     i1 = i14;
     i15 = 175;
     break;
    }
   case 278:
    {
     i2 = i5 + -8 | 0;
     HEAP32[i2 >> 2] = HEAP32[i10 >> 2] ^ HEAP32[i2 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 279:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) > (HEAP32[i10 >> 2] | 0)) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 175;
     } else {
      i1 = i13;
      i15 = 175;
     }
     break;
    }
   case 280:
    {
     HEAP32[i10 >> 2] = 0 - (HEAP32[i10 >> 2] | 0);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 281:
    {
     f47 = Math_fround(HEAPF32[i10 >> 2]);
     i1 = +Math_abs(+f47) >= 1.0 ? (+f47 > 0.0 ? ~~+Math_min(+Math_floor(+f47 / 4294967296.0), 4294967295.0) >>> 0 : ~~+Math_ceil((+f47 - +(~~+f47 >>> 0)) / 4294967296.0) >>> 0) : 0;
     i2 = i10;
     HEAP32[i2 >> 2] = ~~+f47 >>> 0;
     HEAP32[i2 + 4 >> 2] = i1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i8;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 282:
    {
     HEAP32[i10 >> 2] = ~HEAP32[i10 >> 2];
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 283:
    {
     i2 = i5 + -8 | 0;
     d48 = +HEAPF64[i2 >> 3];
     i1 = +Math_abs(d48) >= 1.0 ? (d48 > 0.0 ? ~~+Math_min(+Math_floor(d48 / 4294967296.0), 4294967295.0) >>> 0 : ~~+Math_ceil((d48 - +(~~d48 >>> 0)) / 4294967296.0) >>> 0) : 0;
     HEAP32[i2 >> 2] = ~~d48 >>> 0;
     HEAP32[i2 + 4 >> 2] = i1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 284:
    {
     i2 = i5 + -8 | 0;
     i1 = i2;
     i1 = _i64Subtract(0, 0, HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0) | 0;
     HEAP32[i2 >> 2] = i1;
     HEAP32[i2 + 4 >> 2] = tempRet0;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 285:
    {
     i1 = i14;
     i15 = 171;
     break;
    }
   case 286:
    {
     i2 = i5 + -8 | 0;
     i6 = i2;
     i1 = ~HEAP32[i6 + 4 >> 2];
     HEAP32[i2 >> 2] = ~HEAP32[i6 >> 2];
     HEAP32[i2 + 4 >> 2] = i1;
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i5;
     i10 = i11;
     i12 = i3;
     i15 = i17;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i5 = i8;
     i11 = i10;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 287:
    {
     i2 = i5 + -16 | 0;
     if (!(+HEAPF64[i2 >> 3] >= +HEAPF64[i5 + -8 >> 3])) {
      i1 = i13;
      i5 = i2;
      i15 = 171;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 171;
     }
     break;
    }
   case 288:
    {
     i2 = HEAP32[i14 >> 2] | 0;
     i1 = i5 + (-4 - (HEAP32[i2 + 68 >> 2] | 0)) | 0;
     i5 = i1 + 4 | 0;
     if (!(HEAP32[i1 >> 2] | 0)) {
      HEAP32[i1 >> 2] = 0;
      i1 = i13;
      i15 = 455;
      break L9;
     } else {
      HEAP32[i1 >> 2] = _Heap_Box(i2, i5) | 0;
      i1 = i13;
      i15 = 455;
      break L9;
     }
    }
   case 289:
    {
     i1 = i14;
     i15 = 455;
     break;
    }
   case 290:
    {
     i1 = i14;
     i15 = 167;
     break;
    }
   case 291:
    {
     i2 = i5 + -8 | 0;
     HEAPF32[i2 >> 2] = Math_fround(+HEAPF64[i2 >> 3]);
     i2 = i16;
     i1 = i14;
     i6 = i9;
     i7 = i4;
     i8 = i11;
     i12 = i3;
     i15 = i17;
     i5 = i10;
     i14 = i13;
     i16 = i2;
     i9 = i6;
     i4 = i7;
     i11 = i8;
     i3 = i12;
     i17 = i15;
     continue L7;
    }
   case 292:
    {
     i2 = HEAP32[i10 >> 2] | 0;
     i1 = (HEAP32[i14 >> 2] | 0) + 68 | 0;
     if (!i2) {
      HEAP32[i10 >> 2] = 0;
      i5 = i5 + (HEAP32[i1 >> 2] | 0) | 0;
      i1 = i13;
      i15 = 460;
      break L9;
     } else {
      HEAP32[i10 >> 2] = 1;
      _memcpy(i5 | 0, i2 | 0, HEAP32[i1 >> 2] | 0) | 0;
      i5 = i5 + (HEAP32[i1 >> 2] | 0) | 0;
      i1 = i13;
      i15 = 460;
      break L9;
     }
    }
   case 293:
    {
     i1 = i14;
     i15 = 460;
     break;
    }
   case 294:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) == (HEAP32[i10 >> 2] | 0)) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 143;
     } else {
      i1 = i13;
      i15 = 143;
     }
     break;
    }
   case 295:
    {
     i1 = i14;
     i15 = 143;
     break;
    }
   case 296:
    {
     i2 = i5 + -16 | 0;
     i12 = i2;
     i15 = i5 + -8 | 0;
     if ((HEAP32[i12 >> 2] | 0) == (HEAP32[i15 >> 2] | 0) ? (HEAP32[i12 + 4 >> 2] | 0) == (HEAP32[i15 + 4 >> 2] | 0) : 0) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 147;
     } else {
      i1 = i13;
      i5 = i2;
      i15 = 147;
     }
     break;
    }
   case 297:
    {
     i1 = i14;
     i15 = 147;
     break;
    }
   case 298:
    {
     i5 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i5 >> 2]);
     if (f47 == Math_fround(HEAPF32[i10 >> 2])) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 151;
     } else {
      i1 = i13;
      i15 = 151;
     }
     break;
    }
   case 299:
    {
     i1 = i14;
     i15 = 151;
     break;
    }
   case 300:
    {
     i2 = i5 + -16 | 0;
     if (+HEAPF64[i2 >> 3] == +HEAPF64[i5 + -8 >> 3]) {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 155;
     } else {
      i1 = i13;
      i5 = i2;
      i15 = 155;
     }
     break;
    }
   case 301:
    {
     i1 = i14;
     i15 = 155;
     break;
    }
   case 302:
    {
     i5 = i5 + -8 | 0;
     if ((HEAP32[i5 >> 2] | 0) < (HEAP32[i10 >> 2] | 0)) {
      i1 = i13;
      i15 = 159;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 159;
     }
     break;
    }
   case 303:
    {
     i1 = i14;
     i15 = 159;
     break;
    }
   case 304:
    {
     i2 = i5 + -16 | 0;
     i12 = i2;
     i8 = HEAP32[i12 + 4 >> 2] | 0;
     i15 = i5 + -8 | 0;
     i10 = HEAP32[i15 + 4 >> 2] | 0;
     if ((i8 | 0) < (i10 | 0) | ((i8 | 0) == (i10 | 0) ? (HEAP32[i12 >> 2] | 0) >>> 0 < (HEAP32[i15 >> 2] | 0) >>> 0 : 0)) {
      i1 = i13;
      i5 = i2;
      i15 = 163;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i5 = i2;
      i15 = 163;
     }
     break;
    }
   case 305:
    {
     i1 = i14;
     i15 = 163;
     break;
    }
   case 306:
    {
     i5 = i5 + -8 | 0;
     f47 = Math_fround(HEAPF32[i5 >> 2]);
     if (!(f47 >= Math_fround(HEAPF32[i10 >> 2]))) {
      i1 = i13;
      i15 = 167;
     } else {
      i1 = i3 + (HEAP32[i14 >> 2] << 2) | 0;
      i15 = 167;
     }
     break;
    }
   default:
    {
     i15 = 507;
     break L7;
    }
   } while (0);
   L318 : switch (i15 | 0) {
   case 11:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 13:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 16:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 22:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 24:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 26:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 28:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 38:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 40:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 42:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 44:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 57:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i5 = i2;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 65:
    {
     i2 = HEAP32[i45 >> 2] | 0;
     i8 = HEAP32[i2 + 48 >> 2] | 0;
     i1 = HEAP32[(HEAP32[i2 + 4 >> 2] | 0) + 44 >> 2] | 0;
     if (!i8) {
      i15 = 66;
      break L7;
     }
     if (!i1) i6 = (HEAP32[i2 + 28 >> 2] | 0) == 0 ? 0 : 4; else i6 = HEAP32[i1 + 68 >> 2] | 0;
     i7 = HEAP32[i2 + 16 >> 2] | 0;
     HEAP32[i36 >> 2] = i2;
     HEAP32[i28 >> 2] = i8;
     HEAP32[i45 >> 2] = i8;
     i2 = HEAP32[i8 + 24 >> 2] | 0;
     i5 = (HEAP32[i8 + 16 >> 2] | 0) + (HEAP32[i8 + 20 >> 2] | 0) | 0;
     i4 = HEAP32[i8 + 8 >> 2] | 0;
     i3 = HEAP32[i4 >> 2] | 0;
     i1 = i3 + (HEAP32[i8 + 12 >> 2] << 2) | 0;
     if (i6) {
      _memmove(i5 | 0, i7 | 0, i6 | 0) | 0;
      i5 = i5 + i6 | 0;
     }
     _MethodState_Delete(i19, i36);
     if (!(HEAP32[(HEAP32[i45 >> 2] | 0) + 36 >> 2] | 0)) {
      i13 = i11;
      i15 = i17;
      i9 = i2;
      i14 = i1 + 4 | 0;
      i16 = i2;
      i11 = i13;
      i17 = i15;
      continue L7;
     } else i15 = 75;
     break;
    }
   case 96:
    {
     i13 = i11;
     i15 = i17;
     i9 = i2;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i11 = i13;
     i17 = i15;
     continue L7;
    }
   case 101:
    {
     i1 = i17 + -1 | 0;
     if (!i1) {
      i1 = i14;
      i15 = 504;
      break L7;
     } else {
      i6 = i16;
      i7 = i14;
      i8 = i9;
      i10 = i4;
      i12 = i11;
      i15 = i3;
      i17 = i1;
      i14 = i13;
      i16 = i6;
      i1 = i7;
      i9 = i8;
      i4 = i10;
      i11 = i12;
      i3 = i15;
      continue L7;
     }
    }
   case 105:
    {
     i4 = HEAP32[i14 >> 2] | 0;
     i7 = i1;
     i2 = 0;
     i1 = i14;
     i8 = i4;
     i4 = i4 + 40 | 0;
     i15 = 109;
     break;
    }
   case 108:
    {
     HEAP32[i6 >> 2] = i4;
     i4 = i9;
     i15 = 109;
     break;
    }
   case 126:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i5;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i5 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 131:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 135:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 139:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 143:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 147:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 151:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 155:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 159:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 163:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 167:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 171:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 175:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 179:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 183:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 187:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 191:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 195:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 199:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 203:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 207:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 211:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 215:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 219:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 223:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 227:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 231:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 235:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 239:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 243:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 247:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 251:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 326:
    {
     i6 = i16;
     i7 = i9;
     i8 = i4;
     i10 = i5;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i5 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 328:
    {
     i6 = i16;
     i7 = i9;
     i8 = i4;
     i10 = i5;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i5 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 336:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 338:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 344:
    {
     i6 = i16;
     i7 = i9;
     i8 = i4;
     i10 = i5;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i5 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 346:
    {
     i6 = i16;
     i7 = i9;
     i8 = i4;
     i10 = i5;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i5 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 351:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 353:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 358:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 360:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 362:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 369:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i15 = i11;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i11 = i15;
     continue L7;
    }
   case 373:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i15 = i11;
     i17 = i2;
     i9 = i10;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i11 = i15;
     continue L7;
    }
   case 376:
    {
     i15 = 0;
     i1 = HEAP32[i14 >> 2] | 0;
     i2 = HEAP32[i10 >> 2] | 0;
     if (!i2) {
      HEAP32[i10 >> 2] = 0;
      i1 = i13;
      i15 = 389;
      break;
     }
     i6 = _Heap_GetType(i2) | 0;
     i7 = HEAP32[i6 + 96 >> 2] | 0;
     if ((i7 | 0) != 0 ? (i26 = HEAP32[i1 + 96 >> 2] | 0, (i26 | 0) != 0) : 0) {
      if (_Type_IsAssignableFrom(i26, i7) | 0) {
       HEAP32[i10 >> 2] = i2;
       i1 = i13;
       i15 = 389;
       break;
      }
     } else i15 = 382;
     do if ((i15 | 0) == 382) {
      if (!(_Type_IsAssignableFrom(i1, i6) | 0)) {
       if ((HEAP32[i1 + 88 >> 2] | 0) != (HEAP32[(HEAP32[8595] | 0) + 184 >> 2] | 0)) break;
       if ((HEAP32[HEAP32[i1 + 92 >> 2] >> 2] | 0) != (i6 | 0)) break;
      }
      HEAP32[i10 >> 2] = i2;
      i1 = i13;
      i15 = 389;
      break L318;
     } while (0);
     if ((i8 | 0) == 15) {
      HEAP32[i10 >> 2] = 0;
      i1 = i13;
      i15 = 389;
      break;
     } else {
      _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 48 >> 2] | 0) | 0;
      i5 = i10;
      i1 = i13;
      i15 = 467;
      break;
     }
    }
   case 392:
    {
     i13 = i11;
     i15 = i17;
     i9 = i6;
     i14 = i1 + 4 | 0;
     i16 = i2;
     i11 = i13;
     i17 = i15;
     continue L7;
    }
   case 401:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 406:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 408:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 410:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 412:
    {
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i3;
     i15 = i17;
     i11 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 414:
    {
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i3;
     i15 = i17;
     i11 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 416:
    {
     i6 = i16;
     i7 = i9;
     i8 = i4;
     i10 = i5;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i5 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 418:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 420:
    {
     i6 = i16;
     i7 = i9;
     i8 = i4;
     i10 = i5;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i5 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 422:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 424:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 426:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 430:
    {
     i6 = HEAP32[i14 >> 2] | 0;
     i1 = HEAP32[i6 + 24 >> 2] | 0;
     i2 = i1 + 56 | 0;
     if ((HEAP8[i2 >> 0] | 0) == 0 ? (HEAP8[i2 >> 0] = 1, i27 = HEAP32[i1 + 60 >> 2] | 0, i27 | 0) : 0) {
      i6 = _MethodState_Direct(i19, i27, HEAP32[i45 >> 2] | 0, 0) | 0;
      i4 = HEAP32[i45 >> 2] | 0;
      HEAP32[i4 + 20 >> 2] = i5 - (HEAP32[i4 + 16 >> 2] | 0);
      HEAP32[i4 + 12 >> 2] = i14 + -4 - i12 >> 2;
      HEAP32[i28 >> 2] = i6;
      HEAP32[i45 >> 2] = i6;
      i5 = (HEAP32[i6 + 16 >> 2] | 0) + (HEAP32[i6 + 20 >> 2] | 0) | 0;
      i4 = HEAP32[i6 + 8 >> 2] | 0;
      i3 = HEAP32[i4 >> 2] | 0;
      i1 = i3 + (HEAP32[i6 + 12 >> 2] << 2) | 0;
      i2 = i17 + -1 | 0;
      if (!i2) {
       i15 = 504;
       break L7;
      }
      i16 = HEAP32[i6 + 24 >> 2] | 0;
      i15 = i11;
      i17 = i2;
      i9 = i16;
      i14 = i1 + 4 | 0;
      i11 = i15;
      continue L7;
     }
     i1 = HEAP32[i6 + 40 >> 2] | 0;
     switch (i7 & 127) {
     case 83:
      {
       i14 = i1;
       i15 = HEAP32[i14 + 4 >> 2] | 0;
       i1 = i5;
       HEAP32[i1 >> 2] = HEAP32[i14 >> 2];
       HEAP32[i1 + 4 >> 2] = i15;
       i5 = i5 + 8 | 0;
       i1 = i13;
       i15 = 440;
       break L318;
      }
     case 87:
      {
       i15 = i6 + 32 | 0;
       _memcpy(i5 | 0, i1 | 0, HEAP32[i15 >> 2] | 0) | 0;
       i5 = i5 + (HEAP32[i15 >> 2] | 0) | 0;
       i1 = i13;
       i15 = 440;
       break L318;
      }
     case 45:
      break;
     default:
      i1 = HEAP32[i1 >> 2] | 0;
     }
     HEAP32[i5 >> 2] = i1;
     i5 = i8;
     i1 = i13;
     i15 = 440;
     break;
    }
   case 442:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 445:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i5;
     i13 = i3;
     i15 = i17;
     i11 = i2;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i5 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 447:
    {
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i3;
     i15 = i17;
     i11 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 449:
    {
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i3;
     i15 = i17;
     i11 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 451:
    {
     i6 = i16;
     i7 = i9;
     i8 = i4;
     i10 = i5;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i6;
     i9 = i7;
     i4 = i8;
     i5 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 455:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 460:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 462:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 464:
    {
     i7 = i16;
     i8 = i9;
     i10 = i4;
     i12 = i11;
     i13 = i3;
     i15 = i17;
     i14 = i1 + 4 | 0;
     i16 = i7;
     i9 = i8;
     i4 = i10;
     i11 = i12;
     i3 = i13;
     i17 = i15;
     continue L7;
    }
   case 498:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   case 502:
    {
     i2 = i17 + -1 | 0;
     if (!i2) {
      i15 = 504;
      break L7;
     }
     i8 = i16;
     i10 = i9;
     i12 = i4;
     i13 = i11;
     i15 = i3;
     i17 = i2;
     i14 = i1 + 4 | 0;
     i16 = i8;
     i9 = i10;
     i4 = i12;
     i11 = i13;
     i3 = i15;
     continue L7;
    }
   }
   L480 : do if ((i15 | 0) == 75) {
    i4 = HEAP32[i45 >> 2] | 0;
    i2 = HEAP32[i4 + 36 >> 2] | 0;
    if (!i2) {
     i6 = (HEAP32[i1 >> 2] | 0) + 40 | 0;
     i16 = HEAP32[i6 >> 2] | 0;
     i5 = i5 + (0 - i16) | 0;
     i16 = _malloc(i16 + -4 | 0) | 0;
     HEAP32[i4 + 40 >> 2] = i16;
     _memcpy(i16 | 0, i5 + 4 | 0, (HEAP32[i6 >> 2] | 0) + -4 | 0) | 0;
     i6 = i5;
     i1 = i1 + 4 | 0;
    } else {
     i2 = HEAP32[(_Delegate_GetMethod(i2) | 0) + 44 >> 2] | 0;
     if (!i2) i2 = i5; else i2 = i5 + (0 - (HEAP32[i2 + 68 >> 2] | 0)) | 0;
     i4 = HEAP32[i45 >> 2] | 0;
     i6 = i4 + 36 | 0;
     i5 = i2;
    }
    i2 = HEAP32[i6 >> 2] | 0;
    if (!i2) {
     i11 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 84 >> 2] | 0) | 0;
     i15 = 467;
     break;
    }
    i4 = _Delegate_GetMethodAndStore(i2, i38, i4 + 36 | 0) | 0;
    i7 = _MethodState_Direct(i19, i4, HEAP32[i45 >> 2] | 0, 0) | 0;
    i2 = HEAP32[i38 >> 2] | 0;
    i6 = i7 + 24 | 0;
    if (!i2) i2 = 0; else {
     HEAP32[HEAP32[i6 >> 2] >> 2] = i2;
     i2 = 4;
    }
    _memcpy((HEAP32[i6 >> 2] | 0) + i2 | 0, HEAP32[(HEAP32[i45 >> 2] | 0) + 40 >> 2] | 0, (HEAP32[i4 + 40 >> 2] | 0) - i2 | 0) | 0;
    i4 = HEAP32[i45 >> 2] | 0;
    HEAP32[i4 + 20 >> 2] = i5 - (HEAP32[i4 + 16 >> 2] | 0);
    HEAP32[i4 + 12 >> 2] = i1 - i3 >> 2;
    HEAP32[i28 >> 2] = i7;
    HEAP32[i45 >> 2] = i7;
    i6 = HEAP32[i6 >> 2] | 0;
    i4 = HEAP32[i7 + 8 >> 2] | 0;
    i1 = HEAP32[i4 >> 2] | 0;
    i2 = i6;
    i3 = i1;
    i1 = i1 + (HEAP32[i7 + 12 >> 2] << 2) | 0;
    i5 = (HEAP32[i7 + 16 >> 2] | 0) + (HEAP32[i7 + 20 >> 2] | 0) | 0;
    i15 = 85;
   } else if ((i15 | 0) == 109) {
    i15 = 0;
    i1 = i1 + 4 | 0;
    i9 = i8 + 56 | 0;
    L482 : do switch (i7 | 0) {
    case 5:
    case 11:
    case 23:
     {
      if (!i2) {
       i2 = HEAP32[i5 + (0 - (HEAP32[i4 >> 2] | 0)) >> 2] | 0;
       if (!i2) {
        i11 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 84 >> 2] | 0) | 0;
        i15 = 467;
        break L480;
       }
      }
      i3 = _Heap_GetType(i2) | 0;
      if (!(HEAP16[i8 + 14 >> 1] & 64)) i3 = i8; else i3 = HEAP32[(HEAP32[i3 + 44 >> 2] | 0) + (HEAP32[i9 >> 2] << 2) >> 2] | 0;
      break;
     }
    case 33:
     {
      i3 = HEAP32[i8 + 48 >> 2] | 0;
      i8 = HEAP32[i5 + (0 - (HEAP32[i4 >> 2] | 0)) >> 2] | 0;
      i7 = _Heap_GetType(i8) | 0;
      i2 = i7 + 76 | 0;
      i4 = HEAP32[i7 + 72 >> 2] | 0;
      while (1) {
       i16 = i4;
       i4 = i4 + -1 | 0;
       if ((i16 | 0) <= 0) {
        i2 = -1;
        break;
       }
       i6 = HEAP32[i2 >> 2] | 0;
       if ((HEAP32[i6 + (i4 * 12 | 0) >> 2] | 0) == (i3 | 0)) {
        i15 = 118;
        break;
       }
      }
      do if ((i15 | 0) == 118) {
       i3 = HEAP32[i6 + (i4 * 12 | 0) + 4 >> 2] | 0;
       i2 = HEAP32[i9 >> 2] | 0;
       if (!i3) {
        i3 = HEAP32[(HEAP32[i6 + (i4 * 12 | 0) + 8 >> 2] | 0) + (i2 << 2) >> 2] | 0;
        i2 = i8;
        break L482;
       } else {
        i2 = HEAP32[i3 + (i2 << 2) >> 2] | 0;
        break;
       }
      } while (0);
      i3 = HEAP32[(HEAP32[i7 + 44 >> 2] | 0) + (i2 << 2) >> 2] | 0;
      i2 = i8;
      break;
     }
    default:
     i3 = i8;
    } while (0);
    i15 = _MethodState_Direct(i19, i3, HEAP32[i45 >> 2] | 0, 0) | 0;
    HEAP32[i32 >> 2] = i5;
    i8 = i15 + 24 | 0;
    _CreateParameters(HEAP32[i8 >> 2] | 0, i3, i32, 0);
    i6 = HEAP32[i45 >> 2] | 0;
    HEAP32[i6 + 20 >> 2] = (HEAP32[i32 >> 2] | 0) - (HEAP32[i6 + 16 >> 2] | 0);
    HEAP32[i6 + 12 >> 2] = i1 - i12 >> 2;
    HEAP32[i28 >> 2] = i15;
    HEAP32[i45 >> 2] = i15;
    i8 = HEAP32[i8 >> 2] | 0;
    i6 = HEAP32[i15 + 8 >> 2] | 0;
    i3 = HEAP32[i6 >> 2] | 0;
    i1 = i3 + (HEAP32[i15 + 12 >> 2] << 2) | 0;
    i7 = i8;
    i5 = (HEAP32[i15 + 16 >> 2] | 0) + (HEAP32[i15 + 20 >> 2] | 0) | 0;
    i15 = 123;
   } else if ((i15 | 0) == 389) {
    i6 = i16;
    i7 = i9;
    i8 = i4;
    i10 = i5;
    i12 = i11;
    i13 = i3;
    i15 = i17;
    i14 = i1 + 4 | 0;
    i16 = i6;
    i9 = i7;
    i4 = i8;
    i5 = i10;
    i11 = i12;
    i3 = i13;
    i17 = i15;
    continue L7;
   } else if ((i15 | 0) == 440) {
    i7 = i16;
    i8 = i9;
    i10 = i4;
    i12 = i11;
    i13 = i3;
    i15 = i17;
    i14 = i1 + 4 | 0;
    i16 = i7;
    i9 = i8;
    i4 = i10;
    i11 = i12;
    i3 = i13;
    i17 = i15;
    continue L7;
   } while (0);
   if ((i15 | 0) == 85) {
    i13 = i11;
    i15 = i17;
    i9 = i2;
    i14 = i1 + 4 | 0;
    i16 = i6;
    i11 = i13;
    i17 = i15;
    continue;
   } else if ((i15 | 0) == 123) {
    i4 = i17 + -1 | 0;
    if (!i4) {
     i15 = 504;
     break;
    }
    i17 = i4;
    i11 = i2;
    i4 = i6;
    i9 = i7;
    i14 = i1 + 4 | 0;
    i16 = i8;
    continue;
   } else if ((i15 | 0) == 467) {
    HEAP32[i34 >> 2] = i11;
    i12 = i11;
    i15 = 468;
   }
   if ((i15 | 0) == 468) {
    i9 = HEAP32[i45 >> 2] | 0;
    HEAP32[i9 + 20 >> 2] = i5 - (HEAP32[i9 + 16 >> 2] | 0);
    HEAP32[i9 + 12 >> 2] = i1 - i3 >> 2;
    i9 = _Heap_GetType(i12) | 0;
    i10 = i9 + 16 | 0;
    i11 = i9 + 12 | 0;
    i2 = HEAP32[i45 >> 2] | 0;
    L523 : while (1) {
     i7 = i2 + 4 | 0;
     i8 = i2 + 12 | 0;
     i6 = 0;
     while (1) {
      i4 = HEAP32[(HEAP32[i7 >> 2] | 0) + 28 >> 2] | 0;
      if (i6 >>> 0 >= (HEAP32[i4 + 12 >> 2] | 0) >>> 0) break;
      i4 = HEAP32[i4 + 16 >> 2] | 0;
      i5 = i4 + (i6 * 24 | 0) | 0;
      if ((((HEAP32[i5 >> 2] | 0) == 0 ? (i29 = (HEAP32[i8 >> 2] | 0) + -1 | 0, i29 >>> 0 >= (HEAP32[i4 + (i6 * 24 | 0) + 4 >> 2] | 0) >>> 0) : 0) ? i29 >>> 0 < (HEAP32[i4 + (i6 * 24 | 0) + 8 >> 2] | 0) >>> 0 : 0) ? _Type_IsDerivedFromOrSame(HEAP32[i4 + (i6 * 24 | 0) + 20 >> 2] | 0, i9) | 0 : 0) break L523;
      i6 = i6 + 1 | 0;
     }
     i2 = HEAP32[i2 + 48 >> 2] | 0;
     if (!i2) {
      i15 = 477;
      break L7;
     }
    }
    HEAP32[i33 >> 2] = i2;
    HEAP32[i35 >> 2] = i5;
    i5 = i12;
    i4 = HEAP32[i45 >> 2] | 0;
    i15 = 479;
   }
   while (1) if ((i15 | 0) == 479) if ((i4 | 0) == (i2 | 0)) {
    HEAP32[i2 + 12 >> 2] = HEAP32[(HEAP32[i35 >> 2] | 0) + 12 >> 2];
    i1 = HEAP32[i28 >> 2] | 0;
    HEAP32[i45 >> 2] = i1;
    i6 = HEAP32[i1 + 24 >> 2] | 0;
    i8 = HEAP32[i1 + 16 >> 2] | 0;
    i4 = HEAP32[i1 + 8 >> 2] | 0;
    i10 = HEAP32[i4 >> 2] | 0;
    i1 = i10 + (HEAP32[i1 + 12 >> 2] << 2) | 0;
    HEAP32[i8 >> 2] = HEAP32[i34 >> 2];
    i7 = i5;
    i5 = i8 + 4 | 0;
    i8 = i6;
    i15 = 489;
    continue;
   } else {
    i11 = i5;
    i2 = HEAP32[i37 >> 2] | 0;
    i15 = 481;
    continue;
   } else if ((i15 | 0) == 481) {
    i7 = HEAP32[(HEAP32[i4 + 4 >> 2] | 0) + 28 >> 2] | 0;
    i6 = HEAP32[i7 + 12 >> 2] | 0;
    i7 = i7 + 16 | 0;
    i10 = i4 + 12 | 0;
    while (1) {
     if (i2 >>> 0 >= i6 >>> 0) {
      i15 = 487;
      break;
     }
     i8 = HEAP32[i7 >> 2] | 0;
     i9 = i2 + 1 | 0;
     if ((HEAP32[i8 + (i2 * 24 | 0) >> 2] | 0) != 2) {
      i2 = i9;
      continue;
     }
     i5 = (HEAP32[i10 >> 2] | 0) + -1 | 0;
     if (i5 >>> 0 < (HEAP32[i8 + (i2 * 24 | 0) + 4 >> 2] | 0) >>> 0) {
      i2 = i9;
      continue;
     }
     if (i5 >>> 0 < (HEAP32[i8 + (i2 * 24 | 0) + 8 >> 2] | 0) >>> 0) {
      i15 = 486;
      break;
     } else i2 = i9;
    }
    if ((i15 | 0) == 486) {
     i5 = HEAP32[i4 + 16 >> 2] | 0;
     HEAP32[i4 + 20 >> 2] = 0;
     HEAP32[i28 >> 2] = i4;
     HEAP32[i45 >> 2] = i4;
     i6 = HEAP32[i4 + 24 >> 2] | 0;
     i4 = HEAP32[i4 + 8 >> 2] | 0;
     i16 = HEAP32[i4 >> 2] | 0;
     HEAP32[i10 >> 2] = HEAP32[i8 + (i2 * 24 | 0) + 12 >> 2];
     HEAP32[i37 >> 2] = i9;
     i10 = i16;
     i7 = i11;
     i8 = i6;
     i1 = i16 + (i1 - i3 >> 2 << 2) | 0;
     i15 = 489;
     continue;
    } else if ((i15 | 0) == 487) {
     i4 = HEAP32[i4 + 48 >> 2] | 0;
     _MethodState_Delete(i19, i45);
     HEAP32[i45 >> 2] = i4;
     HEAP32[i37 >> 2] = 0;
     i5 = i11;
     i2 = HEAP32[i33 >> 2] | 0;
     i15 = 479;
     continue;
    }
   } else if ((i15 | 0) == 489) {
    i2 = i17 + -1 | 0;
    if (!i2) {
     i3 = i10;
     i15 = 504;
     break L7;
    } else break;
   }
   i17 = i2;
   i3 = i10;
   i11 = i7;
   i9 = i8;
   i14 = i1 + 4 | 0;
   i16 = i6;
  }
  if ((i15 | 0) == 6) _Crash(14360, i43); else if ((i15 | 0) == 63) {
   i45 = HEAP32[i45 >> 2] | 0;
   HEAP32[i45 + 20 >> 2] = i5 - (HEAP32[i45 + 16 >> 2] | 0);
   HEAP32[i45 + 12 >> 2] = 3;
   if ((i1 | 0) == 1) {
    i18 = 4;
    break;
   }
   HEAP32[i19 + 44 >> 2] = i1;
   i18 = 3;
   break;
  } else if ((i15 | 0) == 66) {
   if ((i1 | 0) != (HEAP32[(HEAP32[8595] | 0) + 32 >> 2] | 0)) {
    i18 = 1;
    break;
   }
   HEAP32[i19 + 24 >> 2] = HEAP32[i10 >> 2];
   i18 = 1;
   break;
  } else if ((i15 | 0) == 477) {
   i41 = HEAP32[(HEAP32[i45 >> 2] | 0) + 4 >> 2] | 0;
   i42 = HEAP32[i41 + 16 >> 2] | 0;
   i43 = HEAP32[i10 >> 2] | 0;
   i45 = HEAP32[i11 >> 2] | 0;
   HEAP32[i44 >> 2] = HEAP32[(HEAP32[i41 + 48 >> 2] | 0) + 12 >> 2];
   HEAP32[i44 + 4 >> 2] = i42;
   HEAP32[i44 + 8 >> 2] = i43;
   HEAP32[i44 + 12 >> 2] = i45;
   _Crash(14380, i44);
  } else if ((i15 | 0) == 504) {
   i18 = HEAP32[i45 >> 2] | 0;
   HEAP32[i18 + 20 >> 2] = i5 - (HEAP32[i18 + 16 >> 2] | 0);
   HEAP32[i18 + 12 >> 2] = i1 - i3 >> 2;
   i18 = 2;
   break;
  }
 } else {
  i1 = 0;
  while (1) {
   if ((i1 | 0) == 512) break;
   HEAP32[28200 + (i1 * 12 | 0) >> 2] = 1;
   HEAP32[28200 + (i1 * 12 | 0) + 4 >> 2] = 0;
   HEAP32[28200 + (i1 * 12 | 0) + 8 >> 2] = 0;
   i1 = i1 + 1 | 0;
  }
  HEAP32[8586] = 2;
  HEAP32[8587] = 3;
  HEAP32[8588] = 0;
  HEAP32[7050] = 2;
  HEAP32[7051] = 2;
  HEAP32[7052] = 256;
  HEAP32[7053] = 6;
  HEAP32[7054] = 7;
  HEAP32[7055] = 0;
  HEAP32[7056] = 8;
  HEAP32[7057] = 9;
  HEAP32[7058] = 260;
  HEAP32[7059] = 10;
  HEAP32[7060] = 11;
  HEAP32[7061] = 0;
  HEAP32[7062] = 12;
  HEAP32[7063] = 13;
  HEAP32[7064] = 0;
  HEAP32[7065] = 14;
  HEAP32[7066] = 15;
  HEAP32[7067] = 0;
  HEAP32[7068] = 16;
  HEAP32[7069] = 6;
  HEAP32[7070] = 0;
  HEAP32[7071] = 18;
  HEAP32[7072] = 15;
  HEAP32[7073] = 0;
  HEAP32[7074] = 20;
  HEAP32[7075] = 21;
  HEAP32[7076] = 0;
  HEAP32[7077] = 22;
  HEAP32[7078] = 23;
  HEAP32[7079] = 0;
  HEAP32[7080] = 24;
  HEAP32[7081] = 15;
  HEAP32[7082] = 0;
  HEAP32[7083] = 26;
  HEAP32[7084] = 15;
  HEAP32[7085] = 0;
  HEAP32[7086] = 28;
  HEAP32[7087] = 29;
  HEAP32[7088] = 0;
  HEAP32[7089] = 30;
  HEAP32[7090] = 31;
  HEAP32[7091] = 0;
  HEAP32[7092] = 32;
  HEAP32[7093] = 33;
  HEAP32[7094] = 0;
  HEAP32[7095] = 34;
  HEAP32[7096] = 35;
  HEAP32[7097] = 0;
  HEAP32[7098] = 3;
  HEAP32[7099] = 2;
  HEAP32[7100] = 0;
  HEAP32[7101] = 38;
  HEAP32[7102] = 2;
  HEAP32[7103] = 0;
  HEAP32[7104] = 40;
  HEAP32[7105] = 40;
  HEAP32[7106] = 0;
  HEAP32[7107] = 42;
  HEAP32[7108] = 43;
  HEAP32[7109] = 0;
  HEAP32[7110] = 44;
  HEAP32[7111] = 45;
  HEAP32[7112] = 0;
  HEAP32[7113] = 46;
  HEAP32[7114] = 47;
  HEAP32[7115] = 260;
  HEAP32[7116] = 48;
  HEAP32[7117] = 49;
  HEAP32[7118] = 0;
  HEAP32[7119] = 50;
  HEAP32[7120] = 15;
  HEAP32[7121] = 0;
  HEAP32[7122] = 52;
  HEAP32[7123] = 53;
  HEAP32[7124] = 0;
  HEAP32[7125] = 54;
  HEAP32[7126] = 55;
  HEAP32[7127] = 0;
  HEAP32[7128] = 56;
  HEAP32[7129] = 57;
  HEAP32[7130] = 0;
  HEAP32[7131] = 58;
  HEAP32[7132] = 59;
  HEAP32[7133] = 0;
  HEAP32[7134] = 60;
  HEAP32[7135] = 59;
  HEAP32[7136] = 0;
  HEAP32[7137] = 62;
  HEAP32[7138] = 63;
  HEAP32[7139] = 0;
  HEAP32[7140] = 64;
  HEAP32[7141] = 2;
  HEAP32[7142] = 0;
  HEAP32[7143] = 66;
  HEAP32[7144] = 67;
  HEAP32[7145] = 0;
  HEAP32[7146] = 68;
  HEAP32[7147] = 2;
  HEAP32[7148] = 0;
  HEAP32[7149] = 70;
  HEAP32[7150] = 15;
  HEAP32[7151] = 0;
  HEAP32[7152] = 72;
  HEAP32[7153] = 35;
  HEAP32[7154] = 0;
  HEAP32[7155] = 74;
  HEAP32[7156] = 75;
  HEAP32[7157] = 0;
  HEAP32[7158] = 76;
  HEAP32[7159] = 77;
  HEAP32[7160] = 0;
  HEAP32[7161] = 78;
  HEAP32[7162] = 79;
  HEAP32[7163] = 0;
  HEAP32[7164] = 80;
  HEAP32[7165] = 81;
  HEAP32[7166] = 0;
  HEAP32[7167] = 7;
  HEAP32[7168] = 83;
  HEAP32[7169] = 0;
  HEAP32[8118] = 84;
  HEAP32[8119] = 85;
  HEAP32[8120] = 0;
  HEAP32[8121] = 86;
  HEAP32[8122] = 87;
  HEAP32[8123] = 0;
  HEAP32[7170] = 88;
  HEAP32[7171] = 16;
  HEAP32[7172] = 0;
  HEAP32[7173] = 90;
  HEAP32[7174] = 91;
  HEAP32[7175] = 264;
  HEAP32[7176] = 92;
  HEAP32[7177] = 2;
  HEAP32[7178] = 0;
  HEAP32[7179] = 94;
  HEAP32[7180] = 2;
  HEAP32[7181] = 256;
  HEAP32[7182] = 96;
  HEAP32[7183] = 2;
  HEAP32[7184] = 256;
  HEAP32[7185] = 98;
  HEAP32[7186] = 99;
  HEAP32[7187] = 0;
  HEAP32[7188] = 100;
  HEAP32[7189] = 2;
  HEAP32[7190] = 256;
  HEAP32[7191] = 8;
  HEAP32[7192] = 9;
  HEAP32[7193] = 260;
  HEAP32[7194] = 104;
  HEAP32[7195] = 105;
  HEAP32[7196] = 260;
  HEAP32[7197] = 106;
  HEAP32[7198] = 107;
  HEAP32[7199] = 260;
  HEAP32[7200] = 106;
  HEAP32[7201] = 107;
  HEAP32[7202] = 260;
  HEAP32[7212] = 106;
  HEAP32[7213] = 107;
  HEAP32[7214] = 260;
  HEAP32[7203] = 104;
  HEAP32[7204] = 105;
  HEAP32[7205] = 260;
  HEAP32[7206] = 106;
  HEAP32[7207] = 107;
  HEAP32[7208] = 260;
  HEAP32[7209] = 106;
  HEAP32[7210] = 107;
  HEAP32[7211] = 260;
  HEAP32[7215] = 118;
  HEAP32[7216] = 119;
  HEAP32[7217] = 0;
  HEAP32[7935] = 120;
  HEAP32[7936] = 2;
  HEAP32[7937] = 256;
  HEAP32[7938] = 122;
  HEAP32[7939] = 2;
  HEAP32[7940] = 256;
  HEAP32[7941] = 124;
  HEAP32[7942] = 2;
  HEAP32[7943] = 256;
  HEAP32[7944] = 126;
  HEAP32[7945] = 2;
  HEAP32[7946] = 256;
  HEAP32[7947] = 128;
  HEAP32[7948] = 2;
  HEAP32[7949] = 256;
  HEAP32[7950] = 130;
  HEAP32[7951] = 2;
  HEAP32[7952] = 256;
  HEAP32[7953] = 132;
  HEAP32[7954] = 2;
  HEAP32[7955] = 256;
  HEAP32[7956] = 134;
  HEAP32[7957] = 2;
  HEAP32[7958] = 256;
  HEAP32[7218] = 136;
  HEAP32[7219] = 137;
  HEAP32[7220] = 260;
  HEAP32[7221] = 138;
  HEAP32[7222] = 139;
  HEAP32[7223] = 260;
  HEAP32[7224] = 138;
  HEAP32[7225] = 139;
  HEAP32[7226] = 260;
  HEAP32[7236] = 138;
  HEAP32[7237] = 139;
  HEAP32[7238] = 260;
  HEAP32[7227] = 136;
  HEAP32[7228] = 137;
  HEAP32[7229] = 260;
  HEAP32[7230] = 138;
  HEAP32[7231] = 139;
  HEAP32[7232] = 260;
  HEAP32[7233] = 138;
  HEAP32[7234] = 139;
  HEAP32[7235] = 260;
  HEAP32[7239] = 150;
  HEAP32[7240] = 151;
  HEAP32[7241] = 0;
  HEAP32[7959] = 152;
  HEAP32[7960] = 2;
  HEAP32[7961] = 256;
  HEAP32[7962] = 154;
  HEAP32[7963] = 2;
  HEAP32[7964] = 256;
  HEAP32[7965] = 156;
  HEAP32[7966] = 2;
  HEAP32[7967] = 256;
  HEAP32[7968] = 158;
  HEAP32[7969] = 2;
  HEAP32[7970] = 256;
  HEAP32[7971] = 160;
  HEAP32[7972] = 2;
  HEAP32[7973] = 256;
  HEAP32[7974] = 162;
  HEAP32[7975] = 2;
  HEAP32[7976] = 256;
  HEAP32[7977] = 164;
  HEAP32[7978] = 2;
  HEAP32[7979] = 256;
  HEAP32[7980] = 166;
  HEAP32[7981] = 2;
  HEAP32[7982] = 256;
  HEAP32[7266] = 168;
  HEAP32[7267] = 169;
  HEAP32[7268] = 0;
  HEAP32[7269] = 170;
  HEAP32[7270] = 171;
  HEAP32[7271] = 0;
  HEAP32[7272] = 170;
  HEAP32[7273] = 171;
  HEAP32[7274] = 0;
  HEAP32[7284] = 170;
  HEAP32[7285] = 171;
  HEAP32[7286] = 0;
  HEAP32[7275] = 168;
  HEAP32[7276] = 169;
  HEAP32[7277] = 0;
  HEAP32[7278] = 170;
  HEAP32[7279] = 171;
  HEAP32[7280] = 0;
  HEAP32[7281] = 170;
  HEAP32[7282] = 171;
  HEAP32[7283] = 0;
  HEAP32[7287] = 182;
  HEAP32[7288] = 183;
  HEAP32[7289] = 0;
  HEAP32[7293] = 184;
  HEAP32[7294] = 99;
  HEAP32[7295] = 0;
  HEAP32[7311] = 186;
  HEAP32[7312] = 99;
  HEAP32[7313] = 0;
  HEAP32[7305] = 184;
  HEAP32[7306] = 99;
  HEAP32[7307] = 0;
  HEAP32[7296] = 184;
  HEAP32[7297] = 99;
  HEAP32[7298] = 0;
  HEAP32[7302] = 184;
  HEAP32[7303] = 99;
  HEAP32[7304] = 0;
  HEAP32[7308] = 184;
  HEAP32[7309] = 99;
  HEAP32[7310] = 0;
  HEAP32[7299] = 196;
  HEAP32[7300] = 99;
  HEAP32[7301] = 0;
  HEAP32[7341] = 198;
  HEAP32[7342] = 199;
  HEAP32[7343] = 0;
  HEAP32[7338] = 200;
  HEAP32[7339] = 201;
  HEAP32[7340] = 0;
  HEAP32[7353] = 198;
  HEAP32[7354] = 199;
  HEAP32[7355] = 0;
  HEAP32[7356] = 198;
  HEAP32[7357] = 199;
  HEAP32[7358] = 0;
  HEAP32[7347] = 200;
  HEAP32[7348] = 201;
  HEAP32[7349] = 0;
  HEAP32[7344] = 198;
  HEAP32[7345] = 199;
  HEAP32[7346] = 0;
  HEAP32[7350] = 198;
  HEAP32[7351] = 199;
  HEAP32[7352] = 0;
  HEAP32[7359] = 212;
  HEAP32[7360] = 213;
  HEAP32[7361] = 0;
  HEAP32[7362] = 214;
  HEAP32[7363] = 215;
  HEAP32[7364] = 0;
  HEAP32[7365] = 216;
  HEAP32[7366] = 217;
  HEAP32[7367] = 0;
  HEAP32[7368] = 216;
  HEAP32[7369] = 217;
  HEAP32[7370] = 0;
  HEAP32[7380] = 216;
  HEAP32[7381] = 217;
  HEAP32[7382] = 0;
  HEAP32[7371] = 214;
  HEAP32[7372] = 215;
  HEAP32[7373] = 0;
  HEAP32[7377] = 224;
  HEAP32[7378] = 40;
  HEAP32[7379] = 0;
  HEAP32[7383] = 226;
  HEAP32[7384] = 227;
  HEAP32[7385] = 0;
  HEAP32[7386] = 228;
  HEAP32[7387] = 2;
  HEAP32[7388] = 256;
  HEAP32[7389] = 230;
  HEAP32[7390] = 2;
  HEAP32[7391] = 256;
  HEAP32[7392] = 232;
  HEAP32[7393] = 2;
  HEAP32[7394] = 256;
  HEAP32[7395] = 234;
  HEAP32[7396] = 2;
  HEAP32[7397] = 256;
  HEAP32[7398] = 236;
  HEAP32[7399] = 2;
  HEAP32[7400] = 256;
  HEAP32[7401] = 238;
  HEAP32[7402] = 2;
  HEAP32[7403] = 256;
  HEAP32[7404] = 240;
  HEAP32[7405] = 2;
  HEAP32[7406] = 256;
  HEAP32[7407] = 242;
  HEAP32[7408] = 2;
  HEAP32[7409] = 256;
  HEAP32[7410] = 244;
  HEAP32[7411] = 2;
  HEAP32[7412] = 256;
  HEAP32[7413] = 246;
  HEAP32[7414] = 2;
  HEAP32[7415] = 256;
  HEAP32[7416] = 248;
  HEAP32[7417] = 2;
  HEAP32[7418] = 256;
  HEAP32[7419] = 250;
  HEAP32[7420] = 2;
  HEAP32[7421] = 256;
  HEAP32[7422] = 252;
  HEAP32[7423] = 2;
  HEAP32[7424] = 256;
  HEAP32[7425] = 254;
  HEAP32[7426] = 2;
  HEAP32[7427] = 256;
  HEAP32[7428] = 256;
  HEAP32[7429] = 2;
  HEAP32[7430] = 256;
  HEAP32[7431] = 258;
  HEAP32[7432] = 2;
  HEAP32[7433] = 256;
  HEAP32[7434] = 260;
  HEAP32[7435] = 2;
  HEAP32[7436] = 256;
  HEAP32[7437] = 262;
  HEAP32[7438] = 2;
  HEAP32[7439] = 256;
  HEAP32[7440] = 264;
  HEAP32[7441] = 2;
  HEAP32[7442] = 256;
  HEAP32[7443] = 266;
  HEAP32[7444] = 2;
  HEAP32[7445] = 256;
  HEAP32[7446] = 268;
  HEAP32[7447] = 2;
  HEAP32[7448] = 256;
  HEAP32[7449] = 270;
  HEAP32[7450] = 2;
  HEAP32[7451] = 256;
  HEAP32[7452] = 272;
  HEAP32[7453] = 2;
  HEAP32[7454] = 256;
  HEAP32[7455] = 274;
  HEAP32[7456] = 2;
  HEAP32[7457] = 256;
  HEAP32[7458] = 276;
  HEAP32[7459] = 2;
  HEAP32[7460] = 256;
  HEAP32[7461] = 278;
  HEAP32[7462] = 2;
  HEAP32[7463] = 256;
  HEAP32[7464] = 280;
  HEAP32[7465] = 2;
  HEAP32[7466] = 256;
  HEAP32[7467] = 282;
  HEAP32[7468] = 2;
  HEAP32[7469] = 256;
  HEAP32[7470] = 284;
  HEAP32[7471] = 2;
  HEAP32[7472] = 256;
  HEAP32[7473] = 286;
  HEAP32[7474] = 2;
  HEAP32[7475] = 256;
  HEAP32[7476] = 288;
  HEAP32[7477] = 289;
  HEAP32[7478] = 0;
  HEAP32[7479] = 90;
  HEAP32[7480] = 91;
  HEAP32[7481] = 264;
  HEAP32[7704] = 292;
  HEAP32[7705] = 293;
  HEAP32[7706] = 0;
  HEAP32[7482] = 294;
  HEAP32[7483] = 295;
  HEAP32[7484] = 0;
  HEAP32[7512] = 296;
  HEAP32[7513] = 297;
  HEAP32[7514] = 0;
  HEAP32[7815] = 298;
  HEAP32[7816] = 299;
  HEAP32[7817] = 0;
  HEAP32[7881] = 300;
  HEAP32[7882] = 301;
  HEAP32[7883] = 0;
  HEAP32[7485] = 302;
  HEAP32[7486] = 303;
  HEAP32[7487] = 0;
  HEAP32[7515] = 304;
  HEAP32[7516] = 305;
  HEAP32[7517] = 0;
  HEAP32[7818] = 306;
  HEAP32[7819] = 290;
  HEAP32[7820] = 0;
  HEAP32[7884] = 287;
  HEAP32[7885] = 285;
  HEAP32[7886] = 0;
  HEAP32[7833] = 306;
  HEAP32[7834] = 290;
  HEAP32[7835] = 0;
  HEAP32[7899] = 287;
  HEAP32[7900] = 285;
  HEAP32[7901] = 0;
  HEAP32[7488] = 279;
  HEAP32[7489] = 277;
  HEAP32[7490] = 0;
  HEAP32[7518] = 275;
  HEAP32[7519] = 273;
  HEAP32[7520] = 0;
  HEAP32[7821] = 271;
  HEAP32[7822] = 269;
  HEAP32[7823] = 0;
  HEAP32[7887] = 267;
  HEAP32[7888] = 265;
  HEAP32[7889] = 0;
  HEAP32[7836] = 271;
  HEAP32[7837] = 269;
  HEAP32[7838] = 0;
  HEAP32[7902] = 267;
  HEAP32[7903] = 265;
  HEAP32[7904] = 0;
  HEAP32[7491] = 255;
  HEAP32[7492] = 253;
  HEAP32[7493] = 0;
  HEAP32[7521] = 251;
  HEAP32[7522] = 249;
  HEAP32[7523] = 0;
  HEAP32[7824] = 247;
  HEAP32[7825] = 245;
  HEAP32[7826] = 0;
  HEAP32[7890] = 243;
  HEAP32[7891] = 241;
  HEAP32[7892] = 0;
  HEAP32[7839] = 247;
  HEAP32[7840] = 245;
  HEAP32[7841] = 0;
  HEAP32[7905] = 243;
  HEAP32[7906] = 241;
  HEAP32[7907] = 0;
  HEAP32[7494] = 235;
  HEAP32[7495] = 233;
  HEAP32[7496] = 0;
  HEAP32[7524] = 231;
  HEAP32[7525] = 229;
  HEAP32[7526] = 0;
  HEAP32[7827] = 223;
  HEAP32[7828] = 221;
  HEAP32[7829] = 0;
  HEAP32[7893] = 219;
  HEAP32[7894] = 211;
  HEAP32[7895] = 0;
  HEAP32[7842] = 223;
  HEAP32[7843] = 221;
  HEAP32[7844] = 0;
  HEAP32[7908] = 219;
  HEAP32[7909] = 211;
  HEAP32[7910] = 0;
  HEAP32[7497] = 203;
  HEAP32[7498] = 197;
  HEAP32[7499] = 0;
  HEAP32[7527] = 194;
  HEAP32[7528] = 192;
  HEAP32[7529] = 0;
  HEAP32[7830] = 190;
  HEAP32[7831] = 188;
  HEAP32[7832] = 0;
  HEAP32[7896] = 185;
  HEAP32[7897] = 180;
  HEAP32[7898] = 0;
  HEAP32[7500] = 178;
  HEAP32[7501] = 176;
  HEAP32[7502] = 0;
  HEAP32[7503] = 174;
  HEAP32[7504] = 172;
  HEAP32[7505] = 0;
  HEAP32[7506] = 167;
  HEAP32[7507] = 165;
  HEAP32[7508] = 0;
  HEAP32[7509] = 163;
  HEAP32[7510] = 161;
  HEAP32[7511] = 0;
  HEAP32[7554] = 159;
  HEAP32[7555] = 2;
  HEAP32[7556] = 256;
  HEAP32[7557] = 157;
  HEAP32[7558] = 2;
  HEAP32[7559] = 256;
  HEAP32[7560] = 155;
  HEAP32[7561] = 2;
  HEAP32[7562] = 256;
  HEAP32[7563] = 153;
  HEAP32[7564] = 2;
  HEAP32[7565] = 256;
  HEAP32[7566] = 148;
  HEAP32[7567] = 2;
  HEAP32[7568] = 256;
  HEAP32[7569] = 146;
  HEAP32[7570] = 2;
  HEAP32[7571] = 256;
  HEAP32[7572] = 144;
  HEAP32[7573] = 142;
  HEAP32[7574] = 0;
  HEAP32[7575] = 140;
  HEAP32[7576] = 135;
  HEAP32[7577] = 0;
  HEAP32[7578] = 133;
  HEAP32[7579] = 131;
  HEAP32[7580] = 0;
  HEAP32[7584] = 129;
  HEAP32[7585] = 127;
  HEAP32[7586] = 0;
  HEAP32[7587] = 125;
  HEAP32[7588] = 2;
  HEAP32[7589] = 0;
  HEAP32[7590] = 125;
  HEAP32[7591] = 2;
  HEAP32[7592] = 0;
  HEAP32[7593] = 125;
  HEAP32[7594] = 2;
  HEAP32[7595] = 0;
  HEAP32[7596] = 125;
  HEAP32[7597] = 2;
  HEAP32[7598] = 0;
  HEAP32[7599] = 125;
  HEAP32[7600] = 2;
  HEAP32[7601] = 0;
  HEAP32[7602] = 125;
  HEAP32[7603] = 2;
  HEAP32[7604] = 0;
  HEAP32[7605] = 101;
  HEAP32[7606] = 2;
  HEAP32[7607] = 0;
  HEAP32[7611] = 125;
  HEAP32[7612] = 2;
  HEAP32[7613] = 0;
  HEAP32[7614] = 101;
  HEAP32[7615] = 2;
  HEAP32[7616] = 0;
  HEAP32[7617] = 125;
  HEAP32[7618] = 2;
  HEAP32[7619] = 0;
  HEAP32[7620] = 82;
  HEAP32[7621] = 2;
  HEAP32[7622] = 0;
  HEAP32[7623] = 82;
  HEAP32[7624] = 2;
  HEAP32[7625] = 0;
  HEAP32[7626] = 82;
  HEAP32[7627] = 2;
  HEAP32[7628] = 0;
  HEAP32[7629] = 82;
  HEAP32[7630] = 2;
  HEAP32[7631] = 0;
  HEAP32[8010] = 39;
  HEAP32[8011] = 37;
  HEAP32[8012] = 260;
  HEAP32[8013] = 51;
  HEAP32[8014] = 65;
  HEAP32[8015] = 260;
  HEAP32[8016] = 25;
  HEAP32[8017] = 2;
  HEAP32[8018] = 256;
  HEAP32[8019] = 69;
  HEAP32[8020] = 2;
  HEAP32[8021] = 256;
  HEAP32[8022] = 17;
  HEAP32[8023] = 2;
  HEAP32[8024] = 256;
  HEAP32[8025] = 36;
  HEAP32[8026] = 2;
  HEAP32[8027] = 256;
  HEAP32[8028] = 39;
  HEAP32[8029] = 37;
  HEAP32[8030] = 260;
  HEAP32[8031] = 51;
  HEAP32[8032] = 65;
  HEAP32[8033] = 260;
  HEAP32[8034] = 69;
  HEAP32[8035] = 2;
  HEAP32[8036] = 256;
  HEAP32[8037] = 69;
  HEAP32[8038] = 2;
  HEAP32[8039] = 256;
  HEAP32[8040] = 71;
  HEAP32[8041] = 2;
  HEAP32[8042] = 256;
  HEAP32[8043] = 93;
  HEAP32[8044] = 2;
  HEAP32[8045] = 256;
  HEAP32[8046] = 102;
  HEAP32[8047] = 108;
  HEAP32[8048] = 260;
  HEAP32[8049] = 110;
  HEAP32[8050] = 112;
  HEAP32[8051] = 260;
  HEAP32[8055] = 2;
  HEAP32[8056] = 2;
  HEAP32[8057] = 256;
  HEAP32[8058] = 95;
  HEAP32[8059] = 2;
  HEAP32[8060] = 256;
  HEAP32[8061] = 97;
  HEAP32[8062] = 2;
  HEAP32[8063] = 256;
  HEAP32[8064] = 102;
  HEAP32[8065] = 108;
  HEAP32[8066] = 260;
  HEAP32[8067] = 110;
  HEAP32[8068] = 112;
  HEAP32[8069] = 260;
  HEAP32[8070] = 2;
  HEAP32[8071] = 2;
  HEAP32[8072] = 256;
  HEAP32[8076] = 114;
  HEAP32[8077] = 2;
  HEAP32[8078] = 256;
  HEAP32[8079] = 116;
  HEAP32[8080] = 2;
  HEAP32[8081] = 256;
  HEAP32[8082] = 121;
  HEAP32[8083] = 123;
  HEAP32[8084] = 260;
  HEAP32[8085] = 205;
  HEAP32[8086] = 207;
  HEAP32[8087] = 260;
  HEAP32[8088] = 209;
  HEAP32[8089] = 2;
  HEAP32[8090] = 256;
  HEAP32[8091] = 237;
  HEAP32[8092] = 2;
  HEAP32[8093] = 256;
  HEAP32[8094] = 2;
  HEAP32[8095] = 2;
  HEAP32[8096] = 256;
  HEAP32[8097] = 239;
  HEAP32[8098] = 2;
  HEAP32[8099] = 256;
  HEAP32[8100] = 257;
  HEAP32[8101] = 259;
  HEAP32[8102] = 260;
  HEAP32[8103] = 261;
  HEAP32[8104] = 263;
  HEAP32[8105] = 260;
  HEAP32[8106] = 281;
  HEAP32[8107] = 2;
  HEAP32[8108] = 256;
  HEAP32[8109] = 283;
  HEAP32[8110] = 2;
  HEAP32[8111] = 256;
  HEAP32[8112] = 291;
  HEAP32[8113] = 2;
  HEAP32[8114] = 256;
  HEAP32[8115] = 2;
  HEAP32[8116] = 2;
  HEAP32[8117] = 256;
  HEAP32[7716] = 225;
  HEAP32[7717] = 2;
  HEAP32[7718] = 0;
  HEAP32[7719] = 222;
  HEAP32[7720] = 2;
  HEAP32[7721] = 0;
  HEAP32[7722] = 220;
  HEAP32[7723] = 2;
  HEAP32[7724] = 0;
  HEAP32[7725] = 218;
  HEAP32[7726] = 2;
  HEAP32[7727] = 0;
  HEAP32[7728] = 210;
  HEAP32[7729] = 2;
  HEAP32[7730] = 0;
  HEAP32[7731] = 208;
  HEAP32[7732] = 2;
  HEAP32[7733] = 0;
  HEAP32[7734] = 206;
  HEAP32[7735] = 2;
  HEAP32[7736] = 0;
  HEAP32[7737] = 206;
  HEAP32[7738] = 2;
  HEAP32[7739] = 0;
  HEAP32[7740] = 204;
  HEAP32[7741] = 2;
  HEAP32[7742] = 0;
  HEAP32[7743] = 206;
  HEAP32[7744] = 2;
  HEAP32[7745] = 0;
  HEAP32[7746] = 204;
  HEAP32[7747] = 2;
  HEAP32[7748] = 0;
  HEAP32[7770] = 202;
  HEAP32[7771] = 2;
  HEAP32[7772] = 256;
  HEAP32[7773] = 195;
  HEAP32[7774] = 2;
  HEAP32[7775] = 256;
  HEAP32[7776] = 193;
  HEAP32[7777] = 2;
  HEAP32[7778] = 256;
  HEAP32[7779] = 191;
  HEAP32[7780] = 2;
  HEAP32[7781] = 256;
  HEAP32[7782] = 189;
  HEAP32[7783] = 2;
  HEAP32[7784] = 256;
  HEAP32[7785] = 187;
  HEAP32[7786] = 2;
  HEAP32[7787] = 256;
  HEAP32[7788] = 181;
  HEAP32[7789] = 2;
  HEAP32[7790] = 256;
  HEAP32[7791] = 179;
  HEAP32[7792] = 2;
  HEAP32[7793] = 256;
  HEAP32[7794] = 177;
  HEAP32[7795] = 2;
  HEAP32[7796] = 256;
  HEAP32[7797] = 175;
  HEAP32[7798] = 2;
  HEAP32[7799] = 256;
  HEAP32[7800] = 173;
  HEAP32[7801] = 2;
  HEAP32[7802] = 256;
  HEAP32[7803] = 149;
  HEAP32[7804] = 2;
  HEAP32[7805] = 256;
  HEAP32[7809] = 147;
  HEAP32[7810] = 2;
  HEAP32[7811] = 256;
  HEAP32[7866] = 145;
  HEAP32[7867] = 2;
  HEAP32[7868] = 256;
  HEAP32[7869] = 143;
  HEAP32[7870] = 2;
  HEAP32[7871] = 256;
  HEAP32[7875] = 141;
  HEAP32[7876] = 2;
  HEAP32[7877] = 256;
  HEAP32[7845] = 117;
  HEAP32[7846] = 2;
  HEAP32[7847] = 256;
  HEAP32[7911] = 115;
  HEAP32[7912] = 2;
  HEAP32[7913] = 256;
  HEAP32[7848] = 113;
  HEAP32[7849] = 2;
  HEAP32[7850] = 256;
  HEAP32[7914] = 111;
  HEAP32[7915] = 2;
  HEAP32[7916] = 256;
  HEAP32[7851] = 109;
  HEAP32[7852] = 2;
  HEAP32[7853] = 256;
  HEAP32[7917] = 103;
  HEAP32[7918] = 2;
  HEAP32[7919] = 256;
  HEAP32[7854] = 89;
  HEAP32[7855] = 2;
  HEAP32[7856] = 256;
  HEAP32[7920] = 73;
  HEAP32[7921] = 2;
  HEAP32[7922] = 256;
  HEAP32[7983] = 61;
  HEAP32[7984] = 2;
  HEAP32[7985] = 256;
  HEAP32[7986] = 41;
  HEAP32[7987] = 2;
  HEAP32[7988] = 256;
  HEAP32[7989] = 27;
  HEAP32[7990] = 2;
  HEAP32[7991] = 256;
  HEAP32[7992] = 19;
  HEAP32[7993] = 2;
  HEAP32[7994] = 256;
  HEAP32[7995] = 5;
  HEAP32[7996] = 4;
  HEAP32[7997] = 260;
  i18 = 0;
 } while (0);
 STACKTOP = i46;
 return i18 | 0;
}

function _JITit(i4, i21, i50, i26, i1, i51) {
 i4 = i4 | 0;
 i21 = i21 | 0;
 i50 = i50 | 0;
 i26 = i26 | 0;
 i1 = i1 | 0;
 i51 = i51 | 0;
 var i2 = 0, i3 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0, i18 = 0, i19 = 0, i20 = 0, i22 = 0, i23 = 0, i24 = 0, i25 = 0, i27 = 0, i28 = 0, i29 = 0, i30 = 0, i31 = 0, i32 = 0, i33 = 0, i34 = 0, i35 = 0, i36 = 0, i37 = 0, i38 = 0, i39 = 0, i40 = 0, i41 = 0, i42 = 0, i43 = 0, i44 = 0, i45 = 0, i46 = 0, i47 = 0, i48 = 0, i49 = 0, i52 = 0, i53 = 0, i54 = 0;
 i54 = STACKTOP;
 STACKTOP = STACKTOP + 128 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(128);
 i37 = i54 + 72 | 0;
 i36 = i54 + 64 | 0;
 i35 = i54 + 56 | 0;
 i34 = i54 + 48 | 0;
 i33 = i54 + 40 | 0;
 i32 = i54 + 32 | 0;
 i39 = i54 + 24 | 0;
 i38 = i54 + 16 | 0;
 i31 = i54 + 8 | 0;
 i30 = i54;
 i28 = i54 + 116 | 0;
 i53 = i54 + 104 | 0;
 i41 = i54 + 92 | 0;
 i47 = i54 + 80 | 0;
 i52 = i54 + 76 | 0;
 i45 = i1 + 4 | 0;
 i42 = HEAP32[i45 >> 2] | 0;
 i22 = i4 + 4 | 0;
 i23 = HEAP32[i22 >> 2] | 0;
 i46 = i50 << 2;
 i48 = _malloc(i46) | 0;
 i46 = i46 + 4 | 0;
 i49 = _malloc(i46) | 0;
 _memset(i49 | 0, 0, i46 | 0) | 0;
 i46 = i47 + 8 | 0;
 HEAP32[i46 >> 2] = 0;
 i24 = i47 + 4 | 0;
 HEAP32[i24 >> 2] = 0;
 HEAP32[i47 >> 2] = _malloc(i42 << 2) | 0;
 i42 = i1 + 12 | 0;
 i3 = HEAP32[i42 >> 2] | 0;
 i44 = i1 + 16 | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i3 | 0)) break;
  i2 = HEAP32[i44 >> 2] | 0;
  if (!(HEAP32[i2 + (i1 * 24 | 0) >> 2] | 0)) {
   i20 = _malloc(12) | 0;
   HEAP32[i49 + (HEAP32[i2 + (i1 * 24 | 0) + 12 >> 2] << 2) >> 2] = i20;
   HEAP32[i20 + 8 >> 2] = 4;
   HEAP32[i20 + 4 >> 2] = 1;
   i43 = _malloc(4) | 0;
   HEAP32[i20 >> 2] = i43;
   HEAP32[i43 >> 2] = HEAP32[i2 + (i1 * 24 | 0) + 20 >> 2];
  }
  i1 = i1 + 1 | 0;
 }
 HEAP32[i53 + 4 >> 2] = 32;
 i43 = i53 + 8 | 0;
 HEAP32[i43 >> 2] = 0;
 HEAP32[i53 >> 2] = _malloc(128) | 0;
 HEAP32[i41 + 4 >> 2] = 16;
 i17 = i41 + 8 | 0;
 HEAP32[i17 >> 2] = 0;
 HEAP32[i41 >> 2] = _malloc(64) | 0;
 HEAP32[i28 >> 2] = 0;
 i18 = i4 + 60 | 0;
 i19 = i4 + 48 | 0;
 i20 = i4 + 40 | 0;
 i16 = i4 + 36 | 0;
 i15 = 0;
 i12 = 0;
 i2 = 0;
 i4 = 0;
 i5 = 0;
 i6 = 0;
 i1 = 0;
 L8 : while (1) {
  HEAP32[i48 + (i6 << 2) >> 2] = i1;
  i7 = i6 + 1 | 0;
  HEAP32[i28 >> 2] = i7;
  i3 = HEAP8[i21 + i6 >> 0] | 0;
  i11 = i3 & 255;
  i1 = i6 + 2 | 0;
  i7 = i21 + i7 | 0;
  L10 : do switch (i3 << 24 >> 24) {
  case 0:
   {
    _PushU32_(i53, _Translate(0) | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 20:
   {
    _PushU32_(i53, _Translate(16) | 0);
    _PushStackType_(i47, HEAP32[HEAP32[8595] >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 37:
   {
    i1 = HEAP32[i47 >> 2] | 0;
    i3 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
    HEAP32[i24 >> 2] = i3;
    i3 = HEAP32[i1 + (i3 << 2) >> 2] | 0;
    _PushStackType_(i47, i3);
    _PushStackType_(i47, i3);
    i1 = i3 + 68 | 0;
    switch (HEAP32[i1 >> 2] | 0) {
    case 4:
     {
      _PushU32_(i53, _Translate(43) | 0);
      i1 = i12;
      break L10;
     }
    case 8:
     {
      _PushU32_(i53, _Translate(44) | 0);
      i1 = i12;
      break L10;
     }
    default:
     {
      _PushU32_(i53, _Translate(20) | 0);
      _PushU32_(i53, HEAP32[i1 >> 2] | 0);
      i1 = i12;
      break L10;
     }
    }
   }
  case 38:
   {
    i1 = HEAP32[i47 >> 2] | 0;
    i3 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
    HEAP32[i24 >> 2] = i3;
    i3 = HEAP32[i1 + (i3 << 2) >> 2] | 0;
    i1 = i3 + 68 | 0;
    if ((HEAP32[i1 >> 2] | 0) == 4) {
     _PushU32_(i53, _Translate(46) | 0);
     i1 = i12;
     break L10;
    } else {
     _PushU32_(i53, _Translate(21) | 0);
     _PushU32_(i53, HEAP32[i1 >> 2] | 0);
     i1 = i12;
     break L10;
    }
   }
  case 30:
  case 29:
  case 28:
  case 27:
  case 26:
  case 25:
  case 24:
  case 23:
  case 22:
  case 21:
   {
    i1 = (i3 << 24 >> 24) + -22 | 0;
    i40 = 20;
    break;
   }
  case 31:
   {
    HEAP32[i28 >> 2] = i1;
    i1 = HEAP8[i7 >> 0] | 0;
    i40 = 20;
    break;
   }
  case 32:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    i40 = 20;
    break;
   }
  case 33:
   {
    _PushU32_(i53, _Translate(41) | 0);
    i3 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i3;
    _PushU32_(i53, i3);
    i3 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i3;
    _PushU32_(i53, i3);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 96 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 34:
   {
    i3 = _GetUnalignedU32(i21, i28) | 0;
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 88 >> 2] | 0);
    _PushU32_(i53, _Translate(47) | 0);
    _PushU32_(i53, i3);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 35:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    i3 = _GetUnalignedU32(i21, i28) | 0;
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 92 >> 2] | 0);
    _PushU32_(i53, _Translate(143) | 0);
    _PushU32_(i53, i1);
    _PushU32_(i53, i3);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 5:
  case 4:
  case 3:
  case 2:
   {
    i1 = i11 + -2 | 0;
    i40 = 29;
    break;
   }
  case 14:
   {
    HEAP32[i28 >> 2] = i1;
    i1 = HEAPU8[i7 >> 0] | 0;
    i40 = 29;
    break;
   }
  case 15:
   {
    HEAP32[i28 >> 2] = i1;
    HEAP32[i52 >> 2] = HEAPU8[i7 >> 0];
    _PushU32_(i53, _Translate(9) | 0);
    _PushU32_(i53, HEAP32[(HEAP32[i16 >> 2] | 0) + ((HEAP32[i52 >> 2] | 0) * 12 | 0) + 4 >> 2] | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 40 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 16:
   {
    HEAP32[i28 >> 2] = i1;
    i1 = HEAPU8[i7 >> 0] | 0;
    HEAP32[i52 >> 2] = i1;
    i15 = HEAP32[i47 >> 2] | 0;
    i3 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
    HEAP32[i24 >> 2] = i3;
    i3 = HEAP32[i15 + (i3 << 2) >> 2] | 0;
    i1 = HEAP32[(HEAP32[i16 >> 2] | 0) + (i1 * 12 | 0) + 4 >> 2] | 0;
    if (i1 >>> 0 < 32 ? (HEAP32[i3 + 68 >> 2] | 0) == 4 : 0) {
     _PushU32_(i53, _Translate((i1 >>> 2) + 303 | 0) | 0);
     i1 = i12;
     break L10;
    }
    i15 = i3 + 35 | 0;
    _PushU32_(i53, _Translate((HEAPU8[i15 >> 0] | 0) + 56 | 0) | 0);
    _PushU32_(i53, i1);
    if ((HEAP8[i15 >> 0] | 0) == 7) {
     _PushU32_(i53, i3);
     i1 = i12;
    } else i1 = i12;
    break;
   }
  case 9:
  case 8:
  case 7:
  case 6:
   {
    i1 = i11 + -6 | 0;
    i40 = 41;
    break;
   }
  case 17:
   {
    HEAP32[i28 >> 2] = i1;
    i1 = HEAPU8[i7 >> 0] | 0;
    i40 = 41;
    break;
   }
  case 13:
  case 12:
  case 11:
  case 10:
   {
    i1 = i11 + -10 | 0;
    i40 = 48;
    break;
   }
  case 19:
   {
    HEAP32[i28 >> 2] = i1;
    i1 = HEAPU8[i7 >> 0] | 0;
    i40 = 48;
    break;
   }
  case 18:
   {
    HEAP32[i28 >> 2] = i1;
    HEAP32[i52 >> 2] = HEAPU8[i7 >> 0];
    _PushU32_(i53, _Translate(9) | 0);
    _PushU32_(i53, (HEAP32[i26 + ((HEAP32[i52 >> 2] | 0) * 12 | 0) + 4 >> 2] | 0) + (HEAP32[i20 >> 2] | 0) | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 40 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 70:
   {
    HEAP32[i52 >> 2] = 5;
    i40 = 64;
    break;
   }
  case 71:
   {
    HEAP32[i52 >> 2] = 4;
    i40 = 64;
    break;
   }
  case 72:
   {
    HEAP32[i52 >> 2] = 7;
    i40 = 64;
    break;
   }
  case 73:
   {
    HEAP32[i52 >> 2] = 14;
    i40 = 64;
    break;
   }
  case 74:
   {
    HEAP32[i52 >> 2] = 8;
    i40 = 64;
    break;
   }
  case 75:
   {
    HEAP32[i52 >> 2] = 13;
    i40 = 64;
    break;
   }
  case 76:
   {
    HEAP32[i52 >> 2] = 24;
    i40 = 64;
    break;
   }
  case 78:
   {
    HEAP32[i52 >> 2] = 22;
    i40 = 64;
    break;
   }
  case 79:
   {
    HEAP32[i52 >> 2] = 23;
    i40 = 64;
    break;
   }
  case 80:
   {
    HEAP32[i52 >> 2] = 0;
    i40 = 64;
    break;
   }
  case 77:
   {
    HEAP32[i52 >> 2] = 10;
    i40 = 64;
    break;
   }
  case 84:
  case 83:
  case 82:
  case 81:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -2;
    _PushU32_(i53, _Translate(i11 + 109 | 0) | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 42:
   {
    _PushU32_(i53, _Translate(1) | 0);
    _RestoreTypeStack(i47, HEAP32[i49 + (HEAP32[i28 >> 2] << 2) >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 111:
  case 40:
   {
    i1 = 0;
    i6 = 0;
    i40 = 67;
    break;
   }
  case 43:
   {
    HEAP32[i28 >> 2] = i1;
    i3 = HEAP8[i7 >> 0] | 0;
    i40 = 112;
    break;
   }
  case 56:
   {
    i3 = _GetUnalignedU32(i21, i28) | 0;
    i1 = HEAP32[i28 >> 2] | 0;
    i40 = 112;
    break;
   }
  case 69:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    i6 = _GetUnalignedU32(i21, i28) | 0;
    i7 = (HEAP32[i28 >> 2] | 0) + (i6 << 2) | 0;
    _PushU32_(i53, _Translate(31) | 0);
    _PushU32_(i53, i6);
    i3 = 0;
    while (1) {
     if ((i3 | 0) == (i6 | 0)) {
      i3 = i15;
      i1 = i12;
      break L10;
     }
     HEAP32[i52 >> 2] = i7 + (_GetUnalignedU32(i21, i28) | 0);
     _PushU32_(i41, HEAP32[i43 >> 2] | 0);
     i1 = HEAP32[i52 >> 2] | 0;
     if (i1 >>> 0 > (HEAP32[i28 >> 2] | 0) >>> 0) {
      i14 = _DeepCopyTypeStack(i47) | 0;
      i1 = HEAP32[i52 >> 2] | 0;
      HEAP32[i49 + (i1 << 2) >> 2] = i14;
     }
     _PushU32_(i53, i1);
     i3 = i3 + 1 | 0;
    }
   }
  case 45:
  case 44:
   {
    i6 = i6 + 2 | 0;
    HEAP32[i28 >> 2] = i6;
    i3 = 130;
    i1 = HEAP8[i7 >> 0] | 0;
    i40 = 122;
    break;
   }
  case 58:
  case 57:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    i3 = 117;
    i6 = HEAP32[i28 >> 2] | 0;
    i40 = 122;
    break;
   }
  case 55:
  case 54:
  case 53:
  case 52:
  case 51:
  case 50:
  case 49:
  case 48:
  case 47:
  case 46:
   {
    i6 = i6 + 2 | 0;
    HEAP32[i28 >> 2] = i6;
    i9 = 46;
    i3 = HEAP8[i7 >> 0] | 0;
    i40 = 127;
    break;
   }
  case 68:
  case 67:
  case 66:
  case 65:
  case 64:
  case 63:
  case 62:
  case 61:
  case 60:
  case 59:
   {
    i3 = _GetUnalignedU32(i21, i28) | 0;
    i9 = 59;
    i6 = HEAP32[i28 >> 2] | 0;
    i40 = 127;
    break;
   }
  case -37:
  case -38:
  case -39:
  case -40:
  case -41:
  case -42:
   {
    i1 = 132;
    i40 = 141;
    break;
   }
  case 97:
  case 96:
  case 95:
  case 94:
  case 93:
  case 92:
  case 91:
  case 90:
  case 89:
  case 88:
   {
    i1 = 0;
    i40 = 141;
    break;
   }
  case 102:
  case 101:
   {
    i14 = HEAP32[i47 >> 2] | 0;
    i1 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
    HEAP32[i24 >> 2] = i1;
    i1 = HEAP8[(HEAP32[i14 + (i1 << 2) >> 2] | 0) + 35 >> 0] | 0;
    switch (i1 << 24 >> 24) {
    case 1:
     {
      _PushU32_(i53, _Translate(i11 + 37 | 0) | 0);
      _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 32 >> 2] | 0);
      i3 = i15;
      i1 = i12;
      break L10;
     }
    case 0:
     {
      _PushU32_(i53, _Translate(i11 + 39 | 0) | 0);
      _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 96 >> 2] | 0);
      i3 = i15;
      i1 = i12;
      break L10;
     }
    default:
     {
      i40 = 153;
      break L8;
     }
    }
   }
  case 100:
  case 99:
  case 98:
   {
    i14 = HEAP32[i47 >> 2] | 0;
    i1 = (HEAP32[i24 >> 2] | 0) + -2 | 0;
    HEAP32[i24 >> 2] = i1;
    i1 = HEAP32[i14 + (i1 << 2) >> 2] | 0;
    switch (HEAP8[i1 + 35 >> 0] | 0) {
    case 1:
     {
      _PushU32_(i53, _Translate(i11 + 70 | 0) | 0);
      _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 32 >> 2] | 0);
      i3 = i15;
      i1 = i12;
      break L10;
     }
    case 0:
     {
      _PushU32_(i53, _Translate(i11 + 73 | 0) | 0);
      _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 96 >> 2] | 0);
      i3 = i15;
      i1 = i12;
      break L10;
     }
    default:
     {
      i40 = 157;
      break L8;
     }
    }
   }
  case -126:
  case -77:
  case 103:
   {
    i7 = 0;
    i1 = 5;
    i2 = 8;
    i40 = 167;
    break;
   }
  case -125:
  case -75:
  case 104:
   {
    i7 = 0;
    i1 = 7;
    i2 = 16;
    i40 = 167;
    break;
   }
  case -118:
  case -45:
  case -124:
  case -73:
  case 105:
   {
    i7 = 0;
    i1 = 8;
    i2 = 32;
    i40 = 167;
    break;
   }
  case -122:
  case -76:
  case -46:
   {
    i1 = 4;
    i2 = 8;
    i40 = 162;
    break;
   }
  case -121:
  case -74:
  case -47:
   {
    i1 = 14;
    i2 = 16;
    i40 = 162;
    break;
   }
  case -117:
  case -32:
  case -120:
  case -72:
  case 109:
   {
    i1 = 13;
    i2 = 32;
    i40 = 162;
    break;
   }
  case -123:
  case -71:
  case 106:
   {
    i7 = 2;
    i1 = 24;
    i40 = 167;
    break;
   }
  case -119:
  case -70:
  case 110:
   {
    i7 = 3;
    i1 = 25;
    i40 = 167;
    break;
   }
  case 107:
   {
    i7 = 4;
    i1 = 22;
    i40 = 167;
    break;
   }
  case 118:
  case 108:
   {
    i7 = 5;
    i1 = 23;
    i40 = 167;
    break;
   }
  case 113:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    i3 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i3;
    i3 = _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i22 >> 2] | 0, i3, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    _PushU32_(i53, _Translate(29) | 0);
    _PushU32_(i53, i3);
    _PushStackType_(i47, i3);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -127:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -2;
    if (HEAP8[i1 + 34 >> 0] | 0 ? (i27 = i1 + 64 | 0, (HEAP32[i27 >> 2] | 0) != 4) : 0) {
     _PushU32_(i53, _Translate(22) | 0);
     _PushU32_(i53, HEAP32[i27 >> 2] | 0);
     i3 = i15;
     i1 = i12;
     break L10;
    }
    _PushU32_(i53, _Translate(190) | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 114:
   {
    HEAP32[i52 >> 2] = (_GetUnalignedU32(i21, i28) | 0) & 16777215;
    _PushU32_(i53, _Translate(4) | 0);
    _PushU32_(i53, HEAP32[i52 >> 2] | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 36 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 115:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetMethodDefFromDefRefOrSpec(i23, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    if ((HEAP8[i1 + 32 >> 0] | 0) == 0 ? (i29 = _MetaData_GetTypeDefFromMethodDef(i1) | 0, (HEAP8[i29 + 32 >> 0] | 0) == 0) : 0) _MetaData_Fill_TypeDef_(i29, 0, 0);
    i3 = i1 + 48 | 0;
    if (!(HEAP8[(HEAP32[i3 >> 2] | 0) + 34 >> 0] | 0)) _PushU32_(i53, _Translate(8) | 0); else _PushU32_(i53, _Translate(14) | 0);
    HEAP32[i24 >> 2] = 1 - (HEAPU16[i1 + 34 >> 1] | 0) + (HEAP32[i24 >> 2] | 0);
    _PushU32_(i53, i1);
    _PushStackType_(i47, HEAP32[i3 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 116:
   {
    _PushU32_(i53, _Translate(34) | 0);
    i3 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i3;
    _PushU32_(i53, _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i22 >> 2] | 0, i3, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 117:
   {
    _PushU32_(i53, _Translate(15) | 0);
    i3 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i3;
    _PushU32_(i53, _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i22 >> 2] | 0, i3, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -115:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    _PushU32_(i53, _Translate(13) | 0);
    if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
    i3 = _Type_GetArrayTypeDef(i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    _PushU32_(i53, i3);
    _PushStackType_(i47, i3);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -114:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    _PushU32_(i53, _Translate(30) | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 32 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -107:
  case -108:
  case -109:
  case -110:
  case -111:
  case -112:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -2;
    _PushU32_(i53, _Translate(i11 + 80 | 0) | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 32 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -106:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -2;
    _PushU32_(i53, _Translate(230) | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 96 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -104:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -2;
    _PushU32_(i53, _Translate(231) | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 88 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -103:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -2;
    _PushU32_(i53, _Translate(232) | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 92 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -102:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -2;
    _PushU32_(i53, _Translate(229) | 0);
    _PushStackType_(i47, HEAP32[HEAP32[8595] >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -93:
   {
    i3 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i3;
    i3 = _MetaData_GetTypeDefFromDefRefOrSpec(i23, i3, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -2;
    _PushU32_(i53, _Translate(35) | 0);
    _PushU32_(i53, HEAP32[i3 + 68 >> 2] | 0);
    _PushStackType_(i47, i3);
    i1 = i12;
    break;
   }
  case -113:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -2;
    _GetUnalignedU32(i21, i28) | 0;
    _PushU32_(i53, _Translate(32) | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 40 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -94:
  case -96:
  case -98:
  case -99:
  case -100:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -3;
    _PushU32_(i53, _Translate(222) | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -95:
  case -97:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -3;
    _PushU32_(i53, _Translate(223) | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -92:
   {
    _GetUnalignedU32(i21, i28) | 0;
    i1 = HEAP32[i24 >> 2] | 0;
    i3 = HEAP32[(HEAP32[i47 >> 2] | 0) + (i1 + -1 << 2) >> 2] | 0;
    HEAP32[i24 >> 2] = i1 + -3;
    _PushU32_(i53, _Translate(24) | 0);
    _PushU32_(i53, HEAP32[i3 + 68 >> 2] | 0);
    i1 = i12;
    break;
   }
  case 125:
   {
    i1 = HEAP32[i47 >> 2] | 0;
    i3 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
    HEAP32[i24 >> 2] = i3;
    i3 = HEAP32[i1 + (i3 << 2) >> 2] | 0;
    _PushU32_(i53, _Translate((HEAPU8[i3 + 35 >> 0] | 0) + 72 | 0) | 0);
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    _PushU32_(i53, _MetaData_GetFieldDefFromDefOrRef(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0);
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    i1 = i12;
    break;
   }
  case 123:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetFieldDefFromDefOrRef(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    i3 = HEAP32[i47 >> 2] | 0;
    i6 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
    HEAP32[i24 >> 2] = i6;
    i6 = HEAP32[i3 + (i6 << 2) >> 2] | 0;
    i3 = i1;
    do if ((HEAP8[i6 + 35 >> 0] | 0) != 7) if ((HEAP32[i1 + 32 >> 2] | 0) >>> 0 < 5) {
     _PushU32_(i53, _Translate(315) | 0);
     _PushU32_(i53, HEAP32[i1 + 28 >> 2] | 0);
     break;
    } else {
     _PushU32_(i53, _Translate(37) | 0);
     _PushU32_(i53, i3);
     break;
    } else {
     _PushU32_(i53, _Translate(36) | 0);
     _PushU32_(i53, HEAP32[i6 + 68 >> 2] | 0);
     _PushU32_(i53, i3);
    } while (0);
    _PushStackType_(i47, HEAP32[i1 + 20 >> 2] | 0);
    i3 = i6;
    i1 = i12;
    break;
   }
  case 124:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetFieldDefFromDefOrRef(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    i3 = _MetaData_GetTypeDefFromFieldDef(i1) | 0;
    if (!(HEAP8[i3 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i3, 0, 0);
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    _PushU32_(i53, _Translate(19) | 0);
    _PushU32_(i53, HEAP32[i1 + 28 >> 2] | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 40 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -128:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetFieldDefFromDefOrRef(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    i3 = _MetaData_GetTypeDefFromFieldDef(i1) | 0;
    if (!(HEAP8[i3 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i3, 0, 0);
    i3 = HEAP32[i1 + 20 >> 2] | 0;
    _PushU32_(i53, _Translate((HEAPU8[i3 + 35 >> 0] | 0) + 96 | 0) | 0);
    _PushU32_(i53, i1);
    i1 = i12;
    break;
   }
  case 126:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetFieldDefFromDefOrRef(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    i3 = _MetaData_GetTypeDefFromFieldDef(i1) | 0;
    if (!(HEAP8[i3 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i3, 0, 0);
    i3 = HEAP32[i1 + 20 >> 2] | 0;
    _PushU32_(i53, _Translate((HEAPU8[i3 + 35 >> 0] | 0) + 80 | 0) | 0);
    _PushU32_(i53, i1);
    _PushStackType_(i47, i3);
    i1 = i12;
    break;
   }
  case 127:
   {
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetFieldDefFromDefOrRef(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    i3 = _MetaData_GetTypeDefFromFieldDef(i1) | 0;
    if (!(HEAP8[i3 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i3, 0, 0);
    _PushU32_(i53, _Translate(45) | 0);
    _PushU32_(i53, i1);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 40 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -116:
   {
    i1 = HEAP32[i47 >> 2] | 0;
    i3 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
    HEAP32[i24 >> 2] = i3;
    i3 = HEAP32[i1 + (i3 << 2) >> 2] | 0;
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
    if ((HEAP32[i1 + 88 >> 2] | 0) == (HEAP32[(HEAP32[8595] | 0) + 184 >> 2] | 0)) {
     _PushU32_(i53, _Translate(142) | 0);
     _PushU32_(i53, HEAP32[HEAP32[i1 + 92 >> 2] >> 2] | 0);
    } else {
     _PushU32_(i53, _Translate((HEAPU8[i3 + 35 >> 0] | 0) + 104 | 0) | 0);
     _PushU32_(i53, i1);
    }
    _PushStackType_(i47, HEAP32[HEAP32[8595] >> 2] | 0);
    i1 = i12;
    break;
   }
  case -91:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    i1 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i1;
    i1 = _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    do if ((HEAP32[i1 + 88 >> 2] | 0) != (HEAP32[(HEAP32[8595] | 0) + 184 >> 2] | 0)) if (!(HEAP8[i1 + 34 >> 0] | 0)) {
     _PushU32_(i53, _Translate(18) | 0);
     break;
    } else {
     _PushU32_(i53, _Translate(17) | 0);
     break;
    } else {
     _PushU32_(i53, _Translate(218) | 0);
     _PushU32_(i53, HEAP32[HEAP32[i1 + 92 >> 2] >> 2] | 0);
    } while (0);
    _PushStackType_(i47, i1);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -48:
   {
    i3 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i3;
    i3 = _MetaData_GetTypeMethodField(HEAP32[i22 >> 2] | 0, i3, i52, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    _PushU32_(i53, _Translate((HEAP32[i52 >> 2] | 0) + 176 | 0) | 0);
    _PushU32_(i53, i3);
    i3 = HEAP32[i52 >> 2] | 0;
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + (((i3 | 0) == 0 ? 28 : (i3 | 0) == 1 ? 11 : 29) << 2) >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 122:
   {
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    _PushU32_(i53, _Translate(27) | 0);
    _RestoreTypeStack(i47, HEAP32[i49 + (HEAP32[i28 >> 2] << 2) >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -34:
   {
    HEAP32[i28 >> 2] = i1;
    i3 = HEAP8[i7 >> 0] | 0;
    i40 = 247;
    break;
   }
  case -35:
   {
    i3 = _GetUnalignedU32(i21, i28) | 0;
    i1 = HEAP32[i28 >> 2] | 0;
    i40 = 247;
    break;
   }
  case -36:
   {
    _PushU32_(i53, _Translate(26) | 0);
    _RestoreTypeStack(i47, HEAP32[i49 + (HEAP32[i28 >> 2] << 2) >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case -2:
   {
    HEAP32[i28 >> 2] = i1;
    i14 = HEAP8[i7 >> 0] | 0;
    i7 = i14 & 255;
    switch (i14 << 24 >> 24) {
    case 30:
     {
      i3 = i15;
      i1 = i12;
      break L10;
     }
    case 21:
     {
      HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
      i1 = _GetUnalignedU32(i21, i28) | 0;
      HEAP32[i52 >> 2] = i1;
      i1 = _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i22 >> 2] | 0, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
      if (!(HEAP8[i1 + 34 >> 0] | 0)) {
       _PushU32_(i53, _Translate(42) | 0);
       i3 = i15;
       i1 = i12;
       break L10;
      } else {
       _PushU32_(i53, _Translate(12) | 0);
       _PushU32_(i53, i1);
       i3 = i15;
       i1 = i12;
       break L10;
      }
     }
    case 6:
     {
      i3 = _GetUnalignedU32(i21, i28) | 0;
      HEAP32[i52 >> 2] = i3;
      i3 = _MetaData_GetMethodDefFromDefRefOrSpec(HEAP32[i22 >> 2] | 0, i3, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
      _PushU32_(i53, _Translate(38) | 0);
      _PushU32_(i53, i3);
      _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 40 >> 2] | 0);
      i3 = i15;
      i1 = i12;
      break L10;
     }
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
     {
      i6 = HEAP32[i47 >> 2] | 0;
      i3 = HEAP32[i24 >> 2] | 0;
      i1 = HEAP32[i6 + (i3 + -1 << 2) >> 2] | 0;
      i3 = i3 + -2 | 0;
      HEAP32[i24 >> 2] = i3;
      i3 = HEAP32[i6 + (i3 << 2) >> 2] | 0;
      i6 = i1 + 35 | 0;
      switch (HEAP8[i3 + 35 >> 0] | 0) {
      case 1:
       {
        if ((HEAP8[i6 >> 0] | 0) == 1) i40 = 260; else {
         i40 = 267;
         break L8;
        }
        break;
       }
      case 5:
       {
        if ((HEAP8[i6 >> 0] | 0) == 5) i40 = 260; else {
         i40 = 267;
         break L8;
        }
        break;
       }
      case 4:
       {
        if ((HEAP8[i6 >> 0] | 0) == 4) i40 = 260; else {
         i40 = 267;
         break L8;
        }
        break;
       }
      case 0:
       {
        if (HEAP8[i6 >> 0] | 0) {
         i40 = 267;
         break L8;
        }
        _PushU32_(i53, _Translate(i7 + 116 | 0) | 0);
        break;
       }
      case 6:
       {
        if ((HEAP8[i6 >> 0] | 0) != 6) {
         i40 = 267;
         break L8;
        }
        _PushU32_(i53, _Translate(i7 + 249 | 0) | 0);
        break;
       }
      case 3:
       {
        if ((HEAP8[i6 >> 0] | 0) != 3) {
         i40 = 267;
         break L8;
        }
        _PushU32_(i53, _Translate(i7 + 271 | 0) | 0);
        break;
       }
      default:
       {
        i40 = 267;
        break L8;
       }
      }
      if ((i40 | 0) == 260) {
       i40 = 0;
       _PushU32_(i53, _Translate(i7 + 111 | 0) | 0);
      }
      _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 32 >> 2] | 0);
      i3 = i15;
      i1 = i12;
      break L10;
     }
    case 26:
     {
      _PushU32_(i53, _Translate(28) | 0);
      i3 = i15;
      i1 = i12;
      break L10;
     }
    case 22:
     {
      i1 = _GetUnalignedU32(i21, i28) | 0;
      HEAP32[i28 >> 2] = (HEAP32[i28 >> 2] | 0) + 1;
      i3 = 22;
      i6 = i12;
      i40 = 67;
      break L10;
     }
    default:
     {
      i40 = 271;
      break L8;
     }
    }
   }
  default:
   {
    i40 = 272;
    break L8;
   }
  } while (0);
  switch (i40 | 0) {
  case 20:
   {
    i40 = 0;
    if ((i1 + 1 | 0) >>> 0 < 4) _PushU32_(i53, _Translate(i1 + 312 | 0) | 0); else {
     _PushU32_(i53, _Translate(2) | 0);
     _PushU32_(i53, i1);
    }
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 32 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 29:
   {
    i40 = 0;
    HEAP32[i52 >> 2] = i1;
    i15 = HEAP32[i16 >> 2] | 0;
    i3 = HEAP32[i15 + (i1 * 12 | 0) >> 2] | 0;
    i1 = HEAP32[i15 + (i1 * 12 | 0) + 4 >> 2] | 0;
    if (!(i1 >>> 0 < 32 ? (HEAP32[i3 + 68 >> 2] | 0) == 4 : 0)) {
     i15 = i3 + 35 | 0;
     _PushU32_(i53, _Translate((HEAPU8[i15 >> 0] | 0) + 48 | 0) | 0);
     _PushU32_(i53, i1);
     if ((HEAP8[i15 >> 0] | 0) == 7) _PushU32_(i53, i3);
    } else _PushU32_(i53, _Translate((i1 >>> 2) + 295 | 0) | 0);
    _PushStackType_(i47, i3);
    i1 = i12;
    break;
   }
  case 41:
   {
    i40 = 0;
    HEAP32[i52 >> 2] = i1;
    i3 = HEAP32[i26 + (i1 * 12 | 0) >> 2] | 0;
    i1 = (HEAP32[i26 + (i1 * 12 | 0) + 4 >> 2] | 0) + (HEAP32[i20 >> 2] | 0) | 0;
    if (!(i1 >>> 0 < 32 ? (HEAP32[i3 + 68 >> 2] | 0) == 4 : 0)) {
     i15 = i3 + 35 | 0;
     _PushU32_(i53, _Translate((HEAPU8[i15 >> 0] | 0) + 48 | 0) | 0);
     _PushU32_(i53, i1);
     if ((HEAP8[i15 >> 0] | 0) == 7) _PushU32_(i53, i3);
    } else _PushU32_(i53, _Translate((i1 >>> 2) + 295 | 0) | 0);
    _PushStackType_(i47, i3);
    i1 = i12;
    break;
   }
  case 48:
   {
    i40 = 0;
    HEAP32[i52 >> 2] = i1;
    i15 = HEAP32[i47 >> 2] | 0;
    i3 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
    HEAP32[i24 >> 2] = i3;
    i3 = HEAP32[i15 + (i3 << 2) >> 2] | 0;
    i1 = (HEAP32[i26 + (i1 * 12 | 0) + 4 >> 2] | 0) + (HEAP32[i20 >> 2] | 0) | 0;
    if (i1 >>> 0 < 32 ? (HEAP32[i3 + 68 >> 2] | 0) == 4 : 0) {
     _PushU32_(i53, _Translate((i1 >>> 2) + 303 | 0) | 0);
     i1 = i12;
     break;
    }
    i15 = i3 + 35 | 0;
    _PushU32_(i53, _Translate((HEAPU8[i15 >> 0] | 0) + 56 | 0) | 0);
    _PushU32_(i53, i1);
    if ((HEAP8[i15 >> 0] | 0) == 7) {
     _PushU32_(i53, i3);
     i1 = i12;
    } else i1 = i12;
    break;
   }
  case 64:
   {
    i40 = 0;
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    _PushU32_(i53, _Translate(i11 + 109 | 0) | 0);
    _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + (HEAP32[i52 >> 2] << 2) >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 67:
   {
    i40 = 0;
    i13 = _GetUnalignedU32(i21, i28) | 0;
    HEAP32[i52 >> 2] = i13;
    i13 = _MetaData_GetMethodDefFromDefRefOrSpec(i23, i13, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
    if ((HEAP8[i13 + 32 >> 0] | 0) == 0 ? (i25 = _MetaData_GetTypeDefFromMethodDef(i13) | 0, (HEAP8[i25 + 32 >> 0] | 0) == 0) : 0) _MetaData_Fill_TypeDef_(i25, 0, 0);
    do if (!i1) {
     i10 = 0;
     i11 = 0;
     i12 = i3;
    } else {
     i14 = _MetaData_GetTypeDefFromDefRefOrSpec(i23, i1, HEAP32[(HEAP32[i19 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i18 >> 2] | 0) | 0;
     i7 = HEAP32[i13 + 48 >> 2] | 0;
     i12 = i14 + 44 | 0;
     i8 = i13 + 56 | 0;
     if (!(HEAP32[i7 + 8 >> 2] & 32)) {
      if (!(HEAP8[i14 + 34 >> 0] | 0)) {
       i10 = 1;
       i11 = 0;
       i12 = i3;
       break;
      }
      i11 = HEAP32[(HEAP32[i12 >> 2] | 0) + (HEAP32[i8 >> 2] << 2) >> 2] | 0;
      i12 = (HEAP32[i11 + 48 >> 2] | 0) == (i14 | 0);
      i10 = 0;
      i13 = i12 ? i11 : i13;
      i11 = i12 ? 0 : i14;
      i12 = i12 ? 40 : i3;
      break;
     }
     i9 = HEAP32[i14 + 72 >> 2] | 0;
     i10 = i14 + 76 | 0;
     i1 = 0;
     while (1) {
      if (i1 >>> 0 >= i9 >>> 0) {
       i1 = -1;
       break;
      }
      i11 = HEAP32[i10 >> 2] | 0;
      if ((HEAP32[i11 + (i1 * 12 | 0) >> 2] | 0) == (i7 | 0)) {
       i40 = 75;
       break;
      }
      i1 = i1 + 1 | 0;
     }
     if ((i40 | 0) == 75) {
      i40 = 0;
      i1 = HEAP32[(HEAP32[i11 + (i1 * 12 | 0) + 4 >> 2] | 0) + (HEAP32[i8 >> 2] << 2) >> 2] | 0;
     }
     i11 = HEAP32[(HEAP32[i12 >> 2] | 0) + (i1 << 2) >> 2] | 0;
     i12 = (HEAP32[i11 + 48 >> 2] | 0) == (i14 | 0);
     i10 = 0;
     i13 = i12 ? i11 : i13;
     i11 = 0;
     i12 = i12 ? 40 : i3;
    } while (0);
    i7 = HEAPU16[i13 + 34 >> 1] | 0;
    i8 = HEAP32[i47 >> 2] | 0;
    i3 = i15;
    i1 = 0;
    while (1) {
     if ((i1 | 0) == (i7 | 0)) break;
     i3 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
     HEAP32[i24 >> 2] = i3;
     i3 = HEAP32[i8 + (i3 << 2) >> 2] | 0;
     i1 = i1 + 1 | 0;
    }
    if (HEAP16[i13 + 14 >> 1] & 16) i3 = HEAP32[HEAP32[8595] >> 2] | 0;
    if (!(HEAP8[i3 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i3, 0, 0);
    i1 = HEAP32[i13 + 48 >> 2] | 0;
    L280 : do if (i12 << 24 >> 24 == 111 ? (HEAP32[i1 + 8 >> 2] & 32 | 0) != 0 : 0) _PushU32_(i53, _Translate(33) | 0); else {
     i7 = HEAP32[8595] | 0;
     if ((HEAP32[i1 + 40 >> 2] | 0) == (HEAP32[i7 + 80 >> 2] | 0)) {
      _PushU32_(i53, _Translate(39) | 0);
      break;
     }
     if ((i1 | 0) == (HEAP32[i7 + 200 >> 2] | 0) ? (_strcmp(HEAP32[i13 + 16 >> 2] | 0, 13748) | 0) == 0 : 0) {
      _PushU32_(i53, _Translate(356) | 0);
      i6 = 1;
      break;
     }
     i9 = HEAP8[i3 + 35 >> 0] | 0;
     i7 = (i10 | 0) != 0;
     i8 = i11;
     i1 = (i11 | 0) != 0;
     switch (i9 << 24 >> 24) {
     case 5:
     case 2:
      {
       if (i7) {
        _PushU32_(i53, _Translate(23) | 0);
        break L280;
       }
       if (i1) {
        _PushU32_(i53, _Translate(11) | 0);
        _PushU32_(i53, i8);
        break L280;
       } else {
        _PushU32_(i53, _Translate(i12 << 24 >> 24 == 40 ? 7 : 5) | 0);
        break L280;
       }
      }
     case 7:
     case 4:
      {
       if (i7) {
        _PushU32_(i53, _Translate(23) | 0);
        break L280;
       }
       if (i1) {
        _PushU32_(i53, _Translate(11) | 0);
        _PushU32_(i53, i8);
        break L280;
       } else {
        _PushU32_(i53, _Translate(10) | 0);
        break L280;
       }
      }
     default:
      {
       i40 = 105;
       break L8;
      }
     }
    } while (0);
    _PushU32_(i53, i13);
    i1 = HEAP32[i13 + 44 >> 2] | 0;
    if (i1 | 0) _PushStackType_(i47, i1);
    if (!(i6 << 24 >> 24)) i1 = 0; else {
     _PushU32_(i53, _Translate(357) | 0);
     i1 = i6;
    }
    break;
   }
  case 112:
   {
    i40 = 0;
    i14 = i1 + i3 | 0;
    HEAP32[i52 >> 2] = i14;
    if (i14 >>> 0 > i1 >>> 0) {
     i14 = _DeepCopyTypeStack(i47) | 0;
     HEAP32[i49 + (HEAP32[i52 >> 2] << 2) >> 2] = i14;
    }
    _PushU32_(i53, _Translate(3) | 0);
    _PushU32_(i41, HEAP32[i43 >> 2] | 0);
    _PushU32_(i53, HEAP32[i52 >> 2] | 0);
    _RestoreTypeStack(i47, HEAP32[i49 + (HEAP32[i28 >> 2] << 2) >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 122:
   {
    i40 = 0;
    HEAP32[i24 >> 2] = (HEAP32[i24 >> 2] | 0) + -1;
    i14 = i6 + i1 | 0;
    HEAP32[i52 >> 2] = i14;
    if (i14 >>> 0 > i6 >>> 0) {
     i14 = _DeepCopyTypeStack(i47) | 0;
     HEAP32[i49 + (HEAP32[i52 >> 2] << 2) >> 2] = i14;
    }
    _PushU32_(i53, _Translate(i3 + i11 | 0) | 0);
    _PushU32_(i41, HEAP32[i43 >> 2] | 0);
    _PushU32_(i53, HEAP32[i52 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 127:
   {
    i40 = 0;
    i14 = HEAP32[i47 >> 2] | 0;
    i1 = HEAP32[i24 >> 2] | 0;
    i10 = HEAP32[i14 + (i1 + -1 << 2) >> 2] | 0;
    i1 = i1 + -2 | 0;
    HEAP32[i24 >> 2] = i1;
    i1 = HEAP32[i14 + (i1 << 2) >> 2] | 0;
    i14 = i3 + i6 | 0;
    HEAP32[i52 >> 2] = i14;
    if (i14 >>> 0 > i6 >>> 0) {
     i14 = _DeepCopyTypeStack(i47) | 0;
     HEAP32[i49 + (HEAP32[i52 >> 2] << 2) >> 2] = i14;
    }
    i7 = HEAP8[i1 + 35 >> 0] | 0;
    i8 = i7 & 255;
    i6 = i11 - i9 | 0;
    i1 = HEAP8[i10 + 35 >> 0] | 0;
    i3 = i1 & 255;
    do if (!(i7 << 24 >> 24 == 1 & i1 << 24 >> 24 == 1) ? !(i7 << 24 >> 24 == 5 & i1 << 24 >> 24 == 5) : 0) {
     if (!((i1 | i7) << 24 >> 24)) {
      _PushU32_(i53, _Translate(i6 + 154 | 0) | 0);
      break;
     }
     if (i7 << 24 >> 24 == 6 & i1 << 24 >> 24 == 6) {
      _PushU32_(i53, _Translate(i6 + 255 | 0) | 0);
      break;
     }
     if (!(i7 << 24 >> 24 == 3 & i1 << 24 >> 24 == 3)) {
      i40 = 138;
      break L8;
     }
     _PushU32_(i53, _Translate(i6 + 277 | 0) | 0);
    } else i40 = 131; while (0);
    if ((i40 | 0) == 131) {
     i40 = 0;
     _PushU32_(i53, _Translate(i6 + 144 | 0) | 0);
    }
    _PushU32_(i41, HEAP32[i43 >> 2] | 0);
    _PushU32_(i53, HEAP32[i52 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 141:
   {
    i40 = 0;
    HEAP32[i52 >> 2] = i1;
    i6 = HEAP32[i47 >> 2] | 0;
    i3 = HEAP32[i24 >> 2] | 0;
    i8 = HEAP32[i6 + (i3 + -1 << 2) >> 2] | 0;
    i3 = i3 + -2 | 0;
    HEAP32[i24 >> 2] = i3;
    i3 = HEAP32[i6 + (i3 << 2) >> 2] | 0;
    i6 = HEAP8[i3 + 35 >> 0] | 0;
    i7 = i6 & 255;
    i8 = HEAP8[i8 + 35 >> 0] | 0;
    i9 = i8 & 255;
    if (i6 << 24 >> 24 == 1 & i8 << 24 >> 24 == 1) {
     _PushU32_(i53, _Translate(i11 + 40 - i1 | 0) | 0);
     _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 32 >> 2] | 0);
     i3 = i15;
     i1 = i12;
     break;
    }
    if (!((i8 | i6) << 24 >> 24)) {
     _PushU32_(i53, _Translate(i11 + 152 - i1 | 0) | 0);
     _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + 96 >> 2] | 0);
     i3 = i15;
     i1 = i12;
     break;
    }
    if (i6 << 24 >> 24 == 6 & i8 << 24 >> 24 == 6) {
     _PushU32_(i53, _Translate(i11 + 177 - i1 | 0) | 0);
     _PushStackType_(i47, i3);
     i3 = i15;
     i1 = i12;
     break;
    }
    if (!(i6 << 24 >> 24 == 3 & i8 << 24 >> 24 == 3)) {
     i40 = 149;
     break L8;
    }
    _PushU32_(i53, _Translate(i11 + 199 - i1 | 0) | 0);
    _PushStackType_(i47, i3);
    i3 = i15;
    i1 = i12;
    break;
   }
  case 162:
   {
    i7 = 1;
    i40 = 167;
    break;
   }
  case 247:
   {
    i40 = 0;
    i14 = i1 + i3 | 0;
    HEAP32[i52 >> 2] = i14;
    if (i14 >>> 0 > i1 >>> 0) {
     i1 = _DeepCopyTypeStack(i47) | 0;
     HEAP32[i49 + (HEAP32[i52 >> 2] << 2) >> 2] = i1;
     i1 = HEAP32[i28 >> 2] | 0;
    }
    _RestoreTypeStack(i47, HEAP32[i49 + (i1 << 2) >> 2] | 0);
    _PushU32_(i53, _Translate(25) | 0);
    _PushU32_(i41, HEAP32[i43 >> 2] | 0);
    _PushU32_(i53, HEAP32[i52 >> 2] | 0);
    i3 = i15;
    i1 = i12;
    break;
   }
  }
  if ((i40 | 0) == 167) {
   i40 = 0;
   i3 = HEAP32[i47 >> 2] | 0;
   i6 = (HEAP32[i24 >> 2] | 0) + -1 | 0;
   HEAP32[i24 >> 2] = i6;
   i6 = HEAP32[i3 + (i6 << 2) >> 2] | 0;
   i3 = HEAP8[i6 + 35 >> 0] | 0;
   L312 : do switch (i3 << 24 >> 24) {
   case 0:
    {
     i4 = (i6 | 0) == (HEAP32[(HEAP32[8595] | 0) + 96 >> 2] | 0) ? 332 : 338;
     break;
    }
   case 4:
   case 1:
    {
     i15 = HEAP32[8595] | 0;
     if ((((i6 | 0) != (HEAP32[i15 + 16 >> 2] | 0) ? (i6 | 0) != (HEAP32[i15 + 56 >> 2] | 0) : 0) ? (i6 | 0) != (HEAP32[i15 + 52 >> 2] | 0) : 0) ? (i6 | 0) != (HEAP32[i15 + 180 >> 2] | 0) : 0) {
      i4 = 320;
      break L312;
     }
     i4 = 326;
     break;
    }
   case 3:
    {
     i4 = 350;
     break;
    }
   case 6:
    {
     i4 = 344;
     break;
    }
   default:
    {
     i40 = 175;
     break L8;
    }
   } while (0);
   switch (i7 & 7) {
   case 0:
    {
     i3 = 1;
     i5 = 32 - i2 | 0;
     break;
    }
   case 1:
    {
     i3 = 1;
     i5 = (2 << i2 + -1) + -1 | 0;
     break;
    }
   case 5:
   case 4:
   case 3:
   case 2:
    {
     i3 = 0;
     break;
    }
   default:
    {
     i40 = 179;
     break L8;
    }
   }
   _PushU32_(i53, _Translate(i4 + i7 | 0) | 0);
   if (i3) _PushU32_(i53, i5);
   _PushStackType_(i47, HEAP32[(HEAP32[8595] | 0) + (i1 << 2) >> 2] | 0);
   i3 = i6;
   i1 = i12;
  }
  i6 = HEAP32[i28 >> 2] | 0;
  if (i6 >>> 0 >= i50 >>> 0) {
   i40 = 275;
   break;
  }
  i15 = i3;
  i12 = i1;
  i1 = HEAP32[i43 >> 2] | 0;
 }
 switch (i40 | 0) {
 case 105:
  {
   HEAP32[i30 >> 2] = i9 & 255;
   _Crash(13755, i30);
   break;
  }
 case 138:
  {
   HEAP32[i31 >> 2] = i8;
   HEAP32[i31 + 4 >> 2] = i3;
   _Crash(13808, i31);
   break;
  }
 case 149:
  {
   HEAP32[i38 >> 2] = i7;
   HEAP32[i38 + 4 >> 2] = i9;
   _Crash(13877, i38);
   break;
  }
 case 153:
  {
   HEAP32[i39 >> 2] = i1 & 255;
   _Crash(13950, i39);
   break;
  }
 case 157:
  {
   HEAP32[i32 >> 2] = HEAP32[i1 + 12 >> 2];
   _Crash(14007, i32);
   break;
  }
 case 175:
  {
   HEAP32[i33 >> 2] = i3 & 255;
   _Crash(14059, i33);
   break;
  }
 case 179:
  {
   HEAP32[i34 >> 2] = i7;
   _Crash(14100, i34);
   break;
  }
 case 267:
  {
   i54 = HEAP32[i1 + 12 >> 2] | 0;
   HEAP32[i35 >> 2] = HEAP32[i3 + 12 >> 2];
   HEAP32[i35 + 4 >> 2] = i54;
   _Crash(14143, i35);
   break;
  }
 case 271:
  {
   HEAP32[i36 >> 2] = i7;
   _Crash(14212, i36);
   break;
  }
 case 272:
  {
   HEAP32[i37 >> 2] = i11;
   _Crash(14266, i37);
   break;
  }
 case 275:
  {
   i3 = HEAP32[i17 >> 2] | 0;
   i4 = HEAP32[i41 >> 2] | 0;
   i2 = HEAP32[i53 >> 2] | 0;
   i1 = 0;
   while (1) {
    if ((i1 | 0) == (i3 | 0)) break;
    i41 = i2 + (HEAP32[i4 + (i1 << 2) >> 2] << 2) | 0;
    HEAP32[i41 >> 2] = HEAP32[i48 + (HEAP32[i41 >> 2] << 2) >> 2];
    i1 = i1 + 1 | 0;
   }
   i2 = HEAP32[i42 >> 2] | 0;
   i1 = 0;
   while (1) {
    if ((i1 | 0) == (i2 | 0)) break;
    i40 = HEAP32[i44 >> 2] | 0;
    i42 = i40 + (i1 * 24 | 0) + 4 | 0;
    i41 = HEAP32[i42 >> 2] | 0;
    i39 = i40 + (i1 * 24 | 0) + 8 | 0;
    HEAP32[i39 >> 2] = HEAP32[i48 + ((HEAP32[i39 >> 2] | 0) + i41 << 2) >> 2];
    HEAP32[i42 >> 2] = HEAP32[i48 + (i41 << 2) >> 2];
    i42 = i40 + (i1 * 24 | 0) + 12 | 0;
    i41 = HEAP32[i42 >> 2] | 0;
    i40 = i40 + (i1 * 24 | 0) + 16 | 0;
    HEAP32[i40 >> 2] = HEAP32[i48 + ((HEAP32[i40 >> 2] | 0) + i41 << 2) >> 2];
    HEAP32[i42 >> 2] = HEAP32[i48 + (i41 << 2) >> 2];
    i1 = i1 + 1 | 0;
   }
   HEAP32[i45 >> 2] = HEAP32[i46 >> 2];
   _free(HEAP32[i47 >> 2] | 0);
   i1 = 0;
   while (1) {
    if ((i1 | 0) == (i50 | 0)) break;
    i2 = HEAP32[i49 + (i1 << 2) >> 2] | 0;
    if (i2 | 0) _free(HEAP32[i2 >> 2] | 0);
    i1 = i1 + 1 | 0;
   }
   _free(i49);
   _free(i4);
   _free(i48);
   i1 = HEAP32[i43 >> 2] << 2;
   HEAP32[i52 >> 2] = i1;
   if (!i51) {
    i2 = _mallocForever(i1) | 0;
    i1 = HEAP32[i52 >> 2] | 0;
   } else i2 = _malloc(i1) | 0;
   _memcpy(i2 | 0, HEAP32[i53 >> 2] | 0, i1 | 0) | 0;
   _free(HEAP32[i53 >> 2] | 0);
   STACKTOP = i54;
   return i2 | 0;
  }
 }
 return 0;
}

function _malloc(i2) {
 i2 = i2 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0, i18 = 0, i19 = 0, i20 = 0, i21 = 0, i22 = 0, i23 = 0, i24 = 0, i25 = 0, i26 = 0, i27 = 0, i28 = 0, i29 = 0, i30 = 0, i31 = 0, i32 = 0, i33 = 0, i34 = 0, i35 = 0;
 i35 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i13 = i35;
 do if (i2 >>> 0 < 245) {
  i14 = i2 >>> 0 < 11 ? 16 : i2 + 11 & -8;
  i2 = i14 >>> 3;
  i18 = HEAP32[8627] | 0;
  i3 = i18 >>> i2;
  if (i3 & 3 | 0) {
   i2 = (i3 & 1 ^ 1) + i2 | 0;
   i3 = 34548 + (i2 << 1 << 2) | 0;
   i4 = i3 + 8 | 0;
   i5 = HEAP32[i4 >> 2] | 0;
   i6 = i5 + 8 | 0;
   i7 = HEAP32[i6 >> 2] | 0;
   do if ((i3 | 0) != (i7 | 0)) {
    if (i7 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort();
    i1 = i7 + 12 | 0;
    if ((HEAP32[i1 >> 2] | 0) == (i5 | 0)) {
     HEAP32[i1 >> 2] = i3;
     HEAP32[i4 >> 2] = i7;
     break;
    } else _abort();
   } else HEAP32[8627] = i18 & ~(1 << i2); while (0);
   i34 = i2 << 3;
   HEAP32[i5 + 4 >> 2] = i34 | 3;
   i34 = i5 + i34 + 4 | 0;
   HEAP32[i34 >> 2] = HEAP32[i34 >> 2] | 1;
   i34 = i6;
   STACKTOP = i35;
   return i34 | 0;
  }
  i17 = HEAP32[8629] | 0;
  if (i14 >>> 0 > i17 >>> 0) {
   if (i3 | 0) {
    i8 = 2 << i2;
    i2 = i3 << i2 & (i8 | 0 - i8);
    i2 = (i2 & 0 - i2) + -1 | 0;
    i8 = i2 >>> 12 & 16;
    i2 = i2 >>> i8;
    i4 = i2 >>> 5 & 8;
    i2 = i2 >>> i4;
    i6 = i2 >>> 2 & 4;
    i2 = i2 >>> i6;
    i3 = i2 >>> 1 & 2;
    i2 = i2 >>> i3;
    i1 = i2 >>> 1 & 1;
    i1 = (i4 | i8 | i6 | i3 | i1) + (i2 >>> i1) | 0;
    i2 = 34548 + (i1 << 1 << 2) | 0;
    i3 = i2 + 8 | 0;
    i6 = HEAP32[i3 >> 2] | 0;
    i8 = i6 + 8 | 0;
    i4 = HEAP32[i8 >> 2] | 0;
    do if ((i2 | 0) != (i4 | 0)) {
     if (i4 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort();
     i5 = i4 + 12 | 0;
     if ((HEAP32[i5 >> 2] | 0) == (i6 | 0)) {
      HEAP32[i5 >> 2] = i2;
      HEAP32[i3 >> 2] = i4;
      i9 = i18;
      break;
     } else _abort();
    } else {
     i9 = i18 & ~(1 << i1);
     HEAP32[8627] = i9;
    } while (0);
    i7 = (i1 << 3) - i14 | 0;
    HEAP32[i6 + 4 >> 2] = i14 | 3;
    i4 = i6 + i14 | 0;
    HEAP32[i4 + 4 >> 2] = i7 | 1;
    HEAP32[i4 + i7 >> 2] = i7;
    if (i17 | 0) {
     i5 = HEAP32[8632] | 0;
     i1 = i17 >>> 3;
     i3 = 34548 + (i1 << 1 << 2) | 0;
     i1 = 1 << i1;
     if (i9 & i1) {
      i1 = i3 + 8 | 0;
      i2 = HEAP32[i1 >> 2] | 0;
      if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
       i10 = i2;
       i11 = i1;
      }
     } else {
      HEAP32[8627] = i9 | i1;
      i10 = i3;
      i11 = i3 + 8 | 0;
     }
     HEAP32[i11 >> 2] = i5;
     HEAP32[i10 + 12 >> 2] = i5;
     HEAP32[i5 + 8 >> 2] = i10;
     HEAP32[i5 + 12 >> 2] = i3;
    }
    HEAP32[8629] = i7;
    HEAP32[8632] = i4;
    i34 = i8;
    STACKTOP = i35;
    return i34 | 0;
   }
   i10 = HEAP32[8628] | 0;
   if (i10) {
    i2 = (i10 & 0 - i10) + -1 | 0;
    i33 = i2 >>> 12 & 16;
    i2 = i2 >>> i33;
    i32 = i2 >>> 5 & 8;
    i2 = i2 >>> i32;
    i34 = i2 >>> 2 & 4;
    i2 = i2 >>> i34;
    i3 = i2 >>> 1 & 2;
    i2 = i2 >>> i3;
    i1 = i2 >>> 1 & 1;
    i1 = HEAP32[34812 + ((i32 | i33 | i34 | i3 | i1) + (i2 >>> i1) << 2) >> 2] | 0;
    i2 = (HEAP32[i1 + 4 >> 2] & -8) - i14 | 0;
    i3 = HEAP32[i1 + 16 + (((HEAP32[i1 + 16 >> 2] | 0) == 0 & 1) << 2) >> 2] | 0;
    if (!i3) {
     i9 = i1;
     i7 = i2;
    } else {
     do {
      i33 = (HEAP32[i3 + 4 >> 2] & -8) - i14 | 0;
      i34 = i33 >>> 0 < i2 >>> 0;
      i2 = i34 ? i33 : i2;
      i1 = i34 ? i3 : i1;
      i3 = HEAP32[i3 + 16 + (((HEAP32[i3 + 16 >> 2] | 0) == 0 & 1) << 2) >> 2] | 0;
     } while ((i3 | 0) != 0);
     i9 = i1;
     i7 = i2;
    }
    i5 = HEAP32[8631] | 0;
    if (i9 >>> 0 < i5 >>> 0) _abort();
    i8 = i9 + i14 | 0;
    if (i9 >>> 0 >= i8 >>> 0) _abort();
    i6 = HEAP32[i9 + 24 >> 2] | 0;
    i3 = HEAP32[i9 + 12 >> 2] | 0;
    do if ((i3 | 0) == (i9 | 0)) {
     i2 = i9 + 20 | 0;
     i1 = HEAP32[i2 >> 2] | 0;
     if (!i1) {
      i2 = i9 + 16 | 0;
      i1 = HEAP32[i2 >> 2] | 0;
      if (!i1) {
       i12 = 0;
       break;
      }
     }
     while (1) {
      i3 = i1 + 20 | 0;
      i4 = HEAP32[i3 >> 2] | 0;
      if (i4 | 0) {
       i1 = i4;
       i2 = i3;
       continue;
      }
      i3 = i1 + 16 | 0;
      i4 = HEAP32[i3 >> 2] | 0;
      if (!i4) break; else {
       i1 = i4;
       i2 = i3;
      }
     }
     if (i2 >>> 0 < i5 >>> 0) _abort(); else {
      HEAP32[i2 >> 2] = 0;
      i12 = i1;
      break;
     }
    } else {
     i4 = HEAP32[i9 + 8 >> 2] | 0;
     if (i4 >>> 0 < i5 >>> 0) _abort();
     i1 = i4 + 12 | 0;
     if ((HEAP32[i1 >> 2] | 0) != (i9 | 0)) _abort();
     i2 = i3 + 8 | 0;
     if ((HEAP32[i2 >> 2] | 0) == (i9 | 0)) {
      HEAP32[i1 >> 2] = i3;
      HEAP32[i2 >> 2] = i4;
      i12 = i3;
      break;
     } else _abort();
    } while (0);
    L73 : do if (i6 | 0) {
     i1 = HEAP32[i9 + 28 >> 2] | 0;
     i2 = 34812 + (i1 << 2) | 0;
     do if ((i9 | 0) == (HEAP32[i2 >> 2] | 0)) {
      HEAP32[i2 >> 2] = i12;
      if (!i12) {
       HEAP32[8628] = i10 & ~(1 << i1);
       break L73;
      }
     } else if (i6 >>> 0 >= (HEAP32[8631] | 0) >>> 0) {
      HEAP32[i6 + 16 + (((HEAP32[i6 + 16 >> 2] | 0) != (i9 | 0) & 1) << 2) >> 2] = i12;
      if (!i12) break L73; else break;
     } else _abort(); while (0);
     i2 = HEAP32[8631] | 0;
     if (i12 >>> 0 < i2 >>> 0) _abort();
     HEAP32[i12 + 24 >> 2] = i6;
     i1 = HEAP32[i9 + 16 >> 2] | 0;
     do if (i1 | 0) if (i1 >>> 0 < i2 >>> 0) _abort(); else {
      HEAP32[i12 + 16 >> 2] = i1;
      HEAP32[i1 + 24 >> 2] = i12;
      break;
     } while (0);
     i1 = HEAP32[i9 + 20 >> 2] | 0;
     if (i1 | 0) if (i1 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
      HEAP32[i12 + 20 >> 2] = i1;
      HEAP32[i1 + 24 >> 2] = i12;
      break;
     }
    } while (0);
    if (i7 >>> 0 < 16) {
     i34 = i7 + i14 | 0;
     HEAP32[i9 + 4 >> 2] = i34 | 3;
     i34 = i9 + i34 + 4 | 0;
     HEAP32[i34 >> 2] = HEAP32[i34 >> 2] | 1;
    } else {
     HEAP32[i9 + 4 >> 2] = i14 | 3;
     HEAP32[i8 + 4 >> 2] = i7 | 1;
     HEAP32[i8 + i7 >> 2] = i7;
     if (i17 | 0) {
      i4 = HEAP32[8632] | 0;
      i1 = i17 >>> 3;
      i3 = 34548 + (i1 << 1 << 2) | 0;
      i1 = 1 << i1;
      if (i18 & i1) {
       i1 = i3 + 8 | 0;
       i2 = HEAP32[i1 >> 2] | 0;
       if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
        i15 = i2;
        i16 = i1;
       }
      } else {
       HEAP32[8627] = i18 | i1;
       i15 = i3;
       i16 = i3 + 8 | 0;
      }
      HEAP32[i16 >> 2] = i4;
      HEAP32[i15 + 12 >> 2] = i4;
      HEAP32[i4 + 8 >> 2] = i15;
      HEAP32[i4 + 12 >> 2] = i3;
     }
     HEAP32[8629] = i7;
     HEAP32[8632] = i8;
    }
    i34 = i9 + 8 | 0;
    STACKTOP = i35;
    return i34 | 0;
   }
  }
 } else if (i2 >>> 0 <= 4294967231) {
  i2 = i2 + 11 | 0;
  i14 = i2 & -8;
  i10 = HEAP32[8628] | 0;
  if (i10) {
   i4 = 0 - i14 | 0;
   i2 = i2 >>> 8;
   if (i2) if (i14 >>> 0 > 16777215) i8 = 31; else {
    i16 = (i2 + 1048320 | 0) >>> 16 & 8;
    i27 = i2 << i16;
    i15 = (i27 + 520192 | 0) >>> 16 & 4;
    i27 = i27 << i15;
    i8 = (i27 + 245760 | 0) >>> 16 & 2;
    i8 = 14 - (i15 | i16 | i8) + (i27 << i8 >>> 15) | 0;
    i8 = i14 >>> (i8 + 7 | 0) & 1 | i8 << 1;
   } else i8 = 0;
   i3 = HEAP32[34812 + (i8 << 2) >> 2] | 0;
   L117 : do if (!i3) {
    i3 = 0;
    i2 = 0;
    i27 = 81;
   } else {
    i2 = 0;
    i7 = i14 << ((i8 | 0) == 31 ? 0 : 25 - (i8 >>> 1) | 0);
    i6 = 0;
    while (1) {
     i5 = (HEAP32[i3 + 4 >> 2] & -8) - i14 | 0;
     if (i5 >>> 0 < i4 >>> 0) if (!i5) {
      i2 = i3;
      i4 = 0;
      i5 = i3;
      i27 = 85;
      break L117;
     } else {
      i2 = i3;
      i4 = i5;
     }
     i5 = HEAP32[i3 + 20 >> 2] | 0;
     i3 = HEAP32[i3 + 16 + (i7 >>> 31 << 2) >> 2] | 0;
     i6 = (i5 | 0) == 0 | (i5 | 0) == (i3 | 0) ? i6 : i5;
     i5 = (i3 | 0) == 0;
     if (i5) {
      i3 = i6;
      i27 = 81;
      break;
     } else i7 = i7 << ((i5 ^ 1) & 1);
    }
   } while (0);
   if ((i27 | 0) == 81) {
    if ((i3 | 0) == 0 & (i2 | 0) == 0) {
     i2 = 2 << i8;
     i2 = i10 & (i2 | 0 - i2);
     if (!i2) break;
     i16 = (i2 & 0 - i2) + -1 | 0;
     i11 = i16 >>> 12 & 16;
     i16 = i16 >>> i11;
     i9 = i16 >>> 5 & 8;
     i16 = i16 >>> i9;
     i12 = i16 >>> 2 & 4;
     i16 = i16 >>> i12;
     i15 = i16 >>> 1 & 2;
     i16 = i16 >>> i15;
     i3 = i16 >>> 1 & 1;
     i2 = 0;
     i3 = HEAP32[34812 + ((i9 | i11 | i12 | i15 | i3) + (i16 >>> i3) << 2) >> 2] | 0;
    }
    if (!i3) {
     i9 = i2;
     i8 = i4;
    } else {
     i5 = i3;
     i27 = 85;
    }
   }
   if ((i27 | 0) == 85) while (1) {
    i27 = 0;
    i3 = (HEAP32[i5 + 4 >> 2] & -8) - i14 | 0;
    i16 = i3 >>> 0 < i4 >>> 0;
    i3 = i16 ? i3 : i4;
    i2 = i16 ? i5 : i2;
    i5 = HEAP32[i5 + 16 + (((HEAP32[i5 + 16 >> 2] | 0) == 0 & 1) << 2) >> 2] | 0;
    if (!i5) {
     i9 = i2;
     i8 = i3;
     break;
    } else {
     i4 = i3;
     i27 = 85;
    }
   }
   if ((i9 | 0) != 0 ? i8 >>> 0 < ((HEAP32[8629] | 0) - i14 | 0) >>> 0 : 0) {
    i5 = HEAP32[8631] | 0;
    if (i9 >>> 0 < i5 >>> 0) _abort();
    i7 = i9 + i14 | 0;
    if (i9 >>> 0 >= i7 >>> 0) _abort();
    i6 = HEAP32[i9 + 24 >> 2] | 0;
    i3 = HEAP32[i9 + 12 >> 2] | 0;
    do if ((i3 | 0) == (i9 | 0)) {
     i2 = i9 + 20 | 0;
     i1 = HEAP32[i2 >> 2] | 0;
     if (!i1) {
      i2 = i9 + 16 | 0;
      i1 = HEAP32[i2 >> 2] | 0;
      if (!i1) {
       i17 = 0;
       break;
      }
     }
     while (1) {
      i3 = i1 + 20 | 0;
      i4 = HEAP32[i3 >> 2] | 0;
      if (i4 | 0) {
       i1 = i4;
       i2 = i3;
       continue;
      }
      i3 = i1 + 16 | 0;
      i4 = HEAP32[i3 >> 2] | 0;
      if (!i4) break; else {
       i1 = i4;
       i2 = i3;
      }
     }
     if (i2 >>> 0 < i5 >>> 0) _abort(); else {
      HEAP32[i2 >> 2] = 0;
      i17 = i1;
      break;
     }
    } else {
     i4 = HEAP32[i9 + 8 >> 2] | 0;
     if (i4 >>> 0 < i5 >>> 0) _abort();
     i1 = i4 + 12 | 0;
     if ((HEAP32[i1 >> 2] | 0) != (i9 | 0)) _abort();
     i2 = i3 + 8 | 0;
     if ((HEAP32[i2 >> 2] | 0) == (i9 | 0)) {
      HEAP32[i1 >> 2] = i3;
      HEAP32[i2 >> 2] = i4;
      i17 = i3;
      break;
     } else _abort();
    } while (0);
    L164 : do if (i6) {
     i1 = HEAP32[i9 + 28 >> 2] | 0;
     i2 = 34812 + (i1 << 2) | 0;
     do if ((i9 | 0) == (HEAP32[i2 >> 2] | 0)) {
      HEAP32[i2 >> 2] = i17;
      if (!i17) {
       i18 = i10 & ~(1 << i1);
       HEAP32[8628] = i18;
       break L164;
      }
     } else if (i6 >>> 0 >= (HEAP32[8631] | 0) >>> 0) {
      HEAP32[i6 + 16 + (((HEAP32[i6 + 16 >> 2] | 0) != (i9 | 0) & 1) << 2) >> 2] = i17;
      if (!i17) {
       i18 = i10;
       break L164;
      } else break;
     } else _abort(); while (0);
     i2 = HEAP32[8631] | 0;
     if (i17 >>> 0 < i2 >>> 0) _abort();
     HEAP32[i17 + 24 >> 2] = i6;
     i1 = HEAP32[i9 + 16 >> 2] | 0;
     do if (i1 | 0) if (i1 >>> 0 < i2 >>> 0) _abort(); else {
      HEAP32[i17 + 16 >> 2] = i1;
      HEAP32[i1 + 24 >> 2] = i17;
      break;
     } while (0);
     i1 = HEAP32[i9 + 20 >> 2] | 0;
     if (i1) if (i1 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
      HEAP32[i17 + 20 >> 2] = i1;
      HEAP32[i1 + 24 >> 2] = i17;
      i18 = i10;
      break;
     } else i18 = i10;
    } else i18 = i10; while (0);
    do if (i8 >>> 0 >= 16) {
     HEAP32[i9 + 4 >> 2] = i14 | 3;
     HEAP32[i7 + 4 >> 2] = i8 | 1;
     HEAP32[i7 + i8 >> 2] = i8;
     i1 = i8 >>> 3;
     if (i8 >>> 0 < 256) {
      i3 = 34548 + (i1 << 1 << 2) | 0;
      i2 = HEAP32[8627] | 0;
      i1 = 1 << i1;
      if (i2 & i1) {
       i1 = i3 + 8 | 0;
       i2 = HEAP32[i1 >> 2] | 0;
       if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
        i22 = i2;
        i23 = i1;
       }
      } else {
       HEAP32[8627] = i2 | i1;
       i22 = i3;
       i23 = i3 + 8 | 0;
      }
      HEAP32[i23 >> 2] = i7;
      HEAP32[i22 + 12 >> 2] = i7;
      HEAP32[i7 + 8 >> 2] = i22;
      HEAP32[i7 + 12 >> 2] = i3;
      break;
     }
     i1 = i8 >>> 8;
     if (i1) if (i8 >>> 0 > 16777215) i1 = 31; else {
      i33 = (i1 + 1048320 | 0) >>> 16 & 8;
      i34 = i1 << i33;
      i32 = (i34 + 520192 | 0) >>> 16 & 4;
      i34 = i34 << i32;
      i1 = (i34 + 245760 | 0) >>> 16 & 2;
      i1 = 14 - (i32 | i33 | i1) + (i34 << i1 >>> 15) | 0;
      i1 = i8 >>> (i1 + 7 | 0) & 1 | i1 << 1;
     } else i1 = 0;
     i3 = 34812 + (i1 << 2) | 0;
     HEAP32[i7 + 28 >> 2] = i1;
     i2 = i7 + 16 | 0;
     HEAP32[i2 + 4 >> 2] = 0;
     HEAP32[i2 >> 2] = 0;
     i2 = 1 << i1;
     if (!(i18 & i2)) {
      HEAP32[8628] = i18 | i2;
      HEAP32[i3 >> 2] = i7;
      HEAP32[i7 + 24 >> 2] = i3;
      HEAP32[i7 + 12 >> 2] = i7;
      HEAP32[i7 + 8 >> 2] = i7;
      break;
     }
     i2 = i8 << ((i1 | 0) == 31 ? 0 : 25 - (i1 >>> 1) | 0);
     i4 = HEAP32[i3 >> 2] | 0;
     while (1) {
      if ((HEAP32[i4 + 4 >> 2] & -8 | 0) == (i8 | 0)) {
       i27 = 139;
       break;
      }
      i3 = i4 + 16 + (i2 >>> 31 << 2) | 0;
      i1 = HEAP32[i3 >> 2] | 0;
      if (!i1) {
       i27 = 136;
       break;
      } else {
       i2 = i2 << 1;
       i4 = i1;
      }
     }
     if ((i27 | 0) == 136) if (i3 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
      HEAP32[i3 >> 2] = i7;
      HEAP32[i7 + 24 >> 2] = i4;
      HEAP32[i7 + 12 >> 2] = i7;
      HEAP32[i7 + 8 >> 2] = i7;
      break;
     } else if ((i27 | 0) == 139) {
      i1 = i4 + 8 | 0;
      i2 = HEAP32[i1 >> 2] | 0;
      i34 = HEAP32[8631] | 0;
      if (i2 >>> 0 >= i34 >>> 0 & i4 >>> 0 >= i34 >>> 0) {
       HEAP32[i2 + 12 >> 2] = i7;
       HEAP32[i1 >> 2] = i7;
       HEAP32[i7 + 8 >> 2] = i2;
       HEAP32[i7 + 12 >> 2] = i4;
       HEAP32[i7 + 24 >> 2] = 0;
       break;
      } else _abort();
     }
    } else {
     i34 = i8 + i14 | 0;
     HEAP32[i9 + 4 >> 2] = i34 | 3;
     i34 = i9 + i34 + 4 | 0;
     HEAP32[i34 >> 2] = HEAP32[i34 >> 2] | 1;
    } while (0);
    i34 = i9 + 8 | 0;
    STACKTOP = i35;
    return i34 | 0;
   }
  }
 } else i14 = -1; while (0);
 i3 = HEAP32[8629] | 0;
 if (i3 >>> 0 >= i14 >>> 0) {
  i1 = i3 - i14 | 0;
  i2 = HEAP32[8632] | 0;
  if (i1 >>> 0 > 15) {
   i34 = i2 + i14 | 0;
   HEAP32[8632] = i34;
   HEAP32[8629] = i1;
   HEAP32[i34 + 4 >> 2] = i1 | 1;
   HEAP32[i34 + i1 >> 2] = i1;
   HEAP32[i2 + 4 >> 2] = i14 | 3;
  } else {
   HEAP32[8629] = 0;
   HEAP32[8632] = 0;
   HEAP32[i2 + 4 >> 2] = i3 | 3;
   i34 = i2 + i3 + 4 | 0;
   HEAP32[i34 >> 2] = HEAP32[i34 >> 2] | 1;
  }
  i34 = i2 + 8 | 0;
  STACKTOP = i35;
  return i34 | 0;
 }
 i7 = HEAP32[8630] | 0;
 if (i7 >>> 0 > i14 >>> 0) {
  i32 = i7 - i14 | 0;
  HEAP32[8630] = i32;
  i34 = HEAP32[8633] | 0;
  i33 = i34 + i14 | 0;
  HEAP32[8633] = i33;
  HEAP32[i33 + 4 >> 2] = i32 | 1;
  HEAP32[i34 + 4 >> 2] = i14 | 3;
  i34 = i34 + 8 | 0;
  STACKTOP = i35;
  return i34 | 0;
 }
 if (!(HEAP32[8745] | 0)) {
  HEAP32[8747] = 4096;
  HEAP32[8746] = 4096;
  HEAP32[8748] = -1;
  HEAP32[8749] = -1;
  HEAP32[8750] = 0;
  HEAP32[8738] = 0;
  i2 = i13 & -16 ^ 1431655768;
  HEAP32[i13 >> 2] = i2;
  HEAP32[8745] = i2;
  i2 = 4096;
 } else i2 = HEAP32[8747] | 0;
 i8 = i14 + 48 | 0;
 i9 = i14 + 47 | 0;
 i6 = i2 + i9 | 0;
 i5 = 0 - i2 | 0;
 i10 = i6 & i5;
 if (i10 >>> 0 <= i14 >>> 0) {
  i34 = 0;
  STACKTOP = i35;
  return i34 | 0;
 }
 i2 = HEAP32[8737] | 0;
 if (i2 | 0 ? (i22 = HEAP32[8735] | 0, i23 = i22 + i10 | 0, i23 >>> 0 <= i22 >>> 0 | i23 >>> 0 > i2 >>> 0) : 0) {
  i34 = 0;
  STACKTOP = i35;
  return i34 | 0;
 }
 L244 : do if (!(HEAP32[8738] & 4)) {
  i3 = HEAP32[8633] | 0;
  L246 : do if (i3) {
   i4 = 34956;
   while (1) {
    i2 = HEAP32[i4 >> 2] | 0;
    if (i2 >>> 0 <= i3 >>> 0 ? (i21 = i4 + 4 | 0, (i2 + (HEAP32[i21 >> 2] | 0) | 0) >>> 0 > i3 >>> 0) : 0) break;
    i2 = HEAP32[i4 + 8 >> 2] | 0;
    if (!i2) {
     i27 = 163;
     break L246;
    } else i4 = i2;
   }
   i1 = i6 - i7 & i5;
   if (i1 >>> 0 < 2147483647) {
    i2 = _sbrk(i1 | 0) | 0;
    if ((i2 | 0) == ((HEAP32[i4 >> 2] | 0) + (HEAP32[i21 >> 2] | 0) | 0)) {
     if ((i2 | 0) != (-1 | 0)) {
      i7 = i1;
      i6 = i2;
      i27 = 180;
      break L244;
     }
    } else {
     i4 = i2;
     i27 = 171;
    }
   } else i1 = 0;
  } else i27 = 163; while (0);
  do if ((i27 | 0) == 163) {
   i3 = _sbrk(0) | 0;
   if ((i3 | 0) != (-1 | 0) ? (i1 = i3, i19 = HEAP32[8746] | 0, i20 = i19 + -1 | 0, i1 = ((i20 & i1 | 0) == 0 ? 0 : (i20 + i1 & 0 - i19) - i1 | 0) + i10 | 0, i19 = HEAP32[8735] | 0, i20 = i1 + i19 | 0, i1 >>> 0 > i14 >>> 0 & i1 >>> 0 < 2147483647) : 0) {
    i23 = HEAP32[8737] | 0;
    if (i23 | 0 ? i20 >>> 0 <= i19 >>> 0 | i20 >>> 0 > i23 >>> 0 : 0) {
     i1 = 0;
     break;
    }
    i2 = _sbrk(i1 | 0) | 0;
    if ((i2 | 0) == (i3 | 0)) {
     i7 = i1;
     i6 = i3;
     i27 = 180;
     break L244;
    } else {
     i4 = i2;
     i27 = 171;
    }
   } else i1 = 0;
  } while (0);
  do if ((i27 | 0) == 171) {
   i3 = 0 - i1 | 0;
   if (!(i8 >>> 0 > i1 >>> 0 & (i1 >>> 0 < 2147483647 & (i4 | 0) != (-1 | 0)))) if ((i4 | 0) == (-1 | 0)) {
    i1 = 0;
    break;
   } else {
    i7 = i1;
    i6 = i4;
    i27 = 180;
    break L244;
   }
   i2 = HEAP32[8747] | 0;
   i2 = i9 - i1 + i2 & 0 - i2;
   if (i2 >>> 0 >= 2147483647) {
    i7 = i1;
    i6 = i4;
    i27 = 180;
    break L244;
   }
   if ((_sbrk(i2 | 0) | 0) == (-1 | 0)) {
    _sbrk(i3 | 0) | 0;
    i1 = 0;
    break;
   } else {
    i7 = i2 + i1 | 0;
    i6 = i4;
    i27 = 180;
    break L244;
   }
  } while (0);
  HEAP32[8738] = HEAP32[8738] | 4;
  i27 = 178;
 } else {
  i1 = 0;
  i27 = 178;
 } while (0);
 if (((i27 | 0) == 178 ? i10 >>> 0 < 2147483647 : 0) ? (i26 = _sbrk(i10 | 0) | 0, i23 = _sbrk(0) | 0, i24 = i23 - i26 | 0, i25 = i24 >>> 0 > (i14 + 40 | 0) >>> 0, !((i26 | 0) == (-1 | 0) | i25 ^ 1 | i26 >>> 0 < i23 >>> 0 & ((i26 | 0) != (-1 | 0) & (i23 | 0) != (-1 | 0)) ^ 1)) : 0) {
  i7 = i25 ? i24 : i1;
  i6 = i26;
  i27 = 180;
 }
 if ((i27 | 0) == 180) {
  i1 = (HEAP32[8735] | 0) + i7 | 0;
  HEAP32[8735] = i1;
  if (i1 >>> 0 > (HEAP32[8736] | 0) >>> 0) HEAP32[8736] = i1;
  i10 = HEAP32[8633] | 0;
  do if (i10) {
   i1 = 34956;
   while (1) {
    i2 = HEAP32[i1 >> 2] | 0;
    i3 = i1 + 4 | 0;
    i4 = HEAP32[i3 >> 2] | 0;
    if ((i6 | 0) == (i2 + i4 | 0)) {
     i27 = 190;
     break;
    }
    i5 = HEAP32[i1 + 8 >> 2] | 0;
    if (!i5) break; else i1 = i5;
   }
   if (((i27 | 0) == 190 ? (HEAP32[i1 + 12 >> 2] & 8 | 0) == 0 : 0) ? i10 >>> 0 < i6 >>> 0 & i10 >>> 0 >= i2 >>> 0 : 0) {
    HEAP32[i3 >> 2] = i4 + i7;
    i34 = i10 + 8 | 0;
    i34 = (i34 & 7 | 0) == 0 ? 0 : 0 - i34 & 7;
    i33 = i10 + i34 | 0;
    i34 = (HEAP32[8630] | 0) + (i7 - i34) | 0;
    HEAP32[8633] = i33;
    HEAP32[8630] = i34;
    HEAP32[i33 + 4 >> 2] = i34 | 1;
    HEAP32[i33 + i34 + 4 >> 2] = 40;
    HEAP32[8634] = HEAP32[8749];
    break;
   }
   i1 = HEAP32[8631] | 0;
   if (i6 >>> 0 < i1 >>> 0) {
    HEAP32[8631] = i6;
    i8 = i6;
   } else i8 = i1;
   i3 = i6 + i7 | 0;
   i1 = 34956;
   while (1) {
    if ((HEAP32[i1 >> 2] | 0) == (i3 | 0)) {
     i27 = 198;
     break;
    }
    i2 = HEAP32[i1 + 8 >> 2] | 0;
    if (!i2) break; else i1 = i2;
   }
   if ((i27 | 0) == 198 ? (HEAP32[i1 + 12 >> 2] & 8 | 0) == 0 : 0) {
    HEAP32[i1 >> 2] = i6;
    i12 = i1 + 4 | 0;
    HEAP32[i12 >> 2] = (HEAP32[i12 >> 2] | 0) + i7;
    i12 = i6 + 8 | 0;
    i12 = i6 + ((i12 & 7 | 0) == 0 ? 0 : 0 - i12 & 7) | 0;
    i1 = i3 + 8 | 0;
    i1 = i3 + ((i1 & 7 | 0) == 0 ? 0 : 0 - i1 & 7) | 0;
    i11 = i12 + i14 | 0;
    i9 = i1 - i12 - i14 | 0;
    HEAP32[i12 + 4 >> 2] = i14 | 3;
    do if ((i1 | 0) != (i10 | 0)) {
     if ((i1 | 0) == (HEAP32[8632] | 0)) {
      i34 = (HEAP32[8629] | 0) + i9 | 0;
      HEAP32[8629] = i34;
      HEAP32[8632] = i11;
      HEAP32[i11 + 4 >> 2] = i34 | 1;
      HEAP32[i11 + i34 >> 2] = i34;
      break;
     }
     i2 = HEAP32[i1 + 4 >> 2] | 0;
     if ((i2 & 3 | 0) == 1) {
      i7 = i2 & -8;
      i5 = i2 >>> 3;
      L314 : do if (i2 >>> 0 >= 256) {
       i6 = HEAP32[i1 + 24 >> 2] | 0;
       i4 = HEAP32[i1 + 12 >> 2] | 0;
       do if ((i4 | 0) == (i1 | 0)) {
        i4 = i1 + 16 | 0;
        i3 = i4 + 4 | 0;
        i2 = HEAP32[i3 >> 2] | 0;
        if (!i2) {
         i2 = HEAP32[i4 >> 2] | 0;
         if (!i2) {
          i32 = 0;
          break;
         } else i3 = i4;
        }
        while (1) {
         i4 = i2 + 20 | 0;
         i5 = HEAP32[i4 >> 2] | 0;
         if (i5 | 0) {
          i2 = i5;
          i3 = i4;
          continue;
         }
         i4 = i2 + 16 | 0;
         i5 = HEAP32[i4 >> 2] | 0;
         if (!i5) break; else {
          i2 = i5;
          i3 = i4;
         }
        }
        if (i3 >>> 0 < i8 >>> 0) _abort(); else {
         HEAP32[i3 >> 2] = 0;
         i32 = i2;
         break;
        }
       } else {
        i5 = HEAP32[i1 + 8 >> 2] | 0;
        if (i5 >>> 0 < i8 >>> 0) _abort();
        i2 = i5 + 12 | 0;
        if ((HEAP32[i2 >> 2] | 0) != (i1 | 0)) _abort();
        i3 = i4 + 8 | 0;
        if ((HEAP32[i3 >> 2] | 0) == (i1 | 0)) {
         HEAP32[i2 >> 2] = i4;
         HEAP32[i3 >> 2] = i5;
         i32 = i4;
         break;
        } else _abort();
       } while (0);
       if (!i6) break;
       i2 = HEAP32[i1 + 28 >> 2] | 0;
       i3 = 34812 + (i2 << 2) | 0;
       do if ((i1 | 0) != (HEAP32[i3 >> 2] | 0)) if (i6 >>> 0 >= (HEAP32[8631] | 0) >>> 0) {
        HEAP32[i6 + 16 + (((HEAP32[i6 + 16 >> 2] | 0) != (i1 | 0) & 1) << 2) >> 2] = i32;
        if (!i32) break L314; else break;
       } else _abort(); else {
        HEAP32[i3 >> 2] = i32;
        if (i32 | 0) break;
        HEAP32[8628] = HEAP32[8628] & ~(1 << i2);
        break L314;
       } while (0);
       i4 = HEAP32[8631] | 0;
       if (i32 >>> 0 < i4 >>> 0) _abort();
       HEAP32[i32 + 24 >> 2] = i6;
       i2 = i1 + 16 | 0;
       i3 = HEAP32[i2 >> 2] | 0;
       do if (i3 | 0) if (i3 >>> 0 < i4 >>> 0) _abort(); else {
        HEAP32[i32 + 16 >> 2] = i3;
        HEAP32[i3 + 24 >> 2] = i32;
        break;
       } while (0);
       i2 = HEAP32[i2 + 4 >> 2] | 0;
       if (!i2) break;
       if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
        HEAP32[i32 + 20 >> 2] = i2;
        HEAP32[i2 + 24 >> 2] = i32;
        break;
       }
      } else {
       i3 = HEAP32[i1 + 8 >> 2] | 0;
       i4 = HEAP32[i1 + 12 >> 2] | 0;
       i2 = 34548 + (i5 << 1 << 2) | 0;
       do if ((i3 | 0) != (i2 | 0)) {
        if (i3 >>> 0 < i8 >>> 0) _abort();
        if ((HEAP32[i3 + 12 >> 2] | 0) == (i1 | 0)) break;
        _abort();
       } while (0);
       if ((i4 | 0) == (i3 | 0)) {
        HEAP32[8627] = HEAP32[8627] & ~(1 << i5);
        break;
       }
       do if ((i4 | 0) == (i2 | 0)) i29 = i4 + 8 | 0; else {
        if (i4 >>> 0 < i8 >>> 0) _abort();
        i2 = i4 + 8 | 0;
        if ((HEAP32[i2 >> 2] | 0) == (i1 | 0)) {
         i29 = i2;
         break;
        }
        _abort();
       } while (0);
       HEAP32[i3 + 12 >> 2] = i4;
       HEAP32[i29 >> 2] = i3;
      } while (0);
      i1 = i1 + i7 | 0;
      i5 = i7 + i9 | 0;
     } else i5 = i9;
     i1 = i1 + 4 | 0;
     HEAP32[i1 >> 2] = HEAP32[i1 >> 2] & -2;
     HEAP32[i11 + 4 >> 2] = i5 | 1;
     HEAP32[i11 + i5 >> 2] = i5;
     i1 = i5 >>> 3;
     if (i5 >>> 0 < 256) {
      i3 = 34548 + (i1 << 1 << 2) | 0;
      i2 = HEAP32[8627] | 0;
      i1 = 1 << i1;
      do if (!(i2 & i1)) {
       HEAP32[8627] = i2 | i1;
       i33 = i3;
       i34 = i3 + 8 | 0;
      } else {
       i1 = i3 + 8 | 0;
       i2 = HEAP32[i1 >> 2] | 0;
       if (i2 >>> 0 >= (HEAP32[8631] | 0) >>> 0) {
        i33 = i2;
        i34 = i1;
        break;
       }
       _abort();
      } while (0);
      HEAP32[i34 >> 2] = i11;
      HEAP32[i33 + 12 >> 2] = i11;
      HEAP32[i11 + 8 >> 2] = i33;
      HEAP32[i11 + 12 >> 2] = i3;
      break;
     }
     i1 = i5 >>> 8;
     do if (!i1) i1 = 0; else {
      if (i5 >>> 0 > 16777215) {
       i1 = 31;
       break;
      }
      i33 = (i1 + 1048320 | 0) >>> 16 & 8;
      i34 = i1 << i33;
      i32 = (i34 + 520192 | 0) >>> 16 & 4;
      i34 = i34 << i32;
      i1 = (i34 + 245760 | 0) >>> 16 & 2;
      i1 = 14 - (i32 | i33 | i1) + (i34 << i1 >>> 15) | 0;
      i1 = i5 >>> (i1 + 7 | 0) & 1 | i1 << 1;
     } while (0);
     i4 = 34812 + (i1 << 2) | 0;
     HEAP32[i11 + 28 >> 2] = i1;
     i2 = i11 + 16 | 0;
     HEAP32[i2 + 4 >> 2] = 0;
     HEAP32[i2 >> 2] = 0;
     i2 = HEAP32[8628] | 0;
     i3 = 1 << i1;
     if (!(i2 & i3)) {
      HEAP32[8628] = i2 | i3;
      HEAP32[i4 >> 2] = i11;
      HEAP32[i11 + 24 >> 2] = i4;
      HEAP32[i11 + 12 >> 2] = i11;
      HEAP32[i11 + 8 >> 2] = i11;
      break;
     }
     i2 = i5 << ((i1 | 0) == 31 ? 0 : 25 - (i1 >>> 1) | 0);
     i4 = HEAP32[i4 >> 2] | 0;
     while (1) {
      if ((HEAP32[i4 + 4 >> 2] & -8 | 0) == (i5 | 0)) {
       i27 = 265;
       break;
      }
      i3 = i4 + 16 + (i2 >>> 31 << 2) | 0;
      i1 = HEAP32[i3 >> 2] | 0;
      if (!i1) {
       i27 = 262;
       break;
      } else {
       i2 = i2 << 1;
       i4 = i1;
      }
     }
     if ((i27 | 0) == 262) if (i3 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
      HEAP32[i3 >> 2] = i11;
      HEAP32[i11 + 24 >> 2] = i4;
      HEAP32[i11 + 12 >> 2] = i11;
      HEAP32[i11 + 8 >> 2] = i11;
      break;
     } else if ((i27 | 0) == 265) {
      i1 = i4 + 8 | 0;
      i2 = HEAP32[i1 >> 2] | 0;
      i34 = HEAP32[8631] | 0;
      if (i2 >>> 0 >= i34 >>> 0 & i4 >>> 0 >= i34 >>> 0) {
       HEAP32[i2 + 12 >> 2] = i11;
       HEAP32[i1 >> 2] = i11;
       HEAP32[i11 + 8 >> 2] = i2;
       HEAP32[i11 + 12 >> 2] = i4;
       HEAP32[i11 + 24 >> 2] = 0;
       break;
      } else _abort();
     }
    } else {
     i34 = (HEAP32[8630] | 0) + i9 | 0;
     HEAP32[8630] = i34;
     HEAP32[8633] = i11;
     HEAP32[i11 + 4 >> 2] = i34 | 1;
    } while (0);
    i34 = i12 + 8 | 0;
    STACKTOP = i35;
    return i34 | 0;
   }
   i1 = 34956;
   while (1) {
    i2 = HEAP32[i1 >> 2] | 0;
    if (i2 >>> 0 <= i10 >>> 0 ? (i28 = i2 + (HEAP32[i1 + 4 >> 2] | 0) | 0, i28 >>> 0 > i10 >>> 0) : 0) break;
    i1 = HEAP32[i1 + 8 >> 2] | 0;
   }
   i5 = i28 + -47 | 0;
   i2 = i5 + 8 | 0;
   i2 = i5 + ((i2 & 7 | 0) == 0 ? 0 : 0 - i2 & 7) | 0;
   i5 = i10 + 16 | 0;
   i2 = i2 >>> 0 < i5 >>> 0 ? i10 : i2;
   i1 = i2 + 8 | 0;
   i3 = i6 + 8 | 0;
   i3 = (i3 & 7 | 0) == 0 ? 0 : 0 - i3 & 7;
   i34 = i6 + i3 | 0;
   i3 = i7 + -40 - i3 | 0;
   HEAP32[8633] = i34;
   HEAP32[8630] = i3;
   HEAP32[i34 + 4 >> 2] = i3 | 1;
   HEAP32[i34 + i3 + 4 >> 2] = 40;
   HEAP32[8634] = HEAP32[8749];
   i3 = i2 + 4 | 0;
   HEAP32[i3 >> 2] = 27;
   HEAP32[i1 >> 2] = HEAP32[8739];
   HEAP32[i1 + 4 >> 2] = HEAP32[8740];
   HEAP32[i1 + 8 >> 2] = HEAP32[8741];
   HEAP32[i1 + 12 >> 2] = HEAP32[8742];
   HEAP32[8739] = i6;
   HEAP32[8740] = i7;
   HEAP32[8742] = 0;
   HEAP32[8741] = i1;
   i1 = i2 + 24 | 0;
   do {
    i34 = i1;
    i1 = i1 + 4 | 0;
    HEAP32[i1 >> 2] = 7;
   } while ((i34 + 8 | 0) >>> 0 < i28 >>> 0);
   if ((i2 | 0) != (i10 | 0)) {
    i6 = i2 - i10 | 0;
    HEAP32[i3 >> 2] = HEAP32[i3 >> 2] & -2;
    HEAP32[i10 + 4 >> 2] = i6 | 1;
    HEAP32[i2 >> 2] = i6;
    i1 = i6 >>> 3;
    if (i6 >>> 0 < 256) {
     i3 = 34548 + (i1 << 1 << 2) | 0;
     i2 = HEAP32[8627] | 0;
     i1 = 1 << i1;
     if (i2 & i1) {
      i1 = i3 + 8 | 0;
      i2 = HEAP32[i1 >> 2] | 0;
      if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
       i30 = i2;
       i31 = i1;
      }
     } else {
      HEAP32[8627] = i2 | i1;
      i30 = i3;
      i31 = i3 + 8 | 0;
     }
     HEAP32[i31 >> 2] = i10;
     HEAP32[i30 + 12 >> 2] = i10;
     HEAP32[i10 + 8 >> 2] = i30;
     HEAP32[i10 + 12 >> 2] = i3;
     break;
    }
    i1 = i6 >>> 8;
    if (i1) if (i6 >>> 0 > 16777215) i3 = 31; else {
     i33 = (i1 + 1048320 | 0) >>> 16 & 8;
     i34 = i1 << i33;
     i32 = (i34 + 520192 | 0) >>> 16 & 4;
     i34 = i34 << i32;
     i3 = (i34 + 245760 | 0) >>> 16 & 2;
     i3 = 14 - (i32 | i33 | i3) + (i34 << i3 >>> 15) | 0;
     i3 = i6 >>> (i3 + 7 | 0) & 1 | i3 << 1;
    } else i3 = 0;
    i4 = 34812 + (i3 << 2) | 0;
    HEAP32[i10 + 28 >> 2] = i3;
    HEAP32[i10 + 20 >> 2] = 0;
    HEAP32[i5 >> 2] = 0;
    i1 = HEAP32[8628] | 0;
    i2 = 1 << i3;
    if (!(i1 & i2)) {
     HEAP32[8628] = i1 | i2;
     HEAP32[i4 >> 2] = i10;
     HEAP32[i10 + 24 >> 2] = i4;
     HEAP32[i10 + 12 >> 2] = i10;
     HEAP32[i10 + 8 >> 2] = i10;
     break;
    }
    i2 = i6 << ((i3 | 0) == 31 ? 0 : 25 - (i3 >>> 1) | 0);
    i4 = HEAP32[i4 >> 2] | 0;
    while (1) {
     if ((HEAP32[i4 + 4 >> 2] & -8 | 0) == (i6 | 0)) {
      i27 = 292;
      break;
     }
     i3 = i4 + 16 + (i2 >>> 31 << 2) | 0;
     i1 = HEAP32[i3 >> 2] | 0;
     if (!i1) {
      i27 = 289;
      break;
     } else {
      i2 = i2 << 1;
      i4 = i1;
     }
    }
    if ((i27 | 0) == 289) if (i3 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
     HEAP32[i3 >> 2] = i10;
     HEAP32[i10 + 24 >> 2] = i4;
     HEAP32[i10 + 12 >> 2] = i10;
     HEAP32[i10 + 8 >> 2] = i10;
     break;
    } else if ((i27 | 0) == 292) {
     i1 = i4 + 8 | 0;
     i2 = HEAP32[i1 >> 2] | 0;
     i34 = HEAP32[8631] | 0;
     if (i2 >>> 0 >= i34 >>> 0 & i4 >>> 0 >= i34 >>> 0) {
      HEAP32[i2 + 12 >> 2] = i10;
      HEAP32[i1 >> 2] = i10;
      HEAP32[i10 + 8 >> 2] = i2;
      HEAP32[i10 + 12 >> 2] = i4;
      HEAP32[i10 + 24 >> 2] = 0;
      break;
     } else _abort();
    }
   }
  } else {
   i34 = HEAP32[8631] | 0;
   if ((i34 | 0) == 0 | i6 >>> 0 < i34 >>> 0) HEAP32[8631] = i6;
   HEAP32[8739] = i6;
   HEAP32[8740] = i7;
   HEAP32[8742] = 0;
   HEAP32[8636] = HEAP32[8745];
   HEAP32[8635] = -1;
   i1 = 0;
   do {
    i34 = 34548 + (i1 << 1 << 2) | 0;
    HEAP32[i34 + 12 >> 2] = i34;
    HEAP32[i34 + 8 >> 2] = i34;
    i1 = i1 + 1 | 0;
   } while ((i1 | 0) != 32);
   i34 = i6 + 8 | 0;
   i34 = (i34 & 7 | 0) == 0 ? 0 : 0 - i34 & 7;
   i33 = i6 + i34 | 0;
   i34 = i7 + -40 - i34 | 0;
   HEAP32[8633] = i33;
   HEAP32[8630] = i34;
   HEAP32[i33 + 4 >> 2] = i34 | 1;
   HEAP32[i33 + i34 + 4 >> 2] = 40;
   HEAP32[8634] = HEAP32[8749];
  } while (0);
  i1 = HEAP32[8630] | 0;
  if (i1 >>> 0 > i14 >>> 0) {
   i32 = i1 - i14 | 0;
   HEAP32[8630] = i32;
   i34 = HEAP32[8633] | 0;
   i33 = i34 + i14 | 0;
   HEAP32[8633] = i33;
   HEAP32[i33 + 4 >> 2] = i32 | 1;
   HEAP32[i34 + 4 >> 2] = i14 | 3;
   i34 = i34 + 8 | 0;
   STACKTOP = i35;
   return i34 | 0;
  }
 }
 HEAP32[(___errno_location() | 0) >> 2] = 12;
 i34 = 0;
 STACKTOP = i35;
 return i34 | 0;
}

function _fmt_fp(i26, d4, i28, i11, i27, i19) {
 i26 = i26 | 0;
 d4 = +d4;
 i28 = i28 | 0;
 i11 = i11 | 0;
 i27 = i27 | 0;
 i19 = i19 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, d9 = 0.0, i10 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0, i18 = 0, i20 = 0, i21 = 0, i22 = 0, i23 = 0, i24 = 0, i25 = 0, i29 = 0;
 i29 = STACKTOP;
 STACKTOP = STACKTOP + 560 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(560);
 i3 = i29 + 8 | 0;
 i13 = i29;
 i25 = i29 + 524 | 0;
 i24 = i25;
 i5 = i29 + 512 | 0;
 HEAP32[i13 >> 2] = 0;
 i23 = i5 + 12 | 0;
 ___DOUBLE_BITS_675(d4) | 0;
 if ((tempRet0 | 0) < 0) {
  d4 = -d4;
  i21 = 1;
  i20 = 19992;
 } else {
  i21 = (i27 & 2049 | 0) != 0 & 1;
  i20 = (i27 & 2048 | 0) == 0 ? ((i27 & 1 | 0) == 0 ? 19993 : 19998) : 19995;
 }
 ___DOUBLE_BITS_675(d4) | 0;
 i22 = tempRet0 & 2146435072;
 do if (i22 >>> 0 < 2146435072 | (i22 | 0) == 2146435072 & 0 < 0) {
  d9 = +_frexpl(d4, i13) * 2.0;
  i1 = d9 != 0.0;
  if (i1) HEAP32[i13 >> 2] = (HEAP32[i13 >> 2] | 0) + -1;
  i15 = i19 | 32;
  if ((i15 | 0) == 97) {
   i10 = i19 & 32;
   i8 = (i10 | 0) == 0 ? i20 : i20 + 9 | 0;
   i7 = i21 | 2;
   i1 = 12 - i11 | 0;
   do if (!(i11 >>> 0 > 11 | (i1 | 0) == 0)) {
    d4 = 8.0;
    do {
     i1 = i1 + -1 | 0;
     d4 = d4 * 16.0;
    } while ((i1 | 0) != 0);
    if ((HEAP8[i8 >> 0] | 0) == 45) {
     d4 = -(d4 + (-d9 - d4));
     break;
    } else {
     d4 = d9 + d4 - d4;
     break;
    }
   } else d4 = d9; while (0);
   i2 = HEAP32[i13 >> 2] | 0;
   i1 = (i2 | 0) < 0 ? 0 - i2 | 0 : i2;
   i1 = _fmt_u(i1, ((i1 | 0) < 0) << 31 >> 31, i23) | 0;
   if ((i1 | 0) == (i23 | 0)) {
    i1 = i5 + 11 | 0;
    HEAP8[i1 >> 0] = 48;
   }
   HEAP8[i1 + -1 >> 0] = (i2 >> 31 & 2) + 43;
   i6 = i1 + -2 | 0;
   HEAP8[i6 >> 0] = i19 + 15;
   i5 = (i11 | 0) < 1;
   i3 = (i27 & 8 | 0) == 0;
   i1 = i25;
   do {
    i22 = ~~d4;
    i2 = i1 + 1 | 0;
    HEAP8[i1 >> 0] = HEAPU8[20027 + i22 >> 0] | i10;
    d4 = (d4 - +(i22 | 0)) * 16.0;
    if ((i2 - i24 | 0) == 1 ? !(i3 & (i5 & d4 == 0.0)) : 0) {
     HEAP8[i2 >> 0] = 46;
     i1 = i1 + 2 | 0;
    } else i1 = i2;
   } while (d4 != 0.0);
   i22 = i1 - i24 | 0;
   i24 = i23 - i6 | 0;
   i23 = (i11 | 0) != 0 & (i22 + -2 | 0) < (i11 | 0) ? i11 + 2 | 0 : i22;
   i1 = i24 + i7 + i23 | 0;
   _pad_674(i26, 32, i28, i1, i27);
   _out(i26, i8, i7);
   _pad_674(i26, 48, i28, i1, i27 ^ 65536);
   _out(i26, i25, i22);
   _pad_674(i26, 48, i23 - i22 | 0, 0, 0);
   _out(i26, i6, i24);
   _pad_674(i26, 32, i28, i1, i27 ^ 8192);
   break;
  }
  i2 = (i11 | 0) < 0 ? 6 : i11;
  if (i1) {
   i1 = (HEAP32[i13 >> 2] | 0) + -28 | 0;
   HEAP32[i13 >> 2] = i1;
   d4 = d9 * 268435456.0;
  } else {
   d4 = d9;
   i1 = HEAP32[i13 >> 2] | 0;
  }
  i22 = (i1 | 0) < 0 ? i3 : i3 + 288 | 0;
  i3 = i22;
  do {
   i17 = ~~d4 >>> 0;
   HEAP32[i3 >> 2] = i17;
   i3 = i3 + 4 | 0;
   d4 = (d4 - +(i17 >>> 0)) * 1.0e9;
  } while (d4 != 0.0);
  if ((i1 | 0) > 0) {
   i5 = i22;
   i7 = i3;
   while (1) {
    i6 = (i1 | 0) < 29 ? i1 : 29;
    i1 = i7 + -4 | 0;
    if (i1 >>> 0 >= i5 >>> 0) {
     i3 = 0;
     do {
      i16 = _bitshift64Shl(HEAP32[i1 >> 2] | 0, 0, i6 | 0) | 0;
      i16 = _i64Add(i16 | 0, tempRet0 | 0, i3 | 0, 0) | 0;
      i17 = tempRet0;
      i14 = ___uremdi3(i16 | 0, i17 | 0, 1e9, 0) | 0;
      HEAP32[i1 >> 2] = i14;
      i3 = ___udivdi3(i16 | 0, i17 | 0, 1e9, 0) | 0;
      i1 = i1 + -4 | 0;
     } while (i1 >>> 0 >= i5 >>> 0);
     if (i3) {
      i5 = i5 + -4 | 0;
      HEAP32[i5 >> 2] = i3;
     }
    }
    i3 = i7;
    while (1) {
     if (i3 >>> 0 <= i5 >>> 0) break;
     i1 = i3 + -4 | 0;
     if (!(HEAP32[i1 >> 2] | 0)) i3 = i1; else break;
    }
    i1 = (HEAP32[i13 >> 2] | 0) - i6 | 0;
    HEAP32[i13 >> 2] = i1;
    if ((i1 | 0) > 0) i7 = i3; else break;
   }
  } else i5 = i22;
  if ((i1 | 0) < 0) {
   i11 = ((i2 + 25 | 0) / 9 | 0) + 1 | 0;
   i12 = (i15 | 0) == 102;
   do {
    i10 = 0 - i1 | 0;
    i10 = (i10 | 0) < 9 ? i10 : 9;
    if (i5 >>> 0 < i3 >>> 0) {
     i6 = (1 << i10) + -1 | 0;
     i7 = 1e9 >>> i10;
     i8 = 0;
     i1 = i5;
     do {
      i17 = HEAP32[i1 >> 2] | 0;
      HEAP32[i1 >> 2] = (i17 >>> i10) + i8;
      i8 = Math_imul(i17 & i6, i7) | 0;
      i1 = i1 + 4 | 0;
     } while (i1 >>> 0 < i3 >>> 0);
     i1 = (HEAP32[i5 >> 2] | 0) == 0 ? i5 + 4 | 0 : i5;
     if (!i8) {
      i5 = i1;
      i1 = i3;
     } else {
      HEAP32[i3 >> 2] = i8;
      i5 = i1;
      i1 = i3 + 4 | 0;
     }
    } else {
     i5 = (HEAP32[i5 >> 2] | 0) == 0 ? i5 + 4 | 0 : i5;
     i1 = i3;
    }
    i3 = i12 ? i22 : i5;
    i3 = (i1 - i3 >> 2 | 0) > (i11 | 0) ? i3 + (i11 << 2) | 0 : i1;
    i1 = (HEAP32[i13 >> 2] | 0) + i10 | 0;
    HEAP32[i13 >> 2] = i1;
   } while ((i1 | 0) < 0);
   i1 = i5;
   i11 = i3;
  } else {
   i1 = i5;
   i11 = i3;
  }
  i17 = i22;
  if (i1 >>> 0 < i11 >>> 0) {
   i3 = (i17 - i1 >> 2) * 9 | 0;
   i6 = HEAP32[i1 >> 2] | 0;
   if (i6 >>> 0 >= 10) {
    i5 = 10;
    do {
     i5 = i5 * 10 | 0;
     i3 = i3 + 1 | 0;
    } while (i6 >>> 0 >= i5 >>> 0);
   }
  } else i3 = 0;
  i12 = (i15 | 0) == 103;
  i14 = (i2 | 0) != 0;
  i5 = i2 - ((i15 | 0) != 102 ? i3 : 0) + ((i14 & i12) << 31 >> 31) | 0;
  if ((i5 | 0) < (((i11 - i17 >> 2) * 9 | 0) + -9 | 0)) {
   i5 = i5 + 9216 | 0;
   i10 = i22 + 4 + (((i5 | 0) / 9 | 0) + -1024 << 2) | 0;
   i5 = ((i5 | 0) % 9 | 0) + 1 | 0;
   if ((i5 | 0) < 9) {
    i6 = 10;
    do {
     i6 = i6 * 10 | 0;
     i5 = i5 + 1 | 0;
    } while ((i5 | 0) != 9);
   } else i6 = 10;
   i7 = HEAP32[i10 >> 2] | 0;
   i8 = (i7 >>> 0) % (i6 >>> 0) | 0;
   i5 = (i10 + 4 | 0) == (i11 | 0);
   if (!(i5 & (i8 | 0) == 0)) {
    d9 = (((i7 >>> 0) / (i6 >>> 0) | 0) & 1 | 0) == 0 ? 9007199254740992.0 : 9007199254740994.0;
    i16 = (i6 | 0) / 2 | 0;
    d4 = i8 >>> 0 < i16 >>> 0 ? .5 : i5 & (i8 | 0) == (i16 | 0) ? 1.0 : 1.5;
    if (i21) {
     i16 = (HEAP8[i20 >> 0] | 0) == 45;
     d4 = i16 ? -d4 : d4;
     d9 = i16 ? -d9 : d9;
    }
    i5 = i7 - i8 | 0;
    HEAP32[i10 >> 2] = i5;
    if (d9 + d4 != d9) {
     i16 = i5 + i6 | 0;
     HEAP32[i10 >> 2] = i16;
     if (i16 >>> 0 > 999999999) {
      i3 = i10;
      while (1) {
       i5 = i3 + -4 | 0;
       HEAP32[i3 >> 2] = 0;
       if (i5 >>> 0 < i1 >>> 0) {
        i1 = i1 + -4 | 0;
        HEAP32[i1 >> 2] = 0;
       }
       i16 = (HEAP32[i5 >> 2] | 0) + 1 | 0;
       HEAP32[i5 >> 2] = i16;
       if (i16 >>> 0 > 999999999) i3 = i5; else break;
      }
     } else i5 = i10;
     i3 = (i17 - i1 >> 2) * 9 | 0;
     i7 = HEAP32[i1 >> 2] | 0;
     if (i7 >>> 0 >= 10) {
      i6 = 10;
      do {
       i6 = i6 * 10 | 0;
       i3 = i3 + 1 | 0;
      } while (i7 >>> 0 >= i6 >>> 0);
     }
    } else i5 = i10;
   } else i5 = i10;
   i5 = i5 + 4 | 0;
   i5 = i11 >>> 0 > i5 >>> 0 ? i5 : i11;
   i16 = i1;
  } else {
   i5 = i11;
   i16 = i1;
  }
  i15 = i5;
  while (1) {
   if (i15 >>> 0 <= i16 >>> 0) {
    i13 = 0;
    break;
   }
   i1 = i15 + -4 | 0;
   if (!(HEAP32[i1 >> 2] | 0)) i15 = i1; else {
    i13 = 1;
    break;
   }
  }
  i11 = 0 - i3 | 0;
  do if (i12) {
   i1 = ((i14 ^ 1) & 1) + i2 | 0;
   if ((i1 | 0) > (i3 | 0) & (i3 | 0) > -5) {
    i6 = i19 + -1 | 0;
    i2 = i1 + -1 - i3 | 0;
   } else {
    i6 = i19 + -2 | 0;
    i2 = i1 + -1 | 0;
   }
   i1 = i27 & 8;
   if (!i1) {
    if (i13 ? (i18 = HEAP32[i15 + -4 >> 2] | 0, (i18 | 0) != 0) : 0) if (!((i18 >>> 0) % 10 | 0)) {
     i5 = 0;
     i1 = 10;
     do {
      i1 = i1 * 10 | 0;
      i5 = i5 + 1 | 0;
     } while (!((i18 >>> 0) % (i1 >>> 0) | 0 | 0));
    } else i5 = 0; else i5 = 9;
    i1 = ((i15 - i17 >> 2) * 9 | 0) + -9 | 0;
    if ((i6 | 32 | 0) == 102) {
     i10 = i1 - i5 | 0;
     i10 = (i10 | 0) > 0 ? i10 : 0;
     i2 = (i2 | 0) < (i10 | 0) ? i2 : i10;
     i10 = 0;
     break;
    } else {
     i10 = i1 + i3 - i5 | 0;
     i10 = (i10 | 0) > 0 ? i10 : 0;
     i2 = (i2 | 0) < (i10 | 0) ? i2 : i10;
     i10 = 0;
     break;
    }
   } else i10 = i1;
  } else {
   i6 = i19;
   i10 = i27 & 8;
  } while (0);
  i12 = i2 | i10;
  i7 = (i12 | 0) != 0 & 1;
  i8 = (i6 | 32 | 0) == 102;
  if (i8) {
   i14 = 0;
   i1 = (i3 | 0) > 0 ? i3 : 0;
  } else {
   i1 = (i3 | 0) < 0 ? i11 : i3;
   i1 = _fmt_u(i1, ((i1 | 0) < 0) << 31 >> 31, i23) | 0;
   i5 = i23;
   if ((i5 - i1 | 0) < 2) do {
    i1 = i1 + -1 | 0;
    HEAP8[i1 >> 0] = 48;
   } while ((i5 - i1 | 0) < 2);
   HEAP8[i1 + -1 >> 0] = (i3 >> 31 & 2) + 43;
   i1 = i1 + -2 | 0;
   HEAP8[i1 >> 0] = i6;
   i14 = i1;
   i1 = i5 - i1 | 0;
  }
  i1 = i21 + 1 + i2 + i7 + i1 | 0;
  _pad_674(i26, 32, i28, i1, i27);
  _out(i26, i20, i21);
  _pad_674(i26, 48, i28, i1, i27 ^ 65536);
  if (i8) {
   i6 = i16 >>> 0 > i22 >>> 0 ? i22 : i16;
   i10 = i25 + 9 | 0;
   i7 = i10;
   i8 = i25 + 8 | 0;
   i5 = i6;
   do {
    i3 = _fmt_u(HEAP32[i5 >> 2] | 0, 0, i10) | 0;
    if ((i5 | 0) == (i6 | 0)) {
     if ((i3 | 0) == (i10 | 0)) {
      HEAP8[i8 >> 0] = 48;
      i3 = i8;
     }
    } else if (i3 >>> 0 > i25 >>> 0) {
     _memset(i25 | 0, 48, i3 - i24 | 0) | 0;
     do i3 = i3 + -1 | 0; while (i3 >>> 0 > i25 >>> 0);
    }
    _out(i26, i3, i7 - i3 | 0);
    i5 = i5 + 4 | 0;
   } while (i5 >>> 0 <= i22 >>> 0);
   if (i12 | 0) _out(i26, 28154, 1);
   if (i5 >>> 0 < i15 >>> 0 & (i2 | 0) > 0) while (1) {
    i3 = _fmt_u(HEAP32[i5 >> 2] | 0, 0, i10) | 0;
    if (i3 >>> 0 > i25 >>> 0) {
     _memset(i25 | 0, 48, i3 - i24 | 0) | 0;
     do i3 = i3 + -1 | 0; while (i3 >>> 0 > i25 >>> 0);
    }
    _out(i26, i3, (i2 | 0) < 9 ? i2 : 9);
    i5 = i5 + 4 | 0;
    i3 = i2 + -9 | 0;
    if (!(i5 >>> 0 < i15 >>> 0 & (i2 | 0) > 9)) {
     i2 = i3;
     break;
    } else i2 = i3;
   }
   _pad_674(i26, 48, i2 + 9 | 0, 9, 0);
  } else {
   i12 = i13 ? i15 : i16 + 4 | 0;
   if ((i2 | 0) > -1) {
    i13 = i25 + 9 | 0;
    i10 = (i10 | 0) == 0;
    i11 = i13;
    i7 = 0 - i24 | 0;
    i8 = i25 + 8 | 0;
    i6 = i16;
    do {
     i3 = _fmt_u(HEAP32[i6 >> 2] | 0, 0, i13) | 0;
     if ((i3 | 0) == (i13 | 0)) {
      HEAP8[i8 >> 0] = 48;
      i3 = i8;
     }
     do if ((i6 | 0) == (i16 | 0)) {
      i5 = i3 + 1 | 0;
      _out(i26, i3, 1);
      if (i10 & (i2 | 0) < 1) {
       i3 = i5;
       break;
      }
      _out(i26, 28154, 1);
      i3 = i5;
     } else {
      if (i3 >>> 0 <= i25 >>> 0) break;
      _memset(i25 | 0, 48, i3 + i7 | 0) | 0;
      do i3 = i3 + -1 | 0; while (i3 >>> 0 > i25 >>> 0);
     } while (0);
     i24 = i11 - i3 | 0;
     _out(i26, i3, (i2 | 0) > (i24 | 0) ? i24 : i2);
     i2 = i2 - i24 | 0;
     i6 = i6 + 4 | 0;
    } while (i6 >>> 0 < i12 >>> 0 & (i2 | 0) > -1);
   }
   _pad_674(i26, 48, i2 + 18 | 0, 18, 0);
   _out(i26, i14, i23 - i14 | 0);
  }
  _pad_674(i26, 32, i28, i1, i27 ^ 8192);
 } else {
  i25 = (i19 & 32 | 0) != 0;
  i1 = i21 + 3 | 0;
  _pad_674(i26, 32, i28, i1, i27 & -65537);
  _out(i26, i20, i21);
  _out(i26, d4 != d4 | 0.0 != 0.0 ? (i25 ? 20019 : 20023) : i25 ? 20011 : 20015, 3);
  _pad_674(i26, 32, i28, i1, i27 ^ 8192);
 } while (0);
 STACKTOP = i29;
 return ((i1 | 0) < (i28 | 0) ? i28 : i1) | 0;
}

function _printf_core(i15, i2, i25, i26, i27) {
 i15 = i15 | 0;
 i2 = i2 | 0;
 i25 = i25 | 0;
 i26 = i26 | 0;
 i27 = i27 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i16 = 0, i17 = 0, i18 = 0, i19 = 0, i20 = 0, i21 = 0, i22 = 0, i23 = 0, i24 = 0, i28 = 0;
 i28 = STACKTOP;
 STACKTOP = STACKTOP + 64 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(64);
 i21 = i28 + 16 | 0;
 i22 = i28;
 i19 = i28 + 24 | 0;
 i23 = i28 + 8 | 0;
 i24 = i28 + 20 | 0;
 HEAP32[i21 >> 2] = i2;
 i16 = (i15 | 0) != 0;
 i17 = i19 + 40 | 0;
 i18 = i17;
 i19 = i19 + 39 | 0;
 i20 = i23 + 4 | 0;
 i3 = 0;
 i1 = 0;
 i7 = 0;
 L1 : while (1) {
  do if ((i1 | 0) > -1) if ((i3 | 0) > (2147483647 - i1 | 0)) {
   HEAP32[(___errno_location() | 0) >> 2] = 75;
   i1 = -1;
   break;
  } else {
   i1 = i3 + i1 | 0;
   break;
  } while (0);
  i3 = HEAP8[i2 >> 0] | 0;
  if (!(i3 << 24 >> 24)) {
   i14 = 87;
   break;
  } else i4 = i2;
  L9 : while (1) {
   switch (i3 << 24 >> 24) {
   case 37:
    {
     i3 = i4;
     i14 = 9;
     break L9;
    }
   case 0:
    {
     i3 = i4;
     break L9;
    }
   default:
    {}
   }
   i13 = i4 + 1 | 0;
   HEAP32[i21 >> 2] = i13;
   i3 = HEAP8[i13 >> 0] | 0;
   i4 = i13;
  }
  L12 : do if ((i14 | 0) == 9) while (1) {
   i14 = 0;
   if ((HEAP8[i4 + 1 >> 0] | 0) != 37) break L12;
   i3 = i3 + 1 | 0;
   i4 = i4 + 2 | 0;
   HEAP32[i21 >> 2] = i4;
   if ((HEAP8[i4 >> 0] | 0) == 37) i14 = 9; else break;
  } while (0);
  i3 = i3 - i2 | 0;
  if (i16) _out(i15, i2, i3);
  if (i3 | 0) {
   i2 = i4;
   continue;
  }
  i5 = i4 + 1 | 0;
  i3 = (HEAP8[i5 >> 0] | 0) + -48 | 0;
  if (i3 >>> 0 < 10) {
   i13 = (HEAP8[i4 + 2 >> 0] | 0) == 36;
   i12 = i13 ? i3 : -1;
   i7 = i13 ? 1 : i7;
   i5 = i13 ? i4 + 3 | 0 : i5;
  } else i12 = -1;
  HEAP32[i21 >> 2] = i5;
  i3 = HEAP8[i5 >> 0] | 0;
  i4 = (i3 << 24 >> 24) + -32 | 0;
  L24 : do if (i4 >>> 0 < 32) {
   i6 = 0;
   i8 = i3;
   while (1) {
    i3 = 1 << i4;
    if (!(i3 & 75913)) {
     i3 = i8;
     break L24;
    }
    i6 = i3 | i6;
    i5 = i5 + 1 | 0;
    HEAP32[i21 >> 2] = i5;
    i3 = HEAP8[i5 >> 0] | 0;
    i4 = (i3 << 24 >> 24) + -32 | 0;
    if (i4 >>> 0 >= 32) break; else i8 = i3;
   }
  } else i6 = 0; while (0);
  if (i3 << 24 >> 24 == 42) {
   i4 = i5 + 1 | 0;
   i3 = (HEAP8[i4 >> 0] | 0) + -48 | 0;
   if (i3 >>> 0 < 10 ? (HEAP8[i5 + 2 >> 0] | 0) == 36 : 0) {
    HEAP32[i27 + (i3 << 2) >> 2] = 10;
    i3 = HEAP32[i26 + ((HEAP8[i4 >> 0] | 0) + -48 << 3) >> 2] | 0;
    i7 = 1;
    i5 = i5 + 3 | 0;
   } else {
    if (i7 | 0) {
     i1 = -1;
     break;
    }
    if (i16) {
     i7 = (HEAP32[i25 >> 2] | 0) + (4 - 1) & ~(4 - 1);
     i3 = HEAP32[i7 >> 2] | 0;
     HEAP32[i25 >> 2] = i7 + 4;
     i7 = 0;
     i5 = i4;
    } else {
     i3 = 0;
     i7 = 0;
     i5 = i4;
    }
   }
   HEAP32[i21 >> 2] = i5;
   i13 = (i3 | 0) < 0;
   i3 = i13 ? 0 - i3 | 0 : i3;
   i6 = i13 ? i6 | 8192 : i6;
  } else {
   i3 = _getint(i21) | 0;
   if ((i3 | 0) < 0) {
    i1 = -1;
    break;
   }
   i5 = HEAP32[i21 >> 2] | 0;
  }
  do if ((HEAP8[i5 >> 0] | 0) == 46) {
   if ((HEAP8[i5 + 1 >> 0] | 0) != 42) {
    HEAP32[i21 >> 2] = i5 + 1;
    i4 = _getint(i21) | 0;
    i5 = HEAP32[i21 >> 2] | 0;
    break;
   }
   i8 = i5 + 2 | 0;
   i4 = (HEAP8[i8 >> 0] | 0) + -48 | 0;
   if (i4 >>> 0 < 10 ? (HEAP8[i5 + 3 >> 0] | 0) == 36 : 0) {
    HEAP32[i27 + (i4 << 2) >> 2] = 10;
    i4 = HEAP32[i26 + ((HEAP8[i8 >> 0] | 0) + -48 << 3) >> 2] | 0;
    i5 = i5 + 4 | 0;
    HEAP32[i21 >> 2] = i5;
    break;
   }
   if (i7 | 0) {
    i1 = -1;
    break L1;
   }
   if (i16) {
    i13 = (HEAP32[i25 >> 2] | 0) + (4 - 1) & ~(4 - 1);
    i4 = HEAP32[i13 >> 2] | 0;
    HEAP32[i25 >> 2] = i13 + 4;
   } else i4 = 0;
   HEAP32[i21 >> 2] = i8;
   i5 = i8;
  } else i4 = -1; while (0);
  i11 = 0;
  while (1) {
   if (((HEAP8[i5 >> 0] | 0) + -65 | 0) >>> 0 > 57) {
    i1 = -1;
    break L1;
   }
   i13 = i5 + 1 | 0;
   HEAP32[i21 >> 2] = i13;
   i8 = HEAP8[(HEAP8[i5 >> 0] | 0) + -65 + (19511 + (i11 * 58 | 0)) >> 0] | 0;
   i9 = i8 & 255;
   if ((i9 + -1 | 0) >>> 0 < 8) {
    i11 = i9;
    i5 = i13;
   } else break;
  }
  if (!(i8 << 24 >> 24)) {
   i1 = -1;
   break;
  }
  i10 = (i12 | 0) > -1;
  do if (i8 << 24 >> 24 == 19) if (i10) {
   i1 = -1;
   break L1;
  } else i14 = 49; else {
   if (i10) {
    HEAP32[i27 + (i12 << 2) >> 2] = i9;
    i10 = i26 + (i12 << 3) | 0;
    i12 = HEAP32[i10 + 4 >> 2] | 0;
    i14 = i22;
    HEAP32[i14 >> 2] = HEAP32[i10 >> 2];
    HEAP32[i14 + 4 >> 2] = i12;
    i14 = 49;
    break;
   }
   if (!i16) {
    i1 = 0;
    break L1;
   }
   _pop_arg(i22, i9, i25);
  } while (0);
  if ((i14 | 0) == 49 ? (i14 = 0, !i16) : 0) {
   i3 = 0;
   i2 = i13;
   continue;
  }
  i5 = HEAP8[i5 >> 0] | 0;
  i5 = (i11 | 0) != 0 & (i5 & 15 | 0) == 3 ? i5 & -33 : i5;
  i10 = i6 & -65537;
  i12 = (i6 & 8192 | 0) == 0 ? i6 : i10;
  L71 : do switch (i5 | 0) {
  case 110:
   switch ((i11 & 255) << 24 >> 24) {
   case 0:
    {
     HEAP32[HEAP32[i22 >> 2] >> 2] = i1;
     i3 = 0;
     i2 = i13;
     continue L1;
    }
   case 1:
    {
     HEAP32[HEAP32[i22 >> 2] >> 2] = i1;
     i3 = 0;
     i2 = i13;
     continue L1;
    }
   case 2:
    {
     i3 = HEAP32[i22 >> 2] | 0;
     HEAP32[i3 >> 2] = i1;
     HEAP32[i3 + 4 >> 2] = ((i1 | 0) < 0) << 31 >> 31;
     i3 = 0;
     i2 = i13;
     continue L1;
    }
   case 3:
    {
     HEAP16[HEAP32[i22 >> 2] >> 1] = i1;
     i3 = 0;
     i2 = i13;
     continue L1;
    }
   case 4:
    {
     HEAP8[HEAP32[i22 >> 2] >> 0] = i1;
     i3 = 0;
     i2 = i13;
     continue L1;
    }
   case 6:
    {
     HEAP32[HEAP32[i22 >> 2] >> 2] = i1;
     i3 = 0;
     i2 = i13;
     continue L1;
    }
   case 7:
    {
     i3 = HEAP32[i22 >> 2] | 0;
     HEAP32[i3 >> 2] = i1;
     HEAP32[i3 + 4 >> 2] = ((i1 | 0) < 0) << 31 >> 31;
     i3 = 0;
     i2 = i13;
     continue L1;
    }
   default:
    {
     i3 = 0;
     i2 = i13;
     continue L1;
    }
   }
  case 112:
   {
    i5 = 120;
    i4 = i4 >>> 0 > 8 ? i4 : 8;
    i2 = i12 | 8;
    i14 = 61;
    break;
   }
  case 88:
  case 120:
   {
    i2 = i12;
    i14 = 61;
    break;
   }
  case 111:
   {
    i5 = i22;
    i2 = HEAP32[i5 >> 2] | 0;
    i5 = HEAP32[i5 + 4 >> 2] | 0;
    i9 = _fmt_o(i2, i5, i17) | 0;
    i10 = i18 - i9 | 0;
    i6 = 0;
    i8 = 19975;
    i4 = (i12 & 8 | 0) == 0 | (i4 | 0) > (i10 | 0) ? i4 : i10 + 1 | 0;
    i10 = i12;
    i14 = 67;
    break;
   }
  case 105:
  case 100:
   {
    i5 = i22;
    i2 = HEAP32[i5 >> 2] | 0;
    i5 = HEAP32[i5 + 4 >> 2] | 0;
    if ((i5 | 0) < 0) {
     i2 = _i64Subtract(0, 0, i2 | 0, i5 | 0) | 0;
     i5 = tempRet0;
     i6 = i22;
     HEAP32[i6 >> 2] = i2;
     HEAP32[i6 + 4 >> 2] = i5;
     i6 = 1;
     i8 = 19975;
     i14 = 66;
     break L71;
    } else {
     i6 = (i12 & 2049 | 0) != 0 & 1;
     i8 = (i12 & 2048 | 0) == 0 ? ((i12 & 1 | 0) == 0 ? 19975 : 19977) : 19976;
     i14 = 66;
     break L71;
    }
   }
  case 117:
   {
    i5 = i22;
    i6 = 0;
    i8 = 19975;
    i2 = HEAP32[i5 >> 2] | 0;
    i5 = HEAP32[i5 + 4 >> 2] | 0;
    i14 = 66;
    break;
   }
  case 99:
   {
    HEAP8[i19 >> 0] = HEAP32[i22 >> 2];
    i2 = i19;
    i6 = 0;
    i8 = 19975;
    i9 = i17;
    i5 = 1;
    i4 = i10;
    break;
   }
  case 109:
   {
    i5 = _strerror(HEAP32[(___errno_location() | 0) >> 2] | 0) | 0;
    i14 = 71;
    break;
   }
  case 115:
   {
    i5 = HEAP32[i22 >> 2] | 0;
    i5 = i5 | 0 ? i5 : 19985;
    i14 = 71;
    break;
   }
  case 67:
   {
    HEAP32[i23 >> 2] = HEAP32[i22 >> 2];
    HEAP32[i20 >> 2] = 0;
    HEAP32[i22 >> 2] = i23;
    i9 = -1;
    i5 = i23;
    i14 = 75;
    break;
   }
  case 83:
   {
    i2 = HEAP32[i22 >> 2] | 0;
    if (!i4) {
     _pad_674(i15, 32, i3, 0, i12);
     i2 = 0;
     i14 = 84;
    } else {
     i9 = i4;
     i5 = i2;
     i14 = 75;
    }
    break;
   }
  case 65:
  case 71:
  case 70:
  case 69:
  case 97:
  case 103:
  case 102:
  case 101:
   {
    i3 = _fmt_fp(i15, +HEAPF64[i22 >> 3], i3, i4, i12, i5) | 0;
    i2 = i13;
    continue L1;
   }
  default:
   {
    i6 = 0;
    i8 = 19975;
    i9 = i17;
    i5 = i4;
    i4 = i12;
   }
  } while (0);
  L95 : do if ((i14 | 0) == 61) {
   i12 = i22;
   i11 = HEAP32[i12 >> 2] | 0;
   i12 = HEAP32[i12 + 4 >> 2] | 0;
   i9 = _fmt_x(i11, i12, i17, i5 & 32) | 0;
   i8 = (i2 & 8 | 0) == 0 | (i11 | 0) == 0 & (i12 | 0) == 0;
   i6 = i8 ? 0 : 2;
   i8 = i8 ? 19975 : 19975 + (i5 >> 4) | 0;
   i10 = i2;
   i2 = i11;
   i5 = i12;
   i14 = 67;
  } else if ((i14 | 0) == 66) {
   i9 = _fmt_u(i2, i5, i17) | 0;
   i10 = i12;
   i14 = 67;
  } else if ((i14 | 0) == 71) {
   i14 = 0;
   i12 = _memchr(i5, 0, i4) | 0;
   i11 = (i12 | 0) == 0;
   i2 = i5;
   i6 = 0;
   i8 = 19975;
   i9 = i11 ? i5 + i4 | 0 : i12;
   i5 = i11 ? i4 : i12 - i5 | 0;
   i4 = i10;
  } else if ((i14 | 0) == 75) {
   i14 = 0;
   i8 = i5;
   i2 = 0;
   i4 = 0;
   while (1) {
    i6 = HEAP32[i8 >> 2] | 0;
    if (!i6) break;
    i4 = _wctomb(i24, i6) | 0;
    if ((i4 | 0) < 0 | i4 >>> 0 > (i9 - i2 | 0) >>> 0) break;
    i2 = i4 + i2 | 0;
    if (i9 >>> 0 > i2 >>> 0) i8 = i8 + 4 | 0; else break;
   }
   if ((i4 | 0) < 0) {
    i1 = -1;
    break L1;
   }
   _pad_674(i15, 32, i3, i2, i12);
   if (!i2) {
    i2 = 0;
    i14 = 84;
   } else {
    i6 = 0;
    while (1) {
     i4 = HEAP32[i5 >> 2] | 0;
     if (!i4) {
      i14 = 84;
      break L95;
     }
     i4 = _wctomb(i24, i4) | 0;
     i6 = i4 + i6 | 0;
     if ((i6 | 0) > (i2 | 0)) {
      i14 = 84;
      break L95;
     }
     _out(i15, i24, i4);
     if (i6 >>> 0 >= i2 >>> 0) {
      i14 = 84;
      break;
     } else i5 = i5 + 4 | 0;
    }
   }
  } while (0);
  if ((i14 | 0) == 67) {
   i14 = 0;
   i5 = (i2 | 0) != 0 | (i5 | 0) != 0;
   i12 = (i4 | 0) != 0 | i5;
   i5 = ((i5 ^ 1) & 1) + (i18 - i9) | 0;
   i2 = i12 ? i9 : i17;
   i9 = i17;
   i5 = i12 ? ((i4 | 0) > (i5 | 0) ? i4 : i5) : i4;
   i4 = (i4 | 0) > -1 ? i10 & -65537 : i10;
  } else if ((i14 | 0) == 84) {
   i14 = 0;
   _pad_674(i15, 32, i3, i2, i12 ^ 8192);
   i3 = (i3 | 0) > (i2 | 0) ? i3 : i2;
   i2 = i13;
   continue;
  }
  i11 = i9 - i2 | 0;
  i10 = (i5 | 0) < (i11 | 0) ? i11 : i5;
  i12 = i10 + i6 | 0;
  i3 = (i3 | 0) < (i12 | 0) ? i12 : i3;
  _pad_674(i15, 32, i3, i12, i4);
  _out(i15, i8, i6);
  _pad_674(i15, 48, i3, i12, i4 ^ 65536);
  _pad_674(i15, 48, i10, i11, 0);
  _out(i15, i2, i11);
  _pad_674(i15, 32, i3, i12, i4 ^ 8192);
  i2 = i13;
 }
 L114 : do if ((i14 | 0) == 87) if (!i15) if (!i7) i1 = 0; else {
  i1 = 1;
  while (1) {
   i2 = HEAP32[i27 + (i1 << 2) >> 2] | 0;
   if (!i2) break;
   _pop_arg(i26 + (i1 << 3) | 0, i2, i25);
   i1 = i1 + 1 | 0;
   if ((i1 | 0) >= 10) {
    i1 = 1;
    break L114;
   }
  }
  while (1) {
   if (HEAP32[i27 + (i1 << 2) >> 2] | 0) {
    i1 = -1;
    break L114;
   }
   i1 = i1 + 1 | 0;
   if ((i1 | 0) >= 10) {
    i1 = 1;
    break;
   }
  }
 } while (0);
 STACKTOP = i28;
 return i1 | 0;
}

function _free(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0;
 if (!i1) return;
 i3 = i1 + -8 | 0;
 i7 = HEAP32[8631] | 0;
 if (i3 >>> 0 < i7 >>> 0) _abort();
 i1 = HEAP32[i1 + -4 >> 2] | 0;
 i2 = i1 & 3;
 if ((i2 | 0) == 1) _abort();
 i4 = i1 & -8;
 i14 = i3 + i4 | 0;
 L10 : do if (!(i1 & 1)) {
  i1 = HEAP32[i3 >> 2] | 0;
  if (!i2) return;
  i10 = i3 + (0 - i1) | 0;
  i9 = i1 + i4 | 0;
  if (i10 >>> 0 < i7 >>> 0) _abort();
  if ((i10 | 0) == (HEAP32[8632] | 0)) {
   i1 = i14 + 4 | 0;
   i2 = HEAP32[i1 >> 2] | 0;
   if ((i2 & 3 | 0) != 3) {
    i17 = i10;
    i5 = i9;
    i12 = i10;
    break;
   }
   HEAP32[8629] = i9;
   HEAP32[i1 >> 2] = i2 & -2;
   HEAP32[i10 + 4 >> 2] = i9 | 1;
   HEAP32[i10 + i9 >> 2] = i9;
   return;
  }
  i4 = i1 >>> 3;
  if (i1 >>> 0 < 256) {
   i2 = HEAP32[i10 + 8 >> 2] | 0;
   i3 = HEAP32[i10 + 12 >> 2] | 0;
   i1 = 34548 + (i4 << 1 << 2) | 0;
   if ((i2 | 0) != (i1 | 0)) {
    if (i2 >>> 0 < i7 >>> 0) _abort();
    if ((HEAP32[i2 + 12 >> 2] | 0) != (i10 | 0)) _abort();
   }
   if ((i3 | 0) == (i2 | 0)) {
    HEAP32[8627] = HEAP32[8627] & ~(1 << i4);
    i17 = i10;
    i5 = i9;
    i12 = i10;
    break;
   }
   if ((i3 | 0) != (i1 | 0)) {
    if (i3 >>> 0 < i7 >>> 0) _abort();
    i1 = i3 + 8 | 0;
    if ((HEAP32[i1 >> 2] | 0) == (i10 | 0)) i6 = i1; else _abort();
   } else i6 = i3 + 8 | 0;
   HEAP32[i2 + 12 >> 2] = i3;
   HEAP32[i6 >> 2] = i2;
   i17 = i10;
   i5 = i9;
   i12 = i10;
   break;
  }
  i6 = HEAP32[i10 + 24 >> 2] | 0;
  i3 = HEAP32[i10 + 12 >> 2] | 0;
  do if ((i3 | 0) == (i10 | 0)) {
   i3 = i10 + 16 | 0;
   i2 = i3 + 4 | 0;
   i1 = HEAP32[i2 >> 2] | 0;
   if (!i1) {
    i1 = HEAP32[i3 >> 2] | 0;
    if (!i1) {
     i8 = 0;
     break;
    } else i2 = i3;
   }
   while (1) {
    i3 = i1 + 20 | 0;
    i4 = HEAP32[i3 >> 2] | 0;
    if (i4 | 0) {
     i1 = i4;
     i2 = i3;
     continue;
    }
    i3 = i1 + 16 | 0;
    i4 = HEAP32[i3 >> 2] | 0;
    if (!i4) break; else {
     i1 = i4;
     i2 = i3;
    }
   }
   if (i2 >>> 0 < i7 >>> 0) _abort(); else {
    HEAP32[i2 >> 2] = 0;
    i8 = i1;
    break;
   }
  } else {
   i4 = HEAP32[i10 + 8 >> 2] | 0;
   if (i4 >>> 0 < i7 >>> 0) _abort();
   i1 = i4 + 12 | 0;
   if ((HEAP32[i1 >> 2] | 0) != (i10 | 0)) _abort();
   i2 = i3 + 8 | 0;
   if ((HEAP32[i2 >> 2] | 0) == (i10 | 0)) {
    HEAP32[i1 >> 2] = i3;
    HEAP32[i2 >> 2] = i4;
    i8 = i3;
    break;
   } else _abort();
  } while (0);
  if (i6) {
   i1 = HEAP32[i10 + 28 >> 2] | 0;
   i2 = 34812 + (i1 << 2) | 0;
   do if ((i10 | 0) == (HEAP32[i2 >> 2] | 0)) {
    HEAP32[i2 >> 2] = i8;
    if (!i8) {
     HEAP32[8628] = HEAP32[8628] & ~(1 << i1);
     i17 = i10;
     i5 = i9;
     i12 = i10;
     break L10;
    }
   } else if (i6 >>> 0 >= (HEAP32[8631] | 0) >>> 0) {
    HEAP32[i6 + 16 + (((HEAP32[i6 + 16 >> 2] | 0) != (i10 | 0) & 1) << 2) >> 2] = i8;
    if (!i8) {
     i17 = i10;
     i5 = i9;
     i12 = i10;
     break L10;
    } else break;
   } else _abort(); while (0);
   i3 = HEAP32[8631] | 0;
   if (i8 >>> 0 < i3 >>> 0) _abort();
   HEAP32[i8 + 24 >> 2] = i6;
   i1 = i10 + 16 | 0;
   i2 = HEAP32[i1 >> 2] | 0;
   do if (i2 | 0) if (i2 >>> 0 < i3 >>> 0) _abort(); else {
    HEAP32[i8 + 16 >> 2] = i2;
    HEAP32[i2 + 24 >> 2] = i8;
    break;
   } while (0);
   i1 = HEAP32[i1 + 4 >> 2] | 0;
   if (i1) if (i1 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
    HEAP32[i8 + 20 >> 2] = i1;
    HEAP32[i1 + 24 >> 2] = i8;
    i17 = i10;
    i5 = i9;
    i12 = i10;
    break;
   } else {
    i17 = i10;
    i5 = i9;
    i12 = i10;
   }
  } else {
   i17 = i10;
   i5 = i9;
   i12 = i10;
  }
 } else {
  i17 = i3;
  i5 = i4;
  i12 = i3;
 } while (0);
 if (i12 >>> 0 >= i14 >>> 0) _abort();
 i1 = i14 + 4 | 0;
 i2 = HEAP32[i1 >> 2] | 0;
 if (!(i2 & 1)) _abort();
 if (!(i2 & 2)) {
  i1 = HEAP32[8632] | 0;
  if ((i14 | 0) == (HEAP32[8633] | 0)) {
   i16 = (HEAP32[8630] | 0) + i5 | 0;
   HEAP32[8630] = i16;
   HEAP32[8633] = i17;
   HEAP32[i17 + 4 >> 2] = i16 | 1;
   if ((i17 | 0) != (i1 | 0)) return;
   HEAP32[8632] = 0;
   HEAP32[8629] = 0;
   return;
  }
  if ((i14 | 0) == (i1 | 0)) {
   i16 = (HEAP32[8629] | 0) + i5 | 0;
   HEAP32[8629] = i16;
   HEAP32[8632] = i12;
   HEAP32[i17 + 4 >> 2] = i16 | 1;
   HEAP32[i12 + i16 >> 2] = i16;
   return;
  }
  i5 = (i2 & -8) + i5 | 0;
  i4 = i2 >>> 3;
  L108 : do if (i2 >>> 0 >= 256) {
   i6 = HEAP32[i14 + 24 >> 2] | 0;
   i1 = HEAP32[i14 + 12 >> 2] | 0;
   do if ((i1 | 0) == (i14 | 0)) {
    i3 = i14 + 16 | 0;
    i2 = i3 + 4 | 0;
    i1 = HEAP32[i2 >> 2] | 0;
    if (!i1) {
     i1 = HEAP32[i3 >> 2] | 0;
     if (!i1) {
      i13 = 0;
      break;
     } else i2 = i3;
    }
    while (1) {
     i3 = i1 + 20 | 0;
     i4 = HEAP32[i3 >> 2] | 0;
     if (i4 | 0) {
      i1 = i4;
      i2 = i3;
      continue;
     }
     i3 = i1 + 16 | 0;
     i4 = HEAP32[i3 >> 2] | 0;
     if (!i4) break; else {
      i1 = i4;
      i2 = i3;
     }
    }
    if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
     HEAP32[i2 >> 2] = 0;
     i13 = i1;
     break;
    }
   } else {
    i2 = HEAP32[i14 + 8 >> 2] | 0;
    if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort();
    i3 = i2 + 12 | 0;
    if ((HEAP32[i3 >> 2] | 0) != (i14 | 0)) _abort();
    i4 = i1 + 8 | 0;
    if ((HEAP32[i4 >> 2] | 0) == (i14 | 0)) {
     HEAP32[i3 >> 2] = i1;
     HEAP32[i4 >> 2] = i2;
     i13 = i1;
     break;
    } else _abort();
   } while (0);
   if (i6 | 0) {
    i1 = HEAP32[i14 + 28 >> 2] | 0;
    i2 = 34812 + (i1 << 2) | 0;
    do if ((i14 | 0) == (HEAP32[i2 >> 2] | 0)) {
     HEAP32[i2 >> 2] = i13;
     if (!i13) {
      HEAP32[8628] = HEAP32[8628] & ~(1 << i1);
      break L108;
     }
    } else if (i6 >>> 0 >= (HEAP32[8631] | 0) >>> 0) {
     HEAP32[i6 + 16 + (((HEAP32[i6 + 16 >> 2] | 0) != (i14 | 0) & 1) << 2) >> 2] = i13;
     if (!i13) break L108; else break;
    } else _abort(); while (0);
    i3 = HEAP32[8631] | 0;
    if (i13 >>> 0 < i3 >>> 0) _abort();
    HEAP32[i13 + 24 >> 2] = i6;
    i1 = i14 + 16 | 0;
    i2 = HEAP32[i1 >> 2] | 0;
    do if (i2 | 0) if (i2 >>> 0 < i3 >>> 0) _abort(); else {
     HEAP32[i13 + 16 >> 2] = i2;
     HEAP32[i2 + 24 >> 2] = i13;
     break;
    } while (0);
    i1 = HEAP32[i1 + 4 >> 2] | 0;
    if (i1 | 0) if (i1 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
     HEAP32[i13 + 20 >> 2] = i1;
     HEAP32[i1 + 24 >> 2] = i13;
     break;
    }
   }
  } else {
   i2 = HEAP32[i14 + 8 >> 2] | 0;
   i3 = HEAP32[i14 + 12 >> 2] | 0;
   i1 = 34548 + (i4 << 1 << 2) | 0;
   if ((i2 | 0) != (i1 | 0)) {
    if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort();
    if ((HEAP32[i2 + 12 >> 2] | 0) != (i14 | 0)) _abort();
   }
   if ((i3 | 0) == (i2 | 0)) {
    HEAP32[8627] = HEAP32[8627] & ~(1 << i4);
    break;
   }
   if ((i3 | 0) != (i1 | 0)) {
    if (i3 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort();
    i1 = i3 + 8 | 0;
    if ((HEAP32[i1 >> 2] | 0) == (i14 | 0)) i11 = i1; else _abort();
   } else i11 = i3 + 8 | 0;
   HEAP32[i2 + 12 >> 2] = i3;
   HEAP32[i11 >> 2] = i2;
  } while (0);
  HEAP32[i17 + 4 >> 2] = i5 | 1;
  HEAP32[i12 + i5 >> 2] = i5;
  if ((i17 | 0) == (HEAP32[8632] | 0)) {
   HEAP32[8629] = i5;
   return;
  }
 } else {
  HEAP32[i1 >> 2] = i2 & -2;
  HEAP32[i17 + 4 >> 2] = i5 | 1;
  HEAP32[i12 + i5 >> 2] = i5;
 }
 i1 = i5 >>> 3;
 if (i5 >>> 0 < 256) {
  i3 = 34548 + (i1 << 1 << 2) | 0;
  i2 = HEAP32[8627] | 0;
  i1 = 1 << i1;
  if (i2 & i1) {
   i1 = i3 + 8 | 0;
   i2 = HEAP32[i1 >> 2] | 0;
   if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
    i15 = i2;
    i16 = i1;
   }
  } else {
   HEAP32[8627] = i2 | i1;
   i15 = i3;
   i16 = i3 + 8 | 0;
  }
  HEAP32[i16 >> 2] = i17;
  HEAP32[i15 + 12 >> 2] = i17;
  HEAP32[i17 + 8 >> 2] = i15;
  HEAP32[i17 + 12 >> 2] = i3;
  return;
 }
 i1 = i5 >>> 8;
 if (i1) if (i5 >>> 0 > 16777215) i1 = 31; else {
  i15 = (i1 + 1048320 | 0) >>> 16 & 8;
  i16 = i1 << i15;
  i14 = (i16 + 520192 | 0) >>> 16 & 4;
  i16 = i16 << i14;
  i1 = (i16 + 245760 | 0) >>> 16 & 2;
  i1 = 14 - (i14 | i15 | i1) + (i16 << i1 >>> 15) | 0;
  i1 = i5 >>> (i1 + 7 | 0) & 1 | i1 << 1;
 } else i1 = 0;
 i4 = 34812 + (i1 << 2) | 0;
 HEAP32[i17 + 28 >> 2] = i1;
 HEAP32[i17 + 20 >> 2] = 0;
 HEAP32[i17 + 16 >> 2] = 0;
 i2 = HEAP32[8628] | 0;
 i3 = 1 << i1;
 do if (i2 & i3) {
  i2 = i5 << ((i1 | 0) == 31 ? 0 : 25 - (i1 >>> 1) | 0);
  i4 = HEAP32[i4 >> 2] | 0;
  while (1) {
   if ((HEAP32[i4 + 4 >> 2] & -8 | 0) == (i5 | 0)) {
    i1 = 124;
    break;
   }
   i3 = i4 + 16 + (i2 >>> 31 << 2) | 0;
   i1 = HEAP32[i3 >> 2] | 0;
   if (!i1) {
    i1 = 121;
    break;
   } else {
    i2 = i2 << 1;
    i4 = i1;
   }
  }
  if ((i1 | 0) == 121) if (i3 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
   HEAP32[i3 >> 2] = i17;
   HEAP32[i17 + 24 >> 2] = i4;
   HEAP32[i17 + 12 >> 2] = i17;
   HEAP32[i17 + 8 >> 2] = i17;
   break;
  } else if ((i1 | 0) == 124) {
   i1 = i4 + 8 | 0;
   i2 = HEAP32[i1 >> 2] | 0;
   i16 = HEAP32[8631] | 0;
   if (i2 >>> 0 >= i16 >>> 0 & i4 >>> 0 >= i16 >>> 0) {
    HEAP32[i2 + 12 >> 2] = i17;
    HEAP32[i1 >> 2] = i17;
    HEAP32[i17 + 8 >> 2] = i2;
    HEAP32[i17 + 12 >> 2] = i4;
    HEAP32[i17 + 24 >> 2] = 0;
    break;
   } else _abort();
  }
 } else {
  HEAP32[8628] = i2 | i3;
  HEAP32[i4 >> 2] = i17;
  HEAP32[i17 + 24 >> 2] = i4;
  HEAP32[i17 + 12 >> 2] = i17;
  HEAP32[i17 + 8 >> 2] = i17;
 } while (0);
 i17 = (HEAP32[8635] | 0) + -1 | 0;
 HEAP32[8635] = i17;
 if (!i17) i1 = 34964; else return;
 while (1) {
  i1 = HEAP32[i1 >> 2] | 0;
  if (!i1) break; else i1 = i1 + 8 | 0;
 }
 HEAP32[8635] = -1;
 return;
}

function _MetaData_Fill_TypeDef_(i26, i21, i22) {
 i26 = i26 | 0;
 i21 = i21 | 0;
 i22 = i22 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0, i18 = 0, i19 = 0, i20 = 0, i23 = 0, i24 = 0, i25 = 0, i27 = 0, i28 = 0;
 i28 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i27 = i28 + 8 | 0;
 i25 = i28;
 i2 = i26 + 4 | 0;
 i23 = HEAP32[i2 >> 2] | 0;
 HEAP8[i26 + 32 >> 0] = 1;
 HEAP32[i26 >> 2] = i26;
 i1 = _MetaData_GetTypeDefFromDefRefOrSpec(i23, HEAP32[i26 + 20 >> 2] | 0, i21, i22) | 0;
 i24 = i26 + 40 | 0;
 HEAP32[i24 >> 2] = i1;
 if (!i1) i4 = 0; else {
  if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
  i4 = HEAP32[i1 + 48 >> 2] | 0;
 }
 i8 = i26 + 34 | 0;
 HEAP8[i8 >> 0] = _Type_IsValueType(i26) | 0;
 i9 = i26 + 24 | 0;
 i16 = i26 + 28 | 0;
 i10 = i26 + 100 | 0;
 i18 = i26 + 112 | 0;
 if (!(HEAP8[i26 + 58 >> 0] | 0)) {
  if (!(HEAP8[i26 + 33 >> 0] | 0)) {
   i2 = HEAP32[i16 >> 2] | 0;
   i1 = (HEAP32[i26 + 160 >> 2] | 0) - i2 | 0;
   HEAP32[i18 >> 2] = i1;
   i3 = (HEAP32[i26 + 156 >> 2] | 0) + -1 | 0;
  } else {
   i3 = HEAP32[i2 >> 2] | 0;
   i2 = HEAP32[i16 >> 2] | 0;
   i1 = 1 - i2 + (HEAP32[i3 + 44 >> 2] & 16777215 | 100663296) | 0;
   HEAP32[i18 >> 2] = i1;
   i3 = HEAP32[i3 + 36 >> 2] & 16777215 | 67108864;
  }
  HEAP32[i10 >> 2] = i3 + 1 - (HEAP32[i9 >> 2] | 0);
 } else {
  i2 = HEAP32[i16 >> 2] | 0;
  i1 = HEAP32[i18 >> 2] | 0;
 }
 i6 = i2 + -1 + i1 | 0;
 i20 = i26 + 57 | 0;
 if (!(HEAP8[i20 >> 0] | 0)) {
  i1 = i4;
  while (1) {
   if (i2 >>> 0 > i6 >>> 0) break;
   i3 = _MetaData_GetMethodDefFromDefRefOrSpec(i23, i2, i21, i22) | 0;
   HEAP32[i3 + 48 >> 2] = i26;
   i4 = HEAPU16[i3 + 14 >> 1] | 0;
   i5 = i3 + 56 | 0;
   do if (!(i4 & 64)) i3 = -1; else {
    if ((i4 & 256 | 0) == 0 ? (i7 = HEAP32[i24 >> 2] | 0, i7 | 0) : 0) {
     i3 = HEAP32[(_FindVirtualOverriddenMethod(i7, i3) | 0) + 56 >> 2] | 0;
     break;
    }
    i3 = i1;
    i1 = i1 + 1 | 0;
   } while (0);
   HEAP32[i5 >> 2] = i3;
   i2 = i2 + 1 | 0;
  }
  i14 = i26 + 48 | 0;
  HEAP32[i14 >> 2] = i1;
  i7 = i26 + 68 | 0;
  i19 = i26 + 35 | 0;
  if ((HEAP32[i7 >> 2] | 0) == 0 ? (HEAP8[i8 >> 0] | 0) == 0 : 0) {
   HEAP8[i19 >> 0] = 5;
   HEAP32[i7 >> 2] = 4;
  }
  i4 = HEAP32[i9 >> 2] | 0;
  i1 = HEAP32[i10 >> 2] | 0;
  i8 = i4 + -1 + i1 | 0;
  if (i1 | 0) HEAP32[i26 + 104 >> 2] = _mallocForever(i1 << 2) | 0;
  i1 = HEAP32[i24 >> 2] | 0;
  if (!i1) i1 = 0; else i1 = HEAP32[i1 + 36 >> 2] | 0;
  i15 = i26 + 88 | 0;
  i9 = i26 + 104 | 0;
  i5 = 0;
  i6 = i4;
  while (1) {
   if (i6 >>> 0 > i8 >>> 0) break;
   i3 = _MetaData_GetFieldDefFromDefOrRef(i23, i6, i21, i22) | 0;
   i2 = HEAP16[i3 + 8 >> 1] | 0;
   if (!(i2 & 16)) {
    if (HEAP32[i15 >> 2] | 0) {
     i2 = _mallocForever(44) | 0;
     i13 = i2;
     i11 = i3;
     i12 = i13 + 44 | 0;
     do {
      HEAP32[i13 >> 2] = HEAP32[i11 >> 2];
      i13 = i13 + 4 | 0;
      i11 = i11 + 4 | 0;
     } while ((i13 | 0) < (i12 | 0));
     i3 = i2;
     i2 = HEAP16[i2 + 8 >> 1] | 0;
    }
    if (!(i2 & 320)) {
     _MetaData_Fill_FieldDef(i26, i3, i1, i21);
     i1 = (HEAP32[i3 + 32 >> 2] | 0) + i1 | 0;
    } else _MetaData_Fill_FieldDef(i26, i3, 0, i21);
    HEAP32[(HEAP32[i9 >> 2] | 0) + (i5 << 2) >> 2] = i3;
   }
   i5 = i5 + 1 | 0;
   i6 = i6 + 1 | 0;
  }
  i2 = i26 + 36 | 0;
  i3 = HEAP32[i2 >> 2] | 0;
  if (!i3) HEAP32[i2 >> 2] = i1; else i1 = i3;
  i2 = HEAP32[i7 >> 2] | 0;
  if (!i2) {
   HEAP8[i19 >> 0] = 7;
   HEAP32[i7 >> 2] = i1;
  } else i1 = i2;
  i2 = i26 + 64 | 0;
  if (!(HEAP32[i2 >> 2] | 0)) {
   HEAP32[i2 >> 2] = i1;
   i1 = 0;
   i5 = 0;
  } else {
   i1 = 0;
   i5 = 0;
  }
  while (1) {
   if (i4 >>> 0 > i8 >>> 0) break;
   i3 = _MetaData_GetFieldDefFromDefOrRef(i23, i4, i21, i22) | 0;
   i2 = HEAP16[i3 + 8 >> 1] | 0;
   if (i2 & 16) {
    if (HEAP32[i15 >> 2] | 0) {
     i2 = _mallocForever(44) | 0;
     i13 = i2;
     i11 = i3;
     i12 = i13 + 44 | 0;
     do {
      HEAP32[i13 >> 2] = HEAP32[i11 >> 2];
      i13 = i13 + 4 | 0;
      i11 = i11 + 4 | 0;
     } while ((i13 | 0) < (i12 | 0));
     i3 = i2;
     i2 = HEAP16[i2 + 8 >> 1] | 0;
    }
    if (!(i2 & 320)) {
     _MetaData_Fill_FieldDef(i26, i3, i1, i21);
     i1 = (HEAP32[i3 + 32 >> 2] | 0) + i1 | 0;
    } else _MetaData_Fill_FieldDef(i26, i3, 0, i21);
    HEAP32[(HEAP32[i9 >> 2] | 0) + (i5 << 2) >> 2] = i3;
   }
   i5 = i5 + 1 | 0;
   i4 = i4 + 1 | 0;
  }
  if (i1 | 0) {
   i3 = _mallocForever(i1) | 0;
   i5 = i26 + 52 | 0;
   HEAP32[i5 >> 2] = i3;
   _memset(i3 | 0, 0, i1 | 0) | 0;
   i3 = HEAP32[i10 >> 2] | 0;
   i2 = 0;
   while (1) {
    if (i2 >>> 0 >= i3 >>> 0) break;
    i4 = HEAP32[(HEAP32[i9 >> 2] | 0) + (i2 << 2) >> 2] | 0;
    if (HEAP16[i4 + 8 >> 1] & 16 ? (i17 = i4 + 40 | 0, (HEAP32[i17 >> 2] | 0) == 0) : 0) HEAP32[i17 >> 2] = (HEAP32[i5 >> 2] | 0) + (HEAP32[i4 + 28 >> 2] | 0);
    i2 = i2 + 1 | 0;
   }
   HEAP32[i26 + 108 >> 2] = i1;
  }
  i3 = HEAP32[i16 >> 2] | 0;
  i1 = HEAP32[i18 >> 2] | 0;
  i8 = i3 + -1 + i1 | 0;
  i10 = i26 + 116 | 0;
  HEAP32[i10 >> 2] = _mallocForever(i1 << 2) | 0;
  i1 = _mallocForever(HEAP32[i14 >> 2] << 2) | 0;
  i7 = i26 + 44 | 0;
  HEAP32[i7 >> 2] = i1;
  i2 = HEAP32[i24 >> 2] | 0;
  if (i2 | 0) _memcpy(i1 | 0, HEAP32[i2 + 44 >> 2] | 0, HEAP32[i2 + 48 >> 2] << 2 | 0) | 0;
  i9 = i26 + 124 | 0;
  i6 = i26 + 60 | 0;
  i5 = 0;
  while (1) {
   if (i3 >>> 0 > i8 >>> 0) break;
   i1 = _MetaData_GetMethodDefFromDefRefOrSpec(i23, i3, i21, i22) | 0;
   if (HEAP32[i15 >> 2] | 0) {
    i2 = _mallocForever(68) | 0;
    i13 = i2;
    i11 = i1;
    i12 = i13 + 68 | 0;
    do {
     HEAP32[i13 >> 2] = HEAP32[i11 >> 2];
     i13 = i13 + 4 | 0;
     i11 = i11 + 4 | 0;
    } while ((i13 | 0) < (i12 | 0));
    i1 = i2;
   }
   i2 = HEAP16[i1 + 14 >> 1] | 0;
   i4 = i1 + 16 | 0;
   if (!(i2 & 16)) {
    if (HEAP32[i24 >> 2] | 0 ? (_strcmp(HEAP32[i4 >> 2] | 0, 15414) | 0) == 0 : 0) HEAP32[i9 >> 2] = i1;
   } else if (!(_strcmp(HEAP32[i4 >> 2] | 0, 15407) | 0)) HEAP32[i6 >> 2] = i1;
   if (i2 & 64) HEAP32[(HEAP32[i7 >> 2] | 0) + (HEAP32[i1 + 56 >> 2] << 2) >> 2] = i1;
   HEAP32[(HEAP32[i10 >> 2] | 0) + (i5 << 2) >> 2] = i1;
   i3 = i3 + 1 | 0;
   i5 = i5 + 1 | 0;
  }
  L104 : do if (!(HEAP32[i9 >> 2] | 0)) {
   i1 = i24;
   while (1) {
    i1 = HEAP32[i1 >> 2] | 0;
    if (!i1) {
     i1 = 0;
     break L104;
    }
    i2 = HEAP32[i1 + 124 >> 2] | 0;
    if (!i2) i1 = i1 + 40 | 0; else break;
   }
   HEAP32[i9 >> 2] = i2;
   i1 = 0;
  } else i1 = 0; while (0);
  while (1) {
   if (i1 >>> 0 >= (HEAP32[i18 >> 2] | 0) >>> 0) break;
   _MetaData_Fill_MethodDef(i26, HEAP32[(HEAP32[i10 >> 2] | 0) + (i1 << 2) >> 2] | 0, i21, i22);
   i1 = i1 + 1 | 0;
  }
  L113 : do if (!(HEAP32[i26 + 8 >> 2] & 32)) {
   i1 = HEAP32[i24 >> 2] | 0;
   i7 = i26 + 72 | 0;
   if (!i1) i6 = 0; else {
    i6 = HEAP32[i1 + 72 >> 2] | 0;
    HEAP32[i7 >> 2] = i6;
   }
   i4 = i23 + 56 | 0;
   i9 = i26 + 80 | 0;
   i5 = 0;
   i3 = 1;
   while (1) {
    if (i3 >>> 0 > (HEAP32[i4 >> 2] | 0) >>> 0) break;
    i1 = i3 & 16777215 | 150994944;
    i18 = HEAP32[(_MetaData_GetTableRow(i23, i1) | 0) >> 2] | 0;
    if ((i18 | 0) == (HEAP32[i9 >> 2] | 0)) {
     HEAP32[i7 >> 2] = (HEAP32[i7 >> 2] | 0) + 1;
     i2 = i1;
     i1 = (i5 | 0) == 0 ? i1 : i5;
    } else {
     i2 = i8;
     i1 = i5;
    }
    i5 = i1;
    i8 = i2;
    i3 = i3 + 1 | 0;
   }
   i1 = HEAP32[i7 >> 2] | 0;
   if (i1 | 0 ? (HEAP8[i20 >> 0] | 0) == 0 : 0) {
    i1 = _mallocForever(i1 * 12 | 0) | 0;
    i7 = i26 + 76 | 0;
    HEAP32[i7 >> 2] = i1;
    if (i6 | 0) _memcpy(i1 | 0, HEAP32[(HEAP32[i24 >> 2] | 0) + 76 >> 2] | 0, i6 * 12 | 0) | 0;
    if (i5 | 0) {
     while (1) {
      if (i5 >>> 0 > i8 >>> 0) break L113;
      i1 = _MetaData_GetTableRow(i23, i5) | 0;
      if ((HEAP32[i1 >> 2] | 0) != (HEAP32[i9 >> 2] | 0)) break;
      i1 = _MetaData_GetTypeDefFromDefRefOrSpec(i23, HEAP32[i1 + 4 >> 2] | 0, i21, i22) | 0;
      if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
      i2 = HEAP32[i7 >> 2] | 0;
      HEAP32[i2 + (i6 * 12 | 0) >> 2] = i1;
      i3 = i1 + 48 | 0;
      i4 = i2 + (i6 * 12 | 0) + 4 | 0;
      HEAP32[i4 >> 2] = _mallocForever(HEAP32[i3 >> 2] << 2) | 0;
      HEAP32[i2 + (i6 * 12 | 0) + 8 >> 2] = 0;
      i2 = i1 + 44 | 0;
      i1 = 0;
      while (1) {
       if (i1 >>> 0 >= (HEAP32[i3 >> 2] | 0) >>> 0) break;
       i20 = HEAP32[(_FindVirtualOverriddenMethod(i26, HEAP32[(HEAP32[i2 >> 2] | 0) + (i1 << 2) >> 2] | 0) | 0) + 56 >> 2] | 0;
       HEAP32[(HEAP32[i4 >> 2] | 0) + (i1 << 2) >> 2] = i20;
       i1 = i1 + 1 | 0;
      }
      i6 = i6 + 1 | 0;
      i5 = i5 + 1 | 0;
     }
     _Crash(15423, i25);
    }
   }
  } while (0);
  if ((HEAP32[i24 >> 2] | 0) == (HEAP32[(HEAP32[8595] | 0) + 120 >> 2] | 0)) HEAP8[i19 >> 0] = 1;
 }
 i1 = HEAP32[i26 + 120 >> 2] | 0;
 i3 = i26 + 16 | 0;
 if (!i1) i1 = HEAP32[i3 >> 2] | 0; else {
  while (1) {
   i2 = HEAP32[i1 + 120 >> 2] | 0;
   if (!i2) break; else i1 = i2;
  }
  i1 = HEAP32[i1 + 16 >> 2] | 0;
  HEAP32[i3 >> 2] = i1;
 }
 i26 = HEAP32[i26 + 12 >> 2] | 0;
 HEAP32[i27 >> 2] = i1;
 HEAP32[i27 + 4 >> 2] = i26;
 _log_f(2, 15452, i27);
 STACKTOP = i28;
 return;
}

function _dispose_chunk(i1, i3) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 var i2 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0;
 i14 = i1 + i3 | 0;
 i2 = HEAP32[i1 + 4 >> 2] | 0;
 L1 : do if (!(i2 & 1)) {
  i6 = HEAP32[i1 >> 2] | 0;
  if (!(i2 & 3)) return;
  i11 = i1 + (0 - i6) | 0;
  i10 = i6 + i3 | 0;
  i8 = HEAP32[8631] | 0;
  if (i11 >>> 0 < i8 >>> 0) _abort();
  if ((i11 | 0) == (HEAP32[8632] | 0)) {
   i1 = i14 + 4 | 0;
   i2 = HEAP32[i1 >> 2] | 0;
   if ((i2 & 3 | 0) != 3) {
    i17 = i11;
    i5 = i10;
    break;
   }
   HEAP32[8629] = i10;
   HEAP32[i1 >> 2] = i2 & -2;
   HEAP32[i11 + 4 >> 2] = i10 | 1;
   HEAP32[i11 + i10 >> 2] = i10;
   return;
  }
  i4 = i6 >>> 3;
  if (i6 >>> 0 < 256) {
   i2 = HEAP32[i11 + 8 >> 2] | 0;
   i3 = HEAP32[i11 + 12 >> 2] | 0;
   i1 = 34548 + (i4 << 1 << 2) | 0;
   if ((i2 | 0) != (i1 | 0)) {
    if (i2 >>> 0 < i8 >>> 0) _abort();
    if ((HEAP32[i2 + 12 >> 2] | 0) != (i11 | 0)) _abort();
   }
   if ((i3 | 0) == (i2 | 0)) {
    HEAP32[8627] = HEAP32[8627] & ~(1 << i4);
    i17 = i11;
    i5 = i10;
    break;
   }
   if ((i3 | 0) != (i1 | 0)) {
    if (i3 >>> 0 < i8 >>> 0) _abort();
    i1 = i3 + 8 | 0;
    if ((HEAP32[i1 >> 2] | 0) == (i11 | 0)) i7 = i1; else _abort();
   } else i7 = i3 + 8 | 0;
   HEAP32[i2 + 12 >> 2] = i3;
   HEAP32[i7 >> 2] = i2;
   i17 = i11;
   i5 = i10;
   break;
  }
  i6 = HEAP32[i11 + 24 >> 2] | 0;
  i3 = HEAP32[i11 + 12 >> 2] | 0;
  do if ((i3 | 0) == (i11 | 0)) {
   i3 = i11 + 16 | 0;
   i2 = i3 + 4 | 0;
   i1 = HEAP32[i2 >> 2] | 0;
   if (!i1) {
    i1 = HEAP32[i3 >> 2] | 0;
    if (!i1) {
     i9 = 0;
     break;
    } else i2 = i3;
   }
   while (1) {
    i3 = i1 + 20 | 0;
    i4 = HEAP32[i3 >> 2] | 0;
    if (i4 | 0) {
     i1 = i4;
     i2 = i3;
     continue;
    }
    i3 = i1 + 16 | 0;
    i4 = HEAP32[i3 >> 2] | 0;
    if (!i4) break; else {
     i1 = i4;
     i2 = i3;
    }
   }
   if (i2 >>> 0 < i8 >>> 0) _abort(); else {
    HEAP32[i2 >> 2] = 0;
    i9 = i1;
    break;
   }
  } else {
   i4 = HEAP32[i11 + 8 >> 2] | 0;
   if (i4 >>> 0 < i8 >>> 0) _abort();
   i1 = i4 + 12 | 0;
   if ((HEAP32[i1 >> 2] | 0) != (i11 | 0)) _abort();
   i2 = i3 + 8 | 0;
   if ((HEAP32[i2 >> 2] | 0) == (i11 | 0)) {
    HEAP32[i1 >> 2] = i3;
    HEAP32[i2 >> 2] = i4;
    i9 = i3;
    break;
   } else _abort();
  } while (0);
  if (i6) {
   i1 = HEAP32[i11 + 28 >> 2] | 0;
   i2 = 34812 + (i1 << 2) | 0;
   do if ((i11 | 0) == (HEAP32[i2 >> 2] | 0)) {
    HEAP32[i2 >> 2] = i9;
    if (!i9) {
     HEAP32[8628] = HEAP32[8628] & ~(1 << i1);
     i17 = i11;
     i5 = i10;
     break L1;
    }
   } else if (i6 >>> 0 >= (HEAP32[8631] | 0) >>> 0) {
    HEAP32[i6 + 16 + (((HEAP32[i6 + 16 >> 2] | 0) != (i11 | 0) & 1) << 2) >> 2] = i9;
    if (!i9) {
     i17 = i11;
     i5 = i10;
     break L1;
    } else break;
   } else _abort(); while (0);
   i3 = HEAP32[8631] | 0;
   if (i9 >>> 0 < i3 >>> 0) _abort();
   HEAP32[i9 + 24 >> 2] = i6;
   i1 = i11 + 16 | 0;
   i2 = HEAP32[i1 >> 2] | 0;
   do if (i2 | 0) if (i2 >>> 0 < i3 >>> 0) _abort(); else {
    HEAP32[i9 + 16 >> 2] = i2;
    HEAP32[i2 + 24 >> 2] = i9;
    break;
   } while (0);
   i1 = HEAP32[i1 + 4 >> 2] | 0;
   if (i1) if (i1 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
    HEAP32[i9 + 20 >> 2] = i1;
    HEAP32[i1 + 24 >> 2] = i9;
    i17 = i11;
    i5 = i10;
    break;
   } else {
    i17 = i11;
    i5 = i10;
   }
  } else {
   i17 = i11;
   i5 = i10;
  }
 } else {
  i17 = i1;
  i5 = i3;
 } while (0);
 i7 = HEAP32[8631] | 0;
 if (i14 >>> 0 < i7 >>> 0) _abort();
 i1 = i14 + 4 | 0;
 i2 = HEAP32[i1 >> 2] | 0;
 if (!(i2 & 2)) {
  i1 = HEAP32[8632] | 0;
  if ((i14 | 0) == (HEAP32[8633] | 0)) {
   i16 = (HEAP32[8630] | 0) + i5 | 0;
   HEAP32[8630] = i16;
   HEAP32[8633] = i17;
   HEAP32[i17 + 4 >> 2] = i16 | 1;
   if ((i17 | 0) != (i1 | 0)) return;
   HEAP32[8632] = 0;
   HEAP32[8629] = 0;
   return;
  }
  if ((i14 | 0) == (i1 | 0)) {
   i16 = (HEAP32[8629] | 0) + i5 | 0;
   HEAP32[8629] = i16;
   HEAP32[8632] = i17;
   HEAP32[i17 + 4 >> 2] = i16 | 1;
   HEAP32[i17 + i16 >> 2] = i16;
   return;
  }
  i5 = (i2 & -8) + i5 | 0;
  i4 = i2 >>> 3;
  L96 : do if (i2 >>> 0 >= 256) {
   i6 = HEAP32[i14 + 24 >> 2] | 0;
   i3 = HEAP32[i14 + 12 >> 2] | 0;
   do if ((i3 | 0) == (i14 | 0)) {
    i3 = i14 + 16 | 0;
    i2 = i3 + 4 | 0;
    i1 = HEAP32[i2 >> 2] | 0;
    if (!i1) {
     i1 = HEAP32[i3 >> 2] | 0;
     if (!i1) {
      i13 = 0;
      break;
     } else i2 = i3;
    }
    while (1) {
     i3 = i1 + 20 | 0;
     i4 = HEAP32[i3 >> 2] | 0;
     if (i4 | 0) {
      i1 = i4;
      i2 = i3;
      continue;
     }
     i3 = i1 + 16 | 0;
     i4 = HEAP32[i3 >> 2] | 0;
     if (!i4) break; else {
      i1 = i4;
      i2 = i3;
     }
    }
    if (i2 >>> 0 < i7 >>> 0) _abort(); else {
     HEAP32[i2 >> 2] = 0;
     i13 = i1;
     break;
    }
   } else {
    i4 = HEAP32[i14 + 8 >> 2] | 0;
    if (i4 >>> 0 < i7 >>> 0) _abort();
    i1 = i4 + 12 | 0;
    if ((HEAP32[i1 >> 2] | 0) != (i14 | 0)) _abort();
    i2 = i3 + 8 | 0;
    if ((HEAP32[i2 >> 2] | 0) == (i14 | 0)) {
     HEAP32[i1 >> 2] = i3;
     HEAP32[i2 >> 2] = i4;
     i13 = i3;
     break;
    } else _abort();
   } while (0);
   if (i6 | 0) {
    i1 = HEAP32[i14 + 28 >> 2] | 0;
    i2 = 34812 + (i1 << 2) | 0;
    do if ((i14 | 0) == (HEAP32[i2 >> 2] | 0)) {
     HEAP32[i2 >> 2] = i13;
     if (!i13) {
      HEAP32[8628] = HEAP32[8628] & ~(1 << i1);
      break L96;
     }
    } else if (i6 >>> 0 >= (HEAP32[8631] | 0) >>> 0) {
     HEAP32[i6 + 16 + (((HEAP32[i6 + 16 >> 2] | 0) != (i14 | 0) & 1) << 2) >> 2] = i13;
     if (!i13) break L96; else break;
    } else _abort(); while (0);
    i3 = HEAP32[8631] | 0;
    if (i13 >>> 0 < i3 >>> 0) _abort();
    HEAP32[i13 + 24 >> 2] = i6;
    i1 = i14 + 16 | 0;
    i2 = HEAP32[i1 >> 2] | 0;
    do if (i2 | 0) if (i2 >>> 0 < i3 >>> 0) _abort(); else {
     HEAP32[i13 + 16 >> 2] = i2;
     HEAP32[i2 + 24 >> 2] = i13;
     break;
    } while (0);
    i1 = HEAP32[i1 + 4 >> 2] | 0;
    if (i1 | 0) if (i1 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
     HEAP32[i13 + 20 >> 2] = i1;
     HEAP32[i1 + 24 >> 2] = i13;
     break;
    }
   }
  } else {
   i2 = HEAP32[i14 + 8 >> 2] | 0;
   i3 = HEAP32[i14 + 12 >> 2] | 0;
   i1 = 34548 + (i4 << 1 << 2) | 0;
   if ((i2 | 0) != (i1 | 0)) {
    if (i2 >>> 0 < i7 >>> 0) _abort();
    if ((HEAP32[i2 + 12 >> 2] | 0) != (i14 | 0)) _abort();
   }
   if ((i3 | 0) == (i2 | 0)) {
    HEAP32[8627] = HEAP32[8627] & ~(1 << i4);
    break;
   }
   if ((i3 | 0) != (i1 | 0)) {
    if (i3 >>> 0 < i7 >>> 0) _abort();
    i1 = i3 + 8 | 0;
    if ((HEAP32[i1 >> 2] | 0) == (i14 | 0)) i12 = i1; else _abort();
   } else i12 = i3 + 8 | 0;
   HEAP32[i2 + 12 >> 2] = i3;
   HEAP32[i12 >> 2] = i2;
  } while (0);
  HEAP32[i17 + 4 >> 2] = i5 | 1;
  HEAP32[i17 + i5 >> 2] = i5;
  if ((i17 | 0) == (HEAP32[8632] | 0)) {
   HEAP32[8629] = i5;
   return;
  }
 } else {
  HEAP32[i1 >> 2] = i2 & -2;
  HEAP32[i17 + 4 >> 2] = i5 | 1;
  HEAP32[i17 + i5 >> 2] = i5;
 }
 i1 = i5 >>> 3;
 if (i5 >>> 0 < 256) {
  i3 = 34548 + (i1 << 1 << 2) | 0;
  i2 = HEAP32[8627] | 0;
  i1 = 1 << i1;
  if (i2 & i1) {
   i1 = i3 + 8 | 0;
   i2 = HEAP32[i1 >> 2] | 0;
   if (i2 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
    i15 = i2;
    i16 = i1;
   }
  } else {
   HEAP32[8627] = i2 | i1;
   i15 = i3;
   i16 = i3 + 8 | 0;
  }
  HEAP32[i16 >> 2] = i17;
  HEAP32[i15 + 12 >> 2] = i17;
  HEAP32[i17 + 8 >> 2] = i15;
  HEAP32[i17 + 12 >> 2] = i3;
  return;
 }
 i1 = i5 >>> 8;
 if (i1) if (i5 >>> 0 > 16777215) i1 = 31; else {
  i15 = (i1 + 1048320 | 0) >>> 16 & 8;
  i16 = i1 << i15;
  i14 = (i16 + 520192 | 0) >>> 16 & 4;
  i16 = i16 << i14;
  i1 = (i16 + 245760 | 0) >>> 16 & 2;
  i1 = 14 - (i14 | i15 | i1) + (i16 << i1 >>> 15) | 0;
  i1 = i5 >>> (i1 + 7 | 0) & 1 | i1 << 1;
 } else i1 = 0;
 i4 = 34812 + (i1 << 2) | 0;
 HEAP32[i17 + 28 >> 2] = i1;
 HEAP32[i17 + 20 >> 2] = 0;
 HEAP32[i17 + 16 >> 2] = 0;
 i2 = HEAP32[8628] | 0;
 i3 = 1 << i1;
 if (!(i2 & i3)) {
  HEAP32[8628] = i2 | i3;
  HEAP32[i4 >> 2] = i17;
  HEAP32[i17 + 24 >> 2] = i4;
  HEAP32[i17 + 12 >> 2] = i17;
  HEAP32[i17 + 8 >> 2] = i17;
  return;
 }
 i2 = i5 << ((i1 | 0) == 31 ? 0 : 25 - (i1 >>> 1) | 0);
 i4 = HEAP32[i4 >> 2] | 0;
 while (1) {
  if ((HEAP32[i4 + 4 >> 2] & -8 | 0) == (i5 | 0)) {
   i1 = 121;
   break;
  }
  i3 = i4 + 16 + (i2 >>> 31 << 2) | 0;
  i1 = HEAP32[i3 >> 2] | 0;
  if (!i1) {
   i1 = 118;
   break;
  } else {
   i2 = i2 << 1;
   i4 = i1;
  }
 }
 if ((i1 | 0) == 118) {
  if (i3 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort();
  HEAP32[i3 >> 2] = i17;
  HEAP32[i17 + 24 >> 2] = i4;
  HEAP32[i17 + 12 >> 2] = i17;
  HEAP32[i17 + 8 >> 2] = i17;
  return;
 } else if ((i1 | 0) == 121) {
  i1 = i4 + 8 | 0;
  i2 = HEAP32[i1 >> 2] | 0;
  i16 = HEAP32[8631] | 0;
  if (!(i2 >>> 0 >= i16 >>> 0 & i4 >>> 0 >= i16 >>> 0)) _abort();
  HEAP32[i2 + 12 >> 2] = i17;
  HEAP32[i1 >> 2] = i17;
  HEAP32[i17 + 8 >> 2] = i2;
  HEAP32[i17 + 12 >> 2] = i4;
  HEAP32[i17 + 24 >> 2] = 0;
  return;
 }
}

function ___rem_pio2_large(i20, i2, i24, i21, i27) {
 i20 = i20 | 0;
 i2 = i2 | 0;
 i24 = i24 | 0;
 i21 = i21 | 0;
 i27 = i27 | 0;
 var d1 = 0.0, d3 = 0.0, i4 = 0, d5 = 0.0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0, i18 = 0, i19 = 0, i22 = 0, i23 = 0, i25 = 0, i26 = 0, i28 = 0, i29 = 0, i30 = 0, i31 = 0;
 i31 = STACKTOP;
 STACKTOP = STACKTOP + 560 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(560);
 i25 = i31 + 480 | 0;
 i22 = i31 + 320 | 0;
 i30 = i31 + 160 | 0;
 i28 = i31;
 i26 = HEAP32[5296 + (i27 << 2) >> 2] | 0;
 i10 = i21 + -1 | 0;
 i19 = (i24 + -3 | 0) / 24 | 0;
 i19 = (i19 | 0) > 0 ? i19 : 0;
 i23 = Math_imul(i19, -24) | 0;
 i4 = i24 + -24 + i23 | 0;
 if ((i26 + i10 | 0) >= 0) {
  i8 = i26 + i21 | 0;
  i6 = i19 - i10 | 0;
  i7 = 0;
  while (1) {
   if ((i6 | 0) < 0) d1 = 0.0; else d1 = +(HEAP32[5312 + (i6 << 2) >> 2] | 0);
   HEAPF64[i22 + (i7 << 3) >> 3] = d1;
   i7 = i7 + 1 | 0;
   if ((i7 | 0) == (i8 | 0)) break; else i6 = i6 + 1 | 0;
  }
 }
 i9 = (i21 | 0) > 0;
 i8 = 0;
 while (1) {
  if (i9) {
   i7 = i8 + i10 | 0;
   d1 = 0.0;
   i6 = 0;
   do {
    d1 = d1 + +HEAPF64[i20 + (i6 << 3) >> 3] * +HEAPF64[i22 + (i7 - i6 << 3) >> 3];
    i6 = i6 + 1 | 0;
   } while ((i6 | 0) != (i21 | 0));
  } else d1 = 0.0;
  HEAPF64[i28 + (i8 << 3) >> 3] = d1;
  if ((i8 | 0) < (i26 | 0)) i8 = i8 + 1 | 0; else break;
 }
 i14 = (i4 | 0) > 0;
 i15 = 24 - i4 | 0;
 i16 = 23 - i4 | 0;
 i17 = (i21 | 0) > 0;
 i18 = (i4 | 0) == 0;
 i6 = i26;
 L17 : while (1) {
  d1 = +HEAPF64[i28 + (i6 << 3) >> 3];
  i9 = (i6 | 0) > 0;
  if (i9) {
   i7 = i6;
   i8 = 0;
   while (1) {
    d5 = +(~~(d1 * 5.960464477539063e-08) | 0);
    HEAP32[i25 + (i8 << 2) >> 2] = ~~(d1 - d5 * 16777216.0);
    i13 = i7;
    i7 = i7 + -1 | 0;
    d1 = d5 + +HEAPF64[i28 + (i7 << 3) >> 3];
    if ((i13 | 0) <= 1) break; else i8 = i8 + 1 | 0;
   }
  }
  d1 = +_scalbn(d1, i4);
  d1 = d1 - +Math_floor(+(d1 * .125)) * 8.0;
  i7 = ~~d1;
  d1 = d1 - +(i7 | 0);
  do if (!i14) if (!i18) if (!(d1 >= .5)) {
   i10 = 0;
   i13 = i7;
   break;
  } else {
   i8 = 2;
   i29 = 20;
   break;
  } else {
   i8 = HEAP32[i25 + (i6 + -1 << 2) >> 2] >> 23;
   i29 = 19;
   break;
  } else {
   i13 = i25 + (i6 + -1 << 2) | 0;
   i8 = HEAP32[i13 >> 2] | 0;
   i29 = i8 >> i15;
   i8 = i8 - (i29 << i15) | 0;
   HEAP32[i13 >> 2] = i8;
   i8 = i8 >> i16;
   i7 = i29 + i7 | 0;
   i29 = 19;
  } while (0);
  if ((i29 | 0) == 19) {
   i29 = 0;
   if ((i8 | 0) > 0) i29 = 20; else {
    i10 = i8;
    i13 = i7;
   }
  }
  if ((i29 | 0) == 20) {
   i29 = 0;
   i13 = i7 + 1 | 0;
   if (i9) {
    i7 = 0;
    i12 = 0;
    do {
     i10 = i25 + (i12 << 2) | 0;
     i11 = HEAP32[i10 >> 2] | 0;
     if (!i7) if (!i11) i7 = 0; else {
      i7 = 1;
      i9 = 16777216;
      i29 = 23;
     } else {
      i9 = 16777215;
      i29 = 23;
     }
     if ((i29 | 0) == 23) {
      i29 = 0;
      HEAP32[i10 >> 2] = i9 - i11;
     }
     i12 = i12 + 1 | 0;
    } while ((i12 | 0) != (i6 | 0));
   } else i7 = 0;
   L42 : do if (i14) {
    switch (i4 | 0) {
    case 1:
     {
      i9 = 8388607;
      break;
     }
    case 2:
     {
      i9 = 4194303;
      break;
     }
    default:
     break L42;
    }
    i12 = i25 + (i6 + -1 << 2) | 0;
    HEAP32[i12 >> 2] = HEAP32[i12 >> 2] & i9;
   } while (0);
   if ((i8 | 0) == 2) {
    d1 = 1.0 - d1;
    if (!i7) i10 = 2; else {
     i10 = 2;
     d1 = d1 - +_scalbn(1.0, i4);
    }
   } else i10 = i8;
  }
  if (!(d1 == 0.0)) {
   i29 = 42;
   break;
  }
  if ((i6 | 0) > (i26 | 0)) {
   i7 = 0;
   i8 = i6;
   do {
    i8 = i8 + -1 | 0;
    i7 = HEAP32[i25 + (i8 << 2) >> 2] | i7;
   } while ((i8 | 0) > (i26 | 0));
   if (i7) {
    i29 = 41;
    break;
   } else i7 = 1;
  } else i7 = 1;
  while (1) if (!(HEAP32[i25 + (i26 - i7 << 2) >> 2] | 0)) i7 = i7 + 1 | 0; else break;
  i9 = i7 + i6 | 0;
  if ((i7 | 0) <= 0) {
   i6 = i9;
   continue;
  }
  while (1) {
   i8 = i6 + 1 | 0;
   i7 = i6 + i21 | 0;
   HEAPF64[i22 + (i7 << 3) >> 3] = +(HEAP32[5312 + (i8 + i19 << 2) >> 2] | 0);
   if (i17) {
    d1 = 0.0;
    i6 = 0;
    do {
     d1 = d1 + +HEAPF64[i20 + (i6 << 3) >> 3] * +HEAPF64[i22 + (i7 - i6 << 3) >> 3];
     i6 = i6 + 1 | 0;
    } while ((i6 | 0) != (i21 | 0));
   } else d1 = 0.0;
   HEAPF64[i28 + (i8 << 3) >> 3] = d1;
   if ((i8 | 0) < (i9 | 0)) i6 = i8; else {
    i6 = i9;
    continue L17;
   }
  }
 }
 if ((i29 | 0) == 41) while (1) {
  i29 = 0;
  i4 = i4 + -24 | 0;
  i6 = i6 + -1 | 0;
  if (!(HEAP32[i25 + (i6 << 2) >> 2] | 0)) i29 = 41; else {
   i9 = i6;
   break;
  }
 } else if ((i29 | 0) == 42) {
  d1 = +_scalbn(d1, 0 - i4 | 0);
  if (d1 >= 16777216.0) {
   d5 = +(~~(d1 * 5.960464477539063e-08) | 0);
   HEAP32[i25 + (i6 << 2) >> 2] = ~~(d1 - d5 * 16777216.0);
   i4 = i23 + i24 | 0;
   i6 = i6 + 1 | 0;
   d1 = d5;
  }
  HEAP32[i25 + (i6 << 2) >> 2] = ~~d1;
  i9 = i6;
 }
 i8 = (i9 | 0) > -1;
 if (i8) {
  d1 = +_scalbn(1.0, i4);
  i4 = i9;
  while (1) {
   HEAPF64[i28 + (i4 << 3) >> 3] = d1 * +(HEAP32[i25 + (i4 << 2) >> 2] | 0);
   if ((i4 | 0) > 0) {
    d1 = d1 * 5.960464477539063e-08;
    i4 = i4 + -1 | 0;
   } else break;
  }
  if (i8) {
   i6 = i9;
   while (1) {
    i7 = i9 - i6 | 0;
    i4 = 0;
    d1 = 0.0;
    while (1) {
     d1 = d1 + +HEAPF64[1024 + (i4 << 3) >> 3] * +HEAPF64[i28 + (i4 + i6 << 3) >> 3];
     if ((i4 | 0) >= (i26 | 0) | (i4 | 0) >= (i7 | 0)) break; else i4 = i4 + 1 | 0;
    }
    HEAPF64[i30 + (i7 << 3) >> 3] = d1;
    if ((i6 | 0) > 0) i6 = i6 + -1 | 0; else break;
   }
  }
 }
 switch (i27 | 0) {
 case 0:
  {
   if (i8) {
    d1 = 0.0;
    i4 = i9;
    while (1) {
     d1 = d1 + +HEAPF64[i30 + (i4 << 3) >> 3];
     if ((i4 | 0) > 0) i4 = i4 + -1 | 0; else break;
    }
   } else d1 = 0.0;
   d3 = (i10 | 0) == 0 ? d1 : -d1;
   i29 = 73;
   break;
  }
 case 2:
 case 1:
  {
   if (i8) {
    d1 = 0.0;
    i4 = i9;
    while (1) {
     d1 = d1 + +HEAPF64[i30 + (i4 << 3) >> 3];
     if ((i4 | 0) > 0) i4 = i4 + -1 | 0; else break;
    }
   } else d1 = 0.0;
   i6 = (i10 | 0) == 0;
   HEAPF64[i2 >> 3] = i6 ? d1 : -d1;
   d1 = +HEAPF64[i30 >> 3] - d1;
   if ((i9 | 0) >= 1) {
    i4 = 1;
    while (1) {
     d1 = d1 + +HEAPF64[i30 + (i4 << 3) >> 3];
     if ((i4 | 0) == (i9 | 0)) break; else i4 = i4 + 1 | 0;
    }
   }
   d3 = i6 ? d1 : -d1;
   i2 = i2 + 8 | 0;
   i29 = 73;
   break;
  }
 case 3:
  {
   if ((i9 | 0) > 0) {
    i4 = i9;
    d1 = +HEAPF64[i30 + (i9 << 3) >> 3];
    do {
     i29 = i4;
     i4 = i4 + -1 | 0;
     i28 = i30 + (i4 << 3) | 0;
     d5 = +HEAPF64[i28 >> 3];
     d3 = d1;
     d1 = d5 + d1;
     HEAPF64[i30 + (i29 << 3) >> 3] = d3 + (d5 - d1);
     HEAPF64[i28 >> 3] = d1;
    } while ((i29 | 0) > 1);
    i6 = (i9 | 0) > 1;
    if (i6) {
     i4 = i9;
     d1 = +HEAPF64[i30 + (i9 << 3) >> 3];
     do {
      i28 = i4;
      i4 = i4 + -1 | 0;
      i29 = i30 + (i4 << 3) | 0;
      d5 = +HEAPF64[i29 >> 3];
      d3 = d1;
      d1 = d5 + d1;
      HEAPF64[i30 + (i28 << 3) >> 3] = d3 + (d5 - d1);
      HEAPF64[i29 >> 3] = d1;
     } while ((i4 | 0) > 1);
     if (i6) {
      i4 = i9;
      d3 = 0.0;
      do {
       d3 = d3 + +HEAPF64[i30 + (i4 << 3) >> 3];
       i4 = i4 + -1 | 0;
      } while ((i4 | 0) > 1);
     } else d3 = 0.0;
    } else d3 = 0.0;
   } else d3 = 0.0;
   d5 = +HEAPF64[i30 >> 3];
   d1 = +HEAPF64[i30 + 8 >> 3];
   if (!i10) HEAPF64[i2 >> 3] = d5; else {
    HEAPF64[i2 >> 3] = -d5;
    d3 = -d3;
    d1 = -d1;
   }
   HEAPF64[i2 + 8 >> 3] = d1;
   i2 = i2 + 16 | 0;
   i29 = 73;
   break;
  }
 default:
  {}
 }
 if ((i29 | 0) == 73) HEAPF64[i2 >> 3] = d3;
 STACKTOP = i31;
 return i13 & 7 | 0;
}

function _JIT_Prepare(i18, i17) {
 i18 = i18 | 0;
 i17 = i17 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i19 = 0, i20 = 0;
 i20 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i3 = i20 + 8 | 0;
 i16 = i20;
 i15 = i20 + 16 | 0;
 i12 = i20 + 12 | 0;
 HEAP32[i16 >> 2] = _Sys_GetMethodDesc(i18) | 0;
 _log_f(2, 13687, i16);
 i16 = i18 + 4 | 0;
 i1 = HEAP32[i16 >> 2] | 0;
 i7 = (i17 | 0) != 0;
 if (i7) i19 = _malloc(20) | 0; else i19 = _mallocForever(20) | 0;
 HEAP32[i18 + 28 >> 2] = i19;
 i11 = HEAPU16[i18 + 12 >> 1] | 0;
 i4 = i19 + 4 | 0;
 i14 = i18 + 48 | 0;
 do if ((i11 & 4096 | 0) != 0 | (i11 & 3 | 0) == 3) {
  if (_strcmp(HEAP32[i18 + 16 >> 2] | 0, 13698) | 0) {
   i1 = HEAP32[i18 + 44 >> 2] | 0;
   if (!i1) i1 = 0; else i13 = 8;
  } else {
   i1 = HEAP32[i14 >> 2] | 0;
   i13 = 8;
  }
  if ((i13 | 0) == 8) i1 = HEAP32[i1 + 68 >> 2] | 0;
  HEAP32[i4 >> 2] = i1;
  i17 = _mallocForever(16) | 0;
  HEAP32[i17 >> 2] = _Translate(6) | 0;
  HEAP32[i17 + 4 >> 2] = i18;
  HEAP32[i17 + 8 >> 2] = _InternalCall_Map(i18) | 0;
  HEAP32[i17 + 12 >> 2] = _Translate(1) | 0;
  HEAP32[i19 + 8 >> 2] = 0;
  HEAP32[i19 >> 2] = i17;
 } else {
  if (HEAP16[i18 + 14 >> 1] & 8192) {
   i2 = _MetaData_GetImplMap(i1, HEAP32[i18 + 52 >> 2] | 0) | 0;
   i1 = _PInvoke_GetFunction(i1, i2) | 0;
   if (!i1) {
    HEAP32[i3 >> 2] = HEAP32[i2 + 8 >> 2];
    _Crash(13704, i3);
   }
   i3 = _mallocForever(16) | 0;
   HEAP32[i3 >> 2] = _Translate(40) | 0;
   HEAP32[i3 + 4 >> 2] = i1;
   HEAP32[i3 + 8 >> 2] = i18;
   HEAP32[i3 + 12 >> 2] = i2;
   HEAP32[i19 + 8 >> 2] = 0;
   i1 = HEAP32[i18 + 44 >> 2] | 0;
   if (!i1) i1 = 0; else i1 = HEAP32[i1 + 68 >> 2] | 0;
   HEAP32[i4 >> 2] = i1;
   HEAP32[i19 >> 2] = i3;
   break;
  }
  i1 = HEAP32[i18 + 8 >> 2] | 0;
  i2 = i1 + 1 | 0;
  L23 : do if ((HEAP8[i1 >> 0] & 3) != 2) {
   i9 = HEAP16[i1 >> 1] | 0;
   HEAP32[i4 >> 2] = HEAPU16[i1 + 2 >> 1];
   i10 = HEAP32[i1 + 4 >> 2] | 0;
   i11 = HEAP32[i1 + 8 >> 2] | 0;
   i8 = i1 + ((HEAP8[i2 >> 0] & -16 & 255) >>> 2) | 0;
   i1 = i19 + 16 | 0;
   i2 = i19 + 12 | 0;
   i6 = i18 + 60 | 0;
   if (!(i9 & 8)) {
    i5 = i10;
    i7 = i11;
    i4 = i8;
    i3 = i6;
    i13 = 35;
   } else {
    i3 = i8 + (i10 + 3 & -4) | 0;
    i9 = i3 + 4 | 0;
    L27 : do if (!(HEAP8[i3 >> 0] & 64)) {
     i4 = ((HEAPU8[i3 + 1 >> 0] | 0) + -4 | 0) / 12 | 0;
     i3 = i4 * 24 | 0;
     if (i7) i7 = _malloc(i3) | 0; else i7 = _mallocForever(i3) | 0;
     HEAP32[i1 >> 2] = i7;
     i3 = i9;
     i5 = 0;
     while (1) {
      if ((i5 | 0) == (i4 | 0)) break L27;
      HEAP32[i7 + (i5 * 24 | 0) >> 2] = HEAPU16[i3 >> 1];
      HEAP32[i7 + (i5 * 24 | 0) + 4 >> 2] = HEAPU16[i3 + 2 >> 1];
      HEAP32[i7 + (i5 * 24 | 0) + 8 >> 2] = HEAPU8[i3 + 4 >> 0];
      HEAP32[i7 + (i5 * 24 | 0) + 12 >> 2] = HEAPU8[i3 + 6 >> 0] << 8 | HEAPU8[i3 + 5 >> 0];
      HEAP32[i7 + (i5 * 24 | 0) + 16 >> 2] = HEAPU8[i3 + 7 >> 0];
      HEAP32[i7 + (i5 * 24 | 0) + 20 >> 2] = HEAP32[i3 + 8 >> 2];
      i3 = i3 + 12 | 0;
      i5 = i5 + 1 | 0;
     }
    } else {
     i4 = ((((HEAP32[i3 >> 2] | 0) >>> 8) + -4 | 0) >>> 0) / 24 | 0;
     i5 = i4 * 24 | 0;
     if (i7) i3 = _malloc(i5) | 0; else i3 = _mallocForever(i5) | 0;
     HEAP32[i1 >> 2] = i3;
     _memcpy(i3 | 0, i9 | 0, i5 | 0) | 0;
    } while (0);
    HEAP32[i2 >> 2] = i4;
    i2 = 0;
    while (1) {
     if ((i2 | 0) == (i4 | 0)) {
      i9 = i10;
      i1 = i11;
      break L23;
     }
     i3 = HEAP32[i1 >> 2] | 0;
     if (!(HEAP32[i3 + (i2 * 24 | 0) >> 2] | 0)) {
      i9 = _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i16 >> 2] | 0, HEAP32[i3 + (i2 * 24 | 0) + 20 >> 2] | 0, HEAP32[(HEAP32[i14 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i6 >> 2] | 0) | 0;
      HEAP32[(HEAP32[i1 >> 2] | 0) + (i2 * 24 | 0) + 20 >> 2] = i9;
     }
     i2 = i2 + 1 | 0;
    }
   }
  } else {
   HEAP32[i4 >> 2] = 8;
   i5 = (HEAPU8[i1 >> 0] | 0) >>> 2;
   i7 = 0;
   i4 = i2;
   i2 = i19 + 12 | 0;
   i1 = i19 + 16 | 0;
   i3 = i18 + 60 | 0;
   i13 = 35;
  } while (0);
  if ((i13 | 0) == 35) {
   HEAP32[i2 >> 2] = 0;
   HEAP32[i1 >> 2] = 0;
   i9 = i5;
   i1 = i7;
   i8 = i4;
   i6 = i3;
  }
  i7 = i19 + 8 | 0;
  L51 : do if (!i1) {
   i3 = 0;
   i2 = 0;
   i1 = 0;
  } else {
   HEAP32[i15 >> 2] = _MetaData_GetBlob(HEAP32[(_MetaData_GetTableRow(HEAP32[i16 >> 2] | 0, i1) | 0) >> 2] | 0, i12) | 0;
   _MetaData_DecodeSigEntry(i15) | 0;
   i3 = _MetaData_DecodeSigEntry(i15) | 0;
   i5 = _malloc(i3 * 12 | 0) | 0;
   i1 = 0;
   i2 = 0;
   while (1) {
    if ((i2 | 0) == (i3 | 0)) {
     i3 = i5;
     i2 = i5;
     break L51;
    }
    i4 = _Type_GetTypeFromSig(HEAP32[i16 >> 2] | 0, i15, HEAP32[(HEAP32[i14 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i6 >> 2] | 0) | 0;
    if (!(HEAP8[i4 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i4, 0, 0);
    HEAP32[i5 + (i2 * 12 | 0) >> 2] = i4;
    HEAP32[i5 + (i2 * 12 | 0) + 4 >> 2] = i1;
    i13 = HEAP32[i4 + 68 >> 2] | 0;
    HEAP32[i5 + (i2 * 12 | 0) + 8 >> 2] = i13;
    i1 = i13 + i1 | 0;
    i2 = i2 + 1 | 0;
   }
  } while (0);
  HEAP32[i7 >> 2] = i1;
  HEAP32[i19 >> 2] = _JITit(i18, i8, i9, i3, i19, i17) | 0;
  _free(i2);
 } while (0);
 STACKTOP = i20;
 return;
}

function _LoadSingleTable(i21, i22, i23, i24) {
 i21 = i21 | 0;
 i22 = i22 | 0;
 i23 = i23 | 0;
 i24 = i24 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i17 = 0, i18 = 0, i19 = 0, i20 = 0, i25 = 0, i26 = 0, i27 = 0, i28 = 0, i29 = 0, i30 = 0, i31 = 0, i32 = 0, i33 = 0;
 i32 = STACKTOP;
 STACKTOP = STACKTOP + 48 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(48);
 i29 = i32 + 32 | 0;
 i31 = i32 + 24 | 0;
 i30 = i32 + 16 | 0;
 i28 = i32 + 8 | 0;
 i6 = i32;
 i25 = HEAP32[i21 + 20 + (i23 << 2) >> 2] | 0;
 i26 = HEAP32[3456 + (i23 << 2) >> 2] | 0;
 i27 = _strlen(i26) | 0;
 i7 = HEAP32[i24 >> 2] | 0;
 i5 = 35004 + i23 | 0;
 i1 = HEAP8[i5 >> 0] | 0;
 do if (!(i1 << 24 >> 24)) {
  i1 = 0;
  i2 = 0;
  L2 : while (1) {
   if ((i2 | 0) >= (i27 | 0)) {
    i2 = 9;
    break;
   }
   i3 = HEAP8[i26 + (i2 | 1) >> 0] | 0;
   switch (i3 | 0) {
   case 42:
    {
     i1 = i1 + 4 | 0;
     break;
    }
   case 115:
    {
     i1 = i1 + 2 | 0;
     break;
    }
   case 99:
    {
     i1 = i1 + 1 | 0;
     break;
    }
   case 120:
    break;
   default:
    {
     i2 = 7;
     break L2;
    }
   }
   i2 = i2 + 2 | 0;
  }
  if ((i2 | 0) == 7) {
   HEAP32[i6 >> 2] = i3;
   _Crash(14586, i6);
  } else if ((i2 | 0) == 9) {
   HEAP8[i5 >> 0] = i1;
   i4 = i1;
   break;
  }
 } else i4 = i1 & 255; while (0);
 i20 = _malloc(Math_imul(i4, i25) | 0) | 0;
 i12 = i21 + 420 | 0;
 i13 = i21 + 422 | 0;
 i14 = i21 + 16 | 0;
 i15 = i21 + 421 | 0;
 i16 = i21 + 4 | 0;
 i17 = i21;
 i18 = i25 + -1 | 0;
 i19 = i23 << 24;
 i2 = 0;
 i4 = i7;
 i1 = i20;
 i3 = 0;
 L15 : while (1) {
  if ((i2 | 0) >= (i25 | 0)) {
   i2 = 53;
   break;
  }
  i11 = i2 + 1 | 0;
  i9 = (i2 | 0) == (i18 | 0) & 1;
  i10 = i11 & 16777215 | i19;
  i8 = 0;
  i7 = i4;
  while (1) {
   if ((i8 | 0) >= (i27 | 0)) {
    i2 = i11;
    i4 = i7;
    continue L15;
   }
   i3 = HEAP8[i26 + i8 >> 0] | 0;
   i5 = i3 & 255;
   i2 = i7 + 2 | 0;
   i4 = i7 + 4 | 0;
   L21 : do if ((i3 & 255) < 48) {
    if ((HEAP32[i21 + 20 + (i5 << 2) >> 2] | 0) >>> 0 < 65536) i3 = _GetU16(i7) | 0; else {
     i2 = i4;
     i3 = _GetU32(i7) | 0;
    }
    i4 = i3 | i5 << 24;
   } else do switch (i3 << 24 >> 24) {
   case 120:
    {
     i2 = i7;
     i4 = 0;
     break L21;
    }
   case 99:
    {
     i2 = i7 + 1 | 0;
     i4 = HEAPU8[i7 >> 0] | 0;
     break L21;
    }
   case 115:
    {
     i4 = _GetU16(i7) | 0;
     break L21;
    }
   case 105:
    {
     i2 = i4;
     i4 = _GetU32(i7) | 0;
     break L21;
    }
   case 60:
   case 59:
   case 58:
   case 57:
   case 56:
   case 55:
   case 54:
   case 53:
   case 52:
   case 51:
   case 50:
   case 49:
   case 48:
    {
     i3 = (i3 << 24 >> 24) + -48 | 0;
     i5 = HEAPU8[14526 + i3 >> 0] | 0;
     i33 = HEAP8[(HEAP32[3404 + (i3 << 2) >> 2] | 0) + ((1 << i5) + 255 & HEAPU8[i7 >> 0]) >> 0] | 0;
     i6 = i33 << 24 >> 24;
     if ((i33 & 255) > 48) {
      i2 = 25;
      break L15;
     }
     if (!(HEAP8[i21 + 404 + i3 >> 0] | 0)) i3 = _GetU16(i7) | 0; else {
      i2 = i4;
      i3 = _GetU32(i7) | 0;
     }
     i4 = i3 >>> i5 | i6 << 24;
     break L21;
    }
   case 83:
    {
     if (!(HEAP8[i12 >> 0] | 0)) i3 = _GetU16(i7) | 0; else {
      i2 = i4;
      i3 = _GetU32(i7) | 0;
     }
     i4 = (HEAP32[i21 >> 2] | 0) + i3 | 0;
     break L21;
    }
   case 71:
    {
     if (!(HEAP8[i13 >> 0] | 0)) i3 = _GetU16(i7) | 0; else {
      i2 = i4;
      i3 = _GetU32(i7) | 0;
     }
     i4 = (HEAP32[i14 >> 2] | 0) + ((i3 << 4) + -16) | 0;
     break L21;
    }
   case 66:
    {
     if (!(HEAP8[i15 >> 0] | 0)) i3 = _GetU16(i7) | 0; else {
      i2 = i4;
      i3 = _GetU32(i7) | 0;
     }
     i4 = (HEAP32[i16 >> 2] | 0) + i3 | 0;
     break L21;
    }
   case 94:
    {
     i2 = i4;
     i4 = _RVA_FindData(i22, _GetU32(i7) | 0) | 0;
     break L21;
    }
   case 109:
    {
     i2 = i7;
     i4 = i17;
     break L21;
    }
   case 108:
    {
     i2 = i7;
     i4 = i9;
     break L21;
    }
   case 73:
    {
     i2 = i7;
     i4 = i10;
     break L21;
    }
   default:
    {
     i2 = 46;
     break L15;
    }
   } while (0); while (0);
   i3 = HEAP8[i26 + (i8 | 1) >> 0] | 0;
   switch (i3 | 0) {
   case 42:
    {
     HEAP32[i1 >> 2] = i4;
     i1 = i1 + 4 | 0;
     break;
    }
   case 115:
    {
     HEAP16[i1 >> 1] = i4;
     i1 = i1 + 2 | 0;
     break;
    }
   case 99:
    {
     HEAP8[i1 >> 0] = i4;
     i1 = i1 + 1 | 0;
     break;
    }
   case 120:
    break;
   default:
    {
     i2 = 51;
     break L15;
    }
   }
   i8 = i8 + 2 | 0;
   i7 = i2;
   i3 = i4;
  }
 }
 if ((i2 | 0) == 25) {
  HEAP32[i28 >> 2] = i6;
  _printf(14661, i28) | 0;
  _exit(1);
 } else if ((i2 | 0) == 46) {
  HEAP32[i30 >> 2] = i5;
  HEAP32[i30 + 4 >> 2] = i5;
  _Crash(14693, i30);
 } else if ((i2 | 0) == 51) {
  HEAP32[i31 >> 2] = i3;
  _Crash(14759, i31);
 } else if ((i2 | 0) == 53) {
  HEAP32[i29 >> 2] = i23;
  HEAP32[i29 + 4 >> 2] = i25;
  _log_f(1, 14821, i29);
  HEAP32[i24 >> 2] = i4;
  STACKTOP = i32;
  return i20 | 0;
 }
 return 0;
}

function _fnmatch_internal(i1, i4, i2, i3, i16) {
 i1 = i1 | 0;
 i4 = i4 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i16 = i16 | 0;
 var i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i17 = 0, i18 = 0, i19 = 0;
 i19 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i17 = i19 + 4 | 0;
 i18 = i19;
 if (((i16 & 4 | 0) != 0 ? (HEAP8[i2 >> 0] | 0) == 46 : 0) ? (HEAP8[i1 >> 0] | 0) != 46 : 0) i1 = 1; else i7 = 4;
 L4 : do if ((i7 | 0) == 4) {
  i15 = (i16 & 16 | 0) == 0;
  i9 = i1;
  L6 : while (1) {
   i5 = _pat_next(i9, i4, i17, i16) | 0;
   switch (i5 | 0) {
   case -2:
    {
     i1 = 1;
     break L4;
    }
   case -5:
    break L6;
   default:
    {}
   }
   i6 = _str_next(i2, i3, i18) | 0;
   if ((i6 | 0) < 1) {
    i7 = 9;
    break;
   }
   i14 = HEAP32[i18 >> 2] | 0;
   i2 = i2 + i14 | 0;
   i3 = i3 - i14 | 0;
   if (i15) i1 = i6; else i1 = _casefold(i6) | 0;
   switch (i5 | 0) {
   case -3:
    {
     if (!(_match_bracket(i9, i6, i1) | 0)) {
      i1 = 1;
      break L4;
     }
     break;
    }
   case -4:
    break;
   default:
    if (!((i6 | 0) == (i5 | 0) | (i1 | 0) == (i5 | 0))) {
     i1 = 1;
     break L4;
    }
   }
   i14 = HEAP32[i17 >> 2] | 0;
   i9 = i9 + i14 | 0;
   i4 = i4 - i14 | 0;
  }
  if ((i7 | 0) == 9) {
   i1 = (i5 | 0) != 0 & 1;
   break;
  }
  i1 = i9 + 1 | 0;
  i7 = _strnlen(i1, i4 + -1 | 0) | 0;
  i11 = i9 + (i7 + 1) | 0;
  L20 : do if ((i7 | 0) > 0) {
   i8 = i11;
   i5 = 1;
   i6 = 1;
   i4 = 0;
   while (1) {
    i14 = i9 + i6 | 0;
    switch (_pat_next(i14, i8 - i14 | 0, i17, i16) | 0) {
    case -2:
     {
      i1 = 1;
      break L4;
     }
    case -5:
     {
      i4 = 0;
      i5 = i6 + 1 | 0;
      break;
     }
    default:
     i4 = i4 + 1 | 0;
    }
    i6 = i6 + (HEAP32[i17 >> 2] | 0) | 0;
    if ((i6 | 0) > (i7 | 0)) {
     i6 = i4;
     break L20;
    }
   }
  } else {
   i6 = 0;
   i5 = 1;
  } while (0);
  i14 = i9 + i5 | 0;
  i4 = _strnlen(i2, i3) | 0;
  i10 = i2 + i4 | 0;
  if (i4 >>> 0 >= i6 >>> 0) {
   i3 = (i6 | 0) != 0;
   if ((i4 | 0) > 0 & i3) {
    i3 = i10;
    do {
     i4 = i3 + -1 | 0;
     if ((HEAP8[i4 >> 0] | 0) <= -1 ? (HEAP32[HEAP32[(___pthread_self_536() | 0) + 188 >> 2] >> 2] | 0) != 0 : 0) do i3 = i3 + -1 | 0; while (i3 >>> 0 > i2 >>> 0 ? (HEAP8[i3 >> 0] & -64) << 24 >> 24 == -128 : 0); else i3 = i4;
     i6 = i6 + -1 | 0;
     i4 = (i6 | 0) != 0;
    } while (i3 >>> 0 > i2 >>> 0 & i4);
    i6 = i3;
    i3 = i4;
   } else i6 = i10;
   if (!i3) {
    i13 = i14;
    i3 = _pat_next(i14, i11 - i13 | 0, i17, i16) | 0;
    i8 = HEAP32[i17 >> 2] | 0;
    i12 = i6;
    i4 = _str_next(i6, i10 - i12 | 0, i18) | 0;
    L40 : do if ((i4 | 0) >= 1) {
     i9 = i6;
     i7 = i8;
     i8 = i14 + i8 | 0;
     while (1) {
      i9 = i9 + (HEAP32[i18 >> 2] | 0) | 0;
      if (i15) i6 = i4; else i6 = _casefold(i4) | 0;
      switch (i3 | 0) {
      case -3:
       {
        if (!(_match_bracket(i8 + (0 - i7) | 0, i4, i6) | 0)) {
         i1 = 1;
         break L4;
        }
        break;
       }
      case -4:
       break;
      default:
       if (!((i4 | 0) == (i3 | 0) | (i6 | 0) == (i3 | 0))) {
        i1 = 1;
        break L4;
       }
      }
      i3 = _pat_next(i8, i11 - i8 | 0, i17, i16) | 0;
      i6 = HEAP32[i17 >> 2] | 0;
      i4 = _str_next(i9, i10 - i9 | 0, i18) | 0;
      if ((i4 | 0) < 1) break L40; else {
       i7 = i6;
       i8 = i8 + i6 | 0;
      }
     }
    } while (0);
    if (!i3) if ((i5 | 0) > 1) while (1) {
     i9 = i13 - i1 | 0;
     i5 = _pat_next(i1, i9, i17, i16) | 0;
     i3 = HEAP32[i17 >> 2] | 0;
     i4 = i1 + i3 | 0;
     L55 : do if ((i5 | 0) == -5) i1 = i4; else {
      i6 = i5;
      while (1) {
       i5 = i2;
       i8 = i6;
       L58 : while (1) {
        i6 = _str_next(i5, i12 - i5 | 0, i18) | 0;
        if (!i6) {
         i1 = 1;
         break L4;
        }
        if (i15) i7 = i6; else i7 = _casefold(i6) | 0;
        switch (i8 | 0) {
        case -3:
         {
          if (!(_match_bracket(i4 + (0 - i3) | 0, i6, i7) | 0)) break L58;
          break;
         }
        case -4:
         break;
        default:
         if (!((i6 | 0) == (i8 | 0) | (i7 | 0) == (i8 | 0))) break L58;
        }
        i5 = i5 + (HEAP32[i18 >> 2] | 0) | 0;
        i8 = _pat_next(i4, i13 - i4 | 0, i17, i16) | 0;
        i3 = HEAP32[i17 >> 2] | 0;
        i4 = i4 + i3 | 0;
        if ((i8 | 0) == -5) {
         i2 = i5;
         i1 = i4;
         break L55;
        }
       }
       if ((_str_next(i2, i12 - i2 | 0, i18) | 0) > 0) i2 = i2 + (HEAP32[i18 >> 2] | 0) | 0; else do i2 = i2 + 1 | 0; while ((_str_next(i2, i12 - i2 | 0, i18) | 0) < 0);
       i6 = _pat_next(i1, i9, i17, i16) | 0;
       i3 = HEAP32[i17 >> 2] | 0;
       i4 = i1 + i3 | 0;
       if ((i6 | 0) == -5) {
        i1 = i4;
        break;
       }
      }
     } while (0);
     if (i1 >>> 0 >= i14 >>> 0) {
      i1 = 0;
      break;
     }
    } else i1 = 0; else i1 = 1;
   } else i1 = 1;
  } else i1 = 1;
 } while (0);
 STACKTOP = i19;
 return i1 | 0;
}

function _try_realloc_chunk(i14, i12) {
 i14 = i14 | 0;
 i12 = i12 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i13 = 0;
 i13 = i14 + 4 | 0;
 i11 = HEAP32[i13 >> 2] | 0;
 i1 = i11 & -8;
 i8 = i14 + i1 | 0;
 i6 = HEAP32[8631] | 0;
 i2 = i11 & 3;
 if (!((i2 | 0) != 1 & i14 >>> 0 >= i6 >>> 0 & i14 >>> 0 < i8 >>> 0)) _abort();
 i3 = HEAP32[i8 + 4 >> 2] | 0;
 if (!(i3 & 1)) _abort();
 if (!i2) {
  if (i12 >>> 0 < 256) {
   i14 = 0;
   return i14 | 0;
  }
  if (i1 >>> 0 >= (i12 + 4 | 0) >>> 0 ? (i1 - i12 | 0) >>> 0 <= HEAP32[8747] << 1 >>> 0 : 0) return i14 | 0;
  i14 = 0;
  return i14 | 0;
 }
 if (i1 >>> 0 >= i12 >>> 0) {
  i1 = i1 - i12 | 0;
  if (i1 >>> 0 <= 15) return i14 | 0;
  i10 = i14 + i12 | 0;
  HEAP32[i13 >> 2] = i11 & 1 | i12 | 2;
  HEAP32[i10 + 4 >> 2] = i1 | 3;
  i13 = i10 + i1 + 4 | 0;
  HEAP32[i13 >> 2] = HEAP32[i13 >> 2] | 1;
  _dispose_chunk(i10, i1);
  return i14 | 0;
 }
 if ((i8 | 0) == (HEAP32[8633] | 0)) {
  i10 = (HEAP32[8630] | 0) + i1 | 0;
  i1 = i10 - i12 | 0;
  i2 = i14 + i12 | 0;
  if (i10 >>> 0 <= i12 >>> 0) {
   i14 = 0;
   return i14 | 0;
  }
  HEAP32[i13 >> 2] = i11 & 1 | i12 | 2;
  HEAP32[i2 + 4 >> 2] = i1 | 1;
  HEAP32[8633] = i2;
  HEAP32[8630] = i1;
  return i14 | 0;
 }
 if ((i8 | 0) == (HEAP32[8632] | 0)) {
  i3 = (HEAP32[8629] | 0) + i1 | 0;
  if (i3 >>> 0 < i12 >>> 0) {
   i14 = 0;
   return i14 | 0;
  }
  i1 = i3 - i12 | 0;
  i2 = i11 & 1;
  if (i1 >>> 0 > 15) {
   i11 = i14 + i12 | 0;
   i10 = i11 + i1 | 0;
   HEAP32[i13 >> 2] = i2 | i12 | 2;
   HEAP32[i11 + 4 >> 2] = i1 | 1;
   HEAP32[i10 >> 2] = i1;
   i2 = i10 + 4 | 0;
   HEAP32[i2 >> 2] = HEAP32[i2 >> 2] & -2;
   i2 = i11;
  } else {
   HEAP32[i13 >> 2] = i2 | i3 | 2;
   i2 = i14 + i3 + 4 | 0;
   HEAP32[i2 >> 2] = HEAP32[i2 >> 2] | 1;
   i2 = 0;
   i1 = 0;
  }
  HEAP32[8629] = i1;
  HEAP32[8632] = i2;
  return i14 | 0;
 }
 if (i3 & 2 | 0) {
  i14 = 0;
  return i14 | 0;
 }
 i9 = (i3 & -8) + i1 | 0;
 if (i9 >>> 0 < i12 >>> 0) {
  i14 = 0;
  return i14 | 0;
 }
 i10 = i9 - i12 | 0;
 i4 = i3 >>> 3;
 L49 : do if (i3 >>> 0 >= 256) {
  i5 = HEAP32[i8 + 24 >> 2] | 0;
  i3 = HEAP32[i8 + 12 >> 2] | 0;
  do if ((i3 | 0) == (i8 | 0)) {
   i3 = i8 + 16 | 0;
   i2 = i3 + 4 | 0;
   i1 = HEAP32[i2 >> 2] | 0;
   if (!i1) {
    i1 = HEAP32[i3 >> 2] | 0;
    if (!i1) {
     i7 = 0;
     break;
    } else i2 = i3;
   }
   while (1) {
    i3 = i1 + 20 | 0;
    i4 = HEAP32[i3 >> 2] | 0;
    if (i4 | 0) {
     i1 = i4;
     i2 = i3;
     continue;
    }
    i3 = i1 + 16 | 0;
    i4 = HEAP32[i3 >> 2] | 0;
    if (!i4) break; else {
     i1 = i4;
     i2 = i3;
    }
   }
   if (i2 >>> 0 < i6 >>> 0) _abort(); else {
    HEAP32[i2 >> 2] = 0;
    i7 = i1;
    break;
   }
  } else {
   i4 = HEAP32[i8 + 8 >> 2] | 0;
   if (i4 >>> 0 < i6 >>> 0) _abort();
   i1 = i4 + 12 | 0;
   if ((HEAP32[i1 >> 2] | 0) != (i8 | 0)) _abort();
   i2 = i3 + 8 | 0;
   if ((HEAP32[i2 >> 2] | 0) == (i8 | 0)) {
    HEAP32[i1 >> 2] = i3;
    HEAP32[i2 >> 2] = i4;
    i7 = i3;
    break;
   } else _abort();
  } while (0);
  if (i5 | 0) {
   i1 = HEAP32[i8 + 28 >> 2] | 0;
   i2 = 34812 + (i1 << 2) | 0;
   do if ((i8 | 0) == (HEAP32[i2 >> 2] | 0)) {
    HEAP32[i2 >> 2] = i7;
    if (!i7) {
     HEAP32[8628] = HEAP32[8628] & ~(1 << i1);
     break L49;
    }
   } else if (i5 >>> 0 >= (HEAP32[8631] | 0) >>> 0) {
    HEAP32[i5 + 16 + (((HEAP32[i5 + 16 >> 2] | 0) != (i8 | 0) & 1) << 2) >> 2] = i7;
    if (!i7) break L49; else break;
   } else _abort(); while (0);
   i3 = HEAP32[8631] | 0;
   if (i7 >>> 0 < i3 >>> 0) _abort();
   HEAP32[i7 + 24 >> 2] = i5;
   i1 = i8 + 16 | 0;
   i2 = HEAP32[i1 >> 2] | 0;
   do if (i2 | 0) if (i2 >>> 0 < i3 >>> 0) _abort(); else {
    HEAP32[i7 + 16 >> 2] = i2;
    HEAP32[i2 + 24 >> 2] = i7;
    break;
   } while (0);
   i1 = HEAP32[i1 + 4 >> 2] | 0;
   if (i1 | 0) if (i1 >>> 0 < (HEAP32[8631] | 0) >>> 0) _abort(); else {
    HEAP32[i7 + 20 >> 2] = i1;
    HEAP32[i1 + 24 >> 2] = i7;
    break;
   }
  }
 } else {
  i2 = HEAP32[i8 + 8 >> 2] | 0;
  i3 = HEAP32[i8 + 12 >> 2] | 0;
  i1 = 34548 + (i4 << 1 << 2) | 0;
  if ((i2 | 0) != (i1 | 0)) {
   if (i2 >>> 0 < i6 >>> 0) _abort();
   if ((HEAP32[i2 + 12 >> 2] | 0) != (i8 | 0)) _abort();
  }
  if ((i3 | 0) == (i2 | 0)) {
   HEAP32[8627] = HEAP32[8627] & ~(1 << i4);
   break;
  }
  if ((i3 | 0) != (i1 | 0)) {
   if (i3 >>> 0 < i6 >>> 0) _abort();
   i1 = i3 + 8 | 0;
   if ((HEAP32[i1 >> 2] | 0) == (i8 | 0)) i5 = i1; else _abort();
  } else i5 = i3 + 8 | 0;
  HEAP32[i2 + 12 >> 2] = i3;
  HEAP32[i5 >> 2] = i2;
 } while (0);
 i1 = i11 & 1;
 if (i10 >>> 0 < 16) {
  HEAP32[i13 >> 2] = i9 | i1 | 2;
  i13 = i14 + i9 + 4 | 0;
  HEAP32[i13 >> 2] = HEAP32[i13 >> 2] | 1;
  return i14 | 0;
 } else {
  i11 = i14 + i12 | 0;
  HEAP32[i13 >> 2] = i1 | i12 | 2;
  HEAP32[i11 + 4 >> 2] = i10 | 3;
  i13 = i11 + i10 + 4 | 0;
  HEAP32[i13 >> 2] = HEAP32[i13 >> 2] | 1;
  _dispose_chunk(i11, i10);
  return i14 | 0;
 }
 return 0;
}

function ___rem_pio2(d2, i13) {
 d2 = +d2;
 i13 = i13 | 0;
 var i1 = 0, d3 = 0.0, d4 = 0.0, d5 = 0.0, i6 = 0, d7 = 0.0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i14 = 0, d15 = 0.0;
 i14 = STACKTOP;
 STACKTOP = STACKTOP + 48 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(48);
 i8 = i14 + 16 | 0;
 i9 = i14;
 HEAPF64[tempDoublePtr >> 3] = d2;
 i1 = HEAP32[tempDoublePtr >> 2] | 0;
 i6 = HEAP32[tempDoublePtr + 4 >> 2] | 0;
 i10 = _bitshift64Lshr(i1 | 0, i6 | 0, 63) | 0;
 i12 = i6 & 2147483647;
 do if (i12 >>> 0 < 1074752123) if ((i6 & 1048575 | 0) != 598523) {
  i1 = (i10 | 0) != 0;
  if (i12 >>> 0 < 1073928573) if (i1) {
   d5 = d2 + 1.5707963267341256;
   d7 = d5 + 6.077100506506192e-11;
   HEAPF64[i13 >> 3] = d7;
   HEAPF64[i13 + 8 >> 3] = d5 - d7 + 6.077100506506192e-11;
   i1 = -1;
   break;
  } else {
   d5 = d2 + -1.5707963267341256;
   d7 = d5 + -6.077100506506192e-11;
   HEAPF64[i13 >> 3] = d7;
   HEAPF64[i13 + 8 >> 3] = d5 - d7 + -6.077100506506192e-11;
   i1 = 1;
   break;
  } else if (i1) {
   d5 = d2 + 3.1415926534682512;
   d7 = d5 + 1.2154201013012384e-10;
   HEAPF64[i13 >> 3] = d7;
   HEAPF64[i13 + 8 >> 3] = d5 - d7 + 1.2154201013012384e-10;
   i1 = -2;
   break;
  } else {
   d5 = d2 + -3.1415926534682512;
   d7 = d5 + -1.2154201013012384e-10;
   HEAPF64[i13 >> 3] = d7;
   HEAPF64[i13 + 8 >> 3] = d5 - d7 + -1.2154201013012384e-10;
   i1 = 2;
   break;
  }
 } else i11 = 21; else {
  if (i12 >>> 0 < 1075594812) if (i12 >>> 0 < 1075183037) {
   if ((i12 | 0) == 1074977148) {
    i11 = 21;
    break;
   }
   if (!i10) {
    d5 = d2 + -4.712388980202377;
    d7 = d5 + -1.8231301519518578e-10;
    HEAPF64[i13 >> 3] = d7;
    HEAPF64[i13 + 8 >> 3] = d5 - d7 + -1.8231301519518578e-10;
    i1 = 3;
    break;
   } else {
    d5 = d2 + 4.712388980202377;
    d7 = d5 + 1.8231301519518578e-10;
    HEAPF64[i13 >> 3] = d7;
    HEAPF64[i13 + 8 >> 3] = d5 - d7 + 1.8231301519518578e-10;
    i1 = -3;
    break;
   }
  } else {
   if ((i12 | 0) == 1075388923) {
    i11 = 21;
    break;
   }
   if (!i10) {
    d5 = d2 + -6.2831853069365025;
    d7 = d5 + -2.430840202602477e-10;
    HEAPF64[i13 >> 3] = d7;
    HEAPF64[i13 + 8 >> 3] = d5 - d7 + -2.430840202602477e-10;
    i1 = 4;
    break;
   } else {
    d5 = d2 + 6.2831853069365025;
    d7 = d5 + 2.430840202602477e-10;
    HEAPF64[i13 >> 3] = d7;
    HEAPF64[i13 + 8 >> 3] = d5 - d7 + 2.430840202602477e-10;
    i1 = -4;
    break;
   }
  }
  if (i12 >>> 0 >= 1094263291) {
   if (i12 >>> 0 > 2146435071) {
    d7 = d2 - d2;
    HEAPF64[i13 + 8 >> 3] = d7;
    HEAPF64[i13 >> 3] = d7;
    i1 = 0;
    break;
   }
   HEAP32[tempDoublePtr >> 2] = i1;
   HEAP32[tempDoublePtr + 4 >> 2] = i6 & 1048575 | 1096810496;
   d2 = +HEAPF64[tempDoublePtr >> 3];
   i1 = 0;
   do {
    d7 = +(~~d2 | 0);
    HEAPF64[i8 + (i1 << 3) >> 3] = d7;
    d2 = (d2 - d7) * 16777216.0;
    i1 = i1 + 1 | 0;
   } while ((i1 | 0) != 2);
   HEAPF64[i8 + 16 >> 3] = d2;
   if (d2 == 0.0) {
    i1 = 1;
    while (1) if (+HEAPF64[i8 + (i1 << 3) >> 3] == 0.0) i1 = i1 + -1 | 0; else break;
   } else i1 = 2;
   i1 = ___rem_pio2_large(i8, i9, (i12 >>> 20) + -1046 | 0, i1 + 1 | 0, 1) | 0;
   d3 = +HEAPF64[i9 >> 3];
   d2 = +HEAPF64[i9 + 8 >> 3];
   if (!i10) {
    HEAPF64[i13 >> 3] = d3;
    HEAPF64[i13 + 8 >> 3] = d2;
    break;
   } else {
    HEAPF64[i13 >> 3] = -d3;
    HEAPF64[i13 + 8 >> 3] = -d2;
    i1 = 0 - i1 | 0;
    break;
   }
  } else i11 = 21;
 } while (0);
 if ((i11 | 0) == 21) {
  d5 = d2 * .6366197723675814 + 6755399441055744.0 + -6755399441055744.0;
  i1 = ~~d5;
  d3 = d2 - d5 * 1.5707963267341256;
  d4 = d5 * 6.077100506506192e-11;
  d2 = d3 - d4;
  HEAPF64[i13 >> 3] = d2;
  HEAPF64[tempDoublePtr >> 3] = d2;
  i11 = _bitshift64Lshr(HEAP32[tempDoublePtr >> 2] | 0, HEAP32[tempDoublePtr + 4 >> 2] | 0, 52) | 0;
  i6 = i12 >>> 20;
  if ((i6 - (i11 & 2047) | 0) > 16) {
   d4 = d5 * 6.077100506303966e-11;
   d7 = d3 - d4;
   d4 = d5 * 2.0222662487959506e-21 - (d3 - d7 - d4);
   d2 = d7 - d4;
   HEAPF64[i13 >> 3] = d2;
   HEAPF64[tempDoublePtr >> 3] = d2;
   i12 = _bitshift64Lshr(HEAP32[tempDoublePtr >> 2] | 0, HEAP32[tempDoublePtr + 4 >> 2] | 0, 52) | 0;
   d15 = d5 * 2.0222662487111665e-21;
   d3 = d7 - d15;
   d5 = d5 * 8.4784276603689e-32 - (d7 - d3 - d15);
   if ((i6 - (i12 & 2047) | 0) > 49) {
    d2 = d3 - d5;
    HEAPF64[i13 >> 3] = d2;
    d4 = d5;
   } else d3 = d7;
  }
  HEAPF64[i13 + 8 >> 3] = d3 - d2 - d4;
 }
 STACKTOP = i14;
 return i1 | 0;
}

function _match_in_dir(i23, i2, i24, i25, i17) {
 i23 = i23 | 0;
 i2 = i2 | 0;
 i24 = i24 | 0;
 i25 = i25 | 0;
 i17 = i17 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0, i18 = 0, i19 = 0, i20 = 0, i21 = 0, i22 = 0, i26 = 0, i27 = 0;
 i27 = STACKTOP;
 STACKTOP = STACKTOP + 352 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(352);
 i18 = i27 + 80 | 0;
 i19 = i27 + 76 | 0;
 i20 = i27;
 i1 = (_strlen(i2) | 0) + 1 | 0;
 i26 = _llvm_stacksave() | 0;
 i3 = STACKTOP;
 STACKTOP = STACKTOP + ((1 * i1 | 0) + 15 & -16) | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow((1 * i1 | 0) + 15 & -16 | 0);
 i5 = _strlen(i23) | 0;
 i4 = i24 & 64;
 i15 = (i24 >>> 5 & 4 | i4 >>> 5) ^ 4;
 i1 = _strchr(i2, 47) | 0;
 if (!i1) {
  i3 = i2;
  i14 = 0;
 } else {
  _strcpy(i3, i2) | 0;
  HEAP8[i3 + (i1 - i2) >> 0] = 0;
  while (1) if ((HEAP8[i1 >> 0] | 0) == 47) i1 = i1 + 1 | 0; else {
   i14 = i1;
   break;
  }
 }
 i4 = _is_literal(i3, i4 >>> 6 ^ 1) | 0;
 i1 = HEAP8[i23 >> 0] | 0;
 if (i1 << 24 >> 24 == 47) i5 = (HEAP8[i23 + 1 >> 0] | 0) == 0 ? 0 : i5;
 i13 = _opendir(i1 << 24 >> 24 ? i23 : 28154) | 0;
 i1 = HEAP32[(___errno_location() | 0) >> 2] | 0;
 L9 : do if (!i13) {
  switch (i1 | 0) {
  case 20:
   {
    i1 = 0;
    break L9;
   }
  case 13:
   {
    if (((HEAP8[i3 >> 0] | 0) == 0 ? (_stat(i23, i20) | 0) == 0 : 0) ? (HEAP32[i20 + 12 >> 2] & 61440 | 0) == 16384 : 0) {
     i1 = (_append(i17, i23, i5, i5) | 0) != 0 & 1;
     break L9;
    }
    break;
   }
  default:
   {}
  }
  i1 = (FUNCTION_TABLE_iii[i25 & 63](i23, i1) | 0 | i24 & 1 | 0) == 0;
  i1 = i1 ? 0 : 2;
 } else {
  if (!(HEAP8[i3 >> 0] | 0)) {
   i1 = (_append(i17, i23, i5, i5) | 0) != 0 & 1;
   _closedir(i13) | 0;
   break;
  }
  i1 = _readdir_r(i13, i18, i19) | 0;
  i2 = (i1 | 0) != 0;
  i6 = HEAP32[i19 >> 2] | 0;
  L23 : do if ((i6 | 0) != 0 & (i2 ^ 1)) {
   i12 = i5 + 2 | 0;
   i7 = (i4 | 0) == 0;
   i8 = (i14 | 0) != 0;
   i9 = (i24 & 2 | 0) == 0;
   i10 = i5 + 1 | 0;
   i11 = i20 + 12 | 0;
   i4 = i6;
   L25 : while (1) {
    i1 = i12 + (HEAPU16[i4 + 8 >> 1] | 0) | 0;
    i4 = _llvm_stacksave() | 0;
    i2 = STACKTOP;
    STACKTOP = STACKTOP + ((1 * i1 | 0) + 15 & -16) | 0;
    if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow((1 * i1 | 0) + 15 & -16 | 0);
    i1 = (HEAP32[i19 >> 2] | 0) + 11 | 0;
    if (i7) {
     if (!(_fnmatch(i3, i1, i15) | 0)) i22 = 21;
    } else if (!(_strcmp(i3, i1) | 0)) i22 = 21;
    L30 : do if ((i22 | 0) == 21) {
     i22 = 0;
     L32 : do if (i8 ? (i21 = HEAP8[(HEAP32[i19 >> 2] | 0) + 10 >> 0] | 0, i21 << 24 >> 24) : 0) {
      i1 = (i21 & 255) << 12 & 65535;
      if (i1 << 16 >> 16 < 16384) switch (i1 << 16 >> 16) {
      case -24576:
       break L32;
      default:
       break L30;
      } else switch (i1 << 16 >> 16) {
      case 16384:
       break L32;
      default:
       break L30;
      }
     } while (0);
     if (!(HEAP8[i23 >> 0] | 0)) i2 = (HEAP32[i19 >> 2] | 0) + 11 | 0; else {
      _memcpy(i2 | 0, i23 | 0, i5 | 0) | 0;
      i6 = i2 + i5 | 0;
      HEAP8[i6 >> 0] = 47;
      _strcpy(i6 + 1 | 0, (HEAP32[i19 >> 2] | 0) + 11 | 0) | 0;
     }
     if (i8) {
      i1 = _match_in_dir(i2, i14, i24, i25, i17) | 0;
      if (!i1) break; else {
       i22 = 29;
       break L25;
      }
     }
     do if (i9) i1 = 0; else {
      i1 = HEAP8[(HEAP32[i19 >> 2] | 0) + 10 >> 0] | 0;
      if (i1 << 24 >> 24 ? (i16 = (i1 & 255) << 12 & 61440, (i16 | 0) != 40960) : 0) {
       i1 = (i16 | 0) == 16384;
       break;
      }
      _stat(i2, i20) | 0;
      i1 = (HEAP32[i11 >> 2] & 61440 | 0) == 16384;
     } while (0);
     if (_append(i17, i2, i10 + (HEAPU16[(HEAP32[i19 >> 2] | 0) + 8 >> 1] | 0) | 0, i1 & 1) | 0) {
      i22 = 36;
      break L25;
     }
    } while (0);
    _llvm_stackrestore(i4 | 0);
    i1 = _readdir_r(i13, i18, i19) | 0;
    i2 = (i1 | 0) != 0;
    i4 = HEAP32[i19 >> 2] | 0;
    if (!((i4 | 0) != 0 & (i2 ^ 1))) break L23;
   }
   if ((i22 | 0) == 29) _closedir(i13) | 0; else if ((i22 | 0) == 36) {
    _closedir(i13) | 0;
    i1 = 1;
   }
   _llvm_stackrestore(i4 | 0);
   break L9;
  } while (0);
  _closedir(i13) | 0;
  if (i2 ? FUNCTION_TABLE_iii[i25 & 63](i23, i1) | 0 | i24 & 1 | 0 : 0) {
   i1 = 2;
   break;
  }
  i1 = 0;
 } while (0);
 _llvm_stackrestore(i26 | 0);
 STACKTOP = i27;
 return i1 | 0;
}

function ___udivmoddi4(i5, i6, i8, i11, i13) {
 i5 = i5 | 0;
 i6 = i6 | 0;
 i8 = i8 | 0;
 i11 = i11 | 0;
 i13 = i13 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i7 = 0, i9 = 0, i10 = 0, i12 = 0, i14 = 0, i15 = 0;
 i9 = i5;
 i4 = i6;
 i7 = i4;
 i2 = i8;
 i12 = i11;
 i3 = i12;
 if (!i7) {
  i1 = (i13 | 0) != 0;
  if (!i3) {
   if (i1) {
    HEAP32[i13 >> 2] = (i9 >>> 0) % (i2 >>> 0);
    HEAP32[i13 + 4 >> 2] = 0;
   }
   i12 = 0;
   i13 = (i9 >>> 0) / (i2 >>> 0) >>> 0;
   return (tempRet0 = i12, i13) | 0;
  } else {
   if (!i1) {
    i12 = 0;
    i13 = 0;
    return (tempRet0 = i12, i13) | 0;
   }
   HEAP32[i13 >> 2] = i5 | 0;
   HEAP32[i13 + 4 >> 2] = i6 & 0;
   i12 = 0;
   i13 = 0;
   return (tempRet0 = i12, i13) | 0;
  }
 }
 i1 = (i3 | 0) == 0;
 do if (i2) {
  if (!i1) {
   i1 = (Math_clz32(i3 | 0) | 0) - (Math_clz32(i7 | 0) | 0) | 0;
   if (i1 >>> 0 <= 31) {
    i10 = i1 + 1 | 0;
    i3 = 31 - i1 | 0;
    i6 = i1 - 31 >> 31;
    i2 = i10;
    i5 = i9 >>> (i10 >>> 0) & i6 | i7 << i3;
    i6 = i7 >>> (i10 >>> 0) & i6;
    i1 = 0;
    i3 = i9 << i3;
    break;
   }
   if (!i13) {
    i12 = 0;
    i13 = 0;
    return (tempRet0 = i12, i13) | 0;
   }
   HEAP32[i13 >> 2] = i5 | 0;
   HEAP32[i13 + 4 >> 2] = i4 | i6 & 0;
   i12 = 0;
   i13 = 0;
   return (tempRet0 = i12, i13) | 0;
  }
  i1 = i2 - 1 | 0;
  if (i1 & i2 | 0) {
   i3 = (Math_clz32(i2 | 0) | 0) + 33 - (Math_clz32(i7 | 0) | 0) | 0;
   i15 = 64 - i3 | 0;
   i10 = 32 - i3 | 0;
   i4 = i10 >> 31;
   i14 = i3 - 32 | 0;
   i6 = i14 >> 31;
   i2 = i3;
   i5 = i10 - 1 >> 31 & i7 >>> (i14 >>> 0) | (i7 << i10 | i9 >>> (i3 >>> 0)) & i6;
   i6 = i6 & i7 >>> (i3 >>> 0);
   i1 = i9 << i15 & i4;
   i3 = (i7 << i15 | i9 >>> (i14 >>> 0)) & i4 | i9 << i10 & i3 - 33 >> 31;
   break;
  }
  if (i13 | 0) {
   HEAP32[i13 >> 2] = i1 & i9;
   HEAP32[i13 + 4 >> 2] = 0;
  }
  if ((i2 | 0) == 1) {
   i14 = i4 | i6 & 0;
   i15 = i5 | 0 | 0;
   return (tempRet0 = i14, i15) | 0;
  } else {
   i15 = _llvm_cttz_i32(i2 | 0) | 0;
   i14 = i7 >>> (i15 >>> 0) | 0;
   i15 = i7 << 32 - i15 | i9 >>> (i15 >>> 0) | 0;
   return (tempRet0 = i14, i15) | 0;
  }
 } else {
  if (i1) {
   if (i13 | 0) {
    HEAP32[i13 >> 2] = (i7 >>> 0) % (i2 >>> 0);
    HEAP32[i13 + 4 >> 2] = 0;
   }
   i14 = 0;
   i15 = (i7 >>> 0) / (i2 >>> 0) >>> 0;
   return (tempRet0 = i14, i15) | 0;
  }
  if (!i9) {
   if (i13 | 0) {
    HEAP32[i13 >> 2] = 0;
    HEAP32[i13 + 4 >> 2] = (i7 >>> 0) % (i3 >>> 0);
   }
   i14 = 0;
   i15 = (i7 >>> 0) / (i3 >>> 0) >>> 0;
   return (tempRet0 = i14, i15) | 0;
  }
  i1 = i3 - 1 | 0;
  if (!(i1 & i3)) {
   if (i13 | 0) {
    HEAP32[i13 >> 2] = i5 | 0;
    HEAP32[i13 + 4 >> 2] = i1 & i7 | i6 & 0;
   }
   i14 = 0;
   i15 = i7 >>> ((_llvm_cttz_i32(i3 | 0) | 0) >>> 0);
   return (tempRet0 = i14, i15) | 0;
  }
  i1 = (Math_clz32(i3 | 0) | 0) - (Math_clz32(i7 | 0) | 0) | 0;
  if (i1 >>> 0 <= 30) {
   i6 = i1 + 1 | 0;
   i3 = 31 - i1 | 0;
   i2 = i6;
   i5 = i7 << i3 | i9 >>> (i6 >>> 0);
   i6 = i7 >>> (i6 >>> 0);
   i1 = 0;
   i3 = i9 << i3;
   break;
  }
  if (!i13) {
   i14 = 0;
   i15 = 0;
   return (tempRet0 = i14, i15) | 0;
  }
  HEAP32[i13 >> 2] = i5 | 0;
  HEAP32[i13 + 4 >> 2] = i4 | i6 & 0;
  i14 = 0;
  i15 = 0;
  return (tempRet0 = i14, i15) | 0;
 } while (0);
 if (!i2) {
  i7 = i3;
  i4 = 0;
  i3 = 0;
 } else {
  i10 = i8 | 0 | 0;
  i9 = i12 | i11 & 0;
  i7 = _i64Add(i10 | 0, i9 | 0, -1, -1) | 0;
  i8 = tempRet0;
  i4 = i3;
  i3 = 0;
  do {
   i11 = i4;
   i4 = i1 >>> 31 | i4 << 1;
   i1 = i3 | i1 << 1;
   i11 = i5 << 1 | i11 >>> 31 | 0;
   i12 = i5 >>> 31 | i6 << 1 | 0;
   _i64Subtract(i7 | 0, i8 | 0, i11 | 0, i12 | 0) | 0;
   i15 = tempRet0;
   i14 = i15 >> 31 | ((i15 | 0) < 0 ? -1 : 0) << 1;
   i3 = i14 & 1;
   i5 = _i64Subtract(i11 | 0, i12 | 0, i14 & i10 | 0, (((i15 | 0) < 0 ? -1 : 0) >> 31 | ((i15 | 0) < 0 ? -1 : 0) << 1) & i9 | 0) | 0;
   i6 = tempRet0;
   i2 = i2 - 1 | 0;
  } while ((i2 | 0) != 0);
  i7 = i4;
  i4 = 0;
 }
 i2 = 0;
 if (i13 | 0) {
  HEAP32[i13 >> 2] = i5;
  HEAP32[i13 + 4 >> 2] = i6;
 }
 i14 = (i1 | 0) >>> 31 | (i7 | i2) << 1 | (i2 << 1 | i1 >>> 31) & 0 | i4;
 i15 = (i1 << 1 | 0 >>> 31) & -2 | i3;
 return (tempRet0 = i14, i15) | 0;
}

function _GarbageCollect() {
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i16 = 0;
 i16 = STACKTOP;
 STACKTOP = STACKTOP + 352 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(352);
 i15 = i16;
 i9 = i16 + 336 | 0;
 i12 = i16 + 16 | 0;
 i13 = HEAP32[7044] | 0;
 i14 = HEAP32[7048] | 0;
 HEAP32[7049] = (HEAP32[7049] | 0) + 1;
 HEAP32[i9 >> 2] = 64;
 i10 = i9 + 4 | 0;
 HEAP32[i10 >> 2] = 0;
 i11 = i9 + 8 | 0;
 HEAP32[i11 >> 2] = _malloc(512) | 0;
 _Thread_GetHeapRoots(i9);
 _CLIFile_GetHeapRoots(i9);
 L1 : while (1) {
  i1 = HEAP32[i10 >> 2] | 0;
  while (1) {
   i2 = HEAP32[i11 >> 2] | 0;
   if (!i1) break L1;
   i6 = i1 + -1 | 0;
   i1 = i2 + (i6 << 3) | 0;
   i8 = HEAP32[i1 >> 2] | 0;
   i6 = i2 + (i6 << 3) + 4 | 0;
   i7 = HEAP32[i6 >> 2] | 0;
   HEAP32[i1 >> 2] = 0;
   HEAP32[i6 >> 2] = 0;
   i6 = 0;
   i1 = 0;
   while (1) {
    if ((i6 | 0) == (i8 | 0)) break;
    i3 = HEAP32[i7 + (i6 << 2) >> 2] | 0;
    L9 : do if (i3) {
     i2 = 28188;
     while (1) {
      i5 = HEAP32[i2 >> 2] | 0;
      if ((i5 | 0) == (HEAP32[7046] | 0)) break L9;
      if (i3 >>> 0 >= i5 >>> 0) if (i3 >>> 0 > (i5 + (_GetSize(i5) | 0) + 20 | 0) >>> 0) i2 = 1; else break; else i2 = 0;
      i2 = i5 + (i2 << 2) | 0;
     }
     i2 = i5 + 9 | 0;
     if (!(HEAP8[i2 >> 0] | 0)) {
      i4 = HEAP32[i5 + 12 >> 2] | 0;
      HEAP8[i2 >> 0] = 1;
      switch (HEAP8[i4 + 35 >> 0] | 0) {
      case 4:
      case 7:
      case 5:
       break;
      default:
       break L9;
      }
      i2 = HEAP32[8595] | 0;
      if ((i4 | 0) != (HEAP32[i2 + 36 >> 2] | 0)) {
       i3 = HEAP32[i4 + 96 >> 2] | 0;
       if (i3 | 0) switch (HEAP8[i3 + 35 >> 0] | 0) {
       case 4:
       case 7:
       case 5:
        break;
       default:
        break L9;
       }
       if ((i4 | 0) != (HEAP32[i2 + 144 >> 2] | 0)) {
        _Heap_SetRoots(i9, i5 + 20 | 0, _GetSize(i5) | 0);
        i1 = 1;
       }
      }
     }
    } while (0);
    i6 = i6 + 1 | 0;
   }
   if (i1 | 0) continue L1;
   i1 = (HEAP32[i10 >> 2] | 0) + -1 | 0;
   HEAP32[i10 >> 2] = i1;
  }
 }
 _free(i2);
 HEAP32[i12 >> 2] = HEAP32[7047];
 i3 = 1;
 i1 = 0;
 while (1) {
  if (!i3) break;
  i5 = i3 + -1 | 0;
  i6 = i12 + (i5 << 2) | 0;
  i7 = HEAP32[i6 >> 2] | 0;
  i2 = i7 + 9 | 0;
  L31 : do switch (HEAP8[i2 >> 0] | 0) {
  case 0:
   {
    i2 = i7 + 10 | 0;
    switch (HEAP8[i2 >> 0] | 0) {
    case 0:
     break;
    case 1:
     {
      _AddFinalizer(i7 + 20 | 0);
      HEAP8[i2 >> 0] = 2;
      i2 = i7 + 16 | 0;
      if (!(HEAP32[i2 >> 2] | 0)) break L31;
      _RemoveWeakRefTarget(i7, 0);
      _free(HEAP32[i2 >> 2] | 0);
      break L31;
     }
    default:
     break L31;
    }
    i2 = i7 + 16 | 0;
    if (HEAP32[i2 >> 2] | 0) {
     _RemoveWeakRefTarget(i7, 1);
     _free(HEAP32[i2 >> 2] | 0);
    }
    HEAP32[i2 >> 2] = i1;
    i1 = i7;
    break;
   }
  case -1:
   break;
  default:
   HEAP8[i2 >> 0] = 0;
  } while (0);
  i2 = HEAP32[i7 + 4 >> 2] | 0;
  i4 = HEAP32[7046] | 0;
  if ((i2 | 0) == (i4 | 0)) i3 = i5; else HEAP32[i6 >> 2] = i2;
  i2 = HEAP32[i7 >> 2] | 0;
  if ((i2 | 0) == (i4 | 0)) continue;
  HEAP32[i12 + (i3 << 2) >> 2] = i2;
  i3 = i3 + 1 | 0;
 }
 while (1) {
  if (!i1) break;
  i12 = HEAP32[i1 + 16 >> 2] | 0;
  HEAP32[7047] = _TreeRemove(HEAP32[7047] | 0, i1) | 0;
  HEAP32[7048] = (HEAP32[7048] | 0) + -1;
  i11 = _GetSize(i1) | 0;
  HEAP32[7044] = -20 - i11 + (HEAP32[7044] | 0);
  _free(i1);
  i1 = i12;
 }
 i11 = HEAP32[7044] | 0;
 i12 = HEAP32[7048] | 0;
 HEAP32[i15 >> 2] = i13;
 HEAP32[i15 + 4 >> 2] = i11;
 HEAP32[i15 + 8 >> 2] = i14;
 HEAP32[i15 + 12 >> 2] = i12;
 _log_f(1, 12206, i15);
 STACKTOP = i16;
 return;
}

function _PInvoke_Call(i1, i16, i27, i2) {
 i1 = i1 | 0;
 i16 = i16 | 0;
 i27 = i27 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0, i17 = 0, i18 = 0, i19 = 0, i20 = 0, i21 = 0, i22 = 0, i23 = 0, i24 = 0, i25 = 0, i26 = 0, i28 = 0, i29 = 0, i30 = 0;
 i30 = STACKTOP;
 STACKTOP = STACKTOP + 160 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(160);
 i29 = i30 + 16 | 0;
 i22 = i30 + 8 | 0;
 i21 = i30;
 i20 = i30 + 88 | 0;
 i24 = i30 + 24 | 0;
 i3 = i1 + 8 | 0;
 i4 = HEAP32[i3 >> 2] | 0;
 i28 = HEAP32[i4 + 44 >> 2] | 0;
 i26 = HEAP32[i1 + 12 >> 2] | 0;
 i15 = HEAP32[i1 + 4 >> 2] | 0;
 i17 = i2 + 12 | 0;
 i18 = HEAP32[i17 >> 2] | 0;
 HEAP32[i17 >> 2] = i18 | 64;
 i19 = (i28 | 0) == 0;
 if (!i19) {
  i1 = HEAP32[8595] | 0;
  if ((i28 | 0) == (HEAP32[i1 + 88 >> 2] | 0)) i1 = 61; else i1 = (i28 | 0) == (HEAP32[i1 + 92 >> 2] | 0) ? 62 : 63;
 } else i1 = 63;
 HEAP32[i20 >> 2] = _MetaData_GetModuleRefName(HEAP32[i4 + 4 >> 2] | 0, HEAP32[i26 + 12 >> 2] | 0) | 0;
 i14 = i20 + 4 | 0;
 HEAP32[i14 >> 2] = HEAP32[(HEAP32[i3 >> 2] | 0) + 16 >> 2];
 i13 = HEAPU16[i4 + 34 >> 1] | 0;
 i11 = i4 + 36 | 0;
 i10 = 0;
 i4 = 2;
 i2 = 0;
 i12 = 0;
 L5 : while (1) {
  if ((i10 | 0) == (i13 | 0)) break;
  i3 = HEAP32[(HEAP32[i11 >> 2] | 0) + (i10 * 12 | 0) >> 2] | 0;
  i9 = i2 + 4 | 0;
  i8 = i4 + 1 | 0;
  i7 = i20 + (i4 << 2) | 0;
  i5 = i16 + i2 | 0;
  do if ((HEAP8[i3 + 35 >> 0] | 0) != 1) {
   i6 = HEAP32[8595] | 0;
   if ((i3 | 0) == (HEAP32[i6 + 36 >> 2] | 0)) {
    i2 = HEAP32[i5 >> 2] | 0;
    if ((HEAP16[i26 >> 1] & 6) == 4) i2 = _ConvertStringToUnicode(i2) | 0; else i2 = _ConvertStringToANSI(i2) | 0;
    HEAP32[i24 + (i12 << 2) >> 2] = i2;
    HEAP32[i7 >> 2] = i2;
    i5 = 3;
    i4 = i8;
    i2 = i9;
    i3 = i12 + 1 | 0;
    break;
   }
   if ((i3 | 0) == (HEAP32[i6 + 40 >> 2] | 0)) {
    HEAP32[i7 >> 2] = HEAP32[i5 >> 2];
    i5 = 3;
    i4 = i8;
    i2 = i9;
    i3 = i12;
    break;
   }
   if ((i3 | 0) == (HEAP32[i6 + 88 >> 2] | 0)) {
    i5 = 1;
    i2 = i9;
    i3 = i12;
   } else {
    if ((i3 | 0) != (HEAP32[i6 + 92 >> 2] | 0)) {
     i23 = 18;
     break L5;
    }
    i5 = 2;
    i2 = i2 + 8 | 0;
    i3 = i12;
   }
  } else {
   HEAP32[i7 >> 2] = HEAP32[i5 >> 2];
   i5 = 3;
   i4 = i8;
   i2 = i9;
   i3 = i12;
  } while (0);
  i9 = i5 << (i10 << 1) + 6 | i1;
  i10 = i10 + 1 | 0;
  i12 = i3;
  i1 = i9;
 }
 if ((i23 | 0) == 18) {
  HEAP32[i21 >> 2] = HEAP32[i3 + 12 >> 2];
  _Crash(16229, i21);
 }
 if ((i1 | 0) != 255) {
  HEAP32[i22 >> 2] = i1;
  _Crash(16280, i22);
 }
 i3 = FUNCTION_TABLE_iiii[i15 & 255](HEAP32[i20 >> 2] | 0, HEAP32[i14 >> 2] | 0, HEAP32[i20 + 8 >> 2] | 0) | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i12 | 0)) break;
  _free(HEAP32[i24 + (i1 << 2) >> 2] | 0);
  i1 = i1 + 1 | 0;
 }
 HEAP32[i17 >> 2] = i18;
 do if (!i19) {
  if ((HEAP8[i28 + 35 >> 0] | 0) == 1) {
   HEAP32[i27 >> 2] = i3;
   i25 = 4;
   break;
  }
  i1 = HEAP32[8595] | 0;
  i2 = i3;
  if ((i28 | 0) == (HEAP32[i1 + 36 >> 2] | 0)) if ((HEAP16[i26 >> 1] & 6) == 4) {
   HEAP32[i27 >> 2] = _SystemString_FromCharPtrUTF16(i3) | 0;
   i25 = 4;
   break;
  } else {
   HEAP32[i27 >> 2] = _SystemString_FromCharPtrASCII(i2) | 0;
   i25 = 4;
   break;
  }
  if ((i28 | 0) == (HEAP32[i1 + 40 >> 2] | 0)) {
   HEAP32[i27 >> 2] = i2;
   i25 = 4;
   break;
  }
  if ((i28 | 0) != (HEAP32[i1 + 88 >> 2] | 0) ? (i28 | 0) != (HEAP32[i1 + 92 >> 2] | 0) : 0) {
   HEAP32[i29 >> 2] = HEAP32[i28 + 12 >> 2];
   _Crash(16376, i29);
  } else i25 = 8;
 } else i25 = 0; while (0);
 STACKTOP = i30;
 return i25 | 0;
}

function _CreateNewArrayType(i3, i4) {
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i6 = i7;
 i5 = i7 + 8 | 0;
 HEAP32[i5 >> 2] = i4;
 i1 = HEAP32[8595] | 0;
 i2 = HEAP32[i1 + 4 >> 2] | 0;
 if (!(HEAP8[i2 + 32 >> 0] | 0)) {
  _MetaData_Fill_TypeDef_(i2, 0, 0);
  i1 = HEAP32[8595] | 0;
 }
 _memcpy(i3 | 0, HEAP32[i1 + 4 >> 2] | 0, 132) | 0;
 HEAP32[i3 + 96 >> 2] = i4;
 HEAP8[i3 + 32 >> 0] = 1;
 if (!(HEAP8[37100] | 0)) _GetMethodDefs();
 i8 = i3 + 72 | 0;
 i4 = HEAP32[i8 >> 2] | 0;
 i1 = i4 + 3 | 0;
 HEAP32[i8 >> 2] = i1;
 i1 = _mallocForever(i1 * 12 | 0) | 0;
 i8 = i3 + 76 | 0;
 _memcpy(i1 | 0, HEAP32[i8 >> 2] | 0, i4 * 12 | 0) | 0;
 HEAP32[i8 >> 2] = i1;
 i8 = _Generics_GetGenericTypeFromCoreType(HEAP32[(HEAP32[8595] | 0) + 68 >> 2] | 0, 1, i5) | 0;
 HEAP32[i1 + (i4 * 12 | 0) >> 2] = i8;
 HEAP32[i1 + (i4 * 12 | 0) + 4 >> 2] = 0;
 i2 = i1 + (i4 * 12 | 0) + 8 | 0;
 HEAP32[i2 >> 2] = _mallocForever(HEAP32[i8 + 48 >> 2] << 2) | 0;
 i8 = _Generics_GetMethodDefFromCoreMethod(HEAP32[8597] | 0, i3, 1, i5) | 0;
 HEAP32[HEAP32[i2 >> 2] >> 2] = i8;
 i2 = i4 + 1 | 0;
 i8 = _Generics_GetGenericTypeFromCoreType(HEAP32[(HEAP32[8595] | 0) + 72 >> 2] | 0, 1, i5) | 0;
 HEAP32[i1 + (i2 * 12 | 0) >> 2] = i8;
 HEAP32[i1 + (i2 * 12 | 0) + 4 >> 2] = 0;
 i8 = _mallocForever(HEAP32[i8 + 48 >> 2] << 2) | 0;
 i2 = i1 + (i2 * 12 | 0) + 8 | 0;
 HEAP32[i2 >> 2] = i8;
 HEAP32[i8 >> 2] = HEAP32[8598];
 HEAP32[(HEAP32[i2 >> 2] | 0) + 4 >> 2] = HEAP32[8599];
 i8 = _Generics_GetMethodDefFromCoreMethod(HEAP32[8600] | 0, i3, 1, i5) | 0;
 HEAP32[(HEAP32[i2 >> 2] | 0) + 8 >> 2] = i8;
 HEAP32[(HEAP32[i2 >> 2] | 0) + 12 >> 2] = HEAP32[8601];
 i8 = _Generics_GetMethodDefFromCoreMethod(HEAP32[8602] | 0, i3, 1, i5) | 0;
 HEAP32[(HEAP32[i2 >> 2] | 0) + 16 >> 2] = i8;
 i8 = _Generics_GetMethodDefFromCoreMethod(HEAP32[8603] | 0, i3, 1, i5) | 0;
 HEAP32[(HEAP32[i2 >> 2] | 0) + 20 >> 2] = i8;
 i8 = _Generics_GetMethodDefFromCoreMethod(HEAP32[8604] | 0, i3, 1, i5) | 0;
 HEAP32[(HEAP32[i2 >> 2] | 0) + 24 >> 2] = i8;
 i4 = i4 + 2 | 0;
 i2 = _Generics_GetGenericTypeFromCoreType(HEAP32[(HEAP32[8595] | 0) + 76 >> 2] | 0, 1, i5) | 0;
 HEAP32[i1 + (i4 * 12 | 0) >> 2] = i2;
 HEAP32[i1 + (i4 * 12 | 0) + 4 >> 2] = 0;
 i4 = i1 + (i4 * 12 | 0) + 8 | 0;
 HEAP32[i4 >> 2] = _mallocForever(HEAP32[i2 + 48 >> 2] << 2) | 0;
 i2 = _Generics_GetMethodDefFromCoreMethod(HEAP32[8605] | 0, i3, 1, i5) | 0;
 HEAP32[HEAP32[i4 >> 2] >> 2] = i2;
 i2 = _Generics_GetMethodDefFromCoreMethod(HEAP32[8606] | 0, i3, 1, i5) | 0;
 HEAP32[(HEAP32[i4 >> 2] | 0) + 4 >> 2] = i2;
 HEAP32[(HEAP32[i4 >> 2] | 0) + 8 >> 2] = HEAP32[8607];
 i2 = _Generics_GetMethodDefFromCoreMethod(HEAP32[8608] | 0, i3, 1, i5) | 0;
 HEAP32[(HEAP32[i4 >> 2] | 0) + 12 >> 2] = i2;
 i3 = _Generics_GetMethodDefFromCoreMethod(HEAP32[8609] | 0, i3, 1, i5) | 0;
 HEAP32[(HEAP32[i4 >> 2] | 0) + 16 >> 2] = i3;
 i4 = HEAP32[i5 >> 2] | 0;
 i5 = HEAP32[i4 + 12 >> 2] | 0;
 HEAP32[i6 >> 2] = HEAP32[i4 + 16 >> 2];
 HEAP32[i6 + 4 >> 2] = i5;
 _log_f(2, 18507, i6);
 STACKTOP = i7;
 return;
}

function _Generics_GetGenericTypeFromCoreType(i9, i10, i11) {
 i9 = i9 | 0;
 i10 = i10 | 0;
 i11 = i11 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0;
 i14 = STACKTOP;
 STACKTOP = STACKTOP + 2064 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(2064);
 i8 = i14 + 8 | 0;
 i7 = i14;
 i12 = i14 + 16 | 0;
 i6 = HEAP32[i9 + 4 >> 2] | 0;
 if (!(HEAP8[i9 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i9, 0, 0);
 i2 = i9 + 84 | 0;
 i3 = i10 << 2;
 i1 = i2;
 while (1) {
  i1 = HEAP32[i1 >> 2] | 0;
  if (!i1) {
   i13 = 9;
   break;
  }
  if ((HEAP32[i1 + 8 >> 2] | 0) == (i10 | 0) ? (_memcmp(i1 + 12 | 0, i11, i3) | 0) == 0 : 0) {
   i13 = 7;
   break;
  }
  i1 = i1 + 4 | 0;
 }
 if ((i13 | 0) == 7) i1 = HEAP32[i1 >> 2] | 0; else if ((i13 | 0) == 9) {
  i4 = _mallocForever(i3 + 12 | 0) | 0;
  HEAP32[i4 + 4 >> 2] = HEAP32[i2 >> 2];
  HEAP32[i2 >> 2] = i4;
  HEAP32[i4 + 8 >> 2] = i10;
  i5 = i4 + 12 | 0;
  _memcpy(i5 | 0, i11 | 0, i3 | 0) | 0;
  i1 = _mallocForever(132) | 0;
  HEAP32[i4 >> 2] = i1;
  _memset(i1 | 0, 0, 132) | 0;
  _strcpy(i12, HEAP32[i9 + 12 >> 2] | 0) | 0;
  i4 = i12 + (_strlen(i12) | 0) | 0;
  HEAP8[i4 >> 0] = 91;
  HEAP8[i4 + 1 >> 0] = 0;
  i4 = 0;
  while (1) {
   if ((i4 | 0) == (i10 | 0)) break;
   if (i4 | 0) {
    i3 = i12 + (_strlen(i12) | 0) | 0;
    HEAP8[i3 >> 0] = 44;
    HEAP8[i3 + 1 >> 0] = 0;
   }
   i2 = HEAP32[i11 + (i4 << 2) >> 2] | 0;
   do if (!i2) {
    i2 = _FindGenericParam(i9, i4) | 0;
    i3 = i12 + (_strlen(i12) | 0) | 0;
    if (!i2) {
     HEAP8[i3 >> 0] = 63;
     HEAP8[i3 + 1 >> 0] = 63;
     HEAP8[i3 + 2 >> 0] = 63;
     HEAP8[i3 + 3 >> 0] = 0;
     break;
    } else {
     _sprintf(i3, HEAP32[i2 + 8 >> 2] | 0, i8) | 0;
     break;
    }
   } else {
    i3 = i12 + (_strlen(i12) | 0) | 0;
    i15 = HEAP32[i2 + 12 >> 2] | 0;
    HEAP32[i7 >> 2] = HEAP32[i2 + 16 >> 2];
    HEAP32[i7 + 4 >> 2] = i15;
    _sprintf(i3, 12200, i7) | 0;
   } while (0);
   i4 = i4 + 1 | 0;
  }
  i2 = i12 + (_strlen(i12) | 0) | 0;
  HEAP8[i2 >> 0] = 93;
  HEAP8[i2 + 1 >> 0] = 0;
  HEAP32[i1 >> 2] = i1;
  HEAP32[i1 + 4 >> 2] = i6;
  HEAP32[i1 + 8 >> 2] = HEAP32[i9 + 8 >> 2];
  HEAP32[i1 + 88 >> 2] = i9;
  i2 = 0;
  while (1) {
   if (i2 >>> 0 >= i10 >>> 0) break;
   if (!(HEAP32[i11 + (i2 << 2) >> 2] | 0)) {
    i13 = 22;
    break;
   } else i2 = i2 + 1 | 0;
  }
  if ((i13 | 0) == 22) HEAP8[i1 + 57 >> 0] = 1;
  HEAP32[i1 + 16 >> 2] = HEAP32[i9 + 16 >> 2];
  i15 = _mallocForever((_strlen(i12) | 0) + 1 | 0) | 0;
  HEAP32[i1 + 12 >> 2] = i15;
  _strcpy(i15, i12) | 0;
  HEAP32[i1 + 92 >> 2] = i5;
  HEAP32[i1 + 20 >> 2] = HEAP32[i9 + 20 >> 2];
  HEAP32[i1 + 80 >> 2] = HEAP32[i9 + 80 >> 2];
  HEAP32[i1 + 24 >> 2] = HEAP32[i9 + 24 >> 2];
  HEAP32[i1 + 28 >> 2] = HEAP32[i9 + 28 >> 2];
  HEAP32[i1 + 100 >> 2] = HEAP32[i9 + 100 >> 2];
  HEAP32[i1 + 112 >> 2] = HEAP32[i9 + 112 >> 2];
  HEAP32[i1 + 48 >> 2] = HEAP32[i9 + 48 >> 2];
  HEAP32[i1 + 120 >> 2] = HEAP32[i9 + 120 >> 2];
  HEAP8[i1 + 58 >> 0] = 1;
  _MetaData_Fill_TypeDef_(i1, i11, 0);
 }
 STACKTOP = i14;
 return i1 | 0;
}

function _pat_next(i6, i7, i8, i2) {
 i6 = i6 | 0;
 i7 = i7 | 0;
 i8 = i8 | 0;
 i2 = i2 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i5 = 0, i9 = 0, i10 = 0;
 i10 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i10;
 L1 : do if ((i7 | 0) != 0 ? (HEAP8[i6 >> 0] | 0) != 0 : 0) {
  HEAP32[i8 >> 2] = 1;
  i1 = HEAP8[i6 >> 0] | 0;
  switch (i1 << 24 >> 24) {
  case 42:
   {
    i1 = -5;
    break L1;
   }
  case 92:
   {
    i1 = i6 + 1 | 0;
    if ((i2 & 2 | 0) == 0 & (HEAP8[i1 >> 0] | 0) != 0) {
     HEAP32[i8 >> 2] = 2;
     i2 = i1;
     i3 = 1;
     i1 = HEAP8[i1 >> 0] | 0;
     i9 = 30;
    } else i1 = 92;
    break;
   }
  case 91:
   {
    L8 : do if (i7 >>> 0 > 1) {
     switch (HEAP8[i6 + 1 >> 0] | 0) {
     case 33:
     case 94:
      break;
     default:
      {
       i1 = 1;
       break L8;
      }
     }
     i1 = 2;
    } else i1 = 1; while (0);
    if (i1 >>> 0 < i7 >>> 0) i1 = ((HEAP8[i6 + i1 >> 0] | 0) == 93 & 1) + i1 | 0;
    L15 : do if (i1 >>> 0 < i7 >>> 0) while (1) {
     i2 = HEAP8[i6 + i1 >> 0] | 0;
     switch (i2 << 24 >> 24) {
     case 93:
     case 0:
      {
       i2 = i1;
       i9 = 26;
       break L15;
      }
     default:
      {}
     }
     i3 = i1 + 1 | 0;
     L19 : do if (i3 >>> 0 < i7 >>> 0 ? (i5 = HEAP8[i6 + i3 >> 0] | 0, i2 << 24 >> 24 == 91 & i5 << 24 >> 24 != 0) : 0) {
      switch (i5 << 24 >> 24) {
      case 61:
      case 46:
      case 58:
       break;
      default:
       break L19;
      }
      i2 = i1 + 2 | 0;
      if (i2 >>> 0 < i7 >>> 0) i1 = (HEAP8[i6 + i2 >> 0] | 0) == 0 ? i2 : i1 + 3 | 0; else i1 = i2;
      L26 : do if (i1 >>> 0 < i7 >>> 0) do {
       i2 = HEAP8[i6 + i1 >> 0] | 0;
       if (!(i2 << 24 >> 24)) break L26;
       if (!(i2 << 24 >> 24 != 93 ? 1 : (HEAP8[i6 + (i1 + -1) >> 0] | 0) != i5 << 24 >> 24)) break L26;
       i1 = i1 + 1 | 0;
      } while (i1 >>> 0 < i7 >>> 0); while (0);
      if ((i1 | 0) == (i7 | 0)) {
       i1 = 91;
       i2 = 1;
       break L15;
      }
      if (!(HEAP8[i6 + i1 >> 0] | 0)) {
       i2 = i1;
       i9 = 26;
       break L15;
      }
     } while (0);
     i1 = i1 + 1 | 0;
     if (i1 >>> 0 >= i7 >>> 0) {
      i2 = i1;
      i9 = 26;
      break L15;
     }
    } else {
     i2 = i1;
     i9 = 26;
    } while (0);
    if ((i9 | 0) == 26) if ((i2 | 0) == (i7 | 0)) {
     i1 = 91;
     i2 = 1;
    } else {
     i7 = (HEAP8[i6 + i2 >> 0] | 0) == 0;
     i1 = i7 ? 91 : -3;
     i2 = i7 ? 1 : i2 + 1 | 0;
    }
    HEAP32[i8 >> 2] = i2;
    break L1;
   }
  case 63:
   {
    i1 = -4;
    break L1;
   }
  default:
   {
    i2 = i6;
    i3 = 0;
    i9 = 30;
   }
  }
  if ((i9 | 0) == 30) if (i1 << 24 >> 24 < 0) {
   i1 = _mbtowc(i4, i2, i7) | 0;
   if ((i1 | 0) < 0) {
    HEAP32[i8 >> 2] = 0;
    i1 = -2;
   } else {
    HEAP32[i8 >> 2] = i1 + i3;
    i1 = HEAP32[i4 >> 2] | 0;
   }
   break;
  }
  i1 = i1 << 24 >> 24;
 } else i9 = 3; while (0);
 if ((i9 | 0) == 3) {
  HEAP32[i8 >> 2] = 0;
  i1 = 0;
 }
 STACKTOP = i10;
 return i1 | 0;
}

function _match_bracket(i1, i6, i7) {
 i1 = i1 | 0;
 i6 = i6 | 0;
 i7 = i7 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0;
 i12 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i8 = i12 + 16 | 0;
 i9 = i12;
 i2 = i1 + 1 | 0;
 i3 = HEAP8[i2 >> 0] | 0;
 switch (i3 << 24 >> 24) {
 case 33:
 case 94:
  {
   i3 = i1 + 2 | 0;
   i2 = i3;
   i1 = 1;
   i3 = HEAP8[i3 >> 0] | 0;
   break;
  }
 default:
  i1 = 0;
 }
 L4 : do switch (i3 << 24 >> 24) {
 case 93:
  if ((i6 | 0) == 93) {
   i1 = i1 ^ 1;
   break L4;
  } else {
   i2 = i2 + 1 | 0;
   i11 = 10;
   break L4;
  }
 case 45:
  if ((i6 | 0) == 45) {
   i1 = i1 ^ 1;
   break L4;
  } else {
   i2 = i2 + 1 | 0;
   i11 = 10;
   break L4;
  }
 default:
  i11 = 10;
 } while (0);
 L13 : do if ((i11 | 0) == 10) {
  HEAP32[i8 >> 2] = HEAP8[i2 + -1 >> 0];
  L15 : while (1) {
   i4 = HEAP8[i2 >> 0] | 0;
   L17 : do switch (i4 << 24 >> 24) {
   case 93:
    break L13;
   case 45:
    {
     i3 = i2 + 1 | 0;
     if ((HEAP8[i3 >> 0] | 0) == 93) i11 = 31; else {
      i3 = _mbtowc(i9, i3, 4) | 0;
      if ((i3 | 0) < 0) {
       i1 = 0;
       break L15;
      }
      i4 = HEAP32[i8 >> 2] | 0;
      i5 = HEAP32[i9 >> 2] | 0;
      if ((i5 | 0) >= (i4 | 0) ? (i5 = i5 - i4 | 0, !((i6 - i4 | 0) >>> 0 > i5 >>> 0 & (i7 - i4 | 0) >>> 0 > i5 >>> 0)) : 0) {
       i11 = 16;
       break L15;
      }
      i2 = i2 + (i3 + -1) | 0;
     }
     break;
    }
   case 91:
    {
     i5 = HEAP8[i2 + 1 >> 0] | 0;
     switch (i5 << 24 >> 24) {
     case 61:
     case 46:
     case 58:
      break;
     default:
      {
       i11 = 31;
       break L17;
      }
     }
     i3 = i2 + 3 | 0;
     while (1) {
      i4 = i3 + -1 | 0;
      if ((HEAP8[i4 >> 0] | 0) == i5 << 24 >> 24 ? (HEAP8[i3 >> 0] | 0) == 93 : 0) break;
      i3 = i3 + 1 | 0;
     }
     i2 = i2 + 2 | 0;
     if (i5 << 24 >> 24 == 58 ? (i10 = i4 - i2 | 0, (i10 | 0) < 16) : 0) {
      _memcpy(i9 | 0, i2 | 0, i10 | 0) | 0;
      HEAP8[i9 + i10 >> 0] = 0;
      if (_iswctype(i6, _wctype(i9) | 0) | 0) {
       i11 = 29;
       break L15;
      }
      if (_iswctype(i7, _wctype(i9) | 0) | 0) {
       i11 = 29;
       break L15;
      }
      i2 = i3;
     } else i2 = i3;
     break;
    }
   default:
    if (i4 << 24 >> 24 > -1) i11 = 31; else {
     i3 = _mbtowc(i8, i2, 4) | 0;
     if ((i3 | 0) < 0) {
      i1 = 0;
      break L13;
     }
     i2 = i2 + (i3 + -1) | 0;
     i3 = HEAP32[i8 >> 2] | 0;
     i11 = 34;
    }
   } while (0);
   if ((i11 | 0) == 31) {
    i3 = i4 & 255;
    HEAP32[i8 >> 2] = i3;
    i11 = 34;
   }
   if ((i11 | 0) == 34) {
    i11 = 0;
    if ((i3 | 0) == (i6 | 0) | (i3 | 0) == (i7 | 0)) {
     i11 = 35;
     break;
    }
   }
   i2 = i2 + 1 | 0;
  }
  if ((i11 | 0) == 16) i1 = i1 ^ 1; else if ((i11 | 0) == 29) {
   i1 = i1 ^ 1;
   break;
  } else if ((i11 | 0) == 35) {
   i1 = i1 ^ 1;
   break;
  }
 } while (0);
 STACKTOP = i12;
 return i1 | 0;
}

function _fcntl(i15, i2, i1) {
 i15 = i15 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i16 = 0, i17 = 0, i18 = 0;
 i17 = STACKTOP;
 STACKTOP = STACKTOP + 192 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(192);
 i7 = i17 + 152 | 0;
 i6 = i17 + 136 | 0;
 i16 = i17 + 120 | 0;
 i14 = i17 + 104 | 0;
 i13 = i17 + 96 | 0;
 i10 = i17 + 80 | 0;
 i9 = i17 + 64 | 0;
 i4 = i17 + 48 | 0;
 i11 = i17 + 32 | 0;
 i5 = i17 + 16 | 0;
 i3 = i17;
 i18 = i17 + 176 | 0;
 i8 = i17 + 168 | 0;
 HEAP32[i18 >> 2] = i1;
 i1 = (HEAP32[i18 >> 2] | 0) + (4 - 1) & ~(4 - 1);
 i12 = HEAP32[i1 >> 2] | 0;
 HEAP32[i18 >> 2] = i1 + 4;
 i12 = (i2 | 0) == 4 ? i12 | 32768 : i12;
 switch (i2 | 0) {
 case 14:
  {
   HEAP32[i3 >> 2] = i15;
   HEAP32[i3 + 4 >> 2] = 14;
   HEAP32[i3 + 8 >> 2] = i12;
   i1 = ___syscall_ret(___syscall221(221, i3 | 0) | 0) | 0;
   break;
  }
 case 9:
  {
   HEAP32[i5 >> 2] = i15;
   HEAP32[i5 + 4 >> 2] = 16;
   HEAP32[i5 + 8 >> 2] = i8;
   i1 = ___syscall221(221, i5 | 0) | 0;
   switch (i1 | 0) {
   case -22:
    {
     HEAP32[i11 >> 2] = i15;
     HEAP32[i11 + 4 >> 2] = 9;
     HEAP32[i11 + 8 >> 2] = i12;
     i1 = ___syscall221(221, i11 | 0) | 0;
     break;
    }
   case 0:
    {
     i1 = HEAP32[i8 + 4 >> 2] | 0;
     i1 = (HEAP32[i8 >> 2] | 0) == 2 ? 0 - i1 | 0 : i1;
     break;
    }
   default:
    i1 = ___syscall_ret(i1) | 0;
   }
   break;
  }
 case 1030:
  {
   HEAP32[i4 >> 2] = i15;
   HEAP32[i4 + 4 >> 2] = 1030;
   HEAP32[i4 + 8 >> 2] = i12;
   i1 = ___syscall221(221, i4 | 0) | 0;
   do if ((i1 | 0) == -22) {
    HEAP32[i10 >> 2] = i15;
    HEAP32[i10 + 4 >> 2] = 1030;
    HEAP32[i10 + 8 >> 2] = 0;
    i1 = ___syscall221(221, i10 | 0) | 0;
    if ((i1 | 0) == -22) {
     HEAP32[i14 >> 2] = i15;
     HEAP32[i14 + 4 >> 2] = 0;
     HEAP32[i14 + 8 >> 2] = i12;
     i1 = ___syscall221(221, i14 | 0) | 0;
     if ((i1 | 0) <= -1) break;
     HEAP32[i16 >> 2] = i1;
     HEAP32[i16 + 4 >> 2] = 2;
     HEAP32[i16 + 8 >> 2] = 1;
     ___syscall221(221, i16 | 0) | 0;
     break;
    } else {
     if ((i1 | 0) <= -1) {
      i1 = -22;
      break;
     }
     HEAP32[i13 >> 2] = i1;
     ___syscall6(6, i13 | 0) | 0;
     i1 = -22;
     break;
    }
   } else if ((i1 | 0) > -1) {
    HEAP32[i9 >> 2] = i1;
    HEAP32[i9 + 4 >> 2] = 2;
    HEAP32[i9 + 8 >> 2] = 1;
    ___syscall221(221, i9 | 0) | 0;
   } while (0);
   i1 = ___syscall_ret(i1) | 0;
   break;
  }
 case 15:
 case 16:
 case 12:
 case 13:
  {
   HEAP32[i6 >> 2] = i15;
   HEAP32[i6 + 4 >> 2] = i2;
   HEAP32[i6 + 8 >> 2] = i12;
   i1 = ___syscall_ret(___syscall221(221, i6 | 0) | 0) | 0;
   break;
  }
 default:
  {
   HEAP32[i7 >> 2] = i15;
   HEAP32[i7 + 4 >> 2] = i2;
   HEAP32[i7 + 8 >> 2] = i12;
   i1 = ___syscall_ret(___syscall221(221, i7 | 0) | 0) | 0;
  }
 }
 STACKTOP = i17;
 return i1 | 0;
}

function _glob(i6, i12, i5, i13) {
 i6 = i6 | 0;
 i12 = i12 | 0;
 i5 = i5 | 0;
 i13 = i13 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i14 = 0;
 i14 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i11 = i14;
 i8 = i14 + 8 | 0;
 i9 = i11;
 HEAP32[i9 >> 2] = 0;
 HEAP32[i9 + 4 >> 2] = 0;
 HEAP32[i8 >> 2] = i11;
 if (!(i12 & 8)) i2 = 0; else i2 = HEAP32[i13 + 8 >> 2] | 0;
 i3 = HEAP8[i6 >> 0] | 0;
 if (i3 << 24 >> 24 == 47) {
  i1 = i6;
  do {
   i1 = i1 + 1 | 0;
   i3 = HEAP8[i1 >> 0] | 0;
  } while (i3 << 24 >> 24 == 47);
  i4 = 28152;
 } else {
  i4 = 38133;
  i1 = i6;
 }
 L8 : do if ((_strlen(i1) | 0) >>> 0 <= 4096) {
  i7 = (i12 & 32 | 0) != 0;
  if (!i7) {
   HEAP32[i13 + 8 >> 2] = i2;
   HEAP32[i13 >> 2] = 0;
   HEAP32[i13 + 4 >> 2] = 0;
   i3 = HEAP8[i1 >> 0] | 0;
  }
  if (i3 << 24 >> 24) {
   i1 = _match_in_dir(i4, i1, i12, (i5 | 0) == 0 ? 42 : i5, i8) | 0;
   if ((i1 | 0) == 1) {
    _freelist(i11);
    i1 = 1;
    break;
   }
   i3 = HEAP32[i11 >> 2] | 0;
   HEAP32[i8 >> 2] = i3;
   if (i3) {
    i4 = 0;
    do {
     i3 = HEAP32[i3 >> 2] | 0;
     HEAP32[i8 >> 2] = i3;
     i4 = i4 + 1 | 0;
    } while ((i3 | 0) != 0);
    if (i4) {
     i9 = i4;
     i6 = i11;
    } else {
     i3 = i11;
     i4 = i8;
     i10 = 15;
    }
   } else {
    i3 = i11;
    i4 = i8;
    i10 = 15;
   }
  } else {
   HEAP32[i8 >> 2] = 0;
   i1 = 0;
   i3 = i11;
   i4 = i8;
   i10 = 15;
  }
  if ((i10 | 0) == 15) {
   if (!(i12 & 16)) {
    i1 = 3;
    break;
   }
   HEAP32[i8 >> 2] = i11;
   if (!(_append(i8, i6, _strlen(i6) | 0, 0) | 0)) {
    i9 = 1;
    i6 = i3;
    i8 = i4;
   } else {
    i1 = 1;
    break;
   }
  }
  do if (i7) {
   i3 = i13 + 4 | 0;
   i2 = (HEAP32[i13 >> 2] | 0) + i2 | 0;
   i4 = _realloc(HEAP32[i3 >> 2] | 0, (i2 + i9 << 2) + 4 | 0) | 0;
   if (!i4) {
    _freelist(i11);
    i1 = 1;
    break L8;
   } else {
    HEAP32[i3 >> 2] = i4;
    break;
   }
  } else {
   i4 = _malloc((i9 + i2 << 2) + 4 | 0) | 0;
   i5 = i13 + 4 | 0;
   HEAP32[i5 >> 2] = i4;
   if (!i4) {
    _freelist(i11);
    i1 = 1;
    break L8;
   }
   if (!i2) {
    i2 = 0;
    i3 = i5;
   } else {
    _memset(i4 | 0, 0, i2 << 2 | 0) | 0;
    i3 = i5;
    i4 = HEAP32[i5 >> 2] | 0;
   }
  } while (0);
  i5 = HEAP32[i6 >> 2] | 0;
  HEAP32[i8 >> 2] = i5;
  i7 = HEAP32[i3 >> 2] | 0;
  i6 = 0;
  i3 = i5;
  i5 = i4;
  i4 = i2;
  while (1) {
   HEAP32[i5 + (i4 << 2) >> 2] = i3 + 4;
   i3 = HEAP32[i3 >> 2] | 0;
   HEAP32[i8 >> 2] = i3;
   i4 = i6 + 1 | 0;
   if (i4 >>> 0 < i9 >>> 0) {
    i6 = i4;
    i5 = i7;
    i4 = i4 + i2 | 0;
   } else break;
  }
  HEAP32[i7 + (i2 + i9 << 2) >> 2] = 0;
  HEAP32[i13 >> 2] = (HEAP32[i13 >> 2] | 0) + i9;
  if (!(i12 & 4)) _qsort(i7 + (i2 << 2) | 0, i9, 4, 43);
 } else i1 = 1; while (0);
 STACKTOP = i14;
 return i1 | 0;
}

function _LoadPEFile(i4) {
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i15 = 0;
 i15 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i12 = i15 + 8 | 0;
 i7 = i15;
 i1 = _malloc(20) | 0;
 i11 = _RVA() | 0;
 HEAP32[i1 + 4 >> 2] = i11;
 i14 = _MetaData() | 0;
 HEAP32[i1 + 16 >> 2] = i14;
 i2 = i4 + (HEAP32[i4 + 60 >> 2] | 0) + 4 | 0;
 i5 = i2 + 20 | 0;
 i6 = i5 + 224 | 0;
 L1 : do if ((HEAP16[i2 >> 1] | 0) == 332) {
  i3 = HEAPU16[i2 + 2 >> 1] | 0;
  i2 = 0;
  while (1) {
   if ((i2 | 0) == (i3 | 0)) break;
   _RVA_Create(i11, i4, i6 + (i2 * 40 | 0) | 0) | 0;
   i2 = i2 + 1 | 0;
  }
  i6 = _RVA_FindData(i11, HEAP32[i5 + 208 >> 2] | 0) | 0;
  i10 = HEAP32[i6 + 8 >> 2] | 0;
  HEAP32[i1 + 12 >> 2] = HEAP32[i6 + 20 >> 2];
  i10 = _RVA_FindData(i11, i10) | 0;
  i6 = HEAP32[i10 + 12 >> 2] | 0;
  i9 = i10 + 16 | 0;
  HEAP32[i1 + 8 >> 2] = i9;
  HEAP32[i7 >> 2] = i9;
  _log_f(1, 11804, i7);
  i9 = HEAPU16[i10 + (i6 + 18) >> 1] | 0;
  i6 = i6 + 20 | 0;
  i3 = 0;
  i2 = 0;
  i8 = 0;
  while (1) {
   if ((i8 | 0) == (i9 | 0)) break;
   i7 = HEAP32[i10 + (i6 + 4) >> 2] | 0;
   i4 = i10 + (i6 + 8) | 0;
   i5 = i10 + (HEAP32[i10 + i6 >> 2] | 0) | 0;
   i6 = ((_strlen(i4) | 0) + 12 & -4) + i6 | 0;
   do if (_strcasecmp(i4, 11821) | 0) {
    if (!(_strcasecmp(i4, 11830) | 0)) {
     _MetaData_LoadUserStrings(i14, i5, i7);
     break;
    }
    if (!(_strcasecmp(i4, 11834) | 0)) {
     _MetaData_LoadBlobs(i14, i5, i7);
     break;
    }
    if (!(_strcasecmp(i4, 11840) | 0)) {
     _MetaData_LoadGUIDs(i14, i5, i7);
     break;
    } else {
     i4 = (_strcasecmp(i4, 11846) | 0) == 0;
     i3 = i4 ? i5 : i3;
     i2 = i4 ? i7 : i2;
     break;
    }
   } else _MetaData_LoadStrings(i14, i5, i7); while (0);
   i8 = i8 + 1 | 0;
  }
  if (i3 | 0) _MetaData_LoadTables(i14, i11, i3, i2);
  i2 = HEAP32[i14 + 188 >> 2] | 0;
  L27 : while (1) {
   if ((i2 | 0) <= 0) break;
   i4 = HEAP32[(_MetaData_GetTableRow(i14, i2 & 16777215 | 704643072) | 0) + 4 >> 2] | 0;
   switch ((i4 >>> 24 & 255) << 24 >> 24) {
   case 2:
    {
     i3 = 57;
     break;
    }
   case 6:
    {
     i3 = 33;
     break;
    }
   default:
    {
     i13 = 23;
     break L27;
    }
   }
   HEAP8[(_MetaData_GetTableRow(i14, i4) | 0) + i3 >> 0] = 1;
   i2 = i2 + -1 | 0;
  }
  if ((i13 | 0) == 23) {
   HEAP32[i12 >> 2] = i4;
   _Crash(11849, i12);
  }
  i2 = HEAP32[i14 + 184 >> 2] | 0;
  while (1) {
   if ((i2 | 0) <= 0) break L1;
   i13 = _MetaData_GetTableRow(i14, i2 & 16777215 | 687865856) | 0;
   i12 = _MetaData_GetTableRow(i14, HEAP32[i13 + 4 >> 2] | 0) | 0;
   HEAP32[(_MetaData_GetTableRow(i14, HEAP32[i13 >> 2] | 0) | 0) + 120 >> 2] = i12;
   i2 = i2 + -1 | 0;
  }
 } else i1 = 0; while (0);
 STACKTOP = i15;
 return i1 | 0;
}

function _Type_GetTypeFromSig(i2, i3, i6, i7) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i6 = i6 | 0;
 i7 = i7 | 0;
 var i1 = 0, i4 = 0, i5 = 0, i8 = 0, i9 = 0;
 i9 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i9;
 i4 = _MetaData_DecodeSigEntry(i3) | 0;
 do switch (i4 | 0) {
 case 1:
  {
   i1 = 0;
   break;
  }
 case 2:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 12 >> 2] | 0;
   break;
  }
 case 3:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 24 >> 2] | 0;
   break;
  }
 case 4:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 20 >> 2] | 0;
   break;
  }
 case 5:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 16 >> 2] | 0;
   break;
  }
 case 6:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 28 >> 2] | 0;
   break;
  }
 case 7:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 56 >> 2] | 0;
   break;
  }
 case 8:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 32 >> 2] | 0;
   break;
  }
 case 10:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 96 >> 2] | 0;
   break;
  }
 case 11:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 100 >> 2] | 0;
   break;
  }
 case 9:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 52 >> 2] | 0;
   break;
  }
 case 12:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 88 >> 2] | 0;
   break;
  }
 case 13:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 92 >> 2] | 0;
   break;
  }
 case 14:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 36 >> 2] | 0;
   break;
  }
 case 15:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 180 >> 2] | 0;
   break;
  }
 case 16:
  {
   _Type_GetTypeFromSig(i2, i3, i6, i7) | 0;
   i8 = 17;
   break;
  }
 case 24:
  {
   i8 = 17;
   break;
  }
 case 18:
 case 17:
  {
   i1 = _MetaData_GetTypeDefFromDefRefOrSpec(i2, _MetaData_DecodeSigEntryToken(i3) | 0, i6, i7) | 0;
   break;
  }
 case 19:
  {
   i1 = _MetaData_DecodeSigEntry(i3) | 0;
   if (!i6) i1 = 0; else i1 = HEAP32[i6 + (i1 << 2) >> 2] | 0;
   break;
  }
 case 21:
  {
   i1 = _Generics_GetGenericTypeFromSig(i2, i3, i6, i7) | 0;
   break;
  }
 case 25:
  {
   i1 = HEAP32[(HEAP32[8595] | 0) + 180 >> 2] | 0;
   break;
  }
 case 28:
  {
   i1 = HEAP32[HEAP32[8595] >> 2] | 0;
   break;
  }
 case 29:
  {
   i8 = _Type_GetArrayTypeDef(_Type_GetTypeFromSig(i2, i3, i6, i7) | 0, 0, 0) | 0;
   STACKTOP = i9;
   return i8 | 0;
  }
 case 30:
  {
   i1 = _MetaData_DecodeSigEntry(i3) | 0;
   if (!i7) i1 = 0; else i1 = HEAP32[i7 + (i1 << 2) >> 2] | 0;
   break;
  }
 default:
  {
   HEAP32[i5 >> 2] = i4;
   _Crash(18853, i5);
  }
 } while (0);
 if ((i8 | 0) == 17) i1 = HEAP32[(HEAP32[8595] | 0) + 40 >> 2] | 0;
 STACKTOP = i9;
 return i1 | 0;
}

function _FindMethodInType(i9, i10, i13, i8, i14, i15) {
 i9 = i9 | 0;
 i10 = i10 | 0;
 i13 = i13 | 0;
 i8 = i8 | 0;
 i14 = i14 | 0;
 i15 = i15 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i11 = 0, i12 = 0, i16 = 0, i17 = 0, i18 = 0, i19 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 48 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(48);
 i19 = i7 + 32 | 0;
 i18 = i7 + 24 | 0;
 i12 = i7 + 8 | 0;
 i11 = i7;
 i16 = i7 + 40 | 0;
 i17 = i7 + 36 | 0;
 i2 = i9;
 L1 : do {
  i4 = i2 + 112 | 0;
  i5 = i2 + 116 | 0;
  i3 = i2 + 92 | 0;
  i1 = 0;
  while (1) {
   if (i1 >>> 0 >= (HEAP32[i4 >> 2] | 0) >>> 0) break;
   if (_MetaData_CompareNameAndSig(i10, i8, i13, i14, i15, HEAP32[(HEAP32[i5 >> 2] | 0) + (i1 << 2) >> 2] | 0, HEAP32[i3 >> 2] | 0, 0) | 0) {
    i6 = 5;
    break L1;
   }
   i1 = i1 + 1 | 0;
  }
  i2 = HEAP32[i2 + 40 >> 2] | 0;
 } while ((i2 | 0) != 0);
 if ((i6 | 0) == 5) {
  STACKTOP = i7;
  return HEAP32[(HEAP32[i5 >> 2] | 0) + (i1 << 2) >> 2] | 0;
 }
 i5 = _malloc(2048) | 0;
 HEAP8[i5 >> 0] = 0;
 HEAP32[i17 >> 2] = _MetaData_GetBlob(i8, i16) | 0;
 i1 = _MetaData_DecodeSigEntry(i17) | 0;
 if (!(i1 & 32)) {
  i8 = i5 + (_strlen(i5) | 0) | 0;
  i7 = i8;
  HEAP8[i7 >> 0] = 115;
  HEAP8[i7 + 1 >> 0] = 116;
  HEAP8[i7 + 2 >> 0] = 97;
  HEAP8[i7 + 3 >> 0] = 116;
  i8 = i8 + 4 | 0;
  HEAP8[i8 >> 0] = 105;
  HEAP8[i8 + 1 >> 0] = 99;
  HEAP8[i8 + 2 >> 0] = 32;
  HEAP8[i8 + 3 >> 0] = 0;
 }
 if (i1 & 16 | 0) _MetaData_DecodeSigEntry(i17) | 0;
 i4 = _MetaData_DecodeSigEntry(i17) | 0;
 i1 = _Type_GetTypeFromSig(i13, i17, i14, i15) | 0;
 if (i1 | 0) {
  i8 = i5 + (_strlen(i5) | 0) | 0;
  HEAP32[i11 >> 2] = HEAP32[i1 + 12 >> 2];
  _sprintf(i8, 15943, i11) | 0;
 }
 i1 = i5 + (_strlen(i5) | 0) | 0;
 i11 = HEAP32[i9 + 12 >> 2] | 0;
 HEAP32[i12 >> 2] = HEAP32[i9 + 16 >> 2];
 HEAP32[i12 + 4 >> 2] = i11;
 HEAP32[i12 + 8 >> 2] = i10;
 _sprintf(i1, 16439, i12) | 0;
 i1 = 0;
 while (1) {
  HEAP32[i16 >> 2] = i1;
  if (i1 >>> 0 >= i4 >>> 0) break;
  i2 = _Type_GetTypeFromSig(i13, i17, i14, i15) | 0;
  i1 = HEAP32[i16 >> 2] | 0;
  if (i1 | 0) {
   i12 = i5 + (_strlen(i5) | 0) | 0;
   HEAP8[i12 >> 0] = 44;
   HEAP8[i12 + 1 >> 0] = 0;
  }
  i3 = i5 + (_strlen(i5) | 0) | 0;
  if (!i2) {
   HEAP8[i3 >> 0] = 63;
   HEAP8[i3 + 1 >> 0] = 63;
   HEAP8[i3 + 2 >> 0] = 63;
   HEAP8[i3 + 3 >> 0] = 0;
  } else {
   _sprintf(i3, HEAP32[i2 + 12 >> 2] | 0, i18) | 0;
   i1 = HEAP32[i16 >> 2] | 0;
  }
  i1 = i1 + 1 | 0;
 }
 HEAP32[i19 >> 2] = i5;
 _Crash(15947, i19);
 return 0;
}

function _Thread_Execute() {
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0;
 i10 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i9 = i10;
 i1 = HEAP32[8593] | 0;
 HEAP32[i1 + 12 >> 2] = 0;
 HEAP32[8594] = i1;
 L1 : while (1) {
  L3 : do switch (_JIT_Execute(i1, 100) | 0) {
  case 1:
   {
    i4 = HEAP32[i1 + 24 >> 2] | 0;
    HEAP32[i9 >> 2] = HEAP32[i1 >> 2];
    HEAP32[i9 + 4 >> 2] = i4;
    _log_f(1, 18468, i9);
    i2 = 34372;
    while (1) {
     i8 = HEAP32[i2 >> 2] | 0;
     i3 = i8 + 56 | 0;
     if ((i8 | 0) == (i1 | 0)) break; else i2 = i3;
    }
    HEAP32[i2 >> 2] = HEAP32[i3 >> 2];
    _Thread_Delete(i1);
    i2 = HEAP32[8593] | 0;
    i1 = i2;
    while (1) {
     if (!i1) break L1;
     i3 = HEAP32[i1 + 12 >> 2] | 0;
     if (!(i3 & 4)) switch (i3 & -5 | 0) {
     case 64:
     case 8:
      break;
     default:
      {
       i8 = i2;
       break L3;
      }
     }
     i1 = HEAP32[i1 + 56 >> 2] | 0;
    }
   }
  case 3:
   {
    i7 = _msTime() | 0;
    i8 = (HEAP32[i1 + 44 >> 2] | 0) + 16 | 0;
    HEAP32[i8 >> 2] = i7;
    HEAP32[i8 + 4 >> 2] = tempRet0;
    i8 = i1;
    break;
   }
  default:
   i8 = i1;
  } while (0);
  i1 = -1;
  i2 = i8;
  while (1) {
   i3 = HEAP32[8593] | 0;
   do {
    i7 = HEAP32[i2 + 56 >> 2] | 0;
    i2 = (i7 | 0) == 0 ? i3 : i7;
   } while ((HEAP32[i2 + 12 >> 2] & -5 | 0) != 0);
   HEAP32[8594] = i2;
   i6 = i2 + 44 | 0;
   i7 = HEAP32[i6 >> 2] | 0;
   if (!i7) {
    i1 = i2;
    continue L1;
   }
   if ((HEAP32[i7 >> 2] | 0) > -1) {
    i5 = _msTime() | 0;
    i6 = HEAP32[i7 >> 2] | 0;
    i3 = i7 + 16 | 0;
    i3 = _i64Subtract(i5 | 0, tempRet0 | 0, HEAP32[i3 >> 2] | 0, HEAP32[i3 + 4 >> 2] | 0) | 0;
    i3 = i6 - i3 | 0;
    if ((i3 | 0) < 1) {
     i1 = i2;
     continue L1;
    } else i1 = i3 >>> 0 < i1 >>> 0 ? i3 : i1;
   } else {
    i4 = HEAP32[i2 + 20 >> 2] | 0;
    i5 = HEAP32[i4 + 24 >> 2] | 0;
    if (!(HEAP16[(HEAP32[i4 + 4 >> 2] | 0) + 14 >> 1] & 16)) {
     i1 = 4;
     i3 = HEAP32[i5 >> 2] | 0;
    } else {
     i1 = 0;
     i3 = 0;
    }
    if (!(FUNCTION_TABLE_iiiii[HEAP32[i7 + 4 >> 2] & 63](i3, i5 + i1 | 0, HEAP32[i4 + 16 >> 2] | 0, i7) | 0)) i1 = 5; else break;
   }
   if ((i2 | 0) != (i8 | 0)) continue;
   _SleepMS(i1);
  }
  _free(i7);
  HEAP32[i6 >> 2] = 0;
  i1 = i2;
 }
 STACKTOP = i10;
 return i4 | 0;
}

function _pop_arg(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0, d6 = 0.0;
 L1 : do if (i2 >>> 0 <= 20) do switch (i2 | 0) {
 case 9:
  {
   i4 = (HEAP32[i3 >> 2] | 0) + (4 - 1) & ~(4 - 1);
   i2 = HEAP32[i4 >> 2] | 0;
   HEAP32[i3 >> 2] = i4 + 4;
   HEAP32[i1 >> 2] = i2;
   break L1;
  }
 case 10:
  {
   i4 = (HEAP32[i3 >> 2] | 0) + (4 - 1) & ~(4 - 1);
   i2 = HEAP32[i4 >> 2] | 0;
   HEAP32[i3 >> 2] = i4 + 4;
   i4 = i1;
   HEAP32[i4 >> 2] = i2;
   HEAP32[i4 + 4 >> 2] = ((i2 | 0) < 0) << 31 >> 31;
   break L1;
  }
 case 11:
  {
   i4 = (HEAP32[i3 >> 2] | 0) + (4 - 1) & ~(4 - 1);
   i2 = HEAP32[i4 >> 2] | 0;
   HEAP32[i3 >> 2] = i4 + 4;
   i4 = i1;
   HEAP32[i4 >> 2] = i2;
   HEAP32[i4 + 4 >> 2] = 0;
   break L1;
  }
 case 12:
  {
   i4 = (HEAP32[i3 >> 2] | 0) + (8 - 1) & ~(8 - 1);
   i2 = i4;
   i5 = HEAP32[i2 >> 2] | 0;
   i2 = HEAP32[i2 + 4 >> 2] | 0;
   HEAP32[i3 >> 2] = i4 + 8;
   i4 = i1;
   HEAP32[i4 >> 2] = i5;
   HEAP32[i4 + 4 >> 2] = i2;
   break L1;
  }
 case 13:
  {
   i5 = (HEAP32[i3 >> 2] | 0) + (4 - 1) & ~(4 - 1);
   i4 = HEAP32[i5 >> 2] | 0;
   HEAP32[i3 >> 2] = i5 + 4;
   i4 = (i4 & 65535) << 16 >> 16;
   i5 = i1;
   HEAP32[i5 >> 2] = i4;
   HEAP32[i5 + 4 >> 2] = ((i4 | 0) < 0) << 31 >> 31;
   break L1;
  }
 case 14:
  {
   i5 = (HEAP32[i3 >> 2] | 0) + (4 - 1) & ~(4 - 1);
   i4 = HEAP32[i5 >> 2] | 0;
   HEAP32[i3 >> 2] = i5 + 4;
   i5 = i1;
   HEAP32[i5 >> 2] = i4 & 65535;
   HEAP32[i5 + 4 >> 2] = 0;
   break L1;
  }
 case 15:
  {
   i5 = (HEAP32[i3 >> 2] | 0) + (4 - 1) & ~(4 - 1);
   i4 = HEAP32[i5 >> 2] | 0;
   HEAP32[i3 >> 2] = i5 + 4;
   i4 = (i4 & 255) << 24 >> 24;
   i5 = i1;
   HEAP32[i5 >> 2] = i4;
   HEAP32[i5 + 4 >> 2] = ((i4 | 0) < 0) << 31 >> 31;
   break L1;
  }
 case 16:
  {
   i5 = (HEAP32[i3 >> 2] | 0) + (4 - 1) & ~(4 - 1);
   i4 = HEAP32[i5 >> 2] | 0;
   HEAP32[i3 >> 2] = i5 + 4;
   i5 = i1;
   HEAP32[i5 >> 2] = i4 & 255;
   HEAP32[i5 + 4 >> 2] = 0;
   break L1;
  }
 case 17:
  {
   i5 = (HEAP32[i3 >> 2] | 0) + (8 - 1) & ~(8 - 1);
   d6 = +HEAPF64[i5 >> 3];
   HEAP32[i3 >> 2] = i5 + 8;
   HEAPF64[i1 >> 3] = d6;
   break L1;
  }
 case 18:
  {
   i5 = (HEAP32[i3 >> 2] | 0) + (8 - 1) & ~(8 - 1);
   d6 = +HEAPF64[i5 >> 3];
   HEAP32[i3 >> 2] = i5 + 8;
   HEAPF64[i1 >> 3] = d6;
   break L1;
  }
 default:
  break L1;
 } while (0); while (0);
 return;
}

function _qsort(i2, i1, i7, i8) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 i7 = i7 | 0;
 i8 = i8 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0;
 i11 = STACKTOP;
 STACKTOP = STACKTOP + 208 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(208);
 i9 = i11 + 8 | 0;
 i10 = i11;
 i5 = Math_imul(i7, i1) | 0;
 i6 = i10;
 HEAP32[i6 >> 2] = 1;
 HEAP32[i6 + 4 >> 2] = 0;
 L1 : do if (i5 | 0) {
  i6 = 0 - i7 | 0;
  HEAP32[i9 + 4 >> 2] = i7;
  HEAP32[i9 >> 2] = i7;
  i3 = 2;
  i1 = i7;
  i4 = i7;
  while (1) {
   i1 = i1 + i7 + i4 | 0;
   HEAP32[i9 + (i3 << 2) >> 2] = i1;
   if (i1 >>> 0 < i5 >>> 0) {
    i12 = i4;
    i3 = i3 + 1 | 0;
    i4 = i1;
    i1 = i12;
   } else break;
  }
  i4 = i2 + i5 + i6 | 0;
  if (i4 >>> 0 > i2 >>> 0) {
   i5 = i4;
   i3 = 1;
   i1 = 1;
   do {
    do if ((i1 & 3 | 0) != 3) {
     i1 = i3 + -1 | 0;
     if ((HEAP32[i9 + (i1 << 2) >> 2] | 0) >>> 0 < (i5 - i2 | 0) >>> 0) _sift(i2, i7, i8, i3, i9); else _trinkle(i2, i7, i8, i10, i3, 0, i9);
     if ((i3 | 0) == 1) {
      _shl(i10, 1);
      i3 = 0;
      break;
     } else {
      _shl(i10, i1);
      i3 = 1;
      break;
     }
    } else {
     _sift(i2, i7, i8, i3, i9);
     _shr(i10, 2);
     i3 = i3 + 2 | 0;
    } while (0);
    i1 = HEAP32[i10 >> 2] | 1;
    HEAP32[i10 >> 2] = i1;
    i2 = i2 + i7 | 0;
   } while (i2 >>> 0 < i4 >>> 0);
  } else {
   i3 = 1;
   i1 = 1;
  }
  _trinkle(i2, i7, i8, i10, i3, 0, i9);
  i4 = i10 + 4 | 0;
  while (1) {
   if ((i3 | 0) == 1 & (i1 | 0) == 1) {
    if (!(HEAP32[i4 >> 2] | 0)) break L1;
   } else if ((i3 | 0) >= 2) {
    _shl(i10, 2);
    i12 = i3 + -2 | 0;
    HEAP32[i10 >> 2] = HEAP32[i10 >> 2] ^ 7;
    _shr(i10, 1);
    _trinkle(i2 + (0 - (HEAP32[i9 + (i12 << 2) >> 2] | 0)) + i6 | 0, i7, i8, i10, i3 + -1 | 0, 1, i9);
    _shl(i10, 1);
    i1 = HEAP32[i10 >> 2] | 1;
    HEAP32[i10 >> 2] = i1;
    i5 = i2 + i6 | 0;
    _trinkle(i5, i7, i8, i10, i12, 1, i9);
    i2 = i5;
    i3 = i12;
    continue;
   }
   i1 = _pntz(i10) | 0;
   _shr(i10, i1);
   i2 = i2 + i6 | 0;
   i3 = i1 + i3 | 0;
   i1 = HEAP32[i10 >> 2] | 0;
  }
 } while (0);
 STACKTOP = i11;
 return;
}

function _System_Type_GetProperties(i15, i1, i9) {
 i15 = i15 | 0;
 i1 = i1 | 0;
 i9 = i9 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0;
 i14 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i10 = i14 + 8 | 0;
 i11 = i14 + 4 | 0;
 i12 = i14;
 i1 = HEAP32[i15 >> 2] | 0;
 i13 = HEAP32[i1 + 4 >> 2] | 0;
 i6 = HEAP32[i13 + 112 >> 2] | 0;
 i4 = HEAP32[i13 + 104 >> 2] | 0;
 i1 = i1 + 80 | 0;
 i3 = 1;
 while (1) {
  if (i3 >>> 0 > i4 >>> 0) {
   i5 = 0;
   i1 = 0;
   break;
  }
  i2 = _MetaData_GetTableRow(i13, i3 & 16777215 | 352321536) | 0;
  i7 = i3 + 1 | 0;
  if ((HEAP32[i2 >> 2] | 0) == (HEAP32[i1 >> 2] | 0)) {
   i8 = 4;
   break;
  } else i3 = i7;
 }
 do if ((i8 | 0) == 4) {
  i1 = HEAP32[i2 + 4 >> 2] & 16777215;
  if (i3 >>> 0 < i4 >>> 0) {
   i5 = i1;
   i1 = HEAP32[(_MetaData_GetTableRow(i13, i7 & 16777215 | 352321536) | 0) + 4 >> 2] & 16777215;
   break;
  } else {
   i5 = i1;
   i1 = i6 + 1 | 0;
   break;
  }
 } while (0);
 i3 = i1 - i5 | 0;
 i4 = _SystemArray_NewVector(_Type_GetArrayTypeDef(HEAP32[(HEAP32[8595] | 0) + 192 >> 2] | 0, 0, 0) | 0, i3) | 0;
 HEAP32[i9 >> 2] = i4;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i3 | 0)) break;
  i2 = _MetaData_GetTableRow(i13, i1 + i5 & 16777215 | 385875968) | 0;
  HEAP32[i10 >> 2] = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 192 >> 2] | 0) | 0;
  _SystemArray_StoreElement(i4, i1, i10);
  HEAP32[HEAP32[i10 >> 2] >> 2] = i15;
  i9 = _SystemString_FromCharPtrASCII(HEAP32[i2 + 4 >> 2] | 0) | 0;
  HEAP32[(HEAP32[i10 >> 2] | 0) + 4 >> 2] = i9;
  HEAP32[i12 >> 2] = _MetaData_GetBlob(HEAP32[i2 + 8 >> 2] | 0, i11) | 0;
  _MetaData_DecodeSigEntry(i12) | 0;
  _MetaData_DecodeSigEntry(i12) | 0;
  i2 = _Type_GetTypeFromSig(i13, i12, 0, 0) | 0;
  if (!(HEAP8[i2 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i2, 0, 0);
  i9 = _Type_GetTypeObject(i2) | 0;
  HEAP32[(HEAP32[i10 >> 2] | 0) + 8 >> 2] = i9;
  i1 = i1 + 1 | 0;
 }
 STACKTOP = i14;
 return 0;
}

function _MetaData_LoadTables(i11, i12, i8, i1) {
 i11 = i11 | 0;
 i12 = i12 | 0;
 i8 = i8 | 0;
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i9 = 0, i10 = 0, i13 = 0, i14 = 0;
 i14 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i13 = i14;
 i10 = i14 + 4 | 0;
 i5 = HEAPU8[i8 + 6 >> 0] | 0;
 HEAP8[i11 + 420 >> 0] = i5 & 1;
 HEAP8[i11 + 422 >> 0] = i5 >>> 1 & 1;
 HEAP8[i11 + 421 >> 0] = i5 >>> 2 & 1;
 i5 = i8 + 8 | 0;
 i4 = HEAP32[i5 >> 2] | 0;
 i5 = HEAP32[i5 + 4 >> 2] | 0;
 i3 = 0;
 i1 = 0;
 i6 = 1;
 i7 = 0;
 while (1) {
  i9 = i8 + ((i1 << 2) + 24) | 0;
  if ((i3 | 0) == 48) {
   i4 = 0;
   break;
  }
  i2 = i11 + 20 + (i3 << 2) | 0;
  if ((i6 & i4 | 0) == 0 & (i7 & i5 | 0) == 0) {
   HEAP32[i2 >> 2] = 0;
   HEAP32[i11 + 212 + (i3 << 2) >> 2] = 0;
  } else {
   HEAP32[i2 >> 2] = HEAP32[i9 >> 2];
   i1 = i1 + 1 | 0;
  }
  i9 = _bitshift64Shl(i6 | 0, i7 | 0, 1) | 0;
  i3 = i3 + 1 | 0;
  i6 = i9;
  i7 = tempRet0;
 }
 while (1) {
  if ((i4 | 0) == 13) break;
  i5 = HEAP32[3404 + (i4 << 2) >> 2] | 0;
  i6 = HEAPU8[14526 + i4 >> 0] | 0;
  i7 = 1 << i6;
  i1 = 0;
  i3 = 0;
  while (1) {
   if ((i3 | 0) >= (i7 | 0)) break;
   i2 = HEAP8[i5 + i3 >> 0] | 0;
   if (i2 << 24 >> 24 != 122) {
    i8 = HEAP32[i11 + 20 + ((i2 & 255) << 2) >> 2] | 0;
    i1 = i8 >>> 0 > i1 >>> 0 ? i8 : i1;
   }
   i3 = i3 + 1 | 0;
  }
  HEAP8[i11 + 404 + i4 >> 0] = i1 >>> 0 >= 1 << 16 - i6 >>> 0 & 1;
  i4 = i4 + 1 | 0;
 }
 HEAP32[i10 >> 2] = i9;
 i2 = 0;
 while (1) {
  if ((i2 | 0) >= 48) {
   i1 = 22;
   break;
  }
  if (HEAP32[i11 + 20 + (i2 << 2) >> 2] | 0) {
   if (i2 << 2 >>> 0 > 179) {
    i1 = 19;
    break;
   }
   if (!(HEAP32[3456 + (i2 << 2) >> 2] | 0)) {
    i1 = 19;
    break;
   }
   HEAP32[i11 + 212 + (i2 << 2) >> 2] = _LoadSingleTable(i11, i12, i2, i10) | 0;
  }
  i2 = i2 + 1 | 0;
 }
 if ((i1 | 0) == 19) {
  HEAP32[i13 >> 2] = i2;
  _printf(14539, i13) | 0;
  _exit(1);
 } else if ((i1 | 0) == 22) {
  STACKTOP = i14;
  return;
 }
}

function _System_IO_FileInternal_GetFileSystemEntries(i1, i2, i14) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i14 = i14 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i15 = 0;
 i15 = STACKTOP;
 STACKTOP = STACKTOP + 304 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(304);
 i4 = i15 + 36 | 0;
 i5 = i15 + 40 | 0;
 i12 = i15;
 i13 = HEAP32[i2 + 8 >> 2] | 0;
 i10 = HEAP32[i2 + 12 >> 2] | 0;
 i11 = HEAP32[i2 + 16 >> 2] | 0;
 i3 = _SystemString_GetString(HEAP32[i2 + 4 >> 2] | 0, i4) | 0;
 i1 = _malloc(128) | 0;
 i4 = HEAP32[i4 >> 2] | 0;
 i2 = 0;
 while (1) {
  if ((i2 | 0) == (i4 | 0)) break;
  HEAP8[i5 + i2 >> 0] = HEAP16[i3 + (i2 << 1) >> 1];
  i2 = i2 + 1 | 0;
 }
 HEAP8[i5 + i4 >> 0] = 0;
 if (!(_glob(i5, 4, 0, i12) | 0)) {
  i9 = i12 + 4 | 0;
  i4 = 32;
  i3 = 0;
  i5 = i1;
  i8 = 0;
  i7 = i1;
  while (1) {
   if (i8 >>> 0 >= (HEAP32[i12 >> 2] | 0) >>> 0) break;
   i6 = HEAP32[(HEAP32[i9 >> 2] | 0) + (i8 << 2) >> 2] | 0;
   i2 = _Attrs(i6, i11) | 0;
   if ((i2 | 0) == -1) break;
   if ((i2 & i10 | 0) == (i13 | 0)) {
    if (i3 >>> 0 < i4 >>> 0) i2 = i7; else {
     i2 = _realloc(i7, i4 << 3) | 0;
     i4 = i4 << 1;
     i5 = i2;
     i1 = i2;
    }
    i7 = _SystemString_FromCharPtrASCII(i6) | 0;
    _Heap_MakeUndeletable(i7);
    HEAP32[i5 + (i3 << 2) >> 2] = i7;
    i3 = i3 + 1 | 0;
   } else i2 = i7;
   i8 = i8 + 1 | 0;
   i7 = i2;
  }
  _globfree(i12);
 } else {
  HEAP32[i11 >> 2] = HEAP32[(___errno_location() | 0) >> 2];
  i3 = 0;
 }
 i13 = _SystemArray_NewVector(HEAP32[(HEAP32[8595] | 0) + 124 >> 2] | 0, i3) | 0;
 i2 = i13 + 4 | 0;
 _memcpy(i2 | 0, i1 | 0, i3 << 2 | 0) | 0;
 _free(i1);
 HEAP32[i14 >> 2] = i13;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i3 | 0)) break;
  _Heap_MakeDeletable(HEAP32[i2 + (i1 << 2) >> 2] | 0);
  i1 = i1 + 1 | 0;
 }
 STACKTOP = i15;
 return 0;
}

function _MetaData_Fill_MethodDef(i3, i7, i8, i11) {
 i3 = i3 | 0;
 i7 = i7 | 0;
 i8 = i8 | 0;
 i11 = i11 | 0;
 var i1 = 0, i2 = 0, i4 = 0, i5 = 0, i6 = 0, i9 = 0, i10 = 0, i12 = 0, i13 = 0;
 i13 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i12 = i13;
 HEAP32[i7 + 48 >> 2] = i3;
 HEAP32[i7 >> 2] = i7;
 HEAP8[i7 + 32 >> 0] = 1;
 if (!(HEAP8[i7 + 33 >> 0] | 0)) {
  HEAP32[i12 >> 2] = _MetaData_GetBlob(HEAP32[i7 + 20 >> 2] | 0, 0) | 0;
  if ((_MetaData_DecodeSigEntry(i12) | 0) & 16 | 0) _MetaData_DecodeSigEntry(i12) | 0;
  i10 = _MetaData_DecodeSigEntry(i12) | 0;
  i4 = i7 + 14 | 0;
  i9 = i7 + 34 | 0;
  HEAP16[i9 >> 1] = (((HEAPU16[i4 >> 1] | 0) >>> 4 & 1 ^ 1) & 65535) + i10;
  i10 = i7 + 4 | 0;
  i1 = _Type_GetTypeFromSig(HEAP32[i10 >> 2] | 0, i12, i8, i11) | 0;
  HEAP32[i7 + 44 >> 2] = i1;
  if (i1 | 0 ? (HEAP8[i1 + 32 >> 0] | 0) == 0 : 0) _MetaData_Fill_TypeDef_(i1, 0, 0);
  i2 = HEAP16[i9 >> 1] | 0;
  i5 = _malloc((i2 & 65535) * 12 | 0) | 0;
  i6 = i7 + 36 | 0;
  HEAP32[i6 >> 2] = i5;
  if (!(HEAP16[i4 >> 1] & 16)) {
   HEAP32[i5 + 4 >> 2] = 0;
   i4 = (HEAP8[i3 + 34 >> 0] | 0) == 0;
   HEAP32[i5 + 8 >> 2] = 4;
   if (i4) i1 = i3; else i1 = HEAP32[(HEAP32[8595] | 0) + 40 >> 2] | 0;
   HEAP32[i5 >> 2] = i1;
   i1 = 4;
  } else i1 = 0;
  i3 = i1 >>> 2;
  while (1) {
   if (i3 >>> 0 >= (i2 & 65535) >>> 0) break;
   i2 = _Type_GetTypeFromSig(HEAP32[i10 >> 2] | 0, i12, i8, i11) | 0;
   if (!(HEAP8[i2 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i2, 0, 0);
   i5 = HEAP32[i2 + 68 >> 2] | 0;
   i4 = HEAP32[i6 >> 2] | 0;
   HEAP32[i4 + (i3 * 12 | 0) >> 2] = i2;
   HEAP32[i4 + (i3 * 12 | 0) + 4 >> 2] = i1;
   HEAP32[i4 + (i3 * 12 | 0) + 8 >> 2] = i5;
   i3 = i3 + 1 | 0;
   i1 = i5 + i1 | 0;
   i2 = HEAP16[i9 >> 1] | 0;
  }
  HEAP32[i7 + 40 >> 2] = i1;
 }
 STACKTOP = i13;
 return;
}

function _memcpy(i3, i6, i1) {
 i3 = i3 | 0;
 i6 = i6 | 0;
 i1 = i1 | 0;
 var i2 = 0, i4 = 0, i5 = 0;
 if ((i1 | 0) >= 8192) return _emscripten_memcpy_big(i3 | 0, i6 | 0, i1 | 0) | 0;
 i5 = i3 | 0;
 i4 = i3 + i1 | 0;
 if ((i3 & 3) == (i6 & 3)) {
  while (i3 & 3) {
   if (!i1) return i5 | 0;
   HEAP8[i3 >> 0] = HEAP8[i6 >> 0] | 0;
   i3 = i3 + 1 | 0;
   i6 = i6 + 1 | 0;
   i1 = i1 - 1 | 0;
  }
  i1 = i4 & -4 | 0;
  i2 = i1 - 64 | 0;
  while ((i3 | 0) <= (i2 | 0)) {
   HEAP32[i3 >> 2] = HEAP32[i6 >> 2];
   HEAP32[i3 + 4 >> 2] = HEAP32[i6 + 4 >> 2];
   HEAP32[i3 + 8 >> 2] = HEAP32[i6 + 8 >> 2];
   HEAP32[i3 + 12 >> 2] = HEAP32[i6 + 12 >> 2];
   HEAP32[i3 + 16 >> 2] = HEAP32[i6 + 16 >> 2];
   HEAP32[i3 + 20 >> 2] = HEAP32[i6 + 20 >> 2];
   HEAP32[i3 + 24 >> 2] = HEAP32[i6 + 24 >> 2];
   HEAP32[i3 + 28 >> 2] = HEAP32[i6 + 28 >> 2];
   HEAP32[i3 + 32 >> 2] = HEAP32[i6 + 32 >> 2];
   HEAP32[i3 + 36 >> 2] = HEAP32[i6 + 36 >> 2];
   HEAP32[i3 + 40 >> 2] = HEAP32[i6 + 40 >> 2];
   HEAP32[i3 + 44 >> 2] = HEAP32[i6 + 44 >> 2];
   HEAP32[i3 + 48 >> 2] = HEAP32[i6 + 48 >> 2];
   HEAP32[i3 + 52 >> 2] = HEAP32[i6 + 52 >> 2];
   HEAP32[i3 + 56 >> 2] = HEAP32[i6 + 56 >> 2];
   HEAP32[i3 + 60 >> 2] = HEAP32[i6 + 60 >> 2];
   i3 = i3 + 64 | 0;
   i6 = i6 + 64 | 0;
  }
  while ((i3 | 0) < (i1 | 0)) {
   HEAP32[i3 >> 2] = HEAP32[i6 >> 2];
   i3 = i3 + 4 | 0;
   i6 = i6 + 4 | 0;
  }
 } else {
  i1 = i4 - 4 | 0;
  while ((i3 | 0) < (i1 | 0)) {
   HEAP8[i3 >> 0] = HEAP8[i6 >> 0] | 0;
   HEAP8[i3 + 1 >> 0] = HEAP8[i6 + 1 >> 0] | 0;
   HEAP8[i3 + 2 >> 0] = HEAP8[i6 + 2 >> 0] | 0;
   HEAP8[i3 + 3 >> 0] = HEAP8[i6 + 3 >> 0] | 0;
   i3 = i3 + 4 | 0;
   i6 = i6 + 4 | 0;
  }
 }
 while ((i3 | 0) < (i4 | 0)) {
  HEAP8[i3 >> 0] = HEAP8[i6 >> 0] | 0;
  i3 = i3 + 1 | 0;
  i6 = i6 + 1 | 0;
 }
 return i5 | 0;
}

function _TreeRemove(i6, i1) {
 i6 = i6 | 0;
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0;
 i7 = HEAP32[7046] | 0;
 do if ((i7 | 0) == (i6 | 0)) i1 = i6; else {
  if ((i6 | 0) != (i1 | 0)) {
   i8 = i6 + ((i6 >>> 0 < i1 >>> 0 & 1) << 2) | 0;
   HEAP32[i8 >> 2] = _TreeRemove(HEAP32[i8 >> 2] | 0, i1) | 0;
   i1 = i6;
   break;
  }
  i5 = HEAP32[i6 >> 2] | 0;
  i1 = (i5 | 0) == (i7 | 0);
  if (!i1 ? (i8 = i6 + 4 | 0, (HEAP32[i8 >> 2] | 0) != (i7 | 0)) : 0) {
   i2 = i5;
   i1 = i5;
   while (1) {
    i3 = i1 + 4 | 0;
    i4 = HEAP32[i3 >> 2] | 0;
    if ((i4 | 0) == (i7 | 0)) break; else {
     i2 = i3;
     i1 = i4;
    }
   }
   i9 = HEAP32[i1 >> 2] | 0;
   i10 = i1 + 8 | 0;
   i4 = HEAP8[i10 >> 0] | 0;
   HEAP32[i1 >> 2] = i5;
   HEAP32[i3 >> 2] = HEAP32[i8 >> 2];
   i7 = i6 + 8 | 0;
   HEAP8[i10 >> 0] = HEAP8[i7 >> 0] | 0;
   HEAP32[i2 >> 2] = i6;
   HEAP32[i6 >> 2] = i9;
   HEAP32[i8 >> 2] = HEAP32[7046];
   HEAP8[i7 >> 0] = i4;
   HEAP32[i1 >> 2] = _TreeRemove(HEAP32[i1 >> 2] | 0, i6) | 0;
   break;
  }
  i1 = HEAP32[i6 + ((i1 & 1) << 2) >> 2] | 0;
 } while (0);
 i3 = i1 + 8 | 0;
 i2 = HEAP8[i3 >> 0] | 0;
 i10 = (i2 & 255) + -1 | 0;
 i4 = (HEAP32[i1 + 4 >> 2] | 0) + 8 | 0;
 i5 = HEAP8[i4 >> 0] | 0;
 if ((i5 & 255 | 0) < (i10 | 0) ? 1 : (HEAPU8[(HEAP32[i1 >> 2] | 0) + 8 >> 0] | 0 | 0) < (i10 | 0)) {
  i2 = i2 + -1 << 24 >> 24;
  HEAP8[i3 >> 0] = i2;
  if ((i5 & 255) > (i2 & 255)) HEAP8[i4 >> 0] = i2;
  i1 = _TreeSkew(i1) | 0;
  i10 = i1 + 4 | 0;
  i9 = _TreeSkew(HEAP32[i10 >> 2] | 0) | 0;
  HEAP32[i10 >> 2] = i9;
  i9 = _TreeSkew(HEAP32[i9 + 4 >> 2] | 0) | 0;
  HEAP32[(HEAP32[i10 >> 2] | 0) + 4 >> 2] = i9;
  i1 = _TreeSplit(i1) | 0;
  i10 = i1 + 4 | 0;
  HEAP32[i10 >> 2] = _TreeSplit(HEAP32[i10 >> 2] | 0) | 0;
 }
 return i1 | 0;
}

function _trinkle(i1, i10, i11, i4, i3, i2, i12) {
 i1 = i1 | 0;
 i10 = i10 | 0;
 i11 = i11 | 0;
 i4 = i4 | 0;
 i3 = i3 | 0;
 i2 = i2 | 0;
 i12 = i12 | 0;
 var i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i13 = 0, i14 = 0, i15 = 0;
 i14 = STACKTOP;
 STACKTOP = STACKTOP + 240 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(240);
 i9 = i14 + 232 | 0;
 i13 = i14;
 i15 = HEAP32[i4 >> 2] | 0;
 HEAP32[i9 >> 2] = i15;
 i6 = HEAP32[i4 + 4 >> 2] | 0;
 i7 = i9 + 4 | 0;
 HEAP32[i7 >> 2] = i6;
 HEAP32[i13 >> 2] = i1;
 L1 : do if ((i15 | 0) != 1 | (i6 | 0) != 0 ? (i8 = 0 - i10 | 0, i5 = i1 + (0 - (HEAP32[i12 + (i3 << 2) >> 2] | 0)) | 0, (FUNCTION_TABLE_iii[i11 & 63](i5, i1) | 0) >= 1) : 0) {
  i4 = 1;
  i2 = (i2 | 0) == 0;
  i6 = i5;
  while (1) {
   if (i2 & (i3 | 0) > 1) {
    i2 = i1 + i8 | 0;
    i5 = HEAP32[i12 + (i3 + -2 << 2) >> 2] | 0;
    if ((FUNCTION_TABLE_iii[i11 & 63](i2, i6) | 0) > -1) {
     i5 = 10;
     break L1;
    }
    if ((FUNCTION_TABLE_iii[i11 & 63](i2 + (0 - i5) | 0, i6) | 0) > -1) {
     i5 = 10;
     break L1;
    }
   }
   i2 = i4 + 1 | 0;
   HEAP32[i13 + (i4 << 2) >> 2] = i6;
   i15 = _pntz(i9) | 0;
   _shr(i9, i15);
   i3 = i15 + i3 | 0;
   if (!((HEAP32[i9 >> 2] | 0) != 1 | (HEAP32[i7 >> 2] | 0) != 0)) {
    i4 = i2;
    i1 = i6;
    i5 = 10;
    break L1;
   }
   i1 = i6 + (0 - (HEAP32[i12 + (i3 << 2) >> 2] | 0)) | 0;
   if ((FUNCTION_TABLE_iii[i11 & 63](i1, HEAP32[i13 >> 2] | 0) | 0) < 1) {
    i1 = i6;
    i4 = i2;
    i2 = 0;
    i5 = 9;
    break;
   } else {
    i15 = i6;
    i4 = i2;
    i2 = 1;
    i6 = i1;
    i1 = i15;
   }
  }
 } else {
  i4 = 1;
  i5 = 9;
 } while (0);
 if ((i5 | 0) == 9 ? (i2 | 0) == 0 : 0) i5 = 10;
 if ((i5 | 0) == 10) {
  _cycle(i10, i13, i4);
  _sift(i1, i10, i11, i3, i12);
 }
 STACKTOP = i14;
 return;
}

function _System_String_InternalReplace(i2, i1, i14) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 i14 = i14 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i15 = 0, i16 = 0;
 i15 = HEAP32[i1 >> 2] | 0;
 i4 = HEAP32[i1 + 4 >> 2] | 0;
 i11 = HEAP32[i2 >> 2] | 0;
 i12 = HEAP32[i15 >> 2] | 0;
 i13 = HEAP32[i4 >> 2] | 0;
 i10 = i2 + 4 | 0;
 i8 = i11 - i12 + 1 | 0;
 i9 = i12 + -1 | 0;
 i3 = 0;
 i2 = 0;
 while (1) {
  if (i2 >>> 0 < i8 >>> 0) i1 = 0; else break;
  while (1) {
   if (i1 >>> 0 >= i12 >>> 0) {
    i16 = 5;
    break;
   }
   if ((HEAP16[i10 + (i1 + i2 << 1) >> 1] | 0) == (HEAP16[i15 + 4 + (i1 << 1) >> 1] | 0)) i1 = i1 + 1 | 0; else {
    i1 = i3;
    break;
   }
  }
  if ((i16 | 0) == 5) {
   i16 = 0;
   i1 = i3 + 1 | 0;
   i2 = i2 + i9 | 0;
  }
  i3 = i1;
  i2 = i2 + 1 | 0;
 }
 i7 = i4 + 4 | 0;
 i5 = _CreateStringHeapObj(i11 - (Math_imul(i3, i12 - i13 | 0) | 0) | 0) | 0;
 i6 = i13 << 1;
 i1 = 0;
 i4 = 0;
 i3 = 0;
 while (1) {
  if (i3 >>> 0 >= i11 >>> 0) break;
  L13 : do if (i3 >>> 0 < i8 >>> 0) {
   i2 = i1;
   i1 = 0;
   while (1) {
    if (i1 >>> 0 >= i12 >>> 0) break;
    if ((HEAP16[i10 + (i1 + i3 << 1) >> 1] | 0) == (HEAP16[i15 + 4 + (i1 << 1) >> 1] | 0)) {
     i2 = 1;
     i1 = i1 + 1 | 0;
    } else {
     i16 = 12;
     break L13;
    }
   }
   i1 = i5 + 4 + (i4 << 1) | 0;
   if (!i2) i16 = 15; else {
    _memcpy(i1 | 0, i7 | 0, i6 | 0) | 0;
    i1 = i2;
    i2 = i3 + i9 | 0;
    i3 = i13;
   }
  } else i16 = 12; while (0);
  if ((i16 | 0) == 12) {
   i1 = i5 + 4 + (i4 << 1) | 0;
   i16 = 15;
  }
  if ((i16 | 0) == 15) {
   i16 = 0;
   HEAP16[i1 >> 1] = HEAP16[i10 + (i3 << 1) >> 1] | 0;
   i1 = 0;
   i2 = i3;
   i3 = 1;
  }
  i4 = i3 + i4 | 0;
  i3 = i2 + 1 | 0;
 }
 HEAP32[i14 >> 2] = i5;
 return 0;
}

function _System_ValueType_GetFields(i1, i2, i15) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i15 = i15 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0;
 i14 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i12 = i14;
 i13 = HEAP32[i2 >> 2] | 0;
 i10 = HEAP32[i2 + 4 >> 2] | 0;
 i9 = _Heap_GetType(i13) | 0;
 i11 = i9 + 100 | 0;
 i3 = HEAP32[i11 >> 2] | 0;
 i9 = i9 + 104 | 0;
 i1 = 0;
 i2 = 0;
 while (1) {
  if ((i1 | 0) == (i3 | 0)) break;
  i8 = (((HEAPU16[(HEAP32[(HEAP32[i9 >> 2] | 0) + (i1 << 2) >> 2] | 0) + 8 >> 1] | 0) >>> 4 & 1 ^ 1) & 65535) + i2 | 0;
  i1 = i1 + 1 | 0;
  i2 = i8;
 }
 i7 = _SystemArray_NewVector(HEAP32[(HEAP32[8595] | 0) + 64 >> 2] | 0, i2 << ((i10 | 0) != 0 & 1)) | 0;
 i8 = (i10 | 0) == 0;
 i1 = 0;
 i6 = 0;
 while (1) {
  if (i6 >>> 0 >= (HEAP32[i11 >> 2] | 0) >>> 0) break;
  i2 = HEAP32[(HEAP32[i9 >> 2] | 0) + (i6 << 2) >> 2] | 0;
  do if (!(HEAP16[i2 + 8 >> 1] & 16)) {
   i4 = i2 + 20 | 0;
   i3 = HEAP32[i4 >> 2] | 0;
   i5 = i2 + 28 | 0;
   if (!(HEAP8[i3 + 34 >> 0] | 0)) {
    i2 = i1 + 1 | 0;
    _SystemArray_StoreElement(i7, i1, i13 + (HEAP32[i5 >> 2] | 0) | 0);
    if (i8) {
     i1 = i2;
     break;
    }
    _SystemArray_StoreElement(i7, i2, i10 + (HEAP32[i5 >> 2] | 0) | 0);
    i1 = i1 + 2 | 0;
    break;
   }
   HEAP32[i12 >> 2] = _Heap_Box(i3, i13 + (HEAP32[i5 >> 2] | 0) | 0) | 0;
   i2 = i1 + 1 | 0;
   _SystemArray_StoreElement(i7, i1, i12);
   if (i8) i1 = i2; else {
    HEAP32[i12 >> 2] = _Heap_Box(HEAP32[i4 >> 2] | 0, i10 + (HEAP32[i5 >> 2] | 0) | 0) | 0;
    _SystemArray_StoreElement(i7, i2, i12);
    i1 = i1 + 2 | 0;
   }
  } while (0);
  i6 = i6 + 1 | 0;
 }
 HEAP32[i15 >> 2] = i7;
 STACKTOP = i14;
 return 0;
}

function ___stdio_write(i7, i2, i1) {
 i7 = i7 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0;
 i12 = STACKTOP;
 STACKTOP = STACKTOP + 48 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(48);
 i10 = i12 + 16 | 0;
 i5 = i12;
 i4 = i12 + 32 | 0;
 i8 = i7 + 28 | 0;
 i3 = HEAP32[i8 >> 2] | 0;
 HEAP32[i4 >> 2] = i3;
 i9 = i7 + 20 | 0;
 i3 = (HEAP32[i9 >> 2] | 0) - i3 | 0;
 HEAP32[i4 + 4 >> 2] = i3;
 HEAP32[i4 + 8 >> 2] = i2;
 HEAP32[i4 + 12 >> 2] = i1;
 i3 = i3 + i1 | 0;
 i6 = i7 + 60 | 0;
 HEAP32[i5 >> 2] = HEAP32[i6 >> 2];
 HEAP32[i5 + 4 >> 2] = i4;
 HEAP32[i5 + 8 >> 2] = 2;
 i5 = ___syscall_ret(___syscall146(146, i5 | 0) | 0) | 0;
 L1 : do if ((i3 | 0) != (i5 | 0)) {
  i2 = 2;
  while (1) {
   if ((i5 | 0) < 0) break;
   i3 = i3 - i5 | 0;
   i14 = HEAP32[i4 + 4 >> 2] | 0;
   i13 = i5 >>> 0 > i14 >>> 0;
   i4 = i13 ? i4 + 8 | 0 : i4;
   i2 = (i13 << 31 >> 31) + i2 | 0;
   i14 = i5 - (i13 ? i14 : 0) | 0;
   HEAP32[i4 >> 2] = (HEAP32[i4 >> 2] | 0) + i14;
   i13 = i4 + 4 | 0;
   HEAP32[i13 >> 2] = (HEAP32[i13 >> 2] | 0) - i14;
   HEAP32[i10 >> 2] = HEAP32[i6 >> 2];
   HEAP32[i10 + 4 >> 2] = i4;
   HEAP32[i10 + 8 >> 2] = i2;
   i5 = ___syscall_ret(___syscall146(146, i10 | 0) | 0) | 0;
   if ((i3 | 0) == (i5 | 0)) {
    i11 = 3;
    break L1;
   }
  }
  HEAP32[i7 + 16 >> 2] = 0;
  HEAP32[i8 >> 2] = 0;
  HEAP32[i9 >> 2] = 0;
  HEAP32[i7 >> 2] = HEAP32[i7 >> 2] | 32;
  if ((i2 | 0) == 2) i1 = 0; else i1 = i1 - (HEAP32[i4 + 4 >> 2] | 0) | 0;
 } else i11 = 3; while (0);
 if ((i11 | 0) == 3) {
  i14 = HEAP32[i7 + 44 >> 2] | 0;
  HEAP32[i7 + 16 >> 2] = i14 + (HEAP32[i7 + 48 >> 2] | 0);
  HEAP32[i8 >> 2] = i14;
  HEAP32[i9 >> 2] = i14;
 }
 STACKTOP = i12;
 return i1 | 0;
}

function _vfprintf(i15, i8, i1) {
 i15 = i15 | 0;
 i8 = i8 | 0;
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0, i16 = 0;
 i16 = STACKTOP;
 STACKTOP = STACKTOP + 224 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(224);
 i10 = i16 + 120 | 0;
 i11 = i16 + 80 | 0;
 i13 = i16;
 i14 = i16 + 136 | 0;
 i2 = i11;
 i3 = i2 + 40 | 0;
 do {
  HEAP32[i2 >> 2] = 0;
  i2 = i2 + 4 | 0;
 } while ((i2 | 0) < (i3 | 0));
 HEAP32[i10 >> 2] = HEAP32[i1 >> 2];
 if ((_printf_core(0, i8, i10, i13, i11) | 0) < 0) i1 = -1; else {
  if ((HEAP32[i15 + 76 >> 2] | 0) > -1) i12 = ___lockfile(i15) | 0; else i12 = 0;
  i1 = HEAP32[i15 >> 2] | 0;
  i9 = i1 & 32;
  if ((HEAP8[i15 + 74 >> 0] | 0) < 1) HEAP32[i15 >> 2] = i1 & -33;
  i2 = i15 + 48 | 0;
  if (!(HEAP32[i2 >> 2] | 0)) {
   i3 = i15 + 44 | 0;
   i4 = HEAP32[i3 >> 2] | 0;
   HEAP32[i3 >> 2] = i14;
   i5 = i15 + 28 | 0;
   HEAP32[i5 >> 2] = i14;
   i6 = i15 + 20 | 0;
   HEAP32[i6 >> 2] = i14;
   HEAP32[i2 >> 2] = 80;
   i7 = i15 + 16 | 0;
   HEAP32[i7 >> 2] = i14 + 80;
   i1 = _printf_core(i15, i8, i10, i13, i11) | 0;
   if (i4) {
    FUNCTION_TABLE_iiii[HEAP32[i15 + 36 >> 2] & 255](i15, 0, 0) | 0;
    i1 = (HEAP32[i6 >> 2] | 0) == 0 ? -1 : i1;
    HEAP32[i3 >> 2] = i4;
    HEAP32[i2 >> 2] = 0;
    HEAP32[i7 >> 2] = 0;
    HEAP32[i5 >> 2] = 0;
    HEAP32[i6 >> 2] = 0;
   }
  } else i1 = _printf_core(i15, i8, i10, i13, i11) | 0;
  i2 = HEAP32[i15 >> 2] | 0;
  HEAP32[i15 >> 2] = i2 | i9;
  if (i12 | 0) ___unlockfile(i15);
  i1 = (i2 & 32 | 0) == 0 ? i1 : -1;
 }
 STACKTOP = i16;
 return i1 | 0;
}

function ___tan(d3, d1, i6) {
 d3 = +d3;
 d1 = +d1;
 i6 = i6 | 0;
 var i2 = 0, d4 = 0.0, i5 = 0, i7 = 0, d8 = 0.0, d9 = 0.0;
 HEAPF64[tempDoublePtr >> 3] = d3;
 i2 = HEAP32[tempDoublePtr + 4 >> 2] | 0;
 i5 = i2 & 2147483640;
 i5 = i5 >>> 0 > 1072010279 | (i5 | 0) == 1072010279 & 0 > 0;
 if (i5) {
  i2 = _bitshift64Lshr(HEAP32[tempDoublePtr >> 2] | 0, i2 | 0, 63) | 0;
  i7 = (i2 | 0) == 0;
  d3 = .7853981633974483 - (i7 ? d3 : -d3) + (3.061616997868383e-17 - (i7 ? d1 : -d1));
  d1 = 0.0;
 } else i2 = 0;
 d8 = d3 * d3;
 d4 = d8 * d8;
 d9 = d3 * d8;
 d4 = d9 * .3333333333333341 + (d1 + d8 * (d1 + d9 * (d4 * (d4 * (d4 * (d4 * (7.817944429395571e-05 - d4 * 1.8558637485527546e-05) + 5.880412408202641e-04) + 3.5920791075913124e-03) + .021869488294859542) + .13333333333320124 + d8 * (d4 * (d4 * (d4 * (d4 * (d4 * 2.590730518636337e-05 + 7.140724913826082e-05) + 2.464631348184699e-04) + 1.4562094543252903e-03) + .0088632398235993) + .05396825397622605))));
 d1 = d3 + d4;
 if (!i5) {
  if (i6) {
   HEAPF64[tempDoublePtr >> 3] = d1;
   i7 = HEAP32[tempDoublePtr + 4 >> 2] | 0;
   HEAP32[tempDoublePtr >> 2] = 0;
   HEAP32[tempDoublePtr + 4 >> 2] = i7;
   d9 = +HEAPF64[tempDoublePtr >> 3];
   d8 = -1.0 / d1;
   HEAPF64[tempDoublePtr >> 3] = d8;
   i7 = HEAP32[tempDoublePtr + 4 >> 2] | 0;
   HEAP32[tempDoublePtr >> 2] = 0;
   HEAP32[tempDoublePtr + 4 >> 2] = i7;
   d1 = +HEAPF64[tempDoublePtr >> 3];
   d1 = d1 + d8 * (d9 * d1 + 1.0 + d1 * (d4 - (d9 - d3)));
  }
 } else {
  d9 = +(1 - (i6 << 1) | 0);
  d1 = d9 - (d3 + (d4 - d1 * d1 / (d9 + d1))) * 2.0;
  d1 = i2 | 0 ? -d1 : d1;
 }
 return +d1;
}

function _MetaData_Fill_FieldDef(i1, i7, i4, i2) {
 i1 = i1 | 0;
 i7 = i7 | 0;
 i4 = i4 | 0;
 i2 = i2 | 0;
 var i3 = 0, i5 = 0, i6 = 0, i8 = 0;
 i8 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i6 = i8;
 HEAP32[i7 + 24 >> 2] = i1;
 HEAP32[i6 >> 2] = _MetaData_GetBlob(HEAP32[i7 + 16 >> 2] | 0, i8 + 4 | 0) | 0;
 _MetaData_DecodeSigEntry(i6) | 0;
 i3 = i7 + 4 | 0;
 i1 = _Type_GetTypeFromSig(HEAP32[i3 >> 2] | 0, i6, i2, 0) | 0;
 i2 = i7 + 20 | 0;
 HEAP32[i2 >> 2] = i1;
 L1 : do if (i1 | 0) {
  if (!(HEAP8[i1 + 32 >> 0] | 0)) {
   _MetaData_Fill_TypeDef_(i1, 0, 0);
   i1 = HEAP32[i2 >> 2] | 0;
  }
  i5 = HEAP32[i1 + 68 >> 2] | 0;
  HEAP32[i7 + 32 >> 2] = (i5 | 0) == 0 ? 4 : i5;
  HEAP32[i7 + 28 >> 2] = i4;
  HEAP32[i7 >> 2] = i7;
  i5 = HEAP32[i3 >> 2] | 0;
  i1 = HEAPU16[i7 + 8 >> 1] | 0;
  i6 = i7 + 40 | 0;
  if (i1 & 256 | 0) {
   i4 = HEAP32[i5 + 136 >> 2] | 0;
   i2 = i7 + 36 | 0;
   i1 = 1;
   while (1) {
    if (i1 >>> 0 > i4 >>> 0) break L1;
    i3 = _MetaData_GetTableRow(i5, i1 & 16777215 | 486539264) | 0;
    if ((HEAP32[i3 + 4 >> 2] | 0) == (HEAP32[i2 >> 2] | 0)) break; else i1 = i1 + 1 | 0;
   }
   HEAP32[i6 >> 2] = HEAP32[i3 >> 2];
   break;
  }
  if (i1 & 64 | 0) {
   i4 = HEAP32[i5 + 64 >> 2] | 0;
   i2 = i7 + 36 | 0;
   i1 = 1;
   while (1) {
    if (i1 >>> 0 > i4 >>> 0) break L1;
    i3 = _MetaData_GetTableRow(i5, i1 & 16777215 | 184549376) | 0;
    if ((HEAP32[i3 + 4 >> 2] | 0) == (HEAP32[i2 >> 2] | 0)) break; else i1 = i1 + 1 | 0;
   }
   HEAP32[i6 >> 2] = i3;
  }
 } while (0);
 STACKTOP = i8;
 return;
}

function ___towcase(i1, i9) {
 i1 = i1 | 0;
 i9 = i9 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0;
 i6 = (i9 << 1) + -1 | 0;
 i7 = i9 + -1 | 0;
 L1 : do if (!((i1 + -43008 | 0) >>> 0 < 22272 | ((i1 + -11776 | 0) >>> 0 < 30784 | ((i1 + -1536 | 0) >>> 0 < 2560 | (_iswalpha(i1) | 0) == 0)))) {
  i2 = (i9 | 0) != 0;
  if (i2 & (i1 + -4256 | 0) >>> 0 < 46) {
   if ((i1 | 0) > 4293) switch (i1 | 0) {
   case 4295:
   case 4301:
    break;
   default:
    break L1;
   }
   i1 = i1 + 7264 | 0;
   break;
  }
  if ((i1 + -11520 | 0) >>> 0 < 38 & (i2 ^ 1)) {
   i1 = i1 + -7264 | 0;
   break;
  } else i2 = 0;
  do {
   i4 = HEAP8[11148 + (i2 << 2) + 2 >> 0] | 0;
   i5 = i4 << 24 >> 24;
   i3 = i1 - (HEAPU16[11148 + (i2 << 2) >> 1] | 0) | 0;
   if ((i3 - (i5 & i7) | 0) >>> 0 < (HEAPU8[11148 + (i2 << 2) + 3 >> 0] | 0) >>> 0) {
    i8 = 11;
    break;
   }
   i2 = i2 + 1 | 0;
  } while ((i2 | 0) != 61);
  if ((i8 | 0) == 11) if (i4 << 24 >> 24 == 1) {
   i1 = i9 + i1 - (i3 & 1) | 0;
   break;
  } else {
   i1 = (Math_imul(i5, i6) | 0) + i1 | 0;
   break;
  }
  i4 = 1 - i9 | 0;
  i2 = HEAP16[10660 + (i4 << 1) >> 1] | 0;
  L20 : do if (i2 << 16 >> 16) {
   i3 = 0;
   while (1) {
    if ((i2 & 65535 | 0) == (i1 | 0)) break;
    i3 = i3 + 1 | 0;
    i2 = HEAP16[10660 + (i3 << 2) + (i4 << 1) >> 1] | 0;
    if (!(i2 << 16 >> 16)) break L20;
   }
   i1 = HEAPU16[10660 + (i3 << 2) + (i9 << 1) >> 1] | 0;
   break L1;
  } while (0);
  return ((i1 + -66600 + (i9 * 40 | 0) | 0) >>> 0 < 40 ? i1 + -40 + (i9 * 80 | 0) | 0 : i1) | 0;
 } while (0);
 return i1 | 0;
}

function _mbtowc(i1, i6, i4) {
 i1 = i1 | 0;
 i6 = i6 | 0;
 i4 = i4 | 0;
 var i2 = 0, i3 = 0, i5 = 0, i7 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i2 = i7;
 L1 : do if (!i6) i1 = 0; else {
  do if (i4 | 0) {
   i5 = (i1 | 0) == 0 ? i2 : i1;
   i1 = HEAP8[i6 >> 0] | 0;
   if (i1 << 24 >> 24 > -1) {
    HEAP32[i5 >> 2] = i1 & 255;
    i1 = i1 << 24 >> 24 != 0 & 1;
    break L1;
   }
   i3 = (HEAP32[HEAP32[(___pthread_self_445() | 0) + 188 >> 2] >> 2] | 0) == 0;
   i1 = HEAP8[i6 >> 0] | 0;
   if (i3) {
    HEAP32[i5 >> 2] = i1 << 24 >> 24 & 57343;
    i1 = 1;
    break L1;
   }
   i1 = (i1 & 255) + -194 | 0;
   if (i1 >>> 0 <= 50) {
    i2 = i6 + 1 | 0;
    i3 = HEAP32[4508 + (i1 << 2) >> 2] | 0;
    if (i4 >>> 0 < 4 ? i3 & -2147483648 >>> ((i4 * 6 | 0) + -6 | 0) | 0 : 0) break;
    i1 = HEAPU8[i2 >> 0] | 0;
    i4 = i1 >>> 3;
    if ((i4 + -16 | i4 + (i3 >> 26)) >>> 0 <= 7) {
     i1 = i1 + -128 | i3 << 6;
     if ((i1 | 0) >= 0) {
      HEAP32[i5 >> 2] = i1;
      i1 = 2;
      break L1;
     }
     i2 = (HEAPU8[i6 + 2 >> 0] | 0) + -128 | 0;
     if (i2 >>> 0 <= 63) {
      i2 = i2 | i1 << 6;
      if ((i2 | 0) >= 0) {
       HEAP32[i5 >> 2] = i2;
       i1 = 3;
       break L1;
      }
      i1 = (HEAPU8[i6 + 3 >> 0] | 0) + -128 | 0;
      if (i1 >>> 0 <= 63) {
       HEAP32[i5 >> 2] = i1 | i2 << 6;
       i1 = 4;
       break L1;
      }
     }
    }
   }
  } while (0);
  HEAP32[(___errno_location() | 0) >> 2] = 84;
  i1 = -1;
 } while (0);
 STACKTOP = i7;
 return i1 | 0;
}

function _Type_IsMethod(i8, i1, i3, i7, i9) {
 i8 = i8 | 0;
 i1 = i1 | 0;
 i3 = i3 | 0;
 i7 = i7 | 0;
 i9 = i9 | 0;
 var i2 = 0, i4 = 0, i5 = 0, i6 = 0, i10 = 0, i11 = 0, i12 = 0;
 i12 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i10 = i12 + 4 | 0;
 i4 = i12;
 i5 = (_strlen(i1) | 0) + -1 | 0;
 i2 = HEAP32[i8 + 16 >> 2] | 0;
 if ((HEAP8[i1 + i5 >> 0] | 0) == 62) if (!(_strncmp(i2, i1, i5) | 0)) i11 = 4; else i1 = 0; else if (!(_strcmp(i2, i1) | 0)) i11 = 4; else i1 = 0;
 L4 : do if ((i11 | 0) == 4) {
  HEAP32[i10 >> 2] = _MetaData_GetBlob(HEAP32[i8 + 20 >> 2] | 0, i4) | 0;
  if ((_MetaData_DecodeSigEntry(i10) | 0) & 16 | 0) _MetaData_DecodeSigEntry(i10) | 0;
  if ((_MetaData_DecodeSigEntry(i10) | 0) == (i7 | 0)) {
   i6 = (HEAP32[(HEAP32[8595] | 0) + 8 >> 2] | 0) == (i3 | 0) ? 0 : i3;
   i5 = i7 + 1 | 0;
   i2 = i8 + 4 | 0;
   i1 = 0;
   while (1) {
    if (i1 >>> 0 >= i5 >>> 0) {
     i1 = 1;
     break L4;
    }
    i3 = _Type_GetTypeFromSig(HEAP32[i2 >> 2] | 0, i10, 0, 0) | 0;
    if (!i1) i4 = i6; else i4 = HEAP32[(HEAP32[8595] | 0) + (HEAPU8[i9 + (i1 + -1) >> 0] << 2) >> 2] | 0;
    if ((i3 | 0) != 0 ? (HEAP32[i3 + 96 >> 2] | 0) != 0 : 0) {
     if (!((i3 | 0) == (i4 | 0) ? 1 : (i4 | 0) == (HEAP32[(HEAP32[8595] | 0) + 4 >> 2] | 0))) {
      i1 = 0;
      break L4;
     }
    } else i11 = 14;
    if ((i11 | 0) == 14 ? (i11 = 0, (i3 | 0) != (i4 | 0)) : 0) {
     i1 = 0;
     break L4;
    }
    i1 = i1 + 1 | 0;
   }
  } else i1 = 0;
 } while (0);
 STACKTOP = i12;
 return i1 | 0;
}

function _FindVirtualOverriddenMethod(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0, i13 = 0, i14 = 0;
 i8 = i1 + 60 | 0;
 i9 = i1 + 52 | 0;
 i10 = i1 + 16 | 0;
 i11 = i1 + 20 | 0;
 i12 = i1 + 4 | 0;
 i7 = i1 + 48 | 0;
 L1 : while (1) {
  i5 = i2 + 4 | 0;
  i6 = i2 + 92 | 0;
  i3 = i2 + 80 | 0;
  i1 = HEAP32[(HEAP32[i5 >> 2] | 0) + 120 >> 2] | 0;
  while (1) {
   if (!i1) break;
   i4 = _MetaData_GetTableRow(HEAP32[i5 >> 2] | 0, i1 & 16777215 | 419430400) | 0;
   if ((HEAP32[i4 >> 2] | 0) == (HEAP32[i3 >> 2] | 0) ? (i14 = HEAP32[(_MetaData_GetMethodDefFromDefRefOrSpec(HEAP32[i5 >> 2] | 0, HEAP32[i4 + 8 >> 2] | 0, HEAP32[i6 >> 2] | 0, HEAP32[i8 >> 2] | 0) | 0) + 52 >> 2] | 0, (i14 | 0) == (HEAP32[i9 >> 2] | 0)) : 0) {
    i13 = 6;
    break L1;
   }
   i1 = i1 + -1 | 0;
  }
  i3 = i2 + 44 | 0;
  i1 = HEAP32[i2 + 48 >> 2] | 0;
  while (1) {
   i14 = i1;
   i1 = i1 + -1 | 0;
   if (!i14) break;
   if (_MetaData_CompareNameAndSig(HEAP32[i10 >> 2] | 0, HEAP32[i11 >> 2] | 0, HEAP32[i12 >> 2] | 0, HEAP32[(HEAP32[i7 >> 2] | 0) + 92 >> 2] | 0, HEAP32[i8 >> 2] | 0, HEAP32[(HEAP32[i3 >> 2] | 0) + (i1 << 2) >> 2] | 0, HEAP32[i6 >> 2] | 0, 0) | 0) {
    i13 = 11;
    break L1;
   }
  }
  i2 = HEAP32[i2 + 40 >> 2] | 0;
  if (!i2) {
   i1 = 0;
   break;
  }
 }
 if ((i13 | 0) == 6) i1 = _MetaData_GetTableRow(HEAP32[i5 >> 2] | 0, HEAP32[i4 + 4 >> 2] | 0) | 0; else if ((i13 | 0) == 11) i1 = HEAP32[(HEAP32[i3 >> 2] | 0) + (i1 << 2) >> 2] | 0;
 return i1 | 0;
}

function _fnmatch(i3, i4, i8) {
 i3 = i3 | 0;
 i4 = i4 | 0;
 i8 = i8 | 0;
 var i1 = 0, i2 = 0, i5 = 0, i6 = 0, i7 = 0, i9 = 0, i10 = 0;
 i9 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i6 = i9;
 i7 = (i8 & 8 | 0) == 0;
 L1 : do if (!(i8 & 1)) {
  L3 : do if (!i7) {
   i2 = i4;
   i1 = i4;
   while (1) {
    switch (HEAP8[i1 >> 0] | 0) {
    case 0:
     break L3;
    case 47:
     {
      if (!(_fnmatch_internal(i3, -1, i4, i1 - i2 | 0, i8) | 0)) {
       i1 = 0;
       break L1;
      }
      break;
     }
    default:
     {}
    }
    i1 = i1 + 1 | 0;
   }
  } while (0);
  i1 = _fnmatch_internal(i3, -1, i4, -1, i8) | 0;
 } else {
  i1 = i4;
  while (1) {
   i4 = i1;
   L13 : while (1) {
    switch (HEAP8[i4 >> 0] | 0) {
    case 47:
    case 0:
     {
      i2 = i3;
      break L13;
     }
    default:
     {}
    }
    i4 = i4 + 1 | 0;
   }
   L16 : while (1) {
    i5 = _pat_next(i2, -1, i6, i8) | 0;
    switch (i5 | 0) {
    case 0:
    case 47:
     break L16;
    default:
     {}
    }
    i2 = i2 + (HEAP32[i6 >> 2] | 0) | 0;
   }
   i10 = HEAP8[i4 >> 0] | 0;
   if ((i5 | 0) != (i10 << 24 >> 24 | 0) & (i7 | i10 << 24 >> 24 == 0)) {
    i1 = 1;
    break L1;
   }
   i1 = (_fnmatch_internal(i3, i2 - i3 | 0, i1, i4 - i1 | 0, i8) | 0) != 0;
   if ((i5 | 0) == 0 | i1) {
    i1 = i1 & 1;
    break L1;
   }
   i3 = i2 + (HEAP32[i6 >> 2] | 0) | 0;
   i1 = i4 + 1 | 0;
  }
 } while (0);
 STACKTOP = i9;
 return i1 | 0;
}

function _socket(i2, i6, i3) {
 i2 = i2 | 0;
 i6 = i6 | 0;
 i3 = i3 | 0;
 var i1 = 0, i4 = 0, i5 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0;
 i9 = STACKTOP;
 STACKTOP = STACKTOP + 96 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(96);
 i7 = i9 + 32 | 0;
 i8 = i9 + 16 | 0;
 i5 = i9 + 8 | 0;
 i1 = i9;
 i10 = i9 + 72 | 0;
 i4 = i9 + 48 | 0;
 HEAP32[i10 >> 2] = i2;
 HEAP32[i10 + 4 >> 2] = i6;
 HEAP32[i10 + 8 >> 2] = i3;
 HEAP32[i10 + 12 >> 2] = 0;
 HEAP32[i10 + 16 >> 2] = 0;
 HEAP32[i10 + 20 >> 2] = 0;
 HEAP32[i1 >> 2] = 1;
 HEAP32[i1 + 4 >> 2] = i10;
 i1 = ___syscall_ret(___syscall102(102, i1 | 0) | 0) | 0;
 do if ((i1 | 0) < 0) {
  if ((HEAP32[(___errno_location() | 0) >> 2] | 0) == 22) {
   if (!(i6 & 526336)) break;
  } else if ((i6 & 526336 | 0) == 0 | (HEAP32[(___errno_location() | 0) >> 2] | 0) != 93) break;
  HEAP32[i4 >> 2] = i2;
  HEAP32[i4 + 4 >> 2] = i6 & -526337;
  HEAP32[i4 + 8 >> 2] = i3;
  HEAP32[i4 + 12 >> 2] = 0;
  HEAP32[i4 + 16 >> 2] = 0;
  HEAP32[i4 + 20 >> 2] = 0;
  HEAP32[i5 >> 2] = 1;
  HEAP32[i5 + 4 >> 2] = i4;
  i1 = ___syscall_ret(___syscall102(102, i5 | 0) | 0) | 0;
  if ((i1 | 0) >= 0) {
   if (i6 & 524288 | 0) {
    HEAP32[i8 >> 2] = i1;
    HEAP32[i8 + 4 >> 2] = 2;
    HEAP32[i8 + 8 >> 2] = 1;
    ___syscall221(221, i8 | 0) | 0;
   }
   if (i6 & 2048) {
    HEAP32[i7 >> 2] = i1;
    HEAP32[i7 + 4 >> 2] = 4;
    HEAP32[i7 + 8 >> 2] = 2048;
    ___syscall221(221, i7 | 0) | 0;
   }
  }
 } while (0);
 STACKTOP = i9;
 return i1 | 0;
}

function ___mo_lookup(i12, i13, i10) {
 i12 = i12 | 0;
 i13 = i13 | 0;
 i10 = i10 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i11 = 0;
 i11 = (HEAP32[i12 >> 2] | 0) + 1794895138 | 0;
 i3 = _swapc(HEAP32[i12 + 8 >> 2] | 0, i11) | 0;
 i1 = _swapc(HEAP32[i12 + 12 >> 2] | 0, i11) | 0;
 i2 = _swapc(HEAP32[i12 + 16 >> 2] | 0, i11) | 0;
 L1 : do if ((i3 >>> 0 < i13 >>> 2 >>> 0 ? (i9 = i13 - (i3 << 2) | 0, i1 >>> 0 < i9 >>> 0 & i2 >>> 0 < i9 >>> 0) : 0) ? ((i2 | i1) & 3 | 0) == 0 : 0) {
  i9 = i1 >>> 2;
  i8 = i2 >>> 2;
  i7 = 0;
  while (1) {
   i5 = i3 >>> 1;
   i6 = i7 + i5 | 0;
   i4 = i6 << 1;
   i2 = i4 + i9 | 0;
   i1 = _swapc(HEAP32[i12 + (i2 << 2) >> 2] | 0, i11) | 0;
   i2 = _swapc(HEAP32[i12 + (i2 + 1 << 2) >> 2] | 0, i11) | 0;
   if (!(i2 >>> 0 < i13 >>> 0 & i1 >>> 0 < (i13 - i2 | 0) >>> 0)) {
    i1 = 0;
    break L1;
   }
   if (HEAP8[i12 + (i2 + i1) >> 0] | 0) {
    i1 = 0;
    break L1;
   }
   i1 = _strcmp(i10, i12 + i2 | 0) | 0;
   if (!i1) break;
   i1 = (i1 | 0) < 0;
   if ((i3 | 0) == 1) {
    i1 = 0;
    break L1;
   } else {
    i7 = i1 ? i7 : i6;
    i3 = i1 ? i5 : i3 - i5 | 0;
   }
  }
  i1 = i4 + i8 | 0;
  i2 = _swapc(HEAP32[i12 + (i1 << 2) >> 2] | 0, i11) | 0;
  i1 = _swapc(HEAP32[i12 + (i1 + 1 << 2) >> 2] | 0, i11) | 0;
  if (i1 >>> 0 < i13 >>> 0 & i2 >>> 0 < (i13 - i1 | 0) >>> 0) i1 = (HEAP8[i12 + (i1 + i2) >> 0] | 0) == 0 ? i12 + i1 | 0 : 0; else i1 = 0;
 } else i1 = 0; while (0);
 return i1 | 0;
}

function _MetaData_GetTypeMethodField(i2, i3, i10, i4, i5) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i10 = i10 | 0;
 i4 = i4 | 0;
 i5 = i5 | 0;
 var i1 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i11 = 0;
 i11 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i6 = i11;
 switch ((i3 >>> 24 & 255) << 24 >> 24) {
 case 27:
 case 1:
 case 2:
  {
   i1 = _MetaData_GetTypeDefFromDefRefOrSpec(i2, i3, i4, i5) | 0;
   if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
   HEAP32[i10 >> 2] = 0;
   break;
  }
 case 6:
  {
   i9 = 5;
   break;
  }
 case 4:
  {
   i9 = 9;
   break;
  }
 case 10:
  {
   if ((HEAP8[(_MetaData_GetBlob(HEAP32[(_MetaData_GetTableRow(i2, i3) | 0) + 12 >> 2] | 0, 0) | 0) >> 0] | 0) == 6) i9 = 9; else i9 = 5;
   break;
  }
 default:
  {
   HEAP32[i6 >> 2] = i3;
   _Crash(16110, i6);
  }
 }
 if ((i9 | 0) == 5) {
  i1 = _MetaData_GetMethodDefFromDefRefOrSpec(i2, i3, i4, i5) | 0;
  if ((HEAP8[i1 + 32 >> 0] | 0) == 0 ? (i7 = _MetaData_GetTypeDefFromMethodDef(i1) | 0, (HEAP8[i7 + 32 >> 0] | 0) == 0) : 0) _MetaData_Fill_TypeDef_(i7, 0, 0);
  HEAP32[i10 >> 2] = 1;
 } else if ((i9 | 0) == 9) {
  i1 = _MetaData_GetFieldDefFromDefOrRef(i2, i3, i4, i5) | 0;
  if ((HEAP32[i1 + 24 >> 2] | 0) == 0 ? (i8 = _MetaData_GetTypeDefFromFieldDef(i1) | 0, (HEAP8[i8 + 32 >> 0] | 0) == 0) : 0) _MetaData_Fill_TypeDef_(i8, 0, 0);
  HEAP32[i10 >> 2] = 2;
 }
 STACKTOP = i11;
 return i1 | 0;
}

function _TreeInsert(i1, i5) {
 i1 = i1 | 0;
 i5 = i5 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0, i12 = 0;
 i12 = STACKTOP;
 STACKTOP = STACKTOP + 160 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(160);
 i11 = i12;
 i7 = HEAP32[7046] | 0;
 i8 = i5 + 8 | 0;
 i9 = i5 + 4 | 0;
 i10 = i5 + 9 | 0;
 if ((i7 | 0) == (i1 | 0)) {
  HEAP8[i8 >> 0] = 1;
  HEAP32[i9 >> 2] = i1;
  HEAP32[i5 >> 2] = i1;
  HEAP8[i10 >> 0] = 0;
  i1 = i5;
 } else {
  i2 = 0;
  i4 = HEAP32[7047] | 0;
  do {
   i3 = i2;
   i2 = i2 + 1 | 0;
   HEAP32[i11 + (i3 << 2) >> 2] = i4;
   i3 = i4 >>> 0 < i5 >>> 0 & 1;
   i6 = i4 + (i3 << 2) | 0;
   i4 = HEAP32[i6 >> 2] | 0;
  } while ((i4 | 0) != (i7 | 0));
  HEAP32[i6 >> 2] = i5;
  HEAP8[i8 >> 0] = 1;
  i8 = HEAP32[7046] | 0;
  HEAP32[i9 >> 2] = i8;
  HEAP32[i5 >> 2] = i8;
  HEAP8[i10 >> 0] = 0;
  L7 : while (1) {
   while (1) {
    i6 = i2 + -1 | 0;
    if ((i2 | 0) <= 0) break L7;
    i7 = (i6 | 0) != 0;
    i8 = i11 + (i6 << 2) | 0;
    i4 = HEAP32[i8 >> 2] | 0;
    i5 = i11 + (i2 + -2 << 2) | 0;
    if (i7) i3 = (HEAP32[(HEAP32[i5 >> 2] | 0) + 4 >> 2] | 0) == (i4 | 0) & 1;
    i2 = _TreeSplit(_TreeSkew(i4) | 0) | 0;
    HEAP32[i8 >> 2] = i2;
    if (!i7) break;
    HEAP32[(HEAP32[i5 >> 2] | 0) + (i3 << 2) >> 2] = i2;
    i2 = i6;
   }
   i1 = HEAP32[i11 >> 2] | 0;
   i2 = 0;
  }
 }
 STACKTOP = i12;
 return i1 | 0;
}

function _main(i7, i3) {
 i7 = i7 | 0;
 i3 = i3 | 0;
 var i1 = 0, i2 = 0, i4 = 0, i5 = 0, i6 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0;
 i11 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i10 = i11 + 16 | 0;
 i9 = i11 + 8 | 0;
 i4 = i11;
 if ((i7 | 0) < 2) _ShowUsage(); else i6 = 1;
 L3 : while (1) {
  i8 = i3 + (i6 << 2) | 0;
  if (i6 >>> 0 >= i7 >>> 0) break;
  i1 = HEAP32[i8 >> 2] | 0;
  if ((HEAP8[i1 >> 0] | 0) == 45) i2 = 1; else break;
  L6 : while (1) {
   switch (HEAP8[i1 + i2 >> 0] | 0) {
   case 0:
    break L6;
   case 118:
    break;
   default:
    {
     i5 = 7;
     break L3;
    }
   }
   HEAP32[8589] = (HEAP32[8589] | 0) + 1;
   i2 = i2 + 1 | 0;
  }
  i6 = i6 + 1 | 0;
 }
 if ((i5 | 0) == 7) {
  HEAP32[i4 >> 2] = HEAP8[i1 + 1 >> 0];
  _Crash(11887, i4);
 }
 _JIT_Execute_Init();
 _MetaData_Init();
 _Type_Init();
 _Heap_Init();
 _Finalizer_Init();
 i1 = HEAP32[i8 >> 2] | 0;
 i2 = _CLIFile_Load(i1) | 0;
 i3 = _microTime() | 0;
 i4 = tempRet0;
 if (!(HEAP32[i2 + 12 >> 2] | 0)) {
  HEAP32[i9 >> 2] = i1;
  _printf(11909, i9) | 0;
  i1 = 0;
 } else i1 = _CLIFile_Execute(i2, i7 - i6 | 0, i8) | 0;
 i9 = _microTime() | 0;
 i9 = _i64Subtract(i9 | 0, tempRet0 | 0, i3 | 0, i4 | 0) | 0;
 i9 = ___udivdi3(i9 | 0, tempRet0 | 0, 1e3, 0) | 0;
 HEAP32[i10 >> 2] = i9;
 _printf(11957, i10) | 0;
 STACKTOP = i11;
 return i1 | 0;
}

function _InternalCall_Map(i6) {
 i6 = i6 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i7 = 0, i8 = 0, i9 = 0;
 i9 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i8 = i9;
 i7 = i6 + 48 | 0;
 L1 : do if ((HEAP32[(HEAP32[i7 >> 2] | 0) + 40 >> 2] | 0) == (HEAP32[(HEAP32[8595] | 0) + 80 >> 2] | 0)) {
  i1 = _Map_Delegate(i6) | 0;
  if (!i1) i2 = 9; else i2 = 10;
 } else {
  i2 = 0;
  i1 = 0;
  i4 = 1148;
  while (1) {
   i5 = HEAP32[i4 + 8 >> 2] | 0;
   if (!i5) {
    i2 = 9;
    break L1;
   }
   i3 = HEAP32[i4 >> 2] | 0;
   i1 = (i3 | 0) == 0 ? i1 : i3;
   i3 = HEAP32[i4 + 4 >> 2] | 0;
   i2 = (i3 | 0) == 0 ? i2 : i3;
   i3 = HEAP32[i7 >> 2] | 0;
   if (((_strcmp(HEAP32[i3 + 16 >> 2] | 0, i1) | 0) == 0 ? (_strcmp(HEAP32[i3 + 12 >> 2] | 0, i2) | 0) == 0 : 0) ? _Type_IsMethod(i6, i5, HEAP32[(HEAP32[8595] | 0) + ((HEAPU8[i4 + 16 >> 0] | 0) << 2) >> 2] | 0, HEAPU8[i4 + 17 >> 0] | 0, i4 + 18 | 0) | 0 : 0) break;
   i4 = i4 + 24 | 0;
  }
  i1 = HEAP32[i4 + 12 >> 2] | 0;
  i2 = 10;
 } while (0);
 if ((i2 | 0) == 9) {
  i5 = HEAP32[i7 >> 2] | 0;
  i7 = HEAP32[i5 + 12 >> 2] | 0;
  i9 = HEAP32[i6 + 16 >> 2] | 0;
  HEAP32[i8 >> 2] = HEAP32[i5 + 16 >> 2];
  HEAP32[i8 + 4 >> 2] = i7;
  HEAP32[i8 + 8 >> 2] = i9;
  _Crash(12258, i8);
 } else if ((i2 | 0) == 10) {
  STACKTOP = i9;
  return i1 | 0;
 }
 return 0;
}

function _Generics_GetMethodDefFromCoreMethod(i7, i8, i2, i5) {
 i7 = i7 | 0;
 i8 = i8 | 0;
 i2 = i2 | 0;
 i5 = i5 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i6 = 0, i9 = 0;
 i3 = i7 + 64 | 0;
 i6 = i2 << 2;
 i1 = i3;
 while (1) {
  i1 = HEAP32[i1 >> 2] | 0;
  if (!i1) {
   i4 = 7;
   break;
  }
  if ((HEAP32[i1 + 8 >> 2] | 0) == (i2 | 0) ? (_memcmp(i1 + 12 | 0, i5, i6) | 0) == 0 : 0) {
   i4 = 5;
   break;
  }
  i1 = i1 + 4 | 0;
 }
 if ((i4 | 0) == 5) i1 = HEAP32[i1 >> 2] | 0; else if ((i4 | 0) == 7) {
  i9 = _mallocForever(i6 + 12 | 0) | 0;
  HEAP32[i9 + 4 >> 2] = HEAP32[i3 >> 2];
  HEAP32[i3 >> 2] = i9;
  HEAP32[i9 + 8 >> 2] = i2;
  i4 = i9 + 12 | 0;
  _memcpy(i4 | 0, i5 | 0, i6 | 0) | 0;
  i1 = _mallocForever(68) | 0;
  HEAP32[i9 >> 2] = i1;
  i2 = i1 + 4 | 0;
  i3 = i2 + 64 | 0;
  do {
   HEAP32[i2 >> 2] = 0;
   i2 = i2 + 4 | 0;
  } while ((i2 | 0) < (i3 | 0));
  HEAP32[i1 >> 2] = i1;
  HEAP32[i1 + 4 >> 2] = HEAP32[i7 + 4 >> 2];
  HEAP32[i1 + 8 >> 2] = HEAP32[i7 + 8 >> 2];
  HEAP16[i1 + 12 >> 1] = HEAP16[i7 + 12 >> 1] | 0;
  HEAP16[i1 + 14 >> 1] = HEAP16[i7 + 14 >> 1] | 0;
  HEAP32[i1 + 16 >> 2] = HEAP32[i7 + 16 >> 2];
  HEAP32[i1 + 20 >> 2] = HEAP32[i7 + 20 >> 2];
  HEAP32[i1 + 56 >> 2] = HEAP32[i7 + 56 >> 2];
  HEAP32[i1 + 60 >> 2] = i4;
  _MetaData_Fill_MethodDef(i8, i1, HEAP32[i8 + 92 >> 2] | 0, i4);
 }
 return i1 | 0;
}

function _MetaData_CompareNameAndSig(i1, i2, i5, i6, i7, i4, i8, i9) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i5 = i5 | 0;
 i6 = i6 | 0;
 i7 = i7 | 0;
 i4 = i4 | 0;
 i8 = i8 | 0;
 i9 = i9 | 0;
 var i3 = 0, i10 = 0, i11 = 0, i12 = 0;
 i12 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i10 = i12 + 4 | 0;
 i11 = i12;
 if (!(_strcmp(i1, HEAP32[i4 + 16 >> 2] | 0) | 0)) {
  HEAP32[i10 >> 2] = _MetaData_GetBlob(i2, 0) | 0;
  HEAP32[i11 >> 2] = _MetaData_GetBlob(HEAP32[i4 + 20 >> 2] | 0, 0) | 0;
  i1 = _MetaData_DecodeSigEntry(i10) | 0;
  L3 : do if ((i1 | 0) == (_MetaData_DecodeSigEntry(i11) | 0)) {
   if (i1 & 16 | 0 ? (i3 = _MetaData_DecodeSigEntry(i10) | 0, (i3 | 0) != (_MetaData_DecodeSigEntry(i11) | 0)) : 0) {
    i1 = 0;
    break;
   }
   i1 = _MetaData_DecodeSigEntry(i10) | 0;
   if ((i1 | 0) == (_MetaData_DecodeSigEntry(i11) | 0)) {
    i3 = i1 + 1 | 0;
    i2 = i4 + 4 | 0;
    i1 = 0;
    while (1) {
     if (i1 >>> 0 >= i3 >>> 0) {
      i1 = 1;
      break L3;
     }
     i4 = _Type_GetTypeFromSig(i5, i10, i6, i7) | 0;
     if ((i4 | 0) == (_Type_GetTypeFromSig(HEAP32[i2 >> 2] | 0, i11, i8, i9) | 0)) i1 = i1 + 1 | 0; else {
      i1 = 0;
      break;
     }
    }
   } else i1 = 0;
  } else i1 = 0; while (0);
 } else i1 = 0;
 STACKTOP = i12;
 return i1 | 0;
}

function _System_String_InternalTrim(i2, i1, i10) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 i10 = i10 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0;
 i8 = HEAP32[i1 >> 2] | 0;
 i4 = HEAP32[i1 + 4 >> 2] | 0;
 i7 = i8 + 4 | 0;
 i8 = HEAP32[i8 >> 2] | 0;
 i9 = HEAP32[i2 >> 2] | 0;
 i6 = i2 + 4 | 0;
 L1 : do if (!(i4 & 1)) i5 = 0; else {
  i1 = 0;
  while (1) {
   if (i1 >>> 0 >= i9 >>> 0) {
    i5 = 0;
    break L1;
   }
   i3 = HEAP16[i6 + (i1 << 1) >> 1] | 0;
   i2 = 0;
   while (1) {
    if (i2 >>> 0 >= i8 >>> 0) {
     i5 = i1;
     break L1;
    }
    if (i3 << 16 >> 16 == (HEAP16[i7 + (i2 << 1) >> 1] | 0)) break; else i2 = i2 + 1 | 0;
   }
   i1 = i1 + 1 | 0;
  }
 } while (0);
 L10 : do if (!(i4 & 2)) i1 = i9; else {
  i1 = i9;
  L11 : while (1) {
   i2 = i1 + -1 | 0;
   if (i2 >>> 0 < i5 >>> 0) {
    i1 = i9;
    break L10;
   }
   i4 = HEAP16[i6 + (i2 << 1) >> 1] | 0;
   i3 = 0;
   while (1) {
    if (i3 >>> 0 >= i8 >>> 0) break L10;
    if (i4 << 16 >> 16 == (HEAP16[i7 + (i3 << 1) >> 1] | 0)) {
     i1 = i2;
     continue L11;
    } else i3 = i3 + 1 | 0;
   }
  }
 } while (0);
 i8 = i1 - i5 | 0;
 i9 = _CreateStringHeapObj(i8) | 0;
 _memcpy(i9 + 4 | 0, i6 + (i5 << 1) | 0, i8 << 1 | 0) | 0;
 HEAP32[i10 >> 2] = i9;
 return 0;
}

function _Type_Init() {
 var i1 = 0, i2 = 0;
 HEAP32[8610] = 51;
 HEAP32[8595] = _mallocForever(204) | 0;
 i2 = 0;
 while (1) {
  i1 = HEAP32[8610] | 0;
  if (i2 >>> 0 >= i1 >>> 0) {
   i2 = 0;
   break;
  }
  i1 = HEAP32[3692 + (i2 << 4) >> 2] | 0;
  if (i1 | 0) {
   i1 = _MetaData_GetTypeDefFromFullName(i1, HEAP32[3692 + (i2 << 4) + 4 >> 2] | 0, HEAP32[3692 + (i2 << 4) + 8 >> 2] | 0) | 0;
   HEAP32[(HEAP32[8595] | 0) + (i2 << 2) >> 2] = i1;
   i1 = HEAP32[(HEAP32[8595] | 0) + (i2 << 2) >> 2] | 0;
   HEAP8[i1 + 35 >> 0] = HEAP8[3692 + (i2 << 4) + 12 >> 0] | 0;
   HEAP32[i1 + 68 >> 2] = HEAPU8[3692 + (i2 << 4) + 13 >> 0];
   HEAP32[i1 + 64 >> 2] = HEAPU8[3692 + (i2 << 4) + 14 >> 0];
   HEAP32[i1 + 36 >> 2] = HEAPU8[3692 + (i2 << 4) + 15 >> 0];
  }
  i2 = i2 + 1 | 0;
 }
 while (1) {
  if (i2 >>> 0 >= i1 >>> 0) break;
  i1 = HEAP32[8595] | 0;
  if (HEAP32[3692 + (i2 << 4) >> 2] | 0) {
   i1 = HEAP32[i1 + (i2 << 2) >> 2] | 0;
   if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
  } else {
   i1 = _Type_GetArrayTypeDef(HEAP32[i1 + (HEAP32[3692 + (i2 << 4) + 8 >> 2] << 2) >> 2] | 0, 0, 0) | 0;
   HEAP32[(HEAP32[8595] | 0) + (i2 << 2) >> 2] = i1;
  }
  i2 = i2 + 1 | 0;
  i1 = HEAP32[8610] | 0;
 }
 return;
}

function _JSInterop_CallDotNet(i1, i3, i6, i7, i2) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i6 = i6 | 0;
 i7 = i7 | 0;
 i2 = i2 | 0;
 var i4 = 0, i5 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0;
 i11 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i10 = i11;
 i8 = i11 + 8 | 0;
 i9 = _Thread() | 0;
 i5 = _SystemString_FromCharPtrASCII(i2) | 0;
 HEAP32[i8 >> 2] = i5;
 _Heap_MakeUndeletable(i5);
 i5 = _CLIFile_GetMetaDataForLoadedAssembly(i1) | 0;
 i1 = _MetaData_GetTypeDefFromName(i5, i3, i6, 0, 1) | 0;
 if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
 i3 = HEAP32[i1 + 112 >> 2] | 0;
 i2 = i1 + 116 | 0;
 i1 = 0;
 while (1) {
  if (i1 >>> 0 >= i3 >>> 0) {
   i1 = 6;
   break;
  }
  i4 = HEAP32[(HEAP32[i2 >> 2] | 0) + (i1 << 2) >> 2] | 0;
  if (!(_strcmp(HEAP32[i4 + 16 >> 2] | 0, i7) | 0)) {
   i1 = 7;
   break;
  } else i1 = i1 + 1 | 0;
 }
 if ((i1 | 0) == 6) {
  HEAP32[i10 >> 2] = i6;
  HEAP32[i10 + 4 >> 2] = i7;
  _Crash(14418, i10);
 } else if ((i1 | 0) == 7) {
  _Thread_SetEntryPoint(i9, i5, HEAP32[i4 + 52 >> 2] | 0, i8, 4);
  i10 = _Thread_Execute() | 0;
  _Heap_MakeDeletable(HEAP32[i8 >> 2] | 0);
  STACKTOP = i11;
  return i10 | 0;
 }
 return 0;
}

function _MetaData_GetMethodDefFromDefRefOrSpec(i7, i2, i5, i8) {
 i7 = i7 | 0;
 i2 = i2 | 0;
 i5 = i5 | 0;
 i8 = i8 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i6 = 0, i9 = 0, i10 = 0;
 i10 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i10 + 8 | 0;
 i6 = i10;
 i9 = _MetaData_GetTableRow(i7, i2) | 0;
 i3 = HEAP32[i9 >> 2] | 0;
 L1 : do if (!i3) switch ((i2 >>> 24 & 255) << 24 >> 24) {
 case 6:
  {
   HEAP32[i9 >> 2] = i9;
   i1 = i9;
   break L1;
  }
 case 10:
  {
   i1 = HEAP32[i9 + 4 >> 2] | 0;
   switch ((i1 >>> 24 & 255) << 24 >> 24) {
   case 27:
   case 1:
    break;
   default:
    {
     HEAP32[i6 >> 2] = i1;
     _Crash(15789, i6);
    }
   }
   i1 = _MetaData_GetTypeDefFromDefRefOrSpec(i7, i1, i5, i8) | 0;
   if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
   i1 = _FindMethodInType(i1, HEAP32[i9 + 8 >> 2] | 0, i7, HEAP32[i9 + 12 >> 2] | 0, HEAP32[i1 + 92 >> 2] | 0, i8) | 0;
   break L1;
  }
 case 43:
  {
   i1 = _Generics_GetMethodDefFromSpec(i9, i5, i8) | 0;
   break L1;
  }
 default:
  {
   HEAP32[i4 >> 2] = i2;
   _Crash(15872, i4);
  }
 } else i1 = i3; while (0);
 STACKTOP = i10;
 return i1 | 0;
}

function _System_Enum_Internal_GetInfo(i1, i11, i2) {
 i1 = i1 | 0;
 i11 = i11 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0;
 i10 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i8 = i10 + 4 | 0;
 i9 = i10;
 i7 = _RuntimeType_DeRef(HEAP32[i11 >> 2] | 0) | 0;
 i4 = i7 + 100 | 0;
 i5 = _SystemArray_NewVector(HEAP32[(HEAP32[8595] | 0) + 124 >> 2] | 0, (HEAP32[i4 >> 2] | 0) + -1 | 0) | 0;
 i6 = _SystemArray_NewVector(HEAP32[(HEAP32[8595] | 0) + 128 >> 2] | 0, (HEAP32[i4 >> 2] | 0) + -1 | 0) | 0;
 i7 = i7 + 104 | 0;
 i3 = 0;
 i1 = 0;
 while (1) {
  if (i3 >>> 0 >= (HEAP32[i4 >> 2] | 0) >>> 0) break;
  i2 = HEAP32[(HEAP32[i7 >> 2] | 0) + (i3 << 2) >> 2] | 0;
  if (HEAP16[i2 + 8 >> 1] & 64) {
   HEAP32[i8 >> 2] = _SystemString_FromCharPtrASCII(HEAP32[i2 + 12 >> 2] | 0) | 0;
   _SystemArray_StoreElement(i5, i1, i8);
   _MetaData_GetConstant(HEAP32[i2 + 4 >> 2] | 0, HEAP32[i2 + 36 >> 2] | 0, i9);
   _SystemArray_StoreElement(i6, i1, i9);
   i1 = i1 + 1 | 0;
  }
  i3 = i3 + 1 | 0;
 }
 HEAP32[HEAP32[i11 + 4 >> 2] >> 2] = i5;
 HEAP32[HEAP32[i11 + 8 >> 2] >> 2] = i6;
 STACKTOP = i10;
 return 0;
}

function _memchr(i2, i5, i1) {
 i2 = i2 | 0;
 i5 = i5 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0, i6 = 0, i7 = 0;
 i6 = i5 & 255;
 i3 = (i1 | 0) != 0;
 L1 : do if (i3 & (i2 & 3 | 0) != 0) {
  i4 = i5 & 255;
  while (1) {
   if ((HEAP8[i2 >> 0] | 0) == i4 << 24 >> 24) {
    i7 = 6;
    break L1;
   }
   i2 = i2 + 1 | 0;
   i1 = i1 + -1 | 0;
   i3 = (i1 | 0) != 0;
   if (!(i3 & (i2 & 3 | 0) != 0)) {
    i7 = 5;
    break;
   }
  }
 } else i7 = 5; while (0);
 if ((i7 | 0) == 5) if (i3) i7 = 6; else i1 = 0;
 L8 : do if ((i7 | 0) == 6) {
  i4 = i5 & 255;
  if ((HEAP8[i2 >> 0] | 0) != i4 << 24 >> 24) {
   i3 = Math_imul(i6, 16843009) | 0;
   L11 : do if (i1 >>> 0 > 3) while (1) {
    i6 = HEAP32[i2 >> 2] ^ i3;
    if ((i6 & -2139062144 ^ -2139062144) & i6 + -16843009 | 0) break;
    i2 = i2 + 4 | 0;
    i1 = i1 + -4 | 0;
    if (i1 >>> 0 <= 3) {
     i7 = 11;
     break L11;
    }
   } else i7 = 11; while (0);
   if ((i7 | 0) == 11) if (!i1) {
    i1 = 0;
    break;
   }
   while (1) {
    if ((HEAP8[i2 >> 0] | 0) == i4 << 24 >> 24) break L8;
    i2 = i2 + 1 | 0;
    i1 = i1 + -1 | 0;
    if (!i1) {
     i1 = 0;
     break;
    }
   }
  }
 } while (0);
 return (i1 | 0 ? i2 : 0) | 0;
}

function _MethodState_Direct(i6, i7, i2, i8) {
 i6 = i6 | 0;
 i7 = i7 | 0;
 i2 = i2 | 0;
 i8 = i8 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i5 = 0;
 if ((HEAP8[i7 + 32 >> 0] | 0) == 0 ? (i1 = _MetaData_GetTypeDefFromMethodDef(i7) | 0, (HEAP8[i1 + 32 >> 0] | 0) == 0) : 0) _MetaData_Fill_TypeDef_(i1, 0, 0);
 i5 = _Thread_StackAlloc(i6, 56) | 0;
 HEAP32[i5 + 32 >> 2] = 0;
 HEAP32[i5 + 48 >> 2] = i2;
 HEAP32[i5 >> 2] = HEAP32[i7 + 4 >> 2];
 i1 = i5 + 4 | 0;
 HEAP32[i1 >> 2] = i7;
 i3 = i7 + 28 | 0;
 i2 = HEAP32[i3 >> 2] | 0;
 if (!i2) {
  _JIT_Prepare(i7, 0);
  i4 = HEAP32[i3 >> 2] | 0;
  i1 = HEAP32[(HEAP32[i1 >> 2] | 0) + 28 >> 2] | 0;
 } else {
  i4 = i2;
  i1 = i2;
 }
 HEAP32[i5 + 8 >> 2] = i4;
 HEAP32[i5 + 12 >> 2] = 0;
 HEAP32[i5 + 16 >> 2] = _Thread_StackAlloc(i6, HEAP32[i1 + 4 >> 2] | 0) | 0;
 HEAP32[i5 + 20 >> 2] = 0;
 HEAP32[i5 + 28 >> 2] = i8;
 HEAP32[i5 + 36 >> 2] = 0;
 HEAP32[i5 + 40 >> 2] = 0;
 i8 = i7 + 40 | 0;
 i7 = _Thread_StackAlloc(i6, (HEAP32[(HEAP32[i3 >> 2] | 0) + 8 >> 2] | 0) + (HEAP32[i8 >> 2] | 0) | 0) | 0;
 HEAP32[i5 + 24 >> 2] = i7;
 _memset(i7 | 0, 0, (HEAP32[(HEAP32[i3 >> 2] | 0) + 8 >> 2] | 0) + (HEAP32[i8 >> 2] | 0) | 0) | 0;
 return i5 | 0;
}

function _System_Net_Dns_Internal_GetHostEnt(i1, i2, i7) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i7 = i7 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i8 = 0;
 i8 = STACKTOP;
 STACKTOP = STACKTOP + 272 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(272);
 i4 = i8;
 i5 = i8 + 8 | 0;
 i6 = HEAP32[i2 + 4 >> 2] | 0;
 i3 = _SystemString_GetString(HEAP32[i2 >> 2] | 0, i4) | 0;
 i4 = HEAP32[i4 >> 2] | 0;
 i1 = 0;
 while (1) {
  i2 = i5 + i1 | 0;
  if (!(i1 >>> 0 < 256 & i1 >>> 0 < i4 >>> 0)) break;
  HEAP8[i2 >> 0] = HEAP16[i3 + (i1 << 1) >> 1];
  i1 = i1 + 1 | 0;
 }
 HEAP8[i2 >> 0] = 0;
 i4 = _gethostbyname(i5 | 0) | 0;
 HEAP32[i6 >> 2] = _SystemString_FromCharPtrASCII(HEAP32[i4 >> 2] | 0) | 0;
 i4 = i4 + 16 | 0;
 i2 = HEAP32[i4 >> 2] | 0;
 i1 = 0;
 while (1) if (!(HEAP32[i2 + (i1 << 2) >> 2] | 0)) break; else i1 = i1 + 1 | 0;
 i3 = _SystemArray_NewVector(HEAP32[(HEAP32[8595] | 0) + 128 >> 2] | 0, i1) | 0;
 HEAP32[i7 >> 2] = i3;
 i1 = 0;
 while (1) {
  i2 = HEAP32[(HEAP32[i4 >> 2] | 0) + (i1 << 2) >> 2] | 0;
  if (!i2) break;
  _SystemArray_StoreElement(i3, i1, i2);
  i1 = i1 + 1 | 0;
 }
 STACKTOP = i8;
 return 0;
}

function _MetaData_GetTypeDefFromDefRefOrSpec(i2, i3, i4, i5) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 i5 = i5 | 0;
 var i1 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0;
 i10 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i9 = i10;
 i6 = i10 + 4 | 0;
 i7 = _MetaData_GetTableRow(i2, i3) | 0;
 L1 : do if (i7) {
  i8 = HEAP32[i7 >> 2] | 0;
  if (!i8) switch ((i3 >>> 24 & 255) << 24 >> 24) {
  case 2:
   {
    HEAP32[i7 >> 2] = i7;
    i1 = i7;
    break L1;
   }
  case 1:
   {
    i1 = _MetaData_GetTypeDefFromName(_MetaData_GetResolutionScopeMetaData(i2, HEAP32[i7 + 4 >> 2] | 0, i6) | 0, HEAP32[i7 + 12 >> 2] | 0, HEAP32[i7 + 8 >> 2] | 0, HEAP32[i6 >> 2] | 0, 1) | 0;
    HEAP32[i7 >> 2] = i1;
    break L1;
   }
  case 27:
   {
    HEAP32[i6 >> 2] = _MetaData_GetBlob(HEAP32[i7 + 8 >> 2] | 0, 0) | 0;
    i1 = _Type_GetTypeFromSig(HEAP32[i7 + 4 >> 2] | 0, i6, i4, i5) | 0;
    break L1;
   }
  default:
   {
    HEAP32[i9 >> 2] = i3;
    _Crash(15534, i9);
   }
  } else i1 = i8;
 } else i1 = 0; while (0);
 STACKTOP = i10;
 return i1 | 0;
}

function _Sys_GetMethodDesc(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i5 = i6 + 16 | 0;
 i4 = i6;
 i7 = HEAP32[i1 + 48 >> 2] | 0;
 i2 = HEAP32[i7 + 12 >> 2] | 0;
 i3 = HEAP32[i1 + 16 >> 2] | 0;
 HEAP32[i4 >> 2] = HEAP32[i7 + 16 >> 2];
 HEAP32[i4 + 4 >> 2] = i2;
 HEAP32[i4 + 8 >> 2] = i3;
 _sprintf(35052, 16439, i4) | 0;
 i4 = i1 + 14 | 0;
 i3 = i1 + 34 | 0;
 i2 = i1 + 36 | 0;
 i1 = ((HEAPU16[i4 >> 1] | 0) >>> 4 & 1 ^ 1) & 65535;
 while (1) {
  if (i1 >>> 0 >= (HEAPU16[i3 >> 1] | 0) >>> 0) break;
  if (i1 >>> 0 > (((HEAPU16[i4 >> 1] | 0) >>> 4 & 1 ^ 1) & 65535) >>> 0) {
   i7 = 35052 + (_strlen(35052) | 0) | 0;
   HEAP8[i7 >> 0] = 44;
   HEAP8[i7 + 1 >> 0] = 0;
  }
  i7 = 35052 + (_strlen(35052) | 0) | 0;
  _sprintf(i7, HEAP32[(HEAP32[(HEAP32[i2 >> 2] | 0) + (i1 * 12 | 0) >> 2] | 0) + 12 >> 2] | 0, i5) | 0;
  i1 = i1 + 1 | 0;
 }
 i7 = 35052 + (_strlen(35052) | 0) | 0;
 HEAP8[i7 >> 0] = 41;
 HEAP8[i7 + 1 >> 0] = 0;
 STACKTOP = i6;
 return 35052;
}

function _vsnprintf(i2, i1, i8, i9) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 i8 = i8 | 0;
 i9 = i9 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i10 = 0, i11 = 0;
 i11 = STACKTOP;
 STACKTOP = STACKTOP + 128 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(128);
 i3 = i11 + 124 | 0;
 i10 = i11;
 i4 = i10;
 i5 = 5084;
 i6 = i4 + 124 | 0;
 do {
  HEAP32[i4 >> 2] = HEAP32[i5 >> 2];
  i4 = i4 + 4 | 0;
  i5 = i5 + 4 | 0;
 } while ((i4 | 0) < (i6 | 0));
 if ((i1 + -1 | 0) >>> 0 > 2147483646) if (!i1) {
  i2 = i3;
  i1 = 1;
  i7 = 4;
 } else {
  HEAP32[(___errno_location() | 0) >> 2] = 75;
  i1 = -1;
 } else i7 = 4;
 if ((i7 | 0) == 4) {
  i7 = -2 - i2 | 0;
  i7 = i1 >>> 0 > i7 >>> 0 ? i7 : i1;
  HEAP32[i10 + 48 >> 2] = i7;
  i3 = i10 + 20 | 0;
  HEAP32[i3 >> 2] = i2;
  HEAP32[i10 + 44 >> 2] = i2;
  i1 = i2 + i7 | 0;
  i2 = i10 + 16 | 0;
  HEAP32[i2 >> 2] = i1;
  HEAP32[i10 + 28 >> 2] = i1;
  i1 = _vfprintf(i10, i8, i9) | 0;
  if (i7) {
   i10 = HEAP32[i3 >> 2] | 0;
   HEAP8[i10 + (((i10 | 0) == (HEAP32[i2 >> 2] | 0)) << 31 >> 31) >> 0] = 0;
  }
 }
 STACKTOP = i11;
 return i1 | 0;
}

function ___fwritex(i7, i2, i6) {
 i7 = i7 | 0;
 i2 = i2 | 0;
 i6 = i6 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i5 = 0, i8 = 0;
 i1 = i6 + 16 | 0;
 i3 = HEAP32[i1 >> 2] | 0;
 if (!i3) if (!(___towrite(i6) | 0)) {
  i3 = HEAP32[i1 >> 2] | 0;
  i4 = 5;
 } else i1 = 0; else i4 = 5;
 L5 : do if ((i4 | 0) == 5) {
  i8 = i6 + 20 | 0;
  i5 = HEAP32[i8 >> 2] | 0;
  i1 = i5;
  if ((i3 - i5 | 0) >>> 0 < i2 >>> 0) {
   i1 = FUNCTION_TABLE_iiii[HEAP32[i6 + 36 >> 2] & 255](i6, i7, i2) | 0;
   break;
  }
  L10 : do if ((HEAP8[i6 + 75 >> 0] | 0) > -1) {
   i5 = i2;
   while (1) {
    if (!i5) {
     i4 = 0;
     i3 = i7;
     break L10;
    }
    i3 = i5 + -1 | 0;
    if ((HEAP8[i7 + i3 >> 0] | 0) == 10) break; else i5 = i3;
   }
   i1 = FUNCTION_TABLE_iiii[HEAP32[i6 + 36 >> 2] & 255](i6, i7, i5) | 0;
   if (i1 >>> 0 < i5 >>> 0) break L5;
   i4 = i5;
   i3 = i7 + i5 | 0;
   i2 = i2 - i5 | 0;
   i1 = HEAP32[i8 >> 2] | 0;
  } else {
   i4 = 0;
   i3 = i7;
  } while (0);
  _memcpy(i1 | 0, i3 | 0, i2 | 0) | 0;
  HEAP32[i8 >> 2] = (HEAP32[i8 >> 2] | 0) + i2;
  i1 = i4 + i2 | 0;
 } while (0);
 return i1 | 0;
}

function _wcrtomb(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 do if (i1) {
  if (i2 >>> 0 < 128) {
   HEAP8[i1 >> 0] = i2;
   i1 = 1;
   break;
  }
  if (!(HEAP32[HEAP32[(___pthread_self_448() | 0) + 188 >> 2] >> 2] | 0)) if ((i2 & -128 | 0) == 57216) {
   HEAP8[i1 >> 0] = i2;
   i1 = 1;
   break;
  } else {
   HEAP32[(___errno_location() | 0) >> 2] = 84;
   i1 = -1;
   break;
  }
  if (i2 >>> 0 < 2048) {
   HEAP8[i1 >> 0] = i2 >>> 6 | 192;
   HEAP8[i1 + 1 >> 0] = i2 & 63 | 128;
   i1 = 2;
   break;
  }
  if (i2 >>> 0 < 55296 | (i2 & -8192 | 0) == 57344) {
   HEAP8[i1 >> 0] = i2 >>> 12 | 224;
   HEAP8[i1 + 1 >> 0] = i2 >>> 6 & 63 | 128;
   HEAP8[i1 + 2 >> 0] = i2 & 63 | 128;
   i1 = 3;
   break;
  }
  if ((i2 + -65536 | 0) >>> 0 < 1048576) {
   HEAP8[i1 >> 0] = i2 >>> 18 | 240;
   HEAP8[i1 + 1 >> 0] = i2 >>> 12 & 63 | 128;
   HEAP8[i1 + 2 >> 0] = i2 >>> 6 & 63 | 128;
   HEAP8[i1 + 3 >> 0] = i2 & 63 | 128;
   i1 = 4;
   break;
  } else {
   HEAP32[(___errno_location() | 0) >> 2] = 84;
   i1 = -1;
   break;
  }
 } else i1 = 1; while (0);
 return i1 | 0;
}

function _MetaData_GetFieldDefFromDefOrRef(i5, i2, i6, i7) {
 i5 = i5 | 0;
 i2 = i2 | 0;
 i6 = i6 | 0;
 i7 = i7 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i8 = 0, i9 = 0, i10 = 0;
 i10 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i10 + 8 | 0;
 i8 = i10;
 i9 = _MetaData_GetTableRow(i5, i2) | 0;
 i3 = HEAP32[i9 >> 2] | 0;
 L1 : do if (!i3) switch ((i2 >>> 24 & 255) << 24 >> 24) {
 case 4:
  {
   HEAP32[i9 >> 2] = i9;
   i1 = i9;
   break L1;
  }
 case 10:
  {
   i2 = i9 + 4 | 0;
   i1 = HEAP32[i2 >> 2] | 0;
   switch ((i1 >>> 24 & 255) << 24 >> 24) {
   case 27:
   case 1:
    break;
   default:
    {
     HEAP32[i8 >> 2] = i1;
     _Crash(15789, i8);
    }
   }
   i1 = _FindFieldInType(_MetaData_GetTypeDefFromDefRefOrSpec(i5, i1, i6, i7) | 0, HEAP32[i9 + 8 >> 2] | 0) | 0;
   if ((HEAP32[i2 >> 2] & -16777216 | 0) != 16777216) break L1;
   HEAP32[i9 >> 2] = i1;
   break L1;
  }
 default:
  {
   HEAP32[i4 >> 2] = i2;
   _Crash(15990, i4);
  }
 } else i1 = i3; while (0);
 STACKTOP = i10;
 return i1 | 0;
}

function _System_Array_Internal_SetValue(i3, i4, i8) {
 i3 = i3 | 0;
 i4 = i4 | 0;
 i8 = i8 | 0;
 var i1 = 0, i2 = 0, i5 = 0, i6 = 0, i7 = 0;
 i7 = _Heap_GetType(i3) | 0;
 i6 = HEAP32[i4 >> 2] | 0;
 i1 = _Heap_GetType(i6) | 0;
 i7 = HEAP32[i7 + 96 >> 2] | 0;
 i5 = i7 + 88 | 0;
 if (!(_Type_IsAssignableFrom(i7, i1) | 0)) if ((HEAP32[i5 >> 2] | 0) == (HEAP32[(HEAP32[8595] | 0) + 184 >> 2] | 0) ? (HEAP32[HEAP32[i7 + 92 >> 2] >> 2] | 0) == (i1 | 0) : 0) i2 = 4; else i1 = 0; else i2 = 4;
 do if ((i2 | 0) == 4) {
  i2 = HEAP32[i7 + 64 >> 2] | 0;
  i1 = i3 + 4 + (Math_imul(i2, HEAP32[i4 + 4 >> 2] | 0) | 0) | 0;
  if (!(HEAP8[i7 + 34 >> 0] | 0)) {
   HEAP32[i1 >> 2] = i6;
   i1 = 1;
   break;
  }
  if ((HEAP32[i5 >> 2] | 0) != (HEAP32[(HEAP32[8595] | 0) + 184 >> 2] | 0)) {
   _memcpy(i1 | 0, i6 | 0, i2 | 0) | 0;
   i1 = 1;
   break;
  }
  if (!i6) {
   _memset(i1 | 0, 0, i2 | 0) | 0;
   i1 = 1;
   break;
  } else {
   HEAP32[i1 >> 2] = 1;
   _memcpy(i1 + 4 | 0, i6 | 0, i2 + -4 | 0) | 0;
   i1 = 1;
   break;
  }
 } while (0);
 HEAP32[i8 >> 2] = i1;
 return 0;
}

function _CLIFile_GetMetaDataForAssembly(i2) {
 i2 = i2 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0;
 i8 = STACKTOP;
 STACKTOP = STACKTOP + 144 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(144);
 i7 = i8 + 8 | 0;
 i4 = i8;
 i6 = i8 + 16 | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) >= 15) break;
  if (!(_strcmp(i2, HEAP32[1088 + (i1 << 2) >> 2] | 0) | 0)) {
   i2 = 11423;
   break;
  } else i1 = i1 + 1 | 0;
 }
 i1 = 28160;
 while (1) {
  i1 = HEAP32[i1 >> 2] | 0;
  if (!i1) {
   i1 = 8;
   break;
  }
  i3 = (HEAP32[i1 >> 2] | 0) + 16 | 0;
  if (!(_strcmp(i2, HEAP32[(_MetaData_GetTableRow(HEAP32[i3 >> 2] | 0, 536870913) | 0) + 20 >> 2] | 0) | 0)) {
   i1 = 7;
   break;
  } else i1 = i1 + 4 | 0;
 }
 do if ((i1 | 0) == 7) i5 = HEAP32[i3 >> 2] | 0; else if ((i1 | 0) == 8) {
  HEAP32[i4 >> 2] = i2;
  _sprintf(i6, 11430, i4) | 0;
  i1 = _CLIFile_Load(i6) | 0;
  if (!i1) {
   HEAP32[i7 >> 2] = i6;
   _Crash(11437, i7);
  } else {
   i5 = HEAP32[i1 + 16 >> 2] | 0;
   break;
  }
 } while (0);
 STACKTOP = i8;
 return i5 | 0;
}

function _sift(i3, i10, i7, i1, i8) {
 i3 = i3 | 0;
 i10 = i10 | 0;
 i7 = i7 | 0;
 i1 = i1 | 0;
 i8 = i8 | 0;
 var i2 = 0, i4 = 0, i5 = 0, i6 = 0, i9 = 0, i11 = 0, i12 = 0;
 i12 = STACKTOP;
 STACKTOP = STACKTOP + 240 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(240);
 i11 = i12;
 HEAP32[i11 >> 2] = i3;
 L1 : do if ((i1 | 0) > 1) {
  i9 = 0 - i10 | 0;
  i2 = i3;
  i6 = i1;
  i1 = 1;
  while (1) {
   i4 = i2 + i9 | 0;
   i5 = i6 + -2 | 0;
   i2 = i4 + (0 - (HEAP32[i8 + (i5 << 2) >> 2] | 0)) | 0;
   if ((FUNCTION_TABLE_iii[i7 & 63](i3, i2) | 0) > -1 ? (FUNCTION_TABLE_iii[i7 & 63](i3, i4) | 0) > -1 : 0) break L1;
   i3 = i1 + 1 | 0;
   i1 = i11 + (i1 << 2) | 0;
   if ((FUNCTION_TABLE_iii[i7 & 63](i2, i4) | 0) > -1) {
    HEAP32[i1 >> 2] = i2;
    i1 = i6 + -1 | 0;
   } else {
    HEAP32[i1 >> 2] = i4;
    i2 = i4;
    i1 = i5;
   }
   if ((i1 | 0) <= 1) {
    i1 = i3;
    break L1;
   }
   i6 = i1;
   i1 = i3;
   i3 = HEAP32[i11 >> 2] | 0;
  }
 } else i1 = 1; while (0);
 _cycle(i10, i11, i1);
 STACKTOP = i12;
 return;
}

function _memset(i5, i6, i4) {
 i5 = i5 | 0;
 i6 = i6 | 0;
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i7 = 0;
 i3 = i5 + i4 | 0;
 i6 = i6 & 255;
 if ((i4 | 0) >= 67) {
  while (i5 & 3) {
   HEAP8[i5 >> 0] = i6;
   i5 = i5 + 1 | 0;
  }
  i1 = i3 & -4 | 0;
  i2 = i1 - 64 | 0;
  i7 = i6 | i6 << 8 | i6 << 16 | i6 << 24;
  while ((i5 | 0) <= (i2 | 0)) {
   HEAP32[i5 >> 2] = i7;
   HEAP32[i5 + 4 >> 2] = i7;
   HEAP32[i5 + 8 >> 2] = i7;
   HEAP32[i5 + 12 >> 2] = i7;
   HEAP32[i5 + 16 >> 2] = i7;
   HEAP32[i5 + 20 >> 2] = i7;
   HEAP32[i5 + 24 >> 2] = i7;
   HEAP32[i5 + 28 >> 2] = i7;
   HEAP32[i5 + 32 >> 2] = i7;
   HEAP32[i5 + 36 >> 2] = i7;
   HEAP32[i5 + 40 >> 2] = i7;
   HEAP32[i5 + 44 >> 2] = i7;
   HEAP32[i5 + 48 >> 2] = i7;
   HEAP32[i5 + 52 >> 2] = i7;
   HEAP32[i5 + 56 >> 2] = i7;
   HEAP32[i5 + 60 >> 2] = i7;
   i5 = i5 + 64 | 0;
  }
  while ((i5 | 0) < (i1 | 0)) {
   HEAP32[i5 >> 2] = i7;
   i5 = i5 + 4 | 0;
  }
 }
 while ((i5 | 0) < (i3 | 0)) {
  HEAP8[i5 >> 0] = i6;
  i5 = i5 + 1 | 0;
 }
 return i3 - i4 | 0;
}

function _MetaData_GetTypeDefFromName(i2, i7, i9, i3, i10) {
 i2 = i2 | 0;
 i7 = i7 | 0;
 i9 = i9 | 0;
 i3 = i3 | 0;
 i10 = i10 | 0;
 var i1 = 0, i4 = 0, i5 = 0, i6 = 0, i8 = 0, i11 = 0, i12 = 0;
 i12 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i11 = i12;
 i4 = i2 + 28 | 0;
 i5 = (i3 | 0) == 0;
 i1 = 1;
 while (1) {
  if (i1 >>> 0 > (HEAP32[i4 >> 2] | 0) >>> 0) {
   i1 = 8;
   break;
  }
  i8 = _MetaData_GetTableRow(i2, i1 & 16777215 | 33554432) | 0;
  if ((HEAP32[i8 + 120 >> 2] | 0) == (i3 | 0) ? (_strcmp(i9, HEAP32[i8 + 12 >> 2] | 0) | 0) == 0 : 0) {
   if (!i5) {
    i1 = 10;
    break;
   }
   if (!(_strcmp(i7, HEAP32[i8 + 16 >> 2] | 0) | 0)) {
    i1 = 10;
    break;
   }
  }
  i1 = i1 + 1 | 0;
 }
 if ((i1 | 0) == 8) if (!(i10 << 24 >> 24)) i6 = 0; else {
  HEAP32[i11 >> 2] = i7;
  HEAP32[i11 + 4 >> 2] = i9;
  _Crash(15601, i11);
 } else if ((i1 | 0) == 10) i6 = i8;
 STACKTOP = i12;
 return i6 | 0;
}

function _System_RuntimeType_GetGenericArguments(i2, i1, i6) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 i6 = i6 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i7 = 0, i8 = 0;
 i8 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i7 = i8;
 i5 = HEAP32[i2 >> 2] | 0;
 i1 = HEAP32[i5 + 88 >> 2] | 0;
 L1 : do if (!i1) i3 = 0; else {
  i1 = i1 + 84 | 0;
  i2 = 0;
  while (1) {
   i1 = HEAP32[i1 >> 2] | 0;
   if (!i1) {
    i3 = i2;
    break L1;
   }
   if ((HEAP32[i1 >> 2] | 0) == (i5 | 0)) i2 = HEAP32[i1 + 8 >> 2] | 0;
   i1 = i1 + 4 | 0;
  }
 } while (0);
 i4 = _SystemArray_NewVector(HEAP32[(HEAP32[8595] | 0) + 188 >> 2] | 0, i3) | 0;
 HEAP32[i6 >> 2] = i4;
 i2 = i5 + 92 | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i3 | 0)) break;
  HEAP32[i7 >> 2] = _Type_GetTypeObject(HEAP32[(HEAP32[i2 >> 2] | 0) + (i1 << 2) >> 2] | 0) | 0;
  _SystemArray_StoreElement(i4, i1, i7);
  i1 = i1 + 1 | 0;
 }
 STACKTOP = i8;
 return 0;
}

function _readdir(i4) {
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i5 = 0, i6 = 0, i7 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i2 = i7;
 i5 = i4 + 8 | 0;
 i1 = HEAP32[i5 >> 2] | 0;
 i3 = i4 + 12 | 0;
 L1 : do if ((i1 | 0) < (HEAP32[i3 >> 2] | 0)) i6 = 6; else {
  HEAP32[i2 >> 2] = HEAP32[i4 >> 2];
  HEAP32[i2 + 4 >> 2] = i4 + 24;
  HEAP32[i2 + 8 >> 2] = 2048;
  i1 = ___syscall220(220, i2 | 0) | 0;
  if ((i1 | 0) >= 1) {
   HEAP32[i3 >> 2] = i1;
   HEAP32[i5 >> 2] = 0;
   i1 = 0;
   i6 = 6;
   break;
  }
  switch (i1 | 0) {
  case 0:
  case -2:
   {
    i1 = 0;
    break L1;
   }
  default:
   {}
  }
  HEAP32[(___errno_location() | 0) >> 2] = 0 - i1;
  i1 = 0;
 } while (0);
 if ((i6 | 0) == 6) {
  i6 = i4 + 24 + i1 | 0;
  HEAP32[i5 >> 2] = (HEAPU16[i6 + 8 >> 1] | 0) + i1;
  HEAP32[i4 + 4 >> 2] = HEAP32[i6 + 4 >> 2];
  i1 = i6;
 }
 STACKTOP = i7;
 return i1 | 0;
}

function _System_Type_GetMethod(i6, i1, i8) {
 i6 = i6 | 0;
 i1 = i1 | 0;
 i8 = i8 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0, i7 = 0, i9 = 0, i10 = 0;
 i10 = STACKTOP;
 STACKTOP = STACKTOP + 256 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(256);
 i7 = i10;
 _DotNetStringToCString(i7, 256, HEAP32[i1 >> 2] | 0);
 i5 = HEAP32[i6 >> 2] | 0;
 i4 = HEAP32[i5 + 112 >> 2] | 0;
 i5 = i5 + 116 | 0;
 i1 = 0;
 while (1) {
  if (i1 >>> 0 >= i4 >>> 0) {
   i1 = 0;
   break;
  }
  i2 = HEAP32[(HEAP32[i5 >> 2] | 0) + (i1 << 2) >> 2] | 0;
  i3 = i2 + 16 | 0;
  if (!(_strcmp(HEAP32[i3 >> 2] | 0, i7) | 0)) {
   i9 = 4;
   break;
  } else i1 = i1 + 1 | 0;
 }
 if ((i9 | 0) == 4) {
  i1 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 196 >> 2] | 0) | 0;
  HEAP32[i1 >> 2] = i6;
  HEAP32[i1 + 4 >> 2] = _SystemString_FromCharPtrASCII(HEAP32[i3 >> 2] | 0) | 0;
  HEAP32[i1 + 8 >> 2] = i2;
 }
 HEAP32[i8 >> 2] = i1;
 STACKTOP = i10;
 return 0;
}

function _Send_Check(i2, i7, i1) {
 i2 = i2 | 0;
 i7 = i7 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i8 = 0;
 i8 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i6 = i8;
 i5 = HEAP32[i1 + 8 >> 2] | 0;
 i3 = HEAP32[i2 + 12 >> 2] | 0;
 i4 = HEAP32[i2 + 20 >> 2] | 0;
 i1 = _send(HEAP32[i2 >> 2] | 0, (HEAP32[i2 + 4 >> 2] | 0) + 4 + (HEAP32[i2 + 8 >> 2] | 0) + (HEAP32[i5 >> 2] | 0) | 0, i3, HEAP32[i2 + 16 >> 2] | 0) | 0;
 if ((i1 | 0) > -1) {
  i1 = (HEAP32[i5 >> 2] | 0) + i1 | 0;
  HEAP32[i5 >> 2] = i1;
  if (i1 >>> 0 < i3 >>> 0) i1 = 0; else {
   HEAP32[i7 >> 2] = i1;
   HEAP32[i4 >> 2] = 0;
   i1 = 1;
  }
 } else {
  i1 = HEAP32[(___errno_location() | 0) >> 2] | 0;
  HEAP32[i6 >> 2] = i1;
  _printf(18288, i6) | 0;
  if ((i1 | 0) == 11) i1 = 0; else {
   HEAP32[i7 >> 2] = HEAP32[i5 >> 2];
   HEAP32[i4 >> 2] = i1;
   i1 = 1;
  }
 }
 STACKTOP = i8;
 return i1 | 0;
}

function _System_Console_Write(i1, i3, i2) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i2 = i2 | 0;
 var i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0, i11 = 0;
 i10 = STACKTOP;
 STACKTOP = STACKTOP + 144 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(144);
 i9 = i10;
 i7 = i10 + 4 | 0;
 i8 = i10 + 8 | 0;
 i1 = HEAP32[i3 >> 2] | 0;
 if (i1 | 0) {
  i5 = _SystemString_GetString(i1, i7) | 0;
  i6 = i8 + -1 | 0;
  i4 = 0;
  i1 = HEAP32[i7 >> 2] | 0;
  while (1) {
   if (!i1) break;
   i2 = i1 >>> 0 < 128 ? i1 : 128;
   i3 = i2 + 1 | 0;
   i1 = 0;
   while (1) {
    if (i1 >>> 0 >= i2 >>> 0) break;
    i11 = HEAP16[i5 + (i1 + i4 << 1) >> 1] | 0;
    HEAP8[i8 + i1 >> 0] = i11 & 255 ? i11 & 255 : 63;
    i1 = i1 + 1 | 0;
   }
   HEAP8[i6 + i3 >> 0] = 0;
   _printf(i8, i9) | 0;
   i1 = (HEAP32[i7 >> 2] | 0) - i2 | 0;
   HEAP32[i7 >> 2] = i1;
   i4 = i2 + i4 | 0;
  }
 }
 STACKTOP = i10;
 return 0;
}

function ___strchrnul(i1, i4) {
 i1 = i1 | 0;
 i4 = i4 | 0;
 var i2 = 0, i3 = 0, i5 = 0;
 i3 = i4 & 255;
 L1 : do if (!i3) i1 = i1 + (_strlen(i1) | 0) | 0; else {
  if (i1 & 3) {
   i2 = i4 & 255;
   do {
    i5 = HEAP8[i1 >> 0] | 0;
    if (i5 << 24 >> 24 == 0 ? 1 : i5 << 24 >> 24 == i2 << 24 >> 24) break L1;
    i1 = i1 + 1 | 0;
   } while ((i1 & 3 | 0) != 0);
  }
  i3 = Math_imul(i3, 16843009) | 0;
  i2 = HEAP32[i1 >> 2] | 0;
  L10 : do if (!((i2 & -2139062144 ^ -2139062144) & i2 + -16843009)) do {
   i5 = i2 ^ i3;
   if ((i5 & -2139062144 ^ -2139062144) & i5 + -16843009 | 0) break L10;
   i1 = i1 + 4 | 0;
   i2 = HEAP32[i1 >> 2] | 0;
  } while (!((i2 & -2139062144 ^ -2139062144) & i2 + -16843009 | 0)); while (0);
  i2 = i4 & 255;
  while (1) {
   i5 = HEAP8[i1 >> 0] | 0;
   if (i5 << 24 >> 24 == 0 ? 1 : i5 << 24 >> 24 == i2 << 24 >> 24) break; else i1 = i1 + 1 | 0;
  }
 } while (0);
 return i1 | 0;
}

function _cos(d1) {
 d1 = +d1;
 var i2 = 0, i3 = 0, i4 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i2 = i4;
 HEAPF64[tempDoublePtr >> 3] = d1;
 i3 = HEAP32[tempDoublePtr + 4 >> 2] & 2147483647;
 L1 : do if (i3 >>> 0 < 1072243196) if (i3 >>> 0 < 1044816030) d1 = 1.0; else d1 = +___cos(d1, 0.0); else {
  if (i3 >>> 0 > 2146435071) {
   d1 = d1 - d1;
   break;
  }
  switch ((___rem_pio2(d1, i2) | 0) & 3) {
  case 0:
   {
    d1 = +___cos(+HEAPF64[i2 >> 3], +HEAPF64[i2 + 8 >> 3]);
    break L1;
   }
  case 1:
   {
    d1 = -+___sin(+HEAPF64[i2 >> 3], +HEAPF64[i2 + 8 >> 3], 1);
    break L1;
   }
  case 2:
   {
    d1 = -+___cos(+HEAPF64[i2 >> 3], +HEAPF64[i2 + 8 >> 3]);
    break L1;
   }
  default:
   {
    d1 = +___sin(+HEAPF64[i2 >> 3], +HEAPF64[i2 + 8 >> 3], 1);
    break L1;
   }
  }
 } while (0);
 STACKTOP = i4;
 return +d1;
}

function _sin(d1) {
 d1 = +d1;
 var i2 = 0, i3 = 0, i4 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i2 = i4;
 HEAPF64[tempDoublePtr >> 3] = d1;
 i3 = HEAP32[tempDoublePtr + 4 >> 2] & 2147483647;
 L1 : do if (i3 >>> 0 < 1072243196) {
  if (i3 >>> 0 >= 1045430272) d1 = +___sin(d1, 0.0, 0);
 } else {
  if (i3 >>> 0 > 2146435071) {
   d1 = d1 - d1;
   break;
  }
  switch ((___rem_pio2(d1, i2) | 0) & 3) {
  case 0:
   {
    d1 = +___sin(+HEAPF64[i2 >> 3], +HEAPF64[i2 + 8 >> 3], 1);
    break L1;
   }
  case 1:
   {
    d1 = +___cos(+HEAPF64[i2 >> 3], +HEAPF64[i2 + 8 >> 3]);
    break L1;
   }
  case 2:
   {
    d1 = -+___sin(+HEAPF64[i2 >> 3], +HEAPF64[i2 + 8 >> 3], 1);
    break L1;
   }
  default:
   {
    d1 = -+___cos(+HEAPF64[i2 >> 3], +HEAPF64[i2 + 8 >> 3]);
    break L1;
   }
  }
 } while (0);
 STACKTOP = i4;
 return +d1;
}

function ___stpcpy(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0;
 i3 = i2;
 L1 : do if (!((i3 ^ i1) & 3)) {
  if (i3 & 3) do {
   i3 = HEAP8[i2 >> 0] | 0;
   HEAP8[i1 >> 0] = i3;
   if (!(i3 << 24 >> 24)) break L1;
   i2 = i2 + 1 | 0;
   i1 = i1 + 1 | 0;
  } while ((i2 & 3 | 0) != 0);
  i3 = HEAP32[i2 >> 2] | 0;
  if (!((i3 & -2139062144 ^ -2139062144) & i3 + -16843009)) {
   i4 = i1;
   while (1) {
    i2 = i2 + 4 | 0;
    i1 = i4 + 4 | 0;
    HEAP32[i4 >> 2] = i3;
    i3 = HEAP32[i2 >> 2] | 0;
    if ((i3 & -2139062144 ^ -2139062144) & i3 + -16843009 | 0) break; else i4 = i1;
   }
  }
  i4 = 8;
 } else i4 = 8; while (0);
 if ((i4 | 0) == 8) {
  i4 = HEAP8[i2 >> 0] | 0;
  HEAP8[i1 >> 0] = i4;
  if (i4 << 24 >> 24) do {
   i2 = i2 + 1 | 0;
   i1 = i1 + 1 | 0;
   i4 = HEAP8[i2 >> 0] | 0;
   HEAP8[i1 >> 0] = i4;
  } while (i4 << 24 >> 24 != 0);
 }
 return i1 | 0;
}

function _Receive_Check(i1, i3, i6, i2) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i6 = i6 | 0;
 i2 = i2 | 0;
 var i4 = 0, i5 = 0;
 i5 = HEAP32[i2 + 8 >> 2] | 0;
 i2 = HEAP32[i3 + 12 >> 2] | 0;
 i4 = HEAP32[i3 + 20 >> 2] | 0;
 i1 = _recv(HEAP32[i3 >> 2] | 0, (HEAP32[i3 + 4 >> 2] | 0) + 4 + (HEAP32[i3 + 8 >> 2] | 0) + (HEAP32[i5 >> 2] | 0) | 0, i2, HEAP32[i3 + 16 >> 2] | 0) | 0;
 do if ((i1 | 0) > 0) {
  i1 = (HEAP32[i5 >> 2] | 0) + i1 | 0;
  HEAP32[i5 >> 2] = i1;
  if (i1 >>> 0 < i2 >>> 0) i1 = 0; else {
   HEAP32[i6 >> 2] = i1;
   HEAP32[i4 >> 2] = 0;
   i1 = 1;
  }
 } else {
  if (!i1) {
   HEAP32[i6 >> 2] = HEAP32[i5 >> 2];
   HEAP32[i4 >> 2] = 0;
   i1 = 1;
   break;
  }
  i1 = HEAP32[(___errno_location() | 0) >> 2] | 0;
  if ((i1 | 0) == 11) i1 = 0; else {
   HEAP32[i6 >> 2] = HEAP32[i5 >> 2];
   HEAP32[i4 >> 2] = i1;
   i1 = 1;
  }
 } while (0);
 return i1 | 0;
}

function _FindFieldInType(i4, i5) {
 i4 = i4 | 0;
 i5 = i5 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i6 = 0, i7 = 0, i8 = 0;
 i8 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i7 = i8;
 if (!(HEAP8[i4 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i4, 0, 0);
 i2 = HEAP32[i4 + 100 >> 2] | 0;
 i3 = i4 + 104 | 0;
 i1 = 0;
 while (1) {
  if (i1 >>> 0 >= i2 >>> 0) {
   i1 = 7;
   break;
  }
  i6 = HEAP32[(HEAP32[i3 >> 2] | 0) + (i1 << 2) >> 2] | 0;
  if (!(_strcmp(HEAP32[i6 + 12 >> 2] | 0, i5) | 0)) {
   i1 = 6;
   break;
  } else i1 = i1 + 1 | 0;
 }
 if ((i1 | 0) == 6) {
  STACKTOP = i8;
  return i6 | 0;
 } else if ((i1 | 0) == 7) {
  i6 = HEAP32[i4 + 16 >> 2] | 0;
  i8 = HEAP32[i4 + 12 >> 2] | 0;
  HEAP32[i7 >> 2] = i5;
  HEAP32[i7 + 4 >> 2] = i6;
  HEAP32[i7 + 8 >> 2] = i8;
  _Crash(16054, i7);
 }
 return 0;
}

function _Generics_GetMethodDefFromSpec(i1, i4, i5) {
 i1 = i1 | 0;
 i4 = i4 | 0;
 i5 = i5 | 0;
 var i2 = 0, i3 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0;
 i9 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i6 = i9;
 i7 = i1 + 4 | 0;
 i8 = _MetaData_GetMethodDefFromDefRefOrSpec(HEAP32[i7 >> 2] | 0, HEAP32[i1 + 8 >> 2] | 0, 0, 0) | 0;
 HEAP32[i6 >> 2] = _MetaData_GetBlob(HEAP32[i1 + 12 >> 2] | 0, 0) | 0;
 _MetaData_DecodeSigEntry(i6) | 0;
 i2 = _MetaData_DecodeSigEntry(i6) | 0;
 i3 = _malloc(i2 << 2) | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i2 | 0)) break;
  HEAP32[i3 + (i1 << 2) >> 2] = _Type_GetTypeFromSig(HEAP32[i7 >> 2] | 0, i6, i4, i5) | 0;
  i1 = i1 + 1 | 0;
 }
 i8 = _Generics_GetMethodDefFromCoreMethod(i8, HEAP32[i8 + 48 >> 2] | 0, i2, i3) | 0;
 _free(i3);
 STACKTOP = i9;
 return i8 | 0;
}

function _System_WeakReference_set_Target(i7, i2, i1) {
 i7 = i7 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i6;
 i4 = HEAP32[i2 >> 2] | 0;
 i1 = HEAP32[i7 >> 2] | 0;
 do if (i1 | 0) {
  i2 = _Heap_GetWeakRefAddress(i1) | 0;
  while (1) {
   i1 = HEAP32[i2 >> 2] | 0;
   if (!i1) {
    i1 = 6;
    break;
   }
   i3 = i1 + 8 | 0;
   if ((i1 | 0) == (i7 | 0)) {
    i1 = 5;
    break;
   } else i2 = i3;
  }
  if ((i1 | 0) == 5) {
   HEAP32[i2 >> 2] = HEAP32[i3 >> 2];
   _Heap_RemovedWeakRefTarget(HEAP32[i7 >> 2] | 0);
   break;
  } else if ((i1 | 0) == 6) _Crash(18368, i5);
 } while (0);
 HEAP32[i7 >> 2] = i4;
 if (i4 | 0) HEAP32[i7 + 8 >> 2] = _Heap_SetWeakRefTarget(i4, i7) | 0;
 STACKTOP = i6;
 return 0;
}

function _System_IO_FileInternal_Open(i1, i2, i9) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i9 = i9 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0;
 i8 = STACKTOP;
 STACKTOP = STACKTOP + 272 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(272);
 i6 = i8;
 i1 = i8 + 4 | 0;
 i3 = i8 + 8 | 0;
 i4 = _SystemString_GetString(HEAP32[i2 >> 2] | 0, i1) | 0;
 i5 = HEAP32[i2 + 4 >> 2] | 0;
 i7 = HEAP32[i2 + 16 >> 2] | 0;
 i2 = HEAP32[i1 >> 2] | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i2 | 0)) break;
  HEAP8[i3 + i1 >> 0] = HEAP16[i4 + (i1 << 1) >> 1];
  i1 = i1 + 1 | 0;
 }
 HEAP8[i3 + i2 >> 0] = 0;
 if ((i5 | 0) == 3) {
  i1 = _open(i3, 2, i6) | 0;
  if ((i1 | 0) < 0) i2 = HEAP32[(___errno_location() | 0) >> 2] | 0; else i2 = 0;
 } else {
  i2 = -1;
  i1 = 0;
 }
 HEAP32[i9 >> 2] = i1;
 HEAP32[i7 >> 2] = i2;
 STACKTOP = i8;
 return 0;
}

function ___overflow(i5, i6) {
 i5 = i5 | 0;
 i6 = i6 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i7 = 0, i8 = 0, i9 = 0;
 i9 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i7 = i9;
 i8 = i6 & 255;
 HEAP8[i7 >> 0] = i8;
 i2 = i5 + 16 | 0;
 i3 = HEAP32[i2 >> 2] | 0;
 if (!i3) if (!(___towrite(i5) | 0)) {
  i3 = HEAP32[i2 >> 2] | 0;
  i4 = 4;
 } else i1 = -1; else i4 = 4;
 do if ((i4 | 0) == 4) {
  i4 = i5 + 20 | 0;
  i2 = HEAP32[i4 >> 2] | 0;
  if (i2 >>> 0 < i3 >>> 0 ? (i1 = i6 & 255, (i1 | 0) != (HEAP8[i5 + 75 >> 0] | 0)) : 0) {
   HEAP32[i4 >> 2] = i2 + 1;
   HEAP8[i2 >> 0] = i8;
   break;
  }
  if ((FUNCTION_TABLE_iiii[HEAP32[i5 + 36 >> 2] & 255](i5, i7, 1) | 0) == 1) i1 = HEAPU8[i7 >> 0] | 0; else i1 = -1;
 } while (0);
 STACKTOP = i9;
 return i1 | 0;
}

function _MetaData_GetConstant(i1, i2, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i4 = i4 | 0;
 var i3 = 0, i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i6 + 8 | 0;
 i3 = i6;
 if ((i2 & -16777216 | 0) != 67108864) {
  HEAP32[i3 >> 2] = i2;
  _Crash(15302, i3);
 }
 i1 = HEAP32[(_MetaData_GetTableRow(i1, i2) | 0) + 40 >> 2] | 0;
 i2 = HEAP8[i1 >> 0] | 0;
 if (i2 << 24 >> 24 == 8) {
  i5 = (HEAP32[i1 + 8 >> 2] | 0) + 1 | 0;
  i5 = HEAPU8[i5 >> 0] | HEAPU8[i5 + 1 >> 0] << 8 | HEAPU8[i5 + 2 >> 0] << 16 | HEAPU8[i5 + 3 >> 0] << 24;
  HEAP8[i4 >> 0] = i5;
  HEAP8[i4 + 1 >> 0] = i5 >> 8;
  HEAP8[i4 + 2 >> 0] = i5 >> 16;
  HEAP8[i4 + 3 >> 0] = i5 >> 24;
  STACKTOP = i6;
  return;
 } else {
  HEAP32[i5 >> 2] = i2 & 255;
  _Crash(15351, i5);
 }
}

function _CLIFile_Execute(i4, i1, i2) {
 i4 = i4 | 0;
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i5 = 0, i6 = 0, i7 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i7 + 4 | 0;
 i6 = i7;
 i3 = i1 + -1 | 0;
 i2 = i2 + 4 | 0;
 i1 = _SystemArray_NewVector(HEAP32[(HEAP32[8595] | 0) + 124 >> 2] | 0, i3) | 0;
 HEAP32[i5 >> 2] = i1;
 _Heap_MakeUndeletable(i1);
 i1 = 0;
 while (1) {
  if ((i1 | 0) >= (i3 | 0)) break;
  HEAP32[i6 >> 2] = _SystemString_FromCharPtrASCII(HEAP32[i2 + (i1 << 2) >> 2] | 0) | 0;
  _SystemArray_StoreElement(HEAP32[i5 >> 2] | 0, i1, i6);
  i1 = i1 + 1 | 0;
 }
 i6 = _Thread() | 0;
 _Thread_SetEntryPoint(i6, HEAP32[i4 + 16 >> 2] | 0, HEAP32[i4 + 12 >> 2] | 0, i5, 4);
 i6 = _Thread_Execute() | 0;
 STACKTOP = i7;
 return i6 | 0;
}

function _Internal_ReadKey_Check(i1, i2, i7, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i7 = i7 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 144 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(144);
 i3 = i6 + 128 | 0;
 i4 = i6;
 i5 = i6 + 136 | 0;
 i1 = HEAP32[909] | 0;
 if ((i1 | 0) == -1) {
  HEAP32[i3 >> 2] = 0;
  HEAP32[i3 + 4 >> 2] = 0;
  i1 = i4;
  i2 = 32;
  while (1) {
   if (!i2) break;
   HEAP32[i1 >> 2] = 0;
   i1 = i1 + 4 | 0;
   i2 = i2 + -1 | 0;
  }
  HEAP32[i4 >> 2] = HEAP32[i4 >> 2] | 1;
  if ((_select(1024, i4, 0, 0, i3) | 0) >= 1 ? (_read(0, i5, 1) | 0) == 1 : 0) {
   HEAP32[i7 >> 2] = HEAPU8[i5 >> 0];
   i1 = 1;
  } else i1 = 0;
 } else {
  HEAP32[i7 >> 2] = i1;
  HEAP32[909] = -1;
  i1 = 1;
 }
 STACKTOP = i6;
 return i1 | 0;
}

function _open(i3, i5, i2) {
 i3 = i3 | 0;
 i5 = i5 | 0;
 i2 = i2 | 0;
 var i1 = 0, i4 = 0, i6 = 0, i7 = 0, i8 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 48 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(48);
 i6 = i7 + 16 | 0;
 i4 = i7;
 i1 = i7 + 32 | 0;
 if (!(i5 & 4194368)) i1 = 0; else {
  HEAP32[i1 >> 2] = i2;
  i8 = (HEAP32[i1 >> 2] | 0) + (4 - 1) & ~(4 - 1);
  i2 = HEAP32[i8 >> 2] | 0;
  HEAP32[i1 >> 2] = i8 + 4;
  i1 = i2;
 }
 HEAP32[i4 >> 2] = i3;
 HEAP32[i4 + 4 >> 2] = i5 | 32768;
 HEAP32[i4 + 8 >> 2] = i1;
 i1 = ___syscall5(5, i4 | 0) | 0;
 if (!((i5 & 524288 | 0) == 0 | (i1 | 0) < 0)) {
  HEAP32[i6 >> 2] = i1;
  HEAP32[i6 + 4 >> 2] = 2;
  HEAP32[i6 + 8 >> 2] = 1;
  ___syscall221(221, i6 | 0) | 0;
 }
 i8 = ___syscall_ret(i1) | 0;
 STACKTOP = i7;
 return i8 | 0;
}

function _System_Type_GetTypeFromName(i1, i2, i7) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i7 = i7 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 768 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(768);
 i3 = i6 + 512 | 0;
 i4 = i6 + 256 | 0;
 i5 = i6;
 _DotNetStringToCString(i3, 256, HEAP32[i2 + 4 >> 2] | 0);
 _DotNetStringToCString(i4, 256, HEAP32[i2 + 8 >> 2] | 0);
 i1 = HEAP32[i2 >> 2] | 0;
 if (!i1) i1 = _CLIFile_FindTypeInAllLoadedAssemblies(i3, i4) | 0; else {
  _DotNetStringToCString(i5, 256, i1);
  i1 = _MetaData_GetTypeDefFromName(_CLIFile_GetMetaDataForAssembly(i5) | 0, i3, i4, 0, 1) | 0;
 }
 if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
 HEAP32[i7 >> 2] = _Type_GetTypeObject(i1) | 0;
 STACKTOP = i6;
 return 0;
}

function _fputc(i2, i8) {
 i2 = i2 | 0;
 i8 = i8 | 0;
 var i1 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i9 = 0;
 i7 = i2 & 255;
 i1 = i2 & 255;
 if ((HEAP32[i8 + 76 >> 2] | 0) >= 0 ? (___lockfile(i8) | 0) != 0 : 0) {
  if ((i1 | 0) != (HEAP8[i8 + 75 >> 0] | 0) ? (i5 = i8 + 20 | 0, i6 = HEAP32[i5 >> 2] | 0, i6 >>> 0 < (HEAP32[i8 + 16 >> 2] | 0) >>> 0) : 0) {
   HEAP32[i5 >> 2] = i6 + 1;
   HEAP8[i6 >> 0] = i7;
  } else i1 = ___overflow(i8, i2) | 0;
  ___unlockfile(i8);
 } else i9 = 3;
 do if ((i9 | 0) == 3) {
  if ((i1 | 0) != (HEAP8[i8 + 75 >> 0] | 0) ? (i3 = i8 + 20 | 0, i4 = HEAP32[i3 >> 2] | 0, i4 >>> 0 < (HEAP32[i8 + 16 >> 2] | 0) >>> 0) : 0) {
   HEAP32[i3 >> 2] = i4 + 1;
   HEAP8[i4 >> 0] = i7;
   break;
  }
  i1 = ___overflow(i8, i2) | 0;
 } while (0);
 return i1 | 0;
}

function ___remdi3(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 i8 = i5 | 0;
 i7 = i2 >> 31 | ((i2 | 0) < 0 ? -1 : 0) << 1;
 i6 = ((i2 | 0) < 0 ? -1 : 0) >> 31 | ((i2 | 0) < 0 ? -1 : 0) << 1;
 i10 = i4 >> 31 | ((i4 | 0) < 0 ? -1 : 0) << 1;
 i9 = ((i4 | 0) < 0 ? -1 : 0) >> 31 | ((i4 | 0) < 0 ? -1 : 0) << 1;
 i1 = _i64Subtract(i7 ^ i1 | 0, i6 ^ i2 | 0, i7 | 0, i6 | 0) | 0;
 i2 = tempRet0;
 ___udivmoddi4(i1, i2, _i64Subtract(i10 ^ i3 | 0, i9 ^ i4 | 0, i10 | 0, i9 | 0) | 0, tempRet0, i8) | 0;
 i4 = _i64Subtract(HEAP32[i8 >> 2] ^ i7 | 0, HEAP32[i8 + 4 >> 2] ^ i6 | 0, i7 | 0, i6 | 0) | 0;
 i3 = tempRet0;
 STACKTOP = i5;
 return (tempRet0 = i3, i4) | 0;
}

function _iswctype(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 do switch (i2 | 0) {
 case 1:
  {
   i1 = _iswalnum(i1) | 0;
   break;
  }
 case 2:
  {
   i1 = _iswalpha(i1) | 0;
   break;
  }
 case 3:
  {
   i1 = _iswblank(i1) | 0;
   break;
  }
 case 4:
  {
   i1 = _iswcntrl(i1) | 0;
   break;
  }
 case 5:
  {
   i1 = _iswdigit(i1) | 0;
   break;
  }
 case 6:
  {
   i1 = _iswgraph(i1) | 0;
   break;
  }
 case 7:
  {
   i1 = _iswlower(i1) | 0;
   break;
  }
 case 8:
  {
   i1 = _iswprint(i1) | 0;
   break;
  }
 case 9:
  {
   i1 = _iswpunct(i1) | 0;
   break;
  }
 case 10:
  {
   i1 = _iswspace(i1) | 0;
   break;
  }
 case 11:
  {
   i1 = _iswupper(i1) | 0;
   break;
  }
 case 12:
  {
   i1 = _iswxdigit(i1) | 0;
   break;
  }
 default:
  i1 = 0;
 } while (0);
 return i1 | 0;
}

function _Connect_Check(i1, i4, i2, i3) {
 i1 = i1 | 0;
 i4 = i4 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i5 = 0, i6 = 0, i7 = 0, i8 = 0;
 i3 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i1 = i3;
 i6 = HEAP32[i4 >> 2] | 0;
 i8 = HEAP32[i4 + 4 >> 2] | 0;
 i7 = HEAP32[i4 + 8 >> 2] | 0;
 i2 = HEAP32[i4 + 12 >> 2] | 0;
 HEAP16[i1 >> 1] = 2;
 HEAP32[i1 + 4 >> 2] = i8;
 HEAP16[i1 + 2 >> 1] = _htons(i7 & 65535) | 0;
 if (_connect(i6, i1, 16) | 0) {
  i1 = HEAP32[(___errno_location() | 0) >> 2] | 0;
  if ((i1 | 1 | 0) == 115) i1 = 0; else {
   i1 = (i1 | 0) == 106 ? 0 : i1;
   i5 = 4;
  }
 } else {
  i1 = 0;
  i5 = 4;
 }
 if ((i5 | 0) == 4) {
  HEAP32[i2 >> 2] = i1;
  i1 = 1;
 }
 STACKTOP = i3;
 return i1 | 0;
}

function _System_String_InternalIndexOfAny(i2, i1, i9) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 i9 = i9 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i10 = 0;
 i8 = HEAP32[i1 >> 2] | 0;
 i4 = HEAP32[i1 + 4 >> 2] | 0;
 i7 = i8 + 4 | 0;
 i8 = HEAP32[i8 >> 2] | 0;
 i10 = (HEAP32[i1 + 12 >> 2] | 0) == 0;
 i1 = (HEAP32[i1 + 8 >> 2] | 0) + i4 | 0;
 i5 = i10 ? i4 + -1 | 0 : i1;
 i6 = i10 ? -1 : 1;
 i3 = i2 + 4 | 0;
 i1 = i10 ? i1 + -1 | 0 : i4;
 L1 : while (1) {
  if ((i1 | 0) == (i5 | 0)) {
   i1 = -1;
   break;
  }
  i4 = HEAP16[i3 + (i1 << 1) >> 1] | 0;
  i2 = i8;
  while (1) {
   i2 = i2 + -1 | 0;
   if ((i2 | 0) <= -1) break;
   if (i4 << 16 >> 16 == (HEAP16[i7 + (i2 << 1) >> 1] | 0)) break L1;
  }
  i1 = i1 + i6 | 0;
 }
 HEAP32[i9 >> 2] = i1;
 return 0;
}

function _cycle(i1, i4, i5) {
 i1 = i1 | 0;
 i4 = i4 | 0;
 i5 = i5 | 0;
 var i2 = 0, i3 = 0, i6 = 0, i7 = 0, i8 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 256 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(256);
 i2 = i7;
 L1 : do if ((i5 | 0) >= 2 ? (i6 = i4 + (i5 << 2) | 0, HEAP32[i6 >> 2] = i2, i1 | 0) : 0) while (1) {
  i3 = i1 >>> 0 < 256 ? i1 : 256;
  _memcpy(i2 | 0, HEAP32[i4 >> 2] | 0, i3 | 0) | 0;
  i2 = 0;
  do {
   i8 = i4 + (i2 << 2) | 0;
   i2 = i2 + 1 | 0;
   _memcpy(HEAP32[i8 >> 2] | 0, HEAP32[i4 + (i2 << 2) >> 2] | 0, i3 | 0) | 0;
   HEAP32[i8 >> 2] = (HEAP32[i8 >> 2] | 0) + i3;
  } while ((i2 | 0) != (i5 | 0));
  i1 = i1 - i3 | 0;
  if (!i1) break L1;
  i2 = HEAP32[i6 >> 2] | 0;
 } while (0);
 STACKTOP = i7;
 return;
}

function _System_Array_Reverse(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0;
 i1 = HEAP32[i2 >> 2] | 0;
 i7 = HEAP32[i2 + 4 >> 2] | 0;
 i3 = HEAP32[i2 + 8 >> 2] | 0;
 i5 = HEAP32[(HEAP32[(_Heap_GetType(i1) | 0) + 96 >> 2] | 0) + 64 >> 2] | 0;
 i6 = 0 - (i5 << 1) | 0;
 i3 = (Math_imul(i5, i7 + -1 + i3 | 0) | 0) + (i1 + 4) | 0;
 i1 = (Math_imul(i5, i7) | 0) + (i1 + 4) | 0;
 while (1) {
  if (i3 >>> 0 <= i1 >>> 0) break;
  i7 = i1 + i5 | 0;
  i2 = i5;
  i4 = i3;
  while (1) {
   if (!i2) break;
   i8 = HEAP8[i1 >> 0] | 0;
   HEAP8[i1 >> 0] = HEAP8[i4 >> 0] | 0;
   HEAP8[i4 >> 0] = i8;
   i2 = i2 + -1 | 0;
   i4 = i4 + 1 | 0;
   i1 = i1 + 1 | 0;
  }
  i3 = i3 + i5 + i6 | 0;
  i1 = i7;
 }
 return 0;
}

function _GetMethodDefs() {
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0;
 i1 = HEAP32[(HEAP32[8595] | 0) + 4 >> 2] | 0;
 i6 = HEAP32[i1 + 4 >> 2] | 0;
 if (!(HEAP8[i1 + 33 >> 0] | 0)) i5 = (HEAP32[i1 + 160 >> 2] | 0) + -1 | 0; else i5 = HEAP32[i6 + 44 >> 2] & 16777215 | 100663296;
 i2 = HEAP32[i1 + 28 >> 2] | 0;
 while (1) {
  if (i2 >>> 0 > i5 >>> 0) break;
  i3 = _MetaData_GetTableRow(i6, i2) | 0;
  i4 = i3 + 16 | 0;
  i1 = 0;
  while (1) {
   if (i1 >>> 0 >= 13) break;
   if (!(_strcmp(HEAP32[i4 >> 2] | 0, HEAP32[3640 + (i1 << 2) >> 2] | 0) | 0)) {
    i7 = 9;
    break;
   }
   i1 = i1 + 1 | 0;
  }
  if ((i7 | 0) == 9) {
   i7 = 0;
   HEAP32[34388 + (i1 << 2) >> 2] = i3;
  }
  i2 = i2 + 1 | 0;
 }
 HEAP8[37100] = 1;
 return;
}

function _scalbn(d2, i1) {
 d2 = +d2;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0;
 if ((i1 | 0) <= 1023) {
  if ((i1 | 0) < -1022) {
   d2 = d2 * 2.2250738585072014e-308;
   i3 = i1 + 1022 | 0;
   i4 = (i3 | 0) < -1022;
   i1 = i1 + 2044 | 0;
   d2 = i4 ? d2 * 2.2250738585072014e-308 : d2;
   i1 = i4 ? ((i1 | 0) > -1022 ? i1 : -1022) : i3;
  }
 } else {
  d2 = d2 * 8988465674311579538646525.0e283;
  i4 = i1 + -1023 | 0;
  i3 = (i4 | 0) > 1023;
  i1 = i1 + -2046 | 0;
  d2 = i3 ? d2 * 8988465674311579538646525.0e283 : d2;
  i1 = i3 ? ((i1 | 0) < 1023 ? i1 : 1023) : i4;
 }
 i3 = _bitshift64Shl(i1 + 1023 | 0, 0, 52) | 0;
 i4 = tempRet0;
 HEAP32[tempDoublePtr >> 2] = i3;
 HEAP32[tempDoublePtr + 4 >> 2] = i4;
 return +(d2 * +HEAPF64[tempDoublePtr >> 3]);
}

function _System_Array_Internal_GetValue(i2, i1, i5) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 i5 = i5 | 0;
 var i3 = 0, i4 = 0;
 i1 = HEAP32[i1 >> 2] | 0;
 i3 = HEAP32[(_Heap_GetType(i2) | 0) + 96 >> 2] | 0;
 i4 = HEAP32[i3 + 64 >> 2] | 0;
 i1 = i2 + 4 + (Math_imul(i4, i1) | 0) | 0;
 if (!(HEAP8[i3 + 34 >> 0] | 0)) HEAP32[i5 >> 2] = HEAP32[i1 >> 2]; else {
  if ((HEAP32[i3 + 88 >> 2] | 0) == (HEAP32[(HEAP32[8595] | 0) + 184 >> 2] | 0)) if (!(HEAP32[i1 >> 2] | 0)) i1 = 0; else {
   i3 = _Heap_AllocType(HEAP32[HEAP32[i3 + 92 >> 2] >> 2] | 0) | 0;
   _memcpy(i3 | 0, i1 + 4 | 0, i4 + -4 | 0) | 0;
   i1 = i3;
  } else {
   i3 = _Heap_AllocType(i3) | 0;
   _memcpy(i3 | 0, i1 | 0, i4 | 0) | 0;
   i1 = i3;
  }
  HEAP32[i5 >> 2] = i1;
 }
 return 0;
}

function _Heap_Alloc(i2, i3) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i1 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0;
 i4 = i3 + 20 | 0;
 i1 = HEAP32[7044] | 0;
 if (i1 >>> 0 >= (HEAP32[7045] | 0) >>> 0) {
  _GarbageCollect();
  i1 = HEAP32[7044] | 0;
  i6 = i1 + i4 | 0;
  i5 = i6 << 1;
  i7 = i6 + 5e4 | 0;
  i5 = i5 >>> 0 < i7 >>> 0 ? i7 : i5;
  i6 = i6 + 2e5 | 0;
  HEAP32[7045] = i5 >>> 0 > i6 >>> 0 ? i6 : i5;
 }
 i6 = _malloc(i4) | 0;
 HEAP32[i6 + 12 >> 2] = i2;
 HEAP32[i6 + 16 >> 2] = 0;
 HEAP8[i6 + 10 >> 0] = (HEAP32[i2 + 124 >> 2] | 0) != 0 & 1;
 i7 = i6 + 20 | 0;
 _memset(i7 | 0, 0, i3 | 0) | 0;
 HEAP32[7044] = i1 + i4;
 HEAP32[7047] = _TreeInsert(HEAP32[7047] | 0, i6) | 0;
 HEAP32[7048] = (HEAP32[7048] | 0) + 1;
 return i7 | 0;
}

function _MetaData_GetTypeDefFromMethodDef(i4) {
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i5 = 0, i6 = 0, i7 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i6 = i7;
 i2 = HEAP32[i4 + 4 >> 2] | 0;
 i3 = i4 + 52 | 0;
 i1 = HEAP32[i2 + 28 >> 2] | 0;
 while (1) {
  if (!i1) {
   i1 = 4;
   break;
  }
  i5 = _MetaData_GetTableRow(i2, i1 & 16777215 | 33554432) | 0;
  if ((HEAP32[i5 + 28 >> 2] | 0) >>> 0 > (HEAP32[i3 >> 2] | 0) >>> 0) i1 = i1 + -1 | 0; else {
   i1 = 5;
   break;
  }
 }
 if ((i1 | 0) == 4) {
  HEAP32[i6 >> 2] = HEAP32[i4 + 16 >> 2];
  _Crash(15655, i6);
 } else if ((i1 | 0) == 5) {
  STACKTOP = i7;
  return i5 | 0;
 }
 return 0;
}

function _MetaData_GetTypeDefFromFieldDef(i4) {
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i5 = 0, i6 = 0, i7 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i6 = i7;
 i2 = HEAP32[i4 + 4 >> 2] | 0;
 i3 = i4 + 36 | 0;
 i1 = HEAP32[i2 + 28 >> 2] | 0;
 while (1) {
  if (!i1) {
   i1 = 4;
   break;
  }
  i5 = _MetaData_GetTableRow(i2, i1 & 16777215 | 33554432) | 0;
  if ((HEAP32[i5 + 24 >> 2] | 0) >>> 0 > (HEAP32[i3 >> 2] | 0) >>> 0) i1 = i1 + -1 | 0; else {
   i1 = 5;
   break;
  }
 }
 if ((i1 | 0) == 4) {
  HEAP32[i6 >> 2] = HEAP32[i4 + 12 >> 2];
  _Crash(15723, i6);
 } else if ((i1 | 0) == 5) {
  STACKTOP = i7;
  return i5 | 0;
 }
 return 0;
}

function _MetaData_GetResolutionScopeMetaData(i2, i3, i4) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i1 = 0, i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i6;
 switch ((i3 >>> 24 & 255) << 24 >> 24) {
 case 35:
  {
   i1 = _MetaData_GetTableRow(i2, i3) | 0;
   HEAP32[i4 >> 2] = 0;
   i1 = _CLIFile_GetMetaDataForAssembly(HEAP32[i1 + 16 >> 2] | 0) | 0;
   break;
  }
 case 1:
  {
   i1 = _MetaData_GetTypeDefFromDefRefOrSpec(i2, i3, 0, 0) | 0;
   HEAP32[i4 >> 2] = i1;
   i1 = HEAP32[i1 + 4 >> 2] | 0;
   break;
  }
 default:
  {
   HEAP32[i5 >> 2] = i3;
   _Crash(15466, i5);
  }
 }
 STACKTOP = i6;
 return i1 | 0;
}

function _System_DateTime_InternalUtcNow(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0, i6 = 0;
 i1 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i1;
 _gettimeofday(i4 | 0, 0) | 0;
 i6 = HEAP32[i4 >> 2] | 0;
 i6 = ___muldi3(i6 | 0, ((i6 | 0) < 0) << 31 >> 31 | 0, 1e7, 0) | 0;
 i5 = tempRet0;
 i4 = HEAP32[i4 + 4 >> 2] | 0;
 i4 = ___muldi3(i4 | 0, ((i4 | 0) < 0) << 31 >> 31 | 0, 10, 0) | 0;
 i2 = tempRet0;
 i5 = _i64Add(i6 | 0, i5 | 0, -139100160, 144670709) | 0;
 i2 = _i64Add(i5 | 0, tempRet0 | 0, i4 | 0, i2 | 0) | 0;
 HEAP32[i3 >> 2] = i2;
 HEAP32[i3 + 4 >> 2] = tempRet0;
 STACKTOP = i1;
 return 0;
}

function _System_Char_GetUnicodeCategory(i1, i2, i8) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i8 = i8 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0;
 i6 = HEAP32[i2 >> 2] | 0;
 if ((i6 | 0) != 65535) {
  i1 = 0;
  i2 = 597;
  i3 = 298;
  while (1) {
   i4 = i3 << 1;
   i7 = HEAPU16[5576 + (i4 << 1) >> 1] | 0;
   i5 = i6 >>> 0 < i7 >>> 0;
   if (!i5 ? i6 >>> 0 < (HEAPU16[5576 + (i4 + 2 << 1) >> 1] | 0) >>> 0 : 0) break;
   i4 = i5 ? i3 : i2;
   i7 = i5 ? i1 : i3;
   i1 = i7;
   i2 = i4;
   i3 = ((i4 - i7 | 0) >>> 1) + i7 | 0;
  }
  i1 = HEAPU16[5576 + ((i4 | 1) << 1) >> 1] | 0;
  if (i1 & 32768) i1 = HEAPU8[16482 + (i6 - i7 + (i1 & 32767)) >> 0] | 0;
 } else i1 = 29;
 HEAP32[i8 >> 2] = i1;
 return 0;
}

function _is_literal(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0;
 i3 = HEAP8[i2 >> 0] | 0;
 L1 : do if (!(i3 << 24 >> 24)) i1 = 1; else {
  i4 = (i1 | 0) == 0;
  i1 = 0;
  while (1) {
   switch (i3 << 24 >> 24 | 0) {
   case 42:
   case 63:
    {
     i1 = 0;
     break L1;
    }
   case 92:
    {
     if (!i4) {
      i1 = 0;
      break L1;
     }
     break;
    }
   case 91:
    {
     i1 = 1;
     break;
    }
   case 93:
    {
     if (!i1) i1 = 0; else {
      i1 = 0;
      break L1;
     }
     break;
    }
   default:
    {}
   }
   i2 = i2 + 1 | 0;
   i3 = HEAP8[i2 >> 0] | 0;
   if (!(i3 << 24 >> 24)) {
    i1 = 1;
    break L1;
   }
  }
 } while (0);
 return i1 | 0;
}

function _System_Threading_Thread_Start(i5, i1, i2) {
 i5 = i5 | 0;
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i1 = i4 + 8 | 0;
 i3 = i4;
 i2 = i5 + 12 | 0;
 HEAP32[i2 >> 2] = HEAP32[i2 >> 2] & 4;
 i2 = _Delegate_GetMethodAndStore(HEAP32[i5 + 4 >> 2] | 0, i1, 0) | 0;
 i1 = HEAP32[i1 >> 2] | 0;
 if (!i1) i1 = 0; else {
  HEAP32[i3 >> 2] = i1;
  i1 = 4;
 }
 if (HEAP32[i5 + 48 >> 2] | 0) {
  HEAP32[i3 + (i1 << 2) >> 2] = HEAP32[i5 + 8 >> 2];
  i1 = i1 + 4 | 0;
 }
 _Thread_SetEntryPoint(i5, HEAP32[i2 + 4 >> 2] | 0, HEAP32[i2 + 52 >> 2] | 0, i3, i1);
 STACKTOP = i4;
 return 0;
}

function _System_Environment_GetOSVersionString(i1, i2, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i4 = i4 | 0;
 var i3 = 0;
 i3 = STACKTOP;
 STACKTOP = STACKTOP + 64 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(64);
 i2 = i3;
 i1 = HEAP32[8591] | 0;
 if (!i1) {
  HEAP8[i2 >> 0] = HEAP8[18282] | 0;
  HEAP8[i2 + 1 >> 0] = HEAP8[18283] | 0;
  HEAP8[i2 + 2 >> 0] = HEAP8[18284] | 0;
  HEAP8[i2 + 3 >> 0] = HEAP8[18285] | 0;
  HEAP8[i2 + 4 >> 0] = HEAP8[18286] | 0;
  HEAP8[i2 + 5 >> 0] = HEAP8[18287] | 0;
  i1 = _SystemString_FromCharPtrASCII(i2) | 0;
  HEAP32[8591] = i1;
  _Heap_MakeUndeletable(i1);
  i1 = HEAP32[8591] | 0;
 }
 HEAP32[i4 >> 2] = i1;
 STACKTOP = i3;
 return 0;
}

function _frexp(d1, i5) {
 d1 = +d1;
 i5 = i5 | 0;
 var i2 = 0, i3 = 0, i4 = 0;
 HEAPF64[tempDoublePtr >> 3] = d1;
 i2 = HEAP32[tempDoublePtr >> 2] | 0;
 i3 = HEAP32[tempDoublePtr + 4 >> 2] | 0;
 i4 = _bitshift64Lshr(i2 | 0, i3 | 0, 52) | 0;
 switch (i4 & 2047) {
 case 0:
  {
   if (d1 != 0.0) {
    d1 = +_frexp(d1 * 18446744073709551616.0, i5);
    i2 = (HEAP32[i5 >> 2] | 0) + -64 | 0;
   } else i2 = 0;
   HEAP32[i5 >> 2] = i2;
   break;
  }
 case 2047:
  break;
 default:
  {
   HEAP32[i5 >> 2] = (i4 & 2047) + -1022;
   HEAP32[tempDoublePtr >> 2] = i2;
   HEAP32[tempDoublePtr + 4 >> 2] = i3 & -2146435073 | 1071644672;
   d1 = +HEAPF64[tempDoublePtr >> 3];
  }
 }
 return +d1;
}

function _Generics_GetGenericTypeFromSig(i2, i3, i6, i7) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i6 = i6 | 0;
 i7 = i7 | 0;
 var i1 = 0, i4 = 0, i5 = 0, i8 = 0, i9 = 0;
 i8 = _Type_GetTypeFromSig(i2, i3, i6, i7) | 0;
 if (!(HEAP8[i8 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i8, i6, i7);
 i9 = _MetaData_DecodeSigEntry(i3) | 0;
 i4 = _malloc(i9 << 2) | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i9 | 0)) break;
  i5 = _Type_GetTypeFromSig(i2, i3, i6, i7) | 0;
  HEAP32[i4 + (i1 << 2) >> 2] = i5;
  if (i5 | 0 ? (HEAP8[i5 + 32 >> 0] | 0) == 0 : 0) _MetaData_Fill_TypeDef_(i5, 0, 0);
  i1 = i1 + 1 | 0;
 }
 i9 = _Generics_GetGenericTypeFromCoreType(i8, i9, i4) | 0;
 _free(i4);
 return i9 | 0;
}

function _CLIFile_GetMetaDataForLoadedAssembly(i3) {
 i3 = i3 | 0;
 var i1 = 0, i2 = 0, i4 = 0, i5 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i5;
 i1 = 28160;
 while (1) {
  i1 = HEAP32[i1 >> 2] | 0;
  if (!i1) {
   i1 = 4;
   break;
  }
  i2 = (HEAP32[i1 >> 2] | 0) + 16 | 0;
  if (!(_strcmp(i3, HEAP32[(_MetaData_GetTableRow(HEAP32[i2 >> 2] | 0, 536870913) | 0) + 20 >> 2] | 0) | 0)) {
   i1 = 5;
   break;
  } else i1 = i1 + 4 | 0;
 }
 if ((i1 | 0) == 4) {
  HEAP32[i4 >> 2] = i3;
  _Crash(11396, i4);
 } else if ((i1 | 0) == 5) {
  STACKTOP = i5;
  return HEAP32[i2 >> 2] | 0;
 }
 return 0;
}

function _CLIFile_FindTypeInAllLoadedAssemblies(i3, i4) {
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i6;
 i1 = 28160;
 while (1) {
  i1 = HEAP32[i1 >> 2] | 0;
  if (!i1) {
   i1 = 4;
   break;
  }
  i2 = _MetaData_GetTypeDefFromName(HEAP32[(HEAP32[i1 >> 2] | 0) + 16 >> 2] | 0, i3, i4, 0, 0) | 0;
  if (!i2) i1 = i1 + 4 | 0; else {
   i1 = 5;
   break;
  }
 }
 if ((i1 | 0) == 4) {
  HEAP32[i5 >> 2] = i3;
  HEAP32[i5 + 4 >> 2] = i4;
  _Crash(11476, i5);
 } else if ((i1 | 0) == 5) {
  STACKTOP = i6;
  return i2 | 0;
 }
 return 0;
}

function _System_Net_Sockets_Internal_CreateSocket(i1, i2, i6) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i6 = i6 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i7 = 0, i8 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i5;
 i8 = HEAP32[i2 >> 2] | 0;
 i7 = HEAP32[i2 + 4 >> 2] | 0;
 i1 = HEAP32[i2 + 8 >> 2] | 0;
 i3 = HEAP32[i2 + 12 >> 2] | 0;
 HEAP32[i6 >> 2] = 0;
 i1 = _socket(i8, i7, i1) | 0;
 if ((i1 | 0) == -1) {
  i1 = 0;
  i2 = HEAP32[(___errno_location() | 0) >> 2] | 0;
 } else i2 = 0;
 HEAP32[i3 >> 2] = i2;
 HEAP32[i4 >> 2] = 2048;
 _fcntl(i1, 4, i4) | 0;
 HEAP32[i6 >> 2] = i1;
 STACKTOP = i5;
 return 0;
}

function ___divdi3(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0, i10 = 0;
 i10 = i2 >> 31 | ((i2 | 0) < 0 ? -1 : 0) << 1;
 i9 = ((i2 | 0) < 0 ? -1 : 0) >> 31 | ((i2 | 0) < 0 ? -1 : 0) << 1;
 i6 = i4 >> 31 | ((i4 | 0) < 0 ? -1 : 0) << 1;
 i5 = ((i4 | 0) < 0 ? -1 : 0) >> 31 | ((i4 | 0) < 0 ? -1 : 0) << 1;
 i8 = _i64Subtract(i10 ^ i1 | 0, i9 ^ i2 | 0, i10 | 0, i9 | 0) | 0;
 i7 = tempRet0;
 i1 = i6 ^ i10;
 i2 = i5 ^ i9;
 return _i64Subtract((___udivmoddi4(i8, i7, _i64Subtract(i6 ^ i3 | 0, i5 ^ i4 | 0, i6 | 0, i5 | 0) | 0, tempRet0, 0) | 0) ^ i1 | 0, tempRet0 ^ i2 | 0, i1 | 0, i2 | 0) | 0;
}

function _CLIFile_Load(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i5 + 8 | 0;
 i3 = i5;
 i2 = _LoadFileFromDisk(i1) | 0;
 if (!i2) {
  HEAP32[i3 >> 2] = i1;
  _Crash(11540, i3);
 } else {
  HEAP32[i4 >> 2] = i1;
  _log_f(1, 11561, i4);
  i4 = _LoadPEFile(i2) | 0;
  i3 = _mallocForever((_strlen(i1) | 0) + 1 | 0) | 0;
  HEAP32[i4 >> 2] = i3;
  _strcpy(i3, i1) | 0;
  i3 = _mallocForever(8) | 0;
  HEAP32[i3 >> 2] = i4;
  HEAP32[i3 + 4 >> 2] = HEAP32[7040];
  HEAP32[7040] = i3;
  STACKTOP = i5;
  return i4 | 0;
 }
 return 0;
}

function _Type_GetArrayTypeDef(i3, i1, i2) {
 i3 = i3 | 0;
 i1 = i1 | 0;
 i2 = i2 | 0;
 do if (i3) {
  i1 = 34384;
  while (1) {
   i1 = HEAP32[i1 >> 2] | 0;
   if (!i1) {
    i2 = 7;
    break;
   }
   if ((HEAP32[i1 + 4 >> 2] | 0) == (i3 | 0)) {
    i2 = 5;
    break;
   }
   i1 = i1 + 8 | 0;
  }
  if ((i2 | 0) == 5) break; else if ((i2 | 0) == 7) {
   i1 = _mallocForever(12) | 0;
   HEAP32[i1 + 4 >> 2] = i3;
   HEAP32[i1 + 8 >> 2] = HEAP32[8596];
   HEAP32[8596] = i1;
   i2 = _malloc(132) | 0;
   HEAP32[i1 >> 2] = i2;
   _CreateNewArrayType(i2, i3);
   break;
  }
 } else i1 = (HEAP32[8595] | 0) + 4 | 0; while (0);
 return HEAP32[i1 >> 2] | 0;
}

function _MetaData_DecodeSigEntry(i5) {
 i5 = i5 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i6 = 0;
 i6 = HEAP32[i5 >> 2] | 0;
 i3 = i6 + 1 | 0;
 HEAP32[i5 >> 2] = i3;
 i2 = HEAP8[i6 >> 0] | 0;
 i1 = i2 & 255;
 do if (i1 & 128) if (i2 << 24 >> 24 != -1) {
  i4 = i6 + 2 | 0;
  HEAP32[i5 >> 2] = i4;
  i2 = HEAPU8[i3 >> 0] | 0;
  if ((i1 & 192 | 0) == 128) {
   i1 = i2 | i1 << 8 & 16128;
   break;
  } else {
   i3 = i6 + 3 | 0;
   HEAP32[i5 >> 2] = i3;
   i4 = HEAP8[i4 >> 0] | 0;
   HEAP32[i5 >> 2] = i6 + 4;
   i1 = i2 << 16 | i1 << 24 & 520093696 | (i4 & 255) << 8 | (HEAPU8[i3 >> 0] | 0);
   break;
  }
 } else i1 = 0; while (0);
 return i1 | 0;
}

function _DotNetStringToCString(i7, i2, i1) {
 i7 = i7 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i8 = 0;
 i8 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i8;
 i4 = i8 + 8 | 0;
 i3 = _SystemString_GetString(i1, i4) | 0;
 i4 = HEAP32[i4 >> 2] | 0;
 if (i4 >>> 0 > i2 >>> 0) {
  HEAP32[i5 >> 2] = i4;
  HEAP32[i5 + 4 >> 2] = i2;
  _Crash(18310, i5);
 } else i6 = 0;
 while (1) {
  i1 = i7 + i6 | 0;
  if ((i6 | 0) == (i4 | 0)) break;
  HEAP8[i1 >> 0] = HEAP16[i3 + (i6 << 1) >> 1];
  i6 = i6 + 1 | 0;
 }
 HEAP8[i1 >> 0] = 0;
 STACKTOP = i8;
 return;
}

function _System_IO_FileInternal_GetFileAttributes(i1, i2, i7) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i7 = i7 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 272 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(272);
 i3 = i6;
 i4 = i6 + 8 | 0;
 i5 = HEAP32[i2 + 4 >> 2] | 0;
 i2 = _SystemString_GetString(HEAP32[i2 >> 2] | 0, i3) | 0;
 i3 = HEAP32[i3 >> 2] | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i3 | 0)) break;
  HEAP8[i4 + i1 >> 0] = HEAP16[i2 + (i1 << 1) >> 1];
  i1 = i1 + 1 | 0;
 }
 HEAP8[i4 + i3 >> 0] = 0;
 HEAP32[i7 >> 2] = _Attrs(i4, i5) | 0;
 STACKTOP = i6;
 return 0;
}

function _realloc(i2, i3) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i1 = 0, i4 = 0;
 if (!i2) {
  i3 = _malloc(i3) | 0;
  return i3 | 0;
 }
 if (i3 >>> 0 > 4294967231) {
  HEAP32[(___errno_location() | 0) >> 2] = 12;
  i3 = 0;
  return i3 | 0;
 }
 i1 = _try_realloc_chunk(i2 + -8 | 0, i3 >>> 0 < 11 ? 16 : i3 + 11 & -8) | 0;
 if (i1 | 0) {
  i3 = i1 + 8 | 0;
  return i3 | 0;
 }
 i1 = _malloc(i3) | 0;
 if (!i1) {
  i3 = 0;
  return i3 | 0;
 }
 i4 = HEAP32[i2 + -4 >> 2] | 0;
 i4 = (i4 & -8) - ((i4 & 3 | 0) == 0 ? 8 : 4) | 0;
 _memcpy(i1 | 0, i2 | 0, (i4 >>> 0 < i3 >>> 0 ? i4 : i3) | 0) | 0;
 _free(i2);
 i3 = i1;
 return i3 | 0;
}

function _getcwd(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 4112 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(4112);
 i4 = i6;
 i3 = i6 + 8 | 0;
 if (i1) if (!i2) {
  HEAP32[(___errno_location() | 0) >> 2] = 22;
  i1 = 0;
 } else i5 = 4; else {
  i2 = 4096;
  i1 = i3;
  i5 = 4;
 }
 if ((i5 | 0) == 4) {
  HEAP32[i4 >> 2] = i1;
  HEAP32[i4 + 4 >> 2] = i2;
  if ((___syscall_ret(___syscall183(183, i4 | 0) | 0) | 0) >= 0) {
   if ((i1 | 0) == (i3 | 0)) i1 = ___strdup(i3) | 0;
  } else i1 = 0;
 }
 STACKTOP = i6;
 return i1 | 0;
}

function _Thread() {
 var i1 = 0, i2 = 0;
 i1 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 132 >> 2] | 0) | 0;
 _Heap_MakeUndeletable(i1);
 i2 = (HEAP32[8592] | 0) + 1 | 0;
 HEAP32[8592] = i2;
 HEAP32[i1 >> 2] = i2;
 HEAP32[i1 + 20 >> 2] = 0;
 HEAP32[i1 + 24 >> 2] = 0;
 HEAP32[i1 + 32 >> 2] = 0;
 HEAP32[i1 + 44 >> 2] = 0;
 HEAP32[i1 + 48 >> 2] = 0;
 HEAP32[i1 + 4 >> 2] = 0;
 HEAP32[i1 + 8 >> 2] = 0;
 HEAP32[i1 + 12 >> 2] = 8;
 i2 = _malloc(10008) | 0;
 HEAP32[i1 + 52 >> 2] = i2;
 HEAP32[i2 + 1e4 >> 2] = 0;
 HEAP32[i2 + 10004 >> 2] = 0;
 HEAP32[i1 + 56 >> 2] = HEAP32[8593];
 HEAP32[8593] = i1;
 return i1 | 0;
}

function _System_Net_Sockets_Internal_Bind(i1, i3, i2) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i2 = i2 | 0;
 var i4 = 0, i5 = 0, i6 = 0, i7 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i2 = i4;
 i5 = HEAP32[i3 >> 2] | 0;
 i7 = HEAP32[i3 + 4 >> 2] | 0;
 i6 = HEAP32[i3 + 8 >> 2] | 0;
 i1 = HEAP32[i3 + 12 >> 2] | 0;
 HEAP16[i2 >> 1] = 2;
 HEAP32[i2 + 4 >> 2] = i7;
 HEAP16[i2 + 2 >> 1] = _htons(i6 & 65535) | 0;
 if (!(_bind(i5, i2, 16) | 0)) i2 = 0; else i2 = HEAP32[(___errno_location() | 0) >> 2] | 0;
 HEAP32[i1 >> 2] = i2;
 STACKTOP = i4;
 return 0;
}

function _MetaData_GetImplMap(i2, i3) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i1 = 0, i4 = 0, i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i6;
 i1 = HEAP32[i2 + 132 >> 2] | 0;
 while (1) {
  if (!i1) {
   i1 = 4;
   break;
  }
  i4 = _MetaData_GetTableRow(i2, i1 & 16777215 | 469762048) | 0;
  if ((HEAP32[i4 + 4 >> 2] | 0) == (i3 | 0)) {
   i1 = 5;
   break;
  } else i1 = i1 + -1 | 0;
 }
 if ((i1 | 0) == 4) {
  HEAP32[i5 >> 2] = i3;
  _Crash(16169, i5);
 } else if ((i1 | 0) == 5) {
  STACKTOP = i6;
  return i4 | 0;
 }
 return 0;
}

function _System_Array_Internal_Copy(i1, i4, i5) {
 i1 = i1 | 0;
 i4 = i4 | 0;
 i5 = i5 | 0;
 var i2 = 0, i3 = 0, i6 = 0;
 i1 = HEAP32[i4 >> 2] | 0;
 i2 = HEAP32[i4 + 8 >> 2] | 0;
 i3 = _Heap_GetType(i1) | 0;
 i6 = _Heap_GetType(i2) | 0;
 i3 = HEAP32[i3 + 96 >> 2] | 0;
 if (!(_Type_IsAssignableFrom(HEAP32[i6 + 96 >> 2] | 0, i3) | 0)) i1 = 0; else {
  i6 = HEAP32[i3 + 64 >> 2] | 0;
  _memcpy((Math_imul(i6, HEAP32[i4 + 12 >> 2] | 0) | 0) + (i2 + 4) | 0, (Math_imul(i6, HEAP32[i4 + 4 >> 2] | 0) | 0) + (i1 + 4) | 0, Math_imul(i6, HEAP32[i4 + 16 >> 2] | 0) | 0) | 0;
  i1 = 1;
 }
 HEAP32[i5 >> 2] = i1;
 return 0;
}

function _fmt_u(i3, i2, i1) {
 i3 = i3 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i4 = 0;
 if (i2 >>> 0 > 0 | (i2 | 0) == 0 & i3 >>> 0 > 4294967295) {
  while (1) {
   i4 = ___uremdi3(i3 | 0, i2 | 0, 10, 0) | 0;
   i1 = i1 + -1 | 0;
   HEAP8[i1 >> 0] = i4 & 255 | 48;
   i4 = i3;
   i3 = ___udivdi3(i3 | 0, i2 | 0, 10, 0) | 0;
   if (!(i2 >>> 0 > 9 | (i2 | 0) == 9 & i4 >>> 0 > 4294967295)) break; else i2 = tempRet0;
  }
  i2 = i3;
 } else i2 = i3;
 if (i2) while (1) {
  i1 = i1 + -1 | 0;
  HEAP8[i1 >> 0] = (i2 >>> 0) % 10 | 0 | 48;
  if (i2 >>> 0 < 10) break; else i2 = (i2 >>> 0) / 10 | 0;
 }
 return i1 | 0;
}

function _recvfrom(i1, i2, i3, i4, i5, i6) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 i5 = i5 | 0;
 i6 = i6 | 0;
 var i7 = 0, i8 = 0, i9 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i8 = i7;
 i9 = i7 + 8 | 0;
 HEAP32[i9 >> 2] = i1;
 HEAP32[i9 + 4 >> 2] = i2;
 HEAP32[i9 + 8 >> 2] = i3;
 HEAP32[i9 + 12 >> 2] = i4;
 HEAP32[i9 + 16 >> 2] = i5;
 HEAP32[i9 + 20 >> 2] = i6;
 HEAP32[i8 >> 2] = 12;
 HEAP32[i8 + 4 >> 2] = i9;
 i6 = ___syscall_ret(___syscall102(102, i8 | 0) | 0) | 0;
 STACKTOP = i7;
 return i6 | 0;
}

function _sendto(i1, i2, i3, i4, i5, i6) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 i5 = i5 | 0;
 i6 = i6 | 0;
 var i7 = 0, i8 = 0, i9 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i8 = i7;
 i9 = i7 + 8 | 0;
 HEAP32[i9 >> 2] = i1;
 HEAP32[i9 + 4 >> 2] = i2;
 HEAP32[i9 + 8 >> 2] = i3;
 HEAP32[i9 + 12 >> 2] = i4;
 HEAP32[i9 + 16 >> 2] = i5;
 HEAP32[i9 + 20 >> 2] = i6;
 HEAP32[i8 >> 2] = 11;
 HEAP32[i8 + 4 >> 2] = i9;
 i6 = ___syscall_ret(___syscall102(102, i8 | 0) | 0) | 0;
 STACKTOP = i7;
 return i6 | 0;
}

function _Internal_TryEntry_Check(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 i1 = HEAP32[i2 + 4 >> 2] | 0;
 do if (!(_Heap_SyncTryEnter(HEAP32[i2 >> 2] | 0) | 0)) if ((i1 | 0) >= 0) {
  if (!i1) {
   HEAP32[i3 >> 2] = 0;
   i1 = 1;
   break;
  }
  if ((i4 | 0) != 0 ? (i2 = _msTime() | 0, i4 = i4 + 16 | 0, i4 = _i64Subtract(i2 | 0, tempRet0 | 0, HEAP32[i4 >> 2] | 0, HEAP32[i4 + 4 >> 2] | 0) | 0, (i4 | 0) > (i1 | 0)) : 0) {
   HEAP32[i3 >> 2] = 0;
   i1 = 1;
  } else i1 = 0;
 } else i1 = 0; else {
  HEAP32[i3 >> 2] = 1;
  i1 = 1;
 } while (0);
 return i1 | 0;
}

function _PushStackType_(i3, i1) {
 i3 = i3 | 0;
 i1 = i1 | 0;
 var i2 = 0, i4 = 0, i5 = 0, i6 = 0;
 if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
 i5 = HEAP32[i3 >> 2] | 0;
 i6 = i3 + 4 | 0;
 i2 = HEAP32[i6 >> 2] | 0;
 i4 = i2 + 1 | 0;
 HEAP32[i6 >> 2] = i4;
 HEAP32[i5 + (i2 << 2) >> 2] = i1;
 i2 = 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i4 | 0)) break;
  i2 = (HEAP32[(HEAP32[(HEAP32[i3 >> 2] | 0) + (i1 << 2) >> 2] | 0) + 68 >> 2] | 0) + i2 | 0;
  i1 = i1 + 1 | 0;
 }
 i1 = i3 + 8 | 0;
 if (i2 >>> 0 > (HEAP32[i1 >> 2] | 0) >>> 0) HEAP32[i1 >> 2] = i2;
 return;
}

function _strncmp(i3, i5, i4) {
 i3 = i3 | 0;
 i5 = i5 | 0;
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i6 = 0, i7 = 0;
 if (!i4) i1 = 0; else {
  i7 = HEAP8[i3 >> 0] | 0;
  i1 = i7 & 255;
  i6 = HEAP8[i5 >> 0] | 0;
  i2 = i6 & 255;
  L3 : do if (i7 << 24 >> 24) do {
   i4 = i4 + -1 | 0;
   if (!(i7 << 24 >> 24 == i6 << 24 >> 24 & ((i4 | 0) != 0 & i6 << 24 >> 24 != 0))) break L3;
   i3 = i3 + 1 | 0;
   i5 = i5 + 1 | 0;
   i7 = HEAP8[i3 >> 0] | 0;
   i1 = i7 & 255;
   i6 = HEAP8[i5 >> 0] | 0;
   i2 = i6 & 255;
  } while (i7 << 24 >> 24 != 0); while (0);
  i1 = i1 - i2 | 0;
 }
 return i1 | 0;
}

function _pad_674(i5, i2, i3, i4, i1) {
 i5 = i5 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 i1 = i1 | 0;
 var i6 = 0, i7 = 0;
 i7 = STACKTOP;
 STACKTOP = STACKTOP + 256 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(256);
 i6 = i7;
 if ((i3 | 0) > (i4 | 0) & (i1 & 73728 | 0) == 0) {
  i1 = i3 - i4 | 0;
  _memset(i6 | 0, i2 | 0, (i1 >>> 0 < 256 ? i1 : 256) | 0) | 0;
  if (i1 >>> 0 > 255) {
   i2 = i3 - i4 | 0;
   do {
    _out(i5, i6, 256);
    i1 = i1 + -256 | 0;
   } while (i1 >>> 0 > 255);
   i1 = i2 & 255;
  }
  _out(i5, i6, i1);
 }
 STACKTOP = i7;
 return;
}

function _Thread_GetHeapRoots(i3) {
 i3 = i3 | 0;
 var i1 = 0, i2 = 0, i4 = 0;
 i1 = 34372;
 while (1) {
  i2 = HEAP32[i1 >> 2] | 0;
  if (!i2) break;
  i1 = i2 + 20 | 0;
  while (1) {
   i1 = HEAP32[i1 >> 2] | 0;
   if (!i1) break;
   i4 = i1 + 4 | 0;
   _Heap_SetRoots(i3, HEAP32[i1 + 16 >> 2] | 0, HEAP32[(HEAP32[(HEAP32[i4 >> 2] | 0) + 28 >> 2] | 0) + 4 >> 2] | 0);
   i4 = HEAP32[i4 >> 2] | 0;
   _Heap_SetRoots(i3, HEAP32[i1 + 24 >> 2] | 0, (HEAP32[(HEAP32[i4 + 28 >> 2] | 0) + 8 >> 2] | 0) + (HEAP32[i4 + 40 >> 2] | 0) | 0);
   i1 = i1 + 48 | 0;
  }
  i1 = i2 + 56 | 0;
 }
 return;
}

function _System_String_GetHashCode(i2, i1, i6) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 i6 = i6 | 0;
 var i3 = 0, i4 = 0, i5 = 0;
 i3 = i2 + 4 | 0;
 i4 = HEAP32[i2 >> 2] | 0;
 i5 = i3 + (i4 << 1) + -2 | 0;
 i4 = i2 + ((i4 << 1) + 2) | 0;
 i4 = i2 + ((i4 >>> 0 > i3 >>> 0 ? i4 : i3) + ~i2 + 4 & -4) | 0;
 i1 = 0;
 i2 = i3;
 while (1) {
  i3 = i1 * 31 | 0;
  if (i2 >>> 0 >= i5 >>> 0) break;
  i1 = (((HEAPU16[i2 >> 1] | 0) + i3 | 0) * 31 | 0) + (HEAPU16[i2 + 2 >> 1] | 0) | 0;
  i2 = i2 + 4 | 0;
 }
 if (i4 >>> 0 <= i5 >>> 0) i1 = (HEAPU16[i4 >> 1] | 0) + i3 | 0;
 HEAP32[i6 >> 2] = i1;
 return 0;
}

function ___strerror_l(i2, i4) {
 i2 = i2 | 0;
 i4 = i4 | 0;
 var i1 = 0, i3 = 0;
 i3 = 0;
 while (1) {
  if ((HEAPU8[20043 + i3 >> 0] | 0) == (i2 | 0)) {
   i2 = 2;
   break;
  }
  i1 = i3 + 1 | 0;
  if ((i1 | 0) == 87) {
   i1 = 20131;
   i3 = 87;
   i2 = 5;
   break;
  } else i3 = i1;
 }
 if ((i2 | 0) == 2) if (!i3) i1 = 20131; else {
  i1 = 20131;
  i2 = 5;
 }
 if ((i2 | 0) == 5) while (1) {
  do {
   i2 = i1;
   i1 = i1 + 1 | 0;
  } while ((HEAP8[i2 >> 0] | 0) != 0);
  i3 = i3 + -1 | 0;
  if (!i3) break; else i2 = 5;
 }
 return ___lctrans(i1, HEAP32[i4 + 20 >> 2] | 0) | 0;
}

function _str_next(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i5;
 do if (!i2) {
  HEAP32[i3 >> 2] = 0;
  i1 = 0;
 } else {
  if ((HEAP8[i1 >> 0] | 0) >= 0) {
   HEAP32[i3 >> 2] = 1;
   i1 = HEAP8[i1 >> 0] | 0;
   break;
  }
  i1 = _mbtowc(i4, i1, i2) | 0;
  if ((i1 | 0) < 0) {
   HEAP32[i3 >> 2] = 1;
   i1 = -1;
  } else {
   HEAP32[i3 >> 2] = i1;
   i1 = HEAP32[i4 >> 2] | 0;
  }
 } while (0);
 STACKTOP = i5;
 return i1 | 0;
}

function _SearchCaseArray(i6, i7) {
 i6 = i6 | 0;
 i7 = i7 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0;
 L1 : do if (i7 << 16 >> 16 == -1) i1 = -1; else {
  i5 = 337;
  i1 = 674;
  i2 = 0;
  while (1) {
   i3 = HEAP16[i6 + (i5 << 1) >> 1] | 0;
   i4 = (i3 & 65535) > (i7 & 65535);
   if (!i4 ? (HEAPU16[i6 + (i5 + 1 << 1) >> 1] | 0) > (i7 & 65535) : 0) break;
   i2 = i4 ? i2 : i5;
   i1 = i4 ? i5 : i1;
   if (!i1) {
    i1 = -1;
    break L1;
   }
   i5 = ((i1 - i2 | 0) >>> 1) + i2 | 0;
  }
  i1 = i3 << 16 >> 16 == i7 << 16 >> 16 ? i5 : -1;
 } while (0);
 return i1 | 0;
}

function _tan(d1) {
 d1 = +d1;
 var i2 = 0, i3 = 0, i4 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i2 = i4;
 HEAPF64[tempDoublePtr >> 3] = d1;
 i3 = HEAP32[tempDoublePtr + 4 >> 2] & 2147483647;
 do if (i3 >>> 0 < 1072243196) {
  if (i3 >>> 0 >= 1044381696) d1 = +___tan(d1, 0.0, 0);
 } else if (i3 >>> 0 > 2146435071) {
  d1 = d1 - d1;
  break;
 } else {
  i3 = ___rem_pio2(d1, i2) | 0;
  d1 = +___tan(+HEAPF64[i2 >> 3], +HEAPF64[i2 + 8 >> 3], i3 & 1);
  break;
 } while (0);
 STACKTOP = i4;
 return +d1;
}

function _strcasecmp(i2, i3) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i1 = 0, i4 = 0, i5 = 0;
 i4 = HEAP8[i2 >> 0] | 0;
 i1 = i4 & 255;
 L1 : do if (i4 << 24 >> 24) {
  i5 = i4;
  do {
   i4 = HEAP8[i3 >> 0] | 0;
   if (!(i4 << 24 >> 24)) break L1;
   if (i5 << 24 >> 24 != i4 << 24 >> 24 ? (i5 = _tolower(i1) | 0, (i5 | 0) != (_tolower(i4 & 255) | 0)) : 0) break L1;
   i2 = i2 + 1 | 0;
   i3 = i3 + 1 | 0;
   i5 = HEAP8[i2 >> 0] | 0;
   i1 = i5 & 255;
  } while (i5 << 24 >> 24 != 0);
 } while (0);
 i5 = _tolower(i1) | 0;
 return i5 - (_tolower(HEAPU8[i3 >> 0] | 0) | 0) | 0;
}

function _Type_IsValueType(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 do if (!(HEAP32[i1 + 8 >> 2] & 32)) {
  if (!(_strcmp(HEAP32[i1 + 16 >> 2] | 0, 18829) | 0)) {
   i2 = HEAP32[i1 + 12 >> 2] | 0;
   if (!(_strcmp(i2, 18836) | 0)) {
    i1 = 1;
    break;
   }
   if (!(_strcmp(i2, 18846) | 0)) {
    i1 = 0;
    break;
   }
  }
  i1 = _MetaData_GetTypeDefFromDefRefOrSpec(HEAP32[i1 + 4 >> 2] | 0, HEAP32[i1 + 20 >> 2] | 0, 0, 0) | 0;
  if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
  i1 = HEAPU8[i1 + 34 >> 0] | 0;
 } else i1 = 0; while (0);
 return i1 | 0;
}

function _readdir_r(i1, i3, i5) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i5 = i5 | 0;
 var i2 = 0, i4 = 0, i6 = 0;
 i4 = HEAP32[(___errno_location() | 0) >> 2] | 0;
 i6 = i1 + 16 | 0;
 ___lock(i6 | 0);
 HEAP32[(___errno_location() | 0) >> 2] = 0;
 i2 = _readdir(i1) | 0;
 i1 = HEAP32[(___errno_location() | 0) >> 2] | 0;
 if (!i1) {
  HEAP32[(___errno_location() | 0) >> 2] = i4;
  if (!i2) i1 = 0; else {
   _memcpy(i3 | 0, i2 | 0, HEAPU16[i2 + 8 >> 1] | 0 | 0) | 0;
   i1 = i3;
  }
  ___unlock(i6 | 0);
  HEAP32[i5 >> 2] = i1;
  i1 = 0;
 } else ___unlock(i6 | 0);
 return i1 | 0;
}

function _strlen(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0;
 i4 = i1;
 L1 : do if (!(i4 & 3)) i3 = 4; else {
  i2 = i4;
  while (1) {
   if (!(HEAP8[i1 >> 0] | 0)) {
    i1 = i2;
    break L1;
   }
   i1 = i1 + 1 | 0;
   i2 = i1;
   if (!(i2 & 3)) {
    i3 = 4;
    break;
   }
  }
 } while (0);
 if ((i3 | 0) == 4) {
  while (1) {
   i2 = HEAP32[i1 >> 2] | 0;
   if (!((i2 & -2139062144 ^ -2139062144) & i2 + -16843009)) i1 = i1 + 4 | 0; else break;
  }
  if ((i2 & 255) << 24 >> 24) do i1 = i1 + 1 | 0; while ((HEAP8[i1 >> 0] | 0) != 0);
 }
 return i1 - i4 | 0;
}

function _System_String_InternalIndexOf(i2, i1, i6) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 i6 = i6 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i7 = 0, i8 = 0;
 i5 = HEAP16[i1 >> 1] | 0;
 i7 = HEAP32[i1 + 4 >> 2] | 0;
 i8 = (HEAP32[i1 + 12 >> 2] | 0) == 0;
 i1 = (HEAP32[i1 + 8 >> 2] | 0) + i7 | 0;
 i3 = i8 ? i7 + -1 | 0 : i1;
 i4 = i8 ? -1 : 1;
 i2 = i2 + 4 | 0;
 i1 = i8 ? i1 + -1 | 0 : i7;
 while (1) {
  if ((i1 | 0) == (i3 | 0)) {
   i1 = -1;
   break;
  }
  if ((HEAP16[i2 + (i1 << 1) >> 1] | 0) == i5 << 16 >> 16) break;
  i1 = i1 + i4 | 0;
 }
 HEAP32[i6 >> 2] = i1;
 return 0;
}

function ___stdio_seek(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0, i6 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i6 = i5;
 i4 = i5 + 20 | 0;
 HEAP32[i6 >> 2] = HEAP32[i1 + 60 >> 2];
 HEAP32[i6 + 4 >> 2] = 0;
 HEAP32[i6 + 8 >> 2] = i2;
 HEAP32[i6 + 12 >> 2] = i4;
 HEAP32[i6 + 16 >> 2] = i3;
 if ((___syscall_ret(___syscall140(140, i6 | 0) | 0) | 0) < 0) {
  HEAP32[i4 >> 2] = -1;
  i1 = -1;
 } else i1 = HEAP32[i4 >> 2] | 0;
 STACKTOP = i5;
 return i1 | 0;
}

function _puts(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0;
 i4 = HEAP32[1239] | 0;
 if ((HEAP32[i4 + 76 >> 2] | 0) > -1) i5 = ___lockfile(i4) | 0; else i5 = 0;
 do if ((_fputs(i1, i4) | 0) < 0) i1 = 1; else {
  if ((HEAP8[i4 + 75 >> 0] | 0) != 10 ? (i2 = i4 + 20 | 0, i3 = HEAP32[i2 >> 2] | 0, i3 >>> 0 < (HEAP32[i4 + 16 >> 2] | 0) >>> 0) : 0) {
   HEAP32[i2 >> 2] = i3 + 1;
   HEAP8[i3 >> 0] = 10;
   i1 = 0;
   break;
  }
  i1 = (___overflow(i4, 10) | 0) < 0;
 } while (0);
 if (i5 | 0) ___unlockfile(i4);
 return i1 << 31 >> 31 | 0;
}

function _RVA_Create(i1, i4, i3) {
 i1 = i1 | 0;
 i4 = i4 | 0;
 i3 = i3 | 0;
 var i2 = 0, i5 = 0, i6 = 0, i7 = 0;
 i5 = _malloc(16) | 0;
 HEAP32[i5 >> 2] = HEAP32[i3 + 12 >> 2];
 i6 = HEAP32[i3 + 8 >> 2] | 0;
 HEAP32[i5 + 4 >> 2] = i6;
 i7 = _malloc(i6) | 0;
 HEAP32[i5 + 8 >> 2] = i7;
 _memset(i7 | 0, 0, i6 | 0) | 0;
 HEAP32[i5 + 12 >> 2] = HEAP32[i1 >> 2];
 HEAP32[i1 >> 2] = i5;
 i2 = HEAP32[i3 + 20 >> 2] | 0;
 i1 = HEAP32[i3 + 16 >> 2] | 0;
 if (i2 | 0) _memcpy(i7 | 0, i4 + i2 | 0, (i1 >>> 0 > i6 >>> 0 ? i6 : i1) | 0) | 0;
 return i5 | 0;
}

function _connect(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0, i6 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i5 = i4;
 i6 = i4 + 8 | 0;
 HEAP32[i6 >> 2] = i1;
 HEAP32[i6 + 4 >> 2] = i2;
 HEAP32[i6 + 8 >> 2] = i3;
 HEAP32[i6 + 12 >> 2] = 0;
 HEAP32[i6 + 16 >> 2] = 0;
 HEAP32[i6 + 20 >> 2] = 0;
 HEAP32[i5 >> 2] = 3;
 HEAP32[i5 + 4 >> 2] = i6;
 i3 = ___syscall_ret(___syscall102(102, i5 | 0) | 0) | 0;
 STACKTOP = i4;
 return i3 | 0;
}

function _accept(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0, i6 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i5 = i4;
 i6 = i4 + 8 | 0;
 HEAP32[i6 >> 2] = i1;
 HEAP32[i6 + 4 >> 2] = i2;
 HEAP32[i6 + 8 >> 2] = i3;
 HEAP32[i6 + 12 >> 2] = 0;
 HEAP32[i6 + 16 >> 2] = 0;
 HEAP32[i6 + 20 >> 2] = 0;
 HEAP32[i5 >> 2] = 5;
 HEAP32[i5 + 4 >> 2] = i6;
 i3 = ___syscall_ret(___syscall102(102, i5 | 0) | 0) | 0;
 STACKTOP = i4;
 return i3 | 0;
}

function _bind(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0, i6 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i5 = i4;
 i6 = i4 + 8 | 0;
 HEAP32[i6 >> 2] = i1;
 HEAP32[i6 + 4 >> 2] = i2;
 HEAP32[i6 + 8 >> 2] = i3;
 HEAP32[i6 + 12 >> 2] = 0;
 HEAP32[i6 + 16 >> 2] = 0;
 HEAP32[i6 + 20 >> 2] = 0;
 HEAP32[i5 >> 2] = 2;
 HEAP32[i5 + 4 >> 2] = i6;
 i3 = ___syscall_ret(___syscall102(102, i5 | 0) | 0) | 0;
 STACKTOP = i4;
 return i3 | 0;
}

function _SystemArray_StoreElement(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0;
 i4 = HEAP32[(HEAP32[(_Heap_GetType(i1) | 0) + 96 >> 2] | 0) + 64 >> 2] | 0;
 i1 = i1 + 4 | 0;
 switch (i4 | 0) {
 case 1:
  {
   HEAP8[i1 + i2 >> 0] = HEAP8[i3 >> 0] | 0;
   break;
  }
 case 2:
  {
   HEAP16[i1 + (i2 << 1) >> 1] = HEAP16[i3 >> 1] | 0;
   break;
  }
 case 4:
  {
   HEAP32[i1 + (i2 << 2) >> 2] = HEAP32[i3 >> 2];
   break;
  }
 default:
  _memcpy(i1 + (Math_imul(i4, i2) | 0) | 0, i3 | 0, i4 | 0) | 0;
 }
 return;
}

function _SystemArray_LoadElement(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0;
 i4 = HEAP32[(HEAP32[(_Heap_GetType(i1) | 0) + 96 >> 2] | 0) + 64 >> 2] | 0;
 i1 = i1 + 4 | 0;
 switch (i4 | 0) {
 case 1:
  {
   HEAP8[i3 >> 0] = HEAP8[i1 + i2 >> 0] | 0;
   break;
  }
 case 2:
  {
   HEAP16[i3 >> 1] = HEAP16[i1 + (i2 << 1) >> 1] | 0;
   break;
  }
 case 4:
  {
   HEAP32[i3 >> 2] = HEAP32[i1 + (i2 << 2) >> 2];
   break;
  }
 default:
  _memcpy(i3 | 0, i1 + (Math_imul(i4, i2) | 0) | 0, i4 | 0) | 0;
 }
 return;
}

function _listen(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0;
 i3 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i4 = i3;
 i5 = i3 + 8 | 0;
 HEAP32[i5 >> 2] = i1;
 HEAP32[i5 + 4 >> 2] = i2;
 i2 = i5 + 8 | 0;
 HEAP32[i2 >> 2] = 0;
 HEAP32[i2 + 4 >> 2] = 0;
 HEAP32[i2 + 8 >> 2] = 0;
 HEAP32[i2 + 12 >> 2] = 0;
 HEAP32[i4 >> 2] = 4;
 HEAP32[i4 + 4 >> 2] = i5;
 i2 = ___syscall_ret(___syscall102(102, i4 | 0) | 0) | 0;
 STACKTOP = i3;
 return i2 | 0;
}

function ___stdout_write(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i4 = i5;
 HEAP32[i1 + 36 >> 2] = 140;
 if ((HEAP32[i1 >> 2] & 64 | 0) == 0 ? (HEAP32[i4 >> 2] = HEAP32[i1 + 60 >> 2], HEAP32[i4 + 4 >> 2] = 21523, HEAP32[i4 + 8 >> 2] = i5 + 16, ___syscall54(54, i4 | 0) | 0) : 0) HEAP8[i1 + 75 >> 0] = -1;
 i4 = ___stdio_write(i1, i2, i3) | 0;
 STACKTOP = i5;
 return i4 | 0;
}

function _Heap_SetRoots(i1, i5, i6) {
 i1 = i1 | 0;
 i5 = i5 | 0;
 i6 = i6 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i7 = 0;
 i7 = i1 + 4 | 0;
 i2 = HEAP32[i7 >> 2] | 0;
 i3 = HEAP32[i1 >> 2] | 0;
 i4 = i1 + 8 | 0;
 if (i2 >>> 0 < i3 >>> 0) i1 = HEAP32[i4 >> 2] | 0; else {
  HEAP32[i1 >> 2] = i3 << 1;
  i1 = _realloc(HEAP32[i4 >> 2] | 0, i3 << 4) | 0;
  HEAP32[i4 >> 2] = i1;
  i2 = HEAP32[i7 >> 2] | 0;
 }
 HEAP32[i7 >> 2] = i2 + 1;
 HEAP32[i1 + (i2 << 3) >> 2] = i6 >>> 2;
 HEAP32[i1 + (i2 << 3) + 4 >> 2] = i5;
 return;
}

function _msTime() {
 var i1 = 0, i2 = 0, i3 = 0, i4 = 0;
 i1 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i1;
 _gettimeofday(i4 | 0, 0) | 0;
 i3 = HEAP32[i4 >> 2] | 0;
 i3 = ___muldi3(i3 | 0, ((i3 | 0) < 0) << 31 >> 31 | 0, 1e3, 0) | 0;
 i2 = tempRet0;
 i4 = HEAP32[i4 + 4 >> 2] | 0;
 i4 = ___udivdi3(i4 | 0, ((i4 | 0) < 0) << 31 >> 31 | 0, 1e3, 0) | 0;
 i2 = _i64Add(i4 | 0, tempRet0 | 0, i3 | 0, i2 | 0) | 0;
 STACKTOP = i1;
 return i2 | 0;
}

function _FindGenericParam(i1, i4) {
 i1 = i1 | 0;
 i4 = i4 | 0;
 var i2 = 0, i3 = 0, i5 = 0, i6 = 0;
 i5 = i1 + 4 | 0;
 i6 = _MetaData_GetTableRow(HEAP32[i5 >> 2] | 0, 704643073) | 0;
 i5 = HEAP32[(HEAP32[i5 >> 2] | 0) + 188 >> 2] | 0;
 i3 = i1 + 80 | 0;
 i2 = 0;
 i1 = i6;
 while (1) {
  if (i2 >>> 0 >= i5 >>> 0) {
   i1 = 0;
   break;
  }
  if ((HEAP32[i1 + 4 >> 2] | 0) == (HEAP32[i3 >> 2] | 0) ? (HEAPU16[i1 >> 1] | 0 | 0) == (i4 | 0) : 0) break;
  i2 = i2 + 1 | 0;
  i1 = i1 + 12 | 0;
 }
 return i1 | 0;
}

function _System_Array_Resize(i1, i3, i2) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i2 = i2 | 0;
 var i4 = 0, i5 = 0, i6 = 0;
 i4 = HEAP32[i3 >> 2] | 0;
 i1 = HEAP32[i3 + 4 >> 2] | 0;
 i2 = HEAP32[i4 >> 2] | 0;
 i3 = HEAP32[i2 >> 2] | 0;
 if ((i3 | 0) != (i1 | 0)) {
  i5 = _Heap_GetType(i2) | 0;
  i6 = _SystemArray_NewVector(i5, i1) | 0;
  HEAP32[i4 >> 2] = i6;
  _memcpy(i6 + 4 | 0, i2 + 4 | 0, Math_imul(HEAP32[(HEAP32[i5 + 96 >> 2] | 0) + 64 >> 2] | 0, i1 >>> 0 < i3 >>> 0 ? i1 : i3) | 0) | 0;
 }
 return 0;
}

function _lseek(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0, i6 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i6 = i4;
 i5 = i4 + 20 | 0;
 HEAP32[i6 >> 2] = i1;
 HEAP32[i6 + 4 >> 2] = 0;
 HEAP32[i6 + 8 >> 2] = i2;
 HEAP32[i6 + 12 >> 2] = i5;
 HEAP32[i6 + 16 >> 2] = i3;
 i3 = (___syscall_ret(___syscall140(140, i6 | 0) | 0) | 0) != 0;
 STACKTOP = i4;
 return (i3 ? -1 : HEAP32[i5 >> 2] | 0) | 0;
}

function _ConvertStringToANSI(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i5;
 i2 = _SystemString_GetString(i1, i3) | 0;
 i3 = HEAP32[i3 >> 2] | 0;
 i4 = _malloc(i3 + 1 | 0) | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i3 | 0)) break;
  HEAP8[i4 + i1 >> 0] = HEAP16[i2 + (i1 << 1) >> 1];
  i1 = i1 + 1 | 0;
 }
 HEAP8[i4 + i3 >> 0] = 0;
 STACKTOP = i5;
 return i4 | 0;
}

function _LoadFileFromDisk(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = _open(i1, 0, i4) | 0;
 if ((i3 | 0) > -1) {
  i2 = _lseek(i3, 0, 2) | 0;
  _lseek(i3, 0, 0) | 0;
  i1 = _mallocForever(i2) | 0;
  if (i1) {
   if ((_read(i3, i1, i2) | 0) != (i2 | 0)) {
    _free(i1);
    i1 = 0;
   }
  } else i1 = 0;
  _close(i3) | 0;
 } else i1 = 0;
 STACKTOP = i4;
 return i1 | 0;
}

function _opendir(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i4 + 8 | 0;
 i2 = _open(i1, 589824, i4) | 0;
 do if ((i2 | 0) >= 0) {
  i1 = _calloc(1, 2072) | 0;
  if (!i1) {
   HEAP32[i3 >> 2] = i2;
   ___syscall6(6, i3 | 0) | 0;
   i1 = 0;
   break;
  } else {
   HEAP32[i1 >> 2] = i2;
   break;
  }
 } else i1 = 0; while (0);
 STACKTOP = i4;
 return i1 | 0;
}

function _select(i1, i2, i3, i4, i5) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 i5 = i5 | 0;
 var i6 = 0, i7 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 32 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(32);
 i7 = i6;
 HEAP32[i7 >> 2] = i1;
 HEAP32[i7 + 4 >> 2] = i2;
 HEAP32[i7 + 8 >> 2] = i3;
 HEAP32[i7 + 12 >> 2] = i4;
 HEAP32[i7 + 16 >> 2] = i5;
 i5 = ___syscall_ret(___syscall142(142, i7 | 0) | 0) | 0;
 STACKTOP = i6;
 return i5 | 0;
}

function _Translate(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i4 + 8 | 0;
 i2 = i4;
 if (i1 >>> 0 > 511) {
  HEAP32[i2 >> 2] = i1;
  _Crash(14312, i2);
 }
 if (!(HEAP32[28200 + (i1 * 12 | 0) + 4 >> 2] | 0)) {
  HEAP32[i3 >> 2] = i1;
  _Crash(14331, i3);
 } else {
  STACKTOP = i4;
  return HEAP32[28200 + (i1 * 12 | 0) >> 2] | 0;
 }
 return 0;
}

function ___towrite(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i2 = i1 + 74 | 0;
 i3 = HEAP8[i2 >> 0] | 0;
 HEAP8[i2 >> 0] = i3 + 255 | i3;
 i2 = HEAP32[i1 >> 2] | 0;
 if (!(i2 & 8)) {
  HEAP32[i1 + 8 >> 2] = 0;
  HEAP32[i1 + 4 >> 2] = 0;
  i3 = HEAP32[i1 + 44 >> 2] | 0;
  HEAP32[i1 + 28 >> 2] = i3;
  HEAP32[i1 + 20 >> 2] = i3;
  HEAP32[i1 + 16 >> 2] = i3 + (HEAP32[i1 + 48 >> 2] | 0);
  i1 = 0;
 } else {
  HEAP32[i1 >> 2] = i2 | 32;
  i1 = -1;
 }
 return i1 | 0;
}

function _MetaData_GetHeapRoots(i2, i3) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i1 = 0, i4 = 0, i5 = 0, i6 = 0;
 i5 = HEAP32[i3 + 28 >> 2] | 0;
 i1 = 1;
 while (1) {
  if (i1 >>> 0 > i5 >>> 0) break;
  i6 = _MetaData_GetTableRow(i3, i1 & 16777215 | 33554432) | 0;
  if (!(HEAP8[i6 + 57 >> 0] | 0)) {
   i4 = HEAP32[i6 + 108 >> 2] | 0;
   if (i4 | 0) _Heap_SetRoots(i2, HEAP32[i6 + 52 >> 2] | 0, i4);
  } else _Generic_GetHeapRoots(i2, i6);
  i1 = i1 + 1 | 0;
 }
 return;
}

function _Accept_Check(i1, i3, i5, i2) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i5 = i5 | 0;
 i2 = i2 | 0;
 var i4 = 0, i6 = 0;
 i4 = HEAP32[i3 + 4 >> 2] | 0;
 i2 = _accept(HEAP32[i3 >> 2] | 0, 0, 0) | 0;
 if ((i2 | 0) == -1) {
  i1 = HEAP32[(___errno_location() | 0) >> 2] | 0;
  if ((i1 | 0) == 11) i1 = 0; else {
   i2 = 0;
   i6 = 3;
  }
 } else {
  i1 = 0;
  i6 = 3;
 }
 if ((i6 | 0) == 3) {
  HEAP32[i5 >> 2] = i2;
  HEAP32[i4 >> 2] = i1;
  i1 = 1;
 }
 return i1 | 0;
}

function _sbrk(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i3 = i1 + 15 & -16 | 0;
 i2 = HEAP32[DYNAMICTOP_PTR >> 2] | 0;
 i1 = i2 + i3 | 0;
 if ((i3 | 0) > 0 & (i1 | 0) < (i2 | 0) | (i1 | 0) < 0) {
  abortOnCannotGrowMemory() | 0;
  ___setErrNo(12);
  return -1;
 }
 HEAP32[DYNAMICTOP_PTR >> 2] = i1;
 if ((i1 | 0) > (getTotalMemory() | 0) ? (enlargeMemory() | 0) == 0 : 0) {
  ___setErrNo(12);
  HEAP32[DYNAMICTOP_PTR >> 2] = i2;
  return -1;
 }
 return i2 | 0;
}

function _System_IO_FileInternal_Read(i1, i2, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i4 = i4 | 0;
 var i3 = 0, i5 = 0;
 i5 = HEAP32[i2 >> 2] | 0;
 i1 = HEAP32[i2 + 12 >> 2] | 0;
 i3 = HEAP32[i2 + 16 >> 2] | 0;
 i2 = _read(i5, _SystemArray_LoadElementAddress(HEAP32[i2 + 4 >> 2] | 0, HEAP32[i2 + 8 >> 2] | 0) | 0, i1) | 0;
 if ((i2 | 0) < 0) i1 = HEAP32[(___errno_location() | 0) >> 2] | 0; else i1 = 0;
 HEAP32[i3 >> 2] = i1;
 HEAP32[i4 >> 2] = i2;
 return 0;
}

function _GetUnalignedU32(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0;
 i7 = HEAP32[i2 >> 2] | 0;
 i6 = i7 + 1 | 0;
 HEAP32[i2 >> 2] = i6;
 i5 = HEAPU8[i1 + i7 >> 0] | 0;
 i4 = i7 + 2 | 0;
 HEAP32[i2 >> 2] = i4;
 i6 = HEAPU8[i1 + i6 >> 0] | 0;
 i3 = i7 + 3 | 0;
 HEAP32[i2 >> 2] = i3;
 i4 = HEAPU8[i1 + i4 >> 0] | 0;
 HEAP32[i2 >> 2] = i7 + 4;
 return i6 << 8 | i5 | i4 << 16 | (HEAPU8[i1 + i3 >> 0] | 0) << 24 | 0;
}

function _PushU32_(i4, i5) {
 i4 = i4 | 0;
 i5 = i5 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i6 = 0;
 i6 = i4 + 8 | 0;
 i2 = HEAP32[i6 >> 2] | 0;
 i1 = i4 + 4 | 0;
 i3 = HEAP32[i1 >> 2] | 0;
 if (i2 >>> 0 < i3 >>> 0) i1 = HEAP32[i4 >> 2] | 0; else {
  HEAP32[i1 >> 2] = i3 << 1;
  i1 = _realloc(HEAP32[i4 >> 2] | 0, i3 << 3) | 0;
  HEAP32[i4 >> 2] = i1;
  i2 = HEAP32[i6 >> 2] | 0;
 }
 HEAP32[i6 >> 2] = i2 + 1;
 HEAP32[i1 + (i2 << 2) >> 2] = i5;
 return;
}

function _microTime() {
 var i1 = 0, i2 = 0, i3 = 0;
 i1 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i2 = i1;
 _gettimeofday(i2 | 0, 0) | 0;
 i3 = HEAP32[i2 >> 2] | 0;
 i3 = ___muldi3(i3 | 0, ((i3 | 0) < 0) << 31 >> 31 | 0, 1e6, 0) | 0;
 i2 = HEAP32[i2 + 4 >> 2] | 0;
 i2 = _i64Add(i3 | 0, tempRet0 | 0, i2 | 0, ((i2 | 0) < 0) << 31 >> 31 | 0) | 0;
 STACKTOP = i1;
 return i2 | 0;
}

function ___sin(d1, d2, i5) {
 d1 = +d1;
 d2 = +d2;
 i5 = i5 | 0;
 var d3 = 0.0, d4 = 0.0, d6 = 0.0;
 d6 = d1 * d1;
 d3 = d6 * (d6 * d6) * (d6 * 1.58969099521155e-10 + -2.5050760253406863e-08) + (d6 * (d6 * 2.7557313707070068e-06 + -1.984126982985795e-04) + .00833333333332249);
 d4 = d6 * d1;
 if (!i5) d1 = d4 * (d6 * d3 + -.16666666666666632) + d1; else d1 = d1 - (d4 * .16666666666666632 + (d6 * (d2 * .5 - d4 * d3) - d2));
 return +d1;
}

function _strcmp(i2, i3) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i1 = 0, i4 = 0;
 i1 = HEAP8[i2 >> 0] | 0;
 i4 = HEAP8[i3 >> 0] | 0;
 if (i1 << 24 >> 24 == 0 ? 1 : i1 << 24 >> 24 != i4 << 24 >> 24) i2 = i4; else {
  do {
   i2 = i2 + 1 | 0;
   i3 = i3 + 1 | 0;
   i1 = HEAP8[i2 >> 0] | 0;
   i4 = HEAP8[i3 >> 0] | 0;
  } while (!(i1 << 24 >> 24 == 0 ? 1 : i1 << 24 >> 24 != i4 << 24 >> 24));
  i2 = i4;
 }
 return (i1 & 255) - (i2 & 255) | 0;
}

function _System_String_InternalConcat(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0;
 i4 = HEAP32[i2 >> 2] | 0;
 i1 = HEAP32[i2 + 4 >> 2] | 0;
 i2 = _CreateStringHeapObj((HEAP32[i1 >> 2] | 0) + (HEAP32[i4 >> 2] | 0) | 0) | 0;
 _memcpy(i2 + 4 | 0, i4 + 4 | 0, HEAP32[i4 >> 2] << 1 | 0) | 0;
 _memcpy(i2 + 4 + (HEAP32[i4 >> 2] << 1) | 0, i1 + 4 | 0, HEAP32[i1 >> 2] << 1 | 0) | 0;
 HEAP32[i3 >> 2] = i2;
 return 0;
}

function _memcmp(i1, i3, i2) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i2 = i2 | 0;
 var i4 = 0, i5 = 0;
 L1 : do if (!i2) i1 = 0; else {
  while (1) {
   i4 = HEAP8[i1 >> 0] | 0;
   i5 = HEAP8[i3 >> 0] | 0;
   if (i4 << 24 >> 24 != i5 << 24 >> 24) break;
   i2 = i2 + -1 | 0;
   if (!i2) {
    i1 = 0;
    break L1;
   } else {
    i1 = i1 + 1 | 0;
    i3 = i3 + 1 | 0;
   }
  }
  i1 = (i4 & 255) - (i5 & 255) | 0;
 } while (0);
 return i1 | 0;
}

function _globfree(i4) {
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i3 = 0, i5 = 0;
 i5 = i4 + 4 | 0;
 i1 = HEAP32[i5 >> 2] | 0;
 if (HEAP32[i4 >> 2] | 0) {
  i3 = i4 + 8 | 0;
  i2 = 0;
  do {
   _free((HEAP32[i1 + ((HEAP32[i3 >> 2] | 0) + i2 << 2) >> 2] | 0) + -4 | 0);
   i2 = i2 + 1 | 0;
   i1 = HEAP32[i5 >> 2] | 0;
  } while (i2 >>> 0 < (HEAP32[i4 >> 2] | 0) >>> 0);
 }
 _free(i1);
 HEAP32[i4 >> 2] = 0;
 HEAP32[i5 >> 2] = 0;
 return;
}

function _ConvertStringToUnicode(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0;
 i2 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i2;
 i5 = _SystemString_GetString(i1, i3) | 0;
 i3 = HEAP32[i3 >> 2] | 0;
 i4 = i3 << 1;
 i1 = _malloc(i4 + 2 | 0) | 0;
 _memcpy(i1 | 0, i5 | 0, i4 | 0) | 0;
 HEAP16[i1 + (i3 << 1) >> 1] = 0;
 STACKTOP = i2;
 return i1 | 0;
}

function _fwrite(i2, i4, i1, i3) {
 i2 = i2 | 0;
 i4 = i4 | 0;
 i1 = i1 | 0;
 i3 = i3 | 0;
 var i5 = 0, i6 = 0;
 i5 = Math_imul(i1, i4) | 0;
 i1 = (i4 | 0) == 0 ? 0 : i1;
 if ((HEAP32[i3 + 76 >> 2] | 0) > -1) {
  i6 = (___lockfile(i3) | 0) == 0;
  i2 = ___fwritex(i2, i5, i3) | 0;
  if (!i6) ___unlockfile(i3);
 } else i2 = ___fwritex(i2, i5, i3) | 0;
 if ((i2 | 0) != (i5 | 0)) i1 = (i2 >>> 0) / (i4 >>> 0) | 0;
 return i1 | 0;
}

function _Heap_SyncTryEnter(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0, i5 = 0;
 i3 = _Thread_GetCurrent() | 0;
 i1 = _EnsureSync(i1 + -20 | 0) | 0;
 i2 = HEAP32[i1 >> 2] | 0;
 i4 = i1 + 4 | 0;
 if (i2) if ((i2 | 0) == (i3 | 0)) {
  i1 = (HEAP32[i4 >> 2] | 0) + 1 | 0;
  i5 = 5;
 } else i1 = 0; else {
  HEAP32[i1 >> 2] = i3;
  i1 = 1;
  i5 = 5;
 }
 if ((i5 | 0) == 5) {
  HEAP32[i4 >> 2] = i1;
  i1 = 1;
 }
 return i1 | 0;
}

function _Thread_StackAlloc(i1, i3) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 var i2 = 0, i4 = 0, i5 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i1 = HEAP32[i1 + 52 >> 2] | 0;
 i5 = i1 + 1e4 | 0;
 i2 = HEAP32[i5 >> 2] | 0;
 i3 = i2 + i3 | 0;
 HEAP32[i5 >> 2] = i3;
 if (i3 >>> 0 > 1e4) _Crash(18436, i4); else {
  STACKTOP = i4;
  return i1 + i2 | 0;
 }
 return 0;
}

function _MetaData_GetUserString(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i5;
 HEAP32[i4 >> 2] = (HEAP32[i1 + 8 >> 2] | 0) + (i2 & 16777215);
 i1 = _MetaData_DecodeHeapEntryLength(i4) | 0;
 if (i3 | 0) HEAP32[i3 >> 2] = i1 + -1;
 STACKTOP = i5;
 return HEAP32[i4 >> 2] | 0;
}

function _RVA_FindData(i1, i3) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 var i2 = 0;
 L1 : do if (!i3) i1 = 0; else {
  while (1) {
   i1 = HEAP32[i1 >> 2] | 0;
   if (!i1) {
    i1 = 0;
    break L1;
   }
   i2 = HEAP32[i1 >> 2] | 0;
   if (i2 >>> 0 <= i3 >>> 0 ? ((HEAP32[i1 + 4 >> 2] | 0) + i2 | 0) >>> 0 > i3 >>> 0 : 0) break;
   i1 = i1 + 12 | 0;
  }
  i1 = (HEAP32[i1 + 8 >> 2] | 0) + (i3 - i2) | 0;
 } while (0);
 return i1 | 0;
}

function _append(i3, i4, i1, i5) {
 i3 = i3 | 0;
 i4 = i4 | 0;
 i1 = i1 | 0;
 i5 = i5 | 0;
 var i2 = 0;
 i1 = _malloc(i1 + 9 | 0) | 0;
 if (!i1) i1 = -1; else {
  HEAP32[HEAP32[i3 >> 2] >> 2] = i1;
  HEAP32[i1 >> 2] = 0;
  i2 = i1 + 4 | 0;
  _strcpy(i2, i4) | 0;
  if (i5 | 0) {
   i5 = i2 + (_strlen(i2) | 0) | 0;
   HEAP8[i5 >> 0] = 47;
   HEAP8[i5 + 1 >> 0] = 0;
  }
  HEAP32[i3 >> 2] = i1;
  i1 = 0;
 }
 return i1 | 0;
}

function _System_String_Equals(i1, i2, i5) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i5 = i5 | 0;
 var i3 = 0, i4 = 0;
 i3 = HEAP32[i2 >> 2] | 0;
 i1 = HEAP32[i2 + 4 >> 2] | 0;
 if ((i3 | 0) != (i1 | 0)) if (!((i3 | 0) == 0 | (i1 | 0) == 0) ? (i4 = HEAP32[i3 >> 2] | 0, (i4 | 0) == (HEAP32[i1 >> 2] | 0)) : 0) i1 = (_memcmp(i3 + 4 | 0, i1 + 4 | 0, i4 << 1) | 0) == 0 & 1; else i1 = 0; else i1 = 1;
 HEAP32[i5 >> 2] = i1;
 return 0;
}

function _System_IO_FileInternal_GetCurrentDirectory(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i1 = STACKTOP;
 STACKTOP = STACKTOP + 256 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(256);
 i5 = i1;
 i4 = HEAP32[i2 >> 2] | 0;
 _getcwd(i5, 256) | 0;
 i2 = _SystemString_FromCharPtrASCII(i5) | 0;
 HEAP32[i4 >> 2] = 0;
 HEAP32[i3 >> 2] = i2;
 STACKTOP = i1;
 return 0;
}

function _TreeSplit(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0;
 i2 = i1 + 4 | 0;
 i3 = HEAP32[i2 >> 2] | 0;
 i4 = HEAP8[i1 + 8 >> 0] | 0;
 if (!(i4 << 24 >> 24 == 0 ? 1 : (HEAP8[(HEAP32[i3 + 4 >> 2] | 0) + 8 >> 0] | 0) != i4 << 24 >> 24)) {
  HEAP32[i2 >> 2] = HEAP32[i3 >> 2];
  HEAP32[i3 >> 2] = i1;
  i1 = i3 + 8 | 0;
  HEAP8[i1 >> 0] = (HEAP8[i1 >> 0] | 0) + 1 << 24 >> 24;
  i1 = i3;
 }
 return i1 | 0;
}
function _SystemString_FromUserStrings(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0;
 i3 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i3;
 i1 = _MetaData_GetUserString(i1, i2, i4) | 0;
 i2 = _CreateStringHeapObj((HEAP32[i4 >> 2] | 0) >>> 1) | 0;
 _memcpy(i2 + 4 | 0, i1 | 0, HEAP32[i4 >> 2] | 0) | 0;
 STACKTOP = i3;
 return i2 | 0;
}

function _GetSize(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i3 = HEAP32[i1 + 12 >> 2] | 0;
 i2 = i1 + 20 | 0;
 do if ((i3 | 0) != (HEAP32[(HEAP32[8595] | 0) + 36 >> 2] | 0)) {
  i1 = HEAP32[i3 + 96 >> 2] | 0;
  if (!i1) {
   i1 = HEAP32[i3 + 36 >> 2] | 0;
   break;
  } else {
   i1 = _SystemArray_GetNumBytes(i2, i1) | 0;
   break;
  }
 } else i1 = _SystemString_GetNumBytes(i2) | 0; while (0);
 return i1 | 0;
}

function _Attrs(i1, i3) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 var i2 = 0, i4 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 80 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(80);
 i2 = i4;
 if (!(_stat(i1, i2) | 0)) {
  i1 = (HEAP32[i2 + 12 >> 2] | 0) >>> 10 & 16;
  i2 = 0;
 } else {
  i1 = -1;
  i2 = HEAP32[(___errno_location() | 0) >> 2] | 0;
 }
 HEAP32[i3 >> 2] = i2;
 STACKTOP = i4;
 return i1 | 0;
}

function ___muldsi3(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0, i5 = 0, i6 = 0;
 i6 = i1 & 65535;
 i5 = i2 & 65535;
 i3 = Math_imul(i5, i6) | 0;
 i4 = i1 >>> 16;
 i1 = (i3 >>> 16) + (Math_imul(i5, i4) | 0) | 0;
 i5 = i2 >>> 16;
 i2 = Math_imul(i5, i6) | 0;
 return (tempRet0 = (i1 >>> 16) + (Math_imul(i5, i4) | 0) + (((i1 & 65535) + i2 | 0) >>> 16) | 0, i1 + i2 << 16 | i3 & 65535 | 0) | 0;
}

function ___cos(d1, d2) {
 d1 = +d1;
 d2 = +d2;
 var d3 = 0.0, d4 = 0.0, d5 = 0.0, d6 = 0.0;
 d3 = d1 * d1;
 d4 = d3 * d3;
 d5 = d3 * .5;
 d6 = 1.0 - d5;
 return +(d6 + (1.0 - d6 - d5 + (d3 * (d3 * (d3 * (d3 * 2.480158728947673e-05 + -.001388888888887411) + .0416666666666666) + d4 * d4 * (d3 * (2.087572321298175e-09 - d3 * 1.1359647557788195e-11) + -2.7557314351390663e-07)) - d1 * d2)));
}

function _shl(i4, i1) {
 i4 = i4 | 0;
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i5 = 0;
 i5 = i4 + 4 | 0;
 if (i1 >>> 0 > 31) {
  i3 = HEAP32[i4 >> 2] | 0;
  HEAP32[i5 >> 2] = i3;
  HEAP32[i4 >> 2] = 0;
  i1 = i1 + -32 | 0;
  i2 = 0;
 } else {
  i2 = HEAP32[i4 >> 2] | 0;
  i3 = HEAP32[i5 >> 2] | 0;
 }
 HEAP32[i5 >> 2] = i2 >>> (32 - i1 | 0) | i3 << i1;
 HEAP32[i4 >> 2] = i2 << i1;
 return;
}

function _Heap_SyncExit(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i2 = i1 + -20 | 0;
 i3 = _Thread_GetCurrent() | 0;
 i1 = HEAP32[i1 + -4 >> 2] | 0;
 if ((i1 | 0) != 0 ? (HEAP32[i1 >> 2] | 0) == (i3 | 0) : 0) {
  i1 = i1 + 4 | 0;
  i3 = (HEAP32[i1 >> 2] | 0) + -1 | 0;
  HEAP32[i1 >> 2] = i3;
  if (!i3) {
   _DeleteSync(i2);
   i1 = 1;
  } else i1 = 1;
 } else i1 = 0;
 return i1 | 0;
}

function _System_Console_Internal_KeyAvailable(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i2 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i1 = i2;
 if (!(_Internal_ReadKey_Check(0, 0, i1, 0) | 0)) i1 = 0; else {
  HEAP32[909] = HEAP32[i1 >> 2];
  i1 = 1;
 }
 HEAP32[i3 >> 2] = i1;
 STACKTOP = i2;
 return 0;
}

function _AddFinalizer(i4) {
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i3 = 0;
 i2 = HEAP32[7043] | 0;
 i1 = HEAP32[7041] | 0;
 if ((i2 | 0) < (i1 | 0)) {
  i3 = HEAP32[7042] | 0;
  i1 = i2;
 } else {
  HEAP32[7041] = i1 << 1;
  i3 = _realloc(HEAP32[7042] | 0, i1 << 3) | 0;
  HEAP32[7042] = i3;
  i1 = HEAP32[7043] | 0;
 }
 HEAP32[7043] = i1 + 1;
 HEAP32[i3 + (i1 << 2) >> 2] = i4;
 return;
}

function _memmove(i1, i4, i2) {
 i1 = i1 | 0;
 i4 = i4 | 0;
 i2 = i2 | 0;
 var i3 = 0;
 if ((i4 | 0) < (i1 | 0) & (i1 | 0) < (i4 + i2 | 0)) {
  i3 = i1;
  i4 = i4 + i2 | 0;
  i1 = i1 + i2 | 0;
  while ((i2 | 0) > 0) {
   i1 = i1 - 1 | 0;
   i4 = i4 - 1 | 0;
   i2 = i2 - 1 | 0;
   HEAP8[i1 >> 0] = HEAP8[i4 >> 0] | 0;
  }
  i1 = i3;
 } else _memcpy(i1, i4, i2) | 0;
 return i1 | 0;
}

function _shr(i4, i1) {
 i4 = i4 | 0;
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i5 = 0;
 i5 = i4 + 4 | 0;
 if (i1 >>> 0 > 31) {
  i3 = HEAP32[i5 >> 2] | 0;
  HEAP32[i4 >> 2] = i3;
  HEAP32[i5 >> 2] = 0;
  i1 = i1 + -32 | 0;
  i2 = 0;
 } else {
  i2 = HEAP32[i5 >> 2] | 0;
  i3 = HEAP32[i4 >> 2] | 0;
 }
 HEAP32[i4 >> 2] = i2 << 32 - i1 | i3 >>> i1;
 HEAP32[i5 >> 2] = i2 >>> i1;
 return;
}

function _System_Type_EnsureAssemblyLoaded(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0;
 i1 = STACKTOP;
 STACKTOP = STACKTOP + 256 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(256);
 i4 = i1;
 _DotNetStringToCString(i4, 256, HEAP32[i2 >> 2] | 0);
 _CLIFile_GetMetaDataForAssembly(i4) | 0;
 HEAP32[i3 >> 2] = 0;
 STACKTOP = i1;
 return 0;
}

function _SystemWeakReference_TargetGone(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 var i3 = 0, i4 = 0;
 i4 = (i1 | 0) == 0;
 L1 : while (1) {
  i1 = i2;
  while (1) {
   i3 = HEAP32[i1 >> 2] | 0;
   if (!i3) break L1;
   i1 = i3 + 8 | 0;
   if (i4 ? HEAP32[i3 + 4 >> 2] | 0 : 0) break;
   HEAP32[i3 >> 2] = 0;
  }
  HEAP32[i2 >> 2] = i3;
  i2 = i1;
 }
 HEAP32[i2 >> 2] = 0;
 return;
}

function _read(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i4;
 HEAP32[i5 >> 2] = i1;
 HEAP32[i5 + 4 >> 2] = i2;
 HEAP32[i5 + 8 >> 2] = i3;
 i3 = ___syscall_ret(___syscall3(3, i5 | 0) | 0) | 0;
 STACKTOP = i4;
 return i3 | 0;
}

function _DeepCopyTypeStack(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0;
 i2 = _malloc(12) | 0;
 HEAP32[i2 + 8 >> 2] = HEAP32[i1 + 8 >> 2];
 i3 = HEAP32[i1 + 4 >> 2] | 0;
 HEAP32[i2 + 4 >> 2] = i3;
 if (!i3) HEAP32[i2 >> 2] = 0; else {
  i3 = i3 << 2;
  i4 = _malloc(i3) | 0;
  HEAP32[i2 >> 2] = i4;
  _memcpy(i4 | 0, HEAP32[i1 >> 2] | 0, i3 | 0) | 0;
 }
 return i2 | 0;
}

function _MetaData_LoadGUIDs(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i4;
 i3 = i3 >>> 4;
 HEAP32[i1 + 12 >> 2] = i3;
 HEAP32[i1 + 16 >> 2] = i2;
 HEAP32[i5 >> 2] = i3;
 _log_f(1, 14511, i5);
 STACKTOP = i4;
 return;
}

function _System_String_ctor_CharInt32(i1, i2, i5) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i5 = i5 | 0;
 var i3 = 0, i4 = 0;
 i4 = HEAP32[i2 >> 2] & 65535;
 i2 = HEAP32[i2 + 4 >> 2] | 0;
 i3 = _CreateStringHeapObj(i2) | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == (i2 | 0)) break;
  HEAP16[i3 + 4 + (i1 << 1) >> 1] = i4;
  i1 = i1 + 1 | 0;
 }
 HEAP32[i5 >> 2] = i3;
 return 0;
}

function _System_Net_Sockets_Internal_Receive(i2, i3, i4) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i1 = 0, i5 = 0;
 i1 = _malloc(24) | 0;
 i5 = _malloc(4) | 0;
 HEAP32[i1 >> 2] = -1;
 HEAP32[i1 + 4 >> 2] = 45;
 HEAP32[i1 + 8 >> 2] = i5;
 HEAP32[i5 >> 2] = 0;
 if (_Receive_Check(i2, i3, i4, i1) | 0) {
  _free(i5);
  _free(i1);
  i1 = 0;
 }
 return i1 | 0;
}

function _wctype(i3) {
 i3 = i3 | 0;
 var i1 = 0, i2 = 0, i4 = 0, i5 = 0;
 i4 = HEAP8[i3 >> 0] | 0;
 i1 = 1;
 i2 = 28079;
 i5 = 97;
 while (1) {
  if (i4 << 24 >> 24 == i5 << 24 >> 24 ? (_strcmp(i3, i2) | 0) == 0 : 0) break;
  i2 = i2 + 6 | 0;
  i5 = HEAP8[i2 >> 0] | 0;
  if (!(i5 << 24 >> 24)) {
   i1 = 0;
   break;
  } else i1 = i1 + 1 | 0;
 }
 return i1 | 0;
}

function _calloc(i2, i3) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i1 = 0;
 if (i2) {
  i1 = Math_imul(i3, i2) | 0;
  if ((i3 | i2) >>> 0 > 65535) i1 = ((i1 >>> 0) / (i2 >>> 0) | 0 | 0) == (i3 | 0) ? i1 : -1;
 } else i1 = 0;
 i2 = _malloc(i1) | 0;
 if (!i2) return i2 | 0;
 if (!(HEAP32[i2 + -4 >> 2] & 3)) return i2 | 0;
 _memset(i2 | 0, 0, i1 | 0) | 0;
 return i2 | 0;
}

function _Type_IsImplemented(i3, i1) {
 i3 = i3 | 0;
 i1 = i1 | 0;
 var i2 = 0, i4 = 0;
 i4 = i1 + 76 | 0;
 i2 = HEAP32[i1 + 72 >> 2] | 0;
 i1 = 0;
 while (1) {
  if (i1 >>> 0 >= i2 >>> 0) {
   i1 = 0;
   break;
  }
  if ((HEAP32[(HEAP32[i4 >> 2] | 0) + (i1 * 12 | 0) >> 2] | 0) == (i3 | 0)) {
   i1 = 1;
   break;
  } else i1 = i1 + 1 | 0;
 }
 return i1 | 0;
}

function _MetaData_GetBlob(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i4;
 HEAP32[i3 >> 2] = i1;
 i1 = _MetaData_DecodeHeapEntryLength(i3) | 0;
 if (i2 | 0) HEAP32[i2 >> 2] = i1;
 STACKTOP = i4;
 return HEAP32[i3 >> 2] | 0;
}

function _System_Array_Clear(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0;
 i1 = HEAP32[i2 >> 2] | 0;
 i4 = HEAP32[i2 + 4 >> 2] | 0;
 i3 = HEAP32[i2 + 8 >> 2] | 0;
 i2 = HEAP32[(HEAP32[(_Heap_GetType(i1) | 0) + 96 >> 2] | 0) + 64 >> 2] | 0;
 _memset((Math_imul(i2, i4) | 0) + (i1 + 4) | 0, 0, Math_imul(i2, i3) | 0) | 0;
 return 0;
}

function _mallocForever(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0, i4 = 0;
 i2 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i2;
 i4 = (HEAP32[8590] | 0) + i1 | 0;
 HEAP32[8590] = i4;
 HEAP32[i3 >> 2] = i4;
 _log_f(3, 16449, i3);
 i1 = _malloc(i1) | 0;
 STACKTOP = i2;
 return i1 | 0;
}

function _System_Net_Sockets_Internal_Send(i1, i3, i4) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i2 = 0;
 i1 = _malloc(24) | 0;
 i2 = _malloc(4) | 0;
 HEAP32[i1 >> 2] = -1;
 HEAP32[i1 + 4 >> 2] = 45;
 HEAP32[i1 + 8 >> 2] = i2;
 HEAP32[i2 >> 2] = 0;
 if (_Send_Check(i3, i4, i1) | 0) {
  _free(i2);
  _free(i1);
  i1 = 0;
 }
 return i1 | 0;
}

function _getint(i4) {
 i4 = i4 | 0;
 var i1 = 0, i2 = 0, i3 = 0;
 i2 = HEAP32[i4 >> 2] | 0;
 i3 = (HEAP8[i2 >> 0] | 0) + -48 | 0;
 if (i3 >>> 0 < 10) {
  i1 = 0;
  do {
   i1 = i3 + (i1 * 10 | 0) | 0;
   i2 = i2 + 1 | 0;
   HEAP32[i4 >> 2] = i2;
   i3 = (HEAP8[i2 >> 0] | 0) + -48 | 0;
  } while (i3 >>> 0 < 10);
 } else i1 = 0;
 return i1 | 0;
}

function _System_String_ctor_CharAIntInt(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i4 = HEAP32[i2 + 4 >> 2] | 0;
 i1 = HEAP32[i2 + 8 >> 2] | 0;
 i5 = (HEAP32[i2 >> 2] | 0) + 4 | 0;
 i2 = _CreateStringHeapObj(i1) | 0;
 _memcpy(i2 + 4 | 0, i5 + (i4 << 1) | 0, i1 << 1 | 0) | 0;
 HEAP32[i3 >> 2] = i2;
 return 0;
}

function _System_String_ctor_StringIntInt(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i5 = HEAP32[i2 >> 2] | 0;
 i4 = HEAP32[i2 + 4 >> 2] | 0;
 i1 = HEAP32[i2 + 8 >> 2] | 0;
 i2 = _CreateStringHeapObj(i1) | 0;
 _memcpy(i2 + 4 | 0, i5 + 4 + (i4 << 1) | 0, i1 << 1 | 0) | 0;
 HEAP32[i3 >> 2] = i2;
 return 0;
}

function _fmt_x(i3, i2, i1, i4) {
 i3 = i3 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 i4 = i4 | 0;
 if (!((i3 | 0) == 0 & (i2 | 0) == 0)) do {
  i1 = i1 + -1 | 0;
  HEAP8[i1 >> 0] = HEAPU8[20027 + (i3 & 15) >> 0] | 0 | i4;
  i3 = _bitshift64Lshr(i3 | 0, i2 | 0, 4) | 0;
  i2 = tempRet0;
 } while (!((i3 | 0) == 0 & (i2 | 0) == 0));
 return i1 | 0;
}

function _CreateParameters(i2, i3, i4, i1) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 i1 = i1 | 0;
 var i5 = 0;
 if (!i1) i1 = 0; else {
  HEAP32[i2 >> 2] = i1;
  i1 = 4;
 }
 i3 = (HEAP32[i3 + 40 >> 2] | 0) - i1 | 0;
 i5 = (HEAP32[i4 >> 2] | 0) + (0 - i3) | 0;
 HEAP32[i4 >> 2] = i5;
 _memcpy(i2 + i1 | 0, i5 | 0, i3 | 0) | 0;
 return;
}

function _stat(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0;
 i3 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i3;
 HEAP32[i4 >> 2] = i1;
 HEAP32[i4 + 4 >> 2] = i2;
 i2 = ___syscall_ret(___syscall195(195, i4 | 0) | 0) | 0;
 STACKTOP = i3;
 return i2 | 0;
}

function _log_f(i1, i2, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i4 = i4 | 0;
 var i3 = 0, i5 = 0;
 i5 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i5;
 if ((HEAP32[8589] | 0) >>> 0 >= i1 >>> 0) {
  HEAP32[i3 >> 2] = i4;
  _vprintf(i2, i3) | 0;
 }
 STACKTOP = i5;
 return;
}

function _close(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i2 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i2;
 HEAP32[i3 >> 2] = _dummy_738(i1) | 0;
 i1 = ___syscall6(6, i3 | 0) | 0;
 i1 = ___syscall_ret((i1 | 0) == -4 ? 0 : i1) | 0;
 STACKTOP = i2;
 return i1 | 0;
}

function _RunFinalizer(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i2 = _GetNextFinalizer() | 0;
 if (!i2) i1 = 0; else {
  i3 = HEAP32[(_Heap_GetType(i2) | 0) + 124 >> 2] | 0;
  i1 = _MethodState_Direct(i1, i3, HEAP32[i1 + 20 >> 2] | 0, 0) | 0;
  HEAP32[i1 + 32 >> 2] = i2;
  HEAP32[HEAP32[i1 + 24 >> 2] >> 2] = i2;
 }
 return i1 | 0;
}

function ___stdio_close(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i2 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i2;
 HEAP32[i3 >> 2] = _dummy_738(HEAP32[i1 + 60 >> 2] | 0) | 0;
 i1 = ___syscall_ret(___syscall6(6, i3 | 0) | 0) | 0;
 STACKTOP = i2;
 return i1 | 0;
}

function _sleep(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i2 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i3 = i2;
 HEAP32[i3 >> 2] = i1;
 HEAP32[i3 + 4 >> 2] = 0;
 i1 = (_nanosleep(i3 | 0, i3 | 0) | 0) == 0;
 STACKTOP = i2;
 return (i1 ? 0 : HEAP32[i3 >> 2] | 0) | 0;
}

function _System_Runtime_CompilerServices_InitializeArray(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i3 = HEAP32[i2 >> 2] | 0;
 i1 = HEAP32[i2 + 4 >> 2] | 0;
 i2 = _Heap_GetType(i3) | 0;
 _memcpy(i3 + 4 | 0, i1 | 0, Math_imul(HEAP32[(HEAP32[i2 + 96 >> 2] | 0) + 64 >> 2] | 0, HEAP32[i3 >> 2] | 0) | 0) | 0;
 return 0;
}

function _System_Threading_Interlocked_CompareExchange_Int32(i1, i3, i4) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i2 = 0;
 i1 = HEAP32[i3 >> 2] | 0;
 i2 = HEAP32[i3 + 4 >> 2] | 0;
 i3 = HEAP32[i3 + 8 >> 2] | 0;
 HEAP32[i4 >> 2] = HEAP32[i1 >> 2];
 if ((HEAP32[i1 >> 2] | 0) == (i3 | 0)) HEAP32[i1 >> 2] = i2;
 return 0;
}

function _Generic_GetHeapRoots(i4, i1) {
 i4 = i4 | 0;
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i1 = i1 + 84 | 0;
 while (1) {
  i1 = HEAP32[i1 >> 2] | 0;
  if (!i1) break;
  i2 = HEAP32[i1 >> 2] | 0;
  i3 = HEAP32[i2 + 108 >> 2] | 0;
  if (i3 | 0) _Heap_SetRoots(i4, HEAP32[i2 + 52 >> 2] | 0, i3);
  i1 = i1 + 4 | 0;
 }
 return;
}

function _sn_write(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i4 = i1 + 20 | 0;
 i5 = HEAP32[i4 >> 2] | 0;
 i1 = (HEAP32[i1 + 16 >> 2] | 0) - i5 | 0;
 i1 = i1 >>> 0 > i3 >>> 0 ? i3 : i1;
 _memcpy(i5 | 0, i2 | 0, i1 | 0) | 0;
 HEAP32[i4 >> 2] = (HEAP32[i4 >> 2] | 0) + i1;
 return i3 | 0;
}

function _RestoreTypeStack(i3, i1) {
 i3 = i3 | 0;
 i1 = i1 | 0;
 var i2 = 0, i4 = 0;
 i2 = i3 + 4 | 0;
 if (i1) {
  i4 = i1 + 4 | 0;
  HEAP32[i2 >> 2] = HEAP32[i4 >> 2];
  i1 = HEAP32[i1 >> 2] | 0;
  if (i1 | 0) _memcpy(HEAP32[i3 >> 2] | 0, i1 | 0, HEAP32[i4 >> 2] << 2 | 0) | 0;
 } else HEAP32[i2 >> 2] = 0;
 return;
}

function _wcschr(i1, i3) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 var i2 = 0, i4 = 0;
 if (!i3) i1 = i1 + ((_wcslen(i1) | 0) << 2) | 0; else {
  while (1) {
   i4 = HEAP32[i1 >> 2] | 0;
   i2 = (i4 | 0) != 0;
   if ((i4 | 0) == (i3 | 0) | i2 ^ 1) break; else i1 = i1 + 4 | 0;
  }
  i1 = i2 ? i1 : 0;
 }
 return i1 | 0;
}

function _TreeSkew(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i2 = HEAP32[i1 >> 2] | 0;
 i3 = HEAP8[i1 + 8 >> 0] | 0;
 if (!(i3 << 24 >> 24 == 0 ? 1 : (HEAP8[i2 + 8 >> 0] | 0) != i3 << 24 >> 24)) {
  i3 = i2 + 4 | 0;
  HEAP32[i1 >> 2] = HEAP32[i3 >> 2];
  HEAP32[i3 >> 2] = i1;
  i1 = i2;
 }
 return i1 | 0;
}

function _Heap_Init() {
 var i1 = 0, i2 = 0;
 HEAP32[7044] = 0;
 HEAP32[7045] = 5e4;
 i1 = _mallocForever(20) | 0;
 HEAP32[7046] = i1;
 i2 = i1 + 8 | 0;
 HEAP32[i2 >> 2] = 0;
 HEAP32[i2 + 4 >> 2] = 0;
 HEAP32[i2 + 8 >> 2] = 0;
 HEAP32[i1 + 4 >> 2] = i1;
 HEAP32[i1 >> 2] = i1;
 HEAP32[7047] = i1;
 return;
}

function _SystemString_FromCharPtrASCII(i2) {
 i2 = i2 | 0;
 var i1 = 0, i3 = 0, i4 = 0;
 i3 = _strlen(i2) | 0;
 i4 = _CreateStringHeapObj(i3) | 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) >= (i3 | 0)) break;
  HEAP16[i4 + 4 + (i1 << 1) >> 1] = HEAPU8[i2 + i1 >> 0] | 0;
  i1 = i1 + 1 | 0;
 }
 return i4 | 0;
}

function _sprintf(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 var i4 = 0, i5 = 0;
 i4 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i5 = i4;
 HEAP32[i5 >> 2] = i3;
 i3 = _vsprintf(i1, i2, i5) | 0;
 STACKTOP = i4;
 return i3 | 0;
}

function ___uremdi3(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i5 = 0, i6 = 0;
 i6 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 i5 = i6 | 0;
 ___udivmoddi4(i1, i2, i3, i4, i5) | 0;
 STACKTOP = i6;
 return (tempRet0 = HEAP32[i5 + 4 >> 2] | 0, HEAP32[i5 >> 2] | 0) | 0;
}

function _Type_IsDerivedFromOrSame(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 while (1) {
  if (!i1) {
   i1 = 0;
   break;
  }
  if ((i1 | 0) == (i2 | 0)) {
   i1 = 1;
   break;
  }
  if (!(HEAP8[i1 + 32 >> 0] | 0)) _MetaData_Fill_TypeDef_(i1, 0, 0);
  i1 = HEAP32[i1 + 40 >> 2] | 0;
 }
 return i1 | 0;
}

function _printf(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0;
 i3 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 i4 = i3;
 HEAP32[i4 >> 2] = i2;
 i2 = _vfprintf(HEAP32[1239] | 0, i1, i4) | 0;
 STACKTOP = i3;
 return i2 | 0;
}

function _System_Threading_Monitor_Internal_TryEnter(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 if (!(_Internal_TryEntry_Check(i1, i2, i3, 0) | 0)) {
  i1 = _malloc(24) | 0;
  HEAP32[i1 >> 2] = -1;
  HEAP32[i1 + 4 >> 2] = 46;
  HEAP32[i1 + 8 >> 2] = 0;
 } else i1 = 0;
 return i1 | 0;
}

function _iswprint(i1) {
 i1 = i1 | 0;
 if (i1 >>> 0 >= 255) if ((i1 + -57344 | 0) >>> 0 < 8185 | (i1 >>> 0 < 8232 | (i1 + -8234 | 0) >>> 0 < 47062)) i1 = 1; else return (i1 & 65534 | 0) != 65534 & (i1 + -65532 | 0) >>> 0 < 1048580 & 1 | 0; else i1 = (i1 + 1 & 127) >>> 0 > 32 & 1;
 return i1 | 0;
}

function _System_Net_Sockets_Internal_Listen(i1, i3, i2) {
 i1 = i1 | 0;
 i3 = i3 | 0;
 i2 = i2 | 0;
 i2 = HEAP32[i3 + 8 >> 2] | 0;
 if (!(_listen(HEAP32[i3 >> 2] | 0, HEAP32[i3 + 4 >> 2] | 0) | 0)) i1 = 0; else i1 = HEAP32[(___errno_location() | 0) >> 2] | 0;
 HEAP32[i2 >> 2] = i1;
 return 0;
}

function _fmt_o(i3, i2, i1) {
 i3 = i3 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 if (!((i3 | 0) == 0 & (i2 | 0) == 0)) do {
  i1 = i1 + -1 | 0;
  HEAP8[i1 >> 0] = i3 & 7 | 48;
  i3 = _bitshift64Lshr(i3 | 0, i2 | 0, 3) | 0;
  i2 = tempRet0;
 } while (!((i3 | 0) == 0 & (i2 | 0) == 0));
 return i1 | 0;
}

function ___muldi3(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 var i5 = 0, i6 = 0;
 i5 = i1;
 i6 = i3;
 i3 = ___muldsi3(i5, i6) | 0;
 i1 = tempRet0;
 return (tempRet0 = (Math_imul(i2, i6) | 0) + (Math_imul(i4, i5) | 0) + i1 | i1 & 0, i3 | 0 | 0) | 0;
}

function _System_Net_Sockets_Internal_Connect(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 if (!(_Connect_Check(i1, i2, i3, 0) | 0)) {
  i1 = _malloc(24) | 0;
  HEAP32[i1 >> 2] = -1;
  HEAP32[i1 + 4 >> 2] = 44;
  HEAP32[i1 + 8 >> 2] = 0;
 } else i1 = 0;
 return i1 | 0;
}

function _System_Net_Sockets_Internal_Accept(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 if (!(_Accept_Check(i1, i2, i3, 0) | 0)) {
  i1 = _malloc(24) | 0;
  HEAP32[i1 >> 2] = -1;
  HEAP32[i1 + 4 >> 2] = 43;
  HEAP32[i1 + 8 >> 2] = 0;
 } else i1 = 0;
 return i1 | 0;
}

function _MethodState_Delete(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0, i4 = 0;
 i3 = HEAP32[i2 >> 2] | 0;
 i4 = HEAP32[i3 + 32 >> 2] | 0;
 if (i4 | 0) _Heap_UnmarkFinalizer(i4);
 _free(HEAP32[i3 + 40 >> 2] | 0);
 _Thread_StackFree(i1, i3);
 HEAP32[i2 >> 2] = 0;
 return;
}

function _MetaData_LoadUserStrings(i2, i3, i1) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = i1 | 0;
 i1 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 HEAP32[i2 + 8 >> 2] = i3;
 _log_f(1, 14490, i1);
 STACKTOP = i1;
 return;
}

function _MetaData_GetTableRow(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0;
 i3 = i2 & 16777215;
 if (!i3) i1 = 0; else {
  i2 = i2 >>> 24;
  i1 = (HEAP32[i1 + 212 + (i2 << 2) >> 2] | 0) + (Math_imul(HEAPU8[35004 + i2 >> 0] | 0, i3 + -1 | 0) | 0) | 0;
 }
 return i1 | 0;
}

function _Crash(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0;
 i3 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 _puts(16421) | 0;
 HEAP32[i3 >> 2] = i2;
 _vprintf(i1, i3) | 0;
 _puts(16437) | 0;
 _exit(1);
}

function _MetaData_LoadBlobs(i2, i3, i1) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = i1 | 0;
 i1 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 HEAP32[i2 + 4 >> 2] = i3;
 _log_f(1, 14476, i1);
 STACKTOP = i1;
 return;
}

function _SystemString_FromCharPtrUTF16(i2) {
 i2 = i2 | 0;
 var i1 = 0, i3 = 0;
 i1 = 0;
 while (1) if (!(HEAP16[i2 + (i1 << 1) >> 1] | 0)) break; else i1 = i1 + 1 | 0;
 i3 = _CreateStringHeapObj(i1) | 0;
 _memcpy(i3 + 4 | 0, i2 | 0, i1 << 1 | 0) | 0;
 return i3 | 0;
}

function _MetaData_LoadStrings(i2, i3, i1) {
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = i1 | 0;
 i1 = STACKTOP;
 STACKTOP = STACKTOP + 16 | 0;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(16);
 HEAP32[i2 >> 2] = i3;
 _log_f(1, 14460, i1);
 STACKTOP = i1;
 return;
}

function _Thread_SetEntryPoint(i3, i1, i2, i4, i5) {
 i3 = i3 | 0;
 i1 = i1 | 0;
 i2 = i2 | 0;
 i4 = i4 | 0;
 i5 = i5 | 0;
 i1 = _MethodState(i3, i1, i2, 0) | 0;
 HEAP32[i3 + 20 >> 2] = i1;
 if (i5 | 0) _memcpy(HEAP32[i1 + 24 >> 2] | 0, i4 | 0, i5 | 0) | 0;
 return;
}

function _System_Array_CreateInstance(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = _Type_GetArrayTypeDef(_RuntimeType_DeRef(HEAP32[i2 >> 2] | 0) | 0, 0, 0) | 0;
 HEAP32[i3 >> 2] = _SystemArray_NewVector(i1, HEAP32[i2 + 4 >> 2] | 0) | 0;
 return 0;
}

function _System_Char_ToUpperInvariant(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[i2 >> 2] | 0;
 i2 = _SearchCaseArray(9312, i1 & 65535) | 0;
 if ((i2 | 0) >= 0) i1 = HEAPU16[7964 + (i2 << 1) >> 1] | 0;
 HEAP32[i3 >> 2] = i1;
 return 0;
}

function _System_Char_ToLowerInvariant(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[i2 >> 2] | 0;
 i2 = _SearchCaseArray(7964, i1 & 65535) | 0;
 if ((i2 | 0) >= 0) i1 = HEAPU16[9312 + (i2 << 1) >> 1] | 0;
 HEAP32[i3 >> 2] = i1;
 return 0;
}

function _System_RuntimeType_Internal_GetGenericTypeDefinition(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[i1 >> 2] | 0;
 i2 = HEAP32[i1 + 88 >> 2] | 0;
 HEAP32[i3 >> 2] = _Type_GetTypeObject((i2 | 0) == 0 ? i1 : i2) | 0;
 return 0;
}

function _EnsureSync(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 i2 = i1 + 16 | 0;
 i1 = HEAP32[i2 >> 2] | 0;
 if (!i1) {
  i1 = _malloc(12) | 0;
  HEAP32[i1 >> 2] = 0;
  HEAP32[i1 + 4 >> 2] = 0;
  HEAP32[i1 + 8 >> 2] = 0;
  HEAP32[i2 >> 2] = i1;
 }
 return i1 | 0;
}

function _System_RuntimeType_get_IsGenericType(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[i1 >> 2] | 0;
 if (!(HEAP32[i1 + 88 >> 2] | 0)) i1 = (HEAP8[i1 + 57 >> 0] | 0) != 0; else i1 = 1;
 HEAP32[i3 >> 2] = i1 & 1;
 return 0;
}

function _System_Threading_Interlocked_Add_Int32(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[i2 >> 2] | 0;
 i2 = (HEAP32[i1 >> 2] | 0) + (HEAP32[i2 + 4 >> 2] | 0) | 0;
 HEAP32[i1 >> 2] = i2;
 HEAP32[i3 >> 2] = i2;
 return 0;
}

function _System_RuntimeType_GetNestingParentType(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[(HEAP32[i1 >> 2] | 0) + 120 >> 2] | 0;
 if (!i1) i1 = 0; else i1 = _Type_GetTypeObject(i1) | 0;
 HEAP32[i3 >> 2] = i1;
 return 0;
}

function _pntz(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 i2 = _a_ctz_l_763((HEAP32[i1 >> 2] | 0) + -1 | 0) | 0;
 if (!i2) {
  i2 = _a_ctz_l_763(HEAP32[i1 + 4 >> 2] | 0) | 0;
  return ((i2 | 0) == 0 ? 0 : i2 + 32 | 0) | 0;
 } else return i2 | 0;
 return 0;
}

function _bitshift64Ashr(i3, i2, i1) {
 i3 = i3 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 if ((i1 | 0) < 32) {
  tempRet0 = i2 >> i1;
  return i3 >>> i1 | (i2 & (1 << i1) - 1) << 32 - i1;
 }
 tempRet0 = (i2 | 0) < 0 ? -1 : 0;
 return i2 >> i1 - 32 | 0;
}

function _System_RuntimeType_GetElementType(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[(HEAP32[i1 >> 2] | 0) + 96 >> 2] | 0;
 if (!i1) i1 = 0; else i1 = _Type_GetTypeObject(i1) | 0;
 HEAP32[i3 >> 2] = i1;
 return 0;
}

function _CLIFile_GetHeapRoots(i2) {
 i2 = i2 | 0;
 var i1 = 0;
 i1 = 28160;
 while (1) {
  i1 = HEAP32[i1 >> 2] | 0;
  if (!i1) break;
  _MetaData_GetHeapRoots(i2, HEAP32[(HEAP32[i1 >> 2] | 0) + 16 >> 2] | 0);
  i1 = i1 + 4 | 0;
 }
 return;
}

function _Type_IsAssignableFrom(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 if (!(_Type_IsDerivedFromOrSame(i1, i2) | 0)) if (!(HEAP32[i1 + 8 >> 2] & 32)) i1 = 0; else i1 = (_Type_IsImplemented(i1, i2) | 0) != 0; else i1 = 1;
 return i1 & 1 | 0;
}

function _System_RuntimeType_get_BaseType(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[(HEAP32[i1 >> 2] | 0) + 40 >> 2] | 0;
 if (!i1) i1 = 0; else i1 = _Type_GetTypeObject(i1) | 0;
 HEAP32[i3 >> 2] = i1;
 return 0;
}

function _DeleteSync(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 i1 = i1 + 16 | 0;
 i2 = HEAP32[i1 >> 2] | 0;
 if ((i2 | 0 ? (HEAP32[i2 + 4 >> 2] | 0) == 0 : 0) ? (HEAP32[i2 + 8 >> 2] | 0) == 0 : 0) {
  _free(i2);
  HEAP32[i1 >> 2] = 0;
 }
 return;
}

function _System_Threading_Interlocked_Exchange_Int32(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[i2 >> 2] | 0;
 i2 = HEAP32[i2 + 4 >> 2] | 0;
 HEAP32[i3 >> 2] = HEAP32[i1 >> 2];
 HEAP32[i1 >> 2] = i2;
 return 0;
}

function _System_Threading_Interlocked_Decrement_Int32(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[i2 >> 2] | 0;
 i2 = (HEAP32[i1 >> 2] | 0) + -1 | 0;
 HEAP32[i1 >> 2] = i2;
 HEAP32[i3 >> 2] = i2;
 return 0;
}

function _System_Threading_Interlocked_Increment_Int32(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = HEAP32[i2 >> 2] | 0;
 i2 = (HEAP32[i1 >> 2] | 0) + 1 | 0;
 HEAP32[i1 >> 2] = i2;
 HEAP32[i3 >> 2] = i2;
 return 0;
}

function _bitshift64Shl(i3, i2, i1) {
 i3 = i3 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 if ((i1 | 0) < 32) {
  tempRet0 = i2 << i1 | (i3 & (1 << i1) - 1 << 32 - i1) >>> 32 - i1;
  return i3 << i1;
 }
 tempRet0 = i3 << i1 - 32;
 return 0;
}

function _bitshift64Lshr(i3, i2, i1) {
 i3 = i3 | 0;
 i2 = i2 | 0;
 i1 = i1 | 0;
 if ((i1 | 0) < 32) {
  tempRet0 = i2 >>> i1;
  return i3 >>> i1 | (i2 & (1 << i1) - 1) << 32 - i1;
 }
 tempRet0 = 0;
 return i2 >>> i1 - 32 | 0;
}

function _Thread_Delete(i2) {
 i2 = i2 | 0;
 var i1 = 0, i3 = 0;
 i1 = HEAP32[i2 + 52 >> 2] | 0;
 while (1) {
  if (!i1) break;
  i3 = HEAP32[i1 + 10004 >> 2] | 0;
  _free(i1);
  i1 = i3;
 }
 _Heap_MakeDeletable(i2);
 return;
}

function _System_GC_GetTotalMemory(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 if (HEAP32[i2 >> 2] | 0) _Heap_GarbageCollect();
 HEAP32[i3 >> 2] = _Heap_GetTotalMemory() | 0;
 HEAP32[i3 + 4 >> 2] = 0;
 return 0;
}

function _GetNextFinalizer() {
 var i1 = 0, i2 = 0;
 i2 = HEAP32[7043] | 0;
 i1 = i2 + -1 | 0;
 if (!i2) i1 = 0; else {
  i2 = HEAP32[7042] | 0;
  HEAP32[7043] = i1;
  i1 = HEAP32[i2 + (i1 << 2) >> 2] | 0;
 }
 return i1 | 0;
}

function _System_RuntimeType_get_IsEnum(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = (HEAP32[(HEAP32[i1 >> 2] | 0) + 40 >> 2] | 0) == (HEAP32[(HEAP32[8595] | 0) + 120 >> 2] | 0) & 1;
 return 0;
}

function _iswalpha(i1) {
 i1 = i1 | 0;
 if (i1 >>> 0 < 131072) i1 = (HEAPU8[21935 + ((HEAPU8[21935 + (i1 >>> 8) >> 0] | 0) << 5 | i1 >>> 3 & 31) >> 0] | 0) >>> (i1 & 7) & 1; else i1 = i1 >>> 0 < 196606 & 1;
 return i1 | 0;
}

function _System_Threading_Thread_ctorParam(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = _Thread() | 0;
 HEAP32[i1 + 4 >> 2] = HEAP32[i2 >> 2];
 HEAP32[i3 >> 2] = i1;
 HEAP32[i1 + 48 >> 2] = 1;
 return 0;
}

function _a_ctz_l_763(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 if (i1) if (!(i1 & 1)) {
  i2 = i1;
  i1 = 0;
  do {
   i1 = i1 + 1 | 0;
   i2 = i2 >>> 1;
  } while (!(i2 & 1 | 0));
 } else i1 = 0; else i1 = 32;
 return i1 | 0;
}

function stackAlloc(i2) {
 i2 = i2 | 0;
 var i1 = 0;
 i1 = STACKTOP;
 STACKTOP = STACKTOP + i2 | 0;
 STACKTOP = STACKTOP + 15 & -16;
 if ((STACKTOP | 0) >= (STACK_MAX | 0)) abortStackOverflow(i2 | 0);
 return i1 | 0;
}

function _SystemArray_NewVector(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i1 = _Heap_Alloc(i1, (Math_imul(HEAP32[(HEAP32[i1 + 96 >> 2] | 0) + 64 >> 2] | 0, i2) | 0) + 4 | 0) | 0;
 HEAP32[i1 >> 2] = i2;
 return i1 | 0;
}

function _Delegate_GetMethodAndStore(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i2 >> 2] = HEAP32[i1 >> 2];
 if (i3 | 0) HEAP32[i3 >> 2] = HEAP32[i1 + 8 >> 2];
 return HEAP32[i1 + 4 >> 2] | 0;
}

function _System_Console_Internal_ReadKey(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i3 = _malloc(24) | 0;
 HEAP32[i3 >> 2] = -1;
 HEAP32[i3 + 4 >> 2] = 42;
 HEAP32[i3 + 8 >> 2] = 0;
 return i3 | 0;
}

function _System_RuntimeType_get_Namespace(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = _SystemString_FromCharPtrASCII(HEAP32[(HEAP32[i1 >> 2] | 0) + 16 >> 2] | 0) | 0;
 return 0;
}

function _Framework_JSInterop_Activator_CreateInstance(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = _Heap_AllocType(_RuntimeType_DeRef(HEAP32[i2 >> 2] | 0) | 0) | 0;
 return 0;
}

function _Type_GetTypeObject(i2) {
 i2 = i2 | 0;
 var i1 = 0, i3 = 0;
 i3 = i2 + 128 | 0;
 i1 = HEAP32[i3 >> 2] | 0;
 if (!i1) {
  i1 = _RuntimeType_New(i2) | 0;
  HEAP32[i3 >> 2] = i1;
 }
 return i1 | 0;
}

function _System_RuntimeType_get_Name(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = _SystemString_FromCharPtrASCII(HEAP32[(HEAP32[i1 >> 2] | 0) + 12 >> 2] | 0) | 0;
 return 0;
}

function _iswpunct(i1) {
 i1 = i1 | 0;
 if (i1 >>> 0 < 131072) i1 = (HEAPU8[24911 + ((HEAPU8[24911 + (i1 >>> 8) >> 0] | 0) << 5 | i1 >>> 3 & 31) >> 0] | 0) >>> (i1 & 7) & 1; else i1 = 0;
 return i1 | 0;
}

function _Heap_Clone(i1) {
 i1 = i1 | 0;
 var i2 = 0, i3 = 0;
 i3 = _GetSize(i1 + -20 | 0) | 0;
 i2 = _Heap_Alloc(HEAP32[i1 + -8 >> 2] | 0, i3) | 0;
 _memcpy(i2 | 0, i1 | 0, i3 | 0) | 0;
 return i2 | 0;
}

function _MethodState(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return _MethodState_Direct(i1, _MetaData_GetMethodDefFromDefRefOrSpec(i2, i3, 0, 0) | 0, i4, 0) | 0;
}

function _RuntimeType_New(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 i2 = _Heap_AllocType(HEAP32[(HEAP32[8595] | 0) + 104 >> 2] | 0) | 0;
 _Heap_MakeUndeletable(i2);
 HEAP32[i2 >> 2] = i1;
 return i2 | 0;
}

function _Heap_SetWeakRefTarget(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0;
 i3 = (_EnsureSync(i1 + -20 | 0) | 0) + 8 | 0;
 i1 = HEAP32[i3 >> 2] | 0;
 HEAP32[i3 >> 2] = i2;
 return i1 | 0;
}

function ___DOUBLE_BITS_675(d1) {
 d1 = +d1;
 var i2 = 0;
 HEAPF64[tempDoublePtr >> 3] = d1;
 i2 = HEAP32[tempDoublePtr >> 2] | 0;
 tempRet0 = HEAP32[tempDoublePtr + 4 >> 2] | 0;
 return i2 | 0;
}

function _MetaData_GetTypeDefFromFullName(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return _MetaData_GetTypeDefFromName(_CLIFile_GetMetaDataForAssembly(i1) | 0, i2, i3, 0, 1) | 0;
}

function _i64Subtract(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 i4 = i2 - i4 - (i3 >>> 0 > i1 >>> 0 | 0) >>> 0;
 return (tempRet0 = i4, i1 - i3 >>> 0 | 0) | 0;
}

function _System_IO_FileInternal_Close(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i3 = HEAP32[i2 + 4 >> 2] | 0;
 _close(HEAP32[i2 >> 2] | 0) | 0;
 HEAP32[i3 >> 2] = 0;
 return 0;
}

function ___strdup(i2) {
 i2 = i2 | 0;
 var i1 = 0, i3 = 0;
 i3 = (_strlen(i2) | 0) + 1 | 0;
 i1 = _malloc(i3) | 0;
 if (!i1) i1 = 0; else _memcpy(i1 | 0, i2 | 0, i3 | 0) | 0;
 return i1 | 0;
}

function _SystemArray_LoadElementAddress(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return i1 + 4 + (Math_imul(HEAP32[(HEAP32[(_Heap_GetType(i1) | 0) + 96 >> 2] | 0) + 64 >> 2] | 0, i2) | 0) | 0;
}

function ___lctrans_impl(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 if (!i1) i1 = 0; else i1 = ___mo_lookup(HEAP32[i1 >> 2] | 0, HEAP32[i1 + 4 >> 2] | 0, i2) | 0;
 return (i1 | 0 ? i1 : i2) | 0;
}

function dynCall_iiiii(i5, i1, i2, i3, i4) {
 i5 = i5 | 0;
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return FUNCTION_TABLE_iiiii[i5 & 63](i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function _System_Threading_Thread_ctor(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i1 = _Thread() | 0;
 HEAP32[i1 + 4 >> 2] = HEAP32[i2 >> 2];
 HEAP32[i3 >> 2] = i1;
 return 0;
}

function _i64Add(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 i3 = i1 + i3 >>> 0;
 return (tempRet0 = i2 + i4 + (i3 >>> 0 < i1 >>> 0 | 0) >>> 0, i3 | 0) | 0;
}

function _ctor(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i1 >> 2] = HEAP32[i2 >> 2];
 HEAP32[i1 + 4 >> 2] = HEAP32[i2 + 4 >> 2];
 HEAP32[i1 + 8 >> 2] = 0;
 return 0;
}

function _CreateStringHeapObj(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 i2 = _Heap_Alloc(HEAP32[(HEAP32[8595] | 0) + 36 >> 2] | 0, (i1 << 1) + 4 | 0) | 0;
 HEAP32[i2 >> 2] = i1;
 return i2 | 0;
}

function _freelist(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 i1 = HEAP32[i1 >> 2] | 0;
 if (i1 | 0) do {
  i2 = i1;
  i1 = HEAP32[i1 >> 2] | 0;
  _free(i2);
 } while ((i1 | 0) != 0);
 return;
}

function _MetaData_DecodeSigEntryToken(i1) {
 i1 = i1 | 0;
 i1 = _MetaData_DecodeSigEntry(i1) | 0;
 return (HEAPU8[14456 + (i1 & 3) >> 0] | 0) << 24 | i1 >>> 2 & 16777215 | 0;
}

function _Heap_Box(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0;
 i3 = _Heap_AllocType(i1) | 0;
 _memcpy(i3 | 0, i2 | 0, HEAP32[i1 + 36 >> 2] | 0) | 0;
 return i3 | 0;
}

function _GetU32(i1) {
 i1 = i1 | 0;
 return (HEAPU8[i1 + 1 >> 0] | 0) << 8 | (HEAPU8[i1 >> 0] | 0) | (HEAPU8[i1 + 2 >> 0] | 0) << 16 | (HEAPU8[i1 + 3 >> 0] | 0) << 24 | 0;
}

function _System_Type_GetTypeFromHandle(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = _Type_GetTypeObject(HEAP32[i2 >> 2] | 0) | 0;
 return 0;
}

function _System_Math_Pow(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAPF64[i3 >> 3] = +Math_pow(+(+HEAPF64[i2 >> 3]), +(+HEAPF64[i2 + 8 >> 3]));
 return 0;
}

function _System_Threading_Thread_Sleep(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i3 = _malloc(24) | 0;
 HEAP32[i3 >> 2] = HEAP32[i2 >> 2];
 return i3 | 0;
}

function _System_String_get_Chars(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = HEAPU16[i1 + 4 + (HEAP32[i2 >> 2] << 1) >> 1];
 return 0;
}

function _System_Object_GetType(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = _Type_GetTypeObject(_Heap_GetType(i1) | 0) | 0;
 return 0;
}

function _System_Type_get_IsValueType(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = HEAPU8[(HEAP32[i1 >> 2] | 0) + 34 >> 0];
 return 0;
}

function _System_Threading_Thread_get_CurrentThread(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = _Thread_GetCurrent() | 0;
 return 0;
}

function dynCall_iiii(i4, i1, i2, i3) {
 i4 = i4 | 0;
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return FUNCTION_TABLE_iiii[i4 & 255](i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiiii_19(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(19, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_18(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(18, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_17(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(17, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_16(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(16, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_15(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(15, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_14(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(14, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_13(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(13, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_12(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(12, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_11(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(11, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_10(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(10, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function _System_Object_GetHashCode(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = Math_imul(i1 >>> 2, -1640531535) | 0;
 return 0;
}

function jsCall_iiiii_9(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(9, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_8(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(8, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_7(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(7, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_6(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(6, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_5(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(5, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_4(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(4, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_3(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(3, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_2(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(2, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_1(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(1, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function jsCall_iiiii_0(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return jsCall_iiiii(0, i1 | 0, i2 | 0, i3 | 0, i4 | 0) | 0;
}

function _iswcntrl(i1) {
 i1 = i1 | 0;
 return ((i1 + -65529 | 0) >>> 0 < 3 | ((i1 & -2 | 0) == 8232 | (i1 >>> 0 < 32 | (i1 + -127 | 0) >>> 0 < 33))) & 1 | 0;
}

function _System_GC_Internal_CollectionCount(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = _Heap_NumCollections() | 0;
 return 0;
}

function _strchr(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i1 = ___strchrnul(i1, i2) | 0;
 return ((HEAP8[i1 >> 0] | 0) == (i2 & 255) << 24 >> 24 ? i1 : 0) | 0;
}

function _fputs(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0;
 i3 = _strlen(i1) | 0;
 return ((_fwrite(i1, 1, i3, i2) | 0) != (i3 | 0)) << 31 >> 31 | 0;
}

function _System_Threading_Monitor_Internal_Exit(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 _Heap_SyncExit(HEAP32[i2 >> 2] | 0) | 0;
 return 1;
}

function _System_Object_Equals(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = (HEAP32[i2 >> 2] | 0) == (i1 | 0) & 1;
 return 0;
}

function ___syscall_ret(i1) {
 i1 = i1 | 0;
 if (i1 >>> 0 > 4294963200) {
  HEAP32[(___errno_location() | 0) >> 2] = 0 - i1;
  i1 = -1;
 }
 return i1 | 0;
}

function _wcslen(i2) {
 i2 = i2 | 0;
 var i1 = 0;
 i1 = i2;
 while (1) if (!(HEAP32[i1 >> 2] | 0)) break; else i1 = i1 + 4 | 0;
 return i1 - i2 >> 2 | 0;
}

function _System_Object_Clone(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = _Heap_Clone(HEAP32[i2 >> 2] | 0) | 0;
 return 0;
}

function _System_Environment_get_TickCount(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i2 = _msTime() | 0;
 HEAP32[i3 >> 2] = i2;
 return 0;
}

function _MetaData_Init() {
 var i1 = 0;
 i1 = 0;
 while (1) {
  if ((i1 | 0) == 48) break;
  HEAP8[35004 + i1 >> 0] = 0;
  i1 = i1 + 1 | 0;
 }
 return;
}

function _SystemArray_GetNumBytes(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return (Math_imul(HEAP32[i2 + 64 >> 2] | 0, HEAP32[i1 >> 2] | 0) | 0) + 4 | 0;
}

function _RemoveWeakRefTarget(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 _SystemWeakReference_TargetGone((HEAP32[i1 + 16 >> 2] | 0) + 8 | 0, i2);
 return;
}

function _System_GC_SuppressFinalize(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 _Heap_UnmarkFinalizer(HEAP32[i2 >> 2] | 0);
 return 0;
}

function _ShowUsage() {
 _puts(11987) | 0;
 _puts(11994) | 0;
 _putchar(10) | 0;
 _puts(12061) | 0;
 _puts(12117) | 0;
 _putchar(10) | 0;
 _exit(1);
}

function _Framework_JSInterop_FromHeapRefImpl(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = HEAP32[i2 >> 2];
 return 0;
}

function _System_Math_Sqrt(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAPF64[i3 >> 3] = +Math_sqrt(+(+HEAPF64[i2 >> 3]));
 return 0;
}

function _strnlen(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0;
 i3 = _memchr(i1, 0, i2) | 0;
 return ((i3 | 0) == 0 ? i2 : i3 - i1 | 0) | 0;
}

function _System_WeakReference_get_Target(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = HEAP32[i1 >> 2];
 return 0;
}

function _System_Net_Sockets_Internal_Close(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 _close(HEAP32[i2 >> 2] | 0) | 0;
 return 0;
}

function _casefold(i2) {
 i2 = i2 | 0;
 var i1 = 0;
 i1 = _towupper(i2) | 0;
 if ((i1 | 0) == (i2 | 0)) i1 = _towlower(i2) | 0;
 return i1 | 0;
}

function _PInvoke_GetFunction(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 _MetaData_GetModuleRefName(i1, HEAP32[i2 + 12 >> 2] | 0) | 0;
 return 139;
}

function _System_Enum_Internal_GetValue(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = HEAP32[i1 >> 2];
 return 0;
}

function _Framework_JSInterop_ToHeapRef(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = HEAP32[i2 >> 2];
 return 0;
}

function _swapc(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 var i3 = 0;
 i3 = _llvm_bswap_i32(i1 | 0) | 0;
 return ((i2 | 0) == 0 ? i1 : i3) | 0;
}

function ___udivdi3(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return ___udivmoddi4(i1, i2, i3, i4, 0) | 0;
}

function _Thread_StackFree(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i1 = HEAP32[i1 + 52 >> 2] | 0;
 HEAP32[i1 + 1e4 >> 2] = i2 - i1;
 return;
}

function _System_Math_Tan(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAPF64[i3 >> 3] = +_tan(+HEAPF64[i2 >> 3]);
 return 0;
}

function _System_Math_Sin(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAPF64[i3 >> 3] = +_sin(+HEAPF64[i2 >> 3]);
 return 0;
}

function _System_Math_Cos(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAPF64[i3 >> 3] = +_cos(+HEAPF64[i2 >> 3]);
 return 0;
}

function _SystemString_GetString(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 if (i2 | 0) HEAP32[i2 >> 2] = HEAP32[i1 >> 2];
 return i1 + 4 | 0;
}

function _out(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 if (!(HEAP32[i1 >> 2] & 32)) ___fwritex(i2, i3, i1) | 0;
 return;
}

function _MetaData_GetModuleRefName(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return HEAP32[(_MetaData_GetTableRow(i1, i2) | 0) >> 2] | 0;
}

function _llvm_bswap_i32(i1) {
 i1 = i1 | 0;
 return (i1 & 255) << 24 | (i1 >> 8 & 255) << 16 | (i1 >> 16 & 255) << 8 | i1 >>> 24 | 0;
}

function dynCall_iii(i3, i1, i2) {
 i3 = i3 | 0;
 i1 = i1 | 0;
 i2 = i2 | 0;
 return FUNCTION_TABLE_iii[i3 & 63](i1 | 0, i2 | 0) | 0;
}

function _recv(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return _recvfrom(i1, i2, i3, i4, 0, 0) | 0;
}

function jsCall_iiii_19(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(19, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_18(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(18, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_17(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(17, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_16(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(16, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_15(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(15, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_14(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(14, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_13(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(13, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_12(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(12, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_11(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(11, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_10(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(10, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function _send(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 return _sendto(i1, i2, i3, i4, 0, 0) | 0;
}

function jsCall_iiii_9(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(9, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_8(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(8, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_7(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(7, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_6(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(6, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_5(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(5, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_4(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(4, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_3(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(3, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_2(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(2, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_1(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(1, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function jsCall_iiii_0(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return jsCall_iiii(0, i1 | 0, i2 | 0, i3 | 0) | 0;
}

function _System_Environment_get_Platform(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 HEAP32[i3 >> 2] = 4;
 return 0;
}

function _iswgraph(i1) {
 i1 = i1 | 0;
 if (!(_iswspace(i1) | 0)) i1 = (_iswprint(i1) | 0) != 0; else i1 = 0;
 return i1 & 1 | 0;
}

function _iswalnum(i1) {
 i1 = i1 | 0;
 if (!(_iswdigit(i1) | 0)) i1 = (_iswalpha(i1) | 0) != 0; else i1 = 1;
 return i1 & 1 | 0;
}

function _System_Diagnostics_Debugger_Break(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 _puts(18276) | 0;
 return 0;
}

function _SleepMS(i1) {
 i1 = i1 | 0;
 _sleep((i1 >>> 0) / 1e3 | 0) | 0;
 _usleep(((i1 >>> 0) % 1e3 | 0) * 1e3 | 0) | 0;
 return;
}

function _Map_Delegate(i1) {
 i1 = i1 | 0;
 i1 = (_strcmp(HEAP32[i1 + 16 >> 2] | 0, 13698) | 0) == 0;
 return (i1 ? 138 : 0) | 0;
}

function _wctomb(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 if (!i1) i1 = 0; else i1 = _wcrtomb(i1, i2, 0) | 0;
 return i1 | 0;
}

function _vsprintf(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 return _vsnprintf(i1, 2147483647, i2, i3) | 0;
}

function _strerror(i1) {
 i1 = i1 | 0;
 return ___strerror_l(i1, HEAP32[(___pthread_self_105() | 0) + 188 >> 2] | 0) | 0;
}

function _System_GC_Collect(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 _Heap_GarbageCollect();
 return 0;
}

function _iswxdigit(i1) {
 i1 = i1 | 0;
 return ((i1 + -48 | 0) >>> 0 < 10 | ((i1 | 32) + -97 | 0) >>> 0 < 6) & 1 | 0;
}

function _closedir(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 i2 = _close(HEAP32[i1 >> 2] | 0) | 0;
 _free(i1);
 return i2 | 0;
}

function b3(i1, i2, i3, i4) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 i4 = i4 | 0;
 nullFunc_iiiii(3);
 return 0;
}

function _iswspace(i1) {
 i1 = i1 | 0;
 if (!i1) i1 = 0; else i1 = (_wcschr(5208, i1) | 0) != 0;
 return i1 & 1 | 0;
}

function _sort(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return _strcmp(HEAP32[i1 >> 2] | 0, HEAP32[i2 >> 2] | 0) | 0;
}

function setThrew(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 if (!__THREW__) {
  __THREW__ = i1;
  threwValue = i2;
 }
}

function _tolower(i1) {
 i1 = i1 | 0;
 var i2 = 0;
 i2 = (_isupper(i1) | 0) == 0;
 return (i2 ? i1 : i1 | 32) | 0;
}

function _Finalizer_Init() {
 HEAP32[7041] = 4;
 HEAP32[7042] = _malloc(16) | 0;
 HEAP32[7043] = 0;
 return;
}

function dynCall_ii(i2, i1) {
 i2 = i2 | 0;
 i1 = i1 | 0;
 return FUNCTION_TABLE_ii[i2 & 63](i1 | 0) | 0;
}

function _MetaData() {
 var i1 = 0;
 i1 = _malloc(424) | 0;
 _memset(i1 | 0, 0, 424) | 0;
 return i1 | 0;
}

function jsCall_iii_19(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(19, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_18(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(18, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_17(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(17, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_16(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(16, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_15(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(15, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_14(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(14, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_13(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(13, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_12(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(12, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_11(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(11, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_10(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(10, i1 | 0, i2 | 0) | 0;
}

function _vprintf(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return _vfprintf(HEAP32[1239] | 0, i1, i2) | 0;
}

function _GetU16(i1) {
 i1 = i1 | 0;
 return (HEAPU8[i1 + 1 >> 0] | 0) << 8 | (HEAPU8[i1 >> 0] | 0) | 0;
}

function jsCall_iii_9(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(9, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_8(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(8, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_7(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(7, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_6(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(6, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_5(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(5, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_4(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(4, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_3(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(3, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_2(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(2, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_1(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(1, i1 | 0, i2 | 0) | 0;
}

function jsCall_iii_0(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return jsCall_iii(0, i1 | 0, i2 | 0) | 0;
}

function _MetaData_DecodeHeapEntryLength(i1) {
 i1 = i1 | 0;
 return _MetaData_DecodeSigEntry(i1) | 0;
}

function runPostSets() {}
function __emscripten_dceable_type_decls() {
 _invokeJsFunc(0, 0, 0) | 0;
}

function establishStackSpace(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 STACKTOP = i1;
 STACK_MAX = i2;
}

function _Heap_AllocType(i1) {
 i1 = i1 | 0;
 return _Heap_Alloc(i1, HEAP32[i1 + 36 >> 2] | 0) | 0;
}

function b1(i1, i2, i3) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 i3 = i3 | 0;
 nullFunc_iiii(1);
 return 0;
}

function _Heap_GetWeakRefAddress(i1) {
 i1 = i1 | 0;
 return (HEAP32[i1 + -4 >> 2] | 0) + 8 | 0;
}

function _strcpy(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 ___stpcpy(i1, i2) | 0;
 return i1 | 0;
}

function ___lctrans(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return ___lctrans_impl(i1, i2) | 0;
}

function _SystemString_GetNumBytes(i1) {
 i1 = i1 | 0;
 return (HEAP32[i1 >> 2] << 1) + 4 | 0;
}

function _Heap_RemovedWeakRefTarget(i1) {
 i1 = i1 | 0;
 _DeleteSync(i1 + -20 | 0);
 return;
}

function _llvm_bswap_i16(i1) {
 i1 = i1 | 0;
 return (i1 & 255) << 8 | i1 >> 8 & 255 | 0;
}

function _isblank(i1) {
 i1 = i1 | 0;
 return ((i1 | 0) == 32 | (i1 | 0) == 9) & 1 | 0;
}

function _Heap_MakeUndeletable(i1) {
 i1 = i1 | 0;
 HEAP8[i1 + -11 >> 0] = -1;
 return;
}

function _Heap_UnmarkFinalizer(i1) {
 i1 = i1 | 0;
 HEAP8[i1 + -10 >> 0] = 0;
 return;
}

function _Heap_MakeDeletable(i1) {
 i1 = i1 | 0;
 HEAP8[i1 + -11 >> 0] = 0;
 return;
}

function _iswupper(i1) {
 i1 = i1 | 0;
 return (_towlower(i1) | 0) != (i1 | 0) | 0;
}

function _iswlower(i1) {
 i1 = i1 | 0;
 return (_towupper(i1) | 0) != (i1 | 0) | 0;
}

function ___bswap_16_494(i1) {
 i1 = i1 | 0;
 return _llvm_bswap_i16(i1 | 0) | 0;
}

function _Delegate_GetMethod(i1) {
 i1 = i1 | 0;
 return HEAP32[i1 + 4 >> 2] | 0;
}

function _putchar(i1) {
 i1 = i1 | 0;
 return _fputc(i1, HEAP32[1239] | 0) | 0;
}

function _frexpl(d1, i2) {
 d1 = +d1;
 i2 = i2 | 0;
 return +(+_frexp(d1, i2));
}

function b2(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 nullFunc_iii(2);
 return 0;
}

function _iswdigit(i1) {
 i1 = i1 | 0;
 return (i1 + -48 | 0) >>> 0 < 10 | 0;
}

function ___bswap_32(i1) {
 i1 = i1 | 0;
 return _llvm_bswap_i32(i1 | 0) | 0;
}

function ___bswap_16(i1) {
 i1 = i1 | 0;
 return _llvm_bswap_i16(i1 | 0) | 0;
}

function jsCall_ii_19(i1) {
 i1 = i1 | 0;
 return jsCall_ii(19, i1 | 0) | 0;
}

function jsCall_ii_18(i1) {
 i1 = i1 | 0;
 return jsCall_ii(18, i1 | 0) | 0;
}

function jsCall_ii_17(i1) {
 i1 = i1 | 0;
 return jsCall_ii(17, i1 | 0) | 0;
}

function jsCall_ii_16(i1) {
 i1 = i1 | 0;
 return jsCall_ii(16, i1 | 0) | 0;
}

function jsCall_ii_15(i1) {
 i1 = i1 | 0;
 return jsCall_ii(15, i1 | 0) | 0;
}

function jsCall_ii_14(i1) {
 i1 = i1 | 0;
 return jsCall_ii(14, i1 | 0) | 0;
}

function jsCall_ii_13(i1) {
 i1 = i1 | 0;
 return jsCall_ii(13, i1 | 0) | 0;
}

function jsCall_ii_12(i1) {
 i1 = i1 | 0;
 return jsCall_ii(12, i1 | 0) | 0;
}

function jsCall_ii_11(i1) {
 i1 = i1 | 0;
 return jsCall_ii(11, i1 | 0) | 0;
}

function jsCall_ii_10(i1) {
 i1 = i1 | 0;
 return jsCall_ii(10, i1 | 0) | 0;
}

function _isupper(i1) {
 i1 = i1 | 0;
 return (i1 + -65 | 0) >>> 0 < 26 | 0;
}

function ___errno_location() {
 return (___pthread_self_108() | 0) + 64 | 0;
}

function _RuntimeType_DeRef(i1) {
 i1 = i1 | 0;
 return HEAP32[i1 >> 2] | 0;
}

function _Heap_GetType(i1) {
 i1 = i1 | 0;
 return HEAP32[i1 + -8 >> 2] | 0;
}

function jsCall_ii_9(i1) {
 i1 = i1 | 0;
 return jsCall_ii(9, i1 | 0) | 0;
}

function jsCall_ii_8(i1) {
 i1 = i1 | 0;
 return jsCall_ii(8, i1 | 0) | 0;
}

function jsCall_ii_7(i1) {
 i1 = i1 | 0;
 return jsCall_ii(7, i1 | 0) | 0;
}

function jsCall_ii_6(i1) {
 i1 = i1 | 0;
 return jsCall_ii(6, i1 | 0) | 0;
}

function jsCall_ii_5(i1) {
 i1 = i1 | 0;
 return jsCall_ii(5, i1 | 0) | 0;
}

function jsCall_ii_4(i1) {
 i1 = i1 | 0;
 return jsCall_ii(4, i1 | 0) | 0;
}

function jsCall_ii_3(i1) {
 i1 = i1 | 0;
 return jsCall_ii(3, i1 | 0) | 0;
}

function jsCall_ii_2(i1) {
 i1 = i1 | 0;
 return jsCall_ii(2, i1 | 0) | 0;
}

function jsCall_ii_1(i1) {
 i1 = i1 | 0;
 return jsCall_ii(1, i1 | 0) | 0;
}

function jsCall_ii_0(i1) {
 i1 = i1 | 0;
 return jsCall_ii(0, i1 | 0) | 0;
}

function _towupper(i1) {
 i1 = i1 | 0;
 return ___towcase(i1, 0) | 0;
}

function _towlower(i1) {
 i1 = i1 | 0;
 return ___towcase(i1, 1) | 0;
}

function _ignore_err(i1, i2) {
 i1 = i1 | 0;
 i2 = i2 | 0;
 return 0;
}

function _ntohs(i1) {
 i1 = i1 | 0;
 return ___bswap_16_494(i1) | 0;
}

function _iswblank(i1) {
 i1 = i1 | 0;
 return _isblank(i1) | 0;
}

function _htons(i1) {
 i1 = i1 | 0;
 return ___bswap_16(i1) | 0;
}

function _htonl(i1) {
 i1 = i1 | 0;
 return ___bswap_32(i1) | 0;
}

function _JIT_Execute_Init() {
 _JIT_Execute(0, 0) | 0;
 return;
}

function _Heap_GarbageCollect() {
 _GarbageCollect();
 return;
}

function ___pthread_self_536() {
 return _pthread_self() | 0;
}

function ___pthread_self_448() {
 return _pthread_self() | 0;
}

function ___pthread_self_445() {
 return _pthread_self() | 0;
}

function ___pthread_self_108() {
 return _pthread_self() | 0;
}

function ___pthread_self_105() {
 return _pthread_self() | 0;
}

function b0(i1) {
 i1 = i1 | 0;
 nullFunc_ii(0);
 return 0;
}

function _Heap_NumCollections() {
 return HEAP32[7049] | 0;
}

function _Heap_GetTotalMemory() {
 return HEAP32[7044] | 0;
}

function stackRestore(i1) {
 i1 = i1 | 0;
 STACKTOP = i1;
}

function _Thread_GetCurrent() {
 return HEAP32[8594] | 0;
}

function setTempRet0(i1) {
 i1 = i1 | 0;
 tempRet0 = i1;
}

function _emscripten_get_global_libc() {
 return 34444;
}

function _dummy_738(i1) {
 i1 = i1 | 0;
 return i1 | 0;
}

function ___unlockfile(i1) {
 i1 = i1 | 0;
 return;
}

function ___lockfile(i1) {
 i1 = i1 | 0;
 return 0;
}

function getTempRet0() {
 return tempRet0 | 0;
}

function stackSave() {
 return STACKTOP | 0;
}

function _RVA() {
 return _malloc(4) | 0;
}

function _pthread_self() {
 return 4712;
}

function _Socket_Init() {
 return;
}

// EMSCRIPTEN_END_FUNCS
var FUNCTION_TABLE_ii = [b0,b0,jsCall_ii_0,b0,jsCall_ii_1,b0,jsCall_ii_2,b0,jsCall_ii_3,b0,jsCall_ii_4,b0,jsCall_ii_5,b0,jsCall_ii_6,b0,jsCall_ii_7,b0,jsCall_ii_8,b0,jsCall_ii_9,b0,jsCall_ii_10,b0,jsCall_ii_11,b0,jsCall_ii_12,b0,jsCall_ii_13
,b0,jsCall_ii_14,b0,jsCall_ii_15,b0,jsCall_ii_16,b0,jsCall_ii_17,b0,jsCall_ii_18,b0,jsCall_ii_19,b0,___stdio_close,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0,b0
,b0,b0,b0,b0,b0];
var FUNCTION_TABLE_iiii = [b1,b1,jsCall_iiii_0,b1,jsCall_iiii_1,b1,jsCall_iiii_2,b1,jsCall_iiii_3,b1,jsCall_iiii_4,b1,jsCall_iiii_5,b1,jsCall_iiii_6,b1,jsCall_iiii_7,b1,jsCall_iiii_8,b1,jsCall_iiii_9,b1,jsCall_iiii_10,b1,jsCall_iiii_11,b1,jsCall_iiii_12,b1,jsCall_iiii_13
,b1,jsCall_iiii_14,b1,jsCall_iiii_15,b1,jsCall_iiii_16,b1,jsCall_iiii_17,b1,jsCall_iiii_18,b1,jsCall_iiii_19,b1,_System_Object_Equals,_System_Object_Clone,_System_Object_GetHashCode,_System_Object_GetType,_System_String_ctor_CharInt32,_System_String_ctor_CharAIntInt,_System_String_ctor_StringIntInt,_System_String_get_Chars,_System_String_InternalConcat,_System_String_InternalTrim,_System_String_Equals,_System_String_GetHashCode,_System_String_InternalReplace,_System_String_InternalIndexOf,_System_String_InternalIndexOfAny,_Framework_JSInterop_Activator_CreateInstance,_System_Array_Internal_GetValue
,_System_Array_Internal_SetValue,_System_Array_Clear,_System_Array_Internal_Copy,_System_Array_Resize,_System_Array_Reverse,_System_Array_CreateInstance,_System_Console_Write,_System_Console_Internal_ReadKey,_System_Console_Internal_KeyAvailable,_System_Environment_get_TickCount,_System_Environment_GetOSVersionString,_System_Environment_get_Platform,_System_Type_GetTypeFromHandle,_System_Type_EnsureAssemblyLoaded,_System_Type_GetMethod,_System_Type_GetProperties,_System_Type_GetTypeFromName,_System_Type_get_IsValueType,_System_RuntimeType_get_Name,_System_RuntimeType_get_Namespace,_System_RuntimeType_GetNestingParentType,_System_RuntimeType_get_BaseType,_System_RuntimeType_get_IsEnum,_System_RuntimeType_get_IsGenericType,_System_RuntimeType_Internal_GetGenericTypeDefinition,_System_RuntimeType_GetGenericArguments,_System_RuntimeType_GetElementType,_System_Char_GetUnicodeCategory,_System_Char_ToLowerInvariant,_System_Char_ToUpperInvariant
,_System_GC_Collect,_System_GC_Internal_CollectionCount,_System_GC_GetTotalMemory,_System_GC_SuppressFinalize,_System_Enum_Internal_GetValue,_System_Enum_Internal_GetInfo,_System_ValueType_GetFields,_System_WeakReference_get_Target,_System_WeakReference_set_Target,_System_DateTime_InternalUtcNow,_System_Math_Sin,_System_Math_Cos,_System_Math_Tan,_System_Math_Pow,_System_Math_Sqrt,_System_Threading_Thread_ctor,_System_Threading_Thread_ctorParam,_System_Threading_Thread_Start,_System_Threading_Thread_Sleep,_System_Threading_Thread_get_CurrentThread,_System_Threading_Monitor_Internal_TryEnter,_System_Threading_Monitor_Internal_Exit,_System_Threading_Interlocked_CompareExchange_Int32,_System_Threading_Interlocked_Increment_Int32,_System_Threading_Interlocked_Decrement_Int32,_System_Threading_Interlocked_Add_Int32,_System_Threading_Interlocked_Exchange_Int32,_System_IO_FileInternal_Open,_System_IO_FileInternal_Read,_System_IO_FileInternal_Close
,_System_IO_FileInternal_GetCurrentDirectory,_System_IO_FileInternal_GetFileAttributes,_System_IO_FileInternal_GetFileSystemEntries,_System_Runtime_CompilerServices_InitializeArray,_System_Diagnostics_Debugger_Break,_System_Net_Dns_Internal_GetHostEnt,_System_Net_Sockets_Internal_CreateSocket,_System_Net_Sockets_Internal_Bind,_System_Net_Sockets_Internal_Close,_System_Net_Sockets_Internal_Listen,_System_Net_Sockets_Internal_Accept,_System_Net_Sockets_Internal_Connect,_System_Net_Sockets_Internal_Receive,_System_Net_Sockets_Internal_Send,_Framework_JSInterop_ToHeapRef,_Framework_JSInterop_FromHeapRefImpl,___stdout_write,___stdio_seek,_sn_write,_ctor,_invokeJsFunc,___stdio_write,b1,b1,b1,b1,b1,b1,b1,b1
,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1
,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1
,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1
,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1,b1];
var FUNCTION_TABLE_iii = [b2,b2,jsCall_iii_0,b2,jsCall_iii_1,b2,jsCall_iii_2,b2,jsCall_iii_3,b2,jsCall_iii_4,b2,jsCall_iii_5,b2,jsCall_iii_6,b2,jsCall_iii_7,b2,jsCall_iii_8,b2,jsCall_iii_9,b2,jsCall_iii_10,b2,jsCall_iii_11,b2,jsCall_iii_12,b2,jsCall_iii_13
,b2,jsCall_iii_14,b2,jsCall_iii_15,b2,jsCall_iii_16,b2,jsCall_iii_17,b2,jsCall_iii_18,b2,jsCall_iii_19,b2,_ignore_err,_sort,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2
,b2,b2,b2,b2,b2];
var FUNCTION_TABLE_iiiii = [b3,b3,jsCall_iiiii_0,b3,jsCall_iiiii_1,b3,jsCall_iiiii_2,b3,jsCall_iiiii_3,b3,jsCall_iiiii_4,b3,jsCall_iiiii_5,b3,jsCall_iiiii_6,b3,jsCall_iiiii_7,b3,jsCall_iiiii_8,b3,jsCall_iiiii_9,b3,jsCall_iiiii_10,b3,jsCall_iiiii_11,b3,jsCall_iiiii_12,b3,jsCall_iiiii_13
,b3,jsCall_iiiii_14,b3,jsCall_iiiii_15,b3,jsCall_iiiii_16,b3,jsCall_iiiii_17,b3,jsCall_iiiii_18,b3,jsCall_iiiii_19,b3,_Internal_ReadKey_Check,_Accept_Check,_Connect_Check,_Receive_Check,_Internal_TryEntry_Check,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3
,b3,b3,b3,b3,b3];

  return { _JSInterop_CallDotNet: _JSInterop_CallDotNet, _main: _main, ___udivdi3: ___udivdi3, _bitshift64Lshr: _bitshift64Lshr, _ntohs: _ntohs, _bitshift64Ashr: _bitshift64Ashr, _memset: _memset, _sbrk: _sbrk, _memcpy: _memcpy, _llvm_bswap_i32: _llvm_bswap_i32, ___muldi3: ___muldi3, _bitshift64Shl: _bitshift64Shl, ___uremdi3: ___uremdi3, ___divdi3: ___divdi3, _i64Subtract: _i64Subtract, ___udivmoddi4: ___udivmoddi4, _htonl: _htonl, _i64Add: _i64Add, _llvm_bswap_i16: _llvm_bswap_i16, _emscripten_get_global_libc: _emscripten_get_global_libc, ___remdi3: ___remdi3, _htons: _htons, ___errno_location: ___errno_location, ___muldsi3: ___muldsi3, _free: _free, _memmove: _memmove, _malloc: _malloc, runPostSets: runPostSets, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, establishStackSpace: establishStackSpace, setTempRet0: setTempRet0, getTempRet0: getTempRet0, setThrew: setThrew, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, establishStackSpace: establishStackSpace, setThrew: setThrew, setTempRet0: setTempRet0, getTempRet0: getTempRet0, dynCall_ii: dynCall_ii, dynCall_iiii: dynCall_iiii, dynCall_iii: dynCall_iii, dynCall_iiiii: dynCall_iiiii };
})
;