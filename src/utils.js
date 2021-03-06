export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  shouldRemoveFromSecondList
) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const secondItems =
    droppableSource.droppableId === 'secondList' && !shouldRemoveFromSecondList
      ? Array.from(source)
      : undefined

  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = secondItems || sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
