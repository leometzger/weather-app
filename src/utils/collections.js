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
