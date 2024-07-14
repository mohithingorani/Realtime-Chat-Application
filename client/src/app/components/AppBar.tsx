"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { ButtonHTMLAttributes } from "react";
export default function AppBar() {
    const session = useSession()
    return <div className="flex justify-end gap-4 bg-purple-900 pr-4 py-4 text-white">
        {session.status==="authenticated"?(<button onClick={()=>signOut()}>Logout</button>):null}
        {session.status==="unauthenticated"?(<button onClick={()=>signIn()}>Login</button>):null}
        {session.status==="unauthenticated"?(<button onClick={()=>signIn}>Register</button>):null}
    </div>
}

