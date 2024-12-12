export interface Contact {
    id?: number;
    first_name: string;
    last_name: string;
    email_address?: string;
    phone_number?: string;
    address?: string;
    custom_fields?: Record<string, any>; // JSON structure
    created_at?: string; // ISO timestamp
    updated_at?: string; // ISO timestamp
    assigned_user_id?: string | null; // UUID
}