export class LikeDislike {
    constructor(
        private user_id: string,
        private post_id: string,
        private like: number
    ) { };

    public getUserId(): string {
        return this.user_id
    };

    public getPostID(): string {
        return this.post_id
    };

    public getLike(): number {
        return this.like
    };
};




// get = retorna (return)
// set = altera (sem retorno, logo VOID)