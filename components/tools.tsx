import React from "react";
import { observer } from "mobx-react-lite";
import { getUndoManager } from "@/store";
import dynamic from "next/dynamic";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "styles/Tools.module.css";
import classNames from "classnames";

const Tools = observer(() => {
  const undoManager = getUndoManager();

  const undo = () => {
    if (undoManager.canUndo) {
      undoManager.undo();
    }
  };
  const redo = () => {
    if (undoManager.canRedo) {
      undoManager.redo();
    }
  };

  return (
    <div className={styles["tools-wrapper"]}>
      <div
        className={classNames(styles["item"], {
          [styles["item-disabled"]]: !undoManager.canUndo,
        })}
        onClick={undo}
      >
        <LeftOutlined />
        <span>撤销</span>
      </div>
      <div className={styles["item"]} onClick={redo}>
        <span>还原</span>
        <RightOutlined />
      </div>
    </div>
  );
});

export default dynamic(() => Promise.resolve(Tools), {
  ssr: false,
});
