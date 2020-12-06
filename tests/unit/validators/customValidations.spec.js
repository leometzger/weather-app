import {isValidCountryCode} from '@/components/countries/customValidations'

describe('customValidations', () => {
  describe('isValidCountryCode', () => {
    it('should validate country codes', () => {
      expect(isValidCountryCode('BR')).toBe(true)
      expect(isValidCountryCode('NO')).toBe(true)
      expect(isValidCountryCode('22')).toBe(false)
      expect(isValidCountryCode('US')).toBe(true)
      expect(isValidCountryCode('111')).toBe(false)
    })
  })
})
