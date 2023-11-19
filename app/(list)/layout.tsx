import styles from "./list.module.scss";
import Tab from "@/app/_components/Tab/Tab";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.greeting}>
          <h1>Hi!</h1>
          <p>This is just a sample UI.</p>
          <p>Open to create your style :D</p>
        </div>
        <Tab />
      </section>
      {children}
    </main>
  );
}
