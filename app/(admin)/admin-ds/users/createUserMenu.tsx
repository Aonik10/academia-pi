"use client";

import "bootstrap/dist/css/bootstrap.css";
import "../custom_styles/styles.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Collapse } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { displayToast, setToastData } from "@/redux/features/toastSlice";
import { ToastMessageProps } from "@/components/admin-components/toast";
import { TextInput } from "@/components/admin-components/formInputs/formInputs";
import { UserCreate } from "@/utils/interfaces";
import { createUser } from "@/utils/api_resources";

export default function CreateUserForm() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [newUser, setNewUser] = useState<UserCreate>({
        email: "",
    });

    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);

    const triggerToast = (toastData: ToastMessageProps) => {
        dispatch(setToastData(toastData));
        dispatch(displayToast(true));
        setTimeout(() => dispatch(displayToast(false)), 3000);
    };

    const handleCreate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            e.preventDefault();
            setLoading(true);
            const { data } = await createUser(newUser);
            if (data) {
                const toastData = {
                    title: "User Created",
                    message: `The user ${data.email} has been created!`,
                };
                triggerToast(toastData);
                router.refresh(); // esto es mal, pero por ahora funciona asi en nextJS
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="1">
            <div className="d-flex">
                <button className="btn btn-secondary wf-150 m-1 ms-0" type="button" onClick={() => setActive(!active)}>
                    {active ? "Hide form" : "New User"}
                </button>
                <Collapse in={active} dimension={"width"}>
                    <div className="m-1">
                        <button
                            className="btn btn-secondary wf-150"
                            type="submit"
                            name="create-user-btn"
                            onClick={handleCreate}
                        >
                            {loading ? (
                                <div>
                                    <div className="spinner-border spinner-border-sm text-light me-2"></div>
                                    <span className="sr-only text-light">Creating...</span>
                                </div>
                            ) : (
                                "Create user"
                            )}
                        </button>
                    </div>
                </Collapse>
            </div>
            <Collapse in={active}>
                <div className="mt-2 mb-2">
                    <form className="d-flex flex-column justify-content-between h-100">
                        <div className="d-flex">
                            <TextInput
                                type="text"
                                content="Email"
                                name="email"
                                required={true}
                                value={newUser.email ?? ""}
                                onChange={(value) => setNewUser({ ...newUser, email: value })}
                            />
                            <TextInput
                                type="text"
                                content="First Name"
                                name="firstName"
                                value={newUser.firstName ?? ""}
                                onChange={(value) =>
                                    setNewUser({
                                        ...newUser,
                                        firstName: value,
                                    })
                                }
                            />
                            <TextInput
                                type="text"
                                content="Last Name"
                                name="lastName"
                                value={newUser.lastName ?? ""}
                                onChange={(value) =>
                                    setNewUser({
                                        ...newUser,
                                        lastName: value,
                                    })
                                }
                            />
                        </div>
                        <div className="d-flex">
                            <TextInput
                                type="text"
                                content="Phone"
                                name="phoneNumber"
                                value={newUser.phoneNumber ?? ""}
                                onChange={(value) =>
                                    setNewUser({
                                        ...newUser,
                                        phoneNumber: value,
                                    })
                                }
                            />
                            <TextInput
                                type="text"
                                content="DNI"
                                name="id_document"
                                value={newUser.id_document ?? ""}
                                onChange={(value) =>
                                    setNewUser({
                                        ...newUser,
                                        id_document: value,
                                    })
                                }
                            />
                            <TextInput
                                type="text"
                                content="Address"
                                name="address"
                                value={newUser.address ?? ""}
                                onChange={(value) =>
                                    setNewUser({
                                        ...newUser,
                                        address: value,
                                    })
                                }
                            />
                        </div>
                        <TextInput
                            type="text"
                            content="Password"
                            name="password"
                            value={newUser.password ?? ""}
                            onChange={(value) =>
                                setNewUser({
                                    ...newUser,
                                    password: value,
                                })
                            }
                        />
                    </form>
                </div>
            </Collapse>
        </div>
    );
}
