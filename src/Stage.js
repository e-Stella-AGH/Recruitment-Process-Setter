import React from 'react'
import PropTypes from 'prop-types'
import { Card, Typography } from '@material-ui/core'

export const Stage = ({ item, index, style }) => {
  return (
    <Card style={{ ...style }}>
      <Typography variant='h6'>{item.title}</Typography>
    </Card>
  )
}

Stage.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object
}

Stage.defaultProps = {
  style: {
    margin: '16px',
    padding: '1em',
    textAlign: 'center',
    backgroundColor: '#265bc5',
    color: '#eef3fc'
  }
}
