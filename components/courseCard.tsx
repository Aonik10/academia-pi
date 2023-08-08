import styles from "./styles/courseCard.module.scss";
import { InscriptionButton } from "./buttons";
import { CourseCreated } from "@/utils/interfaces";
import CourseMode from "./courseMode";
import { SERVER_URL } from "@/utils/api_resources";

interface CourseCardProps {
    course: CourseCreated;
}

function CourseCard({ course }: CourseCardProps) {
    const { _id, title, image, livePrice, onSale, isLive, isOnDemand } = course;
    const dev_server = SERVER_URL + "/api/images?imageName=";

    return (
        <div className={styles.courseCard} key={_id}>
            <div className={styles.course_img_container}>
                <div className={styles.course_img} style={{ backgroundImage: `url(${dev_server}${image})` }}></div>
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.info_container}>
                    <div className={styles.prices}>
                        <div className={styles.price_container}>
                            <div className={onSale ? styles.discounted : styles.price}>{livePrice} ARS</div>
                            {onSale ? <div className={styles.sale_discount}>{onSale * 100}% OFF</div> : ""}
                        </div>
                        {onSale ? <div className={styles.price}>{livePrice * (1 - onSale)} ARS</div> : ""}
                    </div>
                    <div>
                        <CourseMode mode={isLive} text="En vivo" />
                        <CourseMode mode={isOnDemand} text="On demand" />
                    </div>
                </div>
                <div className={styles.inscription_btn}>
                    <InscriptionButton course={course} />
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
