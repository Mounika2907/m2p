import * as actionTypes from '../Actions/types';

const INITIAL = {
    info: {},
    time: {},
    questions: [],
    singleQuestion: [],
    userList: {},
    videourl: '',
    DownloadPdf: {},
    changePassword: "",
    auditorSubmitStatus: "",
    spinner: "",
}

const InfoRdr = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.ALLINFO:
            return { ...state, info: action.payload }
        case actionTypes.VIDEOURL:
            return { ...state, videourl: action.payload }

        case actionTypes.TIME:
            return { ...state, time: action.payload }

        case actionTypes.QUESTIONS:
            return { ...state, questions: action.payload }

        case actionTypes.SINGLEQUESTION:
            const newSate = state.questions?.filter(result => result.quesid === action.payload)
            return { ...state, singleQuestion: newSate }

        case actionTypes.USERS:
            return { ...state, userList: action.payload }
            
        case actionTypes.DOWNLOADPDF:
            return { ...state, DownloadPdf: action.payload }

        case actionTypes.CHANGEPASSWORD:
            return { ...state, changePassword: action.payload }
            
        case actionTypes.AUDITORSTATUS:
            return { ...state, auditorSubmitStatus: action.payload }

        case actionTypes.SPINNER:
            return { ...state, spinner: action.payload }

        default:
            return state;
    }

}

export default InfoRdr;