
"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Dashboard from '../components/Dashboard'

const Dashboardpage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push("/login")
    }
  }, [session, router])

  return (
    <div className="w-full min-w-0">
      <Dashboard />
    </div>
  )
}

export default Dashboardpage
