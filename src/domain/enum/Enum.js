export default (enumData) => ({
  ...enumData,
  values: () => Object.values(enumData),
  keys: () => Object.keys(enumData)
})
