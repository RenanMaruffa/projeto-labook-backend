import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { GetUserSchema } from "../dtos/dto-user/getUser.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { SignupSchema } from "../dtos/dto-user/signup.dto";
import { LoginSchema } from "../dtos/dto-user/login.dto";

// classes instanciam objetos - Programação orientada a objetos
// quando se chama uma classe, se esta chamando um instancia de um objeto ou o metodo dessa classe (por isso existe o constructor e metodos)
export class UserController {
    constructor(private userBusiness: UserBusiness) { }

    public signup = async (req: Request, res: Response) => {
        try {
            const input = SignupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            const output = await this.userBusiness.signup(input)
            res.status(201).send(output)

        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro Inesperado!")
            }
        }
    };

    public login = async (req: Request, res: Response) => {

        try {

            const input = LoginSchema.parse({
                email: req.body.email,
                password: req.body.password
            });

            const output = await this.userBusiness.login(input)
            res.status(200).send(output)

        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro Inesperado!")
            };
        };
    };

    public getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = GetUserSchema.parse({
                q: req.query.q,
            })

            const output = await this.userBusiness.getUsers(input);
            res.status(201).send(output)
        } catch (error) {

        }

    };









    
    public updateUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(201).send()
        } catch (error) {

        }

    };

    public deleteUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(201).send()
        } catch (error) {

        }

    };
}










    //new Date().toISOString()