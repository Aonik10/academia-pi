import styles from "./styles/page.module.scss";
import { Spinner } from "@/components/spinners";

function Loading() {
    return (
        <div className={styles.loading}>
            <Spinner />
        </div>
    );
}

export default Loading;
