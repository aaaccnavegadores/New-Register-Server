import express from 'express'
import { getSports, createSport, getSport, updateSport } from './EsporteController.js'
import { postSportSchema, getAllSportsSchema, slugSportSchema } from './EsporteSchema.js'
import { validate } from '../../middleware/validate.js'

const router = express.Router()

router.get(
  '/',
  validate(getAllSportsSchema, 'query'),
  getSports
)

router.post(
  '/',
  validate(postSportSchema, 'body'),
  createSport
)

router.get(
  '/:slug',
  validate(slugSportSchema, 'params'),
  getSport
)

router.put(
  '/:slug',
  validate(slugSportSchema, 'params'),
  validate(postSportSchema, 'body'),
  updateSport
)

export default router