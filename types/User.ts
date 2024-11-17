import {UUID} from "node:crypto";

export interface User {
    id: UUID;
    updated_at: Date;
    username: string;
    full_name: string;
    email_address: string;
    created_at: Date;
    role_id: number;
    phone_number: string;
}

export interface UserContextType {
    user: User | null;
}