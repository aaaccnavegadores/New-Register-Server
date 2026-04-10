import Joi from 'joi'

export const postDirectorSchema = Joi.object({
  matricula: Joi.string().trim().required(),
  cargo: Joi.string().trim().required(),
  cargo_slug: Joi.string().trim().required(),
  ano_semestre_entrada: Joi.string().trim().required(),
  ano_semestre_saida: Joi.when('ativo', { is: false, then: Joi.string().trim().required(), otherwise: Joi.forbidden() }),
  ativo: Joi.boolean().required()
})

export const getAllDirectorsSchema = Joi.object({
  page: Joi.number().optional().default(1),
  limit: Joi.number().optional().default(25)
})

export const slugCargoSchema = Joi.object({
  cargo_slug: Joi.string().required()
})
