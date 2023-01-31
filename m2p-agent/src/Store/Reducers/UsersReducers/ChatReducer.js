import * as actionTypes from '../Actions/types';

const INITIAL = {
    sessionId: '',
    token: '',
    // screenUrl: undefined
}

const ChatReducer = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.CHAT_SESSION_ID:
            return { ...state, sessionId: action.payload }

        case actionTypes.CHAT_TOKEN:
            return { ...state, token: action.payload }

        // case actionTypes.SCREENURL:
        //     return { ...state, screenUrl: action.payload }

        default:
            return state;
    }
}

export default ChatReducer;