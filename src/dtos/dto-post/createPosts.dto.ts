import z from "zod"

export interface CreatePostInputDTO {
    id: string,
    creator_id: string,
    content: string,
    likes: string,
    dislikes: string,
    created_at: string,
    updated_at: string,
};

// export interface CreatePostInputDTO {
//     content: string,
//     token: string
// };

export interface CreatePostOutputDTO {
    message: string,
    user: {
        id: string,
        creator_id: string,
        content: string,
        likes: string,
        dislikes: string,
        created_at: string,
        updated_at: string
    }
};

//por ser campo de resposta vazio, apenas "201 created", nao devolvendo objeto, pode virar TYPE e UNDEFINED
// export interface CreatePostOutputDTO = undefined;

export const CreatePostSchema = z.object({
        id: z.string().min(2),
        creator_id: z.string().min(2),
        content: z.string(),
        likes: z.string(),
        dislikes: z.string(),
        created_at: z.string(),
        updated_at: z.string()
    }).transform(data => data as CreatePostInputDTO);


    // export const CreatePostSchema = z.object(
    //     {
    //         content: z.string().min(1),
    //         token: z.string().min(1)
    //     }).transform(data => data as CreatePostInputDTO)