import { displayToast, setToastData } from "@/redux/features/toastSlice";
import { Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";

export interface ToastMessageProps {
    title?: string;
    message?: string;
    comment?: string;
}

export function triggerToast(toastData: ToastMessageProps) {
    const dispatch = useDispatch();
    dispatch(setToastData(toastData));
    dispatch(displayToast(true));
    setTimeout(() => dispatch(displayToast(false)), 3000);
}

export default function ToastMessage({
    title,
    message,
    comment,
}: ToastMessageProps) {
    return (
        <Toast>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">{title ?? "Event"}</strong>
                <small>{comment ?? "just now"}</small>
            </Toast.Header>
            <Toast.Body className="text-success">
                {message ?? "Changes made"}
            </Toast.Body>
        </Toast>
    );
}
