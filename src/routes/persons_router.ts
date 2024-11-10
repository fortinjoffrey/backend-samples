import express from 'express';
import {Request, Response} from 'express';
import {Person, PersonSchema} from '../models/person';
import {z} from 'zod';
import {CreatePersonRequestSchema, UpdatePersonRequestSchema} from '../requests/persons_requests';
import {IdSchema} from '../models/id';
import {PersonNotFoundError} from '../errors';

export const router = express.Router();

class PersonController {
  public async createPerson(req: Request, res: Response): Promise<void> {
    const validatedPerson = CreatePersonRequestSchema.parse(req.body);

    const newPerson = await new PersonService().createPerson(validatedPerson);

    res.status(201).json({
      message: 'Person created successfully',
      data: newPerson,
    });
  }

  public async updatePerson(req: Request, res: Response): Promise<void> {
    const validatedPerson = UpdatePersonRequestSchema.parse(req.body);

    const {id, ...personWithoutId} = validatedPerson;

    const updatedPerson = await new PersonService().updatePerson(req.params.id, personWithoutId);

    res.status(200).json({
      message: 'Person updated successfully',
      data: updatedPerson,
    });
  }

  public async getPerson(req: Request, res: Response): Promise<void> {
    const personId = IdSchema.parse(req.params.id);
    const person = await new PersonService().getPerson(personId);

    res.status(200).json({
      message: 'Person retrieved successfully',
      data: person,
    });
  }

  public async deletePerson(req: Request, res: Response): Promise<void> {
    const personId = req.params.id;
    await new PersonService().deletePerson(personId);
    res.status(200).json({
      message: 'Person deleted successfully',
    });
  }
}

const mockPersonsCollection: Map<string, {[field: string]: any}> = new Map([
  [
    '1',
    {
      name: 'John Doe',
      age: 30,
      dateOfBirth: '1993-05-15T00:00:00Z',
      car: [
        {
          name: 'Toyota',
          dateOfManufacturing: '2010-10-10T00:00:00Z',
        },
      ],
      gender: 'MALE',
    },
  ],
  [
    '2',
    {
      name: 'Jane Doe',
      age: 28,
      dateOfBirth: '1995-04-12T00:00:00Z',
      car: [
        {
          name: 'HondaFF',
          dateOfManufacturing: '2015-06-20T00:00:00Z',
        },
      ],
      gender: 'FEMALE',
    },
  ],
]);

class PersonService {
  async createPerson(person: Omit<Person, 'id'>): Promise<Person> {
    const personWithId = {...person, id: (mockPersonsCollection.size + 1).toString()};

    await new Promise((resolve) => setTimeout(resolve, 1000));

    mockPersonsCollection.set(personWithId.id, personWithId);
    return personWithId;
  }

  async updatePerson(id: string, personToUpdate: Omit<Partial<Person>, 'id'>): Promise<Person> {
    const personData = mockPersonsCollection.get(id);

    if (!personData) {
      throw new PersonNotFoundError();
    }

    const currentPerson = PersonSchema.parse({...personData, id});

    const updatedPerson = {
      ...currentPerson,
      ...personToUpdate,
    };

    if (mockPersonsCollection.has(id)) {
      mockPersonsCollection.set(id, updatedPerson);
    } else {
      throw new PersonNotFoundError();
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return updatedPerson;
  }

  async getPerson(id: string): Promise<Person> {
    const personData = mockPersonsCollection.get(id);

    if (!personData) {
      throw new PersonNotFoundError();
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return PersonSchema.parse({...personData, id});
  }

  async deletePerson(id: string): Promise<void> {
    if (mockPersonsCollection.has(id)) {
      mockPersonsCollection.delete(id);
    } else {
      throw new PersonNotFoundError();
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

const personController = new PersonController();

router.post('/', personController.createPerson);

router
  .route('/:id')
  .get(personController.getPerson)
  .patch(personController.updatePerson)
  .delete(personController.deletePerson);
