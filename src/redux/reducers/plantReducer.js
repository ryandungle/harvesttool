import * as actions from '../types';
import { constant } from '../constant'

const initialState = {
    plants: [],
    plant: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.GET_PLANTS:
            return {
                ...state,
                plants: action.payload
            }
        case actions.SET_PLANT:
            return {
                ...state,
                plant: action.payload
            }
        case actions.GET_NUMBER_OF_ROOM1:
            const plantInRoom1 = state.plants.filter(p => p.Room === "Room #1");
            return {
                ...state,
                plant: {
                    room1Num: plantInRoom1.length
                }
            }
        case actions.GET_ROOM1_PERCENTAGE:
            const percentage = Math.floor(state.plant.room1Num / constant.Capacity.Room1 * 100);
            return {
                ...state,
                plant: {
                    ...state.plant,
                    room1Percenttage: percentage
                }
            }
        case actions.GET_NUMBER_OF_PHASE4:
            const plantInPhase1 = state.plants.filter(p => p.Phase === constant.Phases.Phase4);
            return {
                ...state,
                plant: {
                    ...state.plant,
                    phase4Num: plantInPhase1.length
                }
            }

        default:
            return {
                ...state
            }
    }
}