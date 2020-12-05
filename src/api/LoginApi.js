import {Result} from './Result'

const LoginApi = () => ({
  async login({username, password}) {
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (username === 'zoox' && password === 'zoox') {
      return Result({status: 200})
    }

    return Result({status: 401})
  },
})

export default LoginApi
