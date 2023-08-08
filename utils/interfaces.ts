export interface ApiResponse<T> {
    message: string;
    data?: T;
    error?: string;
}

export interface UserCreate {
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    phoneNumber?: string;
    id_document?: string;
    image?: string;
    role?: "user" | "admin";
    address?: string;
    isActive?: boolean;
}

export type UserUpdate = Partial<UserCreate>;

export interface UserCreated extends UserCreate {
    _id: string;
    reffersCodes: string[];
    inscriptions: any[];
}

export interface CourseCreate {
    title: string;
    description: string;
    livePrice?: number;
    onDemandPrice: number;
    image: string;
    tags?: string[];
    onSale?: number;
    isLive?: boolean;
    isOnDemand?: boolean;
    isActive?: boolean;
    duration?: number;
    professor?: string;
    liveDate?: string;
}

export type CourseUpdate = Partial<CourseCreate>;

export interface CourseCreated extends Required<CourseCreate> {
    _id: string;
    inscriptions: any[];
}

export interface InscriptionCreated {
    _id: string;
    user: UserCreated;
    course: CourseCreated;
    amount_paid: number;
    status: "pending" | "approved";
    createdAt: Date;
    updatedAt: Date;
}
