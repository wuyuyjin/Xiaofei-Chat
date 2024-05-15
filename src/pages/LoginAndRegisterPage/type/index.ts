import {Direction} from "../../../Types/RegisterPatternType.ts";

export interface RegisterRequestBody {
  phoneNumber ?: string //11位手机号码
  email ?: string; //最小长度为1，最大长度为30，只能包含字母、数字、下划线,必须包含@
  password: string; //最小长度为6，最大长度为20，只能包含字母、数字、下划线,必须数字与字母混合使用
  confirmPassword?: string
  verificationCode : number //6位数字的验证码
  registerPattern : Direction //支持邮箱/手机号注册 type是枚举类型
}





