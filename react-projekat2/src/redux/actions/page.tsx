import {
  GET_POKEMONS_REQUEST,
  SET_POKEMONS,
  FILTER_POKEMONS,
  FILTER_POKEMONS_BYHEALTH,
  FILTER_POKEMONS_BYATTACK,
  FILTER_POKEMONS_BYDEFENCE,
  CLEAR_POKEMONS
} from '../constants/page'


export function setPokemons(data) {
  return {
    type: SET_POKEMONS,
    payload: data
  }
}

export function getPokemons(id='') {
  return {
      type: GET_POKEMONS_REQUEST,
      payload: id
    }
}

export function filterPokemons(searchString = '') {
  return{
    type: FILTER_POKEMONS,
    payload: searchString
  }
}

export function filterPokemonsByHealth(searchString = '') {
  return{
    type: FILTER_POKEMONS_BYHEALTH,
    payload: searchString
  }
}

export function filterPokemonsByAttack(searchString = '') {
  return{
    type: FILTER_POKEMONS_BYATTACK,
    payload: searchString
  }
}

export function filterPokemonsByDefence(searchString = '') {
  return{
    type: FILTER_POKEMONS_BYDEFENCE,
    payload: searchString
  }
}

export function clearPokemons() {
  return{
    type: CLEAR_POKEMONS
  }
}