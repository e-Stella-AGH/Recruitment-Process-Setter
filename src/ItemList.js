import React from 'react'
import PropTypes from 'prop-types'
import { Item } from './Item'
import { Draggable } from 'react-beautiful-dnd'

export const ItemList = ({
  items,
  listStyle,
  itemRender,
  name,
  droppableProvided
}) => {
  return (
    <div style={{ ...listStyle }}>
      {items.map((item, index) => (
        <Draggable
          key={`draggable-${index}`}
          draggableId={`${name}-drag-${index}`}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Item item={item} key={`stage-${index}`} render={itemRender} />
            </div>
          )}
        </Draggable>
      ))}
      {droppableProvided.placeholder}
    </div>
  )
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  listStyle: PropTypes.object,
  itemRender: PropTypes.func.isRequired
}

ItemList.defaultProps = {
  listStyle: {
    backgroundColor: '#c3d3f3',
    padding: '1em'
  }
}
