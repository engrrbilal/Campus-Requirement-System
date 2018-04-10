import React from 'react';
import * as firebase from 'firebase';
import dataReducer from '../reducers/dataReducer'
import {getStudentsData,startJobPost,getCompanyJobsData,startDeleteJob,getJobsData} from '../actions/dataActions'
import {connect} from 'react-redux'
import '../App.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import {Dialog,paper,RaisedButton,FlatButton,Divider,AppBar,IconButton} from 'material-ui'

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import { colors } from 'material-ui/styles';
import { red100 ,indigo500} from 'material-ui/styles/colors';

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
      customContentStyle : {
        width: 450,
        maxWidth: 'none',
      }
  };
  const optionsStyle = {
    maxWidth: 255,
    marginLeft:'30px'
  };
class Company extends React.Component{
    constructor(props){
        super(props);
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() +1);
          console.log("maxdate",maxDate)
        this.state = {
            slideIndex: 0,
            open:false,
            open2:false,
            displayName:'',
            position:'Junior Developer',
            salary:'Between 20000 and 30000',
            educationValue:'Bachelor',
            experienceValue:'LessThanYear',
            job:"",
            maxDate: maxDate,
            autoOk: false,
          };
          // console.log(this.state.maxDate)
        }
        componentWillMount(props){
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                  displayName:user.displayName
                })
            }
        });
          {this.props.getCompanyJobsData({
            job:"from company job data"
          })}
          {this.props.getJobsData({
            job:"From Student retrieve jobs Dispatch"
        })}
          {this.props.getStudentsData({
            comp:"From Company Dispatch"
          })}
          console.log(this.props)
        }
        componentDidMount(){
          localStorage.setItem("type", JSON.stringify("/company"))
        }
        jobPosting = () =>{
          let lastDate=this.state.maxDate
          let Day = lastDate.getDate();
          let Month = lastDate.getMonth();
          let Year = lastDate.getFullYear();
            this.props.startJobPost({
              displayName:this.state.displayName,
              position:this.state.position,
              salary:this.state.salary,
              educationValue:this.state.educationValue,
              experienceValue:this.state.experienceValue,
              Day:Day,
              Month:Month,
              Year:Year
            })
            this.setState({
              open:false
            })
        }
        handleChange = (value) => {
          this.setState({
            slideIndex: value,
          });
        };
        handleChangeMaxDate = (event, date) => {
            this.setState({
              maxDate: date
            });
          }
          handleOpen = () => {
            this.setState({open: true});
          };
        
          handleClose = () => {
            this.setState({open: false});
          };
          handleCloseJob = () => {
            this.setState({open2: false});
          };
          jobData(position){
              return(
                console.log("jobs",position)
              )
              
          }
          studentApplyData(){
            this.props.jobs
          }
          sendJob(job){
            console.log(job)
            this.setState({
                job: job,
                open2:true
            })
          }
          deleteJob = () =>{
            this.props.allJobs.map((job,index)=>{
              console.log("job : ",job)
              console.log("companyUid : ",job.uid)
              console.log("jobPushKey : ",job.dataPushKey)
              if(job.position===this.state.job.position){
            console.log("companyUid : ",job.uid)
            console.log("jobPushKey : ",job.dataPushKey)
                  this.setState({
                    companyUid:job.uid,
                    jobPushKey:job.dataPushKey,
                    open2:false
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
        
    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Job Post"
              primary={true}
              keyboardFocused={true}
              onClick={this.jobPosting}
            />,
          ];
          const actions2 = [
            <FlatButton
              label="Ok"
              primary={true}
              onClick={this.handleClose}
            />,
          ];
          const actions3 = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleCloseJob}
            />,
            <FlatButton
              label="Delete"
              secondary={true}
              onClick={this.deleteJob}
            />,
          ];
        return (
            <div>
              <div style={{height:"40px",color:"blue",backgroundColor:"lightBlue",marginTop:"-24px"}}>
                <center>
                  <p style={{fontSize:"24px"}}>{`Welcome ${this.state.displayName}`}</p>
                </center>
              </div>
                <div className="companyBackground" style={{width:"100%",maxHeight:"100%",minHeight:"860px"}}>
                    <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    >
                    <Tab label="Jobs" value={0} />
                    <Tab label="Students List" value={1} />
                    </Tabs>
                    <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    >
                    <div style={styles.slide}>
                    <RaisedButton label="Create Job" primary={true} style={{marginLeft:15}} onClick={()=>this.handleOpen()} />
                        <Dialog
                            title={<p style={{textAlign:"center"}}>Create</p>}
                            contentStyle={styles.customContentStyle}
                            actions={actions}
                            modal={true}
                            open={this.state.open}                  
                        >
                        <h2 style={styles.headline}>New Job</h2>
                        <SelectField floatingLabelText="Education"
                            value={this.state.position}
                            onChange={(event, index, value) => this.setState({
                            position:value
                            })}
                            style={styles.customWidth}
                            autoWidth={false}
                        >
                        <h3 style={{alignItems:"center"}}></h3>
                        <MenuItem value='Junior Developer' primaryText="Junior Developer" />
                        <MenuItem value='Senior Developer' primaryText="Senior Developer" />
                        <MenuItem value='Manager' primaryText="Manager" />
                        <MenuItem value='Intern' primaryText="Intern" />
                        <MenuItem value='Accountant' primaryText="Accountant" />
                        </SelectField><br/>
                        <SelectField floatingLabelText="Experience"
                            value={this.state.salary}
                            onChange={(event, index, value) => this.setState({
                            salary:value
                            })}
                            style={styles.customWidth}
                            autoWidth={false}
                        >
                        <h3 style={{alignItems:"center"}}></h3>
                        <MenuItem value='up to 20000' primaryText="up to 20000" />
                        <MenuItem value='Between 20000 and 30000' primaryText="Between 20000 and 30000" />
                        <MenuItem value='Between 30000 and 50000' primaryText="Between 30000 and 50000" />
                        <MenuItem value='Between 50000 and 100000' primaryText="Between 50000 and 100000" />
                        <MenuItem value='More than 100000' primaryText="More than 100000" />
                        </SelectField><br/>
                        <SelectField floatingLabelText="Education"
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
                        <MenuItem value='<Matric' primaryText="<Matric" />
                        </SelectField>
                        <br />
                        <SelectField floatingLabelText="Experience"
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
                        <DatePicker
                            onChange={this.handleChangeMaxDate}
                            autoOk={this.state.autoOk}
                            floatingLabelText="Max Date"
                            defaultDate={this.state.maxDate}
                            disableYearSelection={this.state.disableYearSelection}
                        />
                        </Dialog>
                        <div>
                        <Subheader>Previous Jobs Posted</Subheader>
                        {this.props.jobs?Object.keys(this.props.jobs).map((job,index)=>{
                          // console.log(this.props.jobs[job])
                            let studentUid = this.props.jobs[job].jobApplied
                            return (
                                <div>
                                  <List>
                                      <ListItem key={index}
                                          primaryText={this.props.jobs[job].position} 
                                          nestedItems={[
                                              <ListItem key={this.props.jobs[job].salary}
                                                primaryText={`Salary:${this.props.jobs[job].salary}`}
                                                disabled={true}
                                              />,
                                              <ListItem key={this.props.jobs[job].maxDate}
                                                primaryText={`Last date to Apply:${this.props.jobs[job].Day}/${this.props.jobs[job].Month +1}/${this.props.jobs[job].Year}`}
                                                open={this.state.open}
                                              />,
                                              <div style={{marginLeft:20}}>
                                                {
                                                  studentUid?
                                                  Object.keys(studentUid).map((apply,index)=>{
                                                    const { educationValue: educationValue = 'No data available',
                                                      experienceValue: experienceValue = 'No data available',
                                                      studentGrade:studentGrade = 'No data available',
                                                      majorValue:majorValue = 'No data available',
                                                      studentContactNo:studentContactNo = 'No data available',
                                                    } = studentUid[apply]
                                                    if(apply){
                                                      return(
                                                        <ListItem key={index}
                                                          primaryText={`Student Apply :${studentUid[apply].fullName}`}
                                                          nestedItems={[
                                                            <ListItem
                                                              primaryText={`Education:${educationValue}`}
                                                              disabled={true}
                                                            />,
                                                            <ListItem
                                                              primaryText={`Experience:${experienceValue}`}
                                                              disabled={true}
                                                            />,
                                                            <ListItem
                                                              primaryText={`Major In:${majorValue}`}
                                                              disabled={true}
                                                            />,
                                                            <ListItem
                                                              primaryText={`Grade:${studentGrade}`}
                                                              disabled={true}
                                                            />,
                                                            <ListItem 
                                                              primaryText={<a href={`mailto:${studentUid[apply].email}`} >{`Email:${studentUid[apply].email}`}</a>}
                                                              disabled={true}
                                                            />,
                                                            <ListItem 
                                                              primaryText={`Contact No:${studentContactNo}`}
                                                              disabled={true}
                                                            />,
                                                            
                                                          ]}
                                                          />
                                                      )
                                                    }
                                                  }):<p style={{marginLeft:20 ,color:"red"}}>No student apply till yet!</p>
                                                }
                                              </div>,
                                              <div>
                                                <RaisedButton label="Delete Job" secondary={true} style={{marginLeft:35}} onClick={this.sendJob.bind(this,this.props.jobs[job])}/>
                                                <Dialog
                                                  title="Delete Job"
                                                  actions={actions3}
                                                  modal={false}
                                                  open={this.state.open2}
                                                  onRequestClose={this.handleCloseJob}
                                                >
                                                  {
                                                    this.props.jobs.map((job,index)=>{
                                                      if(job === this.state.job){
                                                        // console.log(job)
                                                      return (<p style={{color:"red"}} key={index}>
                                                                 Are you sure ? you want to delete the {`${job.position}`} Job
                                                              </p>
                                                  )}
                                                  })}
                                              </Dialog>
                                              </div>
                                              
                                            ]}
                                      />
                                </List>
                                </div>
                            )
                        }):
                        <div>
                            <Divider></Divider>
                            <p style={{marginLeft:15 ,color:"red"}}>No Job posted till yet</p>
                        </div>
                      }
                     </div>
                    </div>
                    <div style={styles.slide}>
                    <div>
                    <List>
                        <Subheader>Students List</Subheader>
                        {this.props.students.map((student,index)=>{
                          const { educationValue: educationValue = 'No data available',
                          experienceValue: experienceValue = 'No data available',
                          studentGrade:studentGrade = 'No data available',
                          majorValue:majorValue = 'No data available',
                          studentContactNo:studentContactNo = 'No data available',
                        } = student;
                            return (
                                <ListItem 
                                   key={index}
                                    primaryText={student.fullName} 
                                    nestedItems={[
                                  
                                        <ListItem
                                          primaryText={`Education:${educationValue}`}
                                          disabled={true}
                                        />,
                                        <ListItem
                                          primaryText={`Experience:${experienceValue}`}
                                          
                                          open={this.state.open}
                                        />,
                                        <ListItem
                                          primaryText={`Grade:${studentGrade}`}
                                          disabled={true}
                                        />,
                                        <ListItem
                                          primaryText={`Major In:${majorValue}`}
                                          disabled={true}
                                        />,
                                        <ListItem
                                          primaryText={<a href={`mailto:${student.email}`} >{`Email:${student.email}`}</a>}
                                        />,
                                        <ListItem
                                          primaryText={`Contact No:${studentContactNo}`}
                                          disabled={true}
                                        />,
                                      ]}
                                />
                            )
                        })}
                        
                    </List>
                 </div>
                 <Divider></Divider>
                 <div>
                        <Subheader>Student Applied for jobs</Subheader>
                        {this.props.jobs?Object.keys(this.props.jobs).map((job,index)=>{
                            let studentUid = this.props.jobs[job].jobApplied
                            return (
                                <div>
                                    {
                                      studentUid?
                                      Object.keys(studentUid).map((apply,index)=>{
                                        if(apply){
                                          return(
                                            <ListItem key={studentUid[apply].fullName}
                                            primaryText={`Student Apply :${studentUid[apply].fullName}`} 
                                                  nestedItems={[
                                                    <ListItem key={index}
                                                    primaryText={`Job Position:${this.props.jobs[job].position}`}
                                                          disabled={true}
                                                        />,
                                                    ]}
                                                  />
                                          )
                                        }})
                                        :
                                        <p> </p>
                                    }
                                </div>
                            )
                        }):
                        <p style={{marginLeft:20 ,color:"red"}}>No Job posted till yet!</p>
                      }
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
        students: state.dataReducer.studentData,
        jobs:state.dataReducer.companyJobData,
        allJobs: state.dataReducer.jobData,
    }
  }
  const mapDispatchToProp = (dispatch) =>({
    getCompanyJobsData: (test1) => dispatch(getCompanyJobsData(test1)),
    getStudentsData: (test) => dispatch(getStudentsData(test)),
    startJobPost:(jobPost) => dispatch(startJobPost(jobPost)),
    getJobsData: (test) => dispatch(getJobsData(test)),
    startDeleteJob: (data) => dispatch(startDeleteJob(data)),
  })
  
  
export default connect(mapStateToProps,mapDispatchToProp)(Company)