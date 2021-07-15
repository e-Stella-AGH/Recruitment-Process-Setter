import React from 'react'

import 'estella-two-column-dnd/dist/index.css'
import { TwoColumnDnD } from "estella-two-column-dnd";

const getItem = index => {
  return {
    title: `title-${index}`,
    id: index
  }
}

const getItems = n => {
  return Array(n).fill(null)
    .map((item, index) => getItem(index))
}

const App = () => {
  return <TwoColumnDnD firstListItems={getItems(10)} secondListItems={getItems(5)} forbiddenIndexes={[0, 15]} />
}

export default App
