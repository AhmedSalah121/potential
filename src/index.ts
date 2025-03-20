import express, { Request, Response } from 'express';
import Controller from "./controllers/controller";
import MyRouter from "./routes/router";

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (_: Request, res: Response) => {
  res.send({message: 'Server is running! 🚀'});
});

const controller = new Controller();

app.use(
    "/api/v1/potential",
    new MyRouter(controller).getRouter(),
);

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});

export default app;
