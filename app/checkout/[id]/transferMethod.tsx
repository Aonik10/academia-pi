import { useRouter } from "next/navigation";
import { Next } from "./main";
import NavButtons from "./navButtons";
import styles from "./styles/transferMethod.module.scss";

interface TransferMethodProps {
    next: (arg: Next) => void;
}

export default function TransferMethod({ next }: TransferMethodProps) {
    const router = useRouter();

    return (
        <div className={styles.transfer_method}>
            <div className={styles.list_wrapper}>
                <ul className={styles.list}>
                    <li className={styles.list_item}>
                        <p className={styles.text}>Titular:</p>
                        <span className={styles.data}>Fernando A. Ramos</span>
                    </li>
                    {/* <li className={styles.list_item}>
                    <p className={styles.text}>Número de cuenta:</p>
                    <span className={styles.data}>112938942349</span>
                </li> */}
                    <li className={styles.list_item}>
                        <p className={styles.text}>Banco:</p>
                        <span className={styles.data}>Industrial</span>
                    </li>
                    <li className={styles.list_item}>
                        <p className={styles.text}>CBU:</p>
                        <span className={styles.data}>0000003100019981096254</span>
                    </li>
                    <li className={styles.list_item}>
                        <p className={styles.text}>Alias:</p>
                        <span className={styles.data}>academia.pi</span>
                    </li>
                </ul>
            </div>
            <NavButtons
                prevText="Volver"
                nextText="Inf Pago"
                onClickPrev={() => next("payment")}
                onClickNext={() => router.push("/dashboard/user/payments")}
                loading={false}
            />
        </div>
    );
}
