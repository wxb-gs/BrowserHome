import React, {useState } from "react";
import { clsx } from "clsx";
import produce from "immer";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ColorfulTitle from "../../Components/ColorfulTitle";


export default function TestSection() {
  const [isOk, setIsOk] = useState(true);
  const [data, setData] = useState({
    info: [123, 235],
  });
  const [input, setInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  
  const onSubmit = (data) => console.log(data);

  function getErro(err,atrr) {
    if (!!err[atrr]) return <p style={{color:"red"}}>{err[atrr].message.toString() || `默认的提示` }</p>;
  }


  return (
    <div>

      <div className={clsx("class1", isOk && "class2", "class3")}>
        <button
          onClick={() => {
            setIsOk(!isOk);
          }}
        >
          使用clsx安排类名
        </button>
        <div>
          <p>使用immer</p>
          {data.info.map((i) => (
            <p key={nanoid()}>{i}</p>
          ))}
          <input
            onChange={(e) => {
              //非纯函数
              setInput(e.target.value);
            }}
            type="text"
            value={input}
          />
          <button
            onClick={() => {
              let producer = produce((draft) => {
                draft.info.push(input);
              });
              setData(producer(data));
            }}
          >
            添加
          </button>
        </div>
      </div>

      <div className={clsx("nothing", "why")}>
        <p>use Styled-components</p>
        <MyButton className="red">我的链接</MyButton>
        <div>
          <MyInputText />
        </div>
        <MyInputPassword />
      </div>

      <MyForm>
        <ColorfulTitle style={{isok:true}} >My Form</ColorfulTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="input">
            <div>用户名:</div>
            <div>
              <input
                type="text"
                placeholder="请输入用户名"
                {...register("username", { required:"必须" })}
              />
                {getErro(errors,'username')}
            </div>
          </label>

          <label className="input">
            <div>密码:</div>
            <div>
              <input
                type="text"
                placeholder="firstName"
                {...register("firstName", {
                  required: true,
                  maxLength: 5,
                  minLength: 3,
                  pattern: "f",
                })}
              />
              {getErro(errors,"firstName")}
            </div>
          </label>
          <div>
            <MyLoginBtn>登录</MyLoginBtn>
          </div>
        </form>
      </MyForm>

    </div>
  );
}

// 这里边直接写最原始的css代码，不用括号，不用转化为驼峰写法
const MyButton = styled.a`
  /* color:red; */
  &.red {
    color: red;
  }
`;

const MyInputText = styled.input.attrs({ type: "text" })`
  border: none;
  outline: none;
  background-color: blue;
  color: red;
`;
const MyInputPassword = styled(MyInputText).attrs({ type: "password" })`
  color: white;
`;



const MyForm = styled.div`
  border: 1px solid black;
  width: 100%;

  height: 400px;

  margin: 0 auto;
  padding: 20px 30px;
  background-color: floralwhite;
 
  form {
    width: 100%;
  }
  form .input {
    display: flex;
    justify-content: center;
    text-align: center;
    div {
      flex: 1;
    }
  }
`;

const MyLoginBtn = styled.button`
  border: none;
  outline: none;
  width: 200px;
  margin: 30px auto;
  display: block;
  background-color: green;
  color: white;
`;
