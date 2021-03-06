import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ItemList } from './ItemList'
import { Button, Grid } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { move, reorder } from './utils'

export const TwoColumnDnD = ({
  firstListItems,
  secondListItems,
  gridOptions,
  listStyle,
  warningFunction,
  secondListWarningFunction,
  itemRender,
  forbiddenIndexes,
  shouldBlockAddingToSecondList,
  shouldRemoveFromSecondList,
  outerDivStyle,
  onSubmit,
  materialButtonProps,
  leftSubmitGridProps,
  centerSubmitGridProps,
  rightSubmitGridProps,
  submitDivStyle,
  onFirstListChange,
  onSecondListChange,
  shouldDisplaySubmit
}) => {
  const [lists, setLists] = useState({
    firstListItems: firstListItems || [],
    secondListItems: secondListItems || []
  })

  useEffect(() => {
    if (firstListItems !== lists.firstListItems) {
      setLists({
        firstListItems: firstListItems,
        secondListItems: secondListItems
      })
      onFirstListChange?.(firstListItems)
    }
    if (secondListItems !== lists.secondListItems) {
      setLists({
        firstListItems: firstListItems,
        secondListItems: secondListItems
      })
      onSecondListChange?.(secondListItems)
    }
  }, [firstListItems, secondListItems])

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
      destination.droppableId === 'secondList' &&
      shouldBlockAddingToSecondList
    ) {
      if (secondListWarningFunction) secondListWarningFunction()
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
        onSecondListChange?.(items)
      } else {
        onFirstListChange(items)
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
        destination,
        shouldRemoveFromSecondList
      )
      setLists({
        firstListItems: result.firstList,
        secondListItems: result.secondList
      })
      onFirstListChange?.(result.firstList)
      onSecondListChange?.(result.secondList)
    }
  }

  return (
    <div {...outerDivStyle}>
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
                  <ItemList
                    items={lists.firstListItems}
                    name='first'
                    droppableProvided={provided}
                    listStyle={listStyle}
                    itemRender={itemRender}
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
                  <ItemList
                    items={lists.secondListItems}
                    name='second'
                    droppableProvided={provided}
                    listStyle={listStyle}
                    itemRender={itemRender}
                  />
                </div>
              )}
            </Droppable>
          </Grid>
        </Grid>
      </DragDropContext>
      <div style={{ ...submitDivStyle }}>
        <Grid container>
          <Grid item {...leftSubmitGridProps} />
          <Grid item {...centerSubmitGridProps}>
            { shouldDisplaySubmit &&
            <Button
              {...materialButtonProps}
              onClick={() =>
                onSubmit(lists.firstListItems, lists.secondListItems)
              }
            >
              Submit
            </Button>
          }
          </Grid>
          <Grid item {...rightSubmitGridProps} />
        </Grid>
      </div>
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
  secondListWarningFunction: PropTypes.func,
  itemRender: PropTypes.func.isRequired,
  forbiddenIndexes: PropTypes.array.isRequired,
  shouldBlockAddingToSecondList: PropTypes.bool,
  shouldRemoveFromSecondList: PropTypes.bool,
  onSubmit: PropTypes.func,
  materialButtonProps: PropTypes.object,
  outerDivStyle: PropTypes.object,
  leftSubmitGridProps: PropTypes.object,
  centerSubmitGridProps: PropTypes.object,
  rightSubmitGridProps: PropTypes.object,
  submitDivStyle: PropTypes.object,
  onFirstListChange: PropTypes.func,
  onSecondListChange: PropTypes.func,
  shouldDisplaySubmit: PropTypes.bool
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
