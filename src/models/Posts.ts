import { PostDB, PostModel } from "../types/interface"


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

    public setContent(value: string): void {
        this.content = value
    };

    public getLikes(): number {
        return this.likes
    };

    public setLikes(value: number): void {
        this.likes = value
    };

    public addLike = (): void => {
        this.likes++
        // ++ = this.likes + 1
    };

    public addDislike = (): void => {
        this.dislikes++
    };

    public removeDislike = (): void => {
        this.dislikes--
    };

    public removeLike = (): void => {
        this.likes--
    };

    public getDislikes(): number {
        return this.dislikes
    };

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    };

    public getUpdatedAt(): string {
        return this.updatedAt
    };

    public getCreatorId(): string {
        return this.creatorId
    };

    public setCreatorId(value: string): void {
        this.creatorId = value
    };

    public getCreatorName(): string {
        return this.creatorName
    };

    public setCreatorName(value: string): void {
        this.creatorName = value
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
                id: this.creatorId,
                name: this.creatorName
            }
        };
    };
};

// get = retorna (return)
// set = altera (sem retorno, logo VOID)