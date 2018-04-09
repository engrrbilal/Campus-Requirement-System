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
      studentUid:'',
      fullName:"",
      email:"",
      password:"", 
      error: '',
      gender:'Male',
      value:'Student',
      open: false,
      companyContactNo:'',
      companyAddress:'',
      educationValue:'Bachelor',
      experienceValue:'LessThanYear',
      studentGrade:'A',
      majorValue:'Programing',
      studentContactNo:'',
    }
  }
  SignupHandler(){
    console.log("creating account ...");
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
            educationValue:this.state.educationValue,
            companyContactNo:this.state.companyContactNo,
            companyAddress:this.state.companyAddress,
            experienceValue:this.state.experienceValue,
            studentGrade:this.state.studentGrade,
            majorValue:this.state.majorValue,
            studentContactNo:this.state.studentContactNo,
            createdAt:createdAt
          })
          this.setState({open: false});
          setTimeout(() => {
            this.setState({
            loading: false,
            error:"Auth error"
          })
        }, 3000)
        setTimeout(() => {
        if(this.state.value === "Company"){
          history.push("/company")
        }
        else if(this.state.value === "Student"){
          history.push("/student")
        }
      }, 2000)
      }
  }
  handleOpen = () => {
    if(this.state.fullName){
    this.setState({open: true});
    }
  };

  handleClose = () => {
    this.setState({open: false});
  };
  renderButton(){
  if (this.state.loading) {
      return <Spinner/>;
  }
  return (
    <RaisedButton  label="Create Account" primary={true}
     onClick={this.handleOpen} />
  );
}
handleChange = (event, index, value) => this.setState({
  value:value
});
  render(){
    const actions = [
      <FlatButton
        label="back"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        type="submit" 
        primary={true}
        onClick={this.SignupHandler}
      />,
    ];
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
              required
              style={styles.radioButton}
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
       <div>
        <Dialog
          title={<p style={{textAlign:"center"}}>Details</p>}
          actions={actions}
          contentStyle={styles.customContentStyle}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
         {
            this.state.value==='Company'?
            <div>
              <TextValidator
              value={this.state.companyAddress}
              hintText="Address:"
              name="contact"
              underlineShow={false} fullWidth={false}
              type="string"
              validators={['required']}
              errorMessages={['this field is required']}
              onChange={ev => this.setState({companyAddress:ev.target.value})}
            /><br/>
              <TextValidator
              value={this.state.companyContactNo}
              hintText="Contact No:"
              name="contact"
              underlineShow={false} fullWidth={false}
              type="number"
              validators={['required']}
              errorMessages={['this field is required']}
              onChange={ev => this.setState({companyContactNo:ev.target.value})}
            />
          </div>
          :
          <div>
            <SelectField floatingLabelText="Education"
              style={{marginLeft:40}}
              value={this.state.educationValue}
              onChange={(event, index, value) => this.setState({
                educationValue:value
              })}
              // style={styles.customWidth}
              autoWidth={false}
            >
            <MenuItem value='PHD' primaryText="PHD" />
            <MenuItem value='Master' primaryText="Master" />
            <MenuItem value='Bachelor' primaryText="Bachelor" />
            <MenuItem value='Inter' primaryText="inter" />
            <MenuItem value='Matric' primaryText="Matric" />
            <MenuItem value='Null' primaryText="Null" />
            </SelectField>
            <br />
            <SelectField floatingLabelText="Experience"
            style={{marginLeft:40}}
            value={this.state.experienceValue}
            onChange={(event, index, value) => this.setState({
              experienceValue:value
            })}
            // style={styles.customWidth}
            autoWidth={false}
          >
            <MenuItem value='fresh' primaryText="Fresh" />
            <MenuItem value='LessThanYear' primaryText="< 1year" />
            <MenuItem value='One Year' primaryText="1 Year" />
            <MenuItem value='Two year' primaryText="2 Year" />
            <MenuItem value='Three Year' primaryText="3 Year" />
            <MenuItem value='MoreThanThree' primaryText="3 Year >" />
          </SelectField><br/>
          <SelectField floatingLabelText="Grade"
                style={{marginLeft:40}}
                value={this.state.studentGrade}
                onChange={(event, index, value) => this.setState({
                  studentGrade:value
                })}
                // style={styles.customWidth}
                autoWidth={false}
              >
              <MenuItem value='A+' primaryText="A+" />
              <MenuItem value='A' primaryText="A" />
              <MenuItem value='B' primaryText="B" />
              <MenuItem value='C' primaryText="C" />
              <MenuItem value='D' primaryText="D" />
              <MenuItem value='Not interested' primaryText="Not interested" />
            </SelectField>
            <br/>
            <SelectField floatingLabelText="Major In"
                style={{marginLeft:40}}
                value={this.state.majorValue}
                onChange={(event, index, value) => this.setState({
                  majorValue:value
                })}
                // style={styles.customWidth}
                autoWidth={false}
              >
              <MenuItem value='Programing' primaryText="Programing" />
              <MenuItem value='Mathmatics' primaryText="Mathmatics" />
              <MenuItem value='Networking' primaryText="Networking" />
              <MenuItem value='Other' primaryText="Other" />
            </SelectField>
            <Paper style={styles.styleOthers}>
            <TextValidator
              value={this.state.studentContactNo}
              hintText="Contact No:"
              name="contact"
              underlineShow={false} fullWidth={false}
              type="number"
              validators={['required']}
              errorMessages={['this field is required']}
              onChange={ev => this.setState({studentContactNo:ev.target.value})}
            />
          </Paper>
        </div>
        
      }
      </Dialog>
    </div>
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
