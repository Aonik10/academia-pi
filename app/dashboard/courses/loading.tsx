import styles from "./styles/page.module.scss";
import { LdsRing } from "@/components/spinners";

function Loading() {
    return (
        <div className={styles.loading}>
            <LdsRing />
        </div>
    );
}

export default Loading;
