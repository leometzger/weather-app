import {buildMessages} from '@/utils/vuelidate'

describe('utils vuelidate', () => {
  let $vField

  beforeEach(() => {
    $vField = {
      $dirty: false,
      required: true,
      maxLength: true,
      email: true,
    }
  })

  describe('buildMessages', () => {
    it('should return empty array for non-dirty fields', () => {
      const messageMapping = {}

      const messages = buildMessages($vField, messageMapping)

      expect(messages).toEqual([])
    })

    it('should Mapped Messages for invalid fields', () => {
      $vField.$dirty = true
      $vField.maxLength = false
      $vField.email = false
      const messageMapping = {
        required: 'Campo requerido',
        maxLength: 'Tamanho máximo',
        email: 'Email',
      }

      const messages = buildMessages($vField, messageMapping)

      expect(messages).toEqual(['Tamanho máximo', 'Email'])
    })
  })
})
