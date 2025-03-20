import {Request, Response, NextFunction} from "express";
import { fetchEgyptDebtData } from "../world-bank";

class Controller {

    getDebtHistory = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const fetched = await fetchEgyptDebtData();
            res.status(200).send(fetched);
        } catch (error) {
            next(error);
        }
    }
}

export default Controller;
