"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { RootState } from "@/lib/store";
import { useAppDispatch , useAppSelector } from "@/lib/hooks";
import { increment , decrement } from "@/lib/features/counter/counter";
import { getAccount } from "@/lib/features/providers/provider";
import Ethers from "./ether/ether";

export default function Home() {
  return (
    <main className={styles.main}>
    <Ethers/>
    </main>
  );
}
