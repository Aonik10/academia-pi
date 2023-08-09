"use client";

import styles from "./styles/loggedSideBar.module.scss";
import {
    IconHome,
    IconShoppingCart,
    IconCalendarEvent,
    IconHelp,
    IconArrowBarToLeft,
    IconUserSearch,
    IconSettingsPlus,
} from "@tabler/icons-react";
import logo from "../assets/images/logos/Icono TRANS.png";
import Image from "next/image";
import Link from "next/link";
import { HamburgerButton } from "./buttons";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SideBarItemProp {
    href: string;
    content: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

function SideBarItem({ href, content, icon, onClick }: SideBarItemProp) {
    return (
        <Link href={href} className={styles.side_bar_item} onClick={onClick}>
            {icon}
            <div className={styles.side_bar_item_content}>{content}</div>
        </Link>
    );
}

interface LoggedSideBarProps {
    role: string;
}

function LoggedSideBar({ role }: LoggedSideBarProps) {
    const [display, setDisplay] = useState(false);
    const router = useRouter();

    return (
        <div className={styles.logged_nav_bar_wrapper}>
            <div className={styles.hamburger_container}>
                <HamburgerButton display={display} onClick={setDisplay} light />
            </div>
            <div
                className={`${styles.background_block} ${display ? styles.show : ""}`}
                onClick={() => setDisplay(false)}
            ></div>
            <div className={`${styles.logged_nav_bar} ${display ? styles.logged_nav_bar_show : ""}`}>
                <div className={styles.academy_logo}>
                    <Image width="65" height="65" src={logo} alt="logo" onClick={() => router.push("/dashboard")} />
                </div>
                <div className={styles.menu_container}>
                    <div>
                        <SideBarItem
                            href={"/dashboard"}
                            onClick={() => setDisplay(false)}
                            content="Inicio"
                            icon={<IconHome className={styles.side_item_bar_logo} />}
                        />
                        <SideBarItem
                            href={"/dashboard/courses"}
                            onClick={() => setDisplay(false)}
                            content="Cursos"
                            icon={<IconShoppingCart className={styles.side_item_bar_logo} />}
                        />
                        <SideBarItem
                            href={"/dashboard/events"}
                            onClick={() => setDisplay(false)}
                            content="Proximos eventos"
                            icon={<IconCalendarEvent className={styles.side_item_bar_logo} />}
                        />
                        <SideBarItem
                            href={"/dashboard/particular"}
                            onClick={() => setDisplay(false)}
                            content="Clases particulares"
                            icon={<IconUserSearch className={styles.side_item_bar_logo} />}
                        />
                    </div>
                    <div>
                        {role == "admin" && (
                            <SideBarItem
                                href={"/admin-ds"}
                                content="Admin Panel"
                                icon={<IconSettingsPlus className={styles.side_item_bar_logo} />}
                            />
                        )}
                        <SideBarItem
                            href={"/dashboard/help"}
                            onClick={() => setDisplay(false)}
                            content="Ayuda"
                            icon={<IconHelp className={styles.side_item_bar_logo} />}
                        />
                        <SideBarItem
                            href={"/"}
                            content=""
                            icon={<IconArrowBarToLeft className={styles.side_item_bar_logo} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoggedSideBar;
