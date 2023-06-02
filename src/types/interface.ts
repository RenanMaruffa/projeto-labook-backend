import { USER_ROLES } from "../models/Users"

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
};

//Modelo para uso do FrontEnd (Sem password e com camelCase)
export interface UserModel {
    id: string,
    name: string,
    email: string,
    role: USER_ROLES,
    createdAt: string
};

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
};

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
};

// export interface PostDBPost {
//     id: string,
//     creator_id: string,
//     content: string,
//     likes: string,
//     dislikes: string,
//     created_at: string,
//     updated_at: string
// };



// export interface TokenPayload {
//     id: string,
//     name: string,
//     role: USER_ROLES
// }