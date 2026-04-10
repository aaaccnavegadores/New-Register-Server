import Membro from '../../database/models/Membro.js'
import { randomInt } from 'crypto'
import EnumHTTPCode from '../../domain/enum/EnumHTTPCodes.js'
import EnumMessage from '../../domain/enum/EnumMessages.js'

export async function getMembers (req, res) {
  try {
    const members = await Membro.find()

    if (!members.length){
      return res.status(EnumHTTPCode.NOT_FOUND).json({ message: EnumMessage.MEMBER_NOT_FOUND })
    }

    return res.status(EnumHTTPCode.OK).json(members)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: getMembers] Falha ao buscar todos os membros', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_ALL_MEMBERS_FAILED })
  }
}

export async function createMember (req, res) {
  const { body } = req

  body.cpf = body.cpf.replace(/[.-]/g, '')

  const verifyMember = {
    $or: [
      { matricula: body.matricula },
      { cpf: body.cpf },
      { email: body.email }
    ]
  }

  const memberFound = await Membro.findOne(verifyMember)

  if (memberFound) {
    console.log('[arquivo: MembroController -> funcao: createMember] Este membro já está cadastrado. Matrícula, cpf ou email já existe', memberFound)
    return res.status(EnumHTTPCode.CONFLICT).json({ message: EnumMessage.MEMBER_ALREADY_EXISTS })
  }

  const now = new Date()

  const year = now.getFullYear()
  const semester = now.getMonth() < 6 ? 1 : 2
  body.ano_semestre_entrada = `${year}.${semester}`

  body.ativo = true
  body.concorda_termos = true
  body.atualizado = true

  body.endereco.estado = "Santa Catarina"
  body.endereco.pais = "Brasil"

  body.inscricao = await _newRegistratioNumber()

  try{
    const member = await new Membro(body).save()
    return res.status(EnumHTTPCode.CREATED).json(member)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: createMember] Houve uma falha ao criar novo membro', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.CREATE_MEMBER_FAILED })
  }
}

export async function getMemberById (req, res) {
  const { membro_id } = req.params

  const filter = {
    _id: membro_id
  }

  const options = {
    lean: true
  }

  try{
    const member = await Membro.findOne(filter, {}, options)

    if (!member) {
      console.log('[arquivo: MembroController -> funcao: getMemberById] Nenhum membro com esse Id foi encontrado', filter)
      return res.status(EnumHTTPCode.NOT_FOUND).json({ message: EnumMessage.MEMBER_NOT_FOUND })
    }

    return res.status(EnumHTTPCode.OK).json(member)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: getMemberById] Falha ao buscar membro', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_MEMBER_FAILED })
  }
}

export async function getMemberByDoc (req, res) {
  const { query } = req

  try{
    const member = await Membro.findOne(query)

    if (!member) {
      return res.status(EnumHTTPCode.NOT_FOUND).json({ message: EnumMessage.MEMBER_NOT_FOUND })
    }

    return res.status(EnumHTTPCode.OK).json(member)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: getMemberByDoc] Falha ao buscar membro', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_MEMBER_FAILED })
  }
}

export async function getActiveMembers (req, res) {
  const filter = {
    ativo: true
  }

  const options = {
    lean: true
  }

  try{
    const member = await Membro.find(filter, {}, options)

    return res.status(EnumHTTPCode.OK).json(member)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: getActiveMembers] Falha ao buscar os membros ativos', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_ACTIVE_MEMBERS_FAILED })
  }
}

export async function updateMember (req, res) {
  const { body, params: { membro_id } } = req

  const filter = {
    _id: membro_id
  }

  if (!body.inscricao) {
    body.inscricao = await _newRegistratioNumber()
  }

  body.atualizado = true

  const update = {
    $set: body
  }
  const options = {
    new: true
  }

  try {
    const updatedMember = await Membro.findOneAndUpdate(filter, update, options)
    return res.status(EnumHTTPCode.OK).json(updatedMember)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: updateMember] Houve uma falha ao atualizar membro', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.UPDATE_MEMBER_FAILED })
  }
}

function _generateNumericId () {
  return Array.from({ length: 10 }, () => randomInt(0, 10)).join('')
}

async function _newRegistratioNumber () {
  const emptyNumber = true

  while (emptyNumber) {
    let registrationNumber = _generateNumericId()

    const verifyRegistration = {
      inscricao: registrationNumber
    }
  
    const numberFound = await Membro.find(verifyRegistration)

    if (!numberFound.length) {
      return registrationNumber
    }
  }
}

