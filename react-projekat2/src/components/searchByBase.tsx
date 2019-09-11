import React from 'react'

const SearchByBase = ({ onChange, baseName }) => (
  <div className="input-group">
    <div className="input-group-prepend" >
      <span className="input-group-text inputGroupText" id="">{baseName}</span>
    </div>
    <input
      className="searchBase"
      type="number"
      id={"Search" + baseName + "Start"}
      onChange={onChange}
      placeholder={"Start"}
      autoFocus
    />
    <input
      className="searchBase"
      type="number"
      id={"Search" + baseName + "End"}
      onChange={onChange}
      placeholder={"End"}
      autoFocus
    />
  </div>
)

export default SearchByBase