import "bootstrap/dist/css/bootstrap.css";

import { getCourseById } from "@/utils/api_resources";

export const dynamic = "force-dynamic";

interface CourseDetailsProps {
    params: {
        id: string;
    };
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
    const { id } = params;
    const { data } = await getCourseById(id);
    return <div>{JSON.stringify(data)}</div>;
}
