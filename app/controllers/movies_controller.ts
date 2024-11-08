import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const comingSoonMovies = await Movie.query()
      .apply((scope) => scope.notReleased())
      .preload('director')
      .preload('writer')
      .whereNotNull('releasedAt')
      .orderBy('releasedAt')
      .limit(3)

    const recentlyReleasedMovies = await Movie.query()
      .apply((scope) => scope.released())
      .preload('director')
      .preload('writer')
      .orderBy('releasedAt', 'desc')
      .limit(9)

    return view.render('pages/home', { recentlyReleasedMovies, comingSoonMovies })
  }

  async show({ params, view }: HttpContext) {
    const movie = await Movie.findByOrFail('slug', params.slug)

    await movie.load('director')
    await movie.load('writer')

    return view.render('pages/movies/show', { movie })
  }
}
