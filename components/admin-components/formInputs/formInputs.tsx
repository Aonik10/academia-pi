"use client";

import "bootstrap/dist/css/bootstrap.css";
import "../../../app/(admin)/admin-ds/custom_styles/styles.css";

import { useState, useEffect } from "react";
import { XCircle } from "@/components/admin-components/icons";
import { formDataRequest } from "@/utils/api_resources";

interface BaseInputProps<T> {
    content?: string;
    name: string;
    onChange: (newValue: T) => void;
}

interface BaseTextInputProps<T, K> extends BaseInputProps<T> {
    placeholder?: string;
    required?: boolean;
    value: K;
}

interface FullInputProps<T, K> extends BaseTextInputProps<T, K> {
    type: "text" | "number";
    decimals?: boolean;
    max?: number;
}

export function TextInput({
    type,
    content,
    name,
    placeholder,
    decimals,
    required,
    max,
    value,
    onChange,
}: FullInputProps<string, string | number>) {
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange(target.value);
    };

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-prepend w-50 wm-150">
                <span className="input-group-text rounded-0">
                    {content}
                    {required ? <div className="text-danger ms-1">*</div> : ""}
                </span>
            </div>
            <input
                type={type}
                className="form-control"
                name={name}
                placeholder={placeholder}
                step={decimals ? ".01" : "any"}
                min={0}
                max={max}
                value={value}
                onChange={handleChange}
                required={required}
            />
        </div>
    );
}

export function TextareaInput({
    name,
    placeholder,
    required,
    value,
    onChange,
}: BaseTextInputProps<string, string | number>) {
    const handleChange = ({
        target,
    }: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(target.value);
    };

    return (
        <div className="form-group">
            <textarea
                className="form-control"
                rows={5}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
            ></textarea>
        </div>
    );
}

export function CheckboxInput({
    content,
    name,
    onChange,
}: BaseInputProps<boolean>) {
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange(target.checked);
    };

    return (
        <div className="input-group">
            <div className="input-group-prepend w-100">
                <div className="input-group-text rounded-0">
                    <input
                        type="checkbox"
                        name={name}
                        className="me-2 pe-auto cursor-pointer"
                        onChange={handleChange}
                    />
                    {content}
                </div>
            </div>
        </div>
    );
}

export function DateInput({
    content,
    name,
    required,
    value,
    onChange,
}: BaseTextInputProps<string, string | number>) {
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange(target.value);
    };

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-prepend w-50 wm-150">
                <span className="input-group-text rounded-0">
                    {content}
                    {required ? <div className="text-danger ms-1">*</div> : ""}
                </span>
            </div>
            <input
                type="date"
                className="form-control"
                value={value}
                name={name}
                onChange={handleChange}
                required={required}
            />
        </div>
    );
}

export function FileInput({ content, name, onChange }: BaseInputProps<string>) {
    const [fileName, setFileName] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const uploadImage = async (file: File) => {
        const body = new FormData();
        body.append("image", file);
        const response = await formDataRequest("/images", body);
        return response.url;
    };

    const handleSuccess = async (file: File) => {
        try {
            setLoading(true);
            const image_url = await uploadImage(file);
            const fileToUpload =
                file.name.length > 30
                    ? `${file.name.substring(0, 25)}...`
                    : file.name;
            setFileName(fileToUpload);
            setImage(URL.createObjectURL(file));
            onChange(image_url);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleFailure = () => {
        setFileName("");
        setImage(null);
        onChange("");
    };

    const handleChange = ({
        target: { files },
    }: React.ChangeEvent<HTMLInputElement>) => {
        files?.length == 0 || files == null
            ? handleFailure()
            : handleSuccess(files[0]);
    };

    return (
        <div className="d-flex justify-content-center align-items-center input-group">
            <div className="d-flex align-items-center border border-1 w-100">
                <label
                    className="btn btn-outline-secondary rounded-0 w-50 wm-150"
                    htmlFor="file-upload"
                >
                    {content}
                </label>
                {image ? (
                    <img src={image} width={38} height={38} alt={fileName} />
                ) : loading ? (
                    <div className="spinner-border spinner-border text-secondary me-1 ms-1 text-primary"></div>
                ) : (
                    ""
                )}
                <span className="p-2 text-secondary">{fileName}</span>
                <input
                    type="file"
                    name={name}
                    accept="image/*"
                    id="file-upload"
                    className="d-none"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export function TagsInput({ name, onChange }: BaseInputProps<string[]>) {
    const [tags, setTags] = useState<string[]>([]);

    const addTags = (e: any) => {
        if (e.key === "Enter" && e.target.value != "") {
            setTags([...tags, e.target.value.toUpperCase()]);
            e.target.value = "";
        }
    };

    const removeTags = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index != indexToRemove));
    };

    useEffect(() => {
        onChange(tags);
    }, [tags]);

    return (
        <div className="d-flex justify-content-center align-items-center w-100 ">
            <div className="d-flex border border-1 flex-grow-1 ">
                <ul className="m-0 ps-0">
                    {tags.map((tag, index) => (
                        <li className="badge bg-secondary p-2 m-1" key={index}>
                            <span className="me-1">{tag}</span>
                            <XCircle
                                onClick={() => removeTags(index)}
                                className="cursor-pointer"
                            />
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    name={name}
                    placeholder="Add tags"
                    className="border-0 outline-0 p-2 flex-grow-1"
                    onKeyDown={addTags}
                />
            </div>
        </div>
    );
}
