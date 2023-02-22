import React from "react";
import { Button } from "antd";
import { toDoTypeMap, useStore, __ALL__ } from "@/store";
import { observer } from "mobx-react-lite";
import styles from "styles/Footer.module.css";
import classNames from "classnames";
import dynamic from "next/dynamic";

const btnDataArr = [
  {
    text: "全部",
    value: __ALL__,
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

const Footer = observer(() => {
  const store = useStore();
  return (
    <div className={styles["footer-wrapper"]}>
      <div>共 {store.toDoItemLens} 件代办事项</div>
      <div>
        {btnDataArr.map((v, index) => (
          <Button
            className={classNames({
              [styles["active-btn"]]: store.showType === v.value,
            })}
            key={index}
            onClick={() => {
              store.changeShowType(v.value);
            }}
          >
            {v.text}
          </Button>
        ))}
      </div>
      <div>
        {store.doneItemLens > 0 && (
          <Button type="link" onClick={() => store.clearDoneItem()}>
            清除已完成事项
          </Button>
        )}
      </div>
    </div>
  );
});

export default dynamic(() => Promise.resolve(Footer), {
  ssr: false,
});
