import React, { Component } from 'react'
import Pokemon from './pokemon'
import Search from './search'
import SearchByHealth from './searchByHealth'
import SearchByAttack from './searchByAttack';
import SearchByDefence from './searchByDefence';
import SearchByType from './searchByType';
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import * as pageActions from '../redux/actions/page'
import * as userActions from '../redux/actions/user'

class Page extends Component<any, any> {
  searchString = "";
  searchHP = NaN;
  searchATK = NaN;
  searchDEF = NaN;
  searchType = [];

  showAllVar = false;
  constructor(props){
    super(props);
    this.state={
      showAllVar:false
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
    this.searchHP = NaN;
    this.searchATK = NaN;
    this.searchDEF = NaN;
    this.searchType = [];
    (document.getElementById("searchName") as HTMLInputElement).value = "";
    (document.getElementById("searchHP") as HTMLInputElement).value = null;
    (document.getElementById("searchATK") as HTMLInputElement).value = null;
    (document.getElementById("searchDEF") as HTMLInputElement).value = null;
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

    console.log(test);
    return test;
  }

  handleSearch(event) {
    this.searchString = event.currentTarget.value;
    this.filter();
  }
  handleSearchByHealth(event) {
    this.searchHP = parseInt(event.currentTarget.value);
    this.filter();
  }
  handleSearchByAttack(event) {
    this.searchATK = parseInt(event.currentTarget.value);
    this.filter();
  }
  handleSearchByDefence(event) {
    this.searchDEF = parseInt(event.currentTarget.value);
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
    this.props.filterPokemonsAll(this.searchString, this.searchHP, this.searchATK, this.searchDEF, this.searchType);
  }

  render() {
    let { error } = this.props;
    return (
      <div className="page">
        {error && <div className="page__error">{error}</div>}
        <div className="page__search">

          <div className="row justify-content-md-center">
            <div className="col col-lg-2">
              <button className="btn btn-secondary btn-sm" onClick={this.reset.bind(this)}>Reset</button>
            </div>
            <div className="col-md-auto">
              NAME<Search onChange={this.handleSearch.bind(this)} />
            </div>
            <div className="col-md-auto">
              HP<SearchByHealth onChange={this.handleSearchByHealth.bind(this)} />
            </div>
            <div className="col-md-auto">
              ATK<SearchByAttack onChange={this.handleSearchByAttack.bind(this)} />
            </div>
            <div className="col-md-auto">
              DEF<SearchByDefence onChange={this.handleSearchByDefence.bind(this)} />
            </div>
            <div className="col col-lg-2" >
              TYPE<SearchByType onChange={this.handleSearchByType.bind(this)} />
            </div>
          </div>
        </div>
        {<ul className="pokemons">{this.renderPokemons()}</ul>}
      </div>
    )
  }

  onClickHandler(){
    this.setState({
      showAllVar:true
    });
  }

  renderPokemons() {
    let { displayedPokemons, currentUser, IdStari } = this.props;
    if (displayedPokemons) {
      if (displayedPokemons.length > 100) {
        let pokemons = displayedPokemons;
        if(!this.state.showAllVar){
          pokemons =pokemons.slice(0, 100);
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
              <button className="btn btn-secondary btn-sm" onClick={this.onClickHandler.bind(this) }>ShowAll</button>
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
    filterPokemonsAll: (searchString, searchHP, searchATK, searchDEF, searchTypes) => dispatch(pageActions.filterPokemonsAll(searchString, searchHP, searchATK, searchDEF, searchTypes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)