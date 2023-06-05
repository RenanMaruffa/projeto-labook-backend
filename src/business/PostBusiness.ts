import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/dto-post/createPosts.dto";
import { DeletePostInputDTO, DeletePostOutputtDTO } from "../dtos/dto-post/deletePosts.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/dto-post/getPosts.dto";
import { LikeOrDislikeInputDTO, LikeOrDislikeOutputDTO } from "../dtos/dto-post/likeOrDislikePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/dto-post/updatePosts.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Posts } from "../models/Posts";
import { USER_ROLES } from "../models/Users";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";
import { LikeDislikeDB, POST_LIKE } from "../types/interface";



export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private IdGenerator: IdGenerator,
        private TokenManager: TokenManager,
    ) { };

    public createPosts = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {

        const { content, token } = input;

        const payload = this.TokenManager.getPayload(token);

        if (!payload) {
            throw new UnauthorizedError()
        };

        // const postIdExistDB: PostDB | undefined = await this.postDatabase.findPostId(id);
        // const creatorIdExistDB: PostDB | undefined = await this.postDatabase.findCreatorId(creator_id);

        const id = this.IdGenerator.generate();

        const post = new Posts(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        );

        const newPostDB = post.toDBModel();
        await this.postDatabase.insertNewPost(newPostDB);

        const output: CreatePostOutputDTO = undefined

        return output

    };

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input;

        const payload = this.TokenManager.getPayload(token);

        if (!payload) {
            throw new UnauthorizedError()
        };

        const postsDBWithCreatorName =
            await this.postDatabase.getPostsWhitCreatorName()

        const posts = postsDBWithCreatorName
            .map((PostWithCreatorName) => {
                const post = new Posts(
                    PostWithCreatorName.id,
                    PostWithCreatorName.content,
                    PostWithCreatorName.likes,
                    PostWithCreatorName.dislikes,
                    PostWithCreatorName.created_at,
                    PostWithCreatorName.updated_at,
                    PostWithCreatorName.creator_id,
                    PostWithCreatorName.creator_name
                )
                return post.toBusinessModel()
            });
        const output: GetPostsOutputDTO = posts

        return output
    };

    public updatePosts = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {

        const { content, token, idToEdit } = input;

        const payload = this.TokenManager.getPayload(token);

        if (!payload) {
            throw new UnauthorizedError()
        };

        const postDB = await this.postDatabase.findPostById(idToEdit)

        if (!postDB) {
            throw new NotFoundError("A postagem com este ID não existe")
        }

        if (payload.id !== postDB.creator_id) {
            throw new ForbiddenError("Somente o dono da postagem pode edita-la")
        }

        const post = new Posts(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            payload.name
        )

        post.setContent(content)

        const updatedPostDB = post.toDBModel()

        await this.postDatabase.updatePost(updatedPostDB)

        const output: EditPostOutputDTO = undefined

        return output

    };


    public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputtDTO> => {

        const { token, idToDelete } = input;

        const payload = this.TokenManager.getPayload(token);

        if (!payload) {
            throw new UnauthorizedError()
        };

        const postDB = await this.postDatabase.findPostById(idToDelete)

        if (!postDB) {
            throw new NotFoundError("A postagem com este ID não existe")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            if (payload.id !== postDB.creator_id) {
                throw new ForbiddenError("Somente o dono da postagem pode edita-la")
            }
        }

        await this.postDatabase.deletePostByID(idToDelete)

        const output: DeletePostOutputtDTO = undefined

        return output

    };

    public likeDislikePosts = async (input: LikeOrDislikeInputDTO): Promise<LikeOrDislikeOutputDTO> => {

        const { token, like, postId } = input;

        const payload = this.TokenManager.getPayload(token);

        if (!payload) {
            throw new UnauthorizedError()
        };

        const postsDBWithCreatorName =
            await this.postDatabase.findPostsWithCreatorNameDBById(postId)

        if (!postsDBWithCreatorName) {
            throw new NotFoundError("Postagem inexistente com ID informado")
        }

        const post = new Posts(
            postsDBWithCreatorName.id,
            postsDBWithCreatorName.content,
            postsDBWithCreatorName.likes,
            postsDBWithCreatorName.dislikes,
            postsDBWithCreatorName.created_at,
            postsDBWithCreatorName.updated_at,
            postsDBWithCreatorName.creator_id,
            postsDBWithCreatorName.creator_name
        );

        const likeSQliteConversion = like ? 1 : 0 //esperamoos um boolean mas a tipagem espera um number (tabela SQLite booleans sao 0 e 1) mas no front vao usar booleans. Ai acontece essa transformação (like é true? SIM? entao vale 1)

        const likeDislikeDB: LikeDislikeDB = {
            user_id: payload.id,
            post_id: postId,
            like: likeSQliteConversion
        }

        const likeDislikeExists =
            await this.postDatabase.findLikeDislike(likeDislikeDB)

        if (likeDislikeExists === POST_LIKE.LIKED) {
            if (like) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeLike()
            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislike()
            }
        } else if (likeDislikeExists === POST_LIKE.DISLIKED) {
            if (like === false) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeDislike()
            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeDislike()
                post.addLike()
            }
        } else {
            await this.postDatabase.inserLikeDislike(likeDislikeDB)
            like ? post.addLike() : post.addDislike()
        }

        const updatedPostDB = post.toDBModel()
        await this.postDatabase.updatePost(updatedPostDB)

        const output: LikeOrDislikeOutputDTO = undefined

        return output
    }
};