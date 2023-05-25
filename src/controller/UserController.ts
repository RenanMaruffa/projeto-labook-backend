import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
    constructor(private userBusiness: UserBusiness) { }

    public createUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = 




            const output = await this.userBusiness.createUsers();
            res.status(201).send(output)
        } catch (error) {

        }
    };

    public getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const output = await this.userBusiness.getUsers();
            res.status(201).send(output)
        } catch (error) {

        }

    };

    public updateUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const output = await this.userBusiness.editUsers();
            res.status(201).send(output)
        } catch (error) {

        }

    };

    public deleteUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const output = await this.userBusiness.deleteUsers();
            res.status(201).send(output)
        } catch (error) {

        }

    };
}








    //new Date().toISOString()