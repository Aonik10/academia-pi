"use client";

import { setDiscount } from "@/redux/features/purchaseSlice";
import styles from "./styles/purchaseInfo.module.scss";
import { RootState } from "@/redux/store";
import { CourseCreated } from "@/utils/interfaces";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

interface PurchaseInfoProps {
    course: CourseCreated;
}

interface PaymentItem {
    text: string;
    amount: number;
    isPromotion?: boolean;
    bigger?: boolean;
}

function PaymentItem({ text, amount, isPromotion, bigger }: PaymentItem) {
    return (
        <li className={`${styles.payment_item} ${bigger && styles.bigger}`}>
            <p className={styles.text}>{text}</p>
            <span className={`${styles.payment_item_data} ${isPromotion && styles.discount}`}>
                {isPromotion && "-"}$ {amount} ARS
            </span>
        </li>
    );
}

export default function PurchaseInfo({ course }: PurchaseInfoProps) {
    const purchaseMode = useSelector((state: RootState) => state.purchase.mode);
    const discount = useSelector((state: RootState) => state.purchase.discount);
    const dispatch = useDispatch();

    const [cupon, setCupon] = useState("");
    const [error, setError] = useState(false); // im going to use this when i had developed the cupon logic

    const date = course.liveDate.split("T")[0];

    const coursePrice =
        purchaseMode == "live" ? course.livePrice : purchaseMode == "onDemand" ? course.onDemandPrice : 0;
    const liveDiscount = course.livePrice * course.onSale;
    const cuponDiscount = discount ? discount * coursePrice : 0;

    const totalPayment = coursePrice - (purchaseMode == "live" ? liveDiscount : 0) - cuponDiscount;

    const handleSetCupon = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCupon(e.target.value);
    };

    const handleCupon = async () => {
        // develop logic to read if cupon exists and apply on the purchase state
        // the cupon should be a number between 0 and 1
        if (discount) {
            dispatch(setDiscount(null));
        } else {
            console.log(cupon);
            dispatch(setDiscount(0.1));
        }
    };

    return (
        <div className={styles.purchase_info}>
            <div className={styles.resume_container}>
                <section className={styles.headers}>
                    <h1>Resumen de Compra</h1>
                    <div className={styles.header}>
                        <div className={styles.title_date_container}>
                            <div className={styles.title}>Curso de {course.title}</div>
                            <div className={styles.date}>Fecha Inicio: {date}</div>
                        </div>
                        <div
                            className={`${styles.payment_mode} ${purchaseMode == "live" ? styles.purcharse_live : ""}`}
                        >
                            {purchaseMode == "live" ? "PREMIUM" : purchaseMode == "onDemand" ? "ON DEMAND" : ""}
                        </div>
                    </div>
                </section>
                <section className={styles.payment_resume}>
                    <h2>Detalles del pago</h2>
                    <ul>
                        <PaymentItem text="Valor curso" amount={coursePrice} />
                        {course.onSale > 0 && purchaseMode == "live" && (
                            <PaymentItem text="Descuento promoción" amount={liveDiscount} isPromotion />
                        )}
                        {discount && discount > 0 && (
                            <PaymentItem text="Descuento cupón" amount={discount * coursePrice} isPromotion />
                        )}
                        <div className={styles.break_line}></div>
                        <PaymentItem text="TOTAL" amount={totalPayment} bigger />
                    </ul>
                </section>
                <section className={styles.cupon_section}>
                    <label className={styles.cupon_section_header}>Ingresar cupón de descuento</label>
                    <div className={styles.add_cupon}>
                        <input
                            type="text"
                            disabled={discount != null}
                            onChange={(e) => handleSetCupon(e)}
                            className={styles.input_cupon}
                        />
                        <button className={styles.btn} onClick={handleCupon}>
                            {discount ? "Quitar" : "Aplicar"}
                        </button>
                    </div>
                    {error && <p>Cupón no válido</p>}
                    <p className={styles.cupon_advice}>Solo es posible aplicar un cupón en tu compra</p>
                </section>
            </div>
        </div>
    );
}
