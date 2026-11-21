
"use client"

import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { notFound } from 'next/navigation'


const PaymentPage = ({ username }) => {

    const [paymentform, setPaymentform] = useState({
        name: '',
        message: '',
        amount: ''
    })

    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(false)

    const searchParams = useSearchParams()

    useEffect(() => {
        const getData = async () => {
            try {
                let u = await fetchuser(username)
                setcurrentUser(u || {})

                let dbbpayments = await fetchpayments(username)
                setPayments(dbbpayments || [])

                console.log("USER:", u)
                console.log("PAYMENTS:", dbbpayments)

            } catch (error) {
                console.error("Data Fetch Error:", error)
            }
        }

        getData()
    }, [username])

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Payment has been made', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            })
        }
    }, [searchParams])

    const handleChange = (e) => {
        setPaymentform({
            ...paymentform,
            [e.target.name]: e.target.value
        })
    }

    const pay = async (amount) => {
        try {
            if (loading) return

            if (!window.Razorpay) {
                alert("Razorpay is still loading. Please try again.")
                return
            }

            if (!paymentform.name.trim()) {
                alert("Please enter your name")
                return
            }

            if (paymentform.name.trim().length < 3) {
                alert("Name must be at least 3 characters")
                return
            }

            if (!amount || amount <= 0) {
                alert("Please enter a valid amount")
                return
            }

            setLoading(true)

            const a = await initiate(amount, username, paymentform)

            if (!a || !a.id) {
                throw new Error("Unable to create Razorpay order")
            }

            const options = {
                key: a.key_id || currentUser.razorpayid,
                amount: a.amount,
                currency: "INR",
                name: "Get Me A Chai",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: a.id,

                callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,

                prefill: {
                    name: paymentform.name,
                    email: "",
                    contact: ""
                },

                notes: {
                    address: "Razorpay Corporate Office"
                },

                theme: {
                    color: "#3399cc"
                }
            }

            const rzp1 = new window.Razorpay(options)

            rzp1.on('payment.failed', function (response) {
                console.error("Razorpay Payment Failed:", response.error)
                alert("Payment failed. Please try again.")
            })

            rzp1.open()

        } catch (error) {
            console.error("Payment Error:", error)
            alert(error.message || "Payment failed to start. Check the terminal.")
        } finally {
            setLoading(false)
        }
    }

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

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <div className="cover w-full relative">
                <img
                    className="object-cover w-full h-[220px] sm:h-[280px] md:h-[350px]"
                    src={currentUser.coverpic || null}
                    alt=""
                />

                <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 border-white border-2 overflow-hidden rounded-full">
                    <img
                        className="rounded-full w-[120px] h-[120px] sm:w-[145px] sm:h-[145px] object-cover"
                        width={145}
                        height={145}
                        src={currentUser.profilepic || null}
                        alt=""
                    />
                </div>
            </div>

            <div className="info flex justify-center items-center my-20 sm:my-24 flex-col gap-2 px-3">

                <div className="font-bold text-lg break-all">
                    @{username}
                </div>

                <div className="text-slate-400 text-center">
                    Lets help {username} ! get a chai!
                </div>

                <div className="text-slate-400 text-center text-sm sm:text-base">
                    {payments.length} Payments . ₹{payments.reduce((a, b) => a + Number(b.amount || 0), 0)} raised
                </div>

                <div className="payment flex flex-col md:flex-row gap-4 w-full md:w-[90%] lg:w-[80%] max-w-6xl mt-8 sm:mt-11">

                    <div className="supporters w-full md:w-1/2 min-w-0 bg-slate-900 rounded-lg text-white p-4 sm:p-6 md:p-8 lg:p-10">

                        <h2 className="text-xl sm:text-2xl font-bold my-5">
                            Top 10 Supporters
                        </h2>

                        <ul className="mx-1 sm:mx-5">
                            {payments.length === 0 && <li>No payments yet</li>}

                            {payments.map((p, i) => {
                                return (
                                    <li key={p._id || i} className='my-4 flex gap-2 items-start break-words min-w-0'>
                                        <img className="shrink-0" width={33} src="avatar.gif" alt="user avatar" />

                                        <span className="min-w-0 break-words">
                                            {p.name}
                                            <span className="font-bold"> ₹{p.amount}</span>
                                            {' '}with a message "{p.message}"
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>

                    <div className="makePayment w-full md:w-1/2 min-w-0 bg-slate-900 rounded-lg text-white p-4 sm:p-6 md:p-8 lg:p-10">

                        <h2 className="text-xl sm:text-2xl font-bold my-5">
                            Make a Payment
                        </h2>

                        <div className="flex gap-2 flex-col">

                            <div>
                                <input
                                    onChange={handleChange}
                                    value={paymentform.name}
                                    name='name'
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-slate-800"
                                    placeholder="Enter Name"
                                />
                            </div>

                            <input
                                onChange={handleChange}
                                value={paymentform.message}
                                name='message'
                                type="text"
                                className="w-full p-3 rounded-lg bg-slate-800"
                                placeholder="Enter Message"
                            />

                            <input
                                onChange={handleChange}
                                value={paymentform.amount}
                                name="amount"
                                type="number"
                                min="1"
                                className="w-full p-3 rounded-lg bg-slate-800"
                                placeholder="Enter Amount"
                            />

                            <button
                                type="button"
                                onClick={() => pay(Number(paymentform.amount) * 100)}
                                className="text-white bg-gradient-to-br rounded-lg from-purple-900 to-blue-900 hover:bg-gradient-to-bl font-medium text-sm px-4 py-2.5 text-center disabled:bg-slate-600 disabled:from-slate-900"
                                disabled={loading || paymentform.name.trim().length < 3 || paymentform.message.trim().length < 4 || Number(paymentform.amount) <= 0}
                            >
                                {loading ? "Please wait..." : "Pay"}
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-2 mt-5">

                            <button disabled={loading} className="bg-slate-800 p-3 rounded-lg disabled:opacity-50 flex-1 min-w-[80px]" onClick={() => pay(1000)}>
                                Pay ₹10
                            </button>

                            <button disabled={loading} className="bg-slate-800 p-3 rounded-lg disabled:opacity-50 flex-1 min-w-[80px]" onClick={() => pay(2000)}>
                                Pay ₹20
                            </button>

                            <button disabled={loading} className="bg-slate-800 p-3 rounded-lg disabled:opacity-50 flex-1 min-w-[80px]" onClick={() => pay(3000)}>
                                Pay ₹30
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
