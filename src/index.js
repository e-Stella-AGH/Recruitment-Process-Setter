import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StageList } from './StageList'
import { Grid } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export const TwoColumnDnD = ({
  firstListItems,
  secondListItems,
  gridOptions
}) => {
  const [lists, setLists] = useState({
    firstListItems: firstListItems || [],
    secondListItems: secondListItems || []
  })

  const onDragEnd = (result) => {}

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%', marginTop: '2em' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          container
          spacing={2}
          direction='row'
          alignItems='center'
          justify='center'
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
  gridOptions: PropTypes.object
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
