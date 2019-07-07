import React from 'react'

const Search = ({ onChange }) => (
  <input
    className="mr-2"
    type="text"
    id="searchName"
    onChange={onChange}
    placeholder="Enter pokemon name..."
    autoFocus
  />
)

export default Search
