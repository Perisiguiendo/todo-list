import React, { useCallback, useState } from "react";
import { Input } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import { v4 } from "uuid";
import styles from "styles/InputWrapper.module.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

const InputWrapper = observer(() => {
  const [content, setContent] = useState<string>("");

  const store = useStore();

  const onChange = (e: { target: { value: string } }) => {
    setContent(e.target.value);
  };

  const onEnter = useCallback(() => {
    if (!content) return;
    store.addItem({
      id: v4(),
      type: "TODO",
      content,
    });
    setContent("");
  }, [store, content]);

  const handleExpand = useCallback(() => {
    store.changeExpand();
  }, [store]);

  return (
    <div className={styles["input-header"]}>
      <div className={styles["expand-icon"]} onClick={handleExpand}>
        {store.expand ? <UpOutlined /> : <DownOutlined />}
      </div>
      <Input
        value={content}
        maxLength={100}
        className={styles["input-wrapper"]}
        onChange={onChange}
        placeholder="input something you want to do"
        bordered={false}
        onPressEnter={onEnter}
      />
    </div>
  );
});

export default dynamic(() => Promise.resolve(InputWrapper), {
  ssr: false,
});
