import React from 'react';
import * as firebase from 'firebase';
import dataReducer from '../reducers/dataReducer'
import {getJobsData,startJobApply,getCompaniesData,getStudentProfileData,startUpdateStudent} from '../actions/dataActions'
import {connect} from 'react-redux'
import '../App.css';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem,Toggle,Subheader, Dialog,Paper,RaisedButton,Divider,TextField,SelectField} from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {indigo500} from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  
// import Admin from './Admin';

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
    slide: {
      padding: 10,
    },
    style:{
        marginLeft: 20,
    }
  };

class Student extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            open2:false,
            studentUid:'',
            job:'',
            company:'',
            companyUid:'',
            jobPushKey:'',
            createdAt:'',
            slideIndex: 0,
            disabled:true,
            fullName:'',
            educationValue:'',
            experienceValue:'',
            majorValue:'',
            studentGrade:'',
            studentContactNo:'',
            update:false

        }
    }
    componentWillMount(){
        console.log(this.props.student.fullName)
       
       
        {this.props.getJobsData({
            stu:"From Student retrieve jobs Dispatch"
        })}
        
        {this.props.getCompaniesData({
            comp:"From Admin Dispatch"
          })}{this.props.getStudentProfileData({
            comp:"From Company Dispatch"
          })}

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ 
                    studentUid: user.uid
                 });
            } else {
                this.setState({ studentUid:''});
            }
        });
        setTimeout(()=>{ this.setState({
   
            fullName: this.props.student.fullName,
            educationValue: this.props.student.educationValue,
            experienceValue: this.props.student.experienceValue,
            majorValue: this.props.student.majorValue,
            studentGrade: this.props.student.studentGrade,
            studentContactNo: this.props.student.studentContactNo
          })},3000)
          localStorage.setItem("type", JSON.stringify("/student"))
    }

    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };
      handleClose = () => {
        this.setState({open:false,open2: false});
      };
     handleToggle = () => {
        this.setState({
          open: !this.state.open,
        });
      };
      handleNestedListToggle = (item) => {
        this.setState({
          open: item.state.open,
        });
      };
            sendJob(job){
            this.setState({
                job: job,
                open:true,
            })
         }
         sendCompany(company){
            this.setState({
                company: company,
                open2:true
            })
          }
      jobApply = (props)=>{
          this.props.jobs.map((job,index)=>{
              if(job===this.state.job){
            console.log("companyUid : ",job.uid)
            console.log("jobPushKey : ",job.dataPushKey)
                  this.setState({
                    companyUid:job.uid,
                    jobPushKey:job.dataPushKey,
                    createdAt:job.createdAt,
                    open:false,
                  })
                  console.log("companyUid : ",this.state.companyUid)
                  setTimeout(() => {
                    if(this.state.companyUid){
                        this.applyDispatch()
                    }
                }, 500)
                  
                }
            })      
      }
      applyDispatch(){
        this.props.startJobApply({
            companyUid:this.state.companyUid,
            jobPushKey:this.state.jobPushKey,
            studentUid:this.state.studentUid,
            createdAt:this.state.createdAt
        })
      }
      editProfile = ()=>{
          this.setState({
            disabled:false,
            update:true,
          })
   
      }
      updateProfile = ()=>{
           this.applyUpdateDispatch()
    }
    applyUpdateDispatch(){
        this.props.startUpdateStudent({
            id:this.state.studentUid,
            fullName:this.state.fullName,
            educationValue:this.state.educationValue,
            experienceValue:this.state.experienceValue,
            majorValue:this.state.majorValue,
            studentGrade:this.state.studentGrade,
            studentContactNo:this.state.studentContactNo,
        })
      }
    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Apply"
              primary={true}
              onClick={() =>this.jobApply()}
            />,
          ];
          const actions2 = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Ok"
              primary={true}
              onClick={this.handleClose}
            />,
          ];
        return (
            <div className="studentBackground" style={{width:"100%",height:900}}>
            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    >
                    <Tab label="Jobs Posted" value={0} />
                    <Tab label="Companies" value={1} />
                    <Tab label="Profile" value={2} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                    <List>
                        <Subheader>Jobs Posted</Subheader>
                        {(this.props.jobs)?this.props.jobs.map((job,index)=>{
                            
                            return (
                                    <ListItem key={index}
                                        primaryText={job.position}
                                        rightIcon={<ActionInfo onClick={this.sendJob.bind(this,job)}  color={indigo500}/>}
                                    />
                            )
                        }):
                        <h1>No job posted till yet</h1>
                    }
                        
                    </List>
                    <Dialog
                        title="Job Details"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        {this.props.jobs.map((job,index)=>{
                            if(job === this.state.job){
                            return (<div key={index}>
                                <p>{`Company: ${job.displayName}`}</p>
                                <p>{`Position: ${job.position}`}</p>
                                <p>{`Salary: ${job.salary}`}</p>
                                <p>{`Education Required: ${job.educationValue}`}</p>
                                <p>{`Experience Required: ${job.experienceValue}`}</p>
                                <p>{`Last Date to apply: ${job.Day}/${job.Month +1}/${job.Year}`}</p>
                                </div>
                        )}})}
                    </Dialog>
                 </div>
                 <div>
                        <List>
                            <Subheader>Companies List</Subheader>
                            {(this.props.companies)?this.props.companies.map((company,index)=>{
                                if(company.fullName !== "Admin"){
                                    
                                }
                                return (
                                   <ListItem key={index}
                                        primaryText={company.fullName}
                                        rightIcon={<ActionInfo onClick={this.sendCompany.bind(this,company)} color={indigo500}/>}
                                  />
                                )
                            }):
                            <h1>No Company Registered</h1>
                        }
                        </List>
                        <Dialog
                            title="Company Details"
                            actions={actions2}
                            modal={false}
                            open={this.state.open2}
                            onRequestClose={(this.handleClose)}
                        >
                            {this.props.companies.map((company,index)=>{
                                if(company === this.state.company){
                                return (<div key={index}>
                                        <p>{`Name: ${company.fullName}`}</p>
                                        <p>{`Email: ${company.email}`}</p>
                                        <p>{`Contact No: ${company.companyContactNo}`}</p>
                                        <p>{`Address: ${company.companyAddress}`}</p>
                                    </div>
                            )}})}
                        </Dialog>
                   </div>
                    <div>
                    <Card>
                        <CardHeader
                        title={<p style={{textAlign:"center"}}>Your profile</p>}
                        style={{align:"center"}}
                        />
                        <div>
                            <TextField floatingLabelText="Full Name" value={this.state.fullName}  style={styles.style} underlineShow={false}
                                disabled={this.state.disabled} onChange={(e)=>this.setState({fullName:e.target.value})}/>
                                <Divider />
                                        <SelectField floatingLabelText="Education"
                                            value={this.state.educationValue}
                                            style={styles.style}
                                            disabled={this.state.disabled}
                                            onChange={(event, index, value) => this.setState({
                                            educationValue:value
                                                
                                            })}
                                            >
                                            <MenuItem value='PHD' primaryText="PHD" />
                                            <MenuItem value='Master' primaryText="Master" />
                                            <MenuItem value='Bachelor' primaryText="Bachelor" />
                                            <MenuItem value='Inter' primaryText="inter" />
                                            <MenuItem value='Matric' primaryText="Matric" />
                                            </SelectField>
                                            <br />
                                <Divider />
                                <SelectField floatingLabelText="Experience"
                                            disabled={this.state.disabled}
                                            value={this.state.experienceValue}
                                            style={styles.style}
                                            onChange={(event, index, value) => this.setState({
                                            experienceValue:value
                                            
                                            })}
                                            autoWidth={false}
                                        >
                                            <MenuItem value='LessThanYear' primaryText="< 1year" />
                                            <MenuItem value='One Year' primaryText="1 Year" />
                                            <MenuItem value='Two year' primaryText="2 Year" />
                                            <MenuItem value='Three Year' primaryText="3 Year" />
                                            <MenuItem value='MoreThanThree' primaryText="3 Year >" />
                                        </SelectField><br/>
                                        <Divider />
                                <SelectField floatingLabelText="Major In"
                                            disabled={this.state.disabled}
                                            style={styles.style}
                                            value={this.state.majorValue}
                                            onChange={(event, index, value) => this.setState({
                                            majorValue:value
                                            })}
                                            autoWidth={false}
                                        >
                                        <MenuItem value='Programing' primaryText="Programing" />
                                        <MenuItem value='Mathmatics' primaryText="Mathmatics" />
                                        <MenuItem value='Networking' primaryText="Networking" />
                                        <MenuItem value='Other' primaryText="Other" />
                                        </SelectField>
                                        <Divider />
                                <SelectField floatingLabelText="Grade"
                                            value={this.state.studentGrade}
                                            disabled={this.state.disabled}
                                            style={styles.style}
                                            onChange={(event, index, value) => this.setState({
                                            studentGrade:value
                                            })}
                                            autoWidth={false}
                                        >
                                        <h3 style={{alignItems:"center"}}>Grade</h3>
                                        <MenuItem value='A+' primaryText="A+" />
                                        <MenuItem value='A' primaryText="A" />
                                        <MenuItem value='B' primaryText="B" />
                                        <MenuItem value='C' primaryText="C" />
                                </SelectField>
                                <Divider></Divider>
                                        <TextField floatingLabelText="Contact No" value={this.state.studentContactNo} style={styles.style} underlineShow={false}
                                         disabled={this.state.disabled} onChange={(e)=>this.setState({studentContactNo:e.target.value})}/>
                                        <Divider></Divider>
                                        {(this.state.update)?
                                            <RaisedButton label="Update" primary={true} onClick={this.updateProfile} 
                                             style={{height:"50",fontWeight:"bold"}} labelStyle={{fontSize:'24px'}} fullWidth={true}/>:
                                            <RaisedButton label="Edit" primary={true} onClick={this.editProfile} fullWidth={true}
                                             style={{height:"50",fontSize:'30%'}}
                                             labelStyle={{fontSize:'24px'}}
                                             />
                                        }
                                </div>
                    </Card>
                    </div>
                </SwipeableViews>
      </div>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        jobs: state.dataReducer.jobData,
        companies: state.dataReducer.companyData,
        students: state.dataReducer.studentData,
        student: state.dataReducer.studentProfile,
    }   
  }
  const mapDispatchToProp = (dispatch) =>({
    getJobsData: (test) => dispatch(getJobsData(test)),
    startJobApply:(jobData) => dispatch(startJobApply(jobData)),
    getCompaniesData:(jobData) => dispatch(getCompaniesData(jobData)),
    getStudentProfileData: (test) => dispatch(getStudentProfileData(test)),
    startUpdateStudent: (test) => dispatch(startUpdateStudent(test)),
  })
export default connect(mapStateToProps,mapDispatchToProp)(Student)