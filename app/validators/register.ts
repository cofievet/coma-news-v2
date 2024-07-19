import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().maxLength(255),
    password: vine.string(),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .maxLength(255)
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    name: vine
      .string()
      .trim()
      .maxLength(255)
      .unique(async (db, value) => {
        const user = await db.from('users').where('name', value).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  })
)
