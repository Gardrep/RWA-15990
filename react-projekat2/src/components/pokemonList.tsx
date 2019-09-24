import React, { Component } from 'react'
import Pokemon from './pokemon'
import { classList } from '../models/pokemonModel'

import SearchByName from './searchByName'
import SearchByBase from './searchByBase';
import SearchByType from './searchByType';
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import * as pokemonListActions from '../redux/actions/pokemonList'
import * as userActions from '../redux/actions/user'
import { AppState } from '../redux/reducers';
import { UserModel } from '../models/userModel';
import { PokemonModel } from '../models/pokemonModel';
import { FilterModel, searchBaseList } from '../models/filterModel';

interface PokemonListState {
  showAllVar: boolean;
}

interface PokemonListProps {
  getPokemons: () => {};
  filterPokemonsAll: (filter: FilterModel) => {};
  getCurrentUser: (token: string) => {};
  error: boolean;
  pokemons: PokemonModel[];
  displayedPokemons: PokemonModel[];
  users: UserModel[];
  currentUser: UserModel;
  IdStari: number;
}

class PokemonList extends Component<PokemonListProps, PokemonListState> {
  searchString: string = "";
  SearchHealthStart: number = NaN;
  SearchHealthEnd: number = NaN;
  SearchAttackStart: number = NaN;
  SearchAttackEnd: number = NaN;
  SearchDeffenceStart: number = NaN;
  SearchDeffenceEnd: number = NaN;
  searchType: string[] = [];
  baseList: string[] = ["Health", "Attack", "Deffence"];

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

    searchBaseList.forEach((base) => {
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
    let { displayedPokemons, currentUser, IdStari } = this.props;
    console.log(displayedPokemons);
    let test = displayedPokemons.slice(100, 1000000).map(pokemon => {
      return (
        <li className="pokemons__item" key={pokemon.id}>
          <LinkContainer to="/home">
            <Pokemon pokemon={pokemon} currentUser={currentUser} IdStari={IdStari}  isComparable={true}/>
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
    let filter:FilterModel ={
      searchString: this.searchString,
      SearchHealthStart: this.SearchHealthStart,
      SearchHealthEnd:  this.SearchHealthEnd,
      SearchAttackStart: this.SearchAttackStart,
      SearchAttackEnd: this.SearchAttackEnd,
      SearchDeffenceStart: this.SearchDeffenceStart,
      SearchDeffenceEnd: this.SearchDeffenceEnd,
      searchTypes: this.searchType

    }
    this.props.filterPokemonsAll(filter);
  }


  render() {
    let { error } = this.props;

    return (
      <div>
        {error && <div className="pokemonList__error">{error}</div>}
        <div className="pokemonList__search">

          <div className="row justify-content-md-center">
            <div className="col-md-auto">
              <button className="btn btn-secondary" onClick={this.reset.bind(this)}>Reset</button>
            </div>
            <div className="col-md-auto">
              <SearchByName onChange={this.handleSearch.bind(this)} />
            </div>
            {this.baseList.map((base, i) => {
              return <div className='col-md-auto' key={i}>
                <SearchByBase onChange={this.handleSearchByBase.bind(this)} baseName={base} />
              </div>
            })}
            <div className="col-md-auto" >
              <SearchByType onChange={this.handleSearchByType.bind(this)} classList={classList} />
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
                <Pokemon pokemon={pokemon} currentUser={currentUser} IdStari={IdStari} isComparable={true} />
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
                <Pokemon pokemon={pokemon} currentUser={currentUser} IdStari={IdStari}  isComparable={true}/>
            </li>
          )
        })
      }
    }
    return null;
  }
}


function mapStateToProps(state: AppState) {
  const { displayedPokemons, error} = state.pokemonList;
  const {  currentUser, IdStari } = state.user;

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
    getPokemons: () => dispatch(pokemonListActions.getPokemons()),
    filterPokemonsAll: (filter: FilterModel) => dispatch(pokemonListActions.filterPokemonsAll(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList)

/*
        searchString,
        SearchHealthStart,
        SearchHealthEnd,
        SearchAttackStart,
        SearchAttackEnd,
        SearchDeffenceStart,
        SearchDeffenceEnd,
        searchTypes
        */

        /*
        searchString: string,
      SearchHealthStart: number,
      SearchHealthEnd: number,
      SearchAttackStart: number,
      SearchAttackEnd: number,
      SearchDeffenceStart: number,
      SearchDeffenceEnd: number,
      searchTypes: string[]
      */