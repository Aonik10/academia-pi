"use client";

import { Search } from "@/components/admin-components/icons";
import { getUsers } from "@/utils/api_resources";
import { UserCreated } from "@/utils/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UsersTableProps {
    users: UserCreated[];
}

interface TableRowProps {
    user: UserCreated;
}

interface TableDataProps {
    id: string;
    content?: string | number;
}

interface InputComponentProps<T> {
    onChange: (e: React.ChangeEvent<T>) => void;
    onClick?: () => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

function TableData({ id, content }: TableDataProps) {
    return (
        <td className="p-0">
            <div className="position-relative p-2">
                <Link href={"/admin-ds/users/" + id} className="stretched-link" />
                {content}
            </div>
        </td>
    );
}

function TableRow({ user }: TableRowProps) {
    const id = user._id.toString();
    return (
        <tr>
            <TableData id={id} content={user.email} />
            <TableData id={id} content={user.firstName} />
            <TableData id={id} content={user.lastName} />
            <TableData id={id} content={user.phoneNumber} />
            <TableData id={id} content={user.id_document} />
            <TableData id={id} content={user.inscriptions.length} />
            <TableData id={id} content={user.reffersCodes.length} />
        </tr>
    );
}

function SearchBar({ onChange, onClick, onKeyPress }: InputComponentProps<HTMLInputElement>) {
    return (
        <div className="input-group w-25">
            <input
                type="search"
                className="form-control"
                placeholder="Search user"
                onChange={onChange}
                onKeyUp={onKeyPress}
            />
            <div className="input-group-append">
                <button className="btn btn-secondary rounded-0" type="button" onClick={onClick}>
                    <Search />
                </button>
            </div>
        </div>
    );
}

function Selector({ onChange }: InputComponentProps<HTMLSelectElement>) {
    return (
        <div className="d-flex justify-content-center align-items-center ">
            <label className="me-3 wf-100 ">Page Size</label>
            <select
                className="form-select w-50 "
                aria-label="Default select example"
                onChange={onChange}
                defaultValue={15}
            >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
}

export default function UsersTable({ users }: UsersTableProps) {
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(15);
    const [page, setPage] = useState(0);
    const [usersRendered, setUsersRendered] = useState(users);

    useEffect(() => {
        setUsersRendered(users);
    }, [users]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
    };

    const handleFilter = async () => {
        const { data } = await getUsers(search);
        if (data) {
            setUsersRendered(data);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") handleFilter();
    };

    return (
        <div className="p-4 rounded shadow h-100">
            <div className="d-flex flex-column justify-content-between h-100">
                <div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <SearchBar onChange={handleSearch} onClick={handleFilter} onKeyPress={handleKeyPress} />
                        <Selector onChange={handleSelect} />
                    </div>
                    <table className="table table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">DNI</th>
                                <th scope="col">Inscriptions</th>
                                <th scope="col">Codes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersRendered.slice(page * pageSize, (page + 1) * pageSize).map((u, index) => (
                                <TableRow user={u} key={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center ">
                    <ul className="pagination">
                        <li
                            className="btn btn-outline-secondary border-light rounded-0 rounded-start"
                            onClick={() => setPage(0)}
                        >
                            {"«"}
                        </li>
                        {Array(Math.ceil(usersRendered.length / pageSize))
                            .fill("")
                            .map((_, index) =>
                                page >= index - 2 && page <= index + 2 ? (
                                    <li
                                        key={index}
                                        className={`btn btn-outline-secondary border-light rounded-0 ${
                                            page == index ? "active" : ""
                                        }`}
                                        onClick={() => setPage(index)}
                                    >
                                        {index + 1}
                                    </li>
                                ) : (
                                    ""
                                )
                            )}
                        <li
                            className="btn btn-outline-secondary border-light rounded-0 rounded-end"
                            onClick={() => setPage(Math.floor(usersRendered.length / pageSize))}
                        >
                            {"»"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
