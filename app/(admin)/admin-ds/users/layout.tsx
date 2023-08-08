export default function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="d-flex flex-column">{children}</div>;
}
