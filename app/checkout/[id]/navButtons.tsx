import styles from "./styles/navButtons.module.scss";
import "bootstrap/dist/css/bootstrap.css";

import Spinner from "react-bootstrap/Spinner";

interface NavButtonsProps {
    nextText: string;
    prevText: string;
    type?: "button" | "submit";
    disabled?: boolean;
    loading?: boolean;
    onClickPrev?: () => void;
    onClickNext?: () => void;
}

export default function NavButtons({
    nextText,
    prevText,
    type = "button",
    onClickNext,
    onClickPrev,
    loading,
    disabled,
}: NavButtonsProps) {
    return (
        <div className={styles.btns}>
            <button
                type="button"
                className={`${styles.btn_back} ${styles.btn}`}
                onClick={onClickPrev}
                disabled={loading}
            >
                {prevText}
            </button>
            <button
                className={`${styles.btn_next} ${styles.btn} ${loading ? styles.loading : ""} ${
                    disabled ? styles.disabled : ""
                }`}
                type={type}
                disabled={loading}
                onClick={onClickNext}
            >
                {loading ? <Spinner /> : nextText}
            </button>
        </div>
    );
}
