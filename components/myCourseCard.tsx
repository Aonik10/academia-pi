import styles from "./styles/myCourseCard.module.scss";
import { SERVER_URL } from "@/utils/api_resources";
import { getServerURL } from "@/utils/get_url";
import { InscriptionCreated } from "@/utils/interfaces";

interface MyCourseCardProps {
    inscription: InscriptionCreated;
}

interface DetailItemProps {
    text: string;
    data: string | number;
    status?: "approved" | "pending";
}

function DetailItem({ text, data, status }: DetailItemProps) {
    return (
        <div className={styles.detail}>
            <div className={styles.detail_text}>{text}</div>
            <span className={`${styles.detail_content} ${status == "approved" ? styles.approved : styles.pending}`}>
                {data}
            </span>
        </div>
    );
}

export default function MyCourseCard({ inscription }: MyCourseCardProps) {
    const { course } = inscription;
    const dev_server = SERVER_URL + "/api/images?imageName=";

    return (
        <div className={styles.my_course_card} key={inscription._id}>
            <div className={styles.top_card}>
                <div className={styles.course_img_container}>
                    <div
                        className={styles.course_img}
                        style={{ backgroundImage: `url(${dev_server}${course.image})` }}
                    ></div>
                </div>
                <div className={styles.content}>
                    <h1 className={styles.title}>{course.title}</h1>
                    <div className={styles.details}>
                        <DetailItem text="Cantidad de clases:" data={course.duration} />
                        <DetailItem text="Profesor:" data={course.professor} />
                        <DetailItem
                            text="inscripcion:"
                            data={inscription.status == "approved" ? "Aprobada" : "Pendiente"}
                            status={inscription.status}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.btns}>
                <div></div>
                <button className={styles.btn_drive}>Ir al drive</button>
            </div>
        </div>
    );
}
