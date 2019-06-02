import React from 'react'

const searchByHealth = ({onChange}) => (
  <input
    className="span_user"
    type="text"
    onChange={onChange}
    placeholder="Enter pokemon health..."
    autoFocus
  />
)

export default searchByHealth