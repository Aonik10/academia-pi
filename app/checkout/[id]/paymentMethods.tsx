"use client";

import { useState } from "react";
import styles from "./styles/paymentMethods.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ApiResponse, CourseCreated } from "@/utils/interfaces";
import { SERVER_URL } from "@/utils/api_resources";

interface PaymentMethodProps {
    next: (value: "info" | "payment") => void;
    course: CourseCreated;
    user_id: string;
}

interface MpResponse extends ApiResponse<any> {
    redirectUrl?: string;
}

interface mpPaymentBody {
    userPrice: number;
    course: CourseCreated;
}

async function mpPayment(body: mpPaymentBody): Promise<MpResponse> {
    const response = await fetch(SERVER_URL + "/api/payments/mercadopago", {
        method: "POST",
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
}

export default function PaymentMethods({ next, course, user_id }: PaymentMethodProps) {
    const { mode, discount } = useSelector((state: RootState) => state.purchase);
    const router = useRouter();
    const [selected, setSelected] = useState<"mp" | "transfer">("mp");
    const [loading, setLoading] = useState(false);

    const payerPrice =
        mode == "onDemand"
            ? course.onDemandPrice * (1 - (discount ?? 0))
            : course.livePrice * (1 - course.onSale - (discount ?? 0));

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (selected == "mp") {
                const body = {
                    userPrice: payerPrice,
                    course: course,
                    user_id,
                };
                const data = await mpPayment(body);
                if (data.redirectUrl) {
                    router.push(data.redirectUrl);
                }
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <form className={styles.payment_methods_form} onSubmit={handleSubmit}>
            <div className={styles.form_items}>
                <div
                    className={`${styles.form_item} ${selected == "mp" && styles.selected}`}
                    onClick={() => setSelected("mp")}
                >
                    <input
                        type="radio"
                        name="mp"
                        checked={selected === "mp"}
                        onChange={() => console.log("")}
                        className={styles.item_input}
                    />
                    <div className={styles.item_content_container}>
                        <div className={styles.item_content}>
                            <label className={styles.mp_label}>
                                Mercado Pago (tarjetas de credito / debito, dinero en cuenta u otros medios de pago)
                                <span className={styles.recommended}>{" recomendado"}</span>
                            </label>
                        </div>
                        <div className={styles.mp_image}></div>
                    </div>
                </div>
                <div
                    className={`${styles.form_item} ${selected == "transfer" && styles.selected}`}
                    onClick={() => setSelected("transfer")}
                >
                    <input
                        type="radio"
                        name="transfer"
                        checked={selected === "transfer"}
                        onChange={() => console.log("")}
                        className={styles.item_input}
                    />
                    <div className={styles.item_content_container}>
                        <div className={styles.item_content}>
                            <div className={styles.bank_image}></div>
                            <label className={styles.item_subcontent}>
                                Depósito o transferencia bancaria
                                <span className={styles.warning}>(aprobación de 24 a 48 hs)</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.btns}>
                <button
                    type="button"
                    className={`${styles.btn_back} ${styles.btn}`}
                    onClick={() => next("info")}
                    disabled={loading}
                >
                    Volver
                </button>
                <button
                    className={`${styles.btn_next} ${styles.btn} ${loading ? styles.loading : ""}`}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Ir al pago"}
                </button>
            </div>
        </form>
    );
}
