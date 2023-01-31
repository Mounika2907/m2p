import * as actionTypes from '../Actions/types';

const INITIAL = {
    data: "",
    canvasImage: '',
    facematch: '',
    facematchAadhaar: '',
    facematchPan: '',
    livecheck: '',
    chatPublisher: undefined,
    chatMessages: [],
    endVideoCallByCustomer: ''
}

const CaptureRdr = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.RESETPIC:
            return {
                ...state,
                data: action.payload,
                livecheck: action.payload,
                canvasImage: action.payload,
                endVideoCallByCustomer: '',
                facematchPan: '',
                facematch: '',
                facematchAadhaar: '',
            }

        case actionTypes.CLICK:
            return { ...state, data: action.payload }

        case actionTypes.CANVASIMAGE:
            return { ...state, canvasImage: action.payload }

        case actionTypes.FACEMATCH:
            return { ...state, facematch: action.payload }

        case actionTypes.FACEMATCHAADHAAR:
            return { ...state, facematchAadhaar: action.payload }

        case actionTypes.FACEMATCHPAN:
            return { ...state, facematchPan: action.payload }

        case actionTypes.LIVECHECK:
            return { ...state, livecheck: action.payload }

        case actionTypes.CHAT_PUBLISHER:
            return { ...state, chatPublisher: action.payload }

        case actionTypes.CHATMESSAGES:
            return { ...state, chatMessages: state.chatMessages.concat(action.payload) }

        case actionTypes.ENDVIDEOCALL:
            return { ...state, endVideoCallByCustomer: action.payload }

        default:
            return state;
    }

}

export default CaptureRdr;