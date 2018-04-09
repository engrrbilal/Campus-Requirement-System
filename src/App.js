import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup'
import {Router, Route, Switch,Redirect} from 'react-router-dom';
import {iconElementLeft,IconButton,TextField,Paper,FlatButton,RaisedButton,AppBar} from 'material-ui';
import firebase from 'firebase'
import history from './history';
import Student from './components/student';
import Company from './components/company';
import Admin from './components/Admin';

function PrivateRoute1({ component: Component, authed, ...rest }) {
  return (
      <Route
          {...rest}
          render={(props) => authed === true
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/' }} />}
      />
  )
}


function PrivateRoute2({ component: Component, authed, ...rest }) {
  return (
      <Route
          {...rest}
          render={(props) => authed === true
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/'}} />}
      />
  )
}


function PrivateRoute3({ component: Component, authed, ...rest }) {
  return (
      <Route
          {...rest}
          render={(props) => authed === true
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/'}} />}
      />
  )
}

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      authed: null
    }
  }
  componentWillMount() {
    let that = this
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            that.setState({
                authed: true
            })
            let type = localStorage.getItem("type")
            let convertype = JSON.parse(type)
            if (convertype !== null) {
                history.push(convertype)
            }
        }
        else {
            console.log(user)
            that.setState({
                authed: false,
            })
        }
    });
}
logOut =()=>{
  window.location.reload()
  history.push('/')
  localStorage.clear()
}
  render() {
    return (
      <div >
          <Router history={history}>
          <div>
          <AppBar
                title={"Campus Recuirement System"}
                iconElementLeft={<IconButton></IconButton>}
                iconElementRight={this.state.authed? <RaisedButton primary={true}
                label="Sign out" onClick={() => firebase.auth().signOut().then(this.logOut())} 
                />:<FlatButton label="Login" onClick={() => history.push('/')}/>}
           />
            <switch>
              <Route exact path="/" component={Login}/>
              <Route path="/signup" component={Signup} />
              <PrivateRoute1 authed={this.state.authed} path="/admin" component={Admin}/>
              <PrivateRoute2 authed={this.state.authed} path="/student" component={Student} />
              <PrivateRoute3 authed={this.state.authed} path="/company" component={Company} />
            </switch>
        </div>
      </Router>
      </div>
    );
  }
}
export default App;
