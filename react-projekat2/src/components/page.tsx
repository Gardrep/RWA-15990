import React, { Component } from 'react'
import Pokemon from './pokemon'
import {classList } from './pokemon'

import SearchByName from './searchByName'
import SearchByBase from './searchByBase';
import SearchByType from './searchByType';
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import * as pageActions from '../redux/actions/page'
import * as userActions from '../redux/actions/user'

class Page extends Component<any, any> {
  searchString = "";
  SearchHealthStart = NaN;
  SearchHealthEnd = NaN;
  SearchAttackStart = NaN;
  SearchAttackEnd = NaN;
  SearchDeffenceStart = NaN;
  SearchDeffenceEnd = NaN;
  searchType = [];
  searchBase = NaN;
  baseList = ["Health", "Attack", "Deffence"];
  searchBaseList = ["SearchHealthStart", "SearchHealthEnd", "SearchAttackStart","SearchAttackEnd", "SearchDeffenceStart", "SearchDeffenceEnd"];

  showAllVar = false;
  constructor(props) {
    super(props);
    this.state = {
      showAllVar: false
    }
  }

  componentDidMount = () => {
    this.props.getPokemons();
    var data = JSON.parse(localStorage.getItem('token'));
    if (data && !this.props.currentUser)
      this.props.getCurrentUser(data);
  }

  reset() {
    this.searchString = "";
    (document.getElementById("searchName") as HTMLInputElement).value = "";

    this.searchBaseList.forEach((base)=>{
      this[base] = NaN;
      (document.getElementById(base) as HTMLInputElement).value = null;
    })
    
    this.searchType = [];
    document.querySelectorAll(`input[name="cbx"]:checked`).forEach((val) => {
      (val as HTMLInputElement).checked = false;
    })
    this.filter();
  }

  showAll() {
    debugger
    let { displayedPokemons, currentUser, IdStari } = this.props;
    console.log(displayedPokemons);
    let test = displayedPokemons.slice(100, 1000000).map(pokemon => {
      return (
        <li className="pokemons__item" key={pokemon.id}>
          <LinkContainer to="/home">
            <Pokemon pokemon={pokemon} currentUser={currentUser} IdStari={IdStari} />
          </LinkContainer>
        </li>
      )
    })
    return test;
  }

  handleSearch(event) {
    this.searchString = event.currentTarget.value;
    this.filter();
  }
  handleSearchByBase(event) {
    this[event.currentTarget.id] = parseInt(event.currentTarget.value);
    this.filter();
  }
  handleSearchByType() {
    this.searchType = [];
    document.querySelectorAll(`input[name="cbx"]:checked`).forEach((val) => {
      this.searchType.push((val as HTMLInputElement).value);
    })
    this.filter();
  }
  filter() {
    this.props.filterPokemonsAll(this.searchString, this.SearchHealthStart,this.SearchHealthEnd, this.SearchAttackStart,  this.SearchAttackEnd, this.SearchDeffenceStart,this.SearchDeffenceEnd, this.searchType);
  }


  render() {
    let { error } = this.props;


    /*let searchBaseHtml = "";
    ["Health", "Attack", "Deffence"].forEach(base => {
      searchBaseHtml += `
      <div className="col-md-auto">
      ${base}<SearchByBase onChange={this.handleSearchByBase.bind(this)} />
    </div>
      `
    });*/

    return (
      <div className="page">
        {error && <div className="page__error">{error}</div>}
        <div className="page__search">

          <div className="row justify-content-md-center">
            <div className="col-md-auto">
              <button className="btn btn-secondary" onClick={this.reset.bind(this)}>Reset</button>
            </div>
            <div className="col-md-auto">
              <SearchByName onChange={this.handleSearch.bind(this)} />
            </div>
            {this.baseList.map((base, i) => {
              return <div className='col-md-auto' key={i}>
                <SearchByBase onChange={this.handleSearchByBase.bind(this)} baseName={base}/>
              </div>
            })}
            <div className="col-md-auto" >
              <SearchByType onChange={this.handleSearchByType.bind(this)} classList={classList()} />
            </div>
          </div>
        </div>
        {<ul className="pokemons">{this.renderPokemons()}</ul>}
      </div>
    )
  }

  onClickHandler() {
    this.setState({
      showAllVar: true
    });
  }

  renderPokemons() {
    let { displayedPokemons, currentUser, IdStari } = this.props;
    if (displayedPokemons) {
      if (displayedPokemons.length > 100) {
        let pokemons = displayedPokemons;
        if (!this.state.showAllVar) {
          pokemons = pokemons.slice(0, 100);
        }
        let pokemonsToShow = pokemons.map(pokemon => {
          return (
            <li className="pokemons__item" key={pokemon.id}>
              <LinkContainer to="/home">
                <Pokemon pokemon={pokemon} currentUser={currentUser} IdStari={IdStari} />
              </LinkContainer>
            </li>
          )
        });
        if (!this.state.showAllVar) {
          pokemonsToShow.push((
            <li className="pokemons__item" key={"ShowAll"}>
              <button className="btn btn-secondary btn-sm" onClick={this.onClickHandler.bind(this)}>ShowAll</button>
            </li>
          ));
        }
        return pokemonsToShow;
      }
      else {
        return displayedPokemons.map(pokemon => {
          return (
            <li className="pokemons__item" key={pokemon.id}>
              <LinkContainer to="/home">
                <Pokemon pokemon={pokemon} currentUser={currentUser} IdStari={IdStari} />
              </LinkContainer>
            </li>
          )
        })
      }
    }
    return null;
  }
}


function mapStateToProps(state: any) {
  const { displayedPokemons, error, currentUser, IdStari } = state.page;

  return {
    displayedPokemons,
    error,
    currentUser,
    IdStari
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: (state) => dispatch(userActions.getCurrentUser(state)),
    getPokemons: () => dispatch(pageActions.getPokemons()),
    filterPokemonsAll: (searchString, SearchHealthStart, SearchHealthEnd, SearchAttackStart, SearchAttackEnd, SearchDeffenceStart, SearchDeffenceEnd, searchTypes) => dispatch(pageActions.filterPokemonsAll(searchString, SearchHealthStart, SearchHealthEnd, SearchAttackStart, SearchAttackEnd, SearchDeffenceStart, SearchDeffenceEnd, searchTypes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)