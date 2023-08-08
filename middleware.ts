import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from "next-auth/middleware";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        //evitar que usuarios inactivos accedan a la plataforma
        if (!req.nextauth.token?.isActive) {
            return NextResponse.redirect(new URL("/blocked", req.url));
        }

        //evitar que ingresen usuarios sin rol de admin a la seccion de administrador
        if (req.nextUrl.pathname.startsWith("/admin-ds") && req.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(new URL("/dashboard", req.url));
        }
    },
    {
        callbacks: {
            // de momento solo admite token como estrategia de session
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard", "/dashboard/(.*)", "/checkout", "/checkout/(.*)", "/admin-ds/", "/admin-ds/(.*)"],
};
