import User from "@/database/models/user";
import { compare } from "bcrypt-ts";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { connectToDB } from "@/database/database";
import { createUser } from "@/app/api/users/route";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToDB();
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await User.findOne({ email: credentials.email });

                if (!user || !(await compare(credentials.password, user.password))) {
                    return null;
                }

                return user;
            },
        }),
        GoogleProvider({
            async profile(profile: GoogleProfile) {
                await connectToDB();
                const dbUser = await User.findOne({ email: profile.email });

                if (!dbUser) {
                    return {
                        ...profile,
                        id: profile.sub,
                        image: profile.picture,
                    };
                }
                return {
                    ...profile,
                    id: profile.sub,
                    image: dbUser.image,
                    role: dbUser.role,
                    isActive: dbUser.isActive,
                };
            },
            clientId: process.env.GOOGLE_ID ?? "no-id", //change
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "no-secret", //change
            authorization: {
                //condición para preguntar siempre con que cuenta se desea iniciar sesion
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        session: async ({ session }) => {
            let user = session.user;
            let nameArray = [user?.firstName, user?.lastName];
            if (user?.name) nameArray = user.name.split(" "); // el login viene de google

            await connectToDB();

            let existingUser = await User.findOne({ email: user?.email });

            if (!existingUser && user?.email) {
                const newUser = {
                    email: user.email,
                    password: null,
                    firstName: nameArray[0],
                    lastName: nameArray[nameArray.length - 1],
                    image: user?.image,
                    role: "user",
                };
                existingUser = await createUser(newUser);
            }

            return {
                ...session,
                user: existingUser,
            };
        },
        jwt: ({ token, user }) => {
            // esta funcion se llama cada vez que el token es creado o usado (todo el tiempo basicamente)
            if (user) {
                return {
                    ...token,
                    role: user.role,
                    isActive: user.isActive,
                };
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
    },
};
