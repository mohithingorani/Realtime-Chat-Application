"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import "./globals.css"
import AppBar from "./components/AppBar";
import Image from "next/image";
import { useSession } from "next-auth/react";
export default function Home() {

  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const session = useSession();
  const router = useRouter();

  function buttonHandler() {
    if (name && room) {
      router.push(`/chat/?room=${room}&name=${name}`); // ?room=roomName&name=name
    }
  }

  return (<>
    <div className="h-screen bg-slate-300 w-full">
      <AppBar />
      <div className="text-center w-lvw flex justify-center mt-4">
        <div className="bg-white max-w-lg w-full py-8 rounded-lg shadow-lg">
          <div className="text-4xl font-bold">
            <div>Hey ! {session.data?.user?.name} 👋</div>
            <div>Welcome to my app!</div>
          </div>

          <div className=" pt-2">Let's start by joining a room quickly and <br /> you'll be able to chat in realtime</div>
          <div className="flex flex-col justify-normal px-8 gap-4 mt-4">
            <input type="text" onChange={e => setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Username" required />


            <input type="text" onChange={e => setRoom(e.target.value)} id="room" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Room Number" required />
            <button onClick={buttonHandler} className="text-black  max-w-lg w-full bg-green-400 px-3 py-1.5 rounded-sm border border-gray-300 active:scale-95">Enter room</button>
          </div>
        </div>
      </div>

    </div>
  </>

  );
}
