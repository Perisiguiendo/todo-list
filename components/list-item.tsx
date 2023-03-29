import React, { useCallback, useRef, useState } from "react";
import { Checkbox, Input, Popconfirm } from "antd";
import { ToDoItemProps, toDoTypeMap, useStore } from "@/store";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useHover } from "ahooks";
import { observer } from "mobx-react-lite";
import styles from "styles/ListItem.module.css";
import classnames from "classnames";
import dynamic from "next/dynamic";

const ListItem = observer((item: ToDoItemProps) => {
  const store = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const isHover = useHover(ref);

  const [inputValue, setInputValue] = useState(item.content);

  const handleChange = useCallback(() => {
    store.transformStatus(item);
  }, [item, store]);

  const confirm = () => {
    store.editItem(item.id, inputValue);
  };

  const cancel = () => {
    setInputValue(item.content);
  };

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
      {item.type === toDoTypeMap.DONE ? (
        <></>
      ) : (
        <span className={styles["edit"]}>
          <Popconfirm
            icon={null}
            title="修改"
            description={
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target?.value)}
              />
            }
            onConfirm={confirm}
            onCancel={cancel}
            okText="确认"
            cancelText="取消"
          >
            <EditOutlined size={22} style={{ color: "#333" }} />
          </Popconfirm>
        </span>
      )}
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
