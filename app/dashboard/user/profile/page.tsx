import styles from "./styles/page.module.scss";
import NotAvailable from "@/components/NotAvailable";
import error from "../../../../assets/images/dashboard/undraw_qa_engineers.svg";
import Image from "next/image";

interface UserPaymentsProps {}

export default function UserPayments({}: UserPaymentsProps) {
    return (
        <NotAvailable
            image={<Image src={error} alt="not_found" width={300} height={300} />}
            title="Seccion en construcción"
        />
    );
}
