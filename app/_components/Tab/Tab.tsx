"use client";

import styles from "./Tab.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { display: "To-do", path: "/todo" },
  { display: "Doing", path: "/doing" },
  { display: "Done", path: "/done" },
];

export default function Tab() {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {tabs.map((tab) => (
          <Link
            href={tab.path}
            className={`${styles.button} ${
              tab.path === pathname ? styles.active : ""
            }`}
            key={tab.display}
          >
            {tab.display}
          </Link>
        ))}
      </div>
    </div>
  );
}
