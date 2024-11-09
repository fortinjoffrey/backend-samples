import express, {NextFunction, Request, Response} from 'express';
import {router as personRouter} from './routes/persons_router';
import {z} from 'zod';
import {PersonNotFoundError} from './errors';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/persons', personRouter);

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({
      message: 'Validation error',
      errors: err.errors,
    });
    return;
  }
  if (err instanceof PersonNotFoundError) {
    res.status(404).json({
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    message: 'Internal server error',
    error: err.message,
  });
};
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
