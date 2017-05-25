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

case CALL0(SINGLE):
	fRet = ((_fC)(pFn))();
	break;
case CALL0(DOUBLE):
	dRet = ((_dC)(pFn))();
	break;
case CALL0(DEFAULT):
	u64Ret = ((_uC)(pFn))();
	break;
case CALL1(SINGLE, SINGLE):
	fRet = ((_fCf)(pFn))((float)_argsd[0]);
	break;
case CALL1(SINGLE, DOUBLE):
	fRet = ((_fCd)(pFn))(_argsd[0]);
	break;
case CALL1(SINGLE, DEFAULT):
	fRet = ((_fCu)(pFn))(_args[0]);
	break;
case CALL1(DOUBLE, SINGLE):
	dRet = ((_dCf)(pFn))((float)_argsd[0]);
	break;
case CALL1(DOUBLE, DOUBLE):
	dRet = ((_dCd)(pFn))(_argsd[0]);
	break;
case CALL1(DOUBLE, DEFAULT):
	dRet = ((_dCu)(pFn))(_args[0]);
	break;
case CALL1(DEFAULT, SINGLE):
	u64Ret = ((_uCf)(pFn))((float)_argsd[0]);
	break;
case CALL1(DEFAULT, DOUBLE):
	u64Ret = ((_uCd)(pFn))(_argsd[0]);
	break;
case CALL1(DEFAULT, DEFAULT):
	u64Ret = ((_uCu)(pFn))(_args[0]);
	break;
case CALL2(SINGLE, SINGLE, SINGLE):
	fRet = ((_fCff)(pFn))((float)_argsd[0], (float)_argsd[1]);
	break;
case CALL2(SINGLE, SINGLE, DOUBLE):
	fRet = ((_fCfd)(pFn))((float)_argsd[0], _argsd[1]);
	break;
case CALL2(SINGLE, SINGLE, DEFAULT):
	fRet = ((_fCfu)(pFn))((float)_argsd[0], _args[0]);
	break;
case CALL2(SINGLE, DOUBLE, SINGLE):
	fRet = ((_fCdf)(pFn))(_argsd[0], (float)_argsd[1]);
	break;
case CALL2(SINGLE, DOUBLE, DOUBLE):
	fRet = ((_fCdd)(pFn))(_argsd[0], _argsd[1]);
	break;
case CALL2(SINGLE, DOUBLE, DEFAULT):
	fRet = ((_fCdu)(pFn))(_argsd[0], _args[0]);
	break;
case CALL2(SINGLE, DEFAULT, SINGLE):
	fRet = ((_fCuf)(pFn))(_args[0], (float)_argsd[0]);
	break;
case CALL2(SINGLE, DEFAULT, DOUBLE):
	fRet = ((_fCud)(pFn))(_args[0], _argsd[0]);
	break;
case CALL2(SINGLE, DEFAULT, DEFAULT):
	fRet = ((_fCuu)(pFn))(_args[0], _args[1]);
	break;
case CALL2(DOUBLE, SINGLE, SINGLE):
	dRet = ((_dCff)(pFn))((float)_argsd[0], (float)_argsd[1]);
	break;
case CALL2(DOUBLE, SINGLE, DOUBLE):
	dRet = ((_dCfd)(pFn))((float)_argsd[0], _argsd[1]);
	break;
case CALL2(DOUBLE, SINGLE, DEFAULT):
	dRet = ((_dCfu)(pFn))((float)_argsd[0], _args[0]);
	break;
case CALL2(DOUBLE, DOUBLE, SINGLE):
	dRet = ((_dCdf)(pFn))(_argsd[0], (float)_argsd[1]);
	break;
case CALL2(DOUBLE, DOUBLE, DOUBLE):
	dRet = ((_dCdd)(pFn))(_argsd[0], _argsd[1]);
	break;
case CALL2(DOUBLE, DOUBLE, DEFAULT):
	dRet = ((_dCdu)(pFn))(_argsd[0], _args[0]);
	break;
case CALL2(DOUBLE, DEFAULT, SINGLE):
	dRet = ((_dCuf)(pFn))(_args[0], (float)_argsd[0]);
	break;
case CALL2(DOUBLE, DEFAULT, DOUBLE):
	dRet = ((_dCud)(pFn))(_args[0], _argsd[0]);
	break;
case CALL2(DOUBLE, DEFAULT, DEFAULT):
	dRet = ((_dCuu)(pFn))(_args[0], _args[1]);
	break;
case CALL2(DEFAULT, SINGLE, SINGLE):
	u64Ret = ((_uCff)(pFn))((float)_argsd[0], (float)_argsd[1]);
	break;
case CALL2(DEFAULT, SINGLE, DOUBLE):
	u64Ret = ((_uCfd)(pFn))((float)_argsd[0], _argsd[1]);
	break;
case CALL2(DEFAULT, SINGLE, DEFAULT):
	u64Ret = ((_uCfu)(pFn))((float)_argsd[0], _args[0]);
	break;
case CALL2(DEFAULT, DOUBLE, SINGLE):
	u64Ret = ((_uCdf)(pFn))(_argsd[0], (float)_argsd[1]);
	break;
case CALL2(DEFAULT, DOUBLE, DOUBLE):
	u64Ret = ((_uCdd)(pFn))(_argsd[0], _argsd[1]);
	break;
case CALL2(DEFAULT, DOUBLE, DEFAULT):
	u64Ret = ((_uCdu)(pFn))(_argsd[0], _args[0]);
	break;
case CALL2(DEFAULT, DEFAULT, SINGLE):
	u64Ret = ((_uCuf)(pFn))(_args[0], (float)_argsd[0]);
	break;
case CALL2(DEFAULT, DEFAULT, DOUBLE):
	u64Ret = ((_uCud)(pFn))(_args[0], _argsd[0]);
	break;
case CALL2(DEFAULT, DEFAULT, DEFAULT):
	u64Ret = ((_uCuu)(pFn))(_args[0], _args[1]);
	break;
case CALL3(SINGLE, SINGLE, SINGLE, SINGLE):
	fRet = ((_fCfff)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL3(SINGLE, SINGLE, SINGLE, DOUBLE):
	fRet = ((_fCffd)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL3(SINGLE, SINGLE, SINGLE, DEFAULT):
	fRet = ((_fCffu)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0]);
	break;
case CALL3(SINGLE, SINGLE, DOUBLE, SINGLE):
	fRet = ((_fCfdf)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL3(SINGLE, SINGLE, DOUBLE, DOUBLE):
	fRet = ((_fCfdd)(pFn))((float)_argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL3(SINGLE, SINGLE, DOUBLE, DEFAULT):
	fRet = ((_fCfdu)(pFn))((float)_argsd[0], _argsd[1], _args[0]);
	break;
case CALL3(SINGLE, SINGLE, DEFAULT, SINGLE):
	fRet = ((_fCfuf)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1]);
	break;
case CALL3(SINGLE, SINGLE, DEFAULT, DOUBLE):
	fRet = ((_fCfud)(pFn))((float)_argsd[0], _args[0], _argsd[1]);
	break;
case CALL3(SINGLE, SINGLE, DEFAULT, DEFAULT):
	fRet = ((_fCfuu)(pFn))((float)_argsd[0], _args[0], _args[1]);
	break;
case CALL3(SINGLE, DOUBLE, SINGLE, SINGLE):
	fRet = ((_fCdff)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL3(SINGLE, DOUBLE, SINGLE, DOUBLE):
	fRet = ((_fCdfd)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL3(SINGLE, DOUBLE, SINGLE, DEFAULT):
	fRet = ((_fCdfu)(pFn))(_argsd[0], (float)_argsd[1], _args[0]);
	break;
case CALL3(SINGLE, DOUBLE, DOUBLE, SINGLE):
	fRet = ((_fCddf)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL3(SINGLE, DOUBLE, DOUBLE, DOUBLE):
	fRet = ((_fCddd)(pFn))(_argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL3(SINGLE, DOUBLE, DOUBLE, DEFAULT):
	fRet = ((_fCddu)(pFn))(_argsd[0], _argsd[1], _args[0]);
	break;
case CALL3(SINGLE, DOUBLE, DEFAULT, SINGLE):
	fRet = ((_fCduf)(pFn))(_argsd[0], _args[0], (float)_argsd[1]);
	break;
case CALL3(SINGLE, DOUBLE, DEFAULT, DOUBLE):
	fRet = ((_fCdud)(pFn))(_argsd[0], _args[0], _argsd[1]);
	break;
case CALL3(SINGLE, DOUBLE, DEFAULT, DEFAULT):
	fRet = ((_fCduu)(pFn))(_argsd[0], _args[0], _args[1]);
	break;
case CALL3(SINGLE, DEFAULT, SINGLE, SINGLE):
	fRet = ((_fCuff)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1]);
	break;
case CALL3(SINGLE, DEFAULT, SINGLE, DOUBLE):
	fRet = ((_fCufd)(pFn))(_args[0], (float)_argsd[0], _argsd[1]);
	break;
case CALL3(SINGLE, DEFAULT, SINGLE, DEFAULT):
	fRet = ((_fCufu)(pFn))(_args[0], (float)_argsd[0], _args[1]);
	break;
case CALL3(SINGLE, DEFAULT, DOUBLE, SINGLE):
	fRet = ((_fCudf)(pFn))(_args[0], _argsd[0], (float)_argsd[1]);
	break;
case CALL3(SINGLE, DEFAULT, DOUBLE, DOUBLE):
	fRet = ((_fCudd)(pFn))(_args[0], _argsd[0], _argsd[1]);
	break;
case CALL3(SINGLE, DEFAULT, DOUBLE, DEFAULT):
	fRet = ((_fCudu)(pFn))(_args[0], _argsd[0], _args[1]);
	break;
case CALL3(SINGLE, DEFAULT, DEFAULT, SINGLE):
	fRet = ((_fCuuf)(pFn))(_args[0], _args[1], (float)_argsd[0]);
	break;
case CALL3(SINGLE, DEFAULT, DEFAULT, DOUBLE):
	fRet = ((_fCuud)(pFn))(_args[0], _args[1], _argsd[0]);
	break;
case CALL3(SINGLE, DEFAULT, DEFAULT, DEFAULT):
	fRet = ((_fCuuu)(pFn))(_args[0], _args[1], _args[2]);
	break;
case CALL3(DOUBLE, SINGLE, SINGLE, SINGLE):
	dRet = ((_dCfff)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL3(DOUBLE, SINGLE, SINGLE, DOUBLE):
	dRet = ((_dCffd)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL3(DOUBLE, SINGLE, SINGLE, DEFAULT):
	dRet = ((_dCffu)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0]);
	break;
case CALL3(DOUBLE, SINGLE, DOUBLE, SINGLE):
	dRet = ((_dCfdf)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL3(DOUBLE, SINGLE, DOUBLE, DOUBLE):
	dRet = ((_dCfdd)(pFn))((float)_argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL3(DOUBLE, SINGLE, DOUBLE, DEFAULT):
	dRet = ((_dCfdu)(pFn))((float)_argsd[0], _argsd[1], _args[0]);
	break;
case CALL3(DOUBLE, SINGLE, DEFAULT, SINGLE):
	dRet = ((_dCfuf)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1]);
	break;
case CALL3(DOUBLE, SINGLE, DEFAULT, DOUBLE):
	dRet = ((_dCfud)(pFn))((float)_argsd[0], _args[0], _argsd[1]);
	break;
case CALL3(DOUBLE, SINGLE, DEFAULT, DEFAULT):
	dRet = ((_dCfuu)(pFn))((float)_argsd[0], _args[0], _args[1]);
	break;
case CALL3(DOUBLE, DOUBLE, SINGLE, SINGLE):
	dRet = ((_dCdff)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL3(DOUBLE, DOUBLE, SINGLE, DOUBLE):
	dRet = ((_dCdfd)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL3(DOUBLE, DOUBLE, SINGLE, DEFAULT):
	dRet = ((_dCdfu)(pFn))(_argsd[0], (float)_argsd[1], _args[0]);
	break;
case CALL3(DOUBLE, DOUBLE, DOUBLE, SINGLE):
	dRet = ((_dCddf)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL3(DOUBLE, DOUBLE, DOUBLE, DOUBLE):
	dRet = ((_dCddd)(pFn))(_argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL3(DOUBLE, DOUBLE, DOUBLE, DEFAULT):
	dRet = ((_dCddu)(pFn))(_argsd[0], _argsd[1], _args[0]);
	break;
case CALL3(DOUBLE, DOUBLE, DEFAULT, SINGLE):
	dRet = ((_dCduf)(pFn))(_argsd[0], _args[0], (float)_argsd[1]);
	break;
case CALL3(DOUBLE, DOUBLE, DEFAULT, DOUBLE):
	dRet = ((_dCdud)(pFn))(_argsd[0], _args[0], _argsd[1]);
	break;
case CALL3(DOUBLE, DOUBLE, DEFAULT, DEFAULT):
	dRet = ((_dCduu)(pFn))(_argsd[0], _args[0], _args[1]);
	break;
case CALL3(DOUBLE, DEFAULT, SINGLE, SINGLE):
	dRet = ((_dCuff)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1]);
	break;
case CALL3(DOUBLE, DEFAULT, SINGLE, DOUBLE):
	dRet = ((_dCufd)(pFn))(_args[0], (float)_argsd[0], _argsd[1]);
	break;
case CALL3(DOUBLE, DEFAULT, SINGLE, DEFAULT):
	dRet = ((_dCufu)(pFn))(_args[0], (float)_argsd[0], _args[1]);
	break;
case CALL3(DOUBLE, DEFAULT, DOUBLE, SINGLE):
	dRet = ((_dCudf)(pFn))(_args[0], _argsd[0], (float)_argsd[1]);
	break;
case CALL3(DOUBLE, DEFAULT, DOUBLE, DOUBLE):
	dRet = ((_dCudd)(pFn))(_args[0], _argsd[0], _argsd[1]);
	break;
case CALL3(DOUBLE, DEFAULT, DOUBLE, DEFAULT):
	dRet = ((_dCudu)(pFn))(_args[0], _argsd[0], _args[1]);
	break;
case CALL3(DOUBLE, DEFAULT, DEFAULT, SINGLE):
	dRet = ((_dCuuf)(pFn))(_args[0], _args[1], (float)_argsd[0]);
	break;
case CALL3(DOUBLE, DEFAULT, DEFAULT, DOUBLE):
	dRet = ((_dCuud)(pFn))(_args[0], _args[1], _argsd[0]);
	break;
case CALL3(DOUBLE, DEFAULT, DEFAULT, DEFAULT):
	dRet = ((_dCuuu)(pFn))(_args[0], _args[1], _args[2]);
	break;
case CALL3(DEFAULT, SINGLE, SINGLE, SINGLE):
	u64Ret = ((_uCfff)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL3(DEFAULT, SINGLE, SINGLE, DOUBLE):
	u64Ret = ((_uCffd)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL3(DEFAULT, SINGLE, SINGLE, DEFAULT):
	u64Ret = ((_uCffu)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0]);
	break;
case CALL3(DEFAULT, SINGLE, DOUBLE, SINGLE):
	u64Ret = ((_uCfdf)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL3(DEFAULT, SINGLE, DOUBLE, DOUBLE):
	u64Ret = ((_uCfdd)(pFn))((float)_argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL3(DEFAULT, SINGLE, DOUBLE, DEFAULT):
	u64Ret = ((_uCfdu)(pFn))((float)_argsd[0], _argsd[1], _args[0]);
	break;
case CALL3(DEFAULT, SINGLE, DEFAULT, SINGLE):
	u64Ret = ((_uCfuf)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1]);
	break;
case CALL3(DEFAULT, SINGLE, DEFAULT, DOUBLE):
	u64Ret = ((_uCfud)(pFn))((float)_argsd[0], _args[0], _argsd[1]);
	break;
case CALL3(DEFAULT, SINGLE, DEFAULT, DEFAULT):
	u64Ret = ((_uCfuu)(pFn))((float)_argsd[0], _args[0], _args[1]);
	break;
case CALL3(DEFAULT, DOUBLE, SINGLE, SINGLE):
	u64Ret = ((_uCdff)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL3(DEFAULT, DOUBLE, SINGLE, DOUBLE):
	u64Ret = ((_uCdfd)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL3(DEFAULT, DOUBLE, SINGLE, DEFAULT):
	u64Ret = ((_uCdfu)(pFn))(_argsd[0], (float)_argsd[1], _args[0]);
	break;
case CALL3(DEFAULT, DOUBLE, DOUBLE, SINGLE):
	u64Ret = ((_uCddf)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL3(DEFAULT, DOUBLE, DOUBLE, DOUBLE):
	u64Ret = ((_uCddd)(pFn))(_argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL3(DEFAULT, DOUBLE, DOUBLE, DEFAULT):
	u64Ret = ((_uCddu)(pFn))(_argsd[0], _argsd[1], _args[0]);
	break;
case CALL3(DEFAULT, DOUBLE, DEFAULT, SINGLE):
	u64Ret = ((_uCduf)(pFn))(_argsd[0], _args[0], (float)_argsd[1]);
	break;
case CALL3(DEFAULT, DOUBLE, DEFAULT, DOUBLE):
	u64Ret = ((_uCdud)(pFn))(_argsd[0], _args[0], _argsd[1]);
	break;
case CALL3(DEFAULT, DOUBLE, DEFAULT, DEFAULT):
	u64Ret = ((_uCduu)(pFn))(_argsd[0], _args[0], _args[1]);
	break;
case CALL3(DEFAULT, DEFAULT, SINGLE, SINGLE):
	u64Ret = ((_uCuff)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1]);
	break;
case CALL3(DEFAULT, DEFAULT, SINGLE, DOUBLE):
	u64Ret = ((_uCufd)(pFn))(_args[0], (float)_argsd[0], _argsd[1]);
	break;
case CALL3(DEFAULT, DEFAULT, SINGLE, DEFAULT):
	u64Ret = ((_uCufu)(pFn))(_args[0], (float)_argsd[0], _args[1]);
	break;
case CALL3(DEFAULT, DEFAULT, DOUBLE, SINGLE):
	u64Ret = ((_uCudf)(pFn))(_args[0], _argsd[0], (float)_argsd[1]);
	break;
case CALL3(DEFAULT, DEFAULT, DOUBLE, DOUBLE):
	u64Ret = ((_uCudd)(pFn))(_args[0], _argsd[0], _argsd[1]);
	break;
case CALL3(DEFAULT, DEFAULT, DOUBLE, DEFAULT):
	u64Ret = ((_uCudu)(pFn))(_args[0], _argsd[0], _args[1]);
	break;
case CALL3(DEFAULT, DEFAULT, DEFAULT, SINGLE):
	u64Ret = ((_uCuuf)(pFn))(_args[0], _args[1], (float)_argsd[0]);
	break;
case CALL3(DEFAULT, DEFAULT, DEFAULT, DOUBLE):
	u64Ret = ((_uCuud)(pFn))(_args[0], _args[1], _argsd[0]);
	break;
case CALL3(DEFAULT, DEFAULT, DEFAULT, DEFAULT):
	u64Ret = ((_uCuuu)(pFn))(_args[0], _args[1], _args[2]);
	break;
case CALL4(SINGLE, SINGLE, SINGLE, SINGLE, SINGLE):
	fRet = ((_fCffff)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(SINGLE, SINGLE, SINGLE, SINGLE, DOUBLE):
	fRet = ((_fCfffd)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(SINGLE, SINGLE, SINGLE, SINGLE, DEFAULT):
	fRet = ((_fCfffu)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(SINGLE, SINGLE, SINGLE, DOUBLE, SINGLE):
	fRet = ((_fCffdf)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(SINGLE, SINGLE, SINGLE, DOUBLE, DOUBLE):
	fRet = ((_fCffdd)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(SINGLE, SINGLE, SINGLE, DOUBLE, DEFAULT):
	fRet = ((_fCffdu)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(SINGLE, SINGLE, SINGLE, DEFAULT, SINGLE):
	fRet = ((_fCffuf)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(SINGLE, SINGLE, SINGLE, DEFAULT, DOUBLE):
	fRet = ((_fCffud)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(SINGLE, SINGLE, SINGLE, DEFAULT, DEFAULT):
	fRet = ((_fCffuu)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0], _args[1]);
	break;
case CALL4(SINGLE, SINGLE, DOUBLE, SINGLE, SINGLE):
	fRet = ((_fCfdff)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(SINGLE, SINGLE, DOUBLE, SINGLE, DOUBLE):
	fRet = ((_fCfdfd)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(SINGLE, SINGLE, DOUBLE, SINGLE, DEFAULT):
	fRet = ((_fCfdfu)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(SINGLE, SINGLE, DOUBLE, DOUBLE, SINGLE):
	fRet = ((_fCfddf)(pFn))((float)_argsd[0], _argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(SINGLE, SINGLE, DOUBLE, DOUBLE, DOUBLE):
	fRet = ((_fCfddd)(pFn))((float)_argsd[0], _argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(SINGLE, SINGLE, DOUBLE, DOUBLE, DEFAULT):
	fRet = ((_fCfddu)(pFn))((float)_argsd[0], _argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(SINGLE, SINGLE, DOUBLE, DEFAULT, SINGLE):
	fRet = ((_fCfduf)(pFn))((float)_argsd[0], _argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(SINGLE, SINGLE, DOUBLE, DEFAULT, DOUBLE):
	fRet = ((_fCfdud)(pFn))((float)_argsd[0], _argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(SINGLE, SINGLE, DOUBLE, DEFAULT, DEFAULT):
	fRet = ((_fCfduu)(pFn))((float)_argsd[0], _argsd[1], _args[0], _args[1]);
	break;
case CALL4(SINGLE, SINGLE, DEFAULT, SINGLE, SINGLE):
	fRet = ((_fCfuff)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(SINGLE, SINGLE, DEFAULT, SINGLE, DOUBLE):
	fRet = ((_fCfufd)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(SINGLE, SINGLE, DEFAULT, SINGLE, DEFAULT):
	fRet = ((_fCfufu)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(SINGLE, SINGLE, DEFAULT, DOUBLE, SINGLE):
	fRet = ((_fCfudf)(pFn))((float)_argsd[0], _args[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(SINGLE, SINGLE, DEFAULT, DOUBLE, DOUBLE):
	fRet = ((_fCfudd)(pFn))((float)_argsd[0], _args[0], _argsd[1], _argsd[2]);
	break;
case CALL4(SINGLE, SINGLE, DEFAULT, DOUBLE, DEFAULT):
	fRet = ((_fCfudu)(pFn))((float)_argsd[0], _args[0], _argsd[1], _args[1]);
	break;
case CALL4(SINGLE, SINGLE, DEFAULT, DEFAULT, SINGLE):
	fRet = ((_fCfuuf)(pFn))((float)_argsd[0], _args[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(SINGLE, SINGLE, DEFAULT, DEFAULT, DOUBLE):
	fRet = ((_fCfuud)(pFn))((float)_argsd[0], _args[0], _args[1], _argsd[1]);
	break;
case CALL4(SINGLE, SINGLE, DEFAULT, DEFAULT, DEFAULT):
	fRet = ((_fCfuuu)(pFn))((float)_argsd[0], _args[0], _args[1], _args[2]);
	break;
case CALL4(SINGLE, DOUBLE, SINGLE, SINGLE, SINGLE):
	fRet = ((_fCdfff)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(SINGLE, DOUBLE, SINGLE, SINGLE, DOUBLE):
	fRet = ((_fCdffd)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(SINGLE, DOUBLE, SINGLE, SINGLE, DEFAULT):
	fRet = ((_fCdffu)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(SINGLE, DOUBLE, SINGLE, DOUBLE, SINGLE):
	fRet = ((_fCdfdf)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(SINGLE, DOUBLE, SINGLE, DOUBLE, DOUBLE):
	fRet = ((_fCdfdd)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(SINGLE, DOUBLE, SINGLE, DOUBLE, DEFAULT):
	fRet = ((_fCdfdu)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(SINGLE, DOUBLE, SINGLE, DEFAULT, SINGLE):
	fRet = ((_fCdfuf)(pFn))(_argsd[0], (float)_argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(SINGLE, DOUBLE, SINGLE, DEFAULT, DOUBLE):
	fRet = ((_fCdfud)(pFn))(_argsd[0], (float)_argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(SINGLE, DOUBLE, SINGLE, DEFAULT, DEFAULT):
	fRet = ((_fCdfuu)(pFn))(_argsd[0], (float)_argsd[1], _args[0], _args[1]);
	break;
case CALL4(SINGLE, DOUBLE, DOUBLE, SINGLE, SINGLE):
	fRet = ((_fCddff)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(SINGLE, DOUBLE, DOUBLE, SINGLE, DOUBLE):
	fRet = ((_fCddfd)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(SINGLE, DOUBLE, DOUBLE, SINGLE, DEFAULT):
	fRet = ((_fCddfu)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(SINGLE, DOUBLE, DOUBLE, DOUBLE, SINGLE):
	fRet = ((_fCdddf)(pFn))(_argsd[0], _argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(SINGLE, DOUBLE, DOUBLE, DOUBLE, DOUBLE):
	fRet = ((_fCdddd)(pFn))(_argsd[0], _argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(SINGLE, DOUBLE, DOUBLE, DOUBLE, DEFAULT):
	fRet = ((_fCdddu)(pFn))(_argsd[0], _argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(SINGLE, DOUBLE, DOUBLE, DEFAULT, SINGLE):
	fRet = ((_fCdduf)(pFn))(_argsd[0], _argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(SINGLE, DOUBLE, DOUBLE, DEFAULT, DOUBLE):
	fRet = ((_fCddud)(pFn))(_argsd[0], _argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(SINGLE, DOUBLE, DOUBLE, DEFAULT, DEFAULT):
	fRet = ((_fCdduu)(pFn))(_argsd[0], _argsd[1], _args[0], _args[1]);
	break;
case CALL4(SINGLE, DOUBLE, DEFAULT, SINGLE, SINGLE):
	fRet = ((_fCduff)(pFn))(_argsd[0], _args[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(SINGLE, DOUBLE, DEFAULT, SINGLE, DOUBLE):
	fRet = ((_fCdufd)(pFn))(_argsd[0], _args[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(SINGLE, DOUBLE, DEFAULT, SINGLE, DEFAULT):
	fRet = ((_fCdufu)(pFn))(_argsd[0], _args[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(SINGLE, DOUBLE, DEFAULT, DOUBLE, SINGLE):
	fRet = ((_fCdudf)(pFn))(_argsd[0], _args[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(SINGLE, DOUBLE, DEFAULT, DOUBLE, DOUBLE):
	fRet = ((_fCdudd)(pFn))(_argsd[0], _args[0], _argsd[1], _argsd[2]);
	break;
case CALL4(SINGLE, DOUBLE, DEFAULT, DOUBLE, DEFAULT):
	fRet = ((_fCdudu)(pFn))(_argsd[0], _args[0], _argsd[1], _args[1]);
	break;
case CALL4(SINGLE, DOUBLE, DEFAULT, DEFAULT, SINGLE):
	fRet = ((_fCduuf)(pFn))(_argsd[0], _args[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(SINGLE, DOUBLE, DEFAULT, DEFAULT, DOUBLE):
	fRet = ((_fCduud)(pFn))(_argsd[0], _args[0], _args[1], _argsd[1]);
	break;
case CALL4(SINGLE, DOUBLE, DEFAULT, DEFAULT, DEFAULT):
	fRet = ((_fCduuu)(pFn))(_argsd[0], _args[0], _args[1], _args[2]);
	break;
case CALL4(SINGLE, DEFAULT, SINGLE, SINGLE, SINGLE):
	fRet = ((_fCufff)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(SINGLE, DEFAULT, SINGLE, SINGLE, DOUBLE):
	fRet = ((_fCuffd)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(SINGLE, DEFAULT, SINGLE, SINGLE, DEFAULT):
	fRet = ((_fCuffu)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(SINGLE, DEFAULT, SINGLE, DOUBLE, SINGLE):
	fRet = ((_fCufdf)(pFn))(_args[0], (float)_argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(SINGLE, DEFAULT, SINGLE, DOUBLE, DOUBLE):
	fRet = ((_fCufdd)(pFn))(_args[0], (float)_argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL4(SINGLE, DEFAULT, SINGLE, DOUBLE, DEFAULT):
	fRet = ((_fCufdu)(pFn))(_args[0], (float)_argsd[0], _argsd[1], _args[1]);
	break;
case CALL4(SINGLE, DEFAULT, SINGLE, DEFAULT, SINGLE):
	fRet = ((_fCufuf)(pFn))(_args[0], (float)_argsd[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(SINGLE, DEFAULT, SINGLE, DEFAULT, DOUBLE):
	fRet = ((_fCufud)(pFn))(_args[0], (float)_argsd[0], _args[1], _argsd[1]);
	break;
case CALL4(SINGLE, DEFAULT, SINGLE, DEFAULT, DEFAULT):
	fRet = ((_fCufuu)(pFn))(_args[0], (float)_argsd[0], _args[1], _args[2]);
	break;
case CALL4(SINGLE, DEFAULT, DOUBLE, SINGLE, SINGLE):
	fRet = ((_fCudff)(pFn))(_args[0], _argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(SINGLE, DEFAULT, DOUBLE, SINGLE, DOUBLE):
	fRet = ((_fCudfd)(pFn))(_args[0], _argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(SINGLE, DEFAULT, DOUBLE, SINGLE, DEFAULT):
	fRet = ((_fCudfu)(pFn))(_args[0], _argsd[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(SINGLE, DEFAULT, DOUBLE, DOUBLE, SINGLE):
	fRet = ((_fCuddf)(pFn))(_args[0], _argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(SINGLE, DEFAULT, DOUBLE, DOUBLE, DOUBLE):
	fRet = ((_fCuddd)(pFn))(_args[0], _argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL4(SINGLE, DEFAULT, DOUBLE, DOUBLE, DEFAULT):
	fRet = ((_fCuddu)(pFn))(_args[0], _argsd[0], _argsd[1], _args[1]);
	break;
case CALL4(SINGLE, DEFAULT, DOUBLE, DEFAULT, SINGLE):
	fRet = ((_fCuduf)(pFn))(_args[0], _argsd[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(SINGLE, DEFAULT, DOUBLE, DEFAULT, DOUBLE):
	fRet = ((_fCudud)(pFn))(_args[0], _argsd[0], _args[1], _argsd[1]);
	break;
case CALL4(SINGLE, DEFAULT, DOUBLE, DEFAULT, DEFAULT):
	fRet = ((_fCuduu)(pFn))(_args[0], _argsd[0], _args[1], _args[2]);
	break;
case CALL4(SINGLE, DEFAULT, DEFAULT, SINGLE, SINGLE):
	fRet = ((_fCuuff)(pFn))(_args[0], _args[1], (float)_argsd[0], (float)_argsd[1]);
	break;
case CALL4(SINGLE, DEFAULT, DEFAULT, SINGLE, DOUBLE):
	fRet = ((_fCuufd)(pFn))(_args[0], _args[1], (float)_argsd[0], _argsd[1]);
	break;
case CALL4(SINGLE, DEFAULT, DEFAULT, SINGLE, DEFAULT):
	fRet = ((_fCuufu)(pFn))(_args[0], _args[1], (float)_argsd[0], _args[2]);
	break;
case CALL4(SINGLE, DEFAULT, DEFAULT, DOUBLE, SINGLE):
	fRet = ((_fCuudf)(pFn))(_args[0], _args[1], _argsd[0], (float)_argsd[1]);
	break;
case CALL4(SINGLE, DEFAULT, DEFAULT, DOUBLE, DOUBLE):
	fRet = ((_fCuudd)(pFn))(_args[0], _args[1], _argsd[0], _argsd[1]);
	break;
case CALL4(SINGLE, DEFAULT, DEFAULT, DOUBLE, DEFAULT):
	fRet = ((_fCuudu)(pFn))(_args[0], _args[1], _argsd[0], _args[2]);
	break;
case CALL4(SINGLE, DEFAULT, DEFAULT, DEFAULT, SINGLE):
	fRet = ((_fCuuuf)(pFn))(_args[0], _args[1], _args[2], (float)_argsd[0]);
	break;
case CALL4(SINGLE, DEFAULT, DEFAULT, DEFAULT, DOUBLE):
	fRet = ((_fCuuud)(pFn))(_args[0], _args[1], _args[2], _argsd[0]);
	break;
case CALL4(SINGLE, DEFAULT, DEFAULT, DEFAULT, DEFAULT):
	fRet = ((_fCuuuu)(pFn))(_args[0], _args[1], _args[2], _args[3]);
	break;
case CALL4(DOUBLE, SINGLE, SINGLE, SINGLE, SINGLE):
	dRet = ((_dCffff)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(DOUBLE, SINGLE, SINGLE, SINGLE, DOUBLE):
	dRet = ((_dCfffd)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(DOUBLE, SINGLE, SINGLE, SINGLE, DEFAULT):
	dRet = ((_dCfffu)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(DOUBLE, SINGLE, SINGLE, DOUBLE, SINGLE):
	dRet = ((_dCffdf)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(DOUBLE, SINGLE, SINGLE, DOUBLE, DOUBLE):
	dRet = ((_dCffdd)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(DOUBLE, SINGLE, SINGLE, DOUBLE, DEFAULT):
	dRet = ((_dCffdu)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(DOUBLE, SINGLE, SINGLE, DEFAULT, SINGLE):
	dRet = ((_dCffuf)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, SINGLE, SINGLE, DEFAULT, DOUBLE):
	dRet = ((_dCffud)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(DOUBLE, SINGLE, SINGLE, DEFAULT, DEFAULT):
	dRet = ((_dCffuu)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0], _args[1]);
	break;
case CALL4(DOUBLE, SINGLE, DOUBLE, SINGLE, SINGLE):
	dRet = ((_dCfdff)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(DOUBLE, SINGLE, DOUBLE, SINGLE, DOUBLE):
	dRet = ((_dCfdfd)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(DOUBLE, SINGLE, DOUBLE, SINGLE, DEFAULT):
	dRet = ((_dCfdfu)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(DOUBLE, SINGLE, DOUBLE, DOUBLE, SINGLE):
	dRet = ((_dCfddf)(pFn))((float)_argsd[0], _argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(DOUBLE, SINGLE, DOUBLE, DOUBLE, DOUBLE):
	dRet = ((_dCfddd)(pFn))((float)_argsd[0], _argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(DOUBLE, SINGLE, DOUBLE, DOUBLE, DEFAULT):
	dRet = ((_dCfddu)(pFn))((float)_argsd[0], _argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(DOUBLE, SINGLE, DOUBLE, DEFAULT, SINGLE):
	dRet = ((_dCfduf)(pFn))((float)_argsd[0], _argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, SINGLE, DOUBLE, DEFAULT, DOUBLE):
	dRet = ((_dCfdud)(pFn))((float)_argsd[0], _argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(DOUBLE, SINGLE, DOUBLE, DEFAULT, DEFAULT):
	dRet = ((_dCfduu)(pFn))((float)_argsd[0], _argsd[1], _args[0], _args[1]);
	break;
case CALL4(DOUBLE, SINGLE, DEFAULT, SINGLE, SINGLE):
	dRet = ((_dCfuff)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, SINGLE, DEFAULT, SINGLE, DOUBLE):
	dRet = ((_dCfufd)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(DOUBLE, SINGLE, DEFAULT, SINGLE, DEFAULT):
	dRet = ((_dCfufu)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(DOUBLE, SINGLE, DEFAULT, DOUBLE, SINGLE):
	dRet = ((_dCfudf)(pFn))((float)_argsd[0], _args[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, SINGLE, DEFAULT, DOUBLE, DOUBLE):
	dRet = ((_dCfudd)(pFn))((float)_argsd[0], _args[0], _argsd[1], _argsd[2]);
	break;
case CALL4(DOUBLE, SINGLE, DEFAULT, DOUBLE, DEFAULT):
	dRet = ((_dCfudu)(pFn))((float)_argsd[0], _args[0], _argsd[1], _args[1]);
	break;
case CALL4(DOUBLE, SINGLE, DEFAULT, DEFAULT, SINGLE):
	dRet = ((_dCfuuf)(pFn))((float)_argsd[0], _args[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(DOUBLE, SINGLE, DEFAULT, DEFAULT, DOUBLE):
	dRet = ((_dCfuud)(pFn))((float)_argsd[0], _args[0], _args[1], _argsd[1]);
	break;
case CALL4(DOUBLE, SINGLE, DEFAULT, DEFAULT, DEFAULT):
	dRet = ((_dCfuuu)(pFn))((float)_argsd[0], _args[0], _args[1], _args[2]);
	break;
case CALL4(DOUBLE, DOUBLE, SINGLE, SINGLE, SINGLE):
	dRet = ((_dCdfff)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(DOUBLE, DOUBLE, SINGLE, SINGLE, DOUBLE):
	dRet = ((_dCdffd)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(DOUBLE, DOUBLE, SINGLE, SINGLE, DEFAULT):
	dRet = ((_dCdffu)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(DOUBLE, DOUBLE, SINGLE, DOUBLE, SINGLE):
	dRet = ((_dCdfdf)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(DOUBLE, DOUBLE, SINGLE, DOUBLE, DOUBLE):
	dRet = ((_dCdfdd)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(DOUBLE, DOUBLE, SINGLE, DOUBLE, DEFAULT):
	dRet = ((_dCdfdu)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(DOUBLE, DOUBLE, SINGLE, DEFAULT, SINGLE):
	dRet = ((_dCdfuf)(pFn))(_argsd[0], (float)_argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, DOUBLE, SINGLE, DEFAULT, DOUBLE):
	dRet = ((_dCdfud)(pFn))(_argsd[0], (float)_argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(DOUBLE, DOUBLE, SINGLE, DEFAULT, DEFAULT):
	dRet = ((_dCdfuu)(pFn))(_argsd[0], (float)_argsd[1], _args[0], _args[1]);
	break;
case CALL4(DOUBLE, DOUBLE, DOUBLE, SINGLE, SINGLE):
	dRet = ((_dCddff)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(DOUBLE, DOUBLE, DOUBLE, SINGLE, DOUBLE):
	dRet = ((_dCddfd)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(DOUBLE, DOUBLE, DOUBLE, SINGLE, DEFAULT):
	dRet = ((_dCddfu)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(DOUBLE, DOUBLE, DOUBLE, DOUBLE, SINGLE):
	dRet = ((_dCdddf)(pFn))(_argsd[0], _argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(DOUBLE, DOUBLE, DOUBLE, DOUBLE, DOUBLE):
	dRet = ((_dCdddd)(pFn))(_argsd[0], _argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(DOUBLE, DOUBLE, DOUBLE, DOUBLE, DEFAULT):
	dRet = ((_dCdddu)(pFn))(_argsd[0], _argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(DOUBLE, DOUBLE, DOUBLE, DEFAULT, SINGLE):
	dRet = ((_dCdduf)(pFn))(_argsd[0], _argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, DOUBLE, DOUBLE, DEFAULT, DOUBLE):
	dRet = ((_dCddud)(pFn))(_argsd[0], _argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(DOUBLE, DOUBLE, DOUBLE, DEFAULT, DEFAULT):
	dRet = ((_dCdduu)(pFn))(_argsd[0], _argsd[1], _args[0], _args[1]);
	break;
case CALL4(DOUBLE, DOUBLE, DEFAULT, SINGLE, SINGLE):
	dRet = ((_dCduff)(pFn))(_argsd[0], _args[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, DOUBLE, DEFAULT, SINGLE, DOUBLE):
	dRet = ((_dCdufd)(pFn))(_argsd[0], _args[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(DOUBLE, DOUBLE, DEFAULT, SINGLE, DEFAULT):
	dRet = ((_dCdufu)(pFn))(_argsd[0], _args[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(DOUBLE, DOUBLE, DEFAULT, DOUBLE, SINGLE):
	dRet = ((_dCdudf)(pFn))(_argsd[0], _args[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, DOUBLE, DEFAULT, DOUBLE, DOUBLE):
	dRet = ((_dCdudd)(pFn))(_argsd[0], _args[0], _argsd[1], _argsd[2]);
	break;
case CALL4(DOUBLE, DOUBLE, DEFAULT, DOUBLE, DEFAULT):
	dRet = ((_dCdudu)(pFn))(_argsd[0], _args[0], _argsd[1], _args[1]);
	break;
case CALL4(DOUBLE, DOUBLE, DEFAULT, DEFAULT, SINGLE):
	dRet = ((_dCduuf)(pFn))(_argsd[0], _args[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(DOUBLE, DOUBLE, DEFAULT, DEFAULT, DOUBLE):
	dRet = ((_dCduud)(pFn))(_argsd[0], _args[0], _args[1], _argsd[1]);
	break;
case CALL4(DOUBLE, DOUBLE, DEFAULT, DEFAULT, DEFAULT):
	dRet = ((_dCduuu)(pFn))(_argsd[0], _args[0], _args[1], _args[2]);
	break;
case CALL4(DOUBLE, DEFAULT, SINGLE, SINGLE, SINGLE):
	dRet = ((_dCufff)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, DEFAULT, SINGLE, SINGLE, DOUBLE):
	dRet = ((_dCuffd)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(DOUBLE, DEFAULT, SINGLE, SINGLE, DEFAULT):
	dRet = ((_dCuffu)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(DOUBLE, DEFAULT, SINGLE, DOUBLE, SINGLE):
	dRet = ((_dCufdf)(pFn))(_args[0], (float)_argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, DEFAULT, SINGLE, DOUBLE, DOUBLE):
	dRet = ((_dCufdd)(pFn))(_args[0], (float)_argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL4(DOUBLE, DEFAULT, SINGLE, DOUBLE, DEFAULT):
	dRet = ((_dCufdu)(pFn))(_args[0], (float)_argsd[0], _argsd[1], _args[1]);
	break;
case CALL4(DOUBLE, DEFAULT, SINGLE, DEFAULT, SINGLE):
	dRet = ((_dCufuf)(pFn))(_args[0], (float)_argsd[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(DOUBLE, DEFAULT, SINGLE, DEFAULT, DOUBLE):
	dRet = ((_dCufud)(pFn))(_args[0], (float)_argsd[0], _args[1], _argsd[1]);
	break;
case CALL4(DOUBLE, DEFAULT, SINGLE, DEFAULT, DEFAULT):
	dRet = ((_dCufuu)(pFn))(_args[0], (float)_argsd[0], _args[1], _args[2]);
	break;
case CALL4(DOUBLE, DEFAULT, DOUBLE, SINGLE, SINGLE):
	dRet = ((_dCudff)(pFn))(_args[0], _argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, DEFAULT, DOUBLE, SINGLE, DOUBLE):
	dRet = ((_dCudfd)(pFn))(_args[0], _argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(DOUBLE, DEFAULT, DOUBLE, SINGLE, DEFAULT):
	dRet = ((_dCudfu)(pFn))(_args[0], _argsd[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(DOUBLE, DEFAULT, DOUBLE, DOUBLE, SINGLE):
	dRet = ((_dCuddf)(pFn))(_args[0], _argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(DOUBLE, DEFAULT, DOUBLE, DOUBLE, DOUBLE):
	dRet = ((_dCuddd)(pFn))(_args[0], _argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL4(DOUBLE, DEFAULT, DOUBLE, DOUBLE, DEFAULT):
	dRet = ((_dCuddu)(pFn))(_args[0], _argsd[0], _argsd[1], _args[1]);
	break;
case CALL4(DOUBLE, DEFAULT, DOUBLE, DEFAULT, SINGLE):
	dRet = ((_dCuduf)(pFn))(_args[0], _argsd[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(DOUBLE, DEFAULT, DOUBLE, DEFAULT, DOUBLE):
	dRet = ((_dCudud)(pFn))(_args[0], _argsd[0], _args[1], _argsd[1]);
	break;
case CALL4(DOUBLE, DEFAULT, DOUBLE, DEFAULT, DEFAULT):
	dRet = ((_dCuduu)(pFn))(_args[0], _argsd[0], _args[1], _args[2]);
	break;
case CALL4(DOUBLE, DEFAULT, DEFAULT, SINGLE, SINGLE):
	dRet = ((_dCuuff)(pFn))(_args[0], _args[1], (float)_argsd[0], (float)_argsd[1]);
	break;
case CALL4(DOUBLE, DEFAULT, DEFAULT, SINGLE, DOUBLE):
	dRet = ((_dCuufd)(pFn))(_args[0], _args[1], (float)_argsd[0], _argsd[1]);
	break;
case CALL4(DOUBLE, DEFAULT, DEFAULT, SINGLE, DEFAULT):
	dRet = ((_dCuufu)(pFn))(_args[0], _args[1], (float)_argsd[0], _args[2]);
	break;
case CALL4(DOUBLE, DEFAULT, DEFAULT, DOUBLE, SINGLE):
	dRet = ((_dCuudf)(pFn))(_args[0], _args[1], _argsd[0], (float)_argsd[1]);
	break;
case CALL4(DOUBLE, DEFAULT, DEFAULT, DOUBLE, DOUBLE):
	dRet = ((_dCuudd)(pFn))(_args[0], _args[1], _argsd[0], _argsd[1]);
	break;
case CALL4(DOUBLE, DEFAULT, DEFAULT, DOUBLE, DEFAULT):
	dRet = ((_dCuudu)(pFn))(_args[0], _args[1], _argsd[0], _args[2]);
	break;
case CALL4(DOUBLE, DEFAULT, DEFAULT, DEFAULT, SINGLE):
	dRet = ((_dCuuuf)(pFn))(_args[0], _args[1], _args[2], (float)_argsd[0]);
	break;
case CALL4(DOUBLE, DEFAULT, DEFAULT, DEFAULT, DOUBLE):
	dRet = ((_dCuuud)(pFn))(_args[0], _args[1], _args[2], _argsd[0]);
	break;
case CALL4(DOUBLE, DEFAULT, DEFAULT, DEFAULT, DEFAULT):
	dRet = ((_dCuuuu)(pFn))(_args[0], _args[1], _args[2], _args[3]);
	break;
case CALL4(DEFAULT, SINGLE, SINGLE, SINGLE, SINGLE):
	u64Ret = ((_uCffff)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(DEFAULT, SINGLE, SINGLE, SINGLE, DOUBLE):
	u64Ret = ((_uCfffd)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(DEFAULT, SINGLE, SINGLE, SINGLE, DEFAULT):
	u64Ret = ((_uCfffu)(pFn))((float)_argsd[0], (float)_argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(DEFAULT, SINGLE, SINGLE, DOUBLE, SINGLE):
	u64Ret = ((_uCffdf)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(DEFAULT, SINGLE, SINGLE, DOUBLE, DOUBLE):
	u64Ret = ((_uCffdd)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(DEFAULT, SINGLE, SINGLE, DOUBLE, DEFAULT):
	u64Ret = ((_uCffdu)(pFn))((float)_argsd[0], (float)_argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(DEFAULT, SINGLE, SINGLE, DEFAULT, SINGLE):
	u64Ret = ((_uCffuf)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, SINGLE, SINGLE, DEFAULT, DOUBLE):
	u64Ret = ((_uCffud)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(DEFAULT, SINGLE, SINGLE, DEFAULT, DEFAULT):
	u64Ret = ((_uCffuu)(pFn))((float)_argsd[0], (float)_argsd[1], _args[0], _args[1]);
	break;
case CALL4(DEFAULT, SINGLE, DOUBLE, SINGLE, SINGLE):
	u64Ret = ((_uCfdff)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(DEFAULT, SINGLE, DOUBLE, SINGLE, DOUBLE):
	u64Ret = ((_uCfdfd)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(DEFAULT, SINGLE, DOUBLE, SINGLE, DEFAULT):
	u64Ret = ((_uCfdfu)(pFn))((float)_argsd[0], _argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(DEFAULT, SINGLE, DOUBLE, DOUBLE, SINGLE):
	u64Ret = ((_uCfddf)(pFn))((float)_argsd[0], _argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(DEFAULT, SINGLE, DOUBLE, DOUBLE, DOUBLE):
	u64Ret = ((_uCfddd)(pFn))((float)_argsd[0], _argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(DEFAULT, SINGLE, DOUBLE, DOUBLE, DEFAULT):
	u64Ret = ((_uCfddu)(pFn))((float)_argsd[0], _argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(DEFAULT, SINGLE, DOUBLE, DEFAULT, SINGLE):
	u64Ret = ((_uCfduf)(pFn))((float)_argsd[0], _argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, SINGLE, DOUBLE, DEFAULT, DOUBLE):
	u64Ret = ((_uCfdud)(pFn))((float)_argsd[0], _argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(DEFAULT, SINGLE, DOUBLE, DEFAULT, DEFAULT):
	u64Ret = ((_uCfduu)(pFn))((float)_argsd[0], _argsd[1], _args[0], _args[1]);
	break;
case CALL4(DEFAULT, SINGLE, DEFAULT, SINGLE, SINGLE):
	u64Ret = ((_uCfuff)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, SINGLE, DEFAULT, SINGLE, DOUBLE):
	u64Ret = ((_uCfufd)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(DEFAULT, SINGLE, DEFAULT, SINGLE, DEFAULT):
	u64Ret = ((_uCfufu)(pFn))((float)_argsd[0], _args[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(DEFAULT, SINGLE, DEFAULT, DOUBLE, SINGLE):
	u64Ret = ((_uCfudf)(pFn))((float)_argsd[0], _args[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, SINGLE, DEFAULT, DOUBLE, DOUBLE):
	u64Ret = ((_uCfudd)(pFn))((float)_argsd[0], _args[0], _argsd[1], _argsd[2]);
	break;
case CALL4(DEFAULT, SINGLE, DEFAULT, DOUBLE, DEFAULT):
	u64Ret = ((_uCfudu)(pFn))((float)_argsd[0], _args[0], _argsd[1], _args[1]);
	break;
case CALL4(DEFAULT, SINGLE, DEFAULT, DEFAULT, SINGLE):
	u64Ret = ((_uCfuuf)(pFn))((float)_argsd[0], _args[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(DEFAULT, SINGLE, DEFAULT, DEFAULT, DOUBLE):
	u64Ret = ((_uCfuud)(pFn))((float)_argsd[0], _args[0], _args[1], _argsd[1]);
	break;
case CALL4(DEFAULT, SINGLE, DEFAULT, DEFAULT, DEFAULT):
	u64Ret = ((_uCfuuu)(pFn))((float)_argsd[0], _args[0], _args[1], _args[2]);
	break;
case CALL4(DEFAULT, DOUBLE, SINGLE, SINGLE, SINGLE):
	u64Ret = ((_uCdfff)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(DEFAULT, DOUBLE, SINGLE, SINGLE, DOUBLE):
	u64Ret = ((_uCdffd)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(DEFAULT, DOUBLE, SINGLE, SINGLE, DEFAULT):
	u64Ret = ((_uCdffu)(pFn))(_argsd[0], (float)_argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(DEFAULT, DOUBLE, SINGLE, DOUBLE, SINGLE):
	u64Ret = ((_uCdfdf)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(DEFAULT, DOUBLE, SINGLE, DOUBLE, DOUBLE):
	u64Ret = ((_uCdfdd)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(DEFAULT, DOUBLE, SINGLE, DOUBLE, DEFAULT):
	u64Ret = ((_uCdfdu)(pFn))(_argsd[0], (float)_argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(DEFAULT, DOUBLE, SINGLE, DEFAULT, SINGLE):
	u64Ret = ((_uCdfuf)(pFn))(_argsd[0], (float)_argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, DOUBLE, SINGLE, DEFAULT, DOUBLE):
	u64Ret = ((_uCdfud)(pFn))(_argsd[0], (float)_argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(DEFAULT, DOUBLE, SINGLE, DEFAULT, DEFAULT):
	u64Ret = ((_uCdfuu)(pFn))(_argsd[0], (float)_argsd[1], _args[0], _args[1]);
	break;
case CALL4(DEFAULT, DOUBLE, DOUBLE, SINGLE, SINGLE):
	u64Ret = ((_uCddff)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2], (float)_argsd[3]);
	break;
case CALL4(DEFAULT, DOUBLE, DOUBLE, SINGLE, DOUBLE):
	u64Ret = ((_uCddfd)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2], _argsd[3]);
	break;
case CALL4(DEFAULT, DOUBLE, DOUBLE, SINGLE, DEFAULT):
	u64Ret = ((_uCddfu)(pFn))(_argsd[0], _argsd[1], (float)_argsd[2], _args[0]);
	break;
case CALL4(DEFAULT, DOUBLE, DOUBLE, DOUBLE, SINGLE):
	u64Ret = ((_uCdddf)(pFn))(_argsd[0], _argsd[1], _argsd[2], (float)_argsd[3]);
	break;
case CALL4(DEFAULT, DOUBLE, DOUBLE, DOUBLE, DOUBLE):
	u64Ret = ((_uCdddd)(pFn))(_argsd[0], _argsd[1], _argsd[2], _argsd[3]);
	break;
case CALL4(DEFAULT, DOUBLE, DOUBLE, DOUBLE, DEFAULT):
	u64Ret = ((_uCdddu)(pFn))(_argsd[0], _argsd[1], _argsd[2], _args[0]);
	break;
case CALL4(DEFAULT, DOUBLE, DOUBLE, DEFAULT, SINGLE):
	u64Ret = ((_uCdduf)(pFn))(_argsd[0], _argsd[1], _args[0], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, DOUBLE, DOUBLE, DEFAULT, DOUBLE):
	u64Ret = ((_uCddud)(pFn))(_argsd[0], _argsd[1], _args[0], _argsd[2]);
	break;
case CALL4(DEFAULT, DOUBLE, DOUBLE, DEFAULT, DEFAULT):
	u64Ret = ((_uCdduu)(pFn))(_argsd[0], _argsd[1], _args[0], _args[1]);
	break;
case CALL4(DEFAULT, DOUBLE, DEFAULT, SINGLE, SINGLE):
	u64Ret = ((_uCduff)(pFn))(_argsd[0], _args[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, DOUBLE, DEFAULT, SINGLE, DOUBLE):
	u64Ret = ((_uCdufd)(pFn))(_argsd[0], _args[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(DEFAULT, DOUBLE, DEFAULT, SINGLE, DEFAULT):
	u64Ret = ((_uCdufu)(pFn))(_argsd[0], _args[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(DEFAULT, DOUBLE, DEFAULT, DOUBLE, SINGLE):
	u64Ret = ((_uCdudf)(pFn))(_argsd[0], _args[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, DOUBLE, DEFAULT, DOUBLE, DOUBLE):
	u64Ret = ((_uCdudd)(pFn))(_argsd[0], _args[0], _argsd[1], _argsd[2]);
	break;
case CALL4(DEFAULT, DOUBLE, DEFAULT, DOUBLE, DEFAULT):
	u64Ret = ((_uCdudu)(pFn))(_argsd[0], _args[0], _argsd[1], _args[1]);
	break;
case CALL4(DEFAULT, DOUBLE, DEFAULT, DEFAULT, SINGLE):
	u64Ret = ((_uCduuf)(pFn))(_argsd[0], _args[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(DEFAULT, DOUBLE, DEFAULT, DEFAULT, DOUBLE):
	u64Ret = ((_uCduud)(pFn))(_argsd[0], _args[0], _args[1], _argsd[1]);
	break;
case CALL4(DEFAULT, DOUBLE, DEFAULT, DEFAULT, DEFAULT):
	u64Ret = ((_uCduuu)(pFn))(_argsd[0], _args[0], _args[1], _args[2]);
	break;
case CALL4(DEFAULT, DEFAULT, SINGLE, SINGLE, SINGLE):
	u64Ret = ((_uCufff)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, DEFAULT, SINGLE, SINGLE, DOUBLE):
	u64Ret = ((_uCuffd)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(DEFAULT, DEFAULT, SINGLE, SINGLE, DEFAULT):
	u64Ret = ((_uCuffu)(pFn))(_args[0], (float)_argsd[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(DEFAULT, DEFAULT, SINGLE, DOUBLE, SINGLE):
	u64Ret = ((_uCufdf)(pFn))(_args[0], (float)_argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, DEFAULT, SINGLE, DOUBLE, DOUBLE):
	u64Ret = ((_uCufdd)(pFn))(_args[0], (float)_argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL4(DEFAULT, DEFAULT, SINGLE, DOUBLE, DEFAULT):
	u64Ret = ((_uCufdu)(pFn))(_args[0], (float)_argsd[0], _argsd[1], _args[1]);
	break;
case CALL4(DEFAULT, DEFAULT, SINGLE, DEFAULT, SINGLE):
	u64Ret = ((_uCufuf)(pFn))(_args[0], (float)_argsd[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(DEFAULT, DEFAULT, SINGLE, DEFAULT, DOUBLE):
	u64Ret = ((_uCufud)(pFn))(_args[0], (float)_argsd[0], _args[1], _argsd[1]);
	break;
case CALL4(DEFAULT, DEFAULT, SINGLE, DEFAULT, DEFAULT):
	u64Ret = ((_uCufuu)(pFn))(_args[0], (float)_argsd[0], _args[1], _args[2]);
	break;
case CALL4(DEFAULT, DEFAULT, DOUBLE, SINGLE, SINGLE):
	u64Ret = ((_uCudff)(pFn))(_args[0], _argsd[0], (float)_argsd[1], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, DEFAULT, DOUBLE, SINGLE, DOUBLE):
	u64Ret = ((_uCudfd)(pFn))(_args[0], _argsd[0], (float)_argsd[1], _argsd[2]);
	break;
case CALL4(DEFAULT, DEFAULT, DOUBLE, SINGLE, DEFAULT):
	u64Ret = ((_uCudfu)(pFn))(_args[0], _argsd[0], (float)_argsd[1], _args[1]);
	break;
case CALL4(DEFAULT, DEFAULT, DOUBLE, DOUBLE, SINGLE):
	u64Ret = ((_uCuddf)(pFn))(_args[0], _argsd[0], _argsd[1], (float)_argsd[2]);
	break;
case CALL4(DEFAULT, DEFAULT, DOUBLE, DOUBLE, DOUBLE):
	u64Ret = ((_uCuddd)(pFn))(_args[0], _argsd[0], _argsd[1], _argsd[2]);
	break;
case CALL4(DEFAULT, DEFAULT, DOUBLE, DOUBLE, DEFAULT):
	u64Ret = ((_uCuddu)(pFn))(_args[0], _argsd[0], _argsd[1], _args[1]);
	break;
case CALL4(DEFAULT, DEFAULT, DOUBLE, DEFAULT, SINGLE):
	u64Ret = ((_uCuduf)(pFn))(_args[0], _argsd[0], _args[1], (float)_argsd[1]);
	break;
case CALL4(DEFAULT, DEFAULT, DOUBLE, DEFAULT, DOUBLE):
	u64Ret = ((_uCudud)(pFn))(_args[0], _argsd[0], _args[1], _argsd[1]);
	break;
case CALL4(DEFAULT, DEFAULT, DOUBLE, DEFAULT, DEFAULT):
	u64Ret = ((_uCuduu)(pFn))(_args[0], _argsd[0], _args[1], _args[2]);
	break;
case CALL4(DEFAULT, DEFAULT, DEFAULT, SINGLE, SINGLE):
	u64Ret = ((_uCuuff)(pFn))(_args[0], _args[1], (float)_argsd[0], (float)_argsd[1]);
	break;
case CALL4(DEFAULT, DEFAULT, DEFAULT, SINGLE, DOUBLE):
	u64Ret = ((_uCuufd)(pFn))(_args[0], _args[1], (float)_argsd[0], _argsd[1]);
	break;
case CALL4(DEFAULT, DEFAULT, DEFAULT, SINGLE, DEFAULT):
	u64Ret = ((_uCuufu)(pFn))(_args[0], _args[1], (float)_argsd[0], _args[2]);
	break;
case CALL4(DEFAULT, DEFAULT, DEFAULT, DOUBLE, SINGLE):
	u64Ret = ((_uCuudf)(pFn))(_args[0], _args[1], _argsd[0], (float)_argsd[1]);
	break;
case CALL4(DEFAULT, DEFAULT, DEFAULT, DOUBLE, DOUBLE):
	u64Ret = ((_uCuudd)(pFn))(_args[0], _args[1], _argsd[0], _argsd[1]);
	break;
case CALL4(DEFAULT, DEFAULT, DEFAULT, DOUBLE, DEFAULT):
	u64Ret = ((_uCuudu)(pFn))(_args[0], _args[1], _argsd[0], _args[2]);
	break;
case CALL4(DEFAULT, DEFAULT, DEFAULT, DEFAULT, SINGLE):
	u64Ret = ((_uCuuuf)(pFn))(_args[0], _args[1], _args[2], (float)_argsd[0]);
	break;
case CALL4(DEFAULT, DEFAULT, DEFAULT, DEFAULT, DOUBLE):
	u64Ret = ((_uCuuud)(pFn))(_args[0], _args[1], _args[2], _argsd[0]);
	break;
case CALL4(DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT):
	u64Ret = ((_uCuuuu)(pFn))(_args[0], _args[1], _args[2], _args[3]);
	break;
