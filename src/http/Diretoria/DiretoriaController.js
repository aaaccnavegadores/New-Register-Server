import Diretoria from '../../database/models/Diretoria.js'
import Membro from '../../database/models/Membro.js'
import EnumHTTPCode from '../../domain/enum/EnumHTTPCodes.js'
import EnumMessage from '../../domain/enum/EnumMessages.js'

export async function getCurrentManagement (req, res) {
  const filter = {
    ativo: true
  }

  const options = {
    lean: true
  }

  try{
    const management = await Diretoria.find(filter, {}, options)

    if (!management) {
      console.log('[arquivo: DiretoriaController -> funcao: getCurrentManagement] Diretoria não encontrada')
      return res.status(EnumHTTPCode.NOT_FOUND).json({ message: EnumMessage.NO_MANAGEMENT })
    }
    return res.status(EnumHTTPCode.OK).json(management)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: getCurrentManagement] Falha ao buscar diretoria atual', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_MANAGEMENT_FAILED })
  }
}

export async function createDirector (req, res) {
  const { body } = req

  const verifyMember = {
    matricula: body.matricula
  }

  const memberFound = await Membro.findOne(verifyMember)

  if (!memberFound) {
    console.log('[arquivo: DiretoriaController -> funcao: createDirector] Esta matricula não pertence a nenhum membro', { matricula: body.matricula })
    return res.status(EnumHTTPCode.NOT_FOUND).json({ message: EnumMessage.DIRECTOR_NOT_MEMBER })
  }

  try{
    const director = await new Diretoria(body).save()
    return res.status(EnumHTTPCode.CREATED).json(director)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: createDirector] Erro ao tentar adicionar diretor', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.CREATE_DIRECTOR_FAILED })
  }
}

export async function getManagementHistory (req, res) {
  try {
    const history = await Diretoria.find()
    return res.status(EnumHTTPCode.OK).json(history)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: getManagementHistory] Falha ao buscar hitorico', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_HISTORY_FAILED })
  }
}

export async function getRole (req, res) {
  const { cargo_slug } = req.params

  const filter = {
    cargo_slug,
    ativo: true
  }

  const options = {
    lean: true
  }
  
  try{
    const director = await Diretoria.findOne(filter, {}, options)
    
    if (!director) {
      console.log(`[arquivo: DiretoriaController -> funcao: getRole] Cargo não encontrado`, filter)
      return res.status(EnumHTTPCode.NOT_FOUND).json({ message: EnumMessage.ROLE_NOT_FOUND })
    }
    return res.status(EnumHTTPCode.OK).json(director)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: getRole] Erro ao buscar cargo', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_ROLE_FAILED })
  }
}

export async function updateRole (req, res) {
  const { body, params: { cargo_slug } } = req

  const filter = {
    cargo_slug,
    ativo: true
  }
  const update = {
    $set: body
  }
  const options = {
    new: true
  }

  try {
    const updatedRole = await Diretoria.findOneAndUpdate(filter, update, options)
    return res.status(EnumHTTPCode.OK).json(updatedRole)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: updateRole] Erro ao atualizar cargo', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.UPDATE_ROLE_FAILED })
  }
}
