"use client";

import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";

export default function Main() {
    const router = useRouter();

    return (
        <div className="">
            <h1>Welcome admin</h1>
            <p>This is the administrator menu of your bussiness</p>
        </div>
    );
}
