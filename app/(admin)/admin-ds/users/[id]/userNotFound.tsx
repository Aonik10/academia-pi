"use client";

import "bootstrap/dist/css/bootstrap.css";
import { EmojiFrown, CaretLeftFill, CaretRightFill } from "@/components/admin-components/icons";
import { useRouter } from "next/navigation";

export default function UserNotFound() {
    const router = useRouter();

    return (
        <div className="d-flex justify-content-center align-items-center h-100 bg-light">
            <div className="border border-1 h-50 w-50 mb-5 shadow-lg">
                <div className="d-flex flex-column justify-content-between h-100 p-4">
                    <div className="text-center p-4">
                        <h1>User Not Found</h1>
                    </div>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <EmojiFrown width="200" height="200" />
                    </div>
                    <div className="d-flex justify-content-between p-4">
                        <button
                            className="btn btn-secondary w-25 d-flex align-items-center"
                            onClick={() => router.push("/admin-ds")}
                        >
                            <CaretLeftFill />
                            <span>Back to Main Menu</span>
                        </button>
                        <button
                            className="btn btn-secondary w-25 d-flex align-items-center"
                            onClick={() => router.push("/admin-ds/users")}
                        >
                            <span>Back to Users Menu</span>
                            <CaretRightFill />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
