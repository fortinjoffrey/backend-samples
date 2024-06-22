import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies: Movie[] = await Movie.all()

    return view.render('pages/home', { movies })
  }

  async show({ params, view}: HttpContext) {
    const movie = await Movie.find(params.slug)

    return view.render('pages/movies/show', { movie })
  }
}
