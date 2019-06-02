import React, { Component } from 'react'
import Pokemon from './pokemon'
import Search from './search'
import SearchByHealth from './searchByHealth'
import SearchByAttack from './searchByAttack';
import SearchByDefence from './searchByDefence';
import { connect } from 'react-redux'
import { LinkContainer} from 'react-router-bootstrap';
import * as pageActions from '../redux/actions/page'
import * as userActions from '../redux/actions/user'

class Page extends Component<any,any> {

  componentDidMount = () =>{
    this.props.getPokemons();
    var data = JSON.parse(localStorage.getItem('token'));
    if(data && !this.props.currentUser)
    this.props.getCurrentUser(data);
  }

  handleSearch(event) {
    this.props.filterPokemons(event.currentTarget.value)
  }
  handleSearchByHealth(event) {
    this.props.filterPokemonsByHealth(event.currentTarget.value)
  }
  handleSearchByAttack(event) {
    this.props.filterPokemonsByAttack(event.currentTarget.value)
  }
  handleSearchByDefence(event) {
    this.props.filterPokemonsByDefence(event.currentTarget.value)
  }

  renderPokemon()
  {
      let { displayedPokemons, currentUser, IdStari } = this.props;
      if(displayedPokemons){
        return displayedPokemons.map(pokemon => {
          return (
            <li className="pokemons__item" key={pokemon.id}>
              <LinkContainer  to="/home">
                <Pokemon pokemon={pokemon} currentUser = {currentUser} IdStari={IdStari} />
              </LinkContainer>
            </li>
            )
        })
      }

      return null;
  }

  render() {
    let { error } = this.props
    return (
      <div className="page">
        {error && <div className="page__error">{error}</div>}
        <div className="page__search">
          <Search onChange={this.handleSearch.bind(this)} />
          <SearchByHealth onChange={this.handleSearchByHealth.bind(this)} />
          <SearchByAttack onChange={this.handleSearchByAttack.bind(this)} />
          <SearchByDefence onChange={this.handleSearchByDefence.bind(this)} />
        </div>
        { <ul className="pokemons">{this.renderPokemon()}</ul>}
      </div>
    )
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
  getCurrentUser:(state) => dispatch(userActions.getCurrentUser(state)),
  getPokemons:() => dispatch(pageActions.getPokemons()),
  filterPokemons:(searchString)=> dispatch(pageActions.filterPokemons(searchString)),
  filterPokemonsByHealth:(searchString)=> dispatch(pageActions.filterPokemonsByHealth(searchString)),
  filterPokemonsByAttack:(searchString)=> dispatch(pageActions.filterPokemonsByAttack(searchString)),
  filterPokemonsByDefence:(searchString)=> dispatch(pageActions.filterPokemonsByDefence(searchString))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page)