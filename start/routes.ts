/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const HomeController = () => import('#controllers/home_controller')
const ArticlesController = () => import('#controllers/articles_controller')
import router from '@adonisjs/core/services/router'

import { middleware } from './kernel.js'
const CreateArticlesController = () => import('#controllers/article/create_articles_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegistersController = () => import('#controllers/auth/registers_controller')
const LoginController = () => import('#controllers/auth/login_controller')

router.get('/', [HomeController, 'render']).as('home')

router
  .group(() => {
    router.get('/register', [RegistersController, 'render']).as('register')
    router.post('/register', [RegistersController, 'execute']).as('register.execute')
    router.get('/login', [LoginController, 'render']).as('login')
    router.post('/login', [LoginController, 'execute']).as('login.execute')
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('/logout', [LogoutController, 'execute']).as('logout')
  })
  .use(middleware.auth())

router.get('/articles/:id', [ArticlesController, 'render']).as('article')
router.get('/create-article', [CreateArticlesController, 'render']).as('create_article')
