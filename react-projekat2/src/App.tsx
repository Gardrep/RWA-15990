import './App.css';
import React, { Component } from 'react';
import pokeball from './pokeball.png';
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import PokemonList from './components/pokemonList'
//import { PokemonListState } from './redux/reducers/pokemonList';
import { AppState } from './redux/reducers';
//import * as userActions from './redux/actions/user'


class App extends Component<any, any>{

  loadUser() {
    const { currentUser } = this.props;
    if (currentUser) {
      return (
        <div>Logged in as: {currentUser.username}</div>
      )
    }
    else {
      return (
        <div>Login</div>
      )
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar bg="light" expand="lg">
            <LinkContainer to="/home">
              <Navbar.Brand ><img src={pokeball} className="App-logo" alt="logo" /> Pokedex</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/pokemonList">
                  <Nav.Link >All pokemons</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/comparePokemons">
                  <Nav.Link >Compare</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav className="ml-auto">
                <LinkContainer to="/login">
                  <Nav.Link className="ml-auto">{this.loadUser()}</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/pokemonList" component={PokemonList} />
          {/*<Route path="/comparePokemons" component={ComparePokemons} />*/}

        </div>
      </BrowserRouter>
    );
  }
}


function mapStateToProps(state: AppState) {
  //console.log(state);
  const { currentUser } = state.pokemonList;
  return {
    currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //getCurrentUser: (state) => dispatch(userActions.getCurrentUser(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
