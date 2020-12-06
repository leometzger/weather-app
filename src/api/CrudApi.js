import {Result} from './Result'

const CrudApi = ({table, factory, beforeDelete = async () => {}}) => ({
  // GET /api/item
  getItems: async () => {
    const item = await table.toArray()

    return Result({payload: item})
  },

  // GET /api/item/:id
  async getItem(id) {
    const item = await table.get(id)

    if (!item) {
      return Result({status: 404})
    }

    return Result({payload: item})
  },

  // POST /api/item
  createItem: async item => {
    const insertItem = factory(item)
    delete insertItem.id
    insertItem.createdAt = new Date()
    insertItem.updatedAt = new Date()
    const id = await table.put(insertItem)

    item.id = id

    return Result({status: 201, payload: item})
  },

  // PUT /api/item/:id
  updateItem: async (id, item) => {
    const dbItem = await table.get(id)

    if (!dbItem) {
      return Result({status: 404})
    }

    const updatedItem = factory(item)
    updatedItem.createdAt = dbItem.createdAt
    updatedItem.updatedAt = new Date()

    await table.update(id, updatedItem)

    return Result({status: 200, payload: updatedItem})
  },

  // DELETE /api/item/:id
  deleteItem: async id => {
    await beforeDelete(id)
    const item = await table.get(id)

    if (!item) {
      return Result({status: 404})
    }

    await table.delete(id)

    return Result({status: 204})
  },
})

export default CrudApi
