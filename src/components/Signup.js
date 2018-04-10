import React from 'react';
import * as firebase from 'firebase';
import '../App.css';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import {iconElementLeft,IconButton,Paper,FlatButton,RaisedButton,AppBar,Dialog} from 'material-ui';
import {DropDownMenu,SelectField} from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Spinner} from './Spinner';
import Login from './Login'
import { connect } from 'react-redux';
import { startSignUp} from '../actions/auth';
import history from '../history';

const styles = {
  style : {
    height: 500,
    width: 400,
    height: 500,
    width: 400,
    marginTop: "10%",
    marginLeft:"40%",
    textAlign: 'center',
    display: 'inline-block',
  },
  styleName:{
    marginTop: 50,
    marginLeft:40,
    marginRight: 40,
    marginBottom: 0
},
  styleOthers:{
    marginTop: 15,
    marginLeft:40,
    marginRight: 40,
    marginBottom: 0
},
  styleButton:{
    marginTop: 20
  },
  customWidth: {
    width: 350,
  },
  block: {
    maxWidth: 50
  },
  radioButton: {
    marginBottom: 16,
    display: 'inline-block',
    width: '120px'
    
  },
  customContentStyle : {
    width: 450,
    maxWidth: 'none',
  }
};
class Signup extends React.Component {
  constructor(props){
    super(props);
    this.SignupHandler = this.SignupHandler.bind(this);
    this.state ={
      fullName:"",
      email:"",
      password:"", 
      error: '',
      gender:'Male',
      value:'Student'
    }
  }
  SignupHandler(){
    console.log("creating account ...");
    console.log(this.state.fullName,this.state.email,this.state.password)
        if(this.state.fullName.trim()){
            this.setState({ error: ' ', loading: true});
            let date = new Date().toUTCString()
            let createdAt = date.toString("MMM dd")
            this.props.startSignUp({
            fullName:this.state.fullName,
            email:this.state.email,
            password:this.state.password,
            gender:this.state.gender,
            value:this.state.value,
            createdAt:createdAt
          })
          setTimeout(() => {
            this.setState({
            loading: false,
            error:"Auth error"
          })
          if(this.state.value === "Company"){
            history.push("/company")
          }
          else if(this.state.value === "Student"){
            history.push("/student")
          }
        }, 3000)
      }
  }
  renderButton(){
  if (this.state.loading) {
      return <Spinner/>;
  }
  return (
    <RaisedButton  label="Create Account" primary={true}
     onClick={this.SignupHandler} />
  );
}
handleChange = (event, index, value) => this.setState({
  value:value
});
  render(){
    return (
      <div className="signupBackground" style={{width:"100%",height:900}}>
        <Paper zDepth={3} style={styles.style}>
        <ValidatorForm onSubmit={(e)=> e.preventDefault()}>
          <Paper style={styles.styleName}>
            <TextValidator hintText="Name" 
            value={this.state.fullName}
            name="name"
            underlineShow={false} fullWidth={false}
            onChange={ev => this.setState({fullName: ev.target.value})}
            required
            errorMessages={['this field is required']}
            />
          </Paper>
          <Paper style={styles.styleOthers}>
            <TextValidator hintText="Email Address" 
            value={this.state.email}
            name="email"
            underlineShow={false} fullWidth={false}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            onChange={ev => this.setState({email: ev.target.value})}
            />
          </Paper>
          <Paper style={styles.styleOthers}>
            <TextValidator
              value={this.state.password}
              hintText="Password"
              name="pass"
              underlineShow={false} fullWidth={false}
              type="password"
              validators={['required']}
              errorMessages={['this field is required']}
              onChange={ev => this.setState({password:ev.target.value})}
            />
          </Paper>
          {
            this.state.value==='Company'?
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            style={styles.customWidth}
            autoWidth={false}
          >
          <MenuItem value='Student' primaryText="Student" />
          <MenuItem value='Company' primaryText="Company" />
        </DropDownMenu>:
          <div>
            <br />
            <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            style={styles.customWidth}
            autoWidth={false}
            >
            <MenuItem value='Student' primaryText="Student" />
            <MenuItem value='Company' primaryText="Company" />
          </DropDownMenu>
        
          <RadioButtonGroup  defaultSelected="Male">
            <RadioButton
              value="Male"
              label="Male"
              style={styles.radioButton}
              required
              onClick={changeEvent =>this.setState({
              gender: changeEvent.target.value
              })}
            />
            <RadioButton
              value="Female"
              label="Female"
              required
              style={styles.radioButton}
              onClick={changeEvent =>this.setState({
              gender: changeEvent.target.value
              })}
            />
          </RadioButtonGroup>
          </div>
          }
          <p style={{color:"red"}}>{this.state.error}</p>
          {this.renderButton()}
    </ValidatorForm>
      </Paper>
    </div>
    );
 }
}

const mapDispatchToProp = (dispatch) =>({
  startSignUp: (userDetails) => dispatch(startSignUp(userDetails))
})

export default connect(undefined, mapDispatchToProp)(Signup);
