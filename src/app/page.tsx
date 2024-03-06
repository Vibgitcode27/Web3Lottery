"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { RootState } from "@/lib/store";
import { useAppDispatch , useAppSelector } from "@/lib/hooks";
import { increment , decrement } from "@/lib/features/counter/counter";
import { getAccount } from "@/lib/features/providers/provider";
import { useState } from "react";
import Ethers from "./ether/ether";
import React from "react";
import { Menu , HoveredLink , ProductItem , MenuItem } from "./Components/navbar";
import { TypewriterEffectSmooth } from "./Components/typewriter";

export default function Home() {

   const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <main className="styles.main bg-slate-50">
     <Menu setActive={setActiveItem}>
        <MenuItem setActive={setActiveItem} active={activeItem} item="Item 1">
           <ProductItem
            title="Product Title"
            description="Product Description"
            href="/product"
            src="/product-image.jpg"
          />
        </MenuItem>
        <MenuItem setActive={setActiveItem} active={activeItem} item="Item 2">
          {/* Content for Item 2 */}
        </MenuItem>
        <HoveredLink href="/some-page">Link Text</HoveredLink>
      </Menu>
      <h2 className="flex items-center justify-center text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500">Elevate Your Odds with EtherWager</h2>
      <TypewriterEffectSmooth className="flex items-center justify-center"
          words={[
            { text: 'Welcome' },
            { text: 'To' },
            { text: 'EtherWager' }
          ]}
          />
      <Ethers/>
      <h1 className="text-3xl font-bold underline">EtherWager!</h1>
    </main>
  );
}

