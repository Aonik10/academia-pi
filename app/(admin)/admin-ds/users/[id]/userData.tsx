"use client";

import "bootstrap/dist/css/bootstrap.css";
import { PencilSquare, Save } from "@/components/admin-components/icons";
import { useState } from "react";
import { UserUpdate } from "@/utils/interfaces";
import { updateUser } from "@/utils/api_resources";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { displayToast, setToastData } from "@/redux/features/toastSlice";
import { ToastMessageProps } from "@/components/admin-components/toast";

interface UserDataRowProps {
    title: string;
    name: string;
    content: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editing?: boolean;
    breakLine?: boolean;
}

function UserDataRow({ title, name, content, onChange, editing = false, breakLine = true }: UserDataRowProps) {
    return (
        <div className="m-2">
            <div className="d-flex align-items-center p-3">
                <h5 className="w-25 mb-0">{title}</h5>
                <input
                    type="text"
                    className={`w-75 m-0 p-0 h-100 fs-4 border-0 bg-transparent ${
                        editing ? "text-dark" : "text-secondary"
                    }`}
                    disabled={!editing}
                    name={name}
                    defaultValue={content}
                    onChange={onChange}
                />
            </div>
            {breakLine && <div className="border-bottom me-4 ms-4"></div>}
        </div>
    );
}

export default function UserData({ firstName, lastName, email, phoneNumber, address, role }: UserUpdate) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [editable, setEditable] = useState(false);
    const [data, setData] = useState<UserUpdate>({});

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const triggerToast = (toastData: ToastMessageProps) => {
        dispatch(setToastData(toastData));
        dispatch(displayToast(true));
        setTimeout(() => dispatch(displayToast(false)), 3000);
    };

    const handleSubmit = async () => {
        //if data is empty, go back with no changes
        if (Object.keys(data).length == 0) {
            setEditable(!editable);
        } else {
            setLoading(true);
            try {
                const response = await updateUser(id, data);
                if (response.data) {
                    const toastData = {
                        title: "User updated!",
                        message: "User has been updated successfully",
                    };
                    setData({});
                    triggerToast(toastData);
                    setEditable(!editable);
                    router.refresh();
                }
            } catch (error: any) {
                console.log(error);
            }
            setLoading(false);
        }
    };

    return (
        <div className="w-50">
            <div className="m-3 rounded shadow">
                <UserDataRow
                    title="First Name"
                    name="firstName"
                    content={firstName ?? ""}
                    editing={editable}
                    onChange={handleChange}
                />
                <UserDataRow
                    title="Last Name"
                    name="lastName"
                    content={lastName ?? ""}
                    editing={editable}
                    onChange={handleChange}
                />
                <UserDataRow
                    title="Email"
                    name="email"
                    content={email ?? ""}
                    editing={editable}
                    onChange={handleChange}
                />
                <UserDataRow
                    title="Phone"
                    name="phoneNumber"
                    content={phoneNumber ?? ""}
                    editing={editable}
                    onChange={handleChange}
                />
                <UserDataRow
                    title="Address"
                    name="address"
                    content={address ?? ""}
                    breakLine={false}
                    editing={editable}
                    onChange={handleChange}
                />
                <UserDataRow
                    title="Role"
                    name="role"
                    content={role ?? ""}
                    breakLine={false}
                    editing={editable}
                    onChange={handleChange}
                />
                <div className="">
                    {editable ? (
                        <button className="btn btn-secondary m-3 wf-200" onClick={handleSubmit}>
                            {loading ? (
                                <div>
                                    <div className="spinner-border spinner-border-sm text-light me-2"></div>
                                    <span className="sr-only text-light">Saving...</span>
                                </div>
                            ) : (
                                <div>
                                    <Save />
                                    <span className="ms-2">Save changes</span>
                                </div>
                            )}
                        </button>
                    ) : (
                        <button className="btn btn-secondary m-3 " onClick={() => setEditable(!editable)}>
                            <PencilSquare />
                            <span className="ms-2">Edit data</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
