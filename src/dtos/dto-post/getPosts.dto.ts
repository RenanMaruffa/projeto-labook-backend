import z from "zod"
import { PostModel } from "../../types/interface"

export interface GetPostsInputDTO {
    q: string
};

// export interface GetPostsInputDTO {
//     token: string
// };


export type GetPostsOutputDTO = PostModel[];


export const GetPostsSchema = z.object({
        q: z.string()
    }).transform(data => data as GetPostsInputDTO);




    // export const GetPostsSchema = z.object(
    //     {
    //         token: z.string().min(1)
    //     }).transform(data => data as GetPostsInputDTO)