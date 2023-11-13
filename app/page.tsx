import styles from "./page.module.css";
import { getTodos } from "@/lib/apis/todo";

export default async function Home() {
  const data = await getTodos({ offset: 1, limit: 10, status: "TODO" });
  return (
    <main className={styles.main}>
      {data && data.tasks?.length
        ? data.tasks.map((todo) => (
            <div key={todo.id}>
              {todo.title} - {todo.status}
            </div>
          ))
        : null}
    </main>
  );
}
