"use client";
// import Image from "next/image";
// import styles from "./page.module.css";
// import { RootState } from "@/lib/store";
// import { useAppDispatch , useAppSelector } from "@/lib/hooks";
// import { increment , decrement } from "@/lib/features/counter/counter";
// import { getAccount } from "@/lib/features/providers/provider";
// import { useState } from "react";
import Ethers from "./ether/ether";
import React from "react";
import { TypewriterEffectSmooth } from "./components/typewriter";
import {EvervaultCard } from "./components/explore"
import { StickyScroll } from "./components/technologies";
import { SignInButton , UserButton, UserProfile , SignIn } from "@clerk/nextjs";
import SignupModal from "./components/signupModal";
import SigninModal from "./components/signInModal";
import EtherIMG from "./assets/ethersblue.png"
 
export default function Home() {

const [openSignUp, setSignUpOpen] = React.useState(false);
const handleOpen = () => setSignUpOpen(true);
const [openSignIn, setSignInOpen] = React.useState(false);
const handleOpenSingIn = () => setSignInOpen(true);

const content = [
  {
    title: "Ether.js",
    description: "Ether.js is a popular library for interacting with the Ethereum blockchain.",
    content: <div><img className="my-4" src={EtherIMG.src}/></div>,
  },
  {
    title: "Next.js",
    description: "Next.js is a React framework that enables server-side rendering, static site generation, and more.",
    content: <div><img className="ml-14 my-4" src="./favicon.ico"/></div>,
  },
  {
    title: "Redux Toolkit",
    description: "Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development.",
    content: <div></div>,
  },
  {
    title: "Prisma ORM",
    description: "Prisma is a modern database toolkit for Typescript and Node.js that simplifies database access with an auto-generated query builder and type-safe database models.",
    content: <div></div>,
  },
  
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  return (
    <div className="styles.main bg-slate-50 pt-10" style={{height : "auto"}}>
      <SignupModal open={openSignUp} onClose={() => setSignUpOpen(false)} />
      <SigninModal open={openSignIn} onClose={() => setSignInOpen(false)} />
      <UserButton/>
      <h2 className="flex items-center justify-center text-xs sm:text-sm md:text-sm lg:text-base xl:text-base text-gray-500">Elevate Your Odds with EtherWager</h2>
      <TypewriterEffectSmooth className="flex items-center justify-center"
          words={[
            { text: 'Welcome' },
            { text: 'To' },
            { text: 'EtherWager' }
          ]}
          />
          <div className="flex justify-center">
                    <button className="text-sm px-4 px-4 py-0 sm:py-0 md:py-1 lg:py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={handleOpenSingIn}> Sign In </button>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <button className="text-sm px-4 py-0 sm:py-0 md:py-1  rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" onClick={handleOpen}>Sign Up </button>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                </div>
      {/* <div className="flex justify-center items-center h-72">
        <div className="flex justify-between max-w-lg w-full">
          <EvervaultCard text="Ether.js" className="w-100" />
          <p>&nbsp;&nbsp;&nbsp;</p>
          <EvervaultCard text="WEB3" className="w-100"/>
          <p>&nbsp;&nbsp;&nbsp;</p>
          <EvervaultCard text="Next.js" className="w-100"/>
          <p className="text-xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        </div>
      </div> */}
      <h1 className="text-3xl font-bold pl-2">Technologies Used!</h1>
      <div className="p-1">
        <StickyScroll content={content}/>
      </div>
      <Ethers/>
    </div>
  );
}