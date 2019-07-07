import React, { Component } from 'react'

class SearchByType extends Component<any, any> {

    render() {
        return (

            <div className="my-1 mx-2">
                <div className="btn-group">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Types</button>
                    <div className="dropdown-menu" id="searchTypes">
                        {this.renderInner()}
                    </div>
                </div>
            </div>
        )
    }

    renderInner() {
        let ClassList = ["Normal", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel"];
        return ClassList.map((x, i) => {
            return (
                <div key={i}>
                    <input
                        className="mx-2"
                        type="checkbox"
                        id="searchType"
                        onChange={this.props.onChange}
                        name="cbx"
                        value={x}
                    />
                    <span>{x}</span>
                </div>
            )
        })
    }
}

export default SearchByType