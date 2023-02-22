import React from "react";
import { observer } from "mobx-react-lite";
import { ToDoItemProps, useStore } from "@/store";
import ListItem from "./list-item";
import styles from "styles/List.module.css";
import dynamic from "next/dynamic";

const List = observer(() => {
  const store = useStore();

  return (
    <>
      {store.expand ? (
        <></>
      ) : (
        <div className={styles["list-body"]}>
          {store.getList.map((v: ToDoItemProps) => (
            <ListItem key={v.id} {...v} />
          ))}
        </div>
      )}
    </>
  );
});

export default dynamic(() => Promise.resolve(List), {
  ssr: false,
});
