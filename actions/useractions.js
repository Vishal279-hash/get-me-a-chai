
"use server"

import connectDB from '@/db/ConnectDb'
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import { getServerSession } from "next-auth"
import { authoptions } from "@/lib/authOptions"

// Initiate Razorpay Payment
export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()

    // Fetch the secret of the user who is getting the payment
    const user = await User.findOne({
        username: to_username
    }).lean()

    if (!user?.razorpayid || !user?.razorpaysecret) {
        throw new Error("Razorpay credentials are not configured for this user")
    }

    const secret = user.razorpaysecret

    const instance = new Razorpay({
        key_id: user.razorpayid,
        key_secret: secret
    })

    const options = {
        amount: Number.parseInt(amount),
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    }

    const order = await instance.orders.create(options)

    await Payment.create({
        oid: order.id,
        amount: amount / 100,
        username: to_username,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message
    })

    return {
        ...order,
        key_id: user.razorpayid
    }
}

// Fetch User
export const fetchuser = async (username) => {
    await connectDB()

    const user = await User.findOne({
        username: username
    }).lean()

    if (!user) return null

    return {
        ...user,
        _id: user._id.toString()
    }
}

// Fetch Payments
export const fetchpayments = async (username) => {
    await connectDB()

    const payments = await Payment.find({
        to_user: username, done: true
    })
        .sort({ amount: -1 })
        .lean()
      
    return payments.map((payment) => ({
        ...payment,
        _id: payment._id.toString(),
        createdAt: payment.createdAt?.toISOString() || null,
        updatedAt: payment.updatedAt?.toISOString() || null
    }))
      let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean()
        return p

}

// Fetch Logged-in User Profile
export const fetchProfile = async () => {
    const session = await getServerSession(authoptions)

    if (!session?.user?.email) {
        throw new Error("Please login first")
    }

    await connectDB()

    const user = await User.findOne({
        email: session.user.email
    }).lean()

    if (!user) return null

    return {
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        profilepic: user.profilepic || "",
        coverpic: user.coverpic || "",
        razorpayid: user.razorpayid || ""
    }
}

// Update Logged-in User Profile
export const updateProfile = async (form) => {
    const session = await getServerSession(authoptions)

    if (!session?.user?.email) {
        throw new Error("Please login first")
    }

    await connectDB()

    const name = String(form.name || "").trim()
    const username = String(form.username || "").trim()
    const profile = String(form.profilepic || "").trim()
    const cover = String(form.coverpic || "").trim()
    const razorpayid = String(form.razorpayid || "").trim()
    const razorpaysecret = String(form.razorpaysecret || "").trim()

    if (!name || !username) {
        throw new Error("Name and username are required")
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        throw new Error("Username can only contain letters, numbers, _ and -")
    }

    const existingUser = await User.findOne({
        username: username,
        email: { $ne: session.user.email }
    })

    if (existingUser) {
        throw new Error("Username already taken")
    }

    const updateFields = {
        name: name,
        username: username,
        profilepic: profile,
        coverpic: cover,
        razorpayid: razorpayid,
        updatedAt: new Date()
    }

    // Secret blank ho toh existing secret change nahi hoga
    if (razorpaysecret) {
        updateFields.razorpaysecret = razorpaysecret
    }

    const updatedUser = await User.findOneAndUpdate(
        {
            email: session.user.email
        },
        {
            $set: updateFields
        },
        {
            new: true,
            runValidators: true
        }
    ).lean()

    if (!updatedUser) {
        throw new Error("User not found")
    }

    return {
        success: true,
        username: updatedUser.username
    }
}
