/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import fs from 'node:fs/promises'

router.on('/').render('pages/home').as('home')

router
  .get('/movies/:slug', async (ctx) => {
    const url = app.makeURL(`resources/movies/${ctx.params.slug}.html`)

    try {
      const movie = await fs.readFile(url, 'utf-8')
      ctx.view.share({ movie })
    } catch (error) {
      throw new Exception(`Could not find a movie called ${ctx.params.slug}`, {
        status: 404,
        code: 'E_NOT_FOUND',
      })
    }
    return ctx.view.render('pages/movies/show')
  })
  .as('movies.show')
  .where('slug', router.matchers.slug())

//     router.get('/movies', () => {}).as('movies.index')
// router.get('/movie/my-awesome-movie', () => {}).as('movies.show')
// router.get('/movies/create', () => {}).as('movies.create')
// router.post('/movies', () => {}).as('movies.store')
// router.get('/movie/my-awesome-movie/edit', () => {}).as('movies.edit')
// router.put('/movie/my-awesome-movie', () => {}).as('movies.update')
// router.delete('/movie/my-awesome-movie', () => {}).as('movies.destroy')
