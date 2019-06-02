import React from 'react'

const Search = ({onChange}) => (
  <input
    className="span_user"
    type="text"
    onChange={onChange}
    placeholder="Enter pokemon name..."
    autoFocus
  />
)

export default Search
