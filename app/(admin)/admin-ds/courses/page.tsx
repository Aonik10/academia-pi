import "bootstrap/dist/css/bootstrap.css";
import { connectToDB } from "@/database/database";
import { CourseCreated } from "@/utils/interfaces";
import CreateCourseForm from "./createCourseMenu";
import Course from "@/database/models/course";
import CoursesGrid from "./coursesGrid";

export const dynamic = "force-dynamic";

const getCourses = async (): Promise<CourseCreated[]> => {
    connectToDB();
    const courses = await Course.find().lean<CourseCreated[]>();
    return courses;
};

export default async function Courses() {
    let courses = await getCourses();

    return (
        <div className="d-flex flex-column h-100">
            <CreateCourseForm />
            <div className="w-100">
                <CoursesGrid courses={courses} />
            </div>
        </div>
    );
}
