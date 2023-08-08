import styles from "./styles/page.module.scss";
import NotAvailable from "@/components/NotAvailable";
import Image from "next/image";
import error from "../../../assets/images/dashboard/undraw_qa_engineers.svg";

interface HelpProps {}

export default function Help({}: HelpProps) {
    return (
        <NotAvailable
            image={<Image src={error} alt="not_found" width={300} height={300} />}
            title="Seccion en construcción"
        />
    );
}
