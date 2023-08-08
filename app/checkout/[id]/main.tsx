"use client";

import styles from "./styles/main.module.scss";
import { CourseCreated, UserCreated } from "@/utils/interfaces";
import PersonalInformation from "./personalInfo";
import { useState } from "react";
import PaymentMethods from "./paymentMethods";
import Pricing from "./pricing";

interface MainProps {
    user: UserCreated;
    course: CourseCreated;
}

export default function Main({ user, course }: MainProps) {
    const [next, setNext] = useState<"pricing" | "info" | "payment">("pricing");
    const [hide, setHide] = useState(false);

    const setNextTimed = (value: "pricing" | "info" | "payment") => {
        setHide(true);
        setTimeout(() => {
            setNext(value);
            setHide(false);
        }, 500);
    };

    const prices = {
        premium: course.livePrice,
        onDemand: course.onDemandPrice,
    };

    return (
        <div className={`${styles.main} ${hide ? styles.hide : styles.show}`}>
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        {next == "pricing" ? "Modalidad / " : next == "info" ? "Información Personal / " : "Pago"}
                    </h1>
                    <h2 className={`${next == "payment" ? styles.title : styles.next}`}>
                        {next == "pricing" ? "Información Personal" : next == "info" ? "Pago" : ""}
                    </h2>
                </div>
                <p className={styles.paragraph}>
                    {next == "pricing"
                        ? "Elige la modalidad que mejor se adapte a tus necesidades"
                        : next == "info"
                        ? "Por favor, revisa que la información requerida sea correcta"
                        : "Elige una de las siguientes opciones"}
                </p>
            </div>

            {next == "pricing" ? (
                <Pricing next={setNextTimed} prices={prices} />
            ) : next == "info" ? (
                <PersonalInformation user={user} next={setNextTimed} />
            ) : next == "payment" ? (
                <PaymentMethods next={setNextTimed} course={course} user_id={user._id} />
            ) : (
                <div>error</div>
            )}
            <div></div>
        </div>
    );
}
