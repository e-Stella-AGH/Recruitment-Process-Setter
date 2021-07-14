import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StageList } from './StageList'
import { Grid } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { move, reorder } from './utils'

export const TwoColumnDnD = ({
  firstListItems,
  secondListItems,
  gridOptions,
  listStyle,
  itemStyle,
  warningFunction,
  forbiddenIndexes
}) => {
  const [lists, setLists] = useState({
    firstListItems: firstListItems || [],
    secondListItems: secondListItems || []
  })

  const getList = (droppableId) =>
    droppableId === 'firstList' ? lists.firstListItems : lists.secondListItems

  const onDragEnd = (result) => {
    const { source, destination } = result

    if (!destination) {
      if (source.droppableId === 'firstList') {
        const newFirst = getList('firstList').filter(
          (elem, index) => index !== source.index
        )
        setLists({ ...lists, firstListItems: newFirst })
      }
      return
    }

    if (
      destination.index <= forbiddenIndexes[0] ||
      destination.index >= forbiddenIndexes[1]
    ) {
      if (warningFunction) warningFunction()
      return
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      )
      let state = { firstListItems: items }
      if (source.droppableId === 'secondList') {
        state = { secondListItems: items }
      }
      setLists({
        ...lists,
        ...state
      })
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      )
      setLists({
        firstListItems: result.firstList,
        secondListItems: result.secondList
      })
    }
  }

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%', marginTop: '2em' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          container
          spacing={2}
          direction='row'
          alignItems='center'
          justifyContent='center'
        >
          <Grid
            item
            xs={gridOptions.firstList.xs}
            sm={gridOptions.firstList.sm}
            md={gridOptions.firstList.md}
            lg={gridOptions.firstList.lg}
          >
            <Droppable droppableId='firstList'>
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  <StageList
                    items={lists.firstListItems}
                    name='first'
                    droppableProvided={provided}
                    listStyle={listStyle}
                    itemStyle={itemStyle}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
          <Grid
            item
            xs={gridOptions.break.xs}
            sm={gridOptions.break.sm}
            md={gridOptions.break.md}
            lg={gridOptions.break.lg}
          />
          <Grid
            item
            xs={gridOptions.secondList.xs}
            sm={gridOptions.secondList.sm}
            md={gridOptions.secondList.md}
            lg={gridOptions.secondList.lg}
          >
            <Droppable droppableId='secondList'>
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  <StageList
                    items={lists.secondListItems}
                    name='second'
                    droppableProvided={provided}
                    listStyle={listStyle}
                    itemStyle={itemStyle}
                  />
                </div>
              )}
            </Droppable>
          </Grid>
        </Grid>
      </DragDropContext>
    </div>
  )
}

TwoColumnDnD.propTypes = {
  firstListItems: PropTypes.array.isRequired,
  secondListItems: PropTypes.array.isRequired,
  gridOptions: PropTypes.object,
  warningFunction: PropTypes.func,
  listStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  forbiddenIndexes: PropTypes.array.isRequired
}

TwoColumnDnD.defaultProps = {
  gridOptions: {
    firstList: {
      xs: 6,
      sm: 6,
      md: 5,
      lg: 5
    },
    break: {
      xs: false,
      sm: false,
      md: 2,
      lg: 2
    },
    secondList: {
      xs: 6,
      sm: 6,
      md: 5,
      lg: 5
    }
  }
}
