import { PostDB, PostModel } from "../types/interface"


// export class Posts {
//     constructor(
//         private id: string,
//         private creator_id: string,
//         private content: string,
//         private likes: string,
//         private dislikes: string,
//         private created_at: string,
//         private updated_at: string
//     ) { };


export class Posts {
    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string
    ) { };

    public getId(): string {
        return this.id
    };

    public getContent(): string {
        return this.content
    };

    public setContent(newContent: string): void {
        this.content = newContent
    };

    public getLikes(): number {
        return this.likes
    };

    public getDislikes(): number {
        return this.dislikes
    };

    public getCreatedAt(): string {
        return this.createdAt
    };

    public getUpdatedAt(): string {
        return this.updatedAt
    };

    public getCreatorId(): string {
        return this.creatorId
    };

    public setCreatorId(newCreatorId: string): void {
        this.creatorId = newCreatorId
    };

    public getCreatorName(): string {
        return this.creatorName
    };

    public setCreatorName(newCreatorName: string): void {
        this.creatorName = newCreatorName
    };

    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    };

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.id,
                name: this.creatorName
            }
        };
    };
};

// get = retorna (return)
// set = altera (sem retorno, logo VOID)