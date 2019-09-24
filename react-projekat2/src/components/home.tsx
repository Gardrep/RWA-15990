import React, { Component } from 'react';
import Pokemon from './pokemon'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import * as userActions from '../redux/actions/user'
import * as PokemonListActions from '../redux/actions/pokemonList'
import { AppState } from '../redux/reducers';

class Home extends Component<any, any> {
  componentWillMount() {
    this.props.clearPokemons();
    var data = JSON.parse(localStorage.getItem('token'));
    if (data && !this.props.currentUser)
      this.props.getCurrentUser(data);
  }

  loadUser() {
    const { currentUser } = this.props;
    if (currentUser) {
      if (!this.props.pokemons) this.props.getPokemonTeam(currentUser);
      return (
        <div>
          <h3 className="UserDisplay">{currentUser.username}'s team of three are</h3>
        </div>
      )
    }
    return null;
  }

  handleClick(IdStari) {
    this.props.setIdStariRequest(IdStari);
  }

  loadUserPokemons() {
    const { pokemons } = this.props;
    if (pokemons) {
      return pokemons.map(pokemon => {
        return (
          <li className="pokemons__item" id={pokemon.id} key={pokemon.id}>
            <div>
              <Pokemon pokemon={pokemon} isComparable={true} />
              <LinkContainer onClick={() => this.handleClick(pokemon.id)} to="/pokemonList">
                <button className="pokemon__change btn-sm btn-secondary">Change</button>
              </LinkContainer>
            </div>
          </li>
        )
      })
    }
    return null;
  }

  render() {
    return (
      <div className="form-popup">
        {this.loadUser()}
        <ul className="pokemons">{this.loadUserPokemons()}</ul>
      </div>
    );
  }
}


function mapStateToProps(state: AppState) {
  const { pokemons, error } = state.pokemonList;
  const { currentUser } = state.user;
  return {
    currentUser,
    pokemons,
    error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemons: () => dispatch(PokemonListActions.getPokemons()),
    getCurrentUser: (state) => dispatch(userActions.getCurrentUser(state)),
    getPokemonTeam: (data) => dispatch(userActions.getPokemonTeam(data)),
    clearPokemons: () => dispatch(PokemonListActions.clearPokemons()),
    setIdStariRequest: (IdStari) => dispatch(userActions.setIdStariRequest(IdStari))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)