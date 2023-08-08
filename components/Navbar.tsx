"use client";

import { useState } from "react";
import styles from "./styles/navBar.module.scss";
import Image from "next/image";
import logo from "../assets/images/logos/Icono TRANS.png";
import Link from "next/link";
import { HamburgerButton } from "./buttons";

interface NavBarProps {}

interface NavBarLinkProps {
    title: string;
    href: string;
    active?: boolean;
    emphasis?: boolean;
}

function NavBarLink({ title, href, active, emphasis }: NavBarLinkProps) {
    return (
        <div className={`${styles.nav_bar_link} ${active ? styles.nav_bar_link_active : ""}`}>
            <Link className={`${styles.nav_bar_link_title} ${emphasis ? styles.emphasis_link : ""}`} href={href}>
                {title}
            </Link>
        </div>
    );
}

export default function NavBar({}: NavBarProps) {
    const [display, setDisplay] = useState(false);

    return (
        <div className={styles.nav_bar}>
            <div className={styles.hamburger_container}>
                <HamburgerButton display={display} onClick={setDisplay} />
            </div>
            <div
                className={`${styles.background_block} ${display ? styles.show : ""}`}
                onClick={() => setDisplay(false)}
            ></div>

            <div className={`${styles.nav_bar_menu} ${display ? styles.nav_bar_show : ""}`}>
                <div className={styles.nav_bar_logo}>
                    <Image width={50} height={50} src={logo} alt="logo"></Image>
                </div>
                <div className={styles.nav_bar_links}>
                    <NavBarLink title="Inicio" href="/" active />
                    <NavBarLink title="Servicios" href="/#services" />
                    <NavBarLink title="Contacto" href="/#contact" />
                    <NavBarLink title="Plataforma π" href="/dashboard" emphasis />
                </div>
            </div>
        </div>
    );
}
