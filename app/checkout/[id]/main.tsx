"use client";

import styles from "./styles/main.module.scss";
import { CourseCreated, UserCreated } from "@/utils/interfaces";
import PersonalInformation from "./personalInfo";
import { useState } from "react";
import PaymentMethods from "./paymentMethods";
import Pricing from "./pricing";
import TransferMethod from "./transferMethod";

interface MainProps {
    user: UserCreated;
    course: CourseCreated;
}

export type Next = "pricing" | "info" | "payment" | "transfer";

export default function Main({ user, course }: MainProps) {
    const [userData, setUserData] = useState(user);
    const [next, setNext] = useState<Next>("pricing");
    const [hide, setHide] = useState(false);

    const setNextTimed = (value: Next) => {
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
                        {next == "pricing"
                            ? "Modalidad / "
                            : next == "info"
                            ? "Información Personal / "
                            : next == "payment"
                            ? "Pago"
                            : next == "transfer"
                            ? "Datos bancarios"
                            : ""}
                    </h1>
                    <h2 className={`${next == "payment" ? styles.title : styles.next}`}>
                        {next == "pricing" ? "Información Personal" : next == "info" ? "Pago" : ""}
                    </h2>
                </div>

                {next == "pricing" ? (
                    <p className={styles.paragraph}>Elige la modalidad que mejor se adapte a tus necesidades.</p>
                ) : next == "info" ? (
                    <p className={styles.paragraph}>
                        Por favor, revisa que la información requerida sea correcta. Los cambios que realices se
                        guardarán.
                    </p>
                ) : next == "payment" ? (
                    <p className={styles.paragraph}>Elige una de las siguientes opciones de pago.</p>
                ) : next == "transfer" ? (
                    <p className={`${styles.paragraph} ${styles.p_larger}`}>
                        Haz tu transferencia a la cuenta bancaria que se detalla a continuación. Luego, podrás informar
                        el pago en tu cuenta para completar tu inscripción al curso.
                    </p>
                ) : (
                    <p className={styles.paragraph}></p>
                )}
            </div>

            {next == "pricing" ? (
                <Pricing next={setNextTimed} prices={prices} />
            ) : next == "info" ? (
                <PersonalInformation user={userData} setUser={setUserData} next={setNextTimed} />
            ) : next == "payment" ? (
                <PaymentMethods next={setNextTimed} course={course} user_id={user._id} />
            ) : next == "transfer" ? (
                <TransferMethod next={setNextTimed} course={course} user_id={user._id} />
            ) : (
                <div>error</div>
            )}
            <div></div>
        </div>
    );
}
