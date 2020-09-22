import * as actions from '../types';

const initialState = {
    userData: "",
    number: 1
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.SET_USER:
            return {
                ...state,
                userData: action.payload,
                ready: true
            }
        case actions.INC:
            return {
                ...state,
                number: state.number + 1
            }
        default:
            return {
                ...state
            }
    }
}