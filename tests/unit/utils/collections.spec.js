import {difference, intersection} from '@/utils/collections'

describe('utils collections', () => {
  describe('difference', () => {
    it('should return the difference between two arrays based on first', () => {
      const arr1 = [1, 2, 3, 5]
      const arr2 = [2, 5, 1, 6]

      const result = difference(arr1, arr2)

      expect(result).toEqual([3])
    })
  })

  describe('intersection', () => {
    it('should return the intersection between two arrays', () => {
      const arr1 = [1, 2, 3, 5]
      const arr2 = [2, 5, 1]

      const result = intersection(arr1, arr2)

      expect(result).toEqual([1, 2, 5])
    })
  })
})
