import {isInvalidState} from '@/components/login/customValidations'
import {authStates} from '@/store/authentication'
import {isValidCountryCode} from '@/components/countries/customValidations'

describe('customValidations', () => {
  describe('isInvalidState', () => {
    it('should be invalid when login state is LOGIN_ERROR', () => {
      const result = isInvalidState(null, {loginState: authStates.LOGIN_ERROR})

      expect(result).toBe(true)
    })

    it('should not be invalid when loginState is different than LOGIN_ERROR', () => {
      const result = isInvalidState(null, {
        loginState: 'UNAUTHENTICATED',
      })

      expect(result).toBe(false)
    })
  })

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
