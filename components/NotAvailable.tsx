"use client";

import styles from "./styles/error.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotAvailableProps {
    image: React.ReactNode;
    title: string;
    subtitle?: string;
}

export default function NotAvailable({ image, title, subtitle }: NotAvailableProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        router.refresh();
        setLoading(false);
    };

    return (
        <div className={styles.error_container}>
            <div className={styles.content}>
                {image}
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <button className={styles.reload_btn} onClick={handleClick}>
                    {loading ? "Loading..." : "Recargar"}
                </button>
            </div>
        </div>
    );
}
