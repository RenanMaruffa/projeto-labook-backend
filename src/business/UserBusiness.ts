import { UserDatabase } from "../database/UserDatabase";
import { GetUserDTO } from "../dtos/dto-user/getUser.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/dto-user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/dto-user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { TokenPayload, User, USER_ROLES } from "../models/Users";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager"


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private IdGenerator: IdGenerator,
        private TokenManager: TokenManager,
        private HashManager: HashManager
    ) { }

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password } = input

        const id = this.IdGenerator.generate();

        const hashedPassword = await this.HashManager.hash(password);

        //agora aqui embaixo, decorar: fazer instanciamento e crio a variavel para o banco de dados! Não posso enviar newUser (instanciado por new User)
        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        );

        const userDB = user.toDBModel();
        await this.userDatabase.insertNewUser(userDB);

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        };

        // usamos "this." quando estamos referenciando a instancia
        const token = this.TokenManager.createToken(payload);

        const output: SignupOutputDTO = {
            token
        };
        return output
    };


    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        const userDB = await this.userDatabase.findUserByEmail(email);

        // coerção booleana
        if (!userDB) {
            throw new BadRequestError("Email e/ou senha inválido(s)")
        };
        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        );

        const hashedPassword = user.getPassword()

        const isPasswordCorrect = await this.HashManager.compare(password, hashedPassword)

        if (!isPasswordCorrect) {
            throw new BadRequestError("Email e/ou senha inválido(s)")
        }

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        };
        const token = this.TokenManager.createToken(payload)

        const output: LoginOutputDTO = {
            token
        };

        return output
    };

    // public createUsers = async (input: CreateUserInputDTO) => {
    //     const { id, name, email, password, USER_ROLES, created_at } = input;

    //     const userExistDB: UserDB | undefined = await this.userDatabase.findUserById(id)

    //     if (userExistDB) {
    //         throw new Error("Usuario já existente")
    //     }

    //     //agora aqui embaixo, decorar: fazer instanciamento e crio a variavel para o banco de dados! Não posso enviar newUser (instanciado por new User)
    //     const newUser = new User(id, name, email, password, USER_ROLES, created_at)

    //     const newUserDB = {
    //         id: newUser.getId(),
    //         name: newUser.getName(),
    //         email: newUser.getEmail(),
    //         password: newUser.getPassword(),
    //         role: newUser.getRole(),
    //         created_at: newUser.getCreatedAt()
    //     };

    //     const output = await this.userDatabase.insertNewUser(newUserDB);
    //     return output
    // };


    public getUsers = async (input: GetUserDTO) => {
        const { q } = input;

        const getUserDBExist: string[] | undefined = await this.userDatabase.findUserByName(q)

        if (!getUserDBExist) {
            throw new Error("Usuario não existente")
        }

        const output = getUserDBExist
        return output
    };










    public editUsers = () => { };
    public deleteUsers = () => { };
}

