import React from 'react'
import PropTypes from 'prop-types'

export const Item = ({ render, item }) => {
  return <div>{render(item)}</div>
}

Item.propTypes = {
  item: PropTypes.any.isRequired,
  render: PropTypes.func.isRequired
}
