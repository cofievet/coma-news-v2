import vine from '@vinejs/vine'

export const createArticleValidator = vine.compile(
  vine.object({
    source: vine.string().trim(),
  })
)
