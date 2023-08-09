"use client";

import styles from "./styles/personalInfo.module.scss";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { UserCreated } from "@/utils/interfaces";
import { updateUser } from "@/utils/api_resources";
import { useForm } from "react-hook-form";

interface PersonalInformationProps {
    user: UserCreated;
    setUser: (arg: UserCreated) => void;
    next: (value: "pricing" | "info" | "payment") => void;
}

interface FormInputPropsNew {
    label: string;
    signal?: boolean;
    input: React.ReactNode;
}

function FormInput({ label, signal, input }: FormInputPropsNew) {
    return (
        <div className={styles.form_item}>
            <label className={styles.label}>
                {label} <span className={styles.required}>{signal && " *"}</span>
            </label>
            <span className={styles.input_frame}>{input}</span>
        </div>
    );
}

export default function PersonalInformation({ user, setUser, next }: PersonalInformationProps) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            id_document: user.id_document,
            address: user.address,
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await updateUser(user._id, data);
            if (response.error) throw new Error(response.message);
            if (response.data) setUser(response.data);
            next("payment");
        } catch (error: any) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className={styles.personal_info_wrapper}>
            <form className={styles.personal_info_form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_row}>
                    <FormInput
                        label="Nombre"
                        signal={true}
                        input={
                            <div>
                                <input
                                    className={styles.input_text}
                                    type="text"
                                    {...register("firstName", {
                                        required: true,
                                        pattern: /^[a-zA-Z]+$/,
                                    })}
                                />
                                <p className={styles.error}>
                                    {errors.firstName?.type == "pattern" && "Debe contener solo letras"}
                                </p>
                            </div>
                        }
                    />
                    <FormInput
                        label="Apellido"
                        signal={true}
                        input={
                            <div>
                                <input
                                    className={styles.input_text}
                                    type="text"
                                    {...register("lastName", {
                                        required: true,
                                        pattern: /^[a-zA-Z]+$/,
                                    })}
                                />
                                <p className={styles.error}>
                                    {errors.lastName?.type == "pattern" && "Debe contener solo letras"}
                                </p>
                            </div>
                        }
                    />
                </div>
                <div className={styles.form_row}>
                    <FormInput
                        label="Telefono"
                        signal={true}
                        input={
                            <div>
                                <input
                                    className={styles.input_text}
                                    type="text"
                                    {...register("phoneNumber", {
                                        required: true,
                                        pattern: /^[0-9]+$/,
                                        minLength: 6,
                                    })}
                                />
                                <p className={styles.error}>
                                    {errors.phoneNumber?.type == "pattern" && "Debe contener solo números"}
                                    {errors.phoneNumber?.type == "minLength" && "Al menos 6 digitos"}
                                </p>
                            </div>
                        }
                    />
                    <FormInput
                        label="DNI"
                        signal={true}
                        input={
                            <div>
                                <input
                                    className={styles.input_text}
                                    type="text"
                                    {...register("id_document", {
                                        required: true,
                                        pattern: /^[0-9]+$/,
                                        minLength: 8,
                                    })}
                                />
                                <p className={styles.error}>
                                    {errors.id_document?.type == "pattern" && "Debe contener solo números"}
                                    {errors.id_document?.type == "minLength" && "Al menos 8 numeros"}
                                </p>
                            </div>
                        }
                    />
                </div>
                <div>
                    <FormInput
                        label="Dirección"
                        input={
                            <div>
                                <input className={styles.input_text} type="text" {...register("address", {})} />
                            </div>
                        }
                    />
                </div>

                <div className={styles.btns}>
                    <button
                        type="button"
                        className={`${styles.btn_back} ${styles.btn}`}
                        onClick={() => next("pricing")} //router.push("/dashboard/courses")
                        disabled={loading}
                    >
                        Volver
                    </button>
                    <button
                        className={`${styles.btn_next} ${styles.btn} ${loading ? styles.loading : ""}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : "Siguiente"}
                    </button>
                </div>
            </form>
            <div>
                <p className={styles.signal}>
                    <span className={styles.required}>{"* "}</span>
                    Campo obligatorio
                </p>
                <p
                    className={styles.signal}
                >{`Los detalles serán enviados a tu casilla de correo electrónico "${user.email}"`}</p>
            </div>
        </div>
    );
}
