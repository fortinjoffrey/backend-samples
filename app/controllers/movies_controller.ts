import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'

export default class MoviesController {
  async index({ view }: HttpContext) {
    // const recentlyReleasedMovies: Movie[] = await Movie.all()
    const comingSoonMovies = await Movie.query()
      .apply((scope) => scope.notReleased())
      .whereNotNull('releasedAt')
      .orderBy('releasedAt')
      .limit(3)

    const recentlyReleasedMovies = await Movie.query()
      .apply((scope) => scope.released())
      .orderBy('releasedAt', 'desc')
      .limit(9)

    return view.render('pages/home', { recentlyReleasedMovies, comingSoonMovies })
  }

  async show({ params, view }: HttpContext) {
    const movie = await Movie.findByOrFail('slug', params.slug)

    return view.render('pages/movies/show', { movie })
  }
}
