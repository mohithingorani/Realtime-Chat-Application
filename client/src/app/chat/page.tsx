"use client"

import TextMessage from "@/app/components/TextMessage";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export interface MessageObject {
  message: string;
  id: string;
  time: string;
  username: string;
}

export default function Chats() {
  const session = useSession();

  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [inbox, setInbox] = useState<MessageObject[]>([]);
  const [message, setMessage] = useState<string>("");
  const [Error, setError] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const roomName = searchParams.get("room");
  const name = searchParams.get("name");
  const [myId, setMyId] = useState<string | undefined>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [usersConnected, setUsersConnected] = useState<string[]>([])
  const roomNameString = JSON.stringify(roomName)
  const getTime = () => {
    const dateWithouthSecond = new Date();
    const currentTime = dateWithouthSecond.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return currentTime;
  };

  const handleSendMessage = () => {
    if (socket) {
      const currentTime = getTime();
      socket.emit("message", message, roomName, myId, currentTime, name);
      setMessage("");
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3000/");
    socket.on("connect", () => {
      console.log("Socket connected");
      setSocket(socket);
      setMyId(socket.id);
      socket.emit("joinRoom", roomName);
      socket.emit("enter", roomName, name);

    });

    socket.on("message", (message: string, id: string, currentTime: string, username: string) => {
      if (message.trim() !== "") {
        setInbox((prevInbox) => [...prevInbox, { message, id, time: currentTime, username }]);
      }
    });

    socket.on("enter", (userName: string) => {
      setUsersConnected((prevUsers) => [...prevUsers, userName])
    })

    socket.on("connect_error", (err) => {
      setError(true);
      console.log("connection error");
    });

    return () => {
      socket.disconnect();
    };
  }, [roomName]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [inbox]);

  if (Error) {
    return <div className="text-white font-">Can't Connect.. Retry</div>;
  }

  return (<>
    <div className="flex justify-center h-screen bg-[#222222] ">
      <div className="flex flex-col max-w-2xl w-full h-[90vh] mt-8">
        <div className="text-white px-1 text-4xl">Room : {roomNameString}</div>

        <div className="flex flex-col flex-grow bg-[#0D0D0D] p-8 overflow-y-auto shadow-md rounded-xl">
          {inbox.map((messageObject, index) => (
            <TextMessage key={index} messageObject={messageObject} myId={myId} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex justify-between gap-3 p-4 bg-[#0D0D0D] shadow-md rounded-xl mt-4">
          <input
            type="text"
            value={message}
            className="w-full px-3 py-1.5 resize-none bg-[#0D0D0D] text-white "
            placeholder="Enter text"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button onClick={handleSendMessage} className="bg-green-500 px-4 py-2 rounded-lg">Send</button>
        </div>
      </div>
    </div>
  </>
  );
}
