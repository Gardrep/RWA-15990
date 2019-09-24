import {
  GET_POKEMONS_REQUEST,
  SET_POKEMONS,
  FILTER_POKEMONS,
  FILTER_POKEMONS_ALL,
  CLEAR_POKEMONS
} from '../constants/constants'
import { PokemonModel } from '../../models/pokemonModel';
import { Action } from 'redux';
import { FilterModel } from '../../models/filterModel';

export interface SetPokemons extends Action {
  payload: PokemonModel[];
}

export function setPokemons(data): SetPokemons {
  return {
    type: SET_POKEMONS,
    payload: data
  }
}

export interface GetPokemons extends Action {
  payload: string;
}

export function getPokemons(id = ''): GetPokemons {
  return {
    type: GET_POKEMONS_REQUEST,
    payload: id
  }
}

export interface FilterPokemons extends Action {
  payload: string;
}

export function filterPokemons(searchString = ''): FilterPokemons {
  return {
    type: FILTER_POKEMONS,
    payload: searchString
  }
}

export interface FilterPokemonsAll extends Action {
  payload: FilterModel;
}

export function filterPokemonsAll(filter:FilterModel): FilterPokemonsAll {
  return {
    type: FILTER_POKEMONS_ALL,
    payload: filter
  }
}

export function clearPokemons() {
  return {
    type: CLEAR_POKEMONS
  }
}