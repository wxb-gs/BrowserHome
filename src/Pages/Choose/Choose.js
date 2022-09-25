import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Choose.module.css";
import navList from "../../constant/defaultTabPane";
import { nanoid } from "nanoid";
import "../../css/pageSwitch.css";
import { motion } from "framer-motion";

export default function Choose() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const nav = navList.map((item, i) => (
    <div
      className={[style.navItem, index === i && style.selected].join(" ")}
      onClick={() => setIndex(i)}
      key={item.key}
    >
      {item.name}
    </div>
  ));
  const covers = navList[index].list.map((item) => (
    <div
      className={style.coverItem}
      onClick={() => {
        navigate("/", {
          replace: false,
          state: { ...item },
        });
      }}
      key={nanoid()}
    >
      <img src={item.preview} alt={item.name} />
      <span>{item.name}</span>
    </div>
  ));
  return (
    <motion.div
      className="box"
      style={{
        position:"absolute"
      }}
      initial={{ x:-window.innerWidth  }}
      animate={{x:0 ,transition:{duration:0.6}}}
      exit={{x:window.innerWidth,transition:{duration:0.6}}}
    >
      <div className={style.container}>
        <div className={style.header}>选择封面
         
        </div>
        <div className={style.navlist}>
          <div className={style.nav}>{nav}</div>
          <div className={[style.navItem, style.navOption].join(" ")}>···</div>
        </div>
        <div className={style.covers}>{covers}</div>
      </div>
    </motion.div>
  );
}
