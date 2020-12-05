import CrudApi from './CrudApi'

export const Country = ({
  id,
  name,
  code,
  createdAt = null,
  updatedAt = null,
} = {}) => ({
  id,
  name,
  code,
  createdAt,
  updatedAt,
})

const CountriesApi = db =>
  CrudApi({
    table: db.countries,
    factory: Country,
  })

export default CountriesApi
