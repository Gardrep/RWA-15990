import React from 'react'

const SearchByDefence = ({ onChange }) => (
  <input
    className="mr-2"
    type="number"
    id="searchDEF"
    onChange={onChange}
    placeholder="Enter pokemon defence..."
    autoFocus
  />
)

export default SearchByDefence