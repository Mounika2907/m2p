import * as actionTypes from '../Actions/types';

const INITIAL = {
    modal: {}
}

const pincodeRdr = (state=INITIAL, action) =>{
    switch (action.type) {
        case actionTypes.PINCODE:
            return {
                ...state,
                modal: action.payload
            }
    
        default:
            return state;
    }
}

export default pincodeRdr;