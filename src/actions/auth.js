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
            uid='',
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
          const student = {uid,fullName,email,gender,educationValue,value,
            experienceValue,studentGrade,majorValue,studentContactNo,createdAt}
          const company = {uid,fullName,email,value,companyContactNo,companyAddress,createdAt}
        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password)
         .then( data =>{
           let uid = data.uid
           if(type.value === "Student"){
            firebase.database().ref(`Students/${uid}`).set(student)
            dispatch(signUp({
                uid:uid,
                ...student
            }))
            history.push('/student')
           }
           else if(type.value === "Company"){
            firebase.database().ref(`Companies/${uid}`).set(company)
            dispatch(signUp({
                uid:uid,
                ...company
            }))
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
            console.log(userid)
                firebase.database().ref(`Students/${userid}/`).once('value')
                .then((studentData) => {
                    console.log(studentData.val())
                    // console.log(stu)     
                    if(studentData.val()!== null){
                        dispatch(signIn({
                            uid:userid,
                            ...user
                        }))
                            // studentsignedinUser.delete()
                            history.push("/student")
                    }else {
                        firebase.database().ref(`Companies/${userid}/`).once('value')
                        .then((companyData) =>{
                            if(companyData.val()!== null){
                                console.log(companyData.val())
                                // studentsignedinUser.delete()
                                dispatch(signIn({
                                    uid:userid,
                                    ...user
                                }))
                                history.push("/company")
                            }
                            else{
                                history.push("/admin")
                            }
                        })

                    }

            })
            

        })
    }       
}