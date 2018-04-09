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

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      authed: false
    }
  }
  componentWillMount() {
    let that = this
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            that.setState({
                authed: true
            })
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
              <Route path="/admin" component={Admin}/>
              <Route path="/student" component={Student} />
              <Route path="/company" component={Company} />
            </switch>
        </div>
      </Router>
      </div>
    );
  }
}
export default App;
