export function handleValidationError(error, _, res, next) {

  const { ENVIRONMENT } = process.env

  if (error?.isJoi) {
    console.log('Validation Error:', error.message)

    if (ENVIRONMENT === 'production') {
      return res.status(400).json({ message: 'Requisição Inválida' })
    }

    return res.status(400).json({
      message: error.message,
      details: error.details
    })
  }

  console.log('Unhandled Error:', error)

  return res.status(500).json({ message: 'Erro Interno' })
}