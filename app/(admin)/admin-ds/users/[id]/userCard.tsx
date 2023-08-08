"use client";

import "bootstrap/dist/css/bootstrap.css";
import "../../custom_styles/styles.css";
import { Trash, XCircle } from "@/components/admin-components/icons";
import { updateUser, deleteUser } from "@/utils/api_resources";
import { useParams, useRouter } from "next/navigation";
import { ToastMessageProps } from "@/components/admin-components/toast";
import { displayToast, setToastData } from "@/redux/features/toastSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserCreated } from "@/utils/interfaces";

interface UserCardProps {
    isActive: boolean;
    image?: string;
    fullName: string;
    address?: string;
}

interface UserDeletedMessage {
    message: string;
    user: UserCreated;
}

export default function UserCard({ image, fullName, address, isActive }: UserCardProps) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();

    const [status, setStatus] = useState(isActive);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const triggerToast = (toastData: ToastMessageProps) => {
        dispatch(setToastData(toastData));
        dispatch(displayToast(true));
        setTimeout(() => dispatch(displayToast(false)), 3000);
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await deleteUser(id);
            setShow(false);
            if (response.data) {
                const toastData = {
                    title: response.message,
                    message: `User ${response.data?.email} has been deleted`,
                };
                triggerToast(toastData);
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
        router.push("/admin-ds/users");
    };

    const handleStatus = async () => {
        try {
            const response = await updateUser(id, { isActive: !status });
            if (response.data) {
                setStatus(!status);
                const toastData = {
                    title: "User status updated",
                    message: `User ${status ? "has been blocked" : "is now active"}`,
                };
                triggerToast(toastData);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-25 h-33 m-3 p-3 rounded shadow">
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This user will be deleted permanently, you cannot undo this action. Are you sure you want to
                    continue?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="danger" disabled={loading} className="wf-150" onClick={handleDelete}>
                        {loading ? (
                            <div>
                                <div className="spinner-border spinner-border-sm text-light me-2"></div>
                                <span className="sr-only text-light">Deleting...</span>
                            </div>
                        ) : (
                            "Delete Anyway"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
            <img className="rounded-circle" src={image} alt="profile" width="150" />
            <h3 className="">{fullName}</h3>
            <h4 className="">{address}</h4>
            <div className="d-flex">
                <button className="btn btn-secondary wf-150 me-1" onClick={handleStatus}>
                    <XCircle />
                    <span className="ms-2">{status ? "Block user" : "Unblock"}</span>
                </button>
                <button className="btn btn-danger wf-150" onClick={() => setShow(true)}>
                    <Trash />
                    <span className="ms-2">Delete user</span>
                </button>
            </div>
        </div>
    );
}
