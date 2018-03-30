import React from 'react';
import * as firebase from 'firebase';
import dataReducer from '../reducers/dataReducer'
import {getStudentsData,startJobPost,getCompanyJobsData} from '../actions/dataActions'
import {connect} from 'react-redux'

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import {Dialog,paper,RaisedButton,FlatButton,Divider} from 'material-ui'

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import { colors } from 'material-ui/styles';

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
    // marginRight: 'auto',
  };
class Company extends React.Component{
    constructor(props){
        super(props);
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setHours(0, 0, 0, 0);
        this.state = {
            slideIndex: 0,
            open:false,
            position:'Junior Developer',
            salary:'Between 20000 and 30000',
            maxDate: maxDate,
            autoOk: false,
          };
          
        }
        componentWillMount(){
          {this.props.getCompanyJobsData({
            job:"from company job data"
          })}
          {this.props.getStudentsData({
            comp:"From Company Dispatch"
          })}
          
        } 
        jobPosting(){
          if(this.state.position && this.state.salary){
            this.props.startJobPost({
              position:this.state.position,
              salary:this.state.salary,
              maxDate:this.state.maxDate,
              createdAt:Date.now()
            })
            this.setState({
              open:false
            })
          }else{
            alert("Please fill the neccesory fields")
          }
        }

        handleChange = (value) => {
          this.setState({
            slideIndex: value,
          });
        };
        handleChangeMaxDate = (event, date) => {
            this.setState({
              maxDate: date,
            });
          }
          handleOpen = () => {
            this.setState({open: true});
          };
        
          handleClose = () => {
            this.setState({open: false});
          };
          
          jobData(position){
              return(
                console.log("jobs",position)
              )
              
          }
          studentApplyData(){
            this.props.jobs
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
              onClick={this.jobPosting.bind(this)}
            />,
          ];
          const actions2 = [
            <FlatButton
              label="ok"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose}
            />,
            
          ];

        return (
            <div >
                <div>
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
                    <RaisedButton label="Create Job" onClick={()=>this.handleOpen()} />
                        <Dialog
                            title="Create"
                            actions={actions}
                            modal={true}
                            // contentStyle={customContentStyle}
                            open={this.state.open}                  
                        >
                        <h2 style={styles.headline}>New Job</h2>
                        <DropDownMenu
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
                        </DropDownMenu><br/>
                        <DropDownMenu
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
                        </DropDownMenu><br/>
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
                                                primaryText={`Last date to Apply:${this.props.jobs[job].maxDate}`}
                                                open={this.state.open}
                                              />,
                                              <div style={{marginLeft:20}}>
                                                {
                                                  studentUid?
                                                  Object.keys(studentUid).map((apply,index)=>{
                                                    if(apply){
                                                      return(
                                                        <ListItem key={studentUid[apply].fullName}
                                                          primaryText={`Student Apply :"${studentUid[apply].fullName}"`}
                                                          nestedItems={[
                                                            <ListItem key={studentUid[apply].educationValue}
                                                              primaryText={`Education:${studentUid[apply].educationValue}`}
                                                              disabled={true}
                                                            />,
                                                            <ListItem key={studentUid[apply].experienceValue}
                                                              primaryText={`Experience:${studentUid[apply].experienceValue}`}
                                                              disabled={true}
                                                            />,
                                                            <ListItem key={studentUid[apply].majorValue}
                                                              primaryText={`Major In:${studentUid[apply].majorValue}`}
                                                              disabled={true}
                                                            />,
                                                            <ListItem key={studentUid[apply].studentGrade}
                                                              primaryText={`Grade:${studentUid[apply].studentGrade}`}
                                                              disabled={true}
                                                            />,
                                                            <ListItem key={studentUid[apply].email}
                                                              primaryText={`Email:${studentUid[apply].email}`}
                                                              disabled={true}
                                                            />,
                                                            <ListItem key={studentUid[apply].studentContactNo}
                                                              primaryText={`Contact No:${studentUid[apply].studentContactNo}`}
                                                              disabled={true}
                                                            />,
                                                          ]}
                                                          />
                                                      )
                                                    }
                                                  }):<p style={{marginLeft:20 ,color:"red"}}>No student apply till yet!</p>
                                                }
                                              </div>
                                            ]}
                                      />
                                </List>
                                </div>
                            )
                        }):
                        <p style={{marginLeft:20 ,color:"red"}}>No Job posted till yet</p>
                      }
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
                                    nestedItems={[
                                        <ListItem key={student.educationValue}
                                          primaryText={`Education:${student.educationValue}`}
                                          disabled={true}
                                        />,
                                        <ListItem key={student.experienceValue}
                                          primaryText={`Experience:${student.experienceValue}`}
                                          
                                          open={this.state.open}
                                        />,
                                        <ListItem key={student.studentGrade}
                                          primaryText={`Grade:${student.studentGrade}`}
                                          disabled={true}
                                        />,
                                        <ListItem key={student.majorValue}
                                          primaryText={`Major In:${student.majorValue}`}
                                          disabled={true}
                                        />,
                                        <ListItem
                                          key={student.email}
                                          primaryText={`Email:${student.email}`}
                                        />,
                                        <ListItem
                                          key={student.studentContactNo}
                                          primaryText={`Contact No:${student.studentContactNo}`}
                                          disabled={true}
                                        />,
                                      ]}
                                />
                                </div>
                            )
                        })}
                        
                    </List>
                 </div>
                 <Divider></Divider>
                 <div>
                        <Subheader>Student Applied for jobs</Subheader>
                        {this.props.jobs?Object.keys(this.props.jobs).map((job,index)=>{
                            // console.log(this.props.jobs[job].jobApplied['d90AJAI8eeX1BRz58PhEF1IITts1'].educationValue)
                            let studentUid = this.props.jobs[job].jobApplied
                            return (
                                <div>
                                    {
                                      studentUid?
                                      Object.keys(studentUid).map((apply,index)=>{
                                        if(apply){
                                          return(
                                            <ListItem key={studentUid[apply].fullName}
                                            primaryText={`Student Apply :"${studentUid[apply].fullName}"`} 
                                                  nestedItems={[
                                                    <ListItem key={index}
                                                    primaryText={this.props.jobs[job].position}
                                                          disabled={true}
                                                        />,
                                                    ]}
                                                  />
                                          )
                                        }})
                                        :
                                        <p style={{marginLeft:20 ,color:"red"}}>No student applied till</p>
                                    }
                                </div>
                            )
                        }):
                        <p style={{marginLeft:20 ,color:"red"}}>No Job posted till yet</p>
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
    }
  }
  const mapDispatchToProp = (dispatch) =>({
    getCompanyJobsData: (test1) => dispatch(getCompanyJobsData(test1)),
    getStudentsData: (test) => dispatch(getStudentsData(test)),
    startJobPost:(jobPost) => dispatch(startJobPost(jobPost))
  })
  
  
export default connect(mapStateToProps,mapDispatchToProp)(Company)