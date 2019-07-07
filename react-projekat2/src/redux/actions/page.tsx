import {
  GET_POKEMONS_REQUEST,
  SET_POKEMONS,
  FILTER_POKEMONS,
  FILTER_POKEMONS_BYHEALTH,
  FILTER_POKEMONS_BYATTACK,
  FILTER_POKEMONS_BYDEFENCE,
  FILTER_POKEMONS_ALL,
  CLEAR_POKEMONS
} from '../constants/page'


export function setPokemons(data) {
  return {
    type: SET_POKEMONS,
    payload: data
  }
}

export function getPokemons(id = '') {
  return {
    type: GET_POKEMONS_REQUEST,
    payload: id
  }
}

export function filterPokemons(searchString = '') {
  return {
    type: FILTER_POKEMONS,
    payload: searchString
  }
}

export function filterPokemonsByHealth(searchString = '') {
  return {
    type: FILTER_POKEMONS_BYHEALTH,
    payload: searchString
  }
}

export function filterPokemonsByAttack(searchString = '') {
  return {
    type: FILTER_POKEMONS_BYATTACK,
    payload: searchString
  }
}

export function filterPokemonsByDefence(searchString = '') {
  return {
    type: FILTER_POKEMONS_BYDEFENCE,
    payload: searchString
  }
}

export function filterPokemonsAll(searchString = '', searchHP = 0, searchATK = 0, searchDEF = 0, searchTypes) {
  return {
    type: FILTER_POKEMONS_ALL,
    payload: {
      searchString: searchString,
      searchHP: searchHP,
      searchATK: searchATK,
      searchDEF: searchDEF,
      searchTypes: searchTypes
    }
  }
}

export function clearPokemons() {
  return {
    type: CLEAR_POKEMONS
  }
}