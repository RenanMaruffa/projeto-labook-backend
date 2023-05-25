export class Posts {
    constructor(
        private id: string,
        private creator_id: string,
        private content: string,
        private likes: string,
        private dislikes: string,
        private created_at: string,
        private updated_at: string
    ) { };

    public getId(): string {
        return this.id
    };

    public getCreatorId(): string {
        return this.creator_id
    };

    public getContent(): string {
        return this.content
    };

    public setContent(newContent: string): void {
        this.content = newContent
    };

    public getLikes(): string {
        return this.likes
    };

    public getDislikes(): string {
        return this.dislikes
    };

    public getCreatedAt(): string {
        return this.created_at
    };

    public getUpdatedAt(): string {
        return this.updated_at
    };
};

// get = retorna (return)
// set = altera (sem retorno, logo VOID)