"use client";

import { IGroupedTodo, ITodo, ITodoListProps } from "@/lib/interfaces";
import styles from "./TodoList.module.scss";
import { useEffect, useState } from "react";
import { loadTodo } from "@/app/_actions/todo-action";
import Todo from "../Todo/Todo";
import InfiniteScroll from "react-infinite-scroller";
import toast from "react-hot-toast";
import { deleteTask, groupTasks } from "@/app/_actions/group-task-action";

const options: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Bangkok",
};

export default function TodoList(props: ITodoListProps) {
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [groupedTasks, setGroupedTasks] = useState<IGroupedTodo[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setTasks(() => props.tasks);
    setPageNumber(() => props.pageNumber);
    setTotalPages(() => props.totalPages);
  }, []);

  useEffect(() => {
    setGroupedTasks((prev) => groupTasks(prev, tasks));
  }, [tasks]);

  const handleLoadData = async (page: number) => {
    if (page >= totalPages) return;

    const data = await loadTodo(props.status, page);

    if (data?.error) {
      toast.error(data.error.message);
    }

    setTasks((prev) => [...prev, ...data.tasks]);
    setPageNumber(() => data.pageNumber);
    setTotalPages(() => data.totalPages);
  };

  const handleDeleteTask = (taskId: string, groupDate: string) => {
    setGroupedTasks(() => deleteTask(groupedTasks, taskId, groupDate));
    // NOTE: Can add server actions to call API delete task here
    // NOTE: Can uncomment this line to delete task from UI, if calling API.
    // setTasks(() => tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <InfiniteScroll
        loadMore={() => handleLoadData(pageNumber + 1)}
        hasMore={pageNumber < totalPages - 1}
        loader={
          <p className={styles.loading} key={0}>
            Loading...
          </p>
        }
      >
        {groupedTasks?.length ? (
          groupedTasks.map((group) => (
            <div key={group.date} className={styles.groupContainer}>
              <div className={styles.date}>
                {new Date(group.date).toLocaleString(["ban", "id"], options)}
              </div>
              {group.tasks.map((todo) => (
                <div key={todo.id} className={styles.wrapper}>
                  <Todo
                    {...todo}
                    onDeletingTask={() => handleDeleteTask(todo.id, group.date)}
                  />
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className={styles.text} key={1}>
            Have no tasks.
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
