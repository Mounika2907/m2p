import * as actionTypes from '../../Actions/types';

const INITIAL = {
    PanDetails: {}
}

const PanRdr = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.PANINFO:
            return {
                ...state,
                PanDetails: action.payload
            }

        default:
            return state;
    }
}

export default PanRdr;