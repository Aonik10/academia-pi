import Image from "next/image";
import styles from "./styles/services.module.scss";
import educator from "../assets/images/services/undraw_educator_re_ju47.svg";
import math from "../assets/images/services/undraw_mathematics_-4-otb.svg";
import professor from "../assets/images/services/undraw_professor_re_mj1s.svg";
import teaching from "../assets/images/services/undraw_teaching_re_g7e3.svg";

interface ServicesProps {}

interface ServiceCardProps {
    image: React.ReactNode;
    title: string;
    text: string;
}

function ServiceCard({ image, text, title }: ServiceCardProps) {
    return (
        <div className={styles.service}>
            {image}
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
}

export default function Services({}: ServicesProps) {
    return (
        <div id="services" className={styles.services_wrapper}>
            <div className={styles.services_container}>
                <div className={styles.services_row}>
                    <ServiceCard
                        image={<Image width={300} height={300} src={educator} alt="service1" />}
                        title="Clases de Apoyo"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tenetur cum aliquid
                        consectetur labore ullam omnis accusantium sequi expedita eaque?"
                    />
                    <ServiceCard
                        image={
                            <Image
                                width={300}
                                height={300}
                                src={math}
                                alt="service1"
                                style={{ marginBottom: "15px" }}
                            />
                        }
                        title="Cursos y Talleres"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tenetur cum aliquid
                        consectetur labore ullam omnis accusantium sequi expedita eaque?"
                    />
                </div>
                <div className={styles.services_row}>
                    <ServiceCard
                        image={<Image width={300} height={300} src={teaching} alt="service1" />}
                        title="Clases Particulares"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tenetur cum aliquid
                        consectetur labore ullam omnis accusantium sequi expedita eaque?"
                    />
                    <ServiceCard
                        image={<Image width={300} height={300} src={professor} alt="service1" />}
                        title="Convertirme en Profe"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tenetur cum aliquid
                        consectetur labore ullam omnis accusantium sequi expedita eaque?"
                    />
                </div>
            </div>
        </div>
    );
}
