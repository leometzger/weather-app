import CrudApi from './CrudApi'

export const Country = ({
  id = '',
  name = '',
  code = '',
  createdAt,
  updatedAt,
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
    beforeDelete: async id => {
      await db.cities
        .where('country')
        .equals(id)
        .delete()
    },
  })

export default CountriesApi
