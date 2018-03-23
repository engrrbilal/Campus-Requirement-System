import React from 'react';
import * as firebase from 'firebase';
import {iconElementLeft,IconButton,TextField,Paper,FlatButton,RaisedButton,AppBar} from 'material-ui';
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loggedIn: null,
            users:[]
        }
    }
    // componentWillMount(){
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             this.setState({ 
    //                 loggedIn: true,
    //              });
    //         } else {
    //             this.setState({ loggedIn: false });
    //         }
    //     });
    //     const database = firebase.database()
    //     database.ref('Users').on('value',(snapshot) => {
    //       const usersData = this.state.users
    //       snapshot.forEach((childSnapshot) => {
    //         usersData.push({
    //           id:childSnapshot.key,
    //           ...childSnapshot.val()
    //         })
    //       })
    //     //   console.log(usersData)
    //       this.setState=(()=>{
    //         users:usersData
    //     })
    //     })
    // }
    render(){
        // console.log(this.props)
        return (
            <div >
                <br /><br /><br />
                <h1 style={{textAlign:"center"}}>Dashboard</h1>
                {/* <p>{this.state.users}</p> */}
                {/* {console.log(this.state.users)} */}
            </div>
        )
    }
}
export default Dashboard