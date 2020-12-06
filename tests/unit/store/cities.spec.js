import api from '@/api'
import citiesStore from '@/store/cities'
import {City} from '@/api/CitiesApi'
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

describe('cities store', () => {
  const {actions} = citiesStore
  const commit = jest.fn()
  const dispatch = jest.fn()

  afterEach(() => {
    commit.mockReset()
    dispatch.mockReset()
  })

  describe('fetchCities', () => {
    it('should set cities to store when response is success', async () => {
      api.cities.getItems.mockImplementation(() => {
        return Result({status: 200, payload: [City()]})
      })
      await actions.fetchCities({commit})
      expect(commit).toBeCalledWith('setCities', [City()])
    })
  })

  describe('createCiy', () => {
    it('when create is success notificate and fetchCities', async () => {
      api.cities.createItem.mockImplementation(() => {
        return Result({status: 201, payload: City()})
      })

      await actions.createCity({dispatch}, City())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: CREATED_SUCCESSFULLY_MSG},
        {root: true}
      )
      expect(dispatch).toBeCalledWith('fetchCities')
    })

    it('when create is not success notificate error', async () => {
      api.cities.createItem.mockImplementation(() => {
        return Result({status: 400, payload: City()})
      })

      await actions.createCity({dispatch}, City())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: CREATE_ERROR_MSG},
        {root: true}
      )
      expect(dispatch).not.toBeCalledWith('fetchCities')
    })
  })

  describe('updateCity', () => {
    it('when update is success notificate and fetchCities', async () => {
      api.cities.updateItem.mockImplementation(() => {
        return Result({status: 201, payload: City()})
      })

      await actions.updateCity({dispatch}, City())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: UPDATED_SUCCESSFULLY_MSG},
        {root: true}
      )
      expect(dispatch).toBeCalledWith('fetchCities')
    })

    it('when update is not success notificate error', async () => {
      api.cities.updateItem.mockImplementation(() => {
        return Result({status: 400, payload: City()})
      })

      await actions.updateCity({dispatch}, City())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: UPDATE_ERROR_MSG},
        {root: true}
      )
      expect(dispatch).not.toBeCalledWith('fetchCities')
    })
  })

  describe('deleteCity', () => {
    it('when delete is success notificate and fetchCities', async () => {
      api.cities.deleteItem.mockImplementation(() => {
        return Result({status: 201, payload: City()})
      })

      await actions.deleteCity({dispatch}, City())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: DELETED_SUCCESSFULLY_MSG},
        {root: true}
      )
      expect(dispatch).toBeCalledWith('fetchCities')
    })

    it('when update is not success notificate error', async () => {
      api.cities.deleteItem.mockImplementation(() => {
        return Result({status: 400, payload: City()})
      })

      await actions.deleteCity({dispatch}, City())

      expect(dispatch).toBeCalledWith(
        'notifications/send',
        {text: DELETE_ERROR_MSG},
        {root: true}
      )
      expect(dispatch).not.toBeCalledWith('fetchCities')
    })
  })
})
