import React from "react";
import styled, { keyframes } from "styled-components";


export default function ColorfulTitle({ style ,children}) {
    return <Title style={style}>{children}</Title>;
}

const titleAnimation = keyframes`
   0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
`;
const Title = styled.div`
  /* 默认样式 */
  height: 120px;
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    cyan,
    blue,
    purple
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: ${titleAnimation} 3s linear infinite;

  text-align: center;
  font-size: 3rem;
  font-weight: 1000;
  word-spacing: 1rem;
`;
