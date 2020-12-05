import CrudApi from './CrudApi'

export const City = ({
  id = '',
  name = '',
  country = '',
  latitude = '',
  longitude = '',
  createdAt = null,
  updatedAt = null,
} = {}) => ({
  id,
  name,
  latitude,
  longitude,
  country,
  createdAt,
  updatedAt,
})

const CitiesApi = db =>
  CrudApi({
    table: db.cities,
    factory: City,
  })

export default CitiesApi
