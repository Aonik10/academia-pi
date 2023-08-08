import { UserCreate } from "@/utils/interfaces";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User extends UserCreate {
        _id?: string;
    }
    interface Session {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role?: "user" | "admin";
        isActive?: boolean;
    }
}

/* 

import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            email: string;
            password: string | null;
            firstName: string;
            lastName: string | null;
            image: string;
            role: string;
            inscriptions: string[];
            reffersCodes: string[];
        };
    }

    interface User extends DefaultUser {
        role: string;
    }
}

*/
