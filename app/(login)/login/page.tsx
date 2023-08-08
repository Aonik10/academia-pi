import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import styles from "./styles/page.module.scss";
import SignInForm from "@/components/signInForm";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getServerSession(authOptions);
    if (session?.user) redirect("/");

    return (
        <div className={styles.login}>
            <div>
                <SignInForm />
            </div>
        </div>
    );
}
