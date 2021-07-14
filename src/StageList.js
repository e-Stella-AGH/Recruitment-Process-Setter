import React from 'react'
import PropTypes from 'prop-types'
import { Stage } from './Stage'
import { Draggable } from 'react-beautiful-dnd'

export const StageList = ({ items, listStyle, stageType, name, droppableProvided }) => {
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
              <Stage
                item={item}
                index={index}
                key={`stage-${index}`}
                style={stageType}
              />
            </div>
          )}
        </Draggable>
      ))}
      {droppableProvided.placeholder}
    </div>
  )
}

StageList.propTypes = {
  items: PropTypes.array.isRequired,
  listStyle: PropTypes.object
}

StageList.defaultProps = {
  listStyle: {
    backgroundColor: '#c3d3f3',
    padding: '1em'
  }
}
