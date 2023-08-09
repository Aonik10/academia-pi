"use client";

import { useRouter } from "next/navigation";
import { Next } from "./main";
import NavButtons from "./navButtons";
import styles from "./styles/transferMethod.module.scss";
import { useState } from "react";
import { SERVER_URL } from "@/utils/api_resources";
import { ApiResponse, CourseCreated, InscriptionCreate, InscriptionCreated } from "@/utils/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface TransferMethodProps {
    next: (arg: Next) => void;
    course: CourseCreated;
    user_id: string;
}

async function createInscription(body: InscriptionCreate): Promise<ApiResponse<InscriptionCreated>> {
    const response = await fetch(SERVER_URL + "/api/inscriptions", {
        method: "POST",
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
}

export default function TransferMethod({ next, course, user_id }: TransferMethodProps) {
    const { mode, discount } = useSelector((state: RootState) => state.purchase);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const payerPrice =
        mode == "onDemand"
            ? course.onDemandPrice * (1 - (discount ?? 0))
            : course.livePrice * (1 - course.onSale - (discount ?? 0));

    const handleClick = async () => {
        setLoading(true);
        try {
            const response = await createInscription({
                user_id,
                course_id: course._id,
                amount_paid: payerPrice,
                status: "pending",
            });
            if (response.data) {
                router.push("/dashboard/user/payments/" + response.data._id);
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className={styles.transfer_method}>
            <div className={styles.list_wrapper}>
                <ul className={styles.list}>
                    <li className={styles.list_item}>
                        <p className={styles.text}>Titular:</p>
                        <span className={styles.data}>Fernando A. Ramos</span>
                    </li>
                    <li className={styles.list_item}>
                        <p className={styles.text}>Banco:</p>
                        <span className={styles.data}>Industrial</span>
                    </li>
                    <li className={styles.list_item}>
                        <p className={styles.text}>CBU:</p>
                        <span className={styles.data}>0000003100019981096254</span>
                    </li>
                    <li className={styles.list_item}>
                        <p className={styles.text}>Alias:</p>
                        <span className={styles.data}>academia.pi</span>
                    </li>
                </ul>
            </div>
            <NavButtons
                prevText="Volver"
                nextText="Inf Pago"
                onClickPrev={() => next("payment")}
                onClickNext={handleClick}
                loading={loading}
            />
        </div>
    );
}
