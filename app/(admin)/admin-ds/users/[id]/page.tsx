import UserCard from "./userCard";
import UserData from "./userData";
import UserNotFound from "./userNotFound";
import { connectToDB } from "@/database/database";
import User from "@/database/models/user";

export const dynamic = "force-dynamic";

interface UserDetailProps {
    params: {
        id: string;
    };
}

async function getUserById(id: string) {
    await connectToDB();
    return await User.findById(id);
}

export default async function UserDetail({ params }: UserDetailProps) {
    const user = await getUserById(params.id);

    if (user) {
        return (
            <div className="d-flex justify-content-center h-100">
                <UserCard
                    isActive={user.isActive ?? true}
                    image={user.image}
                    fullName={user.firstName + " " + user.lastName}
                />
                <UserData
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    phoneNumber={user.phoneNumber}
                    address={user.address}
                    role={user.role}
                />
            </div>
        );
    } else {
        return <UserNotFound />;
    }
}
