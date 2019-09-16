import {
    GET_USERS_FAIL,
    SET_USERS,

    GET_CURRENT_USER_FAIL,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
    SET_IDOLD,
    CLEAR_IDOLD
} from '../constants/constants'
import { UserModel } from '../../models/userModel';


export interface UserState {
    error: boolean,
    users: UserModel[],
    currentUser: UserModel,
    IdStari: number
}


export const userInitialState: UserState = {
    error: null,
    users: [],
    currentUser: null,
    IdStari: null
}

export function userReducer(state: UserState = userInitialState, action: { type: string, payload: any }): UserState {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }

        case GET_USERS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        case GET_CURRENT_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_CURRENT_USER:
            return {
                ...state,
                currentUser: null
            }

        case SET_IDOLD: {
            return {
                ...state,
                IdStari: action.payload
            }
        }
        case CLEAR_IDOLD:
            return {
                ...state,
                IdStari: null
            }
        default:
            return state
    }
}