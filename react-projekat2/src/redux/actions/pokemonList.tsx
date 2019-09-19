import {
  GET_POKEMONS_REQUEST,
  SET_POKEMONS,
  FILTER_POKEMONS,
  FILTER_POKEMONS_ALL,
  CLEAR_POKEMONS
} from '../constants/constants'
import { PokemonModel } from '../../models/pokemonModel';
import { Action } from 'redux';

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
  payload: {
    searchString: string,
    SearchHealthStart: number
    SearchHealthEnd: number,
    SearchAttackStart: number,
    SearchAttackEnd: number,
    SearchDeffenceStart: number,
    SearchDeffenceEnd: number,
    searchTypes: string[]
  }
}

export function filterPokemonsAll(
  searchString = '',
  SearchHealthStart = 0,
  SearchHealthEnd = 0,
  SearchAttackStart = 0,
  SearchAttackEnd = 0,
  SearchDeffenceStart = 0,
  SearchDeffenceEnd = 0,
  searchTypes): FilterPokemonsAll {
  return {
    type: FILTER_POKEMONS_ALL,
    payload: {
      searchString: searchString,
      SearchHealthStart: SearchHealthStart,
      SearchHealthEnd: SearchHealthEnd,
      SearchAttackStart: SearchAttackStart,
      SearchAttackEnd: SearchAttackEnd,
      SearchDeffenceStart: SearchDeffenceStart,
      SearchDeffenceEnd: SearchDeffenceEnd,
      searchTypes: searchTypes
    }
  }
}

export interface ClearPokemons extends Action {
}

export function clearPokemons(): ClearPokemons {
  return {
    type: CLEAR_POKEMONS
  }
}