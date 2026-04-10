import Joi from 'joi'

export const postGameSchema = Joi.object({
  titulo: Joi.string().trim().required().min(4).max(200),
  slug: Joi.string().trim().required(),
  tipo: Joi.string().trim().optional()
})

export const getAllGamesSchema = Joi.object({
  page: Joi.number().optional().default(1),
  limit: Joi.number().optional().default(25)
})

export const slugGameSchema = Joi.object({
  slug: Joi.string().required()
})
