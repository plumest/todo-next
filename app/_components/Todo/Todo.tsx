"use client";

import { ITodoProps } from "@/lib/interfaces";
import styles from "./Todo.module.scss";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function Todo(props: ITodoProps) {
  const [displayDelete, setDisplayDelete] = useState<boolean>(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setDisplayDelete(() => true),
    onSwipedRight: () => setDisplayDelete(() => false),
    onTap: () => {
      setDisplayDelete((prev) => !prev);
      console.log(props);
    },
    trackMouse: true,
    delta: 100,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} {...swipeHandlers}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.description}>
          {new Date(props.createdAt).toUTCString()}
        </div>
      </div>
      <div
        className={
          displayDelete
            ? `${styles.activeButton} ${styles.button}`
            : styles.button
        }
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (props.onClick) props.onClick();
        }}
      >
        Delete
      </div>
    </div>
  );
}
