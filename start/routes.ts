/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const PostsController = () => import('#controllers/posts_controller')
import router from '@adonisjs/core/services/router'

router.post('posts', [PostsController, 'store'])
router.put('posts/:id', [PostsController, 'update'])
router.get('posts', [PostsController, 'index'])

router.post('/login', [AuthController, 'login'])
router.post('/signup', [AuthController, 'create'])
