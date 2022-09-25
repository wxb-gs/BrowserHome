import React, { useEffect, useState,useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../Components/Search/Search";
import TabTable from "../../Components/TabTable/TabTable";
import styles from "./Home.module.css";

import baidu from "../../assets/baidu.png";
import google from "../../assets/google.png";

//通过内联的方式更好
const themes = {
  light: {
    color: "#000",
    background: "#fff",
  },
  dark: {
    color: "#fff",
    background: "transparent",
  },
};
export const ThemeColor = React.createContext(themes.dark);

//createRef不能放在函数组件内部重复执行，否则第二次为null,有bug
// const myInput = React.createRef();

export default function Home() {
  const navigete = useNavigate();
  const myInput =useRef();
  const [isBaidu, setIsBaidu] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [input, setInput] = useState("");
  const [color, setColor] = useState(themes.dark);
  
  const handleKeydown =useCallback( (e) => {
   
    //组合键:e有对应的属性
    //ctrl+q切换搜索引擎
    if(e.ctrlKey&&e.keyCode ===81){
      changeEngine()
    }
    //alt+q切换主题颜色
    else if(e.altKey&&e.keyCode===81){
      changeTheme();
    }

    if (myInput.current) {
      myInput.current.focus();
      if (e.keyCode === 13) {
        //这里由于search()初始化时的input为'',期间input变化
        //但是副作用的该函数只执行了一会，其中的input并没有发生变化
        //可以监听input更新该事件处理程序
        search();
      }

    }
  },[color]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  const changeTheme = () => {
   
    //出了点bug,handleKeydown不能更新主题,原因是监听器对应函数没有更新
    if (color === themes.light) setColor(themes.dark);
    else setColor(themes.light);
  };
  const handleInput = (e) => {
    setInput(() => e.target.value);
  };
  const changeEngine = () => {
    setShowLogo(false);
    setTimeout(() => {
      setIsBaidu((is)=>!is);
      setShowLogo(true);
    }, 500);
  };
  //search接收一个input
  const search = () => {
    if (isBaidu) {
      window.open(`https://www.baidu.com/s?wd=${input}`);
    } else {
      window.open(`https://www.google.com/search?q=${input}`);
    }
  };


 

  return (
    <ThemeColor.Provider value={color}>
      <div className={styles.logo} onClick={changeEngine}>
        <img
          className={showLogo ? "" : styles.fade}
          src={isBaidu ? baidu : google}
          alt={isBaidu ? "baidu logo" : "google logo"}
        />
      </div>
      
      <Search
        input={input}
        ref={myInput}
        handleInput={handleInput}
        search={search}
      />

      <TabTable />
      <div className={styles.choice}>
        <button className={styles.btn} onClick={changeTheme}>
          变更主题
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            navigete("/choose");
          }}
        >
          选择页面
        </button>
      </div>
    </ThemeColor.Provider>
  );
}
