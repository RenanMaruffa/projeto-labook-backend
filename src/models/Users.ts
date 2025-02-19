import { UserDB, UserModel } from "../types/interface"

export enum USER_ROLES {
    NORMAL = 'NORMAL',
    ADMIN = 'ADMIN'
}

export interface TokenPayload {
    id: string,
    name: string,
    role: USER_ROLES
} 

//createdAt em camelCase por causa do front - explicar!
export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
    ) { };

    public getId(): string {
        return this.id
    };

    public setId(newId: string): void {
        this.id = newId
    }

    public getName(): string {
        return this.name
    };

    public setName(newName: string): void {
        this.name = newName
    };

    public getEmail(): string {
        return this.email
    };

    public setEmail(newEmail: string): void {
        this.email = newEmail
    };

    public getPassword(): string {
        return this.password
    };

    public setPassword(newPassword: string): void {
        this.password = newPassword
    };

    public getRole(): USER_ROLES {
        return this.role
    };

    public setRole(newRole: USER_ROLES): void {
        this.role = newRole
    }

    public getCreatedAt(): string {
        return this.createdAt
    };

    public setCreatedAt (newCreatedAt: string): void {
        this.createdAt = newCreatedAt
    }

    public toDBModel(): UserDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }
    };

    public toBusinessModel(): UserModel {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt
        }
    };
};





// get = retorna (return)
// set = altera (sem retorno, logo VOID)