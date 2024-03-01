"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { connetToMetmask } from "./ether/ether";
import { RootState } from "@/lib/store";
import { useAppDispatch , useAppSelector } from "@/lib/hooks";
import { increment , decrement } from "@/lib/features/counter/counter";

export default function Home() {

  const count : number = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main className={styles.main}>
      <button onClick={connetToMetmask}> Connect </button>

      <button onClick={() => {dispatch(increment())}}>Increment</button>
      <span>{count}</span>
    </main>
  );
}
