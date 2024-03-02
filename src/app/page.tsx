"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { RootState } from "@/lib/store";
import { useAppDispatch , useAppSelector } from "@/lib/hooks";
import { increment , decrement } from "@/lib/features/counter/counter";
import { getAccount } from "@/lib/features/providers/provider";
import Ethers from "./ether/ether";

export default function Home() {

  const count : number = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main className={styles.main}>
    <Ethers/>
    <button onClick={() => {dispatch(increment())}}>Increment</button>
      <span>{count}</span>
    </main>
  );
}
