import express from 'express';
import {Request, Response} from 'express';
import {validator} from '../validator';
import createEmployeeRequestSchema from '../generated/schemas/create_employee_request.schema.json';
import {AllowedSchema} from 'express-json-validator-middleware';

export const router = express.Router();
const {validate} = validator;

router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Employee created successfully',
    data: req.body,
  });
});

router
  .route('/:id')
  .get(validate({body: createEmployeeRequestSchema as AllowedSchema}), (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Employees retrieved successfully',
      data: [],
    });
  })
  .put((req: Request, res: Response) => {
    res.status(200).json({
      message: 'Employee updated successfully',
      data: req.body,
    });
  })
  .delete((req: Request, res: Response) => {
    res.status(200).json({
      message: 'Employee deleted successfully',
    });
  });

// router.param('id', (req, res, next, id) => {
//   console.log('Employee ID:', id);
//   req.user = {id, name: 'John Doe'};
//   next();
// });
