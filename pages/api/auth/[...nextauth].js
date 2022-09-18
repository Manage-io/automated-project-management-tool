import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectToMongo from '../../../utils/dbConnect';
import User from '../../../models/User';

connectToMongo();

export default NextAuth({
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                let user = await User.findOne({
                    email: credentials.email.toLowerCase(),
                    authorized: true
                }).select('-inProject -otpCode -date -__v');

                if (user && user.authorized && user.activeStatus && await bcrypt.compare(credentials.password, user.password)) {
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar,
                        type: user.type
                    }
                }
                else {
                    return null;
                }
            }
        }),
    ],
    pages: { signIn: "/login" },
    refetchInterval: 1 * 24 * 60 * 60,
    secret: process.env.NEXT_AUTH_SECRET,
    session: { jwt: true, maxAge: 7 * 24 * 60 * 60 },
    callbacks: {
        // Assigning encoded token from API to token created in the session
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return (token)
        },

        // Extending session object
        async session({ session, user, token }) {
            session.user = { ...token.user }
            return (session)
        },
    },
})