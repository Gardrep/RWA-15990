import React from 'react'

const SearchByDefence = ({onChange}) => (
  <input
    className="span_user"
    type="text"
    onChange={onChange}
    placeholder="Enter pokemon defence..."
    autoFocus
  />
)

export default SearchByDefence