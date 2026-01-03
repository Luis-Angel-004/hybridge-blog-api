export interface User {
    id: number;
    email: string;
    password: string;
}

export type UserCredentials = Omit<User, 'id'>;
