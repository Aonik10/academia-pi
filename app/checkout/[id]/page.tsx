import styles from "./styles/page.module.scss";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/auth";
import { getCourseById } from "@/utils/api_resources";
import PurchaseInfo from "./purchaseInfo";
import Main from "./main";

interface CheckoutProps {
    params: {
        id: string;
    };
}

export default async function Checkout({ params }: CheckoutProps) {
    const { data } = await getCourseById(params.id);
    const session = await getServerSession(authOptions);

    if (data)
        return (
            <main className={styles.checkout}>
                <div className={styles.steps}>
                    <Main user={JSON.parse(JSON.stringify(session?.user))} course={data} />
                </div>
                <PurchaseInfo course={data} />
            </main>
        );
}
