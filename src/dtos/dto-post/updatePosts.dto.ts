import z from "zod"

export interface EditPostInputDTO {
    content: string,
    token: string,
    idToEdit: string
};
//idToEdit - apesar de ser boa pratica respeitar os nomes das propriedades do objeto, podemos mudar o nome pra algo mais relevante/semantico
//o mesmo se aplica ao "token", onde deveria chegar "headers.authorization". Da uma ideia mais rapida de que é algo mais semantico msm

//por ser campo de resposta vazio, apenas "201 created", nao devolvendo objeto, pode virar TYPE e UNDEFINED
export type EditPostOutputDTO = undefined

export const EditPostSchema = z.object({
        content: z.string().min(1),
        token: z.string().min(1),
        idToEdit: z.string().min(1)
    }).transform(data => data as EditPostInputDTO)
