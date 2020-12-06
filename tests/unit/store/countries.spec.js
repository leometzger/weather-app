import api from '@/api'
import countriesStore from '@/store/countries'
import {Country} from '@/api/CountriesApi'
import {
  CREATED_SUCCESSFULLY_MSG,
  CREATE_ERROR_MSG,
  DELETED_SUCCESSFULLY_MSG,
  DELETE_ERROR_MSG,
  UPDATED_SUCCESSFULLY_MSG,
  UPDATE_ERROR_MSG,
} from '@/messages'
import {Result} from '@/api/Result'

jest.mock('@/api')

describe('countries store', () => {
  const {actions} = countriesStore
  const commit = jest.fn()
  const dispatch = jest.fn()

  afterEach(() => {
    commit.mockReset()
    dispatch.mockReset()
  })

  describe('fetchCountries', () => {
    it('should set countries to store when response is success', async () => {
      api.countries.getItems.mockImplementation(() => {
        return Result({status: 200, payload: [Country()]})
      })
      await actions.fetchCountries({commit})
      expect(commit).toBeCalledWith('setCountries', [Country()])
    })
  })

  describe('createCiy', () => {
    it('when create is success notificate and fetchCountries', async () => {
      api.countries.createItem.mockImplementation(() => {
        return Result({status: 201, payload: Country()})
      })

      await actions.createCountry({dispatch}, Country())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: CREATED_SUCCESSFULLY_MSG},
        {root: true}
      )
      expect(dispatch).toBeCalledWith('fetchCountries')
    })

    it('when create is not success notificate error', async () => {
      api.countries.createItem.mockImplementation(() => {
        return Result({status: 400, payload: Country()})
      })

      await actions.createCountry({dispatch}, Country())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: CREATE_ERROR_MSG},
        {root: true}
      )
      expect(dispatch).not.toBeCalledWith('fetchCountries')
    })
  })

  describe('updateCountry', () => {
    it('when update is success notificate and fetchCountries', async () => {
      api.countries.updateItem.mockImplementation(() => {
        return Result({status: 201, payload: Country()})
      })

      await actions.updateCountry({dispatch}, Country())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: UPDATED_SUCCESSFULLY_MSG},
        {root: true}
      )
      expect(dispatch).toBeCalledWith('fetchCountries')
    })

    it('when update is not success notificate error', async () => {
      api.countries.updateItem.mockImplementation(() => {
        return Result({status: 400, payload: Country()})
      })

      await actions.updateCountry({dispatch}, Country())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: UPDATE_ERROR_MSG},
        {root: true}
      )
      expect(dispatch).not.toBeCalledWith('fetchCountries')
    })
  })

  describe('deleteCountry', () => {
    it('when delete is success notificate and fetchCountries', async () => {
      api.countries.deleteItem.mockImplementation(() => {
        return Result({status: 201, payload: Country()})
      })

      await actions.deleteCountry({dispatch}, Country())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: DELETED_SUCCESSFULLY_MSG},
        {root: true}
      )
      expect(dispatch).toBeCalledWith('fetchCountries')
    })

    it('when update is not success notificate error', async () => {
      api.countries.deleteItem.mockImplementation(() => {
        return Result({status: 400, payload: Country()})
      })

      await actions.deleteCountry({dispatch}, Country())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: DELETE_ERROR_MSG},
        {root: true}
      )
      expect(dispatch).not.toBeCalledWith('fetchCountries')
    })
  })
})
