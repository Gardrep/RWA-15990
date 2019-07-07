import React from 'react'

const SearchByHealth = ({ onChange }) => (
  <input
    className="mr-2"
    type="number"
    id="searchHP"
    onChange={onChange}
    placeholder="Enter pokemon health..."
    autoFocus
  />
)

export default SearchByHealth