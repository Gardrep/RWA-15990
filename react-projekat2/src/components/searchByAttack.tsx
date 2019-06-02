import React from 'react'

const SearchByAttack = ({onChange}) => (
  <input
    className="span_user"
    type="text"
    onChange={onChange}
    placeholder="Enter pokemon attack..."
    autoFocus
  />
)

export default SearchByAttack