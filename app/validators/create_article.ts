import vine from '@vinejs/vine'

export const createArticleValidator = vine.compile(
  vine.object({
    title: vine.string().trim().maxLength(255),
    content: vine.string().trim(),
    resume: vine.string().trim(),
    source: vine.string().trim(),
    author: vine.string().trim(),
    user_id: vine.number().optional(),
  })
)
