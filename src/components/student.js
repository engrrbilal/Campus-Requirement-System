import React from 'react';
import * as firebase from 'firebase';
import dataReducer from '../reducers/dataReducer'
import {setCompaniesData} from '../actions/dataActions'
import {connect} from 'react-redux'

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

class Student extends React.Component{
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
                {this.props.company.map((comp,index)=>{
                    return(
                        <ListItem
                            key={1}
                            
                            primaryText={comp.createdAt}
                            />
                    )
                })
                }
                <br /><br /><br />
                <h1 style={{textAlign:"center"}}>Welcome Student</h1>
                {console.log(this.props.company)}
            <div>
                <List>
                    <Subheader>Companies List</Subheader>
                    {this.props.company.map((comp,index)=>{
                        return (
                   <ListItem key={index}
                        primaryText={comp.fullName}
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

                
                {this.props.setCompaniesData({
                    stu:"From Student Dispatch"
                })}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        company: state.dataReducer.companyData
    }
  }
  const mapDispatchToProp = (dispatch) =>({
    setCompaniesData: (test) => dispatch(setCompaniesData(test))
  })
  
  
export default connect(mapStateToProps,mapDispatchToProp)(Student)