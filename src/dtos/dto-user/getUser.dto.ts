import z from "zod"

export interface GetUserDTO {
    q: string
};

export const GetUserSchema = z.object(
    {
        q: z.string()
    }).transform(data => data as GetUserDTO);
