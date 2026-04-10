import Esporte from '../../database/models/Esporte.js'
import EnumHTTPCode from '../../domain/enum/EnumHTTPCodes.js'
import EnumMessage from '../../domain/enum/EnumMessages.js'

export async function getSports (req, res) {
  try {
    const sports = await Esporte.find()
    return res.status(EnumHTTPCode.OK).json(sports)
  } catch (error) {
    console.log('[arquivo: EsporteController -> funcao: getSports] Erro ao buscar esportes', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_SPORTS_FAILED })
  }
}

export async function createSport (req, res) {
  const { body } = req

  const verifySport = {
    slug: body.slug
  }

  const sportFound = await Esporte.findOne(verifySport)

  if (sportFound) {
    console.log('[arquivo: EsporteController -> funcao: createSport] Este esporte já está cadastrado', { slug: body.slug })
    return res.status(EnumHTTPCode.CONFLICT).json({ message: EnumMessage.SPORT_ALREADY_EXISTS })
  }

  try{
    const sport = await new Esporte(body).save()
    return res.status(EnumHTTPCode.CREATED).json(sport)
  } catch (error) {
    console.log('[arquivo: EsporteController -> funcao: createSport] Erro ao cadastrar esporte', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.CREATE_SPORT_FAILED })
  }
}

export async function getSport (req, res) {
  const { slug } = req.params

  const filter = {
    slug
  }

  const options = {
    lean: true
  }

  try{
    const sport = await Esporte.findOne(filter, {}, options)

    if (!sport) {
      console.log('[arquivo: EsporteController -> funcao: getSport] Nenhum esporte foi encontrado', filter)
      return res.status(EnumHTTPCode.NOT_FOUND).json({ message: EnumMessage.SPORT_NOT_FOUND })
    }
    
    return res.status(EnumHTTPCode.OK).json(sport)
  } catch (error) {
    console.log('[arquivo: EsporteController -> funcao: getSport] Erro ao buscar esporte', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_SPORT_FAILED })
  }
}

export async function updateSport (req, res) {
  const { body, params: { slug } } = req

  const filter = {
    slug
  }
  const update = {
    $set: body
  }
  const options = {
    new: true
  }

  try {
    const updatedSport = await Esporte.findOneAndUpdate(filter, update, options)
    return res.status(EnumHTTPCode.OK).json(updatedSport)
  } catch (error) {
    console.log('[arquivo: EsporteController -> funcao: updateSport] Houve uma falha ao atualizar esporte', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.UPDATE_SPORT_FAILED })
  }
}
