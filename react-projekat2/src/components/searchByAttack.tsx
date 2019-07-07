import React from 'react'

const SearchByAttack = ({ onChange }) => (
  <input
    className="mr-2 col-xs-1"
    type="number"
    id="searchATK"
    onChange={onChange}
    placeholder="Enter pokemon attack..."
    autoFocus
  />
)

export default SearchByAttack