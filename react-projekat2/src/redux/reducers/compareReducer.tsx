import {
    CLEAR_COMPARE_LIST,
    ADD_COMPARE_LIST,
    REMOVE_COMPARE_LIST,
} from '../constants/constants'
import { PokemonModel } from '../../models/pokemonModel';

export interface CompareListState {
    compareList: PokemonModel[]
}


export const pokemonListInitialState: CompareListState = {
    compareList: []
}

export function compareListReducer(state: CompareListState = pokemonListInitialState, action: { type: string, payload: any }): CompareListState {
    switch (action.type) {

        case ADD_COMPARE_LIST:
            {
                if (!state.compareList.includes(action.payload)) {
                    return {
                        ...state,
                        compareList: [...state.compareList, action.payload]
                    }
                }
                else {
                    return { ...state }
                }
            }

        case REMOVE_COMPARE_LIST:
            {
                return {
                    ...state,
                    compareList: [
                        ...state.compareList.filter((val) => val !== action.payload)
                    ]
                }
            }

        case CLEAR_COMPARE_LIST:
            return {
                ...state,
                compareList: null
            }

        default:
            return state
    }
}
