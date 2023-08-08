import CourseCard from "@/components/courseCard";
import styles from "./styles/page.module.scss";
import { CourseCreated } from "@/utils/interfaces";
import Course from "@/database/models/course";
import { connectToDB } from "@/database/database";

export const dynamic = "force-dynamic";

const getCourses = async (): Promise<CourseCreated[]> => {
    connectToDB();
    const courses = await Course.find().lean<CourseCreated[]>();
    return courses;
};

export default async function DSCourses() {
    const courses = await getCourses();

    if (courses) {
        return (
            <div className={styles.ds_courses}>
                <div className={styles.titles}>
                    <h1 className={styles.main}>Todos los cursos</h1>
                    <p className={styles.subtitle}>Explora nuestros cursos, no dudes en consultarnos!</p>
                    <hr className={styles.line} />
                </div>
                <div className={styles.courses_container}>
                    <div className={styles.current_courses}>
                        {courses.map(
                            (course) => course.isActive && <CourseCard course={JSON.parse(JSON.stringify(course))} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
