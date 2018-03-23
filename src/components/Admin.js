import React from 'react';
import * as firebase from 'firebase';
class Admin extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div >
                <br /><br /><br />
                <h1 style={{textAlign:"center"}}>Welcome Admin</h1>
                <p>List of students</p>
                <p>List of Comapanies</p>
                <p>List of jobs posted by Comapany</p>
            </div>
        )
    }
}
export default Admin