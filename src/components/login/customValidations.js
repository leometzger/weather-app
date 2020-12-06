import {authStates} from '@/store/authentication'

export function isInvalidState(value, parentVm) {
  return parentVm.loginState === authStates.LOGIN_ERROR
}
