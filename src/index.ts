import express, { Request, Response } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (_: Request, res: Response) => {
  res.send({message: 'Server is running! 🚀'});
});

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});

export default app;
