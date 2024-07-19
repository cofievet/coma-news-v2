/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const HomeController = () => import('#controllers/home_controller')
const ArticleController = () => import('#controllers/article_controller')
import router from '@adonisjs/core/services/router'

import { middleware } from './kernel.js'
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

router.get('/articles/:id', [ArticleController, 'render']).as('article')
