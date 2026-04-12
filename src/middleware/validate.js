export function validate(schema, property) {
  return (req, _, next) => {
    const { value, error } = schema.validate(req[property])

    if (error) {
      error.isJoi = true
      return next(error)
    }

    property === 'body' ? (req[property] = value) : Object.assign(req[property], value)

    next()
  }
}
  