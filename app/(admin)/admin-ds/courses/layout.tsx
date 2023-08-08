export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="d-flex flex-column w-100">{children}</div>;
}
