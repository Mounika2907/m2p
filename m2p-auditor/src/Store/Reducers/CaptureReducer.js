import * as actionTypes from '../Actions/types';

const INITIAL = {
    mode: '',
    facematch: '',
    facematchAadhaar: '',
    facematchPan: '',
    livecheck: '',
    chatPublisher: undefined,
    chatMessages: []
}

const CaptureRdr = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.CLICK:
            return { ...state, mode: action.payload }

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

        default:
            return state;
    }

}

export default CaptureRdr;