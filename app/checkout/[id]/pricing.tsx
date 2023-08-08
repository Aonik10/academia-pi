"use client";

import { useEffect, useState } from "react";
import styles from "./styles/pricing.module.scss";
import { useRouter } from "next/navigation";
import { IconBroadcast, IconVideo } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { PurchaseMode, setMode } from "@/redux/features/purchaseSlice";
import { RootState } from "@/redux/store";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

interface PricingProps {
    next: (value: "pricing" | "info" | "payment") => void;
    prices: {
        [key: string]: number;
    };
}

interface PlanCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    price: number;
    features: string[];
    active: boolean;
    onClick: () => void;
    recomended?: boolean;
}

interface FeaturesBtnProps {
    state: boolean;
    onClick: () => void;
}

function FeaturesBtn({ state, onClick }: FeaturesBtnProps) {
    return (
        <button className={styles.features_btn} onClick={onClick}>
            {state ? <IconChevronDown /> : <IconChevronUp />}
        </button>
    );
}

function PlanCard({ icon, title, description, price, features, active, onClick }: PlanCardProps) {
    const [hidden, setHidden] = useState(true);

    const handleClick = () => {
        setHidden(!hidden);
    };

    return (
        <div
            className={`${styles.plan_card} ${active ? styles.active : ""} ${hidden ? "" : styles.plan_card_short}`}
            onClick={onClick}
        >
            <div className={`${styles.header} ${title == "Premium" && styles.isLive}`}>
                <span className={styles.icon}>{icon}</span>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.card_content}>
                <div className={styles.price}>$ {price} ARS</div>
                <div className={styles.description}>
                    {description}
                    <FeaturesBtn state={hidden} onClick={handleClick} />
                </div>
                <div className={`${styles.features} ${hidden ? styles.hidden : ""}`}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.feature}>
                            {feature}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Pricing({ next, prices }: PricingProps) {
    const purchaseMode = useSelector((state: RootState) => state.purchase.mode);

    const [selected, setSelected] = useState<PurchaseMode>(purchaseMode);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = () => {
        setLoading(true);
        next("info");
        setLoading(false);
    };

    useEffect(() => {
        dispatch(setMode(selected));
        selected && setDisabled(false);
    }, [selected]);

    const featuresOnDemand = [
        "Acceso al Drive con todas las clases grabadas para que puedas verlas cuando quieras",
        "Documentación y herramientas para realizar el curso",
        "Certificado de finalización del curso con evaluación previa",
    ];
    const featuresLive = featuresOnDemand.concat([
        "Acceso a clases EN DIRECTO",
        "Acceso al grupo de Whatsapp, con seguimiento y acompañamiento del profesor, para hacer consultas y sacarte todas tus dudas",
    ]);

    return (
        <div className={styles.pricing}>
            <div className={styles.plan_container}>
                <PlanCard
                    icon={<IconVideo width={40} height={40} />}
                    title="On demand"
                    description="Diseñado para que gestiones tu tiempo de estudio"
                    price={prices.onDemand}
                    features={featuresOnDemand}
                    active={selected == "onDemand"}
                    onClick={() => setSelected("onDemand")}
                />
                <PlanCard
                    icon={<IconBroadcast width={40} height={40} />}
                    title="Premium"
                    description="Curso en vivo y en directo, con acompañamiento y asesoría permanente del profesor"
                    price={prices.premium}
                    features={featuresLive}
                    active={selected == "live"}
                    onClick={() => setSelected("live")}
                />
            </div>
            <div className={styles.btns}>
                <button
                    className={`${styles.btn_back} ${styles.btn}`}
                    onClick={() => router.push("/dashboard/courses")}
                >
                    Volver
                </button>
                <button
                    className={`${styles.btn_next} ${styles.btn} ${loading ? styles.loading : ""} ${
                        disabled ? styles.disabled : ""
                    }`}
                    onClick={handleClick}
                    disabled={disabled}
                >
                    {loading ? "Cargando..." : "Siguiente"}
                </button>
            </div>

            <p className={styles.signal}>Selecciona una modalidad para continuar</p>
        </div>
    );
}
