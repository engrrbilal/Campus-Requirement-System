import * as firebase from 'firebase'
import history from '../history';

// STUDENT-DATA
export const studentsData = (data) => ({
    type: 'STUDENT-DATA',
    data
  });
  export const setStudentsData = (test={}) => {
    console.log(test)
    return (dispatch) => {
      firebase.database().ref("Student").once('value',(snapshot) => {
        const data = [];
  
        snapshot.forEach((childSnapshot) => {
          data.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
          console.log(data)
        });
        dispatch(studentsData(data));
      })
      
    };
  };
  // COMPANY-DATA
export const companiesData = (data) => ({
  type: 'COMPANY-DATA',
  data
});

export const setCompaniesData = (test2={}) => {
  console.log(test2)
  return (dispatch) => {
    firebase.database().ref("Comapnay").once('value',(snapshot) => {
      const compData = [];

      snapshot.forEach((childSnapshot) => {
        compData.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
        console.log(compData)
      });
      dispatch(companiesData(compData));
    })
  };
};