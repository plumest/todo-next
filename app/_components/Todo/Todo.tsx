"use client";

import { ITodoProps } from "@/lib/interfaces";
import styles from "./Todo.module.scss";
import { useState } from "react";
import { SwipeEventData, useSwipeable } from "react-swipeable";
import TodoDetail from "../TodoDetail/TodoDetail";

export default function Todo(props: ITodoProps) {
  const [displayDelete, setDisplayDelete] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setDisplayDelete(() => true),
    onSwipedRight: () => setDisplayDelete(() => false),
    onSwiping: (event: SwipeEventData) => {
      if (event.velocity > 3) {
        props.onDeletingTask();
      }
    },
    onTap: () => {
      setIsModalOpen(() => true);
    },
    trackMouse: true,
    delta: 100,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} {...swipeHandlers}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.description}>{props.description}</div>
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
          props.onDeletingTask();
        }}
      >
        Delete
      </div>
      <TodoDetail
        {...props}
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(() => false)}
      />
    </div>
  );
}
