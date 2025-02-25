import express, { Request, Response } from 'express';

const app = express();

const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.get('/', (_: Request, res: Response) => {
  res.send('<h1>Server is running! 🚀</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
