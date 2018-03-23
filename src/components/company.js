import React from 'react';
import * as firebase from 'firebase';
import dataReducer from '../reducers/dataReducer'
import {setStudentsData} from '../actions/dataActions'
import {connect} from 'react-redux'

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

class Company extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:false
        }
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
    render(){
        return (
            <div >
                <br /><br /><br />
                <h1 style={{textAlign:"center"}}>Welcome Comapany onboard</h1>
                {console.log(this.props.student)}
                {/* <p>List of students {this.props.student.map((stu,index)=>{
                  return <li key={index}>{stu.fullName}</li>
                })}</p> */}
                 <div>
                <List>
                    <Subheader>Students List</Subheader>
                    {this.props.student.map((stu,index)=>{
                        return (
                            <ListItem key={index}
                    primaryText={stu.fullName}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                        <ListItem
                        key={1}
                        primaryText="20 feb"
                        />,
                        <ListItem
                        key={2}
                        primaryText="Address"
                        disabled={true}
                        
                        />,
                        <ListItem
                        key={3}
                        primaryText="Apply"
                        />,
                    ]}
                    />
                        )
                    })}
                    
                </List>
            </div>
                <p>List of jobs posted by Comapany</p>
                {this.props.setStudentsData({
                    comp:"From Company Dispatch"
                })}
            </div>  
        )
    }
}
const mapStateToProps = (state) => {
    return{
        student: state.dataReducer.studentData
    }
  }
  const mapDispatchToProp = (dispatch) =>({
    setStudentsData: (test) => dispatch(setStudentsData(test))
  })
  
  
export default connect(mapStateToProps,mapDispatchToProp)(Company)