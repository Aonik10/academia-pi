import styles from "./styles/spinners.module.scss";

export function Spinner({}) {
    return (
        <div className={styles.lds_ring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
