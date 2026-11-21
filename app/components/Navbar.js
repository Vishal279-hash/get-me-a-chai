
'use client'

import React, {useState} from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)
  console.log("SESSION DATA:", session)

  return (
    <nav className='bg-gray-900 text-white flex justify-between px-3 sm:px-4 items-center min-h-16 gap-2'>

      <Link className="logo font-bold text-base sm:text-lg flex justify-center items-center shrink-0" href={"/"}>
        <img className="invertIMG" src="tea.gif" width={44} alt="" />
        <span>Get Me a Chai!</span>
      </Link>

      <div className="relative flex items-center gap-1 sm:gap-2 shrink-0" onMouseLeave={() => setShowdropdown(false)}>

        {session && <>
          <button onClick={()=> setShowdropdown(!showdropdown)} className="inline-flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg border border-transparent shadow-xs font-medium text-xs sm:text-sm px-2 sm:px-4 py-2.5 max-w-[110px] sm:max-w-none" type="button">
            <span className="truncate">Welcome {session.user.email}</span>
            <svg className="w-4 h-4 ms-1 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
            </svg>
          </button>

          <div id="dropdown" className={`absolute top-full right-0 mt-2 z-50 ${showdropdown ? "" : "hidden"} bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44`}>
            <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Your Page</Link>
              </li>
              <li>
                <button type="button" onClick={() => signOut({ callbackUrl: "/login" })} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded text-left">Sign out</button>
              </li>
            </ul>
          </div>
        </>}

        {session && (
          <button
            className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-5 py-2.5 text-center whitespace-nowrap shrink-0'
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}

        {!session && (
          <Link href={"/login"}>
            <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2.5">
              Login
            </button>
          </Link>
        )}
      </div>

    </nav>
  )
}

export default Navbar
