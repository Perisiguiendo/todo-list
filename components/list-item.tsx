import React, { useCallback, useRef } from "react";
import { Checkbox } from "antd";
import { ToDoItemProps, toDoTypeMap, useStore } from "@/store";
import { CloseOutlined } from "@ant-design/icons";
import { useHover } from "ahooks";
import { observer } from "mobx-react-lite";
import styles from "styles/ListItem.module.css";
import classnames from "classnames";
import dynamic from "next/dynamic";

const ListItem = observer((item: ToDoItemProps) => {
  const store = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const isHover = useHover(ref);

  const handleChange = useCallback(() => {
    store.transformStatus(item);
  }, [item, store]);

  return (
    <div ref={ref} className={styles["list-item-wrapper"]}>
      <Checkbox
        onChange={handleChange}
        checked={item.type === toDoTypeMap.DONE}
      >
        <span
          className={classnames({
            [styles["delete-content"]]: item.type === toDoTypeMap.DONE,
          })}
        >
          {item.content}
        </span>
      </Checkbox>
      {isHover && (
        <span
          className={styles["delete"]}
          onClick={() => store.deleteItem(item.id)}
        >
          <CloseOutlined size={22} style={{ color: "#d72929" }} />
        </span>
      )}
    </div>
  );
});

export default dynamic(() => Promise.resolve(ListItem), {
  ssr: false,
});
