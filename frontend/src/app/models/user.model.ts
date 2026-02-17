export interface User {
    id?: number;
    name: string;
    surname: string;
    email: string;
    role: Role;
    password?: string; // Solo per creazione e modifica, non dovrebbe essere restituita dal backend
}

export enum Role {
    ADMIN = 'ADMIN',
    STANDARD = 'STANDARD'
}

export interface UserDTO {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: Role;
}
