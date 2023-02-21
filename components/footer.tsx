import React from "react";
import { Button } from "antd";
import { toDoTypeMap, useStore } from "@/store";
import { observer } from "mobx-react-lite";
import styles from "styles/Footer.module.css";
import classNames from "classnames";

const btnDataArr = [
  {
    text: "全部",
    value: toDoTypeMap.ALL,
  },
  {
    text: "已完成",
    value: toDoTypeMap.DONE,
  },
  {
    text: "未完成",
    value: toDoTypeMap.TODO,
  },
];

export const Footer = observer(() => {
  const store = useStore();
  return (
    <div className={styles["footer-wrapper"]}>
      <div>共 {store.getToDoItemLens()} 件代办事项</div>
      <div>
        {btnDataArr.map((v, index) => (
          <Button
            className={classNames({
              [styles["active-btn"]]: store.showType === v.value,
            })}
            key={index}
            onClick={() => {
              console.log("====================================");
              console.log("xxxx");
              console.log("====================================");
              store.changeShowType(v.value);
            }}
          >
            {v.text}
          </Button>
        ))}
      </div>
      <div>
        <Button type="link">清除已完成事项</Button>
      </div>
    </div>
  );
});
