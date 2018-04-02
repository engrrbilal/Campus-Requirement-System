import React from 'react';
import * as firebase from 'firebase';
import dataReducer from '../reducers/dataReducer'
import {getJobsData,startJobApply,getCompaniesData} from '../actions/dataActions'
import {connect} from 'react-redux'
import '../App.css';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem,Toggle,Subheader, Dialog} from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {indigo500} from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

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
            slideIndex: 0
        }
    }
    componentWillMount(){
        {this.props.getJobsData({
            stu:"From Student retrieve jobs Dispatch"
        })}
        {this.props.getCompaniesData({
            comp:"From Admin Dispatch"
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
          const actions2 = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
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
                                <p>{`Last Date to apply: ${job.Day}/${job.Month +1}/${job.Year}`}</p>
                                </div>
                        )}})}
                    </Dialog>
                 </div>
                 <div>
                        <List>
                            <Subheader>Companies List</Subheader>
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
    }   
  }
  const mapDispatchToProp = (dispatch) =>({
    getJobsData: (test) => dispatch(getJobsData(test)),
    startJobApply:(jobData) => dispatch(startJobApply(jobData)),
    getCompaniesData:(jobData) => dispatch(getCompaniesData(jobData))
  })
export default connect(mapStateToProps,mapDispatchToProp)(Student)