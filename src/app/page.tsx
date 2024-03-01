"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { connetToMetmask } from "./ether/ether";

export default function Home() {
  return (
    <main className={styles.main}>
      <button onClick={connetToMetmask}> Connect </button>
    </main>
  );
}
