import * as firebase from 'firebase'
import history from '../history';

// ADD_EXPENSE
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
            // companyValue='',
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
          const student = {fullName,email,password,gender,educationValue,value,
            experienceValue,studentGrade,majorValue,studentContactNo,createdAt}
          const company = {fullName,email,password,value,companyContactNo,companyAddress,createdAt}
        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password)
         .then( data =>{
           let uid = data.uid
           if(type.value === "Student"){
            firebase.database().ref(`Student/${uid}`).set(student)
            dispatch(signUp({
                uid:uid,
                ...student
            }))
            history.push('/student')
           }
           else{
            firebase.database().ref(`Comapnay/${uid}`).set(company)
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
                firebase.database().ref(`Student/${userid}/`).once('value')
                .then((studentData) => {
                    console.log(studentData.val())
                    // console.log(stu)     
                    if(studentData.val()!== null){
                            // studentsignedinUser.delete()
                            history.push("/student")
                    }else {
                        // firebase.database().ref(`Company/${userid}/`).once('value')
                        // .then((companyData) =>{
                        //     if(companyData.val()!== null){
                        //         console.log(companyData.val())
                        //         // studentsignedinUser.delete()
                                history.push("/company")
                        // }
                        // })

                    }

            })
            

        })
            }       
    }