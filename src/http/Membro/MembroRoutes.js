import express from 'express'
import { getMembers, createMember, getMemberById, getMemberByDoc ,getActiveMembers, updateMember } from './MembroController.js'
import { postMemberSchema, putMemberSchema, getAllMembersSchema, memberIdSchema, memberDocSchema } from './MembroSchema.js'
import { validate } from '../../middleware/validate.js'

const router = express.Router()

router.get(
  '/',
  validate(getAllMembersSchema, 'query'),
  getMembers
)

router.post(
  '/',
  validate(postMemberSchema, 'body'),
  createMember
)

router.get(
  '/documento',
  validate(memberDocSchema, 'query'),
  getMemberByDoc
)

router.get(
  '/ativos',
  validate(getAllMembersSchema, 'query'),
  getActiveMembers
)

router.get(
  '/:membro_id',
  validate(memberIdSchema, 'params'),
  getMemberById
)

router.put(
  '/:membro_id',
  validate(putMemberSchema, 'body'),
  updateMember
)

export default router