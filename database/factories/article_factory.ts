import Article from '#models/article'
import factory from '@adonisjs/lucid/factories'

export const ArticleFactory = factory
  .define(Article, async ({ faker }) => {
    return {
      title: faker.lorem.words(5),
      resume: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      author: faker.person.fullName(),
      source: faker.internet.domainName(),
    }
  })
  .build()
