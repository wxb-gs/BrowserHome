import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ProjectOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import styles from "./Index.module.css";
import { DEFAULT_COVER } from "../../constant/defaultTabPane";
import { CURRENT_COVER } from "../../constant/index";
import axios from "axios";
import { motion } from "framer-motion";
import styled from "styled-components";
import clsx from "clsx";

const { Content, Footer, Sider } = Layout;

const StyledBtn = styled.div`
  position: fixed;
  color: white;
  bottom: 0px;
  left: 0;
  width: 48px;
  height: 48px;
  transition: 0.18s;
  transform:translateX(${props=>props.transfer}px);
  padding: 5px;
  font-size: 1.5rem;
  text-align: center;
  background-color: #002140;
  border-radius: 4px;
  border-top-left-radius:0;
  border-bottom-left-radius:0;
`;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function getItemWithClcik(label, key, icon, onClick, children) {
  return {
    key,
    icon,
    onClick,
    children,
    label,
  };
}

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [cover, setCover] = useState(getCurrentCover);
  const coverState = useLocation();
  const navigate = useNavigate();

  const [showBar, setShowBar] = useState(true);

  function getTitleClickFuc(path, option) {
    return () => {
      navigate(path, option);
    };
  }

  // 封面加载
  useEffect(() => {
    if (coverState.state) changeCover(coverState.state);
  }, [coverState.state]);

  let transparentClass = useMemo(
    () => (coverState.pathname === "/" ? styles.transparent : ""),
    [coverState.pathname]
  );

  //初始化state调用的函数
  function getCurrentCover() {
    return localStorage.getItem(CURRENT_COVER)
      ? JSON.parse(localStorage.getItem(CURRENT_COVER))
      : DEFAULT_COVER;
  }

  const changeCover = async (cover) => {
    if (cover.type === "api") {
      const res = await axios.get(`https://bird.ioliu.cn/v1/?url=${cover.api}`);
      if (res.data && res.data.imgurl) {
        cover.src = res.data.imgurl;
        cover.preview = res.data.imgurl;
      } else {
        console.error("请求异常，请刷新重试");
        return;
      }
    }
    const newCover = { ...cover };
    setCover(newCover);
    localStorage.setItem(CURRENT_COVER, JSON.stringify(newCover));
  };

  const items = [
    getItem("React Tutorial", "sub1", <UserOutlined />, [
      getItemWithClcik(
        "project1",
        "3",
        <ProjectOutlined />,
        getTitleClickFuc("project1")
      ),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),

    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ];

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <Layout
        className={transparentClass}
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            position: "relative",
          }}
          className={clsx(!showBar && "none")}
        >
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.5, 1, 0, 1],
              scale: [1.2, 1, 0.6, 1.2, 1],
              rotate: [360, 0, 360],
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
            }}
          >
            <div
              className={[styles.logo, collapsed ? styles.logo2 : ""].join(" ")}
              onClick={() => navigate("/")}
            >
              Logo
            </div>
          </motion.div>

          <Menu
            theme="dark"
            defaultSelectedKeys={["0"]}
            mode="inline"
            items={items}
          />
        </Sider>

        <StyledBtn 
          transfer={
            !showBar? 0 : collapsed ?80:200
          }
          onClick={() => setShowBar(!showBar)}>
          {showBar ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </StyledBtn>

        <Layout className={transparentClass}>
          <Content
            style={{
              overflow: "atuo",
              margin: "0 16px",
            }}
          >
            {/* 嵌套内容 */}

            <Outlet />
          </Content>

          <Footer
            className={transparentClass}
            style={{
              textAlign: "center",
              color: "blue",
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
        {cover.type === "iframe" ? (
          <iframe
            className={styles.bg}
            title="myIframe"
            src={cover.src}
            marginWidth={0}
            marginHeight={0}
            scrolling="no"
          />
        ) : (
          <img className={styles.bg} src={cover.src} alt={cover.name} />
        )}
      </Layout>
    </motion.div>
  );
};

export default App;
