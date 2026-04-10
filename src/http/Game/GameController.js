import Game from '../../database/models/Game.js'
import EnumHTTPCode from '../../domain/enum/EnumHTTPCodes.js'
import EnumMessage from '../../domain/enum/EnumMessages.js'

export async function getGames (req, res) {
  try {
    const games = await Game.find()
    return res.status(EnumHTTPCode.OK).json(games)
  } catch (error) {
    console.log('[arquivo: GameController -> funcao: getGames] Erro ao buscar jogo', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_GAMES_FAILED })
  }
}

export async function createGame (req, res) {
  const { body } = req

  const verifyGame = {
    slug: body.slug
  }

  const gameFound = await Game.findOne(verifyGame)

  if (gameFound) {
    console.log('[arquivo: GameController -> funcao: createGame] Este jogo já está cadastrado', { slug: body.slug })
    return res.status(EnumHTTPCode.CONFLICT).json({ message: EnumMessage.GAME_ALREADY_EXISTS })
  }

  try{
    const game = await new Game(body).save()
    return res.status(EnumHTTPCode.CREATED).json(game)
  } catch (error) {
    console.log('[arquivo: GameController -> funcao: createGame] Erro ao cadastrar jogo', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.CREATE_SGAME_FAILED })
  }
}

export async function getGame (req, res) {
  const { slug } = req.params

  const filter = {
    slug
  }

  const options = {
    lean: true
  }

  try{
    const game = await Game.findOne(filter, {}, options)

    if (!game) {
      console.log('[arquivo: GameController -> funcao: getGame] Nenhum jogo foi encontrado', filter)
      return res.status(EnumHTTPCode.NOT_FOUND).json({ message: EnumMessage.GAME_NOT_FOUND })
    }
    
    return res.status(EnumHTTPCode.OK).json(game)
  } catch (error) {
    console.log('[arquivo: GameController -> funcao: getGame] Erro ao buscar jogo', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.GET_GAME_FAILED })
  }
}

export async function updateGame (req, res) {
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
    const updatedGame = await Game.findOneAndUpdate(filter, update, options)
    return res.status(EnumHTTPCode.OK).json(updatedGame)
  } catch (error) {
    console.log('[arquivo: GameController -> funcao: updateGame] Houve uma falha ao atualizar jogo', error)
    return res.status(EnumHTTPCode.INTERNAL).json({ message: EnumMessage.UPDATE_GAME_FAILED })
  }
}
