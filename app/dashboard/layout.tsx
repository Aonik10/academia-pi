import { getServerSession } from "next-auth";
import styles from "./styles/layout.module.scss";
import { authOptions } from "@/utils/auth";
import LoggedSideBar from "@/components/loggedSideBar";
import LoggedNavBar from "@/components/loggedNavBar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getServerSession(authOptions);

    if (session) {
        const { user } = session;

        return (
            <main className={styles.dashboard}>
                <LoggedSideBar role={user?.role ?? "user"} />
                <div className={styles.right_side}>
                    <LoggedNavBar image={user?.image ?? "no-image"} />
                    {children}
                </div>
            </main>
        );
    } else {
        <div>Error, no hay session por alguna razon!</div>;
    }
}
