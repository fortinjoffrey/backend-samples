import express from 'express';
import {Request, Response} from 'express';
import {Person, PersonSchema} from '../models/person';
import {z} from 'zod';
import {CreatePersonRequestSchema, UpdatePersonRequest, UpdatePersonRequestSchema} from '../requests/persons_request';
import {IdSchema} from '../models/id';

export const router = express.Router();

class PersonController {
  public async createPerson(req: Request, res: Response): Promise<void> {
    const validatedPerson = CreatePersonRequestSchema.parse(req.body);

    console.log('Validated person = ', validatedPerson);

    const newPerson = await new PersonService().createPerson(validatedPerson);

    res.status(201).json({
      message: 'Person created successfully',
      data: newPerson,
    });
  }

  public async updatePerson(req: Request, res: Response): Promise<void> {
    const validatedPerson = UpdatePersonRequestSchema.parse(req.body);
    const personId = IdSchema.parse(req.params.id);

    const updatedPerson = await new PersonService().updatePerson(personId, validatedPerson);

    res.status(200).json({
      message: 'Person updated successfully',
      data: updatedPerson,
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

const mockPersonsJson = [
  {
    id: '1',
    name: 'John Doe',
    age: 30,
    dateOfBirth: '1993-05-15T00:00:00Z',
    car: {
      name: 'Toyota',
      dateOfManufacturing: '2010-10-10T00:00:00Z',
    },
  },
];

class PersonService {
  async createPerson(person: Omit<Person, 'id'>): Promise<Person> {
    const personWithId = {...person, id: (mockPersonsJson.length + 1).toString()};

    await new Promise((resolve) => setTimeout(resolve, 1000));

    mockPersonsJson.push(personWithId);
    return personWithId;
  }

  async updatePerson(id: string, person: UpdatePersonRequest): Promise<Person> {
    const personData = mockPersonsJson.find((person) => person.id === id);

    if (!personData) {
      throw new Error('Person not found');
    }

    const updatedPerson = {...personData, ...person};

    const index = mockPersonsJson.findIndex((person) => person.id === id);
    mockPersonsJson[index] = updatedPerson;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return updatedPerson;
  }

  async getPerson(id: string): Promise<Person | null> {
    const personData = mockPersonsJson.find((person) => person.id === id);

    if (!personData) {
      return null;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return PersonSchema.parse(personData);
    } catch (error) {
      console.error('Validation error on fetched data:', error);
      throw new Error('Invalid person data');
    }
  }
}

const personController = new PersonController();

router.post('/', personController.createPerson);

router
  .route('/:id')
  .get(personController.getPerson)
  .put(personController.updatePerson)
  .delete((req: Request, res: Response) => {
    res.status(200).json({
      message: 'Person deleted successfully',
    });
  });
