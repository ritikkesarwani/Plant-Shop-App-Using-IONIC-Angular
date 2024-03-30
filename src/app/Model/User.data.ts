export interface User {
    id?: number;
    fullName?: string;
    username: string;
    password: string;
    confirmPassword?: string;
    email?: string;
    mobileNumber?: string;
}