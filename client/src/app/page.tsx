"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import "./globals.css"
import AppBar from "./components/AppBar";
export default function Home() {

  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const router = useRouter();

  function buttonHandler() {
    if (name && room) {
      router.push(`/chat/?room=${room}&name=${name}`); // ?room=roomName&name=name
    }
  }

  return (<>
    <div className="h-screen bg-slate-300">
      <AppBar />
      <div className="flex justify-center mt-8">
        <div className="flex flex-col gap-8">
          <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" className="border border-black max-w-lg w-full " />
          <input onChange={(e) => setRoom(e.target.value)} type="text" placeholder="Enter Room Number" className="border border-black max-w-lg w-full" />
          <button onClick={buttonHandler} className="max-w-lg w-full bg-green-400 border border-black">Enter room</button>
        </div>
      </div>
    </div>
  </>

  );
}
