
"use client"
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    document.title = "Login - Get Me A Chai"
    if (session) {
      router.push("/dashboard")
    }
  }, [session, router])

  return (
    <div className="text-white py-10 sm:py-14 px-4 container mx-auto">
      <h1 className="text-center font-bold text-2xl sm:text-3xl">
        Login to Get Started
      </h1>

      <div className="flex flex-col gap-3 min-h-screen items-center px-2 py-10 sm:p-10">

        {/* Google */}
        <button
          type="button"
          className="flex items-center w-full max-w-xs bg-slate-300 text-black border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-2 text-sm font-medium hover:bg-gray-200"
        >
          <span className="text-red-500 font-bold text-xl mr-3">G</span>
          <span>Continue with Google</span>
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          className="flex items-center w-full max-w-xs bg-slate-300 text-black border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-2 text-sm font-medium hover:bg-gray-200"
        >
          <span className="text-blue-600 font-bold text-xl mr-3">in</span>
          <span>Continue with LinkedIn</span>
        </button>

        {/* Twitter */}
        <button
          type="button"
          className="flex items-center w-full max-w-xs bg-slate-300 text-black border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-2 text-sm font-medium hover:bg-gray-200"
        >
          <span className="text-sky-500 font-bold text-xl mr-3">X</span>
          <span>Continue with Twitter</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          className="flex items-center w-full max-w-xs bg-slate-300 text-black border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-2 text-sm font-medium hover:bg-gray-200"
        >
          <span className="text-blue-700 font-bold text-xl mr-3">f</span>
          <span>Continue with Facebook</span>
        </button>

        {/* Github */}
        <button onClick={() => signIn("github")}
          type="button"
          className="flex items-center w-full max-w-xs bg-slate-300 text-black border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-2 text-sm font-medium hover:bg-gray-200"
        >
          <span className="text-black font-bold text-xl mr-3">GH</span>
          <span>Continue with Github</span>
        </button>

        {/* Apple */}
        <button
          type="button"
          className="flex items-center w-full max-w-xs bg-slate-300 text-black border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-2 text-sm font-medium hover:bg-gray-200"
        >
          <span className="text-black font-bold text-xl mr-3">A</span>
          <span>Continue with Apple</span>
        </button>

      </div>
    </div>
  );
};

export default Login;
