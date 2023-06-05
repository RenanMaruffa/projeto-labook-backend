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

export interface PostDBWithCreatorName {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator_name: string
}

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
}

    export interface LikeDislikeDB {
        user_id: string,
        post_id: string,
        like: number
    };

    export enum POST_LIKE {
        LIKED = "LIKED",
        DISLIKED = "DISLIKED"
    };
