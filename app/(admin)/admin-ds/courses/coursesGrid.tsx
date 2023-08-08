import "bootstrap/dist/css/bootstrap.css";
import "../custom_styles/styles.css";
import { CourseCreated } from "@/utils/interfaces";
import { SERVER_URL } from "@/utils/api_resources";

interface CoursesGridProps {
    courses: CourseCreated[];
}

interface CourseCardProps {
    course: CourseCreated;
}

function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="card shadow" style={{ minWidth: "18rem" }}>
            <div
                className="rounded-top-1"
                style={{
                    backgroundImage: `url(${SERVER_URL}/api/images?imageName=${course.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "180px",
                }}
            ></div>
            <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text text-truncate">{course.description}</p>
                <a href={`/admin-ds/courses/${course._id}`} className="btn btn-secondary">
                    See details
                </a>
            </div>
        </div>
    );
}

export default function CoursesGrid({ courses }: CoursesGridProps) {
    return (
        <div className="grid-container p-1">
            {courses.map((course) => (
                <CourseCard course={course} />
            ))}
        </div>
    );
}
