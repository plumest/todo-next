"use client";

import { ITodoDetailProps } from "@/lib/interfaces";
import styles from "./TodoDetail.module.scss";
import ReactModal from "react-modal";

const options: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "Asia/Bangkok",
};

export default function TodoDetail(props: ITodoDetailProps) {
  return (
    <ReactModal
      isOpen={props.isOpen}
      preventScroll={true}
      style={{
        overlay: {
          zIndex: 1001,
        },
        content: {
          minWidth: 300,
          maxWidth: 750,
          minHeight: 250,
          maxHeight: 450,
          height: "fit-content",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>{props.title}</div>
          <button
            className={styles.closeButton}
            onClick={props.onCloseModal}
            type="button"
          >
            X
          </button>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.description}>{props.description}</div>
          <div className={styles.footer}>
            <div className={styles.date}>
              Created At:{" "}
              {new Date(props.createdAt).toLocaleString(["ban", "id"], options)}
            </div>
            <div className={styles.deleteButton} onClick={props.onDeletingTask}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
