import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {RegisterRequestBody} from "./type";
import {useState} from "react";
import TimeHook from "../../hooks/TimeHook.tsx";
import RegisterLayout from "./Layout/RegisterLayout.tsx";
import RegisterApi from "../../Api/RegisterApi";
import {Direction} from "../../Types/RegisterPatternType.ts";
import {rule} from "./type/rule.ts";

const formSchema = z.object({
  email: z.string().email("请输入正确邮箱地址"),
  verificationCode: z.string().length(6, "请输入正确的6位验证码"),
  password: z.string().min(8, "请最少输入8位").max(20, "最多输入20位").regex(rule,"只能包含字母、数字、下划线,必须数字与字母混合使用"),
  confirmPassword: z.string().min(8, "请最少输入8位").max(20, "最多输入20位").regex(rule,"只能包含字母、数字、下划线,必须数字与字母混合使用")
}).refine((FormData) => FormData.password === FormData.confirmPassword, {
  path: ["confirmPassword"],
  message: "两次输入的密码不一致哦！"
})

//邮箱注册
const EmailRegister = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const {GetCodeApi,PhoneAndEmailRegisterApi} = RegisterApi()
  //调用计时器组件TimerComponent
  const {getTime,isTiming, remainingTime} = TimeHook()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterRequestBody>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const reqParams = {
      email: data.email,
      password: data.password,
      verificationCode: data.verificationCode,
      registerPattern: Direction.Email
    }
    const response = PhoneAndEmailRegisterApi(reqParams)

    console.log(response)
  })

  const getCode = () => {
    getTime()
    const reqParams = {
      email: email
    }
    const data = GetCodeApi(reqParams)
    console.log(data)
  }

  console.log(email)
  return (

    <RegisterLayout>
      <form onSubmit={onSubmit}>
        <button className="btn btn-wide btn-outline" onClick={() => navigate("/PhoneRegister")}>手机号注册</button>
        <div className="divider">OR</div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input {...register("email")} type="tel" placeholder="请输入Email"
                 className="input input-bordered  md:input-md sm:input-sm w-full max-w-xs"
                 onChange={event => setEmail(event.target.value)}
          />

          <div className="label">
            <span className="label-text-alt">{errors.email?.message &&
                <p className="text-red-600">{errors.email?.message}</p>}</span>
          </div>
        </label>


        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">验证码</span>
          </div>
          <div className="join">
            <input {...register("verificationCode")} type="number" placeholder="请输入验证码"
                   className="input input-bordered md:input-md sm:input-sm max-w-xs join-item"/>
            <button className="btn btn-neutral join-item"
                    onClick={() => getCode()}
                    disabled={isTiming}>{isTiming ? remainingTime + "s" : "发送验证码"}</button>
          </div>
          <div className="label">
            <span className="label-text-alt">
          {errors.verificationCode?.message && <p className="text-red-600">{errors.verificationCode?.message}</p>}
            </span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">密码</span>
          </div>
          <input {...register("password")} type="password" placeholder="请输入密码"
                 className="input input-bordered md:input-md sm:input-sm w-full max-w-xs"/>
          <div className="label">
            <span className="label-text-alt">{errors.password?.message &&
                <p className="text-red-600">{errors.password?.message}</p>}</span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">再次确认密码</span>
          </div>
          <input {...register("confirmPassword")} type="password" placeholder="请再次输入密码"
                 className="input input-bordered md:input-md sm:input-sm w-full max-w-xs"/>

          <div className="label">
            <span className="label-text-alt">{errors.confirmPassword?.message &&
                <p className="text-red-600">{errors.confirmPassword?.message}</p>}</span>
          </div>
        </label>

        <div className="flex justify-between items-center">
          <label className="label cursor-pointer">
            <input type="checkbox" defaultChecked className="checkbox"/>
            <span className="label-text">记住我</span>
          </label>

          <a className="link link-hover text-[#4e81f5]">忘记密码？</a>
        </div>

        <button className="btn btn-neutral w-full sm:btn-sm md:btn-md">注册</button>

        <div className="mt-8">
          <p className="text-gray-400">已经有账号了？<a className="link link-hover text-[#4e81f5]" onClick={() => navigate("/EmailLogin")}>请登录</a></p>
        </div>

      </form>
    </RegisterLayout>
  )
}

export default EmailRegister