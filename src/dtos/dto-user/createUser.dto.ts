// import z from "zod";
// import { USER_ROLES } from "../../models/Users";

// export interface CreateUserInputDTO {
//     id: string,
//     name: string,
//     email: string,
//     password: string,
//     role: USER_ROLES,
//     created_at: string
// };

// export interface CreateUserOutputDTO {
//     message: string,
//     user: {
//         id: string,
//         name: string,
//         email: string,
//         created_at: string
//     }
// };

// export const CreateUserSchema = z.object(
//     {
//         id: z.string().min(2),
//         name: z.string().min(3),
//         email: z.string().email(),
//         password: z.string().min(4),
//         role: z.string(),
//         created_at: z.string()
//     }).transform(data => data as CreateUserInputDTO)




