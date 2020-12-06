import iso from 'iso-3166-1'

export const isValidCountryCode = code => {
  return !!(
    iso.whereAlpha2(code.toString()) ||
    iso.whereAlpha3(code.toString()) ||
    iso.whereNumeric(code)
  )
}
