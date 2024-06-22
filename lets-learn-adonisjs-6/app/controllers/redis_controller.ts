// import type { HttpContext } from '@adonisjs/core/http'

import cache from '#services/cache_service'
import { HttpContext } from '@adonisjs/core/http'

export default class RedisController {
  async destroy({ response, params }: HttpContext) {
    await cache.delete(params.slug)
    return response.redirect().back()
  }


  async flush({ response }: HttpContext) {
    await cache.flushdb()
    return response.redirect().back()
  }
}
