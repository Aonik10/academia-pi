import styles from "./styles/footer.module.scss";
import Image from "next/image";
import logo from "../assets/images/logos/Icono TRANS.png";
import whatsapp from "../assets/images/icons/whatsapp.svg";
import instagram from "../assets/images/icons/instagram.svg";
import location from "../assets/images/icons/geo-alt.svg";
import { RegisterButton } from "@/components/buttons";

interface FooterProps {}

interface ContactInfoProps {
    icon: React.ReactNode;
    text: string;
}

function ContactInfo({ icon, text }: ContactInfoProps) {
    return (
        <div className={styles.contact_info}>
            {icon}
            <p className={styles.text}>{text}</p>
        </div>
    );
}

export default function Footer({}: FooterProps) {
    return (
        <div id="contact" className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <Image width={70} height={70} src={logo} alt="logo" className={styles.image} />
                        <div className={styles.header}>
                            <h2>
                                Academia <span>π</span>
                            </h2>
                            <p className={styles.text}>
                                Porque aprender, <span className={styles.colored}>importa</span>
                            </p>
                        </div>
                    </div>
                    <RegisterButton text="Registrate" />
                </div>
                <div className={styles.info}>
                    <ul className={styles.items}>
                        <li className={styles.item}>Acerca de nosotros</li>
                        <li className={styles.item}>
                            <ContactInfo
                                icon={
                                    <Image
                                        width={26}
                                        height={26}
                                        src={location}
                                        alt="geo location"
                                        className={`${styles.location} ${styles.icon}`}
                                    />
                                }
                                text="Ruta 12 y Capitán Giachino, Km 7 ½, N° 9637. Miguel Lanús, Posadas, Misiones"
                            />
                        </li>
                        <li className={styles.item}>
                            <ContactInfo
                                icon={
                                    <Image
                                        width={26}
                                        height={26}
                                        src={whatsapp}
                                        alt="whatsapp"
                                        className={`${styles.whatsapp} ${styles.icon}`}
                                    />
                                }
                                text="376 488 0657 / 376 462 824"
                            />
                        </li>
                        <li className={styles.item}>
                            <ContactInfo
                                icon={
                                    <Image
                                        width={26}
                                        height={26}
                                        src={instagram}
                                        alt="instagram"
                                        className={`${styles.instagram} ${styles.icon}`}
                                    />
                                }
                                text="/academia_pi_"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
