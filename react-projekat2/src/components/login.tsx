import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBar from 'material-ui/AppBar';
import AppBar from '@material-ui/core/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux'
import * as userActions from '../redux/actions/user'


class Login extends Component<any,any> {

constructor(props)
{
  super(props);
  this.state={
    username:"",
    password:""
  }
}
/*
componentDidMount = () =>{
  this.props.getUsers();
}
*/
handleClick() {
  this.props.getCurrentUser(this.state);
  userActions.redirectToHome();
}

render() {
    return (
      <div className="form-popup">
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true}  onClick={(event) => this.handleClick()}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}


function mapStateToProps(state: any) {
  const { currentUser } = state.page;
  //console.log(state);

  return {
    currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
  //getUsers:() => dispatch(userActions.getUsers()),
  getCurrentUser:(state) => dispatch(userActions.getCurrentUser(state))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)