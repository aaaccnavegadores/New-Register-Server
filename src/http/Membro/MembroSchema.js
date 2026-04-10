import Joi from 'joi'

export const postMemberSchema = Joi.object({
  nome: Joi.string().trim().required().min(4).max(200),
  matricula: Joi.string().trim().required(),
  cpf: Joi.string().trim().regex(/[0-9]+/).min(11).max(14).required().allow(null).default(null),
  email: Joi.string().trim().email().lowercase().required(),
  endereco: Joi.object().keys({
    cep: Joi.string().trim().optional(),
    rua: Joi.string().trim().required(),
    numero: Joi.string().required().allow(null).default(null),
    bairro: Joi.string().trim().required(),
    complemento: Joi.string().trim().optional(),
    cidade: Joi.string().trim().required()
  }).required(),
  telefone: Joi.string().trim().required(),
  telefone_emergencia: Joi.string().trim().optional(),
  condicao: Joi.string().optional().allow(null),
  categoria: Joi.string().trim().valid('discente', 'docente').required(),
  ocupacao: Joi.string().trim().valid('atleta', 'treinos', 'membro').required(),
  esportes: Joi.array().items(Joi.string().required()).optional(),
  games: Joi.array().items(Joi.string().required()).optional()
})

export const putMemberSchema = Joi.object({
  inscricao: Joi.string().trim().optional(),
  nome: Joi.string().trim().required().min(4).max(200),
  matricula: Joi.string().trim().required(),
  cpf: Joi.string().trim().regex(/[0-9]+/).min(11).max(14).required().allow(null).default(null),
  email: Joi.string().trim().email().lowercase().required(),
  endereco: Joi.object().keys({
    cep: Joi.string().trim().optional(),
    rua: Joi.string().trim().required(),
    numero: Joi.string().required().allow(null).default(null),
    bairro: Joi.string().trim().required(),
    complemento: Joi.string().trim().optional(),
    cidade: Joi.string().trim().required()
  }).required(),
  telefone: Joi.string().trim().required(),
  telefone_emergencia: Joi.string().trim().optional(),
  condicao: Joi.string().optional().allow(null)
})

export const getAllMembersSchema = Joi.object({
  page: Joi.number().optional().default(1),
  limit: Joi.number().optional().default(25)
})

export const memberIdSchema = Joi.object({
  membro_id: Joi.string().required()
})

export const memberDocSchema = Joi.object({
  cpf: Joi.string().optional(),
  matricula: Joi.string().optional()
})
