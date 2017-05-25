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

#define CIL_NOP			0x00

#define CIL_LDARG_0		0x02
#define CIL_LDARG_1		0x03
#define CIL_LDARG_2		0x04
#define CIL_LDARG_3		0x05
#define CIL_LDLOC_0		0x06
#define CIL_LDLOC_1		0x07
#define CIL_LDLOC_2		0x08
#define CIL_LDLOC_3		0x09
#define CIL_STLOC_0		0x0a
#define CIL_STLOC_1		0x0b
#define CIL_STLOC_2		0x0c
#define CIL_STLOC_3		0x0d
#define CIL_LDARG_S		0x0e
#define CIL_LDARGA_S	0x0f
#define CIL_STARG_S		0x10
#define CIL_LDLOC_S		0x11
#define CIL_LDLOCA_S	0x12
#define CIL_STLOC_S		0x13
#define CIL_LDNULL		0x14
#define CIL_LDC_I4_M1	0x15
#define CIL_LDC_I4_0	0x16
#define CIL_LDC_I4_1	0x17
#define CIL_LDC_I4_2	0x18
#define CIL_LDC_I4_3	0x19
#define CIL_LDC_I4_4	0x1a
#define CIL_LDC_I4_5	0x1b
#define CIL_LDC_I4_6	0x1c
#define CIL_LDC_I4_7	0x1d
#define CIL_LDC_I4_8	0x1e
#define CIL_LDC_I4_S	0x1f
#define CIL_LDC_I4		0x20
#define CIL_LDC_I8		0x21
#define CIL_LDC_R4		0x22
#define CIL_LDC_R8		0x23

#define CIL_DUP			0x25
#define CIL_POP			0x26

#define CIL_CALL		0x28

#define CIL_RET			0x2a
#define CIL_BR_S		0x2b
#define CIL_BRFALSE_S	0x2c
#define CIL_BRTRUE_S	0x2d
#define CIL_BEQ_S		0x2e
#define CIL_BGE_S		0x2f
#define CIL_BGT_S		0x30
#define CIL_BLE_S		0x31
#define CIL_BLT_S		0x32
#define CIL_BNE_UN_S	0x33
#define CIL_BGE_UN_S	0x34
#define CIL_BGT_UN_S	0x35
#define CIL_BLE_UN_S	0x36
#define CIL_BLT_UN_S	0x37
#define CIL_BR			0x38
#define CIL_BRFALSE		0x39
#define CIL_BRTRUE		0x3a
#define CIL_BEQ			0x3b
#define CIL_BGE			0x3c
#define CIL_BGT			0x3d
#define CIL_BLE			0x3e
#define CIL_BLT			0x3f
#define CIL_BNE_UN		0x40
#define CIL_BGE_UN		0x41
#define CIL_BGT_UN		0x42
#define CIL_BLE_UN		0x43
#define CIL_BLT_UN		0x44
#define CIL_SWITCH		0x45
#define CIL_LDIND_I1	0x46
#define CIL_LDIND_U1	0x47
#define CIL_LDIND_I2	0x48
#define CIL_LDIND_U2	0x49
#define CIL_LDIND_I4	0x4a
#define CIL_LDIND_U4	0x4b
#define CIL_LDIND_I8	0x4c
#define CIL_LDIND_I		0x4d
#define CIL_LDIND_R4	0x4e
#define CIL_LDIND_R8	0x4f
#define CIL_LDIND_REF	0x50
#define CIL_STIND_REF	0x51
#define CIL_STIND_I1	0x52
#define CIL_STIND_I2	0x53
#define CIL_STIND_I4	0x54

#define CIL_ADD			0x58
#define CIL_SUB			0x59
#define CIL_MUL			0x5a
#define CIL_DIV			0x5b
#define CIL_DIV_UN		0x5c
#define CIL_REM			0x5d
#define CIL_REM_UN		0x5e
#define CIL_AND			0x5f
#define CIL_OR			0x60
#define CIL_XOR			0x61
#define CIL_SHL			0x62
#define CIL_SHR			0x63
#define CIL_SHR_UN		0x64
#define CIL_NEG			0x65
#define CIL_NOT			0x66
#define CIL_CONV_I1		0x67
#define CIL_CONV_I2		0x68
#define CIL_CONV_I4		0x69
#define CIL_CONV_I8		0x6a
#define CIL_CONV_R4		0x6b
#define CIL_CONV_R8		0x6c
#define CIL_CONV_U4		0x6d
#define CIL_CONV_U8		0x6e
#define CIL_CALLVIRT	0x6f

#define CIL_LDOBJ		0x71
#define CIL_LDSTR		0x72
#define CIL_NEWOBJ		0x73
#define CIL_CASTCLASS	0x74
#define CIL_ISINST		0x75
#define CIL_CONV_R_UN	0x76

#define CIL_THROW		0x7a
#define CIL_LDFLD		0x7b
#define CIL_LDFLDA		0x7c
#define CIL_STFLD		0x7d
#define CIL_LDSFLD		0x7e
#define CIL_LDSFLDA		0x7f
#define CIL_STSFLD		0x80
#define CIL_STOBJ		0x81
#define CIL_CONV_OVF_I1_UN	0x82
#define CIL_CONV_OVF_I2_UN	0x83
#define CIL_CONV_OVF_I4_UN	0x84
#define CIL_CONV_OVF_I8_UN	0x85
#define CIL_CONV_OVF_U1_UN	0x86
#define CIL_CONV_OVF_U2_UN	0x87
#define CIL_CONV_OVF_U4_UN	0x88
#define CIL_CONV_OVF_U8_UN	0x89
#define CIL_CONV_OVF_I_UN	0x8a
#define CIL_CONV_OVF_U_UN	0x8b
#define CIL_BOX			0x8c
#define CIL_NEWARR		0x8d
#define CIL_LDLEN		0x8e
#define CIL_LDELEMA		0x8f
#define CIL_LDELEM_I1	0x90
#define CIL_LDELEM_U1	0x91
#define CIL_LDELEM_I2	0x92
#define CIL_LDELEM_U2	0x93
#define CIL_LDELEM_I4	0x94
#define CIL_LDELEM_U4	0x95
#define CIL_LDELEM_I8	0x96

#define CIL_LDELEM_R4	0x98
#define CIL_LDELEM_R8	0x99
#define CIL_LDELEM_REF	0x9a

#define CIL_STELEM_I1	0x9c
#define CIL_STELEM_I2	0x9d
#define CIL_STELEM_I4	0x9e
#define CIL_STELEM_I8	0x9f
#define CIL_STELEM_R4	0xa0
#define CIL_STELEM_R8	0xa1
#define CIL_STELEM_REF	0xa2
#define CIL_LDELEM_ANY	0xa3
#define CIL_STELEM_ANY	0xa4
#define CIL_UNBOX_ANY	0xa5

#define CIL_CONV_OVF_I1	0xb3
#define CIL_CONV_OVF_U1	0xb4
#define CIL_CONV_OVF_I2	0xb5
#define CIL_CONV_OVF_U2	0xb6
#define CIL_CONV_OVF_I4	0xb7
#define CIL_CONV_OVF_U4	0xb8
#define CIL_CONV_OVF_I8	0xb9
#define CIL_CONV_OVF_U8	0xba

#define CIL_LDTOKEN		0xd0
#define CIL_CONV_U2		0xd1
#define CIL_CONV_U1		0xd2
#define CIL_CONV_I		0xd3

#define CIL_ADD_OVF		0xd6
#define CIL_ADD_OVF_UN	0xd7
#define CIL_MUL_OVF		0xd8
#define CIL_MUL_OVF_UN	0xd9
#define CIL_SUB_OVF		0xda
#define CIL_SUB_OVF_UN	0xdb
#define CIL_ENDFINALLY	0xdc
#define CIL_LEAVE		0xdd
#define CIL_LEAVE_S		0xde

#define CIL_CONV_U		0xe0

#define CIL_EXTENDED	0xfe


// Extended op-codes

#define CILX_CEQ		0x01
#define CILX_CGT		0x02
#define CILX_CGT_UN		0x03
#define CILX_CLT		0x04
#define CILX_CLT_UN		0x05
#define CILX_LOADFUNCTION 0x06

#define CILX_INITOBJ	0x15
#define CILX_CONSTRAINED 0x16

#define CILX_RETHROW	0x1a

#define CILX_READONLY	0x1e