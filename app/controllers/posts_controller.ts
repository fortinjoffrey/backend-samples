import { createPostValidator, updatePostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    return payload
  }

  async update({ request }: HttpContext) {
    const payload = await request.validateUsing(updatePostValidator)
    return payload
  }

  // get posts
  async index() {
    return {
      posts: [
        {
          id: 1,
          title: 'Post 1',
          description: 'Description of post 1',
        },
        {
          id: 2,
          title: 'Post 2',
          description: 'Description of post 2',
        },
      ],
    }
  }
}
