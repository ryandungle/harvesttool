import * as actions from '../types';

const initialState = {
    errors: {},
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case actions.STOP_LOADING_DATA:
            return {
                ...state,
                loading: false
            }
        case actions.SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return {
                ...state
            }
    }
}