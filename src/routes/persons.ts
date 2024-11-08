import express from 'express';
import {Request, Response} from 'express';
import {AllowedSchema, ValidationError, List} from 'express-json-validator-middleware';
import createPersonRequestSchema from '../generated/schemas/create_person_request.schema.json';
import getPersonRequestSchema from '../generated/schemas/get_person_request.schema.json';
import addFormats from 'ajv-formats';
import {ErrorObject} from 'ajv';
import {validator} from '../validator';

export const router = express.Router();

const {validate} = validator;

class PersonController {
  private personService = new PersonService();

  public async createPerson(req: Request, res: Response): Promise<void> {
    console.log('Creating person req.body = ', req.body);
    const person = req.body as Omit<Person, 'id'>;
    console.log('Creating person person = ', person);

    const newPerson = await new PersonService().createPerson(person);

    res.status(201).json({
      message: 'Person created successfully',
      data: newPerson,
    });
  }

  public async getPerson(req: Request, res: Response): Promise<void> {
    const personId = req.params.id;
    const person = await new PersonService().getPerson(personId);
    if (!person) {
      res.status(404).json({message: 'Person not found'});
      return;
    }
    res.status(200).json({
      message: 'Person retrieved successfully',
      data: person,
    });
  }
}

import {Person} from '../models/person';

class PersonService {
  private mockPersonsJson = [
    {
      id: '1',
      // name: 'John Doe',
      age: 30,
      dateOfBirth: '1993-05-15T00:00:00Z',
      car: {
        name: 'Toyota',
        dateOfManufacturing: '2010-10-10T00:00:00Z',
      },
    },
  ];

  async createPerson(person: Omit<Person, 'id'>): Promise<Person> {
    const personWithId = {...person, id: '1'};

    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.mockPersonsJson.push(personWithId);
    return personWithId;
  }

  async getPerson(id: string): Promise<Person | null> {
    const personData = this.mockPersonsJson.find((person) => person.id === id);

    if (!personData) {
      return null;
    }

    const validatePerson = validator.ajv.compile(getPersonRequestSchema);
    const valid = validatePerson(personData);

    console.log('Validating person = ', valid);

    if (!valid) {
      if (validatePerson.errors) {
        throw new ValidationError(
          validatePerson.errors as unknown as List<ErrorObject<string, Record<string, any>, unknown>[]>
        );
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return personData as Person;
  }
}

const personController = new PersonController();

router.post('/', validate({body: createPersonRequestSchema as AllowedSchema}), personController.createPerson);
router.route('/:id').get(personController.getPerson);
