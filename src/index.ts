import express, { Request, Response } from 'express';

const app = express();

const PORT = process.env.port || 3000;

app.get('/', (_: Request, res: Response) => {
  res.send('<h1>Server is running! 🚀</h1>');
});

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});

export default app;
