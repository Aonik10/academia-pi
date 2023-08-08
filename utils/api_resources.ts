import { getServerURL } from "./get_url";
import { UserUpdate, UserCreate, CourseCreate, UserCreated, ApiResponse, CourseCreated } from "./interfaces";

//export const SERVER_URL = "https://academia-pi-typescript-mongodb.vercel.app/api";
export const SERVER_URL = getServerURL();

export async function request(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body: any = null) {
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
        //cache: "no-store",
        next: {
            revalidate: 1,
        },
    });

    return response.json();
}

interface FormDataRequestResponse {
    message: string;
    url: string;
}

export async function formDataRequest(path: string, body: FormData): Promise<FormDataRequestResponse> {
    const response = await fetch(SERVER_URL + path, {
        method: "POST",
        body,
    });
    return response.json();
}

export async function getUsers(filter: string = ""): Promise<ApiResponse<UserCreated[]>> {
    return await request(SERVER_URL + "/api/users?stringFilter=" + filter, "GET");
}

export async function getUserById(id: string): Promise<ApiResponse<UserCreated>> {
    return await request(SERVER_URL + "/api/users/users-by-id?id=" + id, "GET");
}

export async function createUser(body: UserCreate): Promise<ApiResponse<UserCreated>> {
    return await request(SERVER_URL + "/api/users", "POST", body);
}

export async function updateUser(id: string, body: UserUpdate): Promise<ApiResponse<UserCreated>> {
    return await request(SERVER_URL + "/api/users?id=" + id, "PUT", body);
}

export async function deleteUser(id: string): Promise<ApiResponse<UserCreated>> {
    return await request(SERVER_URL + "/api/users?id=" + id, "DELETE");
}

export async function getCourses(): Promise<ApiResponse<CourseCreated[]>> {
    return await request(SERVER_URL + "/api/courses", "GET");
}

export async function getCourseById(id: string): Promise<ApiResponse<CourseCreated>> {
    return await request(SERVER_URL + "/api/courses/courses-by-id?id=" + id, "GET");
}

export async function createCourse(body: CourseCreate): Promise<ApiResponse<CourseCreated>> {
    return await request(SERVER_URL + "/api/courses", "POST", body);
}
