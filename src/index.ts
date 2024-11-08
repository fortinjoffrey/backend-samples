import express, {NextFunction, Request, Response} from 'express';
import {Validator, ValidationError, AllowedSchema} from 'express-json-validator-middleware';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {router as employeeRouter} from './routes/employees';
import {router as personRouter} from './routes/persons';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/employees', employeeRouter);
app.use('/persons', personRouter);

app.use((err: any, req: Request, res: Response, next: any) => {
  console.log('Erreur de validation:', err);
  if (err instanceof ValidationError) {
    res.status(400).send(err.validationErrors);
    next();
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// const personSchema: AllowedSchema = {
//   type: 'object',
//   properties: {
//     name: {type: 'string'},
//     age: {type: 'number'},
//     dateOfBirth: {type: 'string', format: 'date-time'},
//     car: {
//       type: 'object',
//       properties: {
//         name: {type: 'string'},
//         date_of_manufacturing: {type: 'string', format: 'date-time'},
//       },
//       required: ['name', 'date_of_manufacturing'],
//     },
//   },
//   required: ['name', 'age', 'dateOfBirth', 'car'],
//   additionalProperties: false,
// };
