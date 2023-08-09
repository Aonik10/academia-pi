"use client";

import Link from "next/link";
import styles from "./styles/signIn.module.scss";
import { IconUser, IconLock } from "@tabler/icons-react";
import google from "../assets/images/logos/google_logo.webp";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface FormInputProps {
    label: string;
    name: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: React.ReactNode;
}

function FormInput({ label, name, type, onChange, placeholder, icon }: FormInputProps) {
    return (
        <div className={styles.form_item}>
            <label className={styles.label}>{label}</label>
            <span className={styles.input_frame}>
                {icon}
                <input
                    type={type}
                    name={name}
                    onChange={onChange}
                    className={styles.input_text}
                    placeholder={placeholder}
                />
            </span>
        </div>
    );
}

export default function SignInForm() {
    const router = useRouter();
    const [authData, setAuthData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoading(true);
        setError(false);
        e.preventDefault();
        try {
            console.log("event", e.currentTarget.name);
            console.log("data", authData);
            const response = await signIn(e.currentTarget.name, {
                email: authData.email,
                password: authData.password,
                redirect: false,
                callbackUrl: "/dashboard",
            });
            console.log("response", response);

            if (response?.error) throw new Error(response.error);
            //router.push("/dashboard");
        } catch (error) {
            console.log(error);
            setError(true);
        }

        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData({ ...authData, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
    };

    return (
        <div>
            <form className={styles.login_form}>
                <FormInput
                    label="Correo electrónico"
                    name="email"
                    type="text"
                    onChange={handleChange}
                    placeholder="alumno@academiapi.com"
                    icon={<IconUser className={styles.icon} />}
                />
                <FormInput
                    label="Contraseña"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="Contraseña"
                    icon={<IconLock className={styles.icon} />}
                />
                <div className={styles.remember_section}>
                    <div className={styles.checkbox}>
                        <input type="checkbox" name="remember" onChange={handleChange} />
                        <span>Recordarme</span>
                    </div>
                    <Link href="/" className={styles.form_link}>
                        Olvidé mi contraseña
                    </Link>
                </div>
                <p className={styles.error}>{error && "Usuario y/o contraseña incorrectos"}</p>
                <button className={styles.sign_in_btn} type="submit" name="credentials" onClick={handleSubmit}>
                    {loading ? "loading" : "Iniciar sesión"}
                </button>
                <span>¿No tienes cuenta? </span>
                <Link href="/" className={styles.form_link}>
                    Crear cuenta
                </Link>
                <div className={styles.separator}>
                    <hr />
                    <span>o</span>
                    <hr />
                </div>
                <button className={styles.google_btn} type="submit" name="google" onClick={handleSubmit}>
                    <Image width={25} height={25} src={google} alt="googleLogo" className={styles.google_logo}></Image>
                    <span>Continuar con Google</span>
                </button>
            </form>
        </div>
    );
}
