import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux'
import * as userActions from '../redux/actions/user'
import { AppState } from '../redux/reducers';

class Login extends Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  handleClickLogin() {
    this.props.clearCurrentUser();
    this.props.getCurrentUser(this.state);
    console.log("nesto");
  }

  handleClickLogout() {
    this.props.clearCurrentUser();
  }

  render() {
    return (
      <div className="form-popup">
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <LinkContainer onClick={(event) => this.handleClickLogin()} to="/home">
              <RaisedButton label="Submit" primary={true} />
            </LinkContainer>

            <LinkContainer onClick={(event) => this.handleClickLogout()} to="/home">
              <RaisedButton label="Logout" className="span_user" primary={true} />
            </LinkContainer>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  const { currentUser } = state.pokemonList;
  return {
    currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: (state) => dispatch(userActions.getCurrentUser(state)),
    clearCurrentUser: () => dispatch(userActions.clearCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)