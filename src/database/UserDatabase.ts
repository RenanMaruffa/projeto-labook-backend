import { User } from "../models/Users";
import { UserDB } from "../types/interface";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users";

    // usamos "this." quando estamos referenciando a instancia. Com atributos estaticos (como o BaseDatabase) a gente referencia a classe dele

    public insertNewUser = async (userDB: UserDB): Promise<void> => {
        await BaseDatabase
            .conection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    };

    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        //const [userDB]: Array<userDB | undefined> = await BaseDatabase
        const [userDB] = await BaseDatabase
            .conection(UserDatabase.TABLE_USERS)
            .select().where({ email: email })

            return userDB as UserDB | undefined
    };








    public findUserById = async (id: string): Promise<UserDB | undefined> => {
        const [result]: UserDB[] | undefined[] = await BaseDatabase.conection(UserDatabase.TABLE_USERS).where({ id })
        return result
    };


    public findUserByName = async (q: string) => {
        let usersDB

        if (q) {
            const result = await BaseDatabase.conection(UserDatabase.TABLE_USERS).where("name", "LIKE", `%${q}%`)
            usersDB = result

        } else {
            const result = await BaseDatabase.conection(UserDatabase.TABLE_USERS)
            usersDB = result
        }
        return usersDB
    };







};

