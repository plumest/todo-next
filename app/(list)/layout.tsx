import Link from "next/link";
import styles from "./list.module.scss";
import Tab from "@/app/_components/Tab/Tab";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.profile}>
          <img src="" alt="" />
        </div>
        <div className={styles.greeting}>
          <h1>Hi! User</h1>
          <p>This is just a sample UI.</p>
          <p>Open to create your style :D</p>
        </div>
      </section>
      <Tab />
      {children}
    </main>
  );
}
