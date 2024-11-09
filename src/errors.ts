export class PersonNotFoundError extends Error {
  constructor(message: string = 'Person not found') {
    super(message);
    this.name = 'PersonNotFoundError';
  }
}
