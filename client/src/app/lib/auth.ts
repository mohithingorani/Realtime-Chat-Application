import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials: any) {
                const username = credentials.username
                const password = credentials.password

                //database check logic
                //if credentials are right
                return {
                    id: "user1",
                    username: "mohit"
                    //return user credentials from database you want in the token
                };
                // else f
                // return null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {

        session: ({ session, token, user }: any) => {
            console.log(session)
            if (session && session.user) {
                session.user.id = token.userId
            }
            return session
        }
    },
    pages: {
        signIn: "/signin"
    }
}