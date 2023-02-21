import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { ToDoItemProps, useStore } from "@/store";
import { ListItem } from "./list-item";
import styles from "styles/List.module.css";

export const List = observer(() => {
  const store = useStore();

  const list = useMemo(() => store.getList(), [store]);

  return (
    <>
      {store.expand ? (
        <></>
      ) : (
        <div className={styles["list-body"]}>
          {list.map((v: ToDoItemProps) => (
            <ListItem key={v.id} {...v} />
          ))}
        </div>
      )}
    </>
  );
});
