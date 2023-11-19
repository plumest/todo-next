import { ITodoResponse } from "@/lib/interfaces";
import styles from "../list.module.scss";
import TodoList from "@/app/_components/TodoList/TodoList";

export default async function DoingPage() {
  const { signal } = new AbortController();
  const response = await fetch(
    `${process.env.BASE_URL}/api/todo?status=DOING`,
    {
      cache: "force-cache",
      signal,
    }
  );
  const data: ITodoResponse = await response.json();

  return (
    <div className={styles.pageContainer}>
      <TodoList {...data} status="DOING" />
    </div>
  );
}
