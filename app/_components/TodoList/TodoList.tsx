"use client";

import { ITodo, ITodoListProps } from "@/lib/interfaces";
import styles from "./TodoList.module.scss";
import { useEffect, useState } from "react";
import { loadTodo } from "@/app/_actions/todo-action";
import Todo from "../Todo/Todo";

export default function TodoList(props: ITodoListProps) {
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setTasks(() => props.tasks);
    setPageNumber(() => props.pageNumber);
    setTotalPages(() => props.totalPages);
  }, []);

  const handleLoadData = async () => {
    const data = await loadTodo(props.status, pageNumber + 1);
    setTasks(() => [...tasks, ...data.tasks]);
    setPageNumber(() => data.pageNumber);
    setTotalPages(() => data.totalPages);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(() => tasks.filter((task) => task.id !== id));
    // NOTE: Can add server actions to call API delete task here
  };

  return (
    <div className={styles.container}>
      {tasks?.length
        ? tasks.map((todo) => (
            <Todo
              {...todo}
              key={todo.id}
              onClick={() => handleDeleteTask(todo.id)}
            />
          ))
        : null}
      <button onClick={handleLoadData}>{totalPages}</button>
    </div>
  );
}
