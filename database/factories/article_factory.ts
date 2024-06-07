import Article from '#models/article'
import factory from '@adonisjs/lucid/factories'

export const ArticleFactory = factory
  .define(Article, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    }
  })
  .build()
