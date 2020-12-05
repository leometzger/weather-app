import LoginApi from '@/api/LoginApi'

describe('Login API', () => {
  const api = LoginApi()

  describe('login', () => {
    it('deve retornar resultado correto quando é passada as credenciais certas', async () => {
      const response = await api.login({username: 'zoox', password: 'zoox'})

      expect(response.isSuccess()).toBe(true)
    })

    it('deve retornar status 401 quando usuário ou senha são inválidos', async () => {
      const response = await api.login({username: 'test', password: 'test'})

      expect(response.isSuccess()).toBe(false)
      expect(response.status).toBe(401)
    })
  })
})
