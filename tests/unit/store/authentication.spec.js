import api from '@/api'
import {Result} from '@/api/Result'
import authenticationStore from '@/store/authentication'

jest.mock('@/api')

describe('Authentication Store', () => {
  const commit = jest.fn()
  const {actions} = authenticationStore

  afterEach(() => commit.mockReset())

  describe('submitLogin', () => {
    it('should be authenticated when response is success', async () => {
      api.login.mockImplementation(() => Result({status: 200}))

      await actions.submitLogin({commit}, {username: 'zoox', password: 'zoox'})

      expect(commit).toBeCalledWith('authenticated')
    })

    it('should have failed login when response is not success', async () => {
      api.login.mockImplementation(() => Result({status: 401}))

      await actions.submitLogin(
        {commit},
        {username: 'admin', password: 'admin'}
      )

      expect(commit).toBeCalledWith('failedLogin')
    })
  })
})
