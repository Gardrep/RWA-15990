import React, { Component } from 'react';
import pokeball from './pokeball.png';
import './App.css';
import Page from './components/page'
import { Navbar, Nav} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import { connect } from 'react-redux'
import * as userActions from './redux/actions/user'


class App extends Component<any,any>{ 

  loadUser()
  {
    const { currentUser } = this.props;
    if(currentUser){
      return(
        <div>Logged in as: {currentUser.username}</div>
      )
    }
    else{
      return(
        <div>Login</div>
      )
    }
  }

  render(){
      return(
      <BrowserRouter>
        <div className="App">
          <Navbar bg="light" expand="lg">
            <LinkContainer to="/home">
            <Navbar.Brand ><img src={pokeball} className="App-logo" alt="logo" /> Pokedex</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/page">
                <Nav.Link >All pokemons</Nav.Link>
                </LinkContainer>
                {/*
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                */}

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
            <Route path="/page" component={Page} />

        </div>
      </BrowserRouter>
    );
  }
}


function mapStateToProps(state: any) {
  const { currentUser } = state.page;
  return {
    currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
  getCurrentUser:(state) => dispatch(userActions.getCurrentUser(state))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
