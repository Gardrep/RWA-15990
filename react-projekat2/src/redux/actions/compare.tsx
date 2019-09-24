import {
  ADD_COMPARE_LIST,
  CLEAR_COMPARE_LIST,
  REMOVE_COMPARE_LIST
} from '../constants/constants'
import { PokemonModel } from '../../models/pokemonModel';
import { Action } from 'redux';

export interface AddCompareList extends Action {
  payload: PokemonModel;
}

export function addCompareList(pokemon: PokemonModel): AddCompareList {
  return {
    type: ADD_COMPARE_LIST,
    payload: pokemon
  }
}

export interface RemoveCompareList extends Action {
  payload: PokemonModel;
}

export function removeCompareList(pokemon: PokemonModel): AddCompareList {
  return {
    type: REMOVE_COMPARE_LIST,
    payload: pokemon
  }
}

export function clearCompareList() {
  return {
    type: CLEAR_COMPARE_LIST
  }
}


