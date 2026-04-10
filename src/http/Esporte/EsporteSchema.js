import Joi from 'joi'

export const postSportSchema = Joi.object({
  nome: Joi.string().trim().required().min(4).max(200),
  slug: Joi.string().trim().required(),
  desc: Joi.string().trim().optional().default('Sem descrição')
})

export const getAllSportsSchema = Joi.object({
  page: Joi.number().optional().default(1),
  limit: Joi.number().optional().default(25)
})

export const slugSportSchema = Joi.object({
  slug: Joi.string().required()
})
