import * as firebase from 'firebase'
import history from '../history';

// CREATE-USER
export const signUp = (user) => ({
    type: 'CREATE-USER',
    user
  });

export const startSignUp = (userData = {}) =>{
    console.log("creating account ...");
    return dispatch =>{
        const {
            fullName='',
            email='anonymous@gmail.com',
            password='',
            gender='',
            value='',
            companyContactNo='',
            educationValue='',
            experienceValue='',
            studentGrade='',
            majorValue='',
            studentContactNo='',
            companyAddress='',
            createdAt=0
          } = userData;
          const type = {value}
          const student = {fullName,email,gender,educationValue,value,
            experienceValue,studentGrade,majorValue,studentContactNo,createdAt}
          const company = {fullName,email,value,companyContactNo,companyAddress,createdAt}
        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password)
         .then( data =>{
           let uid = data.uid
           firebase.auth().currentUser.updateProfile({displayName:fullName})
           console.log(type.value)
           if(type.value === "Student"){
               firebase.database().ref(`Students/${uid}`).set(student)
            //    dispatch(signUp({
            //        uid:uid,
            //        ...student
            //     }))
                history.push('/student')
           }
           else if(type.value === "Company"){
               firebase.database().ref(`Companies/${uid}`).set(company)
            //    dispatch(signUp({
            //        uid:uid,
            //        ...company
            //     }))
                history.push('/company');
                 
           }
        }).catch(console.log("error"))
    }   
  }
  
  export const signIn = (user) => ({
    type: 'USER-SIGNIN',
    user
  })

  export const startSignIn = (user = {}) =>{
    return dispatch => {
        console.log('user in signin', user)
        
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((signedinUser) => {
            let userid = signedinUser.uid
            firebase.database().ref(`Admin/${userid}/`).once('value')
                .then((adminData) => {
                    if(adminData.val()!== null){
                        const val = adminData.val().value
                        if(val=== "Admin"){
                            dispatch(signIn({
                                uid:userid,
                                ...user
                            }))
                                history.push("/admin")
                        }
                    }
                    else{
                        firebase.database().ref(`Students/${userid}/`).once('value')
                .then((studentData) => {
                    if(studentData.val()!== null){
                        const val = studentData.val().value
                        if(val=== "Student"){
                            dispatch(signIn({
                                uid:userid,
                                ...user
                            }))
                                history.push("/student")
                        }
                    }  
                   else {
                        firebase.database().ref(`Companies/${userid}/`).once('value')
                        .then((companyData) =>{
                            if(companyData.val()!== null){
                                const val = companyData.val().value
                            if(val=== "Company"){
                                console.log(companyData.val())
                                console.log(companyData.val().value)
                                dispatch(signIn({
                                    uid:userid,
                                    ...user
                                }))
                                history.push("/company")
                            }
                            }
                            else{
                                signedinUser.delete()
                                alert("User not found")
                            }
                        })

                    }

            })
                    }
        })
    })
    }       
}