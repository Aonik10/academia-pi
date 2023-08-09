type ErrorName = "GET_ERROR" | "CREATE_ERROR" | "DELETE_ERROR" | "UPDATE_ERROR";

export class DatabaseError extends Error {
    name: ErrorName;
    message: string;
    cause: any;
    constructor({ name, message, cause }: { name: ErrorName; message: string; cause?: any }) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;

        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}

export class NotFoundError extends Error {
    message: string;
    cause: any;
    constructor({ message, cause }: { message: string; cause?: any }) {
        super();
        this.name = "NOT_FOUND_ERROR";
        this.message = message;
        this.cause = cause;

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
