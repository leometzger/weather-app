export function difference(collection1, collection2) {
  return collection1.filter(itemCollection1 => {
    return !collection2.some(
      itemCollection2 => itemCollection1 === itemCollection2
    )
  })
}

export function intersection(collection1, collection2) {
  return collection1.filter(itemCollection1 => {
    return collection2.some(
      itemCollection2 => itemCollection1 === itemCollection2
    )
  })
}

export function flatArray(arr) {
  const result = []

  for (let i = 0; i < arr.length; ++i) {
    const subarr = arr[i]

    for (let j = 0; j < subarr.length; ++j) {
      result.push(subarr[j])
    }
  }

  return result
}
