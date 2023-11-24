import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/users/user.routes';
const app: Application = express();

// parser using here
app.use(express.json());
app.use(cors());

// Application routes here
app.use('/api/users', StudentRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('hello work');
});

export default app;
