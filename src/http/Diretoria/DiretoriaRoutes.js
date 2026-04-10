import express from 'express'
import { getCurrentManagement, createDirector, getManagementHistory, getRole, updateRole } from './DiretoriaController.js'
import { postDirectorSchema, getAllDirectorsSchema, slugCargoSchema } from './DiretoriaSchema.js'
import { validate } from '../../middleware/validate.js'

const router = express.Router()

router.get(
  '/',
  validate(getAllDirectorsSchema, 'query'),
  getCurrentManagement
)

router.post(
  '/',
  validate(postDirectorSchema, 'body'),
  createDirector
)

router.get(
  '/historico',
  validate(getAllDirectorsSchema, 'query'),
  getManagementHistory
)

router.get(
  '/:cargo_slug',
  validate(slugCargoSchema, 'params'),
  getRole
)

router.put(
  '/:cargo_slug',
  validate(slugCargoSchema, 'params'),
  validate(postDirectorSchema, 'body'),
  updateRole
)

export default router