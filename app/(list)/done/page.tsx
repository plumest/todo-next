import { ITodoResponse } from "@/lib/interfaces";
import styles from "../list.module.scss";
import TodoList from "@/app/_components/TodoList/TodoList";

export default async function DonePage() {
  const { signal } = new AbortController();
  const response = await fetch(`${process.env.BASE_URL}/api/todo?status=DONE`, {
    cache: "force-cache",
    signal,
  });
  const data: ITodoResponse = await response.json();

  return (
    <div className={styles.pageContainer}>
      <TodoList {...data} status="DONE" />
    </div>
  );
}
