"use client"

import { signIn } from "next-auth/react";
import Image from "next/image"
import { useState } from "react"

export default function Signin() {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return <div>
        <div className="flex flex-col justify-center items-center h-screen bg-slate-300" >
            <div className="">
                <div className="grid gap-6 mb-6 md:grid-cols-2 border  px-4 py-6 rounded-xl shadow-lg bg-white">
                    <div className="col-span-2 text-center font-medium text-4xl">
                        Start Chatting Freely
                    </div>
                    <button
                        onClick={async()=>{
                            await signIn("google",{ callbackUrl: 'http://localhost:3001' })
                        }}
                        className="col-span-2 hover:shadow-md text-center border border-gray-300 p-2.5 rounded-lg bg-gray-50 flex justify-center items-center gap-3">
                        <Image src="/logo.svg" width="30" height="30" alt="google logo" />
                        <div>Sign in with Google</div>
                    </button>
                    <div className="col-span-2 text-center text-gray-500 select-none">
                        or
                    </div>
                    <div>
                        <input type="text" onChange={e=>setFirstName(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="First Name" required />
                    </div>
                    <div>
                        <input type="text" onChange={e=>setLastName(e.target.value)} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Last Name" required />
                    </div>
                    <div className="col-span-2">
                        <input type="text" id="email" onChange={e=>setEmail(e.target.value)} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Email" required />
                    </div>
                    <div className="col-span-2">
                        <input type="text" id="password" onChange={e=>setPassword(e.target.value)} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Password" required />
                    </div>
                    <button  className="col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Create Account</button>
                </div>
                
            </div>
        </div>
    </div>
}