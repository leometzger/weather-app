export const Result = ({status = 200, payload = {}} = {}) => ({
  status,
  payload,

  isSuccess() {
    return this.status >= 200 && this.status < 300
  },
})
