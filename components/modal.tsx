"use client";

import { useDispatch, useSelector } from "react-redux";
import { setDisplay } from "@/redux/features/modalSlice";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { RootState } from "@/redux/store";
import CourseMode from "./courseMode";
import { useRouter } from "next/navigation";
import styles from "./styles/modal.module.scss";
import TagBadge from "./tagBadge";

function Modal() {
    const router = useRouter();
    const dispatch = useDispatch();
    const course = useSelector((state: RootState) => state.modal.currentCourse);
    const [exit, setExit] = useState(false);
    const [loading, setLoading] = useState(false);

    const onInscription = (id: string) => {
        setLoading(true);
        router.push(`/checkout/${id}`);
        setLoading(false);
        dispatch(setDisplay(false));
    };

    const closeModal = () => {
        setExit(true);
        setTimeout(() => dispatch(setDisplay(false)), 500);
    };

    const closeOnClickOutside = (e: any) => {
        if (e.target.id == "modal") closeModal();
    };
    if (course)
        return (
            <div className={`${styles.modal} ${exit ? styles.fadeOut : ""}`} id="modal" onClick={closeOnClickOutside}>
                <div className={styles.modal_container}>
                    <div>
                        <div className={styles.modal_header}>
                            <h1 className={styles.course_name}>Curso online: {course?.title}</h1>
                            <button className={styles.close_btn} onClick={closeModal}>
                                <IconX />
                            </button>
                        </div>
                        <div className={styles.content_container}>
                            <div className={styles.course_description}>
                                <div className={styles.professor}>Profesor: {course.professor}</div>
                                <div className={styles.duration}>
                                    Duración: {course.duration} {course.duration == 1 ? "clase" : "clases"}
                                </div>
                                <h2 className={styles.subtitle}>Sobre el curso</h2>
                                <div className={styles.description}>{course.description}</div>
                            </div>
                            <div className={styles.course_details}>
                                <div>
                                    <h2 className={styles.subtitle}>Modalidades</h2>
                                    {/* mejorar esto en algun momento  */}

                                    <div className={styles.modes_section}>
                                        <CourseMode mode={course.isLive} text="En vivo" />
                                        {course.isLive && (
                                            <div className={styles.price_container}>
                                                {course.onSale ? (
                                                    <div className={styles.sale_discount}>
                                                        {course.onSale * 100}% OFF
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className={course.onSale ? styles.discounted : ""}>
                                                    {course.livePrice} ARS
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {course.onSale ? (
                                        <div className={styles.price}>{course.livePrice * (1 - course.onSale)} ARS</div>
                                    ) : (
                                        ""
                                    )}

                                    {/* mejorar esto en algun momento */}
                                    <div className={styles.modes_section}>
                                        <CourseMode mode={course.isOnDemand} text="On demand" />
                                        {course.isOnDemand && <div>{course.onDemandPrice} ARS</div>}
                                    </div>
                                    <div className={styles.tags}>
                                        {course.tags.map((tag) => (
                                            <TagBadge tag={tag} key={tag} />
                                        ))}
                                    </div>
                                </div>
                                <button className={styles.inscription_btn} onClick={() => onInscription(course._id)}>
                                    {loading ? "loading..." : "Inscribirme"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.modal_footer}>
                        <button className={`${styles.close_btn} ${styles.end_btn}`} onClick={closeModal}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        );
    else return null; //para que typescript no se queje
}

export default Modal;
