import z from "zod"

export interface CreatePostInputDTO {
    content: string,
    token: string
};

//por ser campo de resposta vazio, apenas "201 created", nao devolvendo objeto, pode virar TYPE e UNDEFINED

export type CreatePostOutputDTO = undefined;

export const CreatePostSchema = z.object(
    {
        content: z.string().min(1),
        token: z.string().min(1)
    }).transform(data => data as CreatePostInputDTO);