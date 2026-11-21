
import PaymentPage from '../components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDB from '@/db/ConnectDb'
import User from '@/models/User'
import { connection } from 'next/server'
import { title } from 'node:process'

export const instant = false

const reservedUsernames = ['login', 'api', 'dashboard']

const Username = async ({ params }) => {
    const { username } = await params

    await connection()

    if (!username || reservedUsernames.includes(username)) {
        return notFound()
    }

    const checkUser = async () => {
        await connectDB()
        let u = await User.findOne({ username: username })

        if (!u) {
            return notFound()
        }
    }

    await checkUser()

    return <PaymentPage username={username} />
}

export default Username

export async function generateMetadata({ params }) {
    const { username } = await params

    return {
        title: `Support ${username} - Get Me A Chai`,
    }
}



