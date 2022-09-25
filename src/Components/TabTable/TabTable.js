import React, { useContext } from "react";
import data from "../../constant/defaultHome";
import { nanoid } from "nanoid";
import "./TabTable.css";
import { ThemeColor } from "../../Pages/Home/Home";
export default function TabTable() {
  const theme = useContext(ThemeColor);
  let { myLike } = data.keyContentMap;
  const tabs = myLike.map((item) => {
    let { icon, link, name } = item;
    return (
      <div
        className="tab-item"
        style={{ backgroundColor: theme.background, color: theme.color }}
        key={nanoid()}
      >
        <a href={link} target="_blank">
          <img src={icon} alt={name} />
          <span>{name}</span>
        </a>
      </div>
    );
  });

  return <div className="tabs">{tabs}</div>;
}
