import express from "express";
import Controller from "../controllers/controller";

class MyRouter {
    private readonly controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;
    }

    getRouter(): express.Router {
        const r = express.Router();

        r.get(
            "/debt-history",
            this.controller.getDebtHistory
        );

        return r;
    }
}

export default MyRouter;
