import React from 'react'

const SearchByName = ({ onChange }) => (
  <div className="input-group">
  <div className="input-group-prepend">
    <span className="input-group-text inputGroupText">Name</span>
  </div>
  <input
    type="text"
    id="searchName"
    onChange={onChange}
    placeholder="Enter pokemon name..."
    autoFocus
  />
  </div>
)

export default SearchByName
