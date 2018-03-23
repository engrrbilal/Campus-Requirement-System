const dataReducerDefaultState = {
    companyData:[],
    studentData:[]
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
        default:
            return state;
    }
}