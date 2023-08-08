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
}

function SideBarItem({ href, content, icon }: SideBarItemProp) {
    return (
        <Link href={href} className={styles.side_bar_item}>
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
                            content="Inicio"
                            icon={<IconHome className={styles.side_item_bar_logo} />}
                        />
                        <SideBarItem
                            href={"/dashboard/courses"}
                            content="Cursos"
                            icon={<IconShoppingCart className={styles.side_item_bar_logo} />}
                        />
                        <SideBarItem
                            href={"/dashboard/events"}
                            content="Proximos eventos"
                            icon={<IconCalendarEvent className={styles.side_item_bar_logo} />}
                        />
                        <SideBarItem
                            href={"/dashboard/particular"}
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
                            content="Ayuda"
                            icon={<IconHelp className={styles.side_item_bar_logo} />}
                        />
                        <SideBarItem
                            href={"/dashboard"}
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
