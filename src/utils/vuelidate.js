export const buildMessages = (field, messageMapping = {}) => {
  if (!field.$dirty) return []

  const messages = Object.keys(messageMapping)
    .map(key => (field[key] ? null : messageMapping[key]))
    .filter(message => message !== null)

  return messages
}
