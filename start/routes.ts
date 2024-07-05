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

router.get('/', [HomeController, 'render']).as('home')
router.get('/articles/:id', [ArticleController, 'render']).as('article');
