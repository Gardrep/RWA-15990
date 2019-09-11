import React, { Component } from 'react'

class SearchByType extends Component<any, any> {

    render() {
        return (
            <div className="mx-1">
                <div className="btn-group">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Types</button>
                    <div className="dropdown-menu" id="searchTypes">
                        {this.renderInner()}
                    </div>
                </div>
            </div>
        )
    }

    renderInner() {
        return this.props.classList.map((x, i) => {
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