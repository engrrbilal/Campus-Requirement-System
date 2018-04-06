import * as firebase from 'firebase'
import history from '../history';

// STUDENT-DATA
export const studentsData = (data) => ({
    type: 'STUDENT-DATA',
    data
  });
  export const getStudentsData = (test={}) => {
    return (dispatch) => {

      firebase.database().ref("Students").on('value',(snapshot) => {
        const data = [];
  
        snapshot.forEach((childSnapshot) => {
          data.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(studentsData(data));
      })
    };
  };
  //STUDENT-PROFILE-DATA
  export const studentProfileData = (data) => ({
    type: 'STUDENT-PROFILE-DATA',
    data
  });
  export const getStudentProfileData = (test={}) => {
    return (dispatch) => {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`Students/${user.uid}`).on("value", snap => {
                let profileData = snap.val();
                // console.log(dbdata)
                dispatch(studentProfileData(profileData))
            })
        }

    })
    };
  };
  // UPDATE-STUDENT
export const updateStudent = (updates) => ({
  type: 'UPDATE-STUDENT',
  updates:updates
});

export const startUpdateStudent= (updates={}) => {
  return (dispatch) => {
    const {
      id='',
      fullName='',
      educationValu='',
      experienceValue='',
      majorValue='',
      studentGrade='',
      studentContactNo='',
      } = updates;
    console.log(updates)
    return firebase.database().ref(`Students/${updates.id}`).update(updates).then(() => {
      dispatch(updateStudent(updates));
      alert("Your Profile has updated !")
    });
  };
};
  // COMPANIES-DATA
export const companiesData = (data) => ({
  type: 'COMPANY-DATA',
  data
});

export const getCompaniesData = (test2={}) => {
  return (dispatch) => {
    
    firebase.database().ref("Companies").on('value',(snapshot) => {
      const compData = [];
      let data = snapshot.val()
      for (var key in data) {
        let obj = data[key];
      if(obj.value !== "Admin"){
        console.log(obj.value)
        // snapshot.forEach((childSnapshot) => {
          compData.push({
            ...obj
          });
        // });
        dispatch(companiesData(compData))
      }
    }
    })
  };
};

// JOB-POST
export const jobPost = (data) => ({
    type: 'JOB-POST',
    data
  });

export const startJobPost = (jobData = {}) =>{
    console.log("Job posting ...");
    return dispatch =>{
        const {
          position='',
          educationValue='',
          experienceValue='',
          salary='',
          Day='',
          Month='',
          Year=''
          } = jobData;
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              let uid = user.uid;
              let displayName = user.displayName;
              console.log(displayName)
              console.log(uid)
        const job = {uid,displayName,position,salary,educationValue,experienceValue,Day,Month,Year}
            firebase.database().ref(`Jobs/${uid}`).push(job)
            .then(()=>{
              dispatch(jobPost({
                // uid:uid,
                ...job
             }))
            alert("Job Posted Successfully")
            }).catch((e)=>console.log("Error While posting job",e))
          } 
        });
    }   
  }
    // JOB-DATA
    export const jobsData = (uids,dataPushKey,jobData) => ({
      type: 'JOB-DATA',
      uids:uids,
      dataPushKey:dataPushKey,
      jobData:jobData
    });
    
    export const getJobsData = (test3={}) => {
      return (dispatch) => {
              firebase.database().ref('Jobs/').on('value',(snapshot) => {
                const data = snapshot.val()
                let jobData = []
                let dataPushKey = [];
                let uids = [];
                for (var key in data) {
                  let obj = data[key];
                  for (let key1 in obj) {
                      jobData.push({
                        ...obj[key1],
                        dataPushKey:key1,
                        uid:key
                      })
                      console.log(jobData)
                  }
              }
                dispatch(jobsData(uids,dataPushKey,jobData));
              })
      };
    };

// COMPANY-JOB-DATA
    export const companyJobsData = (data) => ({
      type: 'COMPANY-JOB-DATA',
      data
    });
    
    export const getCompanyJobsData = (test3={}) => {
      return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref(`Jobs/${user.uid}`).on('value', snap => {
                    let dbdata = snap.val()
                    console.log(dbdata)
                    let dataarr = [];
                    for (var key in dbdata) {
                        dataarr.push(dbdata[key])
                    }
                    // console.log(dataarr)
                    dispatch(companyJobsData(dataarr));
                })
            }
        }) 
    };
};
//JOB-APPLY
export const jobApply = (data) => ({
  type: 'JOB-APPLY',
  data,
});

export const startJobApply = (jobData = {}) =>{
  console.log("Job Applying ...");
  return dispatch =>{
    const {
      companyUid='',
      studentUid='',
      jobPushKey='',
      createdAt=0
      } = jobData;
      // const studentsData = {studentUid,createdAt,companyUid,jobPushKey}
      //   firebase.auth().onAuthStateChanged((user) => {
      //     if (user) {
            firebase.database().ref(`/Students/${studentUid}/`).on('value', snap => {
                let data = snap.val()
                let obj = {
                    fullName: data.fullName,
                    educationValue: data.educationValue,
                    experienceValue:data.experienceValue,
                    studentGrade:data.studentGrade,
                    majorValue:data.majorValue,
                    email: data.email,
                    studentContactNo: data.studentContactNo,
                    uid:studentUid
                }
                    let date = new Date()
                    let day = date.getDate();
                    let month = date.getMonth()+1;
                    let year = date.getFullYear();
                    console.log(day,month,year)
                    var applyData = firebase.database().ref(`/Jobs/${companyUid}/${jobPushKey}/`)
                    applyData.once('value',snap =>{
                        let data = snap.val()
                        let jobApplied = data.jobApplied
                        let student,Day,Month,Year,apply=false
                        
                        Day =data.Day;
                        Month = data.Month+1;
                        Year = data.Year
                        console.log(Day,Month,Year)
                        // if((day <=Day && month > Month && year>=Year)||(day>=Day && month >= Month && year>=Year)){
                        //   console.log("expired")
                        //   alert("Sory this Job has expired !")
                        // }
                        if(jobApplied){
                            for(let key in jobApplied){
                              student=jobApplied[key]
                            if(studentUid  === student.uid){
                              apply=true
                              break
                            }
                            else{
                              apply=false
                            }
                            
                          }
                          }
                          if(apply){
                            alert("You have allready applied for this job !")
                          }
                          else{
                            firebase.database().ref(`/Jobs/${companyUid}/${jobPushKey}/jobApplied/`).child(studentUid).set(obj)
                            .then(()=>{
                              dispatch(jobApply({obj}))
                              alert("You have applied for this job successfully!")
                          }).catch((e)=>("Error while applying ",e))
                          }
                      })
        }) 
  }   
}
// DELETE-COMPANY
export const deleteCompany = (data) => ({
  type: 'DELETE-COMPANY',
  data
});

export const startDeleteCompany = (data={}) => {
  return (dispatch) => {
            firebase.database().ref(`Companies/${data.companyUid}`).remove()
            .then(()=>{
              alert("Company has removed sucessfully!")
              dispatch(deleteCompany(data));
            }).catch((e)=>console.log("Error while removing company",e) )
  };
};
// DELETE-JOB
export const deleteJob = (data) => ({
  type: 'DELETE-COMPANY',
  data
});

export const startDeleteJob = (data={}) => {
  return (dispatch) => {
            firebase.database().ref(`Jobs/${data.companyUid}/${data.jobPushKey}`).remove()
            .then(()=>{
              alert("Job has removed sucessfully!")
              dispatch(deleteJob(data));
            }).catch((e)=>console.log("Error while removing Job",e))
};
};
// DELETE-STUDENT
export const deleteStudent = (data) => ({
  type: 'DELETE-STUDENT',
  data
});
export const startDeleteStudent = (data={}) => {
  return (dispatch) => {
            firebase.database().ref(`Students/${data.studentUid}`).remove()
            .then(()=>{
              console.log(data.studentUid)
              alert("Student has removed sucessfully!")
              dispatch(deleteStudent(data));
            }).catch((e)=>console.log("Error while removing Job",e))
        };
};