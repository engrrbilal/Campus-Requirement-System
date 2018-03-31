import React from 'react';
import * as firebase from 'firebase';
import dataReducer from '../reducers/dataReducer'
import {getJobsData,startJobApply} from '../actions/dataActions'
import {connect} from 'react-redux'
import '../App.css';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem,Toggle,Subheader, Dialog} from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {indigo500} from 'material-ui/styles/colors';

import Admin from './Admin';

class Student extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            studentUid:'',
            job:'',
            companyUid:'',
            jobPushKey:'',
            createdAt:''
        }
    }
    componentWillMount(){
        {this.props.getJobsData({
            stu:"From Student retrieve jobs Dispatch"
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
    }
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
      handleClose = () => {
        this.setState({open: false});
      };
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
              keyboardFocused={true}
              onClick={() =>this.jobApply()}
            />,
          ];
        return (
            <div className="studentBackground" style={{width:"100%",height:900}}>
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
                            return (<div>
                                <p>{`Position: ${job.position}`}</p>
                                <p>{`Salary: ${job.salary}`}</p>

                                <p>{`Last Date to apply: ${job.Day}/${job.Month +1}/${job.Year}`}</p>
                                </div>
                        )}})}
                    </Dialog>
                 </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        jobs: state.dataReducer.jobData,
        uids:state.dataReducer.uids
    }   
  }
  const mapDispatchToProp = (dispatch) =>({
    getJobsData: (test) => dispatch(getJobsData(test)),
    startJobApply:(jobData) => dispatch(startJobApply(jobData))
  })
export default connect(mapStateToProps,mapDispatchToProp)(Student)