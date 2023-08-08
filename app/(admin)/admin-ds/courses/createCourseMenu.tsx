"use client";

import "bootstrap/dist/css/bootstrap.css";
import "../custom_styles/styles.css";

import { useState } from "react";
import { CourseCreate } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { displayToast, setToastData } from "@/redux/features/toastSlice";
import { ToastMessageProps } from "@/components/admin-components//toast";
import { createCourse } from "@/utils/api_resources";

import {
    TextInput,
    TagsInput,
    CheckboxInput,
    DateInput,
    FileInput,
    TextareaInput,
} from "@/components/admin-components/formInputs/formInputs";
import { Collapse } from "react-bootstrap";

export default function CreateCourse() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [newCourse, setNewCourse] = useState<CourseCreate>({
        title: "",
        description: "",
        onDemandPrice: 0,
        image: "",
        liveDate: "",
        tags: [],
        isLive: false,
        isOnDemand: false,
        isActive: false,
    });

    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);

    const triggerToast = (toastData: ToastMessageProps) => {
        dispatch(setToastData(toastData));
        dispatch(displayToast(true));
        setTimeout(() => dispatch(displayToast(false)), 3000);
    };

    const handleCreate = async () => {
        try {
            setLoading(true);
            const response = await createCourse(newCourse);
            if (response.data) {
                const toastData = {
                    title: "Course Created",
                    message: `The course has been created!`,
                };
                triggerToast(toastData);
                router.refresh(); // esto es mal, pero por ahora funciona asi en nextJS
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleCreate();
        return false;
    };

    return (
        <div className="rounded" style={{ minWidth: "430px" }}>
            <div className="d-flex">
                <button className="btn btn-secondary wf-150 m-1" onClick={() => setActive(!active)}>
                    {active ? "Hide Form" : "New Course"}
                </button>
                <Collapse in={active} dimension="width">
                    <div>
                        <button
                            className="btn btn-secondary wf-150  m-1"
                            type="button"
                            name="create-course-btn"
                            onClick={handleSubmit}
                        >
                            {loading ? (
                                <div>
                                    <div className="spinner-border spinner-border-sm text-light me-2"></div>
                                    <span className="sr-only text-light">Creating...</span>
                                </div>
                            ) : (
                                "Create course"
                            )}
                        </button>
                    </div>
                </Collapse>
            </div>
            <Collapse in={active}>
                <div>
                    <form className="d-flex flex-column justify-content-between p-1">
                        <div className="d-flex">
                            <TextInput
                                type="text"
                                content="Title"
                                name="title"
                                placeholder="Title of the course"
                                required={true}
                                value={newCourse.title ?? ""}
                                onChange={(value) => setNewCourse({ ...newCourse, title: value })}
                            />
                            <TextInput
                                type="text"
                                content="Professor"
                                name="professor"
                                placeholder="Full name of the teacher"
                                required={true}
                                value={newCourse.professor ?? ""}
                                onChange={(value) =>
                                    setNewCourse({
                                        ...newCourse,
                                        professor: value,
                                    })
                                }
                            />
                        </div>
                        <div className="d-flex">
                            <DateInput
                                content="Live Date"
                                name="liveDate"
                                value={newCourse.liveDate ?? ""}
                                onChange={(value) =>
                                    setNewCourse({
                                        ...newCourse,
                                        liveDate: value,
                                    })
                                }
                            />
                            {[
                                ["Active", "isActive"],
                                ["Live", "isLive"],
                                ["On demand", "isOnDemand"],
                            ].map((subject) => (
                                <CheckboxInput
                                    key={subject[1]}
                                    content={subject[0]}
                                    name={subject[1]}
                                    onChange={(value) =>
                                        setNewCourse({
                                            ...newCourse,
                                            [subject[1]]: value,
                                        })
                                    }
                                />
                            ))}
                        </div>

                        <div className="d-flex">
                            <TextInput
                                type="number"
                                content="Live"
                                name="livePrice"
                                placeholder="Insert price"
                                value={newCourse.livePrice ?? 0}
                                onChange={(value) =>
                                    setNewCourse({
                                        ...newCourse,
                                        livePrice: Number(value),
                                    })
                                }
                            />
                            <TextInput
                                type="number"
                                content="On demand"
                                name="onDemandPrice"
                                placeholder="Insert price"
                                value={newCourse.onDemandPrice.toString() ?? 0}
                                onChange={(value) =>
                                    setNewCourse({
                                        ...newCourse,
                                        onDemandPrice: Number(value),
                                    })
                                }
                            />
                            <TextInput
                                type="number"
                                content="Sale %"
                                name="onSale"
                                placeholder="0,05 = 5% discount"
                                decimals={true}
                                max={1}
                                value={newCourse.onSale ?? 0}
                                onChange={(value) =>
                                    setNewCourse({
                                        ...newCourse,
                                        onSale: Number(value),
                                    })
                                }
                            />
                            <TextInput
                                type="number"
                                content="Duration"
                                name="duration"
                                placeholder="Number of classes"
                                value={newCourse.duration ?? "0"}
                                onChange={(value) =>
                                    setNewCourse({
                                        ...newCourse,
                                        duration: Number(value),
                                    })
                                }
                            />
                        </div>
                        <div className="d-flex">
                            <FileInput
                                content="Upload Image"
                                name="image"
                                onChange={(value) => setNewCourse({ ...newCourse, image: value })}
                            />
                            <TagsInput name="tags" onChange={(tags) => setNewCourse({ ...newCourse, tags })} />
                        </div>
                        <TextareaInput
                            name="description"
                            placeholder="Description of the course"
                            value={newCourse.description ?? ""}
                            onChange={(value) =>
                                setNewCourse({
                                    ...newCourse,
                                    description: value,
                                })
                            }
                        />
                    </form>
                </div>
            </Collapse>
        </div>
    );
}
