// import type { HttpContext } from '@adonisjs/core/http'

export default class EstablishmentsController {
  // get posts
  async index() {
    return {
      data: [
        {
          clientName: 'Dr House',
          clientJobType: 'Post 1',
          address: 'toto',
          avatarUrl: 'https://www.google.com',
          establishmentId: 123,
        },
        {
          clientName: 'Dr House2',
          clientJobType: 'Post 22',
          address: 'toto',
          avatarUrl: 'https://www.google.com',
          establishmentId: 123,
        },
      ],
    }
  }
}
