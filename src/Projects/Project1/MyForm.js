import React from "react";
import styled from "styled-components";
import ColorfulTitle from "../../Components/ColorfulTitle";
import "./css/around_light.css";
import "./css/form.css";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { isEmpty } from "../../utils/utils";


const userRuler = {
  required: "必须的填写",
  maxLength: {
    message: "最大长度不得超过18",
    value: 18,
  },
  minLength: {
    message: "最小长度不得低于8",
    value: 8,
  },
  pattern: {
    message: "输入内容只能是数字,英文大小写",
    value: /^[A-Za-z0-9]+$/g,
  },
};
const passwordRuler = {
  required: "必须的填写",
  maxLength: {
    message: "最大长度不得超过18",
    value: 18,
  },
  minLength: {
    message: "最小长度不得低于8",
    value: 8,
  },
  pattern: {
    message: "输入内容只能是数字,英文大小写,或者特殊符号(+-*/?)",
    value: /^[/A-Za-z0-9+\-*?.]+$/g,
  },
};
const StyledError=styled.p`
  color:red;
  font-size:0.8rem;

`

const onSubmit=(data)=>{
  console.log(data)
  alert(JSON.stringify(data))
}

const getErro=(errors,name)=>{
  if(!isEmpty(errors) && !isEmpty(errors[name]) ){
    return(
      <StyledError>{errors[name]?.message}</StyledError>
    )
  }
}

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  return (
    <StyledContainer>
      <StyledForm>
        <ColorfulTitle>React Hook Form</ColorfulTitle>
        <div className="card">
          <form className={clsx("form",{has_erro: !(Object.keys(errors).length===0) })}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* 可以使用节流 */}
            <ColorfulTitle
              style={{
                fontSize: "2.3rem",
                wordSpacing: "0.5rem",
              }}
            >
              Sign in
            </ColorfulTitle>

            <div className="inputBox">
              {/* <!-- 必须加上required,否则：valid不起作用 --> */}
              <input
                type="text"
                className="inner"
                required
                {...register("username", userRuler)}
              />
              <span>用户名</span>
              <i></i>
            </div>
            {getErro(errors,'username')}

            <div className="inputBox">
              <input
                type="password"
                className="inner"
                required
                {...register("password", passwordRuler)}
              />
              <span>密码</span>
              {/* <!-- 用作输入框的线 --> */}
              <i></i>
            </div>
            {getErro(errors,'password')}

            <div className="other-link">
              <a href="https://www.baidu.com">忘记密码</a>
              <a href="https://www.baidu.com">注册</a>
            </div>

            <button className="btn">登录</button>
          </form>
        </div>
      </StyledForm>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledForm = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
`;
