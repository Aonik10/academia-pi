"use client";

import { useState } from "react";
import { IconUser, IconLogout, IconWallet } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import styles from "./styles/loggedNavBar.module.scss";
import Modal from "./modal";

interface LoggedNavBarProps {
    image: string;
}

interface DropDownItemProps {
    content: string;
    icon: React.ReactNode;
    onClick: () => void;
}

function DropDownItem({ content, icon, onClick }: DropDownItemProps) {
    return (
        <div className={styles.dropdown_item} onClick={onClick}>
            {icon}
            <div className={styles.dropdown_item_content}>{content}</div>
        </div>
    );
}

function LoggedNavBar({ image }: LoggedNavBarProps) {
    const modal = useSelector((state: RootState) => state.modal.display);
    const [active, setActive] = useState(false);

    return (
        <div>
            {modal && <Modal />}
            <div className={styles.logged_nav_bar}>
                <div className={styles.items_container}>
                    <div></div>
                    <button
                        className={styles.profile_btn}
                        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
                        onClick={() => setActive(!active)}
                    ></button>
                    <div className={`${styles.dropdown_menu} ${active ? styles.menu_active : ""}`}>
                        <DropDownItem
                            content="Mi perfil"
                            icon={<IconUser className={styles.dropdown_item_logo} />}
                            onClick={() => console.log("hola")}
                        />
                        <DropDownItem
                            content="Mis pagos"
                            icon={<IconWallet className={styles.dropdown_item_logo} />}
                            onClick={() => console.log("hola")}
                        />
                        <DropDownItem
                            content="Cerrar sesión"
                            icon={<IconLogout className={styles.dropdown_item_logo} />}
                            onClick={() => signOut({ callbackUrl: "/" })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoggedNavBar;
