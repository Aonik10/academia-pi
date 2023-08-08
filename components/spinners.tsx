import styles from "./styles/spinners.module.scss";

export function LdsRing() {
    return (
        <div className={styles.lds_ring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
