import z from "zod";

export interface CreateInputUserDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
};

export interface CreateOutputUserDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        created_at: string
    }
}