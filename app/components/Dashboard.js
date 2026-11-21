
"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchProfile, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [form, setform] = useState({
        name: '',
        email: '',
        username: '',
        profilepic: '',
        coverpic: '',
        razorpayid: '',
        razorpaysecret: ''
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
            router.refresh()
            return
        }

        if (status === 'authenticated') {
            const loadProfile = async () => {
                try {
                    const data = await fetchProfile()

                    if (data) {
                        setform(prev => ({
                            ...prev,
                            ...data
                        }))
                    }
                } catch (error) {
                    setMessage(error.message || "Failed to load profile")
                } finally {
                    setLoading(false)
                }
            }

            loadProfile()
        }
    }, [status, router])

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setMessage('')

        try {
            const result = await updateProfile(form)

            if (result.success) {
                setMessage('Profile saved successfully!')
                toast('Profile Updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                router.push(`/${result.username}`)
                router.refresh()
            }
        } catch (error) {
            setMessage(error.message || 'Something went wrong')
        } finally {
            setSaving(false)
        }
    }

    if (status === 'loading' || loading) {
        return <div className="container mx-auto py-10 text-center">Loading Dashboard...</div>
    }

    if (!session) return null

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='container mx-auto py-5 px-4 sm:px-6'>
                <h1 className='text-center my-5 text-2xl sm:text-3xl font-bold'>
                    Welcome to your Dashboard
                </h1>

                <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input
                            value={form.name}
                            onChange={handleChange}
                            type="text"
                            name='name'
                            id="name"
                            required
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Username
                        </label>
                        <input
                            value={form.username}
                            onChange={handleChange}
                            type="text"
                            name='username'
                            id="username"
                            required
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Profile Picture URL
                        </label>
                        <input
                            value={form.profilepic || ''}
                            onChange={handleChange}
                            type="url"
                            name='profilepic'
                            id="profilepic"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Cover Picture URL
                        </label>
                        <input
                            value={form.coverpic || ''}
                            onChange={handleChange}
                            type="url"
                            name='coverpic'
                            id='coverpic'
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Razorpay Key ID
                        </label>
                        <input
                            value={form.razorpayid || ''}
                            onChange={handleChange}
                            type="text"
                            name="razorpayid"
                            id="razorpayid"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Razorpay Key Secret
                        </label>
                        <input
                            value={form.razorpaysecret}
                            onChange={handleChange}
                            type="password"
                            name="razorpaysecret"
                            id="razorpaysecret"
                            autoComplete="new-password"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {message && (
                        <p className="my-3 text-center text-sm font-medium">
                            {message}
                        </p>
                    )}

                    <div className="my-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none font-medium text-sm disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard
