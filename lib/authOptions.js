
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import User from '@/models/User'
import connectDB from '@/db/ConnectDb'

export const authoptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'github' && user.email) {
                await connectDB()

                const currentUser = await User.findOne({
                    email: user.email
                })

                if (!currentUser) {
                    await User.create({
                        email: user.email,
                        name: user.name,
                        username: user.email.split('@')[0],
                    })
                }
            }

            return true
        },

        async session({ session }) {
            await connectDB()

            if (session.user?.email) {
                const dbUser = await User.findOne({
                    email: session.user.email
                })

                if (dbUser) {
                    session.user.name = dbUser.username
                }
            }

            return session
        },
    },
}
