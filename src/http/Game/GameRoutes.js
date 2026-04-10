import express from 'express'
import { getGames, createGame, getGame, updateGame } from './GameController.js'
import { postGameSchema, getAllGamesSchema, slugGameSchema } from './GameSchema.js'
import { validate } from '../../middleware/validate.js'

const router = express.Router()

router.get(
  '/',
  validate(getAllGamesSchema, 'query'),
  getGames
)

router.post(
  '/',
  validate(postGameSchema, 'body'),
  createGame
)

router.get(
  '/:slug',
  validate(slugGameSchema, 'params'),
  getGame
)

router.put(
  '/:slug',
  validate(slugGameSchema, 'params'),
  validate(postGameSchema, 'body'),
  updateGame
)

export default router