import React, { Component } from 'react';
import Pokemon from './pokemon'
import { connect } from 'react-redux'
import { LinkContainer} from 'react-router-bootstrap';
import * as userActions from '../redux/actions/user'
import * as pageActions from '../redux/actions/page'

class Home extends Component<any,any> {
  componentWillMount()
  {
    this.props.clearPokemons();
    var data = JSON.parse(localStorage.getItem('token'));
    if(data && !this.props.currentUser)
    this.props.getCurrentUser(data);
  }

  loadUser()
  {
    const { currentUser } = this.props;
    if(currentUser){
      if(this.props.pokemons){}
      else{this.props.getPokemonTeam(currentUser)}
      return(
        <div>
          <p >
          <span className="span_user">ID:{currentUser.id}</span>
          <span className="span_user">Username:{currentUser.username}</span>
          <span className="span_user">Password:{currentUser.password}</span>
          </p>
        </div>
      )
    }
    return null;
  }

  handleClick(IdStari) {
    this.props.setIdStariRequest(IdStari);
  }

  loadUserPokemons()
  {
    const {pokemons } = this.props;
    if(pokemons){
      return pokemons.map(pokemon => {
        return(
          <li className="pokemons__item" id={pokemon.id} key={pokemon.id}>
          <div>
            <Pokemon pokemon={pokemon} />
            <LinkContainer onClick={() => this.handleClick(pokemon.id)} to="/page">
                <button className="pokemon__change btn"  >Change</button>
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
        Welcome
        {this.loadUser()}
        <div>My Team:</div>
        <ul className="pokemons">{this.loadUserPokemons()}</ul>
      </div>
    );
  }
}


function mapStateToProps(state: any) {
  const { currentUser, pokemons, error } = state.page;
  //console.log(state.page)
  return {
    currentUser,
    pokemons,
    error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemons:() => dispatch(pageActions.getPokemons()),
    getCurrentUser:(state) => dispatch(userActions.getCurrentUser(state)),
    getPokemonTeam:(data) => dispatch(userActions.getPokemonTeam(data)),
    clearPokemons:() => dispatch(pageActions.clearPokemons()),
    //replacePokemonTeam:(user, IdStari, IdNovi) => dispatch(userActions.replacePokemonTeam(user, IdStari, IdNovi)),
    setIdStariRequest:(IdStari) => dispatch(userActions.setIdStariRequest(IdStari))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)