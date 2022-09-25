import React, { useState } from "react";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import TestSection from "./TestSection";
import Form from "./MyForm";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import "./css/index.css";
import AntdForm from "./AntdForm";


const arrComps = [<TestSection />, <Form />, <AntdForm />];

export default function Project1() {
  const [showTest, setShowTest] = useState(0);

  //由于整个组件没有离开
  return (
    <div className="project1">
      {withTransition(arrComps[showTest])}

      <NextPageBtn>
        <div>
          <DoubleLeftOutlined
            onClick={() => setShowTest((pre) => Math.max(pre - 1, 0))}
          />
          <DoubleRightOutlined
            onClick={() => setShowTest((pre) => Math.min(pre + 1, 2))}
          />
        </div>
      </NextPageBtn>
    </div>
  );
}


const NextPageBtn = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  & > div {
    display: flex;
    gap: 50px;
    justify-content: center;
  }

  .anticon {
    font-size: 2rem;
    color: red;
  }
`;

const withTransition = (Comp) => (
  <motion.div
    className="box"
    key={nanoid()}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    eixt={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    {Comp}
  </motion.div>
);
