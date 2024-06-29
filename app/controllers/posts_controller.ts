import { createPostValidator, updatePostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createPostValidator.validate(data)
    return payload
  }

  async update({ request }: HttpContext) {
    const data = request.all()
    const payload = await updatePostValidator.validate(data)
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
