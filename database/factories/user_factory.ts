import User from '#models/user'
import factory from '@adonisjs/lucid/factories'
import { ArticleFactory } from './article_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
    }
  })
  .relation('articles', () => ArticleFactory)
  .build()
