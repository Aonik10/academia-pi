import { IconCheck, IconX } from "@tabler/icons-react";
import styles from "./styles/courseMode.module.scss";

interface CourseModeProps {
    mode: boolean;
    text: string;
}

function CourseMode({ mode, text }: CourseModeProps) {
    return (
        <div className={styles.course_mode}>
            {mode ? <IconCheck className={styles.check} /> : <IconX className={styles.cross} />}
            <div className={`${mode ? styles.live : styles.not_live}`}>{text}</div>
        </div>
    );
}

export default CourseMode;
