import React from 'react';
import * as firebase from 'firebase';
import dataReducer from '../reducers/dataReducer'
import {getStudentsData,getJobsData,getCompaniesData,startDeleteCompany,startDeleteJob,startDeleteStudent} from '../actions/dataActions'
import {connect} from 'react-redux'
import '../App.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import {Dialog,paper,RaisedButton,FlatButton} from 'material-ui'

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader'

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
    customWidth: {
        width: 350,
      },
  };
  const optionsStyle = {
    maxWidth: 255,
    marginLeft:'30px'
  };

class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideIndex: 0,
            open:false,
            open2:false,
            autoOk: false,
            job:'',
            company:'',
            displayName:'',
            companyUid:'',
            jobPushKey:'',
            student:'',
            studentUid:'',
            open3:false
          };
    }
    componentWillMount(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({
              displayName:user.displayName
            })
        }
    });
        {this.props.getCompaniesData({
          comp:"From Admin Dispatch"
        })}
        {this.props.getJobsData({
            job:"From Student retrieve jobs Dispatch"
        })}
        {this.props.getStudentsData({
          stu:"From Company Dispatch"
        })}
      } 
      componentDidMount(){
        localStorage.setItem("type", JSON.stringify("/admin"))
      }
      handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };
        handleOpen = () => {
          this.setState({open: true});
        };
      
        handleClose = () => {
          this.setState({open: false});
        };
        handleCloseCompany = () => {
          this.setState({open2: false});
        };
        handleCloseStudent = () => {
          this.setState({open3: false});
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
              open:true
          })
        }
      sendCompany(company){
        this.setState({
            company: company,
            open2:true
        })
      }
      sendStudent(student){
        this.setState({
            student: student,
            open3:true
        })
      }
      deleteCompany = () =>{
        console.log("delete company ....... ")
        this.props.companies.map((company)=>{
          if(company===this.state.company){
            console.log("companyUid : ",company.id)
              this.setState({
                companyUid:company.id,
                open2:false
              })
              setTimeout(() => {
                if(this.state.companyUid){
                    this.applyDispatch()
                }
            }, 500)
            }
        })      
      }
      applyDispatch(){
        this.props.startDeleteCompany({
            companyUid:this.state.companyUid,
        })
      }
      deleteJob = () =>{
        this.props.jobs.map((job,index)=>{
          // console.log(job.uid)
          if(job===this.state.job){
        console.log("companyUid : ",job.uid)
        console.log("jobPushKey : ",job.dataPushKey)
              this.setState({
                companyUid:job.uid,
                jobPushKey:job.dataPushKey,
                open:false
              })
              setTimeout(() => {
                if(this.state.companyUid){
                    this.applyDispatchJob()
                }
            }, 500)  
            }
        })      
    }
    applyDispatchJob(){
      this.props.startDeleteJob({
          companyUid:this.state.companyUid,
          jobPushKey:this.state.jobPushKey,
      })
    }
    deleteStudent = () =>{
      this.props.students.map((student,index)=>{
        if(student===this.state.student){
          console.log(student.id)
            this.setState({
              studentUid:student.id,
              open3:false
            })
            setTimeout(() => {
              if(this.state.studentUid){
                  this.applyDispatchStudent()
              }
          }, 500)
            
          }
      })      
  }
  applyDispatchStudent(){
    this.props.startDeleteStudent({
      studentUid:this.state.studentUid
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
              label="Delete"
              primary={true}
              onClick={this.deleteJob}
            />,
          ];
          const actions2 = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleCloseCompany}
            />,
            <FlatButton
              label="Delete"
              primary={true}
              onClick={this.deleteCompany}
            />,
          ];
          const actions3 = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleCloseStudent}
            />,
            <FlatButton
              label="Delete"
              primary={true}
              onClick={this.deleteStudent}
            />,
          ];
        return (
            <div className="adminBackground" style={{width:"100%",height:900}}>
            <div style={{height:"40px",color:"blue",backgroundColor:"lightBlue",marginTop:"-24px"}}>
                <center>
                  <p style={{fontSize:"24px"}}>{`Welcome ${this.state.displayName}`}</p>
                </center>
              </div>
                <div>
                    <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    >
                    <Tab label="Companies" value={0} />
                    <Tab label="Jobs" value={1} />
                    <Tab label="Students List" value={2} />
                    </Tabs>
                    <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    >
                    <div>
                        <List>
                            <Subheader>Companies Registered</Subheader>
                            {(this.props.companies)?this.props.companies.map((company,index)=>{
                                
                                return (
                                   <ListItem key={index}
                                        primaryText={company.fullName}
                                        rightIcon={<ActionInfo onClick={this.sendCompany.bind(this,company)}/>}
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
                            onRequestClose={(this.handleCloseCompany)}
                        >
                            {this.props.companies.map((company,index)=>{
                                if(company === this.state.company){
                                  let createdDate = company.createdAt
                                  let createdAt = createdDate.toString("MMM dd")
                                  console.log(createdAt)
                                return (<div>
                                    <p>{`Name: ${company.fullName}`}</p>
                                    <p>{`Email: ${company.email}`}</p>
                                    {/* <p>{`Contact No: ${company.companyContactNo}`}</p>
                                    <p>{`Address: ${company.companyAddress}`}</p> */}
                                    <p>{`Registerd At: ${createdAt}`}</p>
                                    </div>
                            )}})}
                        </Dialog>
                   </div>
                    <div style={styles.slide}>
                      <div>
                        <List>
                            <Subheader>Jobs Posted</Subheader>
                            {(this.props.jobs)?this.props.jobs.map((job,index)=>{
                                // console.log(job)
                                return (
                                      <ListItem key={index}
                                          primaryText={job.position}
                                          rightIcon={<ActionInfo onClick={this.sendJob.bind(this,job)}/>}
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
                                return (<div>
                                    <p>{`Company: ${job.displayName}`}</p>
                                    <p>{`Position: ${job.position}`}</p>
                                    <p>{`Salary: ${job.salary}`}</p>
                                    <p>{`Last Date to apply: ${job.Day}/${job.Month +1}/${job.Year}`}</p>
                                    </div>
                            )}})}
                        </Dialog>
                   </div>
                </div>
                    <div style={styles.slide}>
                    <div>
                      <List>
                          <Subheader>Students List</Subheader>
                          {this.props.students.map((student,index)=>{
                              return (
                                  <div>
                                  <ListItem key={index}
                                      primaryText={student.fullName}
                                      rightIcon={<ActionInfo onClick={this.sendStudent.bind(this,student)}/>}
                                    />  
                                </div>
                              )
                            })
                          }
                          <Dialog
                            title="Student Details"
                            actions={actions3}
                            modal={false}
                            open={this.state.open3}
                            onRequestClose={(this.handleCloseStudent)}
                        >
                            {this.props.students.map((student,index)=>{
                                if(student === this.state.student){
                                return (<div>
                                    <p>{`Name: ${student.fullName}`}</p>
                                    <p>{`Education:${student.educationValue="No data available"}`}</p>
                                    <p>{`Experience:${student.experienceValue="No data available"}`}</p>
                                    <p>{`Grade:${student.studentGrade="No data available"}`}</p>
                                    <p>{`Major In:${student.majorValue="No data available"}`}</p>
                                    <p>{`Email: ${student.email="No data available"}`}</p>
                                    <p>{`Contact No: ${student.studentContactNo="No data available"}`}</p>
                                    <p>{`CreatedAt: ${student.createdAt="No data available"}`}</p>
                                    </div>
                            )}})}
                        </Dialog>
                      </List>
                      </div>
                </div>
                </SwipeableViews>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        companies: state.dataReducer.companyData,
        students: state.dataReducer.studentData,
        jobs: state.dataReducer.jobData,
    }   
  }
  const mapDispatchToProp = (dispatch) =>({
    getCompaniesData: (test) => dispatch(getCompaniesData(test)),
    getJobsData: (test) => dispatch(getJobsData(test)),
    getStudentsData: (test) => dispatch(getStudentsData(test)),
    startDeleteCompany: (data) => dispatch(startDeleteCompany(data)),
    startDeleteJob: (data) => dispatch(startDeleteJob(data)),
    startDeleteStudent: (data) => dispatch(startDeleteStudent(data)),
  })
export default connect(mapStateToProps,mapDispatchToProp)(Admin)