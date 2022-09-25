import React, { useContext, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./Search.css";
import { ThemeColor } from "../../Pages/Home/Home";

const Search = React.forwardRef((props, myInput) => {
  useEffect(() => {
    //仅执行一次
    myInput.current.focus();
  }, []);
  let { search } = props;
  const theme = useContext(ThemeColor);
  return (
    <div>
      <div
        className="input-container"
        style={{ backgroundColor: theme.background, color: theme.color }}
      >
        <input
          ref={myInput}
          className="input"
          value={props.input}
          type="text"
          placeholder="请输入搜索内容"
          onChange={props.handleInput}
        />
        <span onClick={search}>
          <SearchOutlined />
        </span>
      </div>
    </div>
  );
});
export default Search;
