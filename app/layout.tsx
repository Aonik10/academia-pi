import "./globals.scss";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/components/provider";
import { ReduxProvider } from "@/redux/ReduxProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Academia Pi",
    description: "Academia Pi Website",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <ReduxProvider>
                <NextAuthProvider>
                    <body className={inter.className}>{children}</body>
                </NextAuthProvider>
            </ReduxProvider>
        </html>
    );
}
