import styles from "./list.module.scss";
import Tab from "@/app/_components/Tab/Tab";
import { Toaster } from "react-hot-toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.greeting}>
          <h1>Hi!</h1>
          <p>This is my demo todo app.</p>
        </div>
        <div className={styles.navbar}>
          <Tab />
        </div>
      </section>
      {children}
      <Toaster position="top-right" />
    </main>
  );
}
