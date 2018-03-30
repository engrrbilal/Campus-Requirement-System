const dataReducerDefaultState = {
    studentData:[],
    companyData:[],
    jobPost:[],
    jobData:[]
}

export default (state = dataReducerDefaultState, action) => {
    switch (action.type) {

        case 'STUDENT-DATA':
        return ({
            ...state,
                studentData:action.data
        })
            case 'COMPANY-DATA':
            return ({
                ...state,
                companyData:action.data
            })
            case 'JOB-POST':
            return ({
                ...state,
                jobPost:action.data
            })
            case 'JOB-DATA':
            return ({
                ...state,
                uids:action.uids,
                pushKeys:action.dataPushKey,
                jobData:action.jobData
            })
            case 'COMPANY-JOB-DATA':
            return ({
                ...state,
                    companyJobData:action.data
            })
            case 'JOB-APPLY':
            return ({
                ...state,
                    studentApplyData:action.data
            })
            case 'JOB-APPLY-DATA':
            return ({
                ...state,
                pushKeys:action.dataPushKey,
                jobApplyData:action.jobApplyData
            })
            case 'DELETE-COMPANY':
            return ({
                ...state,
                deleteCompany:action.data
            })
            case 'DELETE-JOB':
            return ({
                ...state,
                deleteJOb:action.data
            })
            case 'DELETE-STUDENT':
            return ({
                ...state,
                deleteStudent:action.data
            })
        default:
            return state;
    }
}