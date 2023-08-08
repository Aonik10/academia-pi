"use client";

import "bootstrap/dist/css/bootstrap.css";
import "../../app/(admin)/admin-ds/custom_styles/styles.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLink {
    title: string;
    url: string;
    icon: React.ReactNode;
}

interface SideBarProps {
    navs: NavLink[];
}

export default function SideBar({ navs }: SideBarProps) {
    const pathname = usePathname();

    return (
        <div className="nav flex-column justify-content-between nav-pills pt-3 vh-100 wf-250">
            <div>
                {navs.map((nav) => (
                    <Link
                        key={nav.title}
                        className={`d-flex align-items-center btn btn-outline-secondary border-0  rounded-start-0 ${
                            pathname == nav.url ? "active" : ""
                        }`}
                        href={nav.url}
                    >
                        {nav.icon}
                        <span className="ms-2">{nav.title}</span>
                    </Link>
                ))}
            </div>
            <div className="mb-3">
                <Link
                    className={`d-flex align-items-center btn btn-outline-secondary border-0 rounded-start-0`}
                    href={"/dashboard"}
                >
                    <span className="ms-2">Back to dashboard</span>
                </Link>
            </div>
        </div>
    );
}
