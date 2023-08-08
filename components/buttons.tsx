"use client";

import styles from "./styles/buttons.module.scss";
import { useDispatch } from "react-redux";
import { setDisplay, setCurrentCourse } from "@/redux/features/modalSlice";
import { CourseCreated } from "@/utils/interfaces";
import whatsapp from "../assets/images/icons/WhatsApp_icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
    return (
        <button style={{ marginRight: 10 }} onClick={() => console.log("hola")}>
            Sign in
        </button>
    );
};

interface InscriptionButtonProps {
    course: CourseCreated;
}

export const InscriptionButton = ({ course }: InscriptionButtonProps) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setCurrentCourse(course));
        dispatch(setDisplay(true));
    };

    return (
        <button className={styles.inscription_btn} onClick={handleClick}>
            Inscribirme
        </button>
    );
};

interface RegisterButtonProps {
    text: string;
    shadow?: boolean;
}

export const RegisterButton = ({ text, shadow }: RegisterButtonProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/dashboard");
    };

    return (
        <button
            className={styles.register_btn}
            style={shadow ? { boxShadow: "-2px 2px 5px 1px rgba(0,0,0,0.6)" } : {}}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export const WhatsAppButton = () => {
    const router = useRouter();

    const handleClick = () => {
        const msg =
            "Hola,%20estuve%20viendo%20el%20sitio%20web%20y%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios";
        router.push(`https://wa.me/5493764621824?text=${msg}`);
    };

    return (
        <button className={styles.whatsapp_btn} onClick={handleClick}>
            <Image width={50} height={50} src={whatsapp} alt="Whatsapp contact" />
        </button>
    );
};

interface HamburgerProps {
    display: boolean;
    onClick: (arg: boolean) => void;
    light?: boolean;
}

export function HamburgerButton({ display, onClick, light }: HamburgerProps) {
    return (
        <div className={styles.hamburger_btn} onClick={() => onClick(!display)}>
            <div
                style={{ background: light ? "rgb(238, 238, 238)" : "rgb(34, 40, 49)" }}
                className={`${styles.lines_hamburger_btn} ${display ? styles.hamburger_active : ""}`}
            >
                <div className={styles.middle_line}></div>
            </div>
        </div>
    );
}
